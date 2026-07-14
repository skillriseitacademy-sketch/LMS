import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { sanitizeText } from "@/lib/sanitize";

type ChatRequestBody = { messages?: unknown; system?: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, system } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const sanitizedMessages = messages.map((m: any) => ({
          ...m,
          content: m.role === "user" ? sanitizeText(m.content, 4000) : m.content
        }));

        const key = process.env.GEMINI_API_KEY;
        if (!key) return new Response("Missing GEMINI_API_KEY", { status: 500 });

        const google = createGoogleGenerativeAI({ apiKey: key });

        const result = streamText({
          model: google("gemini-1.5-flash") as any,
          system: system ?? "You are a helpful AI assistant. Be concise and friendly.",
          messages: await convertToModelMessages(sanitizedMessages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: sanitizedMessages as UIMessage[],
        });
      },
    },
  },
});
