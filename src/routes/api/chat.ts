import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { openRouter, defaultModel } from "@/lib/openrouter";
import { sanitizeText } from "@/lib/sanitize";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, logAIUsage } from "@/lib/ai-monitor.server";

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

type ChatRequestBody = { messages?: unknown; system?: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        try {
          await checkRateLimit(user.id);
        } catch (limitErr: any) {
          return new Response("Daily AI budget exceeded.", { status: 429 });
        }

        const { messages, system } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const sanitizedMessages = messages.map((m: any) => ({
          ...m,
          content: m.role === "user" ? sanitizeText(m.content, 4000) : m.content,
        }));

        const result = streamText({
          model: openRouter(defaultModel) as any,
          system: system ?? "You are a helpful AI assistant. Be concise and friendly.",
          messages: await convertToModelMessages(sanitizedMessages as UIMessage[]),
          onFinish: async ({ usage }) => {
            await logAIUsage({
              userId: user.id,
              provider: "openrouter",
              model: defaultModel,
              promptTokens: usage?.inputTokens ?? 0,
              completionTokens: usage?.outputTokens ?? 0,
              actionType: "chat_general",
            });
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: sanitizedMessages as UIMessage[],
        });
      },
    },
  },
});
