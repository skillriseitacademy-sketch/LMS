/**
 * GET  /api/chat/conversations
 *   Returns all conversations the current user participates in, with last message
 *   and unread count. Ordered by most recent activity.
 *
 * POST /api/chat/conversations
 *   Body: { other_user_id: string }
 *   Creates a 1:1 DM conversation (or returns existing one between the two users).
 */

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

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

export const Route = createFileRoute("/api/chat/conversations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const sc = serviceClient();

        // Get all conversation IDs the user participates in
        const { data: participations, error: pErr } = await sc
          .from("conversation_participants")
          .select("conversation_id, last_read_at, is_bot_thread")
          .eq("user_id", user.id);

        if (pErr) return new Response(JSON.stringify({ error: pErr.message }), { status: 500 });
        if (!participations || participations.length === 0) {
          return new Response("[]", { headers: { "Content-Type": "application/json" } });
        }

        const convIds = participations.map((p: any) => p.conversation_id);

        // Fetch conversations
        const { data: convs } = await sc
          .from("conversations")
          .select("id, is_group, name, created_at")
          .in("id", convIds);

        // Fetch last message per conversation
        const { data: lastMessages } = await sc
          .from("messages")
          .select("id, conversation_id, sender_id, body, created_at")
          .in("conversation_id", convIds)
          .order("created_at", { ascending: false });

        // Build last-message map (first entry per conv = latest)
        const lastMsgMap: Record<string, any> = {};
        for (const msg of lastMessages ?? []) {
          if (!lastMsgMap[msg.conversation_id]) {
            lastMsgMap[msg.conversation_id] = msg;
          }
        }

        // Fetch all participants with profile data for each conversation
        const { data: allParticipants } = await sc
          .from("conversation_participants")
          .select("conversation_id, user_id, is_bot_thread, profiles:user_id(name, avatar_url)")
          .in("conversation_id", convIds);

        // Compute unread counts
        const unreadMap: Record<string, number> = {};
        for (const p of participations) {
          const lastRead = p.last_read_at ? new Date(p.last_read_at).getTime() : 0;
          const lastMsg = lastMsgMap[p.conversation_id];
          // Count messages newer than last_read_at that aren't from the current user
          unreadMap[p.conversation_id] =
            lastMsg && new Date(lastMsg.created_at).getTime() > lastRead && lastMsg.sender_id !== user.id
              ? 1  // Simplified: show dot if last message is unread
              : 0;
        }

        const participationMeta = Object.fromEntries(
          participations.map((p: any) => [p.conversation_id, p])
        );

        const participantsByConv: Record<string, any[]> = {};
        for (const p of allParticipants ?? []) {
          if (!participantsByConv[p.conversation_id]) participantsByConv[p.conversation_id] = [];
          participantsByConv[p.conversation_id].push({
            user_id: p.user_id,
            name: (p.profiles as any)?.name ?? "Unknown",
            avatar_url: (p.profiles as any)?.avatar_url ?? null,
            is_bot_thread: p.is_bot_thread,
          });
        }

        const results = (convs ?? []).map((conv: any) => ({
          ...conv,
          participants: participantsByConv[conv.id] ?? [],
          last_message: lastMsgMap[conv.id] ?? null,
          unread_count: unreadMap[conv.id] ?? 0,
          is_bot_thread: participationMeta[conv.id]?.is_bot_thread ?? false,
        }));

        // Sort by last message time, bot thread always first
        results.sort((a: any, b: any) => {
          if (a.is_bot_thread && !b.is_bot_thread) return -1;
          if (!a.is_bot_thread && b.is_bot_thread) return 1;
          const aTime = a.last_message?.created_at ?? a.created_at;
          const bTime = b.last_message?.created_at ?? b.created_at;
          return new Date(bTime).getTime() - new Date(aTime).getTime();
        });

        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const { other_user_id } = await request.json() as { other_user_id?: string };
        if (!other_user_id) return new Response("other_user_id is required", { status: 400 });

        const sc = serviceClient();

        // Check if a 1:1 DM already exists between the two users
        const { data: myConvs } = await sc
          .from("conversation_participants")
          .select("conversation_id")
          .eq("user_id", user.id);

        const myIds = (myConvs ?? []).map((r: any) => r.conversation_id);

        if (myIds.length > 0) {
          const { data: shared } = await sc
            .from("conversation_participants")
            .select("conversation_id")
            .eq("user_id", other_user_id)
            .in("conversation_id", myIds);

          // Also verify it's a 1:1 (not a group)
          if (shared && shared.length > 0) {
            const { data: conv } = await sc
              .from("conversations")
              .select("id")
              .eq("id", shared[0].conversation_id)
              .eq("is_group", false)
              .single();

            if (conv) {
              return new Response(JSON.stringify({ conversationId: conv.id, existing: true }), {
                headers: { "Content-Type": "application/json" },
              });
            }
          }
        }

        // Create new conversation
        const { data: newConv, error: convErr } = await sc
          .from("conversations")
          .insert({ is_group: false })
          .select()
          .single();

        if (convErr || !newConv) {
          return new Response(JSON.stringify({ error: convErr?.message ?? "Failed" }), { status: 500 });
        }

        // Add both participants
        await sc.from("conversation_participants").insert([
          { conversation_id: newConv.id, user_id: user.id },
          { conversation_id: newConv.id, user_id: other_user_id },
        ]);

        return new Response(JSON.stringify({ conversationId: newConv.id, existing: false }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
