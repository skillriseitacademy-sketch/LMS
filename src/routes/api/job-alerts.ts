import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

async function getClientWithToken(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return { sc: null, user: null };
  const sc = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
  const { data: { user }, error } = await sc.auth.getUser();
  if (error || !user) return { sc: null, user: null };
  return { sc, user };
}

export const Route = createFileRoute("/api/job-alerts" as any)({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { sc, user } = await getClientWithToken(request);
        if (!sc || !user) return new Response("Unauthorized", { status: 401 });

        const { data, error } = await sc.from("job_alerts").select("*").eq("user_id", user.id).eq("is_active", true);

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify({ alerts: data }), { headers: { "Content-Type": "application/json" } });
      },
      POST: async ({ request }) => {
        const { sc, user } = await getClientWithToken(request);
        if (!sc || !user) return new Response("Unauthorized", { status: 401 });

        const body = await request.json();
        const { role, location, action, alertId } = body;

        if (action === "unsubscribe" && alertId) {
          const { error } = await sc.from("job_alerts").delete().eq("id", alertId).eq("user_id", user.id);
          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify({ success: true }));
        }

        if (action === "subscribe" && role) {
          const { data, error } = await sc.from("job_alerts").upsert(
            { user_id: user.id, role_keyword: role, location_keyword: location || null, is_active: true },
            { onConflict: "user_id, role_keyword" }
          ).select().single();

          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          return new Response(JSON.stringify({ success: true, alert: data }));
        }

        return new Response("Invalid action", { status: 400 });
      }
    }
  }
});
