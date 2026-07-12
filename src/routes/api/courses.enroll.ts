import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/courses/enroll")({
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

          const { course_id } = await request.json();
          if (!course_id) return new Response("Course ID is required", { status: 400 });

          const { error: insertError } = await supabase.from("student_topics").upsert({
            user_id: user.id,
            topic_id: course_id,
            is_primary: false,
          });

          if (insertError) {
            console.error("enroll error:", insertError);
            return new Response("Database error", { status: 500 });
          }

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
