/**
 * Cloudflare R2 client (S3-compatible) — Multi-bucket
 * Server-only — never imported in client bundles.
 * Requires: @aws-sdk/client-s3, @aws-sdk/s3-request-presigner
 *
 * Buckets:
 *   placepro-media       — Public user-generated media (posts, stories, avatars)
 *   placepro-recordings  — Private interview & class recordings
 *   placepro-content     — Private course materials & admin uploads
 *
 * Env vars required:
 *   R2_ACCOUNT_ID            — Cloudflare account ID
 *   R2_ACCESS_KEY_ID         — R2 API token access key
 *   R2_SECRET_ACCESS_KEY     — R2 API token secret
 *
 *   R2_BUCKET_MEDIA          — e.g. "placepro-media"
 *   R2_PUBLIC_URL_MEDIA      — e.g. "https://pub-xxx.r2.dev"
 *
 *   R2_BUCKET_RECORDINGS     — e.g. "placepro-recordings"
 *   R2_PUBLIC_URL_RECORDINGS — e.g. "https://pub-xxx.r2.dev"
 *
 *   R2_BUCKET_CONTENT        — e.g. "placepro-content"
 *   R2_PUBLIC_URL_CONTENT    — e.g. "https://pub-xxx.r2.dev"
 */

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// ─── Bucket Types ────────────────────────────────────────────────────────────

/** The three R2 buckets available in this project. */
export type R2Bucket = "media" | "recordings" | "content";

const BUCKET_ENV_MAP: Record<R2Bucket, { name: string; publicUrl: string }> = {
  media: {
    name: "R2_BUCKET_MEDIA",
    publicUrl: "R2_PUBLIC_URL_MEDIA",
  },
  recordings: {
    name: "R2_BUCKET_RECORDINGS",
    publicUrl: "R2_PUBLIC_URL_RECORDINGS",
  },
  content: {
    name: "R2_BUCKET_CONTENT",
    publicUrl: "R2_PUBLIC_URL_CONTENT",
  },
};

// ─── Shared S3 Client ─────────────────────────────────────────────────────────

let _client: S3Client | null = null;

function getR2Client(): S3Client {
  if (_client) return _client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.",
    );
  }

  _client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return _client;
}

function getBucketConfig(bucket: R2Bucket): { bucketName: string; publicBase: string } {
  const envKeys = BUCKET_ENV_MAP[bucket];
  const bucketName = process.env[envKeys.name];
  const publicBase = process.env[envKeys.publicUrl];

  if (!bucketName || !publicBase) {
    throw new Error(
      `Missing R2 env vars for bucket "${bucket}": ${envKeys.name}, ${envKeys.publicUrl}`,
    );
  }

  return { bucketName, publicBase };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type PresignedUploadResult = {
  /** Presigned PUT URL — client uploads directly to R2 */
  uploadUrl: string;
  /** Final public/CDN URL to store in the database */
  publicUrl: string;
  /** R2 object key */
  key: string;
  /** Which bucket this was uploaded to */
  bucket: R2Bucket;
};

// ─── Upload (Presigned PUT) ───────────────────────────────────────────────────

/**
 * Generate a presigned PUT URL for direct client-to-R2 upload.
 *
 * @param bucket      Target bucket: "media" | "recordings" | "content"
 * @param key         Object key in R2 (e.g. "posts/uuid/image.jpg")
 * @param contentType MIME type of the file being uploaded
 * @param expiresIn   Seconds until the presigned URL expires (default 300 = 5 min)
 *
 * @example
 * // Upload a post image to the public media bucket
 * const result = await createPresignedUploadUrl("media", "posts/abc/photo.jpg", "image/jpeg");
 *
 * // Upload an interview recording to the private recordings bucket
 * const result = await createPresignedUploadUrl("recordings", "interviews/session-123/rec.webm", "video/webm");
 */
export async function createPresignedUploadUrl(
  bucket: R2Bucket,
  key: string,
  contentType: string,
  expiresIn = 300,
): Promise<PresignedUploadResult> {
  const client = getR2Client();
  const { bucketName, publicBase } = getBucketConfig(bucket);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn });
  const publicUrl = `${publicBase.replace(/\/$/, "")}/${key}`;

  return { uploadUrl, publicUrl, key, bucket };
}

// ─── Download (Presigned GET) ─────────────────────────────────────────────────

/**
 * Generate a presigned GET URL to serve a private object (recordings, content).
 * Do NOT use for "media" bucket objects — those are publicly accessible via publicUrl.
 *
 * @param bucket    Target bucket: "recordings" | "content"
 * @param key       Object key in R2
 * @param expiresIn Seconds until the URL expires (default 3600 = 1 hour)
 *
 * @example
 * // Serve a private interview recording to its owner
 * const url = await createPresignedDownloadUrl("recordings", "interviews/session-123/rec.webm");
 */
export async function createPresignedDownloadUrl(
  bucket: R2Bucket,
  key: string,
  expiresIn = 3600,
): Promise<string> {
  const client = getR2Client();
  const { bucketName } = getBucketConfig(bucket);

  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  return getSignedUrl(client, command, { expiresIn });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * Delete an object from an R2 bucket.
 *
 * @param bucket Target bucket
 * @param key    Object key to delete
 */
export async function deleteObject(bucket: R2Bucket, key: string): Promise<void> {
  const client = getR2Client();
  const { bucketName } = getBucketConfig(bucket);

  await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
}

// ─── Convenience Helpers ──────────────────────────────────────────────────────

/**
 * Get the public CDN URL for an object in the media bucket (no auth needed).
 * Use this for post images, story media, and avatars.
 */
export function getPublicMediaUrl(key: string): string {
  const { publicBase } = getBucketConfig("media");
  return `${publicBase.replace(/\/$/, "")}/${key}`;
}
