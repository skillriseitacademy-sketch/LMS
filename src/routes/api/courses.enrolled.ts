import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/courses/enrolled")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response("Unauthorized", { status: 401 });

          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser(token);
          if (authError || !user) return new Response("Unauthorized", { status: 401 });

          // Fetch student_topics joined with topics
          const { data, error } = await supabase
            .from("student_topics")
            .select("is_primary, topics(*)")
            .eq("user_id", user.id);

          if (error) {
            console.error("enrolled error:", error);
            return new Response("Database error", { status: 500 });
          }

          const courses = data.map((d: any) => ({
            ...d.topics,
            is_primary: d.is_primary,
          }));

          return new Response(JSON.stringify({ courses }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
