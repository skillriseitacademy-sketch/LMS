import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/turn")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const apiKey = process.env.METERED_API_KEY;
          
          if (!apiKey) {
            console.error("Missing METERED_API_KEY in environment variables");
            return new Response("TURN server configuration error", { status: 500 });
          }

          const response = await fetch(`https://skillriseitacademy.metered.live/api/v1/turn/credentials?apiKey=${apiKey}`);
          
          if (!response.ok) {
            console.error("Failed to fetch TURN credentials from Metered API:", response.statusText);
            return new Response("Failed to fetch TURN credentials", { status: 500 });
          }

          const iceServers = await response.json();
          
          return new Response(JSON.stringify(iceServers), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error fetching TURN credentials:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    },
  },
});
