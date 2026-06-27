import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

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
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);
    const transcriptText = data.transcript
      .map((t) => `${t.role === "interviewer" ? "Interviewer" : "Candidate"}: ${t.text}`)
      .join("\n");

    const { output } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      output: Output.object({ schema: FeedbackSchema }),
      system:
        "You are an expert interview coach. Score the candidate on communication, technical depth, and confidence (0-100). Be specific and actionable.",
      prompt: `Role being interviewed for: ${data.role}\n\nTranscript:\n${transcriptText}\n\nReturn a JSON object with the scores, a one-paragraph summary, 3 strengths, and 3 improvements.`,
    });

    return output;
  });
