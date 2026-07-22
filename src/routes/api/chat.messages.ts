/**
 * GET  /api/chat/messages?conversation_id=...&before=...&limit=30
 *   Returns paginated messages for a conversation the user participates in.
 *   Cursor-based on created_at (DESC order, older messages on subsequent pages).
 *
 * POST /api/chat/messages
 *   Body: { conversation_id, body, story_id? }
 *   Persists the message to DB and broadcasts it via Supabase Realtime Broadcast
 *   so other participants see it instantly without polling.
 *
 * PATCH /api/chat/conversations/:id/read
 *   Updates last_read_at for the current user in conversation_participants.
 */

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sanitizeText } from "@/lib/sanitize";

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

async function isParticipant(sc: ReturnType<typeof serviceClient>, userId: string, convId: string) {
  const { data } = await sc
    .from("conversation_participants")
    .select("user_id")
    .eq("conversation_id", convId)
    .eq("user_id", userId)
    .single();
  return !!data;
}

export const Route = createFileRoute("/api/chat/messages")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const url = new URL(request.url);
        const conversationId = url.searchParams.get("conversation_id");
        const before = url.searchParams.get("before");
        const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "30"), 50);

        if (!conversationId) return new Response("conversation_id is required", { status: 400 });

        const sc = serviceClient();

        // Verify the user is a participant
        if (!(await isParticipant(sc, user.id, conversationId))) {
          return new Response("Forbidden", { status: 403 });
        }

        let query = sc
          .from("messages")
          .select(`
            id, conversation_id, sender_id, body, story_id, created_at,
            sender:sender_id (name, avatar_url)
          `)
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (before) {
          query = query.lt("created_at", before);
        }

        const { data, error } = await query;
        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

        return new Response(JSON.stringify(data ?? []), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const body = await request.json() as {
          conversation_id?: string;
          body?: string;
          story_id?: string;
        };

        if (!body.conversation_id || !body.body) {
          return new Response("conversation_id and body are required", { status: 400 });
        }

        const cleanBody = sanitizeText(body.body, 4000);
        if (!cleanBody) return new Response("Message body is empty after sanitization", { status: 400 });

        const sc = serviceClient();

        // Verify participant
        if (!(await isParticipant(sc, user.id, body.conversation_id))) {
          return new Response("Forbidden", { status: 403 });
        }

        // Fetch sender profile for the broadcast payload
        const { data: profile } = await sc
          .from("profiles")
          .select("name, avatar_url")
          .eq("id", user.id)
          .single();

        // Persist to DB
        const { data: msg, error: insertErr } = await sc
          .from("messages")
          .insert({
            conversation_id: body.conversation_id,
            sender_id: user.id,
            body: cleanBody,
            story_id: body.story_id ?? null,
          })
          .select()
          .single();

        if (insertErr || !msg) {
          return new Response(JSON.stringify({ error: insertErr?.message ?? "Insert failed" }), { status: 500 });
        }

        // Broadcast to Realtime channel so other participants receive it instantly
        // (same pattern as useWebRTC.ts ICE candidate batching)
        const enrichedMsg = {
          ...msg,
          sender: profile ? { name: profile.name, avatar_url: profile.avatar_url } : null,
        };

        await sc.channel(`chat:${body.conversation_id}`).send({
          type: "broadcast",
          event: "new_message",
          payload: enrichedMsg,
        });

        return new Response(JSON.stringify(enrichedMsg), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
