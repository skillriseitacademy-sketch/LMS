import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sanitizeText } from "@/lib/sanitize";

export const Route = createFileRoute("/api/posts/$postId/comments")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
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

        const { data, error } = await serviceClient
          .from("post_comments")
          .select(
            `
            id, post_id, user_id, content, created_at,
            profiles:user_id (id, name, avatar_url)
          `,
          )
          .eq("post_id", params.postId)
          .order("created_at", { ascending: true });

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify(data ?? []), {
          headers: { "Content-Type": "application/json" },
        });
      },

      POST: async ({ request, params }) => {
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

        const body = (await request.json()) as { content?: string };
        const cleanContent = sanitizeText(body.content, 2000);

        if (!cleanContent) {
          return new Response("content is required", { status: 400 });
        }

        const { data, error } = await serviceClient
          .from("post_comments")
          .insert({
            post_id: params.postId,
            user_id: user.id,
            content: cleanContent,
          })
          .select(
            `
            id, post_id, user_id, content, created_at,
            profiles:user_id (id, name, avatar_url)
          `,
          )
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
