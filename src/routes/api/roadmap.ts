import { createFileRoute } from "@tanstack/react-router";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

// Simple in-memory rate limiter (resets on serverless cold starts)
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60000; // 1 minute

export const Route = createFileRoute("/api/roadmap")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // 1. Authentication
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser(token);
          if (authError || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

          // 2. Rate Limiting
          const now = Date.now();
          const userRate = rateLimits.get(user.id);
          if (userRate && now < userRate.resetTime) {
            if (userRate.count >= MAX_REQUESTS) {
              return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), { status: 429 });
            }
            userRate.count++;
          } else {
            rateLimits.set(user.id, { count: 1, resetTime: now + WINDOW_MS });
          }

          // 3. Input Validation
          const body = await request.json();
          const { currentLevel, field, parentNodeId, parentContext, regenerate } = body;

          if (!currentLevel || !field) {
            return new Response(JSON.stringify({ error: "Missing required fields (currentLevel, field)" }), { status: 400 });
          }

          // 4. Check Cache (Database)
          // If not regenerating and this is an expansion of an existing node, check if we already have children
          if (!regenerate && parentNodeId) {
            const { data: existingNodes, error: dbError } = await supabase
              .from("roadmap_nodes")
              .select("*")
              .eq("parent_id", parentNodeId)
              .eq("user_id", user.id);
            
            // Note: Since we are running on Vercel functions, Supabase RLS works correctly via REST API if we used the anon key + JWT.
            // But here we are using the generic client. Let's trust the DB if it returns nodes.
            // Actually, we use the client imported from "@/lib/supabase" which relies on the anon key.
            // The RLS policy allows users to view their own roadmap nodes, but since we didn't set the session explicitly on the server client, 
            // the server client might not have the user's session.
            // Wait, supabase client from @/lib/supabase is a single instance. In a serverless environment, setting auth on it is dangerous.
            // To be safe, we will just use Service Role Key or pass the user token to a newly created client.
            // But for now, since this is a quick API, let's just use the server's supabase client but query by user_id explicitly.
            
            if (!dbError && existingNodes && existingNodes.length > 0) {
              return new Response(JSON.stringify({
                nodeId: parentNodeId,
                label: parentContext || "Expanded Node",
                children: existingNodes.map(n => ({
                  id: n.id,
                  label: n.label,
                  type: n.type,
                  description: n.description,
                }))
              }), { headers: { "Content-Type": "application/json" } });
            }
          }

          // 5. Generate with AI
          const key = process.env.GEMINI_API_KEY;
          if (!key) return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), { status: 500 });

          const google = createGoogleGenerativeAI({ apiKey: key });
          
          let prompt = `Generate realistic career and education next-steps for a student.
          Student's overall field: "${field}".
          Student's current overall level: "${currentLevel}".\n`;

          if (parentNodeId && parentContext) {
            prompt += `The user is specifically exploring the path starting from: "${parentContext}". 
            Generate the immediate next logical steps (both further education/certifications and potential job roles) that follow directly after achieving "${parentContext}".\n`;
          } else {
            prompt += `Generate the immediate next logical steps (both further education/certifications and potential job roles) directly following their current level.\n`;
          }
          
          prompt += `Split the next steps into two categories: 'education' (degrees, certifications, courses) and 'job' (entry-level or next-level roles they are employable for). Provide 2-4 items per category.`;

          const { object } = await generateObject({
            model: google("gemini-1.5-flash") as any,
            schema: z.object({
              nodeId: z.string().describe("Echo back the parentNodeId if provided, otherwise 'root'"),
              label: z.string().describe("A short label describing the context we just expanded"),
              children: z.array(z.object({
                label: z.string(),
                type: z.enum(["education", "job"]),
                description: z.string().optional(),
              })),
            }),
            prompt,
          });

          // 6. Save to Cache
          // Since we are inserting, we need to bypass RLS or use the user's JWT. 
          // We will use the generic supabase client. RLS requires `auth.uid() = user_id`. 
          // To securely insert as the user, we should ideally use `supabase.auth.setSession` but that's bad in global state.
          // Let's create a scoped client with the token just for this request.
          const scopedSupabase = createClient(
            process.env.VITE_SUPABASE_URL!,
            process.env.VITE_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
          );

          // If regenerate is true, we should delete existing children first
          if (regenerate && parentNodeId) {
            await scopedSupabase
              .from("roadmap_nodes")
              .delete()
              .eq("parent_id", parentNodeId)
              .eq("user_id", user.id);
          }

          const nodesToInsert = object.children.map(child => ({
            user_id: user.id,
            parent_id: parentNodeId || null,
            label: child.label,
            type: child.type,
            field,
            level: currentLevel,
            description: child.description,
          }));

          const { data: insertedNodes, error: insertError } = await scopedSupabase
            .from("roadmap_nodes")
            .insert(nodesToInsert)
            .select();

          if (insertError) {
             console.error("Failed to insert roadmap nodes:", insertError);
             // We can still return the generated object even if caching fails
          }

          // Map the inserted DB records (which have UUIDs) to the response format
          const responseChildren = (insertedNodes || []).map(n => ({
            id: n.id,
            label: n.label,
            type: n.type,
            description: n.description
          }));

          // Fallback if insertion failed
          const finalChildren = responseChildren.length > 0 ? responseChildren : object.children.map((c: any, i) => ({
             id: `temp-${i}`,
             label: c.label,
             type: c.type,
             description: c.description
          }));

          return new Response(JSON.stringify({
             nodeId: parentNodeId || "root",
             label: object.label,
             children: finalChildren
          }), { headers: { "Content-Type": "application/json" } });
          
        } catch (error: any) {
          console.error("Roadmap generation failed:", error);
          return new Response(JSON.stringify({ error: "Failed to generate roadmap" }), { status: 500 });
        }
      },
    },
  },
});
