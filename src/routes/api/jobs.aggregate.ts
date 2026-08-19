import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/jobs/aggregate" as any)({
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

        // Ensure user is admin
        const { data: profile } = await serviceClient
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role !== "admin") {
          return new Response("Forbidden", { status: 403 });
        }

        // Create an ingestion run record
        const { data: run, error: runError } = await serviceClient
          .from("job_ingestion_runs")
          .insert([{ status: "running" }])
          .select()
          .single();

        if (runError || !run) {
          return new Response(JSON.stringify({ error: "Failed to start ingestion run" }), {
            status: 500,
          });
        }

        // Mock fetching jobs from an external aggregator
        const mockJobs = [
          {
            title: "Frontend Developer",
            company: "TechCorp",
            location: "Remote",
            seniority: "Mid-level",
            salary_range: "$100k - $120k",
            skills: ["React", "TypeScript", "CSS"],
            description: "Looking for an experienced frontend developer.",
            raw_hash: `mock-hash-${Date.now()}-1`,
          },
          {
            title: "Backend Engineer",
            company: "DataSystems",
            location: "New York, NY",
            seniority: "Senior",
            salary_range: "$120k - $140k",
            skills: ["Node.js", "PostgreSQL", "API Design"],
            description: "Join our core backend team.",
            raw_hash: `mock-hash-${Date.now()}-2`,
          },
          {
            title: "UI/UX Designer",
            company: "CreativeStudio",
            location: "Remote",
            seniority: "Mid-level",
            salary_range: "$60/hr - $80/hr",
            skills: ["Figma", "Prototyping", "User Research"],
            description: "Contract position for an upcoming project.",
            raw_hash: `mock-hash-${Date.now()}-3`,
          },
        ];

        let jobsFound = mockJobs.length;
        let jobsNew = 0;

        for (const job of mockJobs) {
          // Upsert based on raw_hash
          const { error } = await serviceClient.from("job_listings").insert([job]);
          if (!error) {
            jobsNew++;
          }
        }

        // Update run record
        await serviceClient
          .from("job_ingestion_runs")
          .update({
            status: "finished",
            finished_at: new Date().toISOString(),
            jobs_found: jobsFound,
            jobs_new: jobsNew,
          })
          .eq("id", run.id);

        return new Response(JSON.stringify({ success: true, runId: run.id, jobsFound, jobsNew }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
