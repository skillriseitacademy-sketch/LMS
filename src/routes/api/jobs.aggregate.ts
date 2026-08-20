import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/jobs/aggregate" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Authenticate as a service role or check cron secret
        const authHeader = request.headers.get("Authorization");
        const cronSecret = process.env.CRON_SECRET;
        const token = authHeader?.replace("Bearer ", "");
        
        const isCronCall = !!cronSecret && token === cronSecret;

        const serviceClient = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        if (!isCronCall) {
          if (!token) return new Response("Unauthorized", { status: 401 });
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

        try {
          // Fetch real jobs from an external aggregator (Remotive API is free and public)
          const remotiveRes = await fetch("https://remotive.com/api/remote-jobs?limit=50");
          const remotiveData = await remotiveRes.json();
          const fetchedJobs = remotiveData.jobs || [];

          let jobsFound = fetchedJobs.length;
          let jobsNew = 0;

          for (const job of fetchedJobs) {
            const external_id = job.id.toString();
            const source = "remotive";
            const raw_hash = `${source}-${external_id}`;

            const jobListing = {
              title: job.title,
              company: job.company_name,
              location: job.candidate_required_location || "Remote",
              seniority: "Any", // Remotive doesn't explicitly provide this in all jobs
              salary_range: job.salary || null,
              skills: job.tags || [],
              description: job.description,
              url: job.url,
              source: source,
              external_id: external_id,
              type: job.job_type,
              raw_hash: raw_hash,
            };

            // Upsert based on raw_hash
            const { error } = await serviceClient
              .from("job_listings")
              .upsert(jobListing, { onConflict: 'raw_hash' });
              
            if (!error) {
              jobsNew++;
            } else {
              console.error("Error inserting job", error);
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
        } catch (err: any) {
          // Update run record with error
          await serviceClient
            .from("job_ingestion_runs")
            .update({
              status: "failed",
              finished_at: new Date().toISOString(),
              error_log: err.message,
            })
            .eq("id", run.id);

          return new Response(JSON.stringify({ error: "Ingestion failed" }), { status: 500 });
        }
      },
    },
  },
});
