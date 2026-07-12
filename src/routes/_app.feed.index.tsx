import { createFileRoute } from "@tanstack/react-router";
import { FeedLayout } from "@/components/social/feed-layout";
import { FeedLeftRail } from "@/components/social/feed-left-rail";
import { FeedRightRail } from "@/components/social/feed-right-rail";
import { PostComposer } from "@/components/social/post-composer";
import { PostCard } from "@/components/social/post-card";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_app/feed/")({
  component: FeedIndex,
});

function FeedIndex() {
  const { session } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("recents");

  const fetchPosts = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const token = (supabase as any).realtime?.accessToken ?? "";
      const res = await fetch(`/api/feed?tab=${tab}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [session, tab]);

  return (
    <FeedLayout
      left={<FeedLeftRail />}
      right={<FeedRightRail />}
      center={
        <div className="flex flex-col max-w-xl mx-auto w-full">
          <PostComposer onPostSuccess={fetchPosts} />

          <div className="flex items-center gap-4 mb-4 px-2">
            {["recents", "friends", "popular"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  tab === t
                    ? "border-brand text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center p-8 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          ) : (
            <div className="text-center p-12 bg-card rounded-3xl border border-border">
              <p className="text-muted-foreground text-sm">No posts to show.</p>
            </div>
          )}
        </div>
      }
    />
  );
}
