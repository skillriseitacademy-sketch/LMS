/**
 * POST /api/chat/ensure-bot-thread
 *   Idempotent: finds or creates the AI Assistant conversation for the current user.
 *   Called client-side on widget mount; safe to call multiple times (upsert pattern).
 *   Returns: { conversationId: string }
 *
 * Auth: required (same pattern as interview.start.ts)
 */

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

// Stable "bot" user UUID used as the second participant marker.
// This is a sentinel value — not a real auth.users row.
// is_bot_thread=true on the participant row identifies AI threads.
const BOT_SENTINEL_USER_ID = "00000000-0000-0000-0000-000000000001";

function serviceClient() {
  return createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function getUser(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const sc = serviceClient();
  const { data: { user }, error } = await sc.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export const Route = createFileRoute("/api/chat/ensure-bot-thread")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const sc = serviceClient();

        // Check if the user already has a bot thread
        const { data: existing } = await sc
          .from("conversation_participants")
          .select("conversation_id")
          .eq("user_id", user.id)
          .eq("is_bot_thread", true)
          .limit(1)
          .single();

        if (existing) {
          return new Response(
            JSON.stringify({ conversationId: existing.conversation_id }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        // Create a new conversation for the bot thread
        const { data: conv, error: convErr } = await sc
          .from("conversations")
          .insert({ is_group: false, name: "AI Assistant" })
          .select()
          .single();

        if (convErr || !conv) {
          return new Response(
            JSON.stringify({ error: convErr?.message ?? "Failed to create conversation" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        // Add the user as a participant, flagged as bot thread
        const { error: pErr } = await sc
          .from("conversation_participants")
          .insert([
            {
              conversation_id: conv.id,
              user_id: user.id,
              is_bot_thread: true,
            },
          ]);

        if (pErr) {
          return new Response(
            JSON.stringify({ error: pErr.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }

        // Insert a welcome message from the bot (sender_id = null)
        await sc.from("messages").insert({
          conversation_id: conv.id,
          sender_id: null,
          body: "👋 Hi! I'm your PlacePro AI Assistant. Ask me anything about your courses, quiz answers, or career roadmap. How can I help you today?",
        });

        return new Response(
          JSON.stringify({ conversationId: conv.id }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
      },
    },
  },
});
