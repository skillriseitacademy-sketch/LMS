import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

async function getUser(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  const sc = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: { user }, error } = await sc.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

export const Route = createFileRoute("/api/job-alerts" as any)({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const sc = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        const { data, error } = await sc.from("job_alerts").select("*").eq("user_id", user.id).eq("is_active", true);

        if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        return new Response(JSON.stringify({ alerts: data }), { headers: { "Content-Type": "application/json" } });
      },
      POST: async ({ request }) => {
        const user = await getUser(request);
        if (!user) return new Response("Unauthorized", { status: 401 });

        const body = await request.json();
        const { role, location, action, alertId } = body;

        const sc = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

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
