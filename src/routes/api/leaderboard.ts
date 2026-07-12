import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/leaderboard")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const authHeader = request.headers.get("Authorization");
          const token = authHeader?.replace("Bearer ", "");
          if (!token) return new Response("Unauthorized", { status: 401 });

          const serviceClient = createClient(
            process.env.VITE_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );

          // Get the current user
          const { data: { user }, error: authError } = await serviceClient.auth.getUser(token);
          if (authError || !user) return new Response("Unauthorized", { status: 401 });

          // Fetch all students who are public or the user themselves, and aggregate XP
          const { data: profiles, error: profError } = await serviceClient
            .from("profiles")
            .select("id, name, username, avatar_url, visibility, role")
            .eq("role", "student");

          if (profError) throw profError;

          // Note: In a large production app, we'd do this via a SQL View or RPC.
          // For now, we fetch XP and streaks and join in memory for the top N.
          const { data: xpData } = await serviceClient.from("xp_transactions").select("user_id, amount");
          const { data: streakData } = await serviceClient.from("streak_history").select("user_id");

          // Calculate totals
          const xpMap = new Map();
          for (const x of xpData || []) {
            xpMap.set(x.user_id, (xpMap.get(x.user_id) || 0) + x.amount);
          }

          const streakMap = new Map();
          for (const s of streakData || []) {
            streakMap.set(s.user_id, (streakMap.get(s.user_id) || 0) + 1); // rough streak count based on entries
          }

          // Build leaderboard array
          const board = profiles
            .filter(p => p.visibility === "public" || p.id === user.id)
            .map(p => ({
              id: p.id,
              name: p.name,
              username: p.username,
              avatar_url: p.avatar_url,
              initials: p.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
              xp: xpMap.get(p.id) || 0,
              level: Math.floor((xpMap.get(p.id) || 0) / 200) + 1,
              streak: streakMap.get(p.id) || 0,
              quizzes: 0, // Placeholder if we don't fetch quiz counts
              you: p.id === user.id
            }))
            .sort((a, b) => b.xp - a.xp)
            .map((p, index) => ({ ...p, rank: index + 1 }));

          return new Response(JSON.stringify({ leaderboard: board }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message, { status: 500 });
        }
      },
    },
  },
});
