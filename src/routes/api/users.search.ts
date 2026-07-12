import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/users/search")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const url = new URL(request.url);
        const q = url.searchParams.get("q")?.toLowerCase();

        if (!q || q.length < 2) {
          return new Response(JSON.stringify({ users: [] }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const serviceClient = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const {
          data: { user },
          error: authError,
        } = await serviceClient.auth.getUser(token);
        if (authError || !user) return new Response("Unauthorized", { status: 401 });

        // Get blocked list
        const { data: blocked } = await serviceClient
          .from("connections")
          .select("follower_id, following_id")
          .eq("status", "blocked")
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

        const blockedIds = (blocked ?? []).map((c: any) =>
          c.follower_id === user.id ? c.following_id : c.follower_id,
        );
        blockedIds.push(user.id); // Also exclude self from search

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
          .from("profiles")
          .select("id, name, username, avatar_url, headline, role, visibility")
          .or(`username.ilike.%${q}%,name.ilike.%${q}%`)
          .limit(20);

        // Filter: Public OR connected
        if (connectionIds.length > 0) {
          query = query.or(`visibility.eq.public,id.in.(${connectionIds.join(",")})`);
        } else {
          query = query.eq("visibility", "public");
        }

        // Exclude blocked and self
        if (blockedIds.length > 0) {
          query = query.not("id", "in", `(${blockedIds.join(",")})`);
        }

        const { data: users, error } = await query;

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        // Return connection status for UI
        const enrichedUsers = await Promise.all(
          (users || []).map(async (u) => {
            const { data: conn } = await serviceClient
              .from("connections")
              .select("status, follower_id")
              .or(
                `and(follower_id.eq.${user.id},following_id.eq.${u.id}),and(follower_id.eq.${u.id},following_id.eq.${user.id})`
              )
              .maybeSingle();

            let connectionStatus = "none";
            if (conn) {
              if (conn.status === "accepted") connectionStatus = "connected";
              else if (conn.status === "pending" && conn.follower_id === user.id) connectionStatus = "pending";
              else if (conn.status === "pending" && conn.follower_id === u.id) connectionStatus = "received";
            }

            return {
              ...u,
              connectionStatus,
            };
          })
        );

        return new Response(JSON.stringify({ users: enrichedUsers }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
