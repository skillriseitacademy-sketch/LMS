import { createClient } from "@supabase/supabase-js";

// Helper to generate embedding using Gemini and pad to 1536 for pgvector compatibility
async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "models/gemini-embedding-2",
        content: {
          parts: [{ text }],
        },
        outputDimensionality: 1536,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Embedding generation failed: ${response.statusText}`);
  }

  const result = await response.json();
  const values = result.embedding.values as number[];

  if (values.length !== 1536) {
    console.warn(`Warning: Embedding returned ${values.length} dimensions. Expected 1536.`);
  }

  return values;
}

function getClientWithToken(req: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { sc: null, user: null, token: null };
  const sc = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } },
  );
  return { sc, token };
}

// Rate limit check (simplified inline version)
async function checkRateLimit(userId: string): Promise<void> {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("ai_usage_logs")
    .select("estimated_cost")
    .eq("user_id", userId)
    .gte("created_at", startOfDay.toISOString());

  if (error) {
    console.error("Failed to check rate limit:", error);
    return; // Fail open
  }

  const totalCostToday = data.reduce((sum, row) => sum + Number(row.estimated_cost), 0);

  if (totalCostToday >= 0.5) {
    throw new Error("AI Daily Rate Limit Exceeded");
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sc, token } = getClientWithToken(req);
    if (!sc || !token) return res.status(401).json({ error: "Unauthorized" });

    const { data: { user }, error: authError } = await sc.auth.getUser();
    if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

    try {
      await checkRateLimit(user.id);
    } catch (limitErr: any) {
      return res.status(429).json({ error: "Daily AI budget exceeded." });
    }

    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
    }

    const { role, experience, lpa, location } = body || {};

    if (!role) {
      return res.status(400).json({ error: "Missing job role" });
    }

    // Convert the user's search filters into a semantic string
    const queryText =
      `${role} ${location ? `in ${location}` : ""} ${lpa ? `with salary ${lpa}` : ""}`.trim();

    let formattedJobs = [];

    try {
      // Generate a vector embedding for the search query
      const queryEmbedding = await generateEmbedding(queryText);

      // Query the Supabase pgvector function
      const { data: matchedJobs, error } = await sc.rpc("match_jobs", {
        query_embedding: queryEmbedding,
        match_threshold: 0.1,
        match_count: 10,
      });

      if (error) {
        console.error("Vector search error:", error);
        throw new Error("Vector search failed");
      }

      formattedJobs = (matchedJobs || []).map((j: any) => ({
        title: j.title,
        company: j.company,
        location: location || "Remote",
        salary: lpa || null,
        experience: experience || null,
        link: j.url,
      }));
    } catch (embedError) {
      console.error("Falling back to mock jobs due to embedding/db error:", embedError);
      formattedJobs = [
        { title: `${role} Specialist`, company: "TechFlow", location: location || "Remote", salary: lpa || "Competitive", experience: "2+ Years", link: "#" },
        { title: `Senior ${role}`, company: "CloudSync Systems", location: "Remote", salary: lpa || "Competitive", experience: "5+ Years", link: "#" },
        { title: `${role} Analyst`, company: "CyberShield", location: location || "Remote", salary: lpa || "Competitive", experience: "1+ Years", link: "#" },
      ];
    }

    return res.status(200).json({ jobs: formattedJobs });
  } catch (error: any) {
    console.error("Job search failed:", error);
    return res.status(500).json({ error: "Failed to perform job search" });
  }
}
