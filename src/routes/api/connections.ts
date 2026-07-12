import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/connections")({
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
        const filter = url.searchParams.get("filter") || "accepted"; // accepted | pending | all

        let query = serviceClient
          .from("connections")
          .select(
            `
            id, follower_id, following_id, status, created_at,
            follower:follower_id (id, name, avatar_url, headline, role),
            following:following_id (id, name, avatar_url, headline, role)
          `,
          )
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

        if (filter !== "all") {
          query = query.eq("status", filter);
        }

        const { data, error } = await query.order("created_at", { ascending: false });
        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

        return new Response(JSON.stringify(data ?? []), {
          headers: { "Content-Type": "application/json" },
        });
      },

      // POST /api/connections — follow or send request
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
          action: string;
          target_id?: string;
          connection_id?: string;
        };

        if (body.action === "follow" && body.target_id) {
          // Determine if target profile is public (instant accept) or private (pending)
          const { data: targetProfile } = await serviceClient
            .from("profiles")
            .select("visibility")
            .eq("id", body.target_id)
            .single();

          const status = targetProfile?.visibility === "public" ? "accepted" : "pending";

          const { data, error } = await serviceClient
            .from("connections")
            .upsert(
              { follower_id: user.id, following_id: body.target_id, status },
              { onConflict: "follower_id,following_id" },
            )
            .select()
            .single();

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (body.action === "accept" && body.connection_id) {
          const { data, error } = await serviceClient
            .from("connections")
            .update({ status: "accepted" })
            .eq("id", body.connection_id)
            .eq("following_id", user.id) // Only the target can accept
            .select()
            .single();

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          });
        }

        if (body.action === "decline" && body.connection_id) {
          const { data, error } = await serviceClient
            .from("connections")
            .update({ status: "declined" })
            .eq("id", body.connection_id)
            .eq("following_id", user.id)
            .select()
            .single();

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          });
        }

        if (body.action === "block" && body.target_id) {
          // Upsert a blocked record (replaces any existing connection either direction)
          // First remove any existing connection
          await serviceClient
            .from("connections")
            .delete()
            .or(
              `and(follower_id.eq.${user.id},following_id.eq.${body.target_id}),and(follower_id.eq.${body.target_id},following_id.eq.${user.id})`,
            );

          const { data, error } = await serviceClient
            .from("connections")
            .insert({ follower_id: user.id, following_id: body.target_id, status: "blocked" })
            .select()
            .single();

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify(data), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (body.action === "unblock" && body.target_id) {
          await serviceClient
            .from("connections")
            .delete()
            .eq("follower_id", user.id)
            .eq("following_id", body.target_id)
            .eq("status", "blocked");

          return new Response(null, { status: 204 });
        }

        if (body.action === "unfollow" && body.target_id) {
          await serviceClient
            .from("connections")
            .delete()
            .eq("follower_id", user.id)
            .eq("following_id", body.target_id);

          return new Response(null, { status: 204 });
        }

        return new Response("Invalid action", { status: 400 });
      },
    },
  },
});
