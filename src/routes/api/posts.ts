import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sanitizeText } from "@/lib/sanitize";

export const Route = createFileRoute("/api/posts")({
  server: {
    handlers: {
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
          media_urls?: string[];
          visibility?: "public" | "connections" | "private";
          type?: "text" | "achievement" | "project" | "question";
          ref_type?: string;
          ref_id?: string;
        };

        const cleanContent = sanitizeText(body.content, 5000);

        if (!cleanContent) {
          return new Response("content is required", { status: 400 });
        }

        const { data, error } = await serviceClient
          .from("posts")
          .insert({
            user_id: user.id,
            content: cleanContent,
            media_urls: body.media_urls ?? [],
            visibility: body.visibility ?? "connections",
            type: body.type ?? "text",
            ref_type: body.ref_type ?? null,
            ref_id: body.ref_id ?? null,
          })
          .select(
            `
            id, user_id, content, media_urls, visibility, type, ref_type, ref_id, is_hidden, created_at,
            profiles (id, name, avatar_url, headline, role)
          `,
          )
          .single();

        if (error) {
          return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
