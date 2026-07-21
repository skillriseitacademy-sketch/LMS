import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/notifications")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const serviceClient = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: { user }, error: authError } = await serviceClient.auth.getUser(token);
        if (authError || !user) return new Response("Unauthorized", { status: 401 });

        const { data, error } = await serviceClient
          .from("notifications")
          .select(`
            id, type, ref_id, is_read, created_at,
            actor:actor_id (name, avatar_url)
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        
        return new Response(JSON.stringify(data ?? []), {
          headers: { "Content-Type": "application/json" }
        });
      },

      POST: async ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const serviceClient = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: { user }, error: authError } = await serviceClient.auth.getUser(token);
        if (authError || !user) return new Response("Unauthorized", { status: 401 });

        const body = (await request.json().catch(() => ({}))) as { notification_id?: string, mark_all?: boolean };

        if (body.mark_all) {
          const { error } = await serviceClient
            .from("notifications")
            .update({ is_read: true })
            .eq("user_id", user.id)
            .eq("is_read", false);
          
          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        } else if (body.notification_id) {
          const { error } = await serviceClient
            .from("notifications")
            .update({ is_read: true })
            .eq("id", body.notification_id)
            .eq("user_id", user.id);
            
          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
});
