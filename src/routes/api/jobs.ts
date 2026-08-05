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

async function getUser(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const sc = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const {
    data: { user },
    error,
  } = await sc.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export const Route = createFileRoute("/api/jobs" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

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

        const sc = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        try {
          // Convert the user's search filters into a semantic string
          const queryText =
            `${role} ${location ? `in ${location}` : ""} ${lpa ? `with salary ${lpa}` : ""}`.trim();

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

          // Map to match the frontend Job type expectations
          const formattedJobs = (matchedJobs || []).map((j: any) => ({
            title: j.title,
            company: j.company,
            location: location || "Remote", // We fall back since our DB schema doesn't store explicit location
            salary: lpa || null,
            experience: experience || null,
            link: j.url,
          }));

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
