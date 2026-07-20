export default async function handler(req: any, res: any) {
  // Set CORS headers if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.METERED_API_KEY;
    
    if (!apiKey) {
      console.error("Missing METERED_API_KEY in environment variables");
      return res.status(500).json({ error: "TURN server configuration error" });
    }

    const response = await fetch(`https://skillriseitacademy.metered.live/api/v1/turn/credentials?apiKey=${apiKey}`);
    
    if (!response.ok) {
      console.error("Failed to fetch TURN credentials from Metered API:", response.statusText);
      return res.status(500).json({ error: "Failed to fetch TURN credentials" });
    }

    const iceServers = await response.json();
    return res.status(200).json(iceServers);
  } catch (error) {
    console.error("Error fetching TURN credentials:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
