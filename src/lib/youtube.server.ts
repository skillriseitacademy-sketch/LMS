import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { supabase } from "./supabase";

const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || "";
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || "";
const YOUTUBE_REFRESH_TOKEN = process.env.YOUTUBE_REFRESH_TOKEN || "";

// Re-use the existing R2 client setup for fetching the video
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT_URL || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function getYouTubeAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: YOUTUBE_CLIENT_ID,
      client_secret: YOUTUBE_CLIENT_SECRET,
      refresh_token: YOUTUBE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function uploadToYouTube(recordingId: string, s3Key: string, title: string) {
  const accessToken = await getYouTubeAccessToken();
  const bucketName = process.env.R2_BUCKET_NAME || "placepro-media";

  // 1. Get file metadata (size) from R2
  const s3Object = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    }),
  );

  const fileSize = s3Object.ContentLength;
  const fileStream = s3Object.Body;

  if (!fileSize || !fileStream) {
    throw new Error("Could not retrieve file from R2");
  }

  // 2. Start Resumable Upload Session
  const metadata = {
    snippet: {
      title,
      description: "Class recorded automatically via PlacePro LMS.\n\nLearn more at our portal.",
      categoryId: "27", // Education
    },
    status: {
      privacyStatus: process.env.YOUTUBE_DEFAULT_VISIBILITY || "unlisted",
      selfDeclaredMadeForKids: false,
    },
  };

  const initResponse = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Upload-Content-Length": fileSize.toString(),
        "X-Upload-Content-Type": "video/mp4",
      },
      body: JSON.stringify(metadata),
    },
  );

  if (!initResponse.ok) {
    const errorText = await initResponse.text();
    if (errorText.includes("quotaExceeded")) {
      throw new Error("YOUTUBE_QUOTA_EXCEEDED");
    }
    throw new Error(`Failed to init upload: ${errorText}`);
  }

  const uploadUrl = initResponse.headers.get("Location");
  if (!uploadUrl) {
    throw new Error("No upload URL returned by YouTube");
  }

  // 3. Upload the actual video data
  // Use the native fetch with duplex: 'half' to stream from S3 body
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Length": fileSize.toString(),
      "Content-Type": "video/mp4",
    },
    body: fileStream as any,
    // @ts-ignore Node fetch extension
    duplex: "half",
  });

  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload file: ${await uploadResponse.text()}`);
  }

  const result = await uploadResponse.json();

  // 4. Update the DB
  await supabase
    .from("class_recordings")
    .update({
      status: "done",
      youtube_video_id: result.id,
      youtube_url: `https://youtu.be/${result.id}`,
      completed_at: new Date().toISOString(),
    })
    .eq("id", recordingId);

  return result.id;
}
