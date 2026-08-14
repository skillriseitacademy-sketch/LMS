import { createClient } from "@supabase/supabase-js";

function getClientWithToken(req: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { sc: null, user: null };
  const sc = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for backend logic
  );
  return { sc, token };
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
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sc, token } = getClientWithToken(req);
    if (!sc || !token) return res.status(401).json({ error: "Unauthorized" });

    // Verify user is teacher
    const { data: { user }, error: authError } = await createClient(
      process.env.VITE_SUPABASE_URL!,
      process.env.VITE_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    ).auth.getUser();

    if (authError || !user) return res.status(401).json({ error: "Unauthorized" });

    const { data: profile } = await sc
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
      
    if (profile?.role !== "teacher") {
      return res.status(403).json({ error: "Forbidden: Only teachers can create classes" });
    }

    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
    }

    const { title, topic_name, start_time } = body || {};

    if (!title || !start_time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Default 24 hour duration since no limit is requested
    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); 

    // Find or create topic
    let topicId = null;
    if (topic_name) {
      const { data: existingTopic } = await sc.from("topics").select("id").ilike("title", topic_name).maybeSingle();
      if (existingTopic) {
        topicId = existingTopic.id;
      } else {
        const { data: newTopic, error: topicError } = await sc.from("topics").insert({ title: topic_name, description: "Auto-created topic" }).select("id").single();
        if (newTopic) topicId = newTopic.id;
      }
    }

    // Since topic_id might be required by schema, fallback to a default topic if necessary.
    // If not required, we can just insert null. If it fails, we fall back to a known topic.
    // For safety, we will just try to fetch the first topic if topicId is null.
    if (!topicId) {
      const { data: firstTopic } = await sc.from("topics").select("id").limit(1).single();
      topicId = firstTopic?.id;
    }

    // Create Daily.co room
    let roomUrl = "";
    let roomName = "";
    const dailyKey = process.env.DAILY_API_KEY;

    if (!dailyKey) {
      // Mock it
      roomName = Math.random().toString(36).substring(2, 8).toUpperCase();
      roomUrl = `https://mock-daily-room.daily.co/${roomName}`;
    } else {
      const exp = Math.floor(endDate.getTime() / 1000) + 3600;

      const dailyRes = await fetch("https://api.daily.co/v1/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dailyKey}`,
        },
        body: JSON.stringify({
          properties: {
            exp,
            enable_chat: true,
          },
        }),
      });

      if (!dailyRes.ok) {
        const errorText = await dailyRes.text();
        console.error("Daily API Error:", errorText);
        return res.status(500).json({ error: "Failed to create video room" });
      }

      const room = await dailyRes.json();
      roomUrl = room.url;
      roomName = room.name;
    }

    // Save to database
    const { data: inserted, error: dbError } = await sc
      .from("live_classes")
      .insert({
        teacher_id: user.id,
        topic_id: topicId, // Required by DB
        title: title,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        daily_room_url: roomUrl,
        daily_room_name: roomName,
      })
      .select("id, title, start_time, end_time, daily_room_url")
      .single();

    if (dbError) {
      console.error("DB Error:", dbError);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(201).json(inserted);
  } catch (error: any) {
    console.error("Create class error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
