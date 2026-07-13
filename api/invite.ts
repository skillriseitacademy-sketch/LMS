import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Set CORS headers if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    // Use environment variables directly (Vercel automatically provides process.env)
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
       console.error("Missing Supabase env vars");
       return res.status(500).json({ error: "Server Configuration Error: Missing Supabase keys" });
    }

    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await serviceClient.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

    const { data: profile } = await serviceClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { email, role, name, password } = body || {};
    if (!email || !role || !name || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: inviteData, error: inviteError } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, name },
    });

    if (inviteError) {
      console.error("Supabase createUser error:", inviteError);
      let errorStr = "Failed to create user";
      if (inviteError.message) {
        errorStr = inviteError.message;
      } else if (typeof inviteError === 'string') {
        errorStr = inviteError;
      } else if (inviteError instanceof Error) {
        errorStr = inviteError.toString();
      } else {
        try {
          const str = JSON.stringify(inviteError);
          errorStr = str !== "{}" ? str : "Empty error object returned from Supabase. Check Vercel logs.";
        } catch (e) {}
      }
      return res.status(400).json({ error: errorStr });
    }

    return res.status(200).json({ success: true, user: inviteData.user });
  } catch (e: any) {
    console.error("API Error:", e);
    return res.status(500).json({ error: e.message || "Internal Server Error" });
  }
}
