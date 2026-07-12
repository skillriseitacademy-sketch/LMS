import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/stories")({
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
            profiles:user_id (id, name, username, avatar_url)
          `,
          )
          .in("user_id", visibleUserIds)
          .gt("expires_at", new Date().toISOString())
          .order("created_at", { ascending: false });

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

        return new Response(JSON.stringify(data ?? []), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request }) => {
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

        const body = (await request.json()) as {
          content?: string;
          media_url?: string;
          story_type?: "status" | "streak" | "achievement" | "media";
        };

        if (!body.content && !body.media_url) {
          return new Response("content or media_url is required", { status: 400 });
        }

        const { data, error } = await serviceClient
          .from("stories")
          .insert({
            user_id: user.id,
            content: body.content ?? null,
            media_url: body.media_url ?? null,
            story_type: body.story_type ?? "status",
          })
          .select()
          .single();

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
