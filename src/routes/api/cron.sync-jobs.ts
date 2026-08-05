import { createFileRoute } from "@tanstack/react-router";
import { generateObject } from "ai";
import { openRouter, defaultModel } from "@/lib/openrouter";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, logAIUsage } from "@/lib/ai-monitor.server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const googleProvider = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// We'll scrape these roles in our daily sync
const ROLES_TO_SYNC = [
  "Frontend Developer",
  "Backend Developer",
  "Cyber Security Analyst",
  "Data Scientist",
  "Product Manager",
];

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

export const Route = createFileRoute("/api/cron/sync-jobs" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // NOTE: In a real app, you'd secure this with a CRON_SECRET token
        // e.g. if (request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) return 401;

        const sc = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        let totalInserted = 0;

        try {
          // Process one role at a time to avoid rate limits
          for (const role of ROLES_TO_SYNC) {
            console.log(`Scraping jobs for: ${role}`);

            // 1. Optionally fetch real search results using Tavily
            let searchContext = "";
            const tavilyKey = process.env.TAVILY_API_KEY;

            if (tavilyKey) {
              console.log(`Searching web for ${role} jobs using Tavily...`);
              try {
                const tavilyRes = await fetch("https://api.tavily.com/search", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    api_key: tavilyKey,
                    query: `latest "${role}" job openings site:linkedin.com/jobs OR site:workday.com OR site:boards.greenhouse.io`,
                    search_depth: "advanced",
                    include_raw_content: false,
                    max_results: 5,
                  }),
                });
                if (tavilyRes.ok) {
                  const tavilyData = await tavilyRes.json();
                  if (tavilyData.results && tavilyData.results.length > 0) {
                    searchContext =
                      "Here are live search results from the internet:\n" +
                      tavilyData.results
                        .map(
                          (r: any) =>
                            `Title: ${r.title}\nURL: ${r.url}\nContent: ${r.content}\n---`,
                        )
                        .join("\n");
                  }
                }
              } catch (e) {
                console.error("Tavily search failed:", e);
              }
            }

            const prompt = `Find 5 live, real job openings on the internet for this role: "${role}". 
Ensure the 'link' is a valid URL to the job posting. Include top tech companies if possible.

${searchContext ? `IMPORTANT: Use the following real search results to extract the jobs!\n\n${searchContext}` : ""}

Output JSON matching exactly this schema:
{
  "jobs": [
    {
      "title": "Job title",
      "company": "Company name",
      "location": "Job location (e.g., Remote, Bangalore, etc.)",
      "salary": "Salary or LPA, if specified (or null)",
      "experience": "Required experience (or null)",
      "link": "A valid URL link to apply for the job"
    }
  ]
}`;

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ role: "user", parts: [{ text: prompt }] }],
                  generationConfig: {
                    responseMimeType: "application/json",
                  },
                }),
              },
            );

            if (!response.ok) {
              console.error(`Gemini generation failed: ${response.statusText}`);
              continue;
            }

            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            const sanitizedText = text
              .replace(/```json/g, "")
              .replace(/```/g, "")
              .trim();
            const object = JSON.parse(sanitizedText) as { jobs: any[] };

            if (!object.jobs || object.jobs.length === 0) continue;

            // Generate embeddings and insert into DB
            for (const job of object.jobs) {
              // Combine title, company, and location to create a rich embedding string
              const textToEmbed = `${job.title} at ${job.company} in ${job.location}. Experience: ${job.experience || "Any"}`;

              try {
                const embedding = await generateEmbedding(textToEmbed);

                // Use the link as the external ID to prevent duplicates
                const externalId = job.link.substring(0, 255); // Truncate if insanely long

                const { error } = await sc.from("job_listings").upsert(
                  {
                    title: job.title,
                    company: job.company,
                    url: job.link,
                    source: "gemini_sync",
                    external_id: externalId,
                    embedding: embedding,
                  },
                  { onConflict: "source,external_id" },
                );

                if (error) {
                  console.error("Failed to insert job:", error);
                } else {
                  totalInserted++;
                }
              } catch (embedErr) {
                console.error("Failed to generate embedding for job:", job.title, embedErr);
              }
            }
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: `Synced ${totalInserted} jobs successfully.`,
            }),
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error: any) {
          console.error("Cron sync failed:", error);
          // Return generic error but allow it to continue to process recordings (handled in the background)
        }

        // ==========================================
        // 2. Process Pending Class Recordings
        // ==========================================
        let recordingsProcessed = 0;
        try {
          const { data: pendingRecordings } = await sc
            .from("class_recordings")
            .select("*, instant_rooms(room_name)")
            .eq("status", "processing");

          if (pendingRecordings && pendingRecordings.length > 0) {
            // Lazy load to avoid module loading issues if youtube auth fails
            const { uploadToYouTube } = await import("@/lib/youtube.server");

            for (const rec of pendingRecordings) {
              if (!rec.storage_path) continue;
              console.log(`Processing recording upload for room: ${rec.room_id}`);

              // Mark as uploading to prevent concurrent processing
              await sc.from("class_recordings").update({ status: "uploading" }).eq("id", rec.id);

              try {
                const title = `Class Recording: ${rec.instant_rooms?.room_name || "Class"} - ${new Date(rec.created_at).toLocaleDateString()}`;
                await uploadToYouTube(rec.id, rec.storage_path, title);
                recordingsProcessed++;
              } catch (uploadErr: any) {
                console.error(`Upload failed for recording ${rec.id}:`, uploadErr);
                // Status is handled inside uploadToYouTube for quota errors, but let's ensure it resets to failed if it hard crashes
                await sc.from("class_recordings").update({ status: "failed" }).eq("id", rec.id);
              }
            }
          }
        } catch (error: any) {
          console.error("Recording upload sync failed:", error);
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: `Synced ${totalInserted} jobs and processed ${recordingsProcessed} recordings.`,
          }),
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      },
    },
  },
});
