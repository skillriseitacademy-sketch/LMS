import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

type InviteRequestBody = {
  email: string;
  role: "student" | "teacher" | "admin";
  name: string;
};

export const Route = createFileRoute("/api/admin/invite")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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

          // Verify the user is an admin
          const { data: profile } = await serviceClient
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

          if (profile?.role !== "admin") {
            return new Response("Forbidden: Admins only", { status: 403 });
          }

          const body = (await request.json()) as InviteRequestBody;
          if (!body.email || !body.role || !body.name) {
            return new Response("Missing required fields", { status: 400 });
          }

          // Invite user using Supabase Admin API
          // We pass the role and name in the metadata so our handle_new_user trigger applies them automatically.
          const { data: inviteData, error: inviteError } = await serviceClient.auth.admin.inviteUserByEmail(
            body.email,
            {
              data: {
                role: body.role,
                name: body.name,
              },
            }
          );

          if (inviteError) {
            return new Response(inviteError.message, { status: 400 });
          }

          return new Response(JSON.stringify({ success: true, user: inviteData.user }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e: any) {
          return new Response(e.message || "Internal Server Error", { status: 500 });
        }
      },
    },
  },
});
