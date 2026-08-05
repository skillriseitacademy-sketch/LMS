import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { uploadToYouTube } from "@/lib/youtube.server";

async function getUserRole(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  return profile?.role;
}

export const Route = createFileRoute("/api/recordings/$id/retry-upload" as any)({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const role = await getUserRole(request);
        if (role !== "admin") {
          return new Response("Forbidden. Admin only.", { status: 403 });
        }

        const recordingId = params.id;

        // Fetch the recording
        const { data: recording, error } = await supabase
          .from("class_recordings")
          .select("*, instant_rooms(room_name)")
          .eq("id", recordingId)
          .single();

        if (error || !recording) {
          return new Response("Recording not found", { status: 404 });
        }

        if (!recording.storage_path) {
          return new Response("Storage path missing", { status: 400 });
        }

        try {
          await supabase
            .from("class_recordings")
            .update({ status: "uploading" })
            .eq("id", recordingId);

          // Trigger the upload immediately
          await uploadToYouTube(
            recordingId,
            recording.storage_path,
            `Class Recording: ${recording.instant_rooms?.room_name || "Class"} - ${new Date(recording.created_at).toLocaleDateString()}`,
          );

          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          // Revert status on failure
          const isQuota = error.message.includes("QUOTA_EXCEEDED");
          await supabase
            .from("class_recordings")
            .update({
              status: "failed",
            })
            .eq("id", recordingId);

          return new Response(JSON.stringify({ success: false, error: error.message, isQuota }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
