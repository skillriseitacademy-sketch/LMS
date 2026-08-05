import { createFileRoute } from "@tanstack/react-router";
import { createLiveKitToken } from "@/lib/livekit.server";
import { supabase } from "@/lib/supabase";

async function getUser(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  return user;
}

export const Route = createFileRoute("/api/livekit/token" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = await getUser(request);
        const { roomCode, userName, isHost } = (await request.json()) as any;

        if (!roomCode || !userName) {
          return new Response("Missing parameters", { status: 400 });
        }

        // Enforce identity if authenticated, otherwise allow guest userName
        const identity = user?.id ? user.id : userName;
        const name = user?.user_metadata?.name || userName;

        try {
          const token = await createLiveKitToken(roomCode, name, isHost);
          return new Response(JSON.stringify({ token }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          return new Response(error.message, { status: 500 });
        }
      },
    },
  },
});
