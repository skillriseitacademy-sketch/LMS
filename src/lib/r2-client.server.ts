/**
 * Cloudflare R2 client (S3-compatible)
 * Server-only — never imported in client bundles.
 * Requires: @aws-sdk/client-s3, @aws-sdk/s3-request-presigner
 *
 * Env vars required:
 *   R2_ACCOUNT_ID        — Cloudflare account ID
 *   R2_ACCESS_KEY_ID     — R2 API token access key
 *   R2_SECRET_ACCESS_KEY — R2 API token secret
 *   R2_BUCKET_NAME       — bucket name (e.g. "placepro-media")
 *   R2_PUBLIC_URL        — public serving URL for the bucket (e.g. https://media.yourapp.com)
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function getR2Client(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in your environment.",
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export type PresignedUploadResult = {
  uploadUrl: string; // Presigned PUT URL (client uploads directly to R2)
  publicUrl: string; // Final public URL to store in posts.media_urls[] or stories.media_url
  key: string; // R2 object key
};

/**
 * Generate a presigned PUT URL for direct client-to-R2 upload.
 * @param key       Object key in R2 (e.g. "posts/uuid/image.jpg")
 * @param contentType MIME type of the file being uploaded
 * @param expiresIn Seconds until the presigned URL expires (default 300 = 5 min)
 */
export async function createPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 300,
): Promise<PresignedUploadResult> {
  const client = getR2Client();
  const bucket = process.env.R2_BUCKET_NAME;
  const publicBase = process.env.R2_PUBLIC_URL;

  if (!bucket || !publicBase) {
    throw new Error("Missing R2_BUCKET_NAME or R2_PUBLIC_URL env var.");
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn });
  const publicUrl = `${publicBase.replace(/\/$/, "")}/${key}`;

  return { uploadUrl, publicUrl, key };
}
