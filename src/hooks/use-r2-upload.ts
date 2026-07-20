import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export type UploadContext = "post" | "story" | "avatar" | "interview" | "course";

export interface UploadResult {
  publicUrl: string;
  key: string;
  bucket: string;
}

/**
 * Hook for uploading files to Cloudflare R2 via the local Vite dev middleware (/api/upload).
 * The file is sent as multipart/form-data directly to our local server (same-origin, no CORS),
 * which then streams it to R2 using the AWS SDK.
 *
 * Usage:
 *   const { openPicker, uploading, error } = useR2Upload({ context: "avatar" });
 *   <button onClick={() => openPicker((result) => console.log(result.publicUrl))}>
 *     Upload Photo
 *   </button>
 */
export function useR2Upload(options: { context: UploadContext; accept?: string }) {
  const { context, accept = "image/jpeg,image/png,image/webp,image/gif" } = options;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lazily create the hidden file input once
  function ensureInput(onFile: (file: File) => void) {
    if (!inputRef.current) {
      const el = document.createElement("input");
      el.type = "file";
      el.accept = accept;
      el.style.display = "none";
      document.body.appendChild(el);
      inputRef.current = el;
    }

    // Re-assign listener each time (avoids stale closure)
    inputRef.current.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onFile(file);
      // Reset so the same file can be picked again
      if (inputRef.current) inputRef.current.value = "";
    };

    inputRef.current.click();
  }

  /**
   * Open the file picker. When a file is chosen it is uploaded to R2 through
   * the /api/upload Vite middleware and the `onSuccess` callback is called.
   */
  function openPicker(onSuccess: (result: UploadResult) => void) {
    setError(null);

    ensureInput(async (file) => {
      setUploading(true);
      setError(null);

      try {
        // 1. Get auth token
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Not authenticated — please log in again");

        // 2. Ask the server for a pre-signed upload URL
        const presignRes = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            filename: file.name,
            content_type: file.type,
            size_bytes: file.size,
            context,
          }),
        });

        if (!presignRes.ok) {
          let errMsg = `Failed to get upload URL (HTTP ${presignRes.status})`;
          try {
            const body = await presignRes.json();
            errMsg = body.error ?? errMsg;
          } catch {}
          throw new Error(errMsg);
        }

        const { uploadUrl, publicUrl, key, bucket } = await presignRes.json();

        if (!uploadUrl || !publicUrl) {
          throw new Error("Server did not return valid upload URLs");
        }

        // 3. Upload the file directly to Cloudflare R2 using the presigned URL
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadRes.ok) {
          throw new Error(`R2 upload failed with status ${uploadRes.status}`);
        }

        // 4. Success!
        onSuccess({
          publicUrl,
          key: key ?? "",
          bucket: bucket ?? "",
        });
      } catch (err: any) {
        console.error("[useR2Upload] upload error:", err);
        setError(err?.message ?? "Upload failed");
      } finally {
        setUploading(false);
      }
    });
  }

  return { openPicker, uploading, error };
}
