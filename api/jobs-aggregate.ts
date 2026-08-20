import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  const token = authHeader?.replace("Bearer ", "");
  
  const isCronCall = !!cronSecret && token === cronSecret;

  const serviceClient = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  if (!isCronCall) {
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const { data: { user }, error: authError } = await serviceClient.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

    const { data: profile } = await serviceClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  const { data: run, error: runError } = await serviceClient
    .from("job_ingestion_runs")
    .insert([{ status: "running" }])
    .select()
    .single();

  if (runError || !run) {
    return res.status(500).json({ error: "Failed to start ingestion run" });
  }

  try {
    let allNormalizedJobs: any[] = [];

    // 1. Fetch from Remotive (Free)
    try {
      const remotiveRes = await fetch("https://remotive.com/api/remote-jobs?limit=50");
      if (remotiveRes.ok) {
        const remotiveData = await remotiveRes.json();
        const jobs = remotiveData.jobs || [];
        for (const job of jobs) {
          allNormalizedJobs.push({
            title: job.title,
            company: job.company_name,
            location: job.candidate_required_location || "Remote",
            seniority: "Any",
            salary_range: job.salary || null,
            skills: job.tags || [],
            description: job.description,
            url: job.url,
            source: "remotive",
            external_id: job.id.toString(),
            type: job.job_type,
            raw_hash: `remotive-${job.id}`,
          });
        }
      }
    } catch (e) {
      console.error("Remotive fetch error:", e);
    }

    // 2. Fetch from RapidAPI JSearch (if configured)
    if (process.env.RAPIDAPI_KEY) {
      try {
        const jsearchRes = await fetch("https://jsearch.p.rapidapi.com/search?query=developer%20jobs&num_pages=1", {
          headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "jsearch.p.rapidapi.com"
          }
        });
        if (jsearchRes.ok) {
          const jsearchData = await jsearchRes.json();
          const jobs = jsearchData.data || [];
          for (const job of jobs) {
            allNormalizedJobs.push({
              title: job.job_title,
              company: job.employer_name,
              location: job.job_city ? `${job.job_city}, ${job.job_country}` : (job.job_is_remote ? "Remote" : "Unknown"),
              seniority: "Any",
              salary_range: job.job_min_salary ? `${job.job_salary_currency} ${job.job_min_salary} - ${job.job_max_salary}` : null,
              skills: [],
              description: job.job_description,
              url: job.job_apply_link,
              source: "jsearch",
              external_id: job.job_id,
              type: job.job_employment_type,
              raw_hash: `jsearch-${job.job_id}`,
            });
          }
        }
      } catch (e) {
        console.error("JSearch fetch error:", e);
      }
    }

    let jobsFound = allNormalizedJobs.length;
    let jobsNew = 0;

    for (const jobListing of allNormalizedJobs) {
      const { error } = await serviceClient
        .from("job_listings")
        .upsert(jobListing, { onConflict: 'raw_hash' });
        
      if (!error) jobsNew++;
    }

    await serviceClient
      .from("job_ingestion_runs")
      .update({
        status: "finished",
        finished_at: new Date().toISOString(),
        jobs_found: jobsFound,
        jobs_new: jobsNew,
      })
      .eq("id", run.id);

    return res.status(200).json({ success: true, runId: run.id, jobsFound, jobsNew });
  } catch (err: any) {
    await serviceClient
      .from("job_ingestion_runs")
      .update({
        status: "failed",
        finished_at: new Date().toISOString(),
        error_log: err.message,
      })
      .eq("id", run.id);

    return res.status(500).json({ error: "Ingestion failed" });
  }
}
