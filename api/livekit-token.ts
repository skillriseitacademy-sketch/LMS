import { createClient } from "@supabase/supabase-js";
import { AccessToken } from "livekit-server-sdk";

function getClientWithToken(req: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { sc: null, token: null };
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
    let user = null;
    if (sc) {
      const { data } = await sc.auth.getUser();
      user = data?.user;
    }

    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
    }

    const { roomCode, userName, isHost } = body || {};

    if (!roomCode || !userName) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const identity = user?.id ? user.id : userName;
    const name = user?.user_metadata?.name || userName;

    const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "devkey";
    const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || "secret";

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: identity,
      name: name,
    });

    at.addGrant({
      roomJoin: true,
      room: roomCode,
      canPublish: true,
      canSubscribe: true,
      roomAdmin: isHost,
    });

    const jwtToken = await at.toJwt();
    return res.status(200).json({ token: jwtToken });
  } catch (error: any) {
    console.error("LiveKit Token Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
