import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/recordings/webhook" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          // Verify webhook signature if Metered supports it
          
          const serviceClient = createClient(
            process.env.VITE_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
          );

          // Example Metered webhook payload: { event: "recording.completed", recordingId: "...", roomName: "..." }
          const { event, roomId, duration, url } = body;

          if (event === "recording.completed") {
            // Find our recording by room_code or ID
            const { data: liveClass } = await serviceClient
              .from("live_classes")
              .select("id")
              .eq("room_code", roomId)
              .single();
              
            if (liveClass) {
              await serviceClient
                .from("class_recordings")
                .update({
                  status: "ready",
                  duration_seconds: duration || 0,
                  storage_path: url,
                })
                .eq("room_id", liveClass.id)
                .eq("status", "processing"); // Assuming it was processing
            }
          }

          return new Response(JSON.stringify({ received: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
