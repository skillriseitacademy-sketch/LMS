import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sanitizeText } from "@/lib/sanitize";

export const Route = createFileRoute("/api/reports")({
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
          target_type?: "post" | "user" | "comment";
          target_id?: string;
          reason?: string;
        };

        const cleanReason = sanitizeText(body.reason, 2000, true);

        if (!body.target_type || !body.target_id || !cleanReason) {
          return new Response("target_type, target_id, and reason are required", { status: 400 });
        }

        if (!["post", "user", "comment"].includes(body.target_type)) {
          return new Response("Invalid target_type", { status: 400 });
        }

        const { data, error } = await serviceClient
          .from("reports")
          .insert({
            reporter_id: user.id,
            target_type: body.target_type,
            target_id: body.target_id,
            reason: cleanReason,
            status: "pending",
          })
          .select()
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
