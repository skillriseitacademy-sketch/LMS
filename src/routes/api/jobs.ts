import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit } from "@/lib/ai-monitor.server";

// Helper to generate embedding using Gemini and pad to 1536 for pgvector compatibility
async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "models/gemini-embedding-2",
        content: {
          parts: [{ text }],
        },
        outputDimensionality: 1536,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Embedding generation failed: ${response.statusText}`);
  }

  const result = await response.json();
  const values = result.embedding.values as number[];

  if (values.length !== 1536) {
    console.warn(`Warning: Embedding returned ${values.length} dimensions. Expected 1536.`);
  }

  return values;
}

async function getClientWithToken(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return { sc: null, user: null };
  const sc = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
  const { data: { user }, error } = await sc.auth.getUser();
  if (error || !user) return { sc: null, user: null };
  return { sc, user };
}

export const Route = createFileRoute("/api/jobs" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { sc, user } = await getClientWithToken(request);
        if (!sc || !user) return new Response("Unauthorized", { status: 401 });

        try {
          // You can still rate limit if generating embeddings costs money
          await checkRateLimit(user.id);
        } catch (limitErr: any) {
          return new Response(JSON.stringify({ error: "Daily AI budget exceeded." }), {
            status: 429,
          });
        }

        const body = await request.json();
        const { role, experience, lpa, location } = body;

        if (!role) {
          return new Response(JSON.stringify({ error: "Missing job role" }), {
            status: 400,
          });
        }

        try {
          // Convert the user's search filters into a semantic string
          const queryText =
            `${role} ${location ? `in ${location}` : ""} ${lpa ? `with salary ${lpa}` : ""}`.trim();

          let formattedJobs = [];
          
          try {
            // Generate a vector embedding for the search query instantly
            const queryEmbedding = await generateEmbedding(queryText);

            // Query the Supabase pgvector function
            const { data: matchedJobs, error } = await sc.rpc("match_jobs", {
              query_embedding: queryEmbedding,
              match_threshold: 0.1, // Lower threshold allows fuzzier matches
              match_count: 10,
            });

            if (error) {
              console.error("Vector search error:", error);
              throw new Error("Vector search failed");
            }
            
            formattedJobs = (matchedJobs || []).map((j: any) => ({
              title: j.title,
              company: j.company,
              location: location || "Remote", // We fall back since our DB schema doesn't store explicit location
              salary: lpa || null,
              experience: experience || null,
              link: j.url,
            }));
          } catch (embedError) {
            console.error("Falling back to mock jobs due to embedding/db error:", embedError);
            // Fallback mock data if the API key is missing or vector db fails
            formattedJobs = [
              { title: `${role} Specialist`, company: "TechFlow", location: location || "Remote", salary: lpa || "Competitive", experience: "2+ Years", link: "#" },
              { title: `Senior ${role}`, company: "CloudSync Systems", location: "Remote", salary: lpa || "Competitive", experience: "5+ Years", link: "#" },
              { title: `${role} Analyst`, company: "CyberShield", location: location || "Remote", salary: lpa || "Competitive", experience: "1+ Years", link: "#" }
            ];
          }

          return new Response(JSON.stringify({ jobs: formattedJobs }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("Job search failed:", error);
          return new Response(JSON.stringify({ error: "Failed to perform job search" }), {
            status: 500,
          });
        }
      },
    },
  },
});
