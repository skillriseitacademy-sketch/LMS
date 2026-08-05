import { createServerFn } from "@tanstack/react-start";
import { generateObject } from "ai";
import { openRouter, defaultModel } from "@/lib/openrouter";
import { z } from "zod";

const InterviewFeedbackInput = z.object({
  role: z.string(),
  transcript: z
    .array(z.object({ role: z.enum(["interviewer", "candidate"]), text: z.string() }))
    .min(1),
});

const FeedbackSchema = z.object({
  communication: z.number().min(0).max(100),
  technical: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()).max(5),
  improvements: z.array(z.string()).max(5),
});

export type InterviewFeedback = z.infer<typeof FeedbackSchema>;

export const generateInterviewFeedback = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InterviewFeedbackInput.parse(input))
  .handler(async ({ data }) => {
    const transcriptText = data.transcript
      .map((t) => `${t.role === "interviewer" ? "Interviewer" : "Candidate"}: ${t.text}`)
      .join("\n");

    const { object } = await generateObject({
      model: openRouter(defaultModel) as any,
      schema: FeedbackSchema,
      system:
        "You are an expert interview coach. Score the candidate on communication (clarity, articulation, listening), technical depth (accuracy, depth, problem-solving), and confidence (tone, assertiveness, composure) on a scale of 0-100. Be specific and actionable in your feedback.",
      prompt: `Role being interviewed for: ${data.role}\n\nTranscript:\n${transcriptText}\n\nAnalyze the candidate's performance and return scores, a one-paragraph summary, up to 3 key strengths, and up to 3 specific improvements.`,
    });

    return object;
  });
