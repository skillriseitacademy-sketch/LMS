import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/users/check-username")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const username = url.searchParams.get("u")?.toLowerCase();

        if (!username || !/^[a-z0-9_]{3,20}$/.test(username)) {
          return new Response(JSON.stringify({ available: false, error: "Invalid username format" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const serviceClient = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const { data, error } = await serviceClient
          .from("profiles")
          .select("id")
          .eq("username", username)
          .single();

        if (error && error.code === "PGRST116") {
          // PGRST116 is the PostgREST error for "0 rows returned" when using .single()
          return new Response(JSON.stringify({ available: true }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ available: false }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
