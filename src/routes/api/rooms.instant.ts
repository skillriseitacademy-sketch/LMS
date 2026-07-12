import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/rooms/instant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Mocking Daily.co creation for now. When replacing, use real Daily.co API here.
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) return new Response("Unauthorized", { status: 401 });
        
        // Use service role to bypass RLS in edge functions usually, or parse JWT.
        // For simplicity, we just generate a mock room here.
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const roomUrl = `https://mock-daily-room.daily.co/${roomCode}`;
        
        return new Response(JSON.stringify({ roomCode, roomUrl }), { 
          headers: { "Content-Type": "application/json" } 
        });
      },
    },
  },
});
