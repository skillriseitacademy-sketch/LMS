import { useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { ImageIcon, Loader2, Video, BarChart2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useR2Upload } from "@/hooks/use-r2-upload";

export function PostComposer({ onPostSuccess }: { onPostSuccess?: () => void }) {
  const { session } = useAuth();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "connections" | "private">("connections");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const { openPicker: openPhotoPicker, uploading: photoUploading } = useR2Upload({
    context: "post",
    accept: "image/jpeg,image/png,image/webp,image/gif",
  });

  if (!session) return null;

  const initials = (session.name || "U").slice(0, 2).toUpperCase();
  const firstName = session.name?.split(" ")[0] || "there";

  const handleSubmit = async () => {
    if (!content.trim() && mediaUrls.length === 0) return;
    setIsSubmitting(true);
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const token = currentSession?.access_token ?? "";
      
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          visibility,
          type: "text",
          media_urls: mediaUrls,
        }),
      });
      if (res.ok) {
        setContent("");
        setMediaUrls([]);
        onPostSuccess?.();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="rounded-[16px] p-6 mb-6"
      style={{ 
        backgroundColor: "var(--pp-surface-container-lowest)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
      }}
    >
      <div className="flex gap-4">
        <div 
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm border border-outline-variant"
          style={{ backgroundColor: "var(--pp-surface-variant)", color: "var(--pp-primary)" }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${firstName}?`}
            className="w-full rounded-full px-4 py-2 border transition-all outline-none"
            style={{ 
              backgroundColor: "var(--pp-surface-container-low)",
              borderColor: "color-mix(in srgb, var(--pp-outline-variant) 50%, transparent)",
              color: "var(--pp-on-surface)",
              fontFamily: "var(--font-sans)"
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "var(--pp-primary)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "0 0 0 2px color-mix(in srgb, var(--pp-primary) 20%, transparent)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = "color-mix(in srgb, var(--pp-outline-variant) 50%, transparent)";
              (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {mediaUrls.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {mediaUrls.map((url, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border">
                  <img src={url} alt="Upload preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setMediaUrls(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div 
        className="flex justify-between items-center mt-4 pt-4"
        style={{ borderTop: "1px solid var(--pp-outline-variant)" }}
      >
        <div className="flex gap-2">
          <button 
            onClick={() => {
              openPhotoPicker((result) => {
                setMediaUrls((prev) => [...prev, result.publicUrl]);
              });
            }}
            disabled={photoUploading}
            className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors text-sm disabled:opacity-50"
            style={{ color: "var(--pp-on-surface-variant)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "color-mix(in srgb, var(--pp-primary-fixed-dim) 20%, transparent)";
              (e.currentTarget as HTMLElement).style.color = "var(--pp-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface-variant)";
            }}
          >
            {photoUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
            <span className="hidden sm:inline">Photo</span>
          </button>
          <button 
            className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors text-sm"
            style={{ color: "var(--pp-on-surface-variant)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "color-mix(in srgb, var(--pp-primary-fixed-dim) 20%, transparent)";
              (e.currentTarget as HTMLElement).style.color = "var(--pp-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface-variant)";
            }}
          >
            <Video className="w-5 h-5" />
            <span className="hidden sm:inline">Video</span>
          </button>
          <button 
            className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors text-sm"
            style={{ color: "var(--pp-on-surface-variant)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "color-mix(in srgb, var(--pp-primary-fixed-dim) 20%, transparent)";
              (e.currentTarget as HTMLElement).style.color = "var(--pp-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface-variant)";
            }}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="hidden sm:inline">Poll</span>
          </button>
        </div>

        <button
          className="px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
          style={{ 
            backgroundColor: "var(--pp-primary)", 
            color: "var(--pp-on-primary)",
            opacity: ((!content.trim() && mediaUrls.length === 0) || isSubmitting || photoUploading) ? 0.5 : 1,
            cursor: ((!content.trim() && mediaUrls.length === 0) || isSubmitting || photoUploading) ? "not-allowed" : "pointer"
          }}
          disabled={(!content.trim() && mediaUrls.length === 0) || isSubmitting || photoUploading}
          onClick={handleSubmit}
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-2" /> : "Post"}
        </button>
      </div>
    </div>
  );
}
