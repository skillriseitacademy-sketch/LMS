import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/jobs/match" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
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

        // Admin only
        const { data: profile } = await serviceClient
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role !== "admin") {
          return new Response("Forbidden", { status: 403 });
        }

        // Fetch all students
        const { data: students } = await serviceClient
          .from("profiles")
          .select("id")
          .eq("role", "student");

        // Fetch all jobs
        const { data: jobs } = await serviceClient.from("job_listings").select("id");

        if (!students || !jobs) {
          return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
        }

        let matched = 0;

        for (const student of students) {
          for (const job of jobs) {
            // Give a random score > 50 for some jobs to simulate matches
            const score = Math.floor(Math.random() * 100);
            if (score > 70) {
              const { error } = await serviceClient.from("student_job_matches").upsert(
                {
                  student_id: student.id,
                  job_id: job.id,
                  score,
                },
                { onConflict: "student_id,job_id" },
              );
              if (!error) matched++;
            }
          }
        }

        return new Response(JSON.stringify({ success: true, matched }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
