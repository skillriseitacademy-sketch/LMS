/**
 * PATCH /api/chat/conversations/$conversationId/read
 *   Updates last_read_at for the current user in the given conversation.
 *   Called when a chat window is focused or scrolled to the bottom.
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

export const Route = createFileRoute("/api/chat/conversations/$conversationId/read")({
  server: {
    handlers: {
      PATCH: async ({ request, params }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const { conversationId } = params;
        const sc = serviceClient();

        const { error } = await sc
          .from("conversation_participants")
          .update({ last_read_at: new Date().toISOString() })
          .eq("conversation_id", conversationId)
          .eq("user_id", user.id);

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
