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

        // 2. Upload directly to the local dev middleware via multipart/form-data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("context", context);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        });

        if (!uploadRes.ok) {
          let errMsg = `Upload failed (HTTP ${uploadRes.status})`;
          try {
            const body = await uploadRes.json();
            errMsg = body.error ?? errMsg;
          } catch {}
          throw new Error(errMsg);
        }

        const { publicUrl, key, bucket } = await uploadRes.json();

        if (!publicUrl) {
          throw new Error("Server did not return a valid public URL");
        }

        // 3. Success!
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
