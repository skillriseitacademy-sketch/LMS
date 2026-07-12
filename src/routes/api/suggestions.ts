import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

export const Route = createFileRoute("/api/suggestions")({
  server: {
    handlers: {
      GET: async ({ request }) => {
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

        // Get current user's enrolled topics
        const { data: myTopics } = await serviceClient
          .from("student_topics")
          .select("topic_id")
          .eq("user_id", user.id);

        const myTopicIds = (myTopics ?? []).map((t: any) => t.topic_id);

        // Get already connected / blocked users to exclude
        const { data: existingConns } = await serviceClient
          .from("connections")
          .select("follower_id, following_id")
          .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`);

        const excludeIds = new Set<string>([user.id]);
        (existingConns ?? []).forEach((c: any) => {
          excludeIds.add(c.follower_id === user.id ? c.following_id : c.follower_id);
        });

        // Find users in the same topics, not already connected
        let query = serviceClient
          .from("student_topics")
          .select(
            `
            user_id,
            profiles:user_id (id, name, username, avatar_url, headline, role, visibility)
          `,
          )
          .limit(20);

        if (myTopicIds.length > 0) {
          query = query.in("topic_id", myTopicIds);
        }

        const { data: candidates } = await query;

        // Deduplicate and filter out excluded users
        const seen = new Set<string>();
        const suggestions: any[] = [];

        for (const c of candidates ?? []) {
          const profile = (c as any).profiles;
          if (!profile) continue;
          if (excludeIds.has(profile.id)) continue;
          if (seen.has(profile.id)) continue;
          seen.add(profile.id);
          suggestions.push(profile);
          if (suggestions.length >= 5) break;
        }

        return new Response(JSON.stringify(suggestions), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
