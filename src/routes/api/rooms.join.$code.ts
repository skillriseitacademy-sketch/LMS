import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/api/rooms/join/$code")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { code } = params;
        const { data } = await supabase
          .from("instant_rooms")
          .select("*")
          .eq("room_code", code.toUpperCase())
          .eq("is_active", true)
          .single();

        if (!data) {
          return new Response("Room not found or inactive", { status: 404 });
        }
        
        return new Response(JSON.stringify(data), { 
          headers: { "Content-Type": "application/json" } 
        });
      },
    },
  },
});
