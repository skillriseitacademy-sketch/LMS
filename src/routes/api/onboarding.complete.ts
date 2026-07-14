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

          if (!Array.isArray(course_ids) || course_ids.length === 0) {
            return new Response("At least one course must be selected", { status: 400 });
          }

          // Sanitize user inputs
          const cleanCourseIds = course_ids.map((id: string) => String(id).trim()).filter((id: string) => id.length > 0);
          
          let cleanUsername = undefined;
          if (username) {
            cleanUsername = String(username).toLowerCase().replace(/[^a-z0-9_]/g, "");
            if (cleanUsername.length < 3 || cleanUsername.length > 20) {
              return new Response("Invalid username format", { status: 400 });
            }
          }

          let cleanTargetJobs = null;
          if (Array.isArray(target_jobs)) {
            cleanTargetJobs = target_jobs
              .map((j) => String(j).trim())
              .filter((j) => j.length > 0 && j.length <= 100)
              .slice(0, 20); // max 20 jobs
          }

          // Insert courses
          const insertData = cleanCourseIds.map((id: string) => ({
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
              skills: cleanTargetJobs,
              ...(cleanUsername ? { username: cleanUsername } : {}),
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
