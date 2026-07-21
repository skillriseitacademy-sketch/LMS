import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/posts/$postId/react")({
  server: {
    handlers: {
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

        const body = (await request.json()) as { reaction_type?: string };
        const postId = params.postId;
        const validTypes = ["like", "fire", "clap", "brain", "rocket"];

        if (!body.reaction_type || !validTypes.includes(body.reaction_type)) {
          return new Response("Invalid reaction_type", { status: 400 });
        }

        // Upsert: if same type → delete (toggle off), else replace with new type
        const { data: existing } = await serviceClient
          .from("post_reactions")
          .select("id, reaction_type")
          .eq("post_id", postId)
          .eq("user_id", user.id)
          .single();

        if (existing) {
          if (existing.reaction_type === body.reaction_type) {
            // Toggle off
            await serviceClient.from("post_reactions").delete().eq("id", existing.id);
            return new Response(JSON.stringify({ removed: true }), {
              headers: { "Content-Type": "application/json" },
            });
          } else {
            // Change reaction type
            const { data } = await serviceClient
              .from("post_reactions")
              .update({ reaction_type: body.reaction_type })
              .eq("id", existing.id)
              .select()
              .single();
            return new Response(JSON.stringify(data), {
              headers: { "Content-Type": "application/json" },
            });
          }
        }

        // New reaction
        const { data, error } = await serviceClient
          .from("post_reactions")
          .insert({ post_id: postId, user_id: user.id, reaction_type: body.reaction_type })
          .select()
          .single();

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

        // Add Notification
        const { data: postData } = await serviceClient.from("posts").select("user_id").eq("id", postId).single();
        if (postData && postData.user_id !== user.id) {
          await serviceClient.from("notifications").insert({
            user_id: postData.user_id,
            actor_id: user.id,
            type: "like",
            ref_id: postId
          });
        }

        return new Response(JSON.stringify(data), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
