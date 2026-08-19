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

          // Generate a short 6-char alphanumeric room code
          const room_code = Math.random().toString(36).substring(2, 8).toUpperCase();

          // Save to database
          const { data: inserted, error: dbError } = await serviceClient
            .from("live_classes")
            .insert({
              host_id: user.id,
              topic_id: body.topic_id,
              title: cleanTitle,
              start_time: body.start_time,
              end_time: body.end_time,
              room_code: room_code,
              status: 'scheduled'
            })
            .select("id, title, start_time, end_time, room_code")
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
