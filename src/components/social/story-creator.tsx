/**
 * StoryCreator — Modal for creating a new story.
 *
 * Flow:
 *   1. User picks image or video via useR2Upload (context: 'story')
 *   2. Images are compressed client-side via Canvas (max 1080px, JPEG 0.8)
 *      before upload to save R2 bandwidth & speed up the upload.
 *   3. On submit: R2 upload → POST /api/stories → invalidate ['stories'] query.
 *
 * Props:
 *   open      — controls visibility
 *   onClose   — called when the modal should close
 */

import { useState, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { X, ImagePlus, Type, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { STORIES_KEY } from "@/hooks/useStories";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type StoryType = "status" | "streak" | "achievement" | "media";

interface StoryCreatorProps {
  open: boolean;
  onClose: () => void;
}

// ─── Canvas compression helper ────────────────────────────────────────────────

async function compressImage(file: File): Promise<File> {
  const MAX_DIM = 1080;
  const QUALITY = 0.8;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width <= MAX_DIM && height <= MAX_DIM) {
        resolve(file); // Already small enough, no compression needed
        return;
      }

      const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Canvas compression failed")); return; }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
        },
        "image/jpeg",
        QUALITY
      );
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}

// ─── Gradient backgrounds for text stories ───────────────────────────────────

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function StoryCreator({ open, onClose }: StoryCreatorProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"pick" | "text" | "preview">("pick");
  const [textContent, setTextContent] = useState("");
  const [storyType, setStoryType] = useState<StoryType>("status");
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setMode("pick");
    setTextContent("");
    setStoryType("status");
    setSelectedGradient(GRADIENTS[0]);
    setMediaPreview(null);
    setMediaFile(null);
    setUploading(false);
    setError(null);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  // File picker for image/video
  const handleFilePick = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    try {
      const processed = file.type.startsWith("image/") ? await compressImage(file) : file;
      setMediaFile(processed);
      setMediaPreview(URL.createObjectURL(processed));
      setStoryType("media");
      setMode("preview");
    } catch (err: any) {
      setError(err.message ?? "Failed to process file");
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setUploading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const token = session.access_token;

      let mediaUrl: string | null = null;

      // Upload media to R2 if present
      if (mediaFile) {
        const presignRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            filename: mediaFile.name,
            content_type: mediaFile.type,
            size_bytes: mediaFile.size,
            context: "story",
          }),
        });
        if (!presignRes.ok) throw new Error("Failed to get upload URL");
        const { uploadUrl, publicUrl } = await presignRes.json();

        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": mediaFile.type },
          body: mediaFile,
        });
        if (!uploadRes.ok) throw new Error("Upload to R2 failed");
        mediaUrl = publicUrl;
      }

      // Create the story
      const storyRes = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          content: textContent || null,
          media_url: mediaUrl,
          story_type: storyType,
        }),
      });
      if (!storyRes.ok) throw new Error("Failed to create story");

      // Invalidate stories query so the strip updates immediately
      queryClient.invalidateQueries({ queryKey: STORIES_KEY });
      handleClose();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setUploading(false);
    }
  }, [mediaFile, textContent, storyType, queryClient, handleClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-sm rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-display font-bold text-lg text-foreground">Create Story</h2>
            <button
              onClick={handleClose}
              className="rounded-full p-1.5 hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {mode === "pick" && (
              <div className="grid grid-cols-2 gap-3">
                {/* Media option */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-border hover:border-brand hover:bg-brand/5 transition-all"
                >
                  <ImagePlus className="h-8 w-8 text-brand" />
                  <span className="text-sm font-medium text-foreground">Photo / Video</span>
                </button>

                {/* Text option */}
                <button
                  onClick={() => setMode("text")}
                  className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-border hover:border-brand hover:bg-brand/5 transition-all"
                >
                  <Type className="h-8 w-8 text-brand" />
                  <span className="text-sm font-medium text-foreground">Text Story</span>
                </button>
              </div>
            )}

            {mode === "text" && (
              <div className="space-y-3">
                {/* Live preview */}
                <div
                  className="rounded-xl h-48 flex items-center justify-center p-4 text-white text-center font-bold text-lg leading-snug transition-all"
                  style={{ background: selectedGradient }}
                >
                  {textContent || <span className="opacity-50 font-normal text-base">Your text appears here</span>}
                </div>

                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="What's on your mind?"
                  maxLength={280}
                  rows={3}
                  className="w-full resize-none rounded-lg bg-muted border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50"
                />

                {/* Gradient picker */}
                <div className="flex gap-2 flex-wrap">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGradient(g)}
                      className={`h-8 w-8 rounded-full transition-all ${selectedGradient === g ? "ring-2 ring-offset-2 ring-brand scale-110" : "hover:scale-105"}`}
                      style={{ background: g }}
                    />
                  ))}
                </div>

                {/* Story type */}
                <div className="flex gap-2 flex-wrap">
                  {(["status", "streak", "achievement"] as StoryType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setStoryType(t)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                        storyType === t
                          ? "bg-brand text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {t === "streak" ? "🔥" : t === "achievement" ? "⭐" : "💬"} {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === "preview" && mediaPreview && (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden bg-black aspect-[9/16] max-h-64 flex items-center justify-center">
                  {mediaFile?.type.startsWith("video/") ? (
                    <video src={mediaPreview} className="max-h-64 max-w-full object-contain" controls muted />
                  ) : (
                    <img src={mediaPreview} alt="Preview" className="max-h-64 max-w-full object-contain" />
                  )}
                </div>
                <button
                  onClick={() => { setMode("pick"); setMediaPreview(null); setMediaFile(null); }}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Choose different file
                </button>
              </div>
            )}

            {error && (
              <p className="text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
            )}
          </div>

          {/* Footer */}
          {(mode === "text" || mode === "preview") && (
            <div className="p-4 pt-0">
              <button
                onClick={handleSubmit}
                disabled={uploading || (mode === "text" && !textContent.trim()) || (mode === "preview" && !mediaFile)}
                className="w-full rounded-full bg-brand text-white font-semibold py-2.5 text-sm hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Posting...</> : "Share Story"}
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            className="hidden"
            onChange={handleFilePick}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
