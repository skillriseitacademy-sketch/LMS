import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/admin/ai-analytics" as any)({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const sc = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        const {
          data: { user },
          error: authError,
        } = await sc.auth.getUser(token);
        if (authError || !user) return new Response("Unauthorized", { status: 401 });

        // Ensure user is admin
        const { data: profile } = await sc
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role !== "admin") {
          return new Response("Forbidden", { status: 403 });
        }

        // Fetch analytics from ai_usage_logs
        // Total cost
        const { data: allLogs, error: logError } = await sc
          .from("ai_usage_logs")
          .select(
            "estimated_cost, provider, model, prompt_tokens, completion_tokens, user_id, action_type",
          );

        if (logError || !allLogs) {
          return new Response("Error fetching logs", { status: 500 });
        }

        const totalCost = allLogs.reduce((acc, row) => acc + Number(row.estimated_cost), 0);

        // Group by provider
        const costByProvider = allLogs.reduce((acc: any, row) => {
          acc[row.provider] = (acc[row.provider] || 0) + Number(row.estimated_cost);
          return acc;
        }, {});

        // Group by model
        const costByModel = allLogs.reduce((acc: any, row) => {
          acc[row.model] = (acc[row.model] || 0) + Number(row.estimated_cost);
          return acc;
        }, {});

        // Group by action type
        const costByActionType = allLogs.reduce((acc: any, row) => {
          acc[row.action_type] = (acc[row.action_type] || 0) + Number(row.estimated_cost);
          return acc;
        }, {});

        // Calculate total tokens
        const totalTokens = allLogs.reduce(
          (acc, row) => acc + Number(row.prompt_tokens) + Number(row.completion_tokens),
          0,
        );

        return new Response(
          JSON.stringify({
            totalCost,
            totalTokens,
            costByProvider,
            costByModel,
            costByActionType,
            logCount: allLogs.length,
          }),
          { headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
