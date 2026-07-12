import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const serviceClient = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const {
          data: { user },
          error: authError,
        } = await serviceClient.auth.getUser(token);
        if (authError || !user) return new Response("Unauthorized", { status: 401 });

        const url = new URL(request.url);
        const tab = url.searchParams.get("tab") || "recents";
        const cursor = url.searchParams.get("cursor");
        const limit = 20;

        // Get blocked list
        const { data: blocked } = await serviceClient
          .from("connections")
          .select("follower_id, following_id")
          .eq("status", "blocked")
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

        const blockedIds = (blocked ?? []).map((c: any) =>
          c.follower_id === user.id ? c.following_id : c.follower_id,
        );

        // Get accepted connections
        const { data: conns } = await serviceClient
          .from("connections")
          .select("follower_id, following_id")
          .eq("status", "accepted")
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

        const connectionIds = (conns ?? []).map((c: any) =>
          c.follower_id === user.id ? c.following_id : c.follower_id,
        );

        let query = serviceClient
          .from("posts")
          .select(
            `
            id, user_id, content, media_urls, visibility, type, ref_type, ref_id, is_hidden, created_at,
            profiles:user_id (id, name, username, avatar_url, headline, role),
            post_reactions (reaction_type, user_id),
            post_comments (id)
          `,
          )
          .eq("is_hidden", false)
          .limit(limit)
          .order("created_at", { ascending: false });

        if (cursor) {
          query = query.lt("created_at", cursor);
        }

        // Exclude blocked users
        if (blockedIds.length > 0) {
          query = query.not("user_id", "in", `(${blockedIds.join(",")})`);
        }

        if (tab === "friends") {
          const friendIds = [...connectionIds, user.id];
          if (friendIds.length === 0) {
            return new Response(JSON.stringify({ posts: [], nextCursor: null }), {
              headers: { "Content-Type": "application/json" },
            });
          }
          query = query.in("user_id", friendIds);
        } else if (tab === "popular") {
          const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
          query = query.gte("created_at", since).eq("visibility", "public");
        } else {
          // Recents: public + own + connections posts
          const visibleUserIds = [...connectionIds, user.id];
          query = query.or(
            `visibility.eq.public,user_id.eq.${user.id}${visibleUserIds.length > 1 ? `,and(visibility.eq.connections,user_id.in.(${visibleUserIds.join(",")}))` : ""}`,
          );
        }

        const { data: posts, error } = await query;
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        const result = posts ?? [];

        return new Response(
          JSON.stringify({
            posts: result,
            nextCursor: result.length === limit ? result[result.length - 1].created_at : null,
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
