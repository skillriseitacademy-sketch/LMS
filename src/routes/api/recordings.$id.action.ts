import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/recordings/$id/action" as any)({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        try {
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response("Unauthorized", { status: 401 });

          const serviceClient = createClient(
            process.env.VITE_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
          );

          const {
            data: { user },
            error: authError,
          } = await serviceClient.auth.getUser(token);
          if (authError || !user) return new Response("Unauthorized", { status: 401 });

          const recordingId = params.id;
          const { action } = await request.json(); // 'start', 'stop', 'pause', 'resume'

          // Fetch the recording
          const { data: recording } = await serviceClient
            .from("class_recordings")
            .select("*, live_classes(room_code)")
            .eq("id", recordingId)
            .single();

          if (!recording) return new Response("Not found", { status: 404 });
          if (recording.host_id !== user.id) return new Response("Forbidden", { status: 403 });

          const meteredSecretKey = process.env.METERED_API_KEY;
          if (!meteredSecretKey) {
            return new Response("Server configuration error", { status: 500 });
          }

          // In a real implementation, we would call the Metered API here to start/stop cloud recording
          // e.g. POST https://${meteredDomain}/api/v1/recordings/start?secretKey=${meteredSecretKey}

          let newStatus = recording.status;
          if (action === "start") newStatus = "recording";
          if (action === "stop") newStatus = "processing";
          if (action === "pause") newStatus = "paused";
          if (action === "resume") newStatus = "recording";

          // Update our DB
          await serviceClient
            .from("class_recordings")
            .update({ status: newStatus, ...(action === "stop" ? { ended_at: new Date().toISOString() } : {}) })
            .eq("id", recordingId);

          return new Response(JSON.stringify({ success: true, status: newStatus }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
