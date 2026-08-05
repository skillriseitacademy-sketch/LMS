import { createFileRoute } from "@tanstack/react-router";
import { requireAuth, serviceClient, handleError, validateBody, ApiError } from "@/lib/api-utils";
import { sanitizeText } from "@/lib/sanitize";
import { z } from "zod";

const createClassSchema = z.object({
  title: z.string().min(1, "Title is required"),
  topic_id: z.string().uuid("Invalid topic ID"),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
});

export const Route = createFileRoute("/api/classes/create" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const user = await requireAuth(request);

          // Verify user is teacher
          const { data: profile } = await serviceClient
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
            
          if (profile?.role !== "teacher") {
            throw new ApiError(403, "Forbidden: Only teachers can create classes");
          }

          const body = await validateBody(request, createClassSchema);
          const cleanTitle = sanitizeText(body.title, 200);

          if (!cleanTitle) {
            throw new ApiError(400, "Invalid or empty title after sanitization");
          }

          // Create Daily.co room
          const dailyKey = process.env.DAILY_API_KEY;
          if (!dailyKey) throw new ApiError(500, "Missing DAILY_API_KEY configuration");

          const exp = Math.floor(new Date(body.end_time).getTime() / 1000) + 3600; // Room expires 1hr after end

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
            throw new ApiError(500, "Failed to create video room");
          }

          const room = await dailyRes.json();

          // Save to database
          const { data: inserted, error: dbError } = await serviceClient
            .from("live_classes")
            .insert({
              teacher_id: user.id,
              topic_id: body.topic_id,
              title: cleanTitle,
              start_time: body.start_time,
              end_time: body.end_time,
              daily_room_url: room.url,
              daily_room_name: room.name,
            })
            .select("id, title, start_time, end_time, daily_room_url")
            .single();

          if (dbError) {
            console.error("DB Error:", dbError);
            throw new ApiError(500, "Database error");
          }

          return new Response(JSON.stringify(inserted), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return handleError(error);
        }
      },
    },
  },
});
