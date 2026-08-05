import { createFileRoute } from "@tanstack/react-router";
import { requireAuth, serviceClient, handleError, validateBody } from "@/lib/api-utils";
import { sanitizeText, isValidUrl } from "@/lib/sanitize";
import { z } from "zod";

const createStorySchema = z.object({
  content: z.string().optional(),
  media_url: z.string().url().optional().or(z.literal("")),
  story_type: z.enum(["status", "streak", "achievement", "media"]).optional().default("status"),
});

export const Route = createFileRoute("/api/stories" as any)({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const user = await requireAuth(request);

        // Get accepted connections
        const { data: conns } = await serviceClient
          .from("connections")
          .select("follower_id, following_id")
          .eq("status", "accepted")
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

        const connectionIds = (conns ?? []).map((c: any) =>
          c.follower_id === user.id ? c.following_id : c.follower_id,
        );

        // Get blocked ids to exclude
        const { data: blocked } = await serviceClient
          .from("connections")
          .select("follower_id, following_id")
          .eq("status", "blocked")
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);
        const blockedIds = (blocked ?? []).map((c: any) =>
          c.follower_id === user.id ? c.following_id : c.follower_id,
        );

        // Get public profiles to include their stories
        const { data: publicProfiles } = await serviceClient
          .from("profiles")
          .select("id")
          .eq("visibility", "public");
        const publicIds = (publicProfiles ?? []).map((p: any) => p.id);

        const visibleUserIds = [...new Set([user.id, ...connectionIds, ...publicIds])].filter(
          (id) => !blockedIds.includes(id),
        );

        const { data, error } = await serviceClient
          .from("stories")
          .select(
            `
            id, user_id, content, media_url, story_type, expires_at, created_at,
            profiles (id, name, username, avatar_url)
          `,
          )
          .in("user_id", visibleUserIds)
          .gt("expires_at", new Date().toISOString())
          .order("created_at", { ascending: false });

        if (error) {
          console.error("API STORIES ERROR:", error);
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(data ?? []), {
          headers: { "Content-Type": "application/json" },
        });
        } catch (error) {
          return handleError(error);
        }
      },

      POST: async ({ request }) => {
        try {
          const user = await requireAuth(request);
          const body = await validateBody(request, createStorySchema);

        const cleanContent = sanitizeText(body.content, 500);
        const isMediaUrlValid = isValidUrl(body.media_url ?? "");

        if (!cleanContent && !isMediaUrlValid) {
          console.error(
            "API STORIES 400 ERROR. Content:",
            cleanContent,
            "Media:",
            isMediaUrlValid,
            "Raw media_url:",
            body.media_url,
          );
          return new Response("valid content or media_url is required", { status: 400 });
        }

        const { data, error } = await serviceClient
          .from("stories")
          .insert({
            user_id: user.id,
            content: cleanContent || null,
            media_url: isMediaUrlValid ? body.media_url : null,
            story_type: body.story_type ?? "status",
          })
          .select()
          .single();

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify(data), {
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
