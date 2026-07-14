import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { sanitizeText } from "@/lib/sanitize";

export const Route = createFileRoute("/api/classes/create")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response("Unauthorized", { status: 401 });

          const {
            data: { user },
            error: authError,
          } = await supabase.auth.getUser(token);
          if (authError || !user) return new Response("Unauthorized", { status: 401 });

          // Verify user is teacher
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
          if (profile?.role !== "teacher") return new Response("Forbidden", { status: 403 });

          const { title, topic_id, start_time, end_time } = await request.json();
          const cleanTitle = sanitizeText(title, 200);
          
          if (!cleanTitle || !topic_id || !start_time || !end_time) {
            return new Response("Missing required fields", { status: 400 });
          }

          // Create Daily.co room
          const dailyKey = process.env.DAILY_API_KEY;
          if (!dailyKey) return new Response("Missing DAILY_API_KEY", { status: 500 });

          const exp = Math.floor(new Date(end_time).getTime() / 1000) + 3600; // Room expires 1hr after end

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
            return new Response("Failed to create video room", { status: 500 });
          }

          const room = await dailyRes.json();

          // Save to database
          const { data: inserted, error: dbError } = await supabase
            .from("live_classes")
            .insert({
              teacher_id: user.id,
              topic_id,
              title: cleanTitle,
              start_time,
              end_time,
              daily_room_url: room.url,
              daily_room_name: room.name,
            })
            .select()
            .single();

          if (dbError) {
            console.error("DB Error:", dbError);
            return new Response("Database error", { status: 500 });
          }

          return new Response(JSON.stringify(inserted), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
