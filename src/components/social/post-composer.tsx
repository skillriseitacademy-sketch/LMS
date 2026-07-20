import { useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { ImageIcon, Loader2, Video, BarChart2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function PostComposer({ onPostSuccess }: { onPostSuccess?: () => void }) {
  const { session } = useAuth();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "connections" | "private">("connections");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!session) return null;

  const initials = (session.name || "U").slice(0, 2).toUpperCase();
  const firstName = session.name?.split(" ")[0] || "there";

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      const token = (supabase as any).realtime?.accessToken ?? "";
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
          media_urls: [],
        }),
      });
      if (res.ok) {
        setContent("");
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
        </div>
      </div>

      <div 
        className="flex justify-between items-center mt-4 pt-4"
        style={{ borderTop: "1px solid var(--pp-outline-variant)" }}
      >
        <div className="flex gap-2">
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
            <ImageIcon className="w-5 h-5" />
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
            opacity: (!content.trim() || isSubmitting) ? 0.5 : 1,
            cursor: (!content.trim() || isSubmitting) ? "not-allowed" : "pointer"
          }}
          disabled={!content.trim() || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-2" /> : "Post"}
        </button>
      </div>
    </div>
  );
}
