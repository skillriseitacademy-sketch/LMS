import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/posts/$postId")({
  server: {
    handlers: {
      DELETE: async ({ request, params }) => {
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

        const postId = params.postId;

        // Verify ownership or admin
        const { data: post } = await serviceClient
          .from("posts")
          .select("user_id")
          .eq("id", postId)
          .single();

        const { data: profile } = await serviceClient
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!post) return new Response("Not found", { status: 404 });
        if (post.user_id !== user.id && profile?.role !== "admin") {
          return new Response("Forbidden", { status: 403 });
        }

        const { error } = await serviceClient.from("posts").delete().eq("id", postId);
        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

        return new Response(null, { status: 204 });
      },

      PATCH: async ({ request, params }) => {
        // Toggle is_hidden for the owner
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

        const body = (await request.json()) as { is_hidden?: boolean };
        const postId = params.postId;

        const { data, error } = await serviceClient
          .from("posts")
          .update({ is_hidden: body.is_hidden })
          .eq("id", postId)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
