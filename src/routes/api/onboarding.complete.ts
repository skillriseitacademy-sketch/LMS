import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/onboarding/complete")({
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

          const { education_level, course_ids, visibility, username, target_jobs } = await request.json();

          // Upsert to user_roadmap_progress for education_level?
          // Wait, education_level is on profiles or roadmap? The schema has it on user_roadmap_progress.
          // Or we can just insert the topics.

          if (!Array.isArray(course_ids) || course_ids.length === 0) {
            return new Response("At least one course must be selected", { status: 400 });
          }

          // Insert courses
          const insertData = course_ids.map((id: string) => ({
            user_id: user.id,
            topic_id: id,
            is_primary: true,
          }));

          const { error: insertError } = await supabase.from("student_topics").insert(insertData);
          if (insertError) {
            console.error("student_topics error:", insertError);
            return new Response("Database error", { status: 500 });
          }

          // Mark onboarding complete and set visibility, username, and skills (target jobs)
          await supabase
            .from("profiles")
            .update({
              onboarding_complete: true,
              visibility: visibility === "private" ? "private" : "public",
              skills: Array.isArray(target_jobs) ? target_jobs : null,
              ...(username ? { username } : {}),
            })
            .eq("id", user.id);

          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
