import { createFileRoute } from "@tanstack/react-router";
import { startRoomRecording, egressClient } from "@/lib/livekit.server";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/recordings/start" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const { roomCode, roomId } = (await request.json()) as any;

        // Verify the user is the host and the room is a class
        const { data: room } = await supabase
          .from("instant_rooms")
          .select("*")
          .eq("room_code", roomCode)
          .single();

        if (!room || room.host_id !== user.id || room.room_type !== "class") {
          return new Response("Forbidden", { status: 403 });
        }

        try {
          // Check if already recording
          const egresses = await egressClient.listEgress({ roomName: roomCode });
          const activeEgress = egresses.find((e) => e.status === 1 || e.status === 2); // EGRESS_STARTING or EGRESS_ACTIVE

          if (!activeEgress) {
            await startRoomRecording(roomCode, roomId);
          }

          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          return new Response(error.message, { status: 500 });
        }
      },
    },
  },
});
