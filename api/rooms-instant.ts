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

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    // Just mocking Daily.co creation as the original code did.
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const roomUrl = `https://mock-daily-room.daily.co/${roomCode}`;

    return res.status(200).json({ roomCode, roomUrl });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
