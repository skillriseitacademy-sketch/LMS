import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

// ── Upload API middleware (dev only) ─────────────────────────────────────────
// This handles multipart file uploads to Cloudflare R2.
// The browser sends the file directly here (same-origin, no CORS) and the
// middleware streams it to R2 using the AWS S3-compatible API.
function uploadMiddlewarePlugin() {
  return {
    name: "api-upload-middleware",
    configureServer(server: any) {
      server.middlewares.use("/api/upload", async (req: any, res: any) => {
        // CORS preflight
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
          res.writeHead(405);
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const env = loadEnv("development", process.cwd(), "");

        // ── Auth ──────────────────────────────────────────────────────────────
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Unauthorized" }));
          return;
        }

        const supa = createClient(
          env.VITE_SUPABASE_URL,
          env.SUPABASE_SERVICE_ROLE_KEY,
        );
        const { data: { user }, error: authErr } = await supa.auth.getUser(token);
        if (authErr || !user) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Unauthorized" }));
          return;
        }

        // ── Read body ──────────────────────────────────────────────
        let bodyStr = "";
        for await (const chunk of req) {
          bodyStr += chunk;
        }

        let body: any;
        try {
          body = JSON.parse(bodyStr);
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON body" }));
          return;
        }

        const { filename, content_type, context = "post" } = body;
        if (!filename || !content_type) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: `filename and content_type are required. Got body: ${JSON.stringify(body)}` }));
          return;
        }

        // ── Choose bucket based on context ────────────────────────────────
        const BUCKET_MAP: Record<string, { bucket: string, publicUrl: string }> = {
          post: { bucket: env.R2_BUCKET_MEDIA || "placepro-media", publicUrl: env.R2_PUBLIC_URL_MEDIA || "" },
          story: { bucket: env.R2_BUCKET_MEDIA || "placepro-media", publicUrl: env.R2_PUBLIC_URL_MEDIA || "" },
          avatar: { bucket: env.R2_BUCKET_MEDIA || "placepro-media", publicUrl: env.R2_PUBLIC_URL_MEDIA || "" },
          interview: { bucket: env.R2_BUCKET_RECORDINGS || "placepro-recordings", publicUrl: env.R2_PUBLIC_URL_RECORDINGS || "" },
          course: { bucket: env.R2_BUCKET_CONTENT || "placepro-content", publicUrl: env.R2_PUBLIC_URL_CONTENT || "" },
        };

        const bucketConfig = BUCKET_MAP[context];
        if (!bucketConfig) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid context" }));
          return;
        }

        const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
        const id = Math.random().toString(36).slice(2, 14);
        const key = `${context}s/${user.id}/${id}.${ext}`;

        try {
          const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
          const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

          const r2 = new S3Client({
            region: "auto",
            endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: env.R2_ACCESS_KEY_ID,
              secretAccessKey: env.R2_SECRET_ACCESS_KEY,
            },
          });

          const command = new PutObjectCommand({
            Bucket: bucketConfig.bucket,
            Key: key,
            ContentType: content_type,
          });

          const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 });
          const publicUrl = bucketConfig.publicUrl 
            ? `${bucketConfig.publicUrl.replace(/\/$/, "")}/${key}` 
            : `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucketConfig.bucket}/${key}`;

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ uploadUrl, publicUrl, key, bucket: bucketConfig.bucket }));
        } catch (err: any) {
          console.error("[upload-middleware] error:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: err?.message || "Presign failed" }));
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
    uploadMiddlewarePlugin(),
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
