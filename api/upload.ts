import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
       return res.status(500).json({ error: "Server Configuration Error: Missing Supabase keys" });
    }

    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await serviceClient.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    const { filename, content_type, size_bytes, context = "post" } = body || {};

    if (!filename || !content_type) {
      return res.status(400).json({ error: "filename and content_type are required" });
    }

    // ── Choose bucket based on context ────────────────────────────────
    const BUCKET_MAP: Record<string, { bucket: string, publicUrl: string }> = {
      post: { bucket: process.env.R2_BUCKET_MEDIA || "placepro-media", publicUrl: process.env.R2_PUBLIC_URL_MEDIA || "" },
      story: { bucket: process.env.R2_BUCKET_MEDIA || "placepro-media", publicUrl: process.env.R2_PUBLIC_URL_MEDIA || "" },
      avatar: { bucket: process.env.R2_BUCKET_MEDIA || "placepro-media", publicUrl: process.env.R2_PUBLIC_URL_MEDIA || "" },
      interview: { bucket: process.env.R2_BUCKET_RECORDINGS || "placepro-recordings", publicUrl: process.env.R2_PUBLIC_URL_RECORDINGS || "" },
      course: { bucket: process.env.R2_BUCKET_CONTENT || "placepro-content", publicUrl: process.env.R2_PUBLIC_URL_CONTENT || "" },
    };

    const bucketConfig = BUCKET_MAP[context];
    if (!bucketConfig) {
      return res.status(400).json({ error: "Invalid context" });
    }

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

    if (!accountId || !accessKeyId || !secretAccessKey) {
      return res.status(500).json({ error: "Missing R2 credentials in environment" });
    }

    const ext = filename.split(".").pop()?.toLowerCase() ?? "bin";
    const id = Math.random().toString(36).slice(2, 14);
    const key = `${context}s/${user.id}/${id}.${ext}`;

    const r2 = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
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
      : `https://${accountId}.r2.cloudflarestorage.com/${bucketConfig.bucket}/${key}`;

    return res.status(200).json({ uploadUrl, publicUrl, key, bucket: bucketConfig.bucket });
  } catch (e: any) {
    console.error("Upload API Error:", e);
    return res.status(500).json({ error: e.message || "Internal Server Error" });
  }
}
