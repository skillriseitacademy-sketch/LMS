/**
 * POST /api/stories/views
 *   Body: { story_ids: string[] }
 *   Inserts story_views rows for the current user. ON CONFLICT DO NOTHING
 *   prevents duplicates if the viewer re-opens the same story.
 *
 * GET /api/stories/views?ids=id1,id2,...
 *   Returns the subset of provided story IDs that the current user has viewed.
 *   Used by useStories hook to compute ring seen-state.
 *
 * GET /api/stories/views?story_id=...
 *   Returns viewer list for story owner's "Seen by" bottom sheet.
 */

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

function serviceClient() {
  return createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

async function getUser(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const { data: { user }, error } = await serviceClient().auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export const Route = createFileRoute("/api/stories/views")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const url = new URL(request.url);
        const sc = serviceClient();

        // ── Mode 1: viewer checks which story IDs they've seen ──────────────
        const ids = url.searchParams.get("ids");
        if (ids) {
          const storyIds = ids.split(",").filter(Boolean);
          if (storyIds.length === 0) return new Response("[]", { headers: { "Content-Type": "application/json" } });

          const { data, error } = await sc
            .from("story_views")
            .select("story_id")
            .eq("viewer_id", user.id)
            .in("story_id", storyIds);

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          const seenIds = (data ?? []).map((r: any) => r.story_id);
          return new Response(JSON.stringify(seenIds), { headers: { "Content-Type": "application/json" } });
        }

        // ── Mode 2: story owner fetches viewers for a specific story ─────────
        const storyId = url.searchParams.get("story_id");
        if (storyId) {
          // Verify the requester owns this story
          const { data: story } = await sc
            .from("stories")
            .select("user_id")
            .eq("id", storyId)
            .single();

          if (!story || story.user_id !== user.id) {
            return new Response("Forbidden", { status: 403 });
          }

          const { data, error } = await sc
            .from("story_views")
            .select("viewer_id, viewed_at, profiles:viewer_id(name, avatar_url)")
            .eq("story_id", storyId)
            .order("viewed_at", { ascending: false });

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify({ viewers: data ?? [], count: (data ?? []).length }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response("Missing query param: ids or story_id", { status: 400 });
      },

      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const { story_ids } = await request.json() as { story_ids?: string[] };
        if (!Array.isArray(story_ids) || story_ids.length === 0) {
          return new Response("story_ids array is required", { status: 400 });
        }

        const rows = story_ids.map((story_id) => ({
          story_id,
          viewer_id: user.id,
        }));

        const sc = serviceClient();
        const { error } = await sc
          .from("story_views")
          .upsert(rows, { onConflict: "story_id,viewer_id", ignoreDuplicates: true });

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify({ ok: true }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
