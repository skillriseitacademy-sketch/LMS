import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Vite plugin that handles /api/invite during local development
function apiMiddlewarePlugin() {
  return {
    name: "api-invite-middleware",
    configureServer(server: any) {
      server.middlewares.use("/api/invite", async (req: any, res: any, next: any) => {
        if (req.method === "OPTIONS") {
          res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          });
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        // Read body
        let bodyStr = "";
        for await (const chunk of req) {
          bodyStr += chunk;
        }

        try {
          const env = loadEnv("development", process.cwd(), "");
          const supabaseUrl = env.VITE_SUPABASE_URL;
          const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

          if (!supabaseUrl || !serviceKey) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env" }));
            return;
          }

          const authHeader = req.headers.authorization;
          const token = authHeader?.replace("Bearer ", "");
          if (!token) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Unauthorized: No token provided" }));
            return;
          }

          const serviceClient = createClient(supabaseUrl, serviceKey);

          // Verify the calling user
          const { data: userData, error: authError } = await serviceClient.auth.getUser(token);
          if (authError || !userData.user) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Unauthorized: Invalid token" }));
            return;
          }

          // Check admin role
          const { data: profile } = await serviceClient
            .from("profiles")
            .select("role")
            .eq("id", userData.user.id)
            .single();

          if (profile?.role !== "admin") {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Forbidden: Only admins can create accounts" }));
            return;
          }

          let body: any;
          try {
            body = JSON.parse(bodyStr);
          } catch {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON body" }));
            return;
          }

          const { email, role, name, password } = body;
          if (!email || !role || !name || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: `Missing required fields. Got: email=${!!email}, role=${!!role}, name=${!!name}, password=${!!password}` }));
            return;
          }

          // Create the user
          const { data: inviteData, error: inviteError } = await serviceClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role, name },
          });

          if (inviteError) {
            console.error("Supabase createUser error:", inviteError);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: inviteError.message || "Failed to create user" }));
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, user: inviteData.user }));
        } catch (e: any) {
          console.error("API middleware error:", e);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: e.message || "Internal Server Error" }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    apiMiddlewarePlugin(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});
