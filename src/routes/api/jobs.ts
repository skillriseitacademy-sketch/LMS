import { createFileRoute } from "@tanstack/react-router";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

export const Route = createFileRoute("/api/jobs")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const { role, experience, lpa, location } = body;

        if (!role) {
          return new Response(JSON.stringify({ error: "Missing job role" }), {
            status: 400,
          });
        }

        const key = process.env.GEMINI_API_KEY;
        if (!key) {
          return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), { status: 500 });
        }

        try {
          const google = createGoogleGenerativeAI({ apiKey: key });
          
          const { object } = await generateObject({
            model: google("gemini-1.5-flash") as any,
            schema: z.object({
              jobs: z.array(
                z.object({
                  title: z.string().describe("Job title"),
                  company: z.string().describe("Company name"),
                  location: z.string().describe("Job location (e.g., Remote, Bangalore, etc.)"),
                  salary: z.string().nullable().describe("Salary or LPA, if specified"),
                  experience: z.string().nullable().describe("Required experience"),
                  link: z.string().describe("A valid URL link to apply for the job"),
                }),
              ).describe("A list of up to 10 live job postings matching the criteria."),
            }),
            prompt: `Find live, real job openings on the internet matching these criteria:
            Role: "${role}"
            Experience required: "${experience || 'Any'}"
            Salary expected: "${lpa || 'Any'}"
            Location: "${location || 'Any'}"
            
            Return a list of actual job postings currently available. Ensure the 'link' is a valid URL to the job posting or application page.
            If no exact matches are found, return similar relevant roles.`,
          });

          return new Response(JSON.stringify(object), {
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
