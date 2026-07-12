import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-store";
import { ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function PostComposer({ onPostSuccess }: { onPostSuccess?: () => void }) {
  const { session } = useAuth();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "connections" | "private">("connections");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!session) return null;

  const initials = session.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm mb-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-brand/20 text-brand-dark text-sm font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something with your network..."
            className="w-full resize-none border-none bg-transparent p-0 text-sm focus:ring-0 placeholder:text-muted-foreground min-h-[60px]"
          />

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-brand"
                disabled={isSubmitting}
              >
                <ImageIcon className="h-4 w-4" />
              </Button>

              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="h-8 text-xs bg-muted border-none rounded-full px-2 py-0 focus:ring-0 text-muted-foreground cursor-pointer"
                disabled={isSubmitting}
              >
                <option value="public">Public</option>
                <option value="connections">Connections</option>
                <option value="private">Only me</option>
              </select>
            </div>

            <Button
              size="sm"
              className="rounded-full px-5 h-8 bg-brand hover:bg-brand-dark text-brand-foreground"
              disabled={!content.trim() || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
