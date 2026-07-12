import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createPresignedUploadUrl } from "@/lib/r2-client.server";
import { nanoid } from "nanoid";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
];

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export const Route = createFileRoute("/api/upload")({
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
          filename?: string;
          content_type?: string;
          size_bytes?: number;
          context?: "post" | "story" | "avatar"; // where is this being used
        };

        if (!body.filename || !body.content_type) {
          return new Response("filename and content_type are required", { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(body.content_type)) {
          return new Response(`content_type must be one of: ${ALLOWED_TYPES.join(", ")}`, {
            status: 400,
          });
        }

        if (body.size_bytes && body.size_bytes > MAX_SIZE_BYTES) {
          return new Response("File too large (max 50 MB)", { status: 413 });
        }

        // Generate a unique, safe object key
        const ext = body.filename.split(".").pop()?.toLowerCase() ?? "bin";
        const context = body.context ?? "post";
        const key = `${context}s/${user.id}/${nanoid(12)}.${ext}`;

        try {
          const result = await createPresignedUploadUrl(key, body.content_type);
          return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: any) {
          const msg = err?.message ?? "R2 presign failed";
          // If R2 env vars are not set, return a helpful error instead of crashing
          if (msg.includes("Missing R2")) {
            return new Response(
              JSON.stringify({
                error: "Media upload not configured. Set R2_* env vars in deployment.",
              }),
              { status: 503, headers: { "Content-Type": "application/json" } },
            );
          }
          return new Response(JSON.stringify({ error: msg }), { status: 500 });
        }
      },
    },
  },
});
