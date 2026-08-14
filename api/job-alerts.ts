import { createClient } from "@supabase/supabase-js";

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

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { sc, token } = getClientWithToken(req);
    if (!sc || !token) return res.status(401).json({ error: "Unauthorized" });

    const { data: { user }, error: authError } = await sc.auth.getUser();
    if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

    if (req.method === "GET") {
      const { data, error } = await sc.from("job_alerts").select("*").eq("user_id", user.id).eq("is_active", true);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ alerts: data });
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
      }

      const { role, location, action, alertId } = body || {};

      if (action === "unsubscribe" && alertId) {
        const { error } = await sc.from("job_alerts").delete().eq("id", alertId).eq("user_id", user.id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      if (action === "subscribe" && role) {
        const { data, error } = await sc.from("job_alerts").upsert(
          { user_id: user.id, role_keyword: role, location_keyword: location || null, is_active: true },
          { onConflict: "user_id, role_keyword" }
        ).select().single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true, alert: data });
      }

      return res.status(400).json({ error: "Invalid action" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Job alerts error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
