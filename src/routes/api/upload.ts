import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { createPresignedUploadUrl, type R2Bucket } from "@/lib/r2-client.server";
import { nanoid } from "nanoid";

// ─── Allowed file types ───────────────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const ALLOWED_DOC_TYPES = ["application/pdf"];

const ALLOWED_TYPES_BY_BUCKET: Record<R2Bucket, string[]> = {
  media: [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES],
  recordings: [...ALLOWED_VIDEO_TYPES],
  content: [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_DOC_TYPES],
};

const MAX_SIZE_BYTES = 200 * 1024 * 1024; // 200 MB

// ─── Context → Bucket mapping ─────────────────────────────────────────────────

type UploadContext = "post" | "story" | "avatar" | "interview" | "course";

const CONTEXT_BUCKET_MAP: Record<UploadContext, R2Bucket> = {
  post: "media",
  story: "media",
  avatar: "media",
  interview: "recordings",
  course: "content",
};

/** Build the R2 object key based on context and user ID */
function buildKey(context: UploadContext, userId: string, filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
  const id = nanoid(12);

  switch (context) {
    case "post":      return `posts/${userId}/${id}.${ext}`;
    case "story":     return `stories/${userId}/${id}.${ext}`;
    case "avatar":    return `avatars/${userId}/${id}.${ext}`;
    case "interview": return `interviews/${userId}/${id}.${ext}`;
    case "course":    return `courses/${userId}/${id}.${ext}`;
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // ── Auth ──────────────────────────────────────────────────────────────
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

        // ── Parse body ────────────────────────────────────────────────────────
        const body = (await request.json()) as {
          filename?: string;
          content_type?: string;
          size_bytes?: number;
          context?: UploadContext;
        };

        if (!body.filename || !body.content_type) {
          return new Response("filename and content_type are required", { status: 400 });
        }

        const context: UploadContext = body.context ?? "post";
        const bucket = CONTEXT_BUCKET_MAP[context];
        const allowedTypes = ALLOWED_TYPES_BY_BUCKET[bucket];

        if (!allowedTypes.includes(body.content_type)) {
          return new Response(
            `content_type "${body.content_type}" is not allowed for context "${context}". ` +
            `Allowed: ${allowedTypes.join(", ")}`,
            { status: 400 },
          );
        }

        if (body.size_bytes && body.size_bytes > MAX_SIZE_BYTES) {
          return new Response("File too large (max 200 MB)", { status: 413 });
        }

        // ── Generate presigned URL ────────────────────────────────────────────
        const key = buildKey(context, user.id, body.filename);

        try {
          const result = await createPresignedUploadUrl(bucket, key, body.content_type);
          return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: any) {
          const msg = err?.message ?? "R2 presign failed";
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
