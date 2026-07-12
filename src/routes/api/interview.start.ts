import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/interview/start")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response("Unauthorized", { status: 401 });

          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser(token);
          if (authError || !user) return new Response("Unauthorized", { status: 401 });

          const { topic_id } = await request.json();

          // 1. Get OpenAI Token
          const openAiKey = process.env.OPENAI_API_KEY;
          if (!openAiKey) return new Response("Missing OPENAI_API_KEY", { status: 500 });

          const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openAiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4o-realtime-preview-2024-12-17",
              voice: "alloy",
              instructions:
                "You are a professional technical interviewer for PlacePro LMS. Ask the candidate questions one by one, wait for their answer, and provide constructive feedback.",
              modalities: ["audio", "text"],
              input_audio_transcription: { model: "whisper-1" },
            }),
          });

          if (!response.ok) {
            console.error("OpenAI Error:", await response.text());
            return new Response("Failed to start AI session", { status: 500 });
          }

          const sessionData = await response.json();
          const ephemeralKey = sessionData.client_secret.value;

          // 2. Create interview_sessions record
          const { data: interview, error: dbError } = await supabase
            .from("interview_sessions")
            .insert({
              user_id: user.id,
              topic_id: topic_id || null,
              status: "in_progress",
              started_at: new Date().toISOString(),
            })
            .select()
            .single();

          if (dbError) {
            console.error("DB Error:", dbError);
            return new Response("Database error", { status: 500 });
          }

          return new Response(
            JSON.stringify({
              client_secret: ephemeralKey,
              session_id: interview.id,
            }),
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
