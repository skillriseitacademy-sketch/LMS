import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// busboy is a dev dependency for multipart parsing in the upload middleware
// eslint-disable-next-line @typescript-eslint/no-require-imports
const busboy = require("busboy") as (opts: Record<string, unknown>) => NodeJS.EventEmitter & {
  on(event: "file", cb: (fieldname: string, stream: NodeJS.ReadableStream, info: { filename: string; mimeType: string }) => void): void;
  on(event: "field", cb: (name: string, val: string) => void): void;
  on(event: "close" | "error", cb: (...args: unknown[]) => void): void;
};

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

        // ── Parse multipart form ──────────────────────────────────────────────
        const contentType = req.headers["content-type"] || "";
        if (!contentType.includes("multipart/form-data")) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Expected multipart/form-data" }));
          return;
        }

        try {
          const { fileBuffer, mimeType, filename, context } = await new Promise<{
            fileBuffer: Buffer;
            mimeType: string;
            filename: string;
            context: string;
          }>((resolve, reject) => {
            const bb = busboy({ headers: req.headers, limits: { fileSize: 200 * 1024 * 1024 } });
            let fileBuffer: Buffer | null = null;
            let mimeType = "application/octet-stream";
            let filename = "upload";
            let context = "post";
            const chunks: Buffer[] = [];

            bb.on("file", (fieldname, stream, info) => {
              mimeType = info.mimeType;
              filename = info.filename || "upload";
              stream.on("data", (d: Buffer) => chunks.push(d));
              stream.on("end", () => { fileBuffer = Buffer.concat(chunks); });
            });
            bb.on("field", (name, val) => {
              if (name === "context") context = val;
            });
            bb.on("close", () => {
              if (!fileBuffer) return reject(new Error("No file received"));
              resolve({ fileBuffer, mimeType, filename, context });
            });
            bb.on("error", reject);
            req.pipe(bb);
          });

          // ── Choose bucket based on context ────────────────────────────────
          const bucketMap: Record<string, string> = {
            post: "placepro-media",
            story: "placepro-media",
            avatar: "placepro-media",
            interview: "placepro-recordings",
            course: "placepro-content",
          };
          const publicUrlMap: Record<string, string> = {
            post: "placepro-media",
            story: "placepro-media",
            avatar: "placepro-media",
            interview: "placepro-recordings",
            course: "placepro-content",
          };
          const R2_PUBLIC_URLS: Record<string, string> = {
            "placepro-media": env.R2_PUBLIC_URL_MEDIA || env.VITE_R2_PUBLIC_URL_MEDIA || "",
            "placepro-recordings": env.R2_PUBLIC_URL_RECORDINGS || env.VITE_R2_PUBLIC_URL_RECORDINGS || "",
            "placepro-content": env.R2_PUBLIC_URL_CONTENT || env.VITE_R2_PUBLIC_URL_CONTENT || "",
          };

          const bucketName = bucketMap[context] ?? "placepro-media";
          const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
          const id = Math.random().toString(36).slice(2, 14);
          const key = `${context}s/${user.id}/${id}.${ext}`;

          // ── Upload to R2 ──────────────────────────────────────────────────
          const r2 = new S3Client({
            region: "auto",
            endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
              accessKeyId: env.R2_ACCESS_KEY_ID,
              secretAccessKey: env.R2_SECRET_ACCESS_KEY,
            },
          });

          await r2.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: fileBuffer,
            ContentType: mimeType,
          }));

          const baseUrl = R2_PUBLIC_URLS[bucketName] || "";
          const publicUrl = baseUrl ? `${baseUrl}/${key}` : `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucketName}/${key}`;

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ publicUrl, key, bucket: bucketName }));
        } catch (err: any) {
          console.error("[upload-middleware] error:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: err?.message || "Upload failed" }));
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
