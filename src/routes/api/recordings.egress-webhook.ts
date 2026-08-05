import { createFileRoute } from "@tanstack/react-router";
import { WebhookReceiver } from "livekit-server-sdk";
import { supabase } from "@/lib/supabase";

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "devkey";
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || "secret";

const receiver = new WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

export const Route = createFileRoute("/api/recordings/egress-webhook" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.text();
          const authHeader = request.headers.get("Authorization");

          if (!authHeader) {
            return new Response("Unauthorized", { status: 401 });
          }

          // Verify signature and parse event
          const event = await receiver.receive(body, authHeader);

          if (event.event === "egress_ended") {
            const egressInfo = event.egressInfo;
            if (egressInfo && egressInfo.roomName) {
              const roomCode = egressInfo.roomName;

              // Find the room
              const { data: room } = await supabase
                .from("instant_rooms")
                .select("id")
                .eq("room_code", roomCode)
                .single();

              if (room) {
                const s3File = egressInfo.fileResults?.[0];
                if (s3File) {
                  const s3Path = s3File.filename;

                  // Upsert the recording entry
                  const { data: recording } = await supabase
                    .from("class_recordings")
                    .insert({
                      room_id: room.id,
                      status: "processing",
                      storage_path: s3Path,
                    })
                    .select()
                    .single();

                  // We mark it as 'processing' so our background cron job (or queue) can pick it up for YouTube upload.
                  // We don't block the webhook with the YouTube upload.
                }
              }
            }
          }

          return new Response("OK", { status: 200 });
        } catch (error: any) {
          console.error("Webhook error:", error);
          return new Response(error.message, { status: 400 });
        }
      },
    },
  },
});
