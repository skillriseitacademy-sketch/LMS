import { createFileRoute } from "@tanstack/react-router";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const Route = createFileRoute("/api/roadmap")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const { targetJob, country, education } = body;
        
        if (!targetJob || !country || !education) {
          return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }
        
        const key = process.env.GEMINI_API_KEY;
        if (!key) return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), { status: 500 });

        try {
          const { object } = await generateObject({
            model: google("gemini-1.5-flash", { apiKey: key }),
            schema: z.object({
              title: z.string().describe("Title of the career roadmap"),
              description: z.string().describe("A brief summary of what this path entails"),
              estimatedTime: z.string().describe("Estimated time to complete the roadmap (e.g., '6-12 months')"),
              steps: z.array(z.object({
                title: z.string(),
                description: z.string(),
                type: z.enum(["education", "skill", "certification", "project", "job_search"]),
                estimatedDuration: z.string()
              }))
            }),
            prompt: `Generate a detailed step-by-step career roadmap for someone who currently has the following education: "${education}".
            They are located in: "${country}".
            Their target job is: "${targetJob}".
            Include specific skills to learn, recommended certifications recognized in their country, projects to build, and actionable job search steps.`,
          });

          return new Response(JSON.stringify(object), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error: any) {
          console.error("Roadmap generation failed:", error);
          return new Response(JSON.stringify({ error: "Failed to generate roadmap" }), { status: 500 });
        }
      },
    },
  },
});
