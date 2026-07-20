import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { useR2Upload } from "@/hooks/use-r2-upload";

export const Route = createFileRoute("/_app/feed/")({
  component: FeedPage,
});

type ReactionType = "like" | "fire" | "clap" | "brain" | "rocket";
const REACTION_EMOJIS: Record<ReactionType, string> = {
  like: "👍", fire: "🔥", clap: "👏", brain: "🧠", rocket: "🚀",
};

type Post = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  media_urls: string[];
  profiles: { name: string; avatar_url: string | null; role: string };
  reactionCounts: Record<ReactionType, number>;
  myReaction: ReactionType | null;
  commentCount: number;
};

type SuggestedUser = {
  id: string;
  name: string;
  avatar_url: string | null;
  headline: string | null;
};

type TopStudent = {
  id: string;
  name: string;
  avatar_url: string | null;
  xp: number;
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? "s" : ""} ago`;
}

function FeedPage() {
  const { session } = useAuth();
  const [newPostContent, setNewPostContent] = useState("");
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [xpData, setXpData] = useState({ total: 0, rank: 0 });
  const [showReactions, setShowReactions] = useState<string | null>(null);

  const { openPicker: openPhotoPicker, uploading: photoUploading } = useR2Upload({
    context: "post",
    accept: "image/jpeg,image/png,image/webp,image/gif",
  });

  // ── Data fetching ──────────────────────────────────────────────────────────

  const fetchPosts = async () => {
    if (!session) return;
    const { data } = await supabase
      .from("posts")
      .select(`id, content, created_at, user_id, media_urls, profiles(name, avatar_url, role)`)
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) {
      // Fetch reaction counts
      const postIds = data.map((p: any) => p.id);
      const { data: reactions } = await supabase
        .from("post_reactions")
        .select("post_id, reaction_type, user_id")
        .in("post_id", postIds);

      const { data: comments } = await supabase
        .from("post_comments")
        .select("post_id")
        .in("post_id", postIds);

      setPosts(data.map((p: any) => {
        const postReactions = (reactions || []).filter((r: any) => r.post_id === p.id);
        const counts = { like: 0, fire: 0, clap: 0, brain: 0, rocket: 0 } as Record<ReactionType, number>;
        postReactions.forEach((r: any) => { counts[r.reaction_type as ReactionType]++; });
        const myReaction = postReactions.find((r: any) => r.user_id === session.id)?.reaction_type ?? null;
        const commentCount = (comments || []).filter((c: any) => c.post_id === p.id).length;

        return {
          ...p,
          profiles: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
          reactionCounts: counts,
          myReaction: myReaction as ReactionType | null,
          commentCount,
        };
      }));
    }
    setLoading(false);
  };

  const fetchSidebar = async () => {
    if (!session) return;
    // Suggested users (not connected, not self)
    const { data: users } = await supabase
      .from("profiles")
      .select("id, name, avatar_url, headline")
      .neq("id", session.id)
      .limit(3);
    if (users) setSuggestedUsers(users as SuggestedUser[]);

    // XP total
    const { data: xpRows } = await supabase
      .from("xp_transactions")
      .select("amount")
      .eq("user_id", session.id);
    const total = (xpRows || []).reduce((sum: number, r: any) => sum + (r.amount || 0), 0);
    setXpData({ total, rank: 42 }); // rank would need an RPC

    // Top students by XP (approximate using leaderboard data)
    const { data: topRows } = await supabase
      .from("profiles")
      .select("id, name, avatar_url")
      .neq("id", session.id)
      .limit(3);
    if (topRows) {
      setTopStudents(topRows.map((u: any, i: number) => ({
        ...u,
        xp: 3200 - i * 250, // placeholder until leaderboard RPC exists
      })));
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchSidebar();
  }, [session]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handlePost = async () => {
    if ((!newPostContent.trim() && !pendingImageUrl) || !session) return;
    setPosting(true);
    const mediaUrls = pendingImageUrl ? [pendingImageUrl] : [];
    const { data, error } = await supabase.from("posts").insert({
      user_id: session.id,
      content: newPostContent.trim() || " ",
      media_urls: mediaUrls,
      visibility: "public",
    }).select().single();

    if (!error && data) {
      setNewPostContent("");
      setPendingImageUrl(null);
      fetchPosts();
    }
    setPosting(false);
  };

  const handlePhotoAttach = () => {
    openPhotoPicker((result) => {
      setPendingImageUrl(result.publicUrl);
    });
  };

  const handleReaction = async (postId: string, type: ReactionType) => {
    if (!session) return;
    setShowReactions(null);

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (post.myReaction === type) {
      // Remove reaction
      await supabase.from("post_reactions").delete()
        .eq("post_id", postId).eq("user_id", session.id);
    } else {
      // Upsert reaction
      await supabase.from("post_reactions").upsert({
        post_id: postId,
        user_id: session.id,
        reaction_type: type,
      }, { onConflict: "post_id,user_id" });
    }

    // Optimistic update
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const counts = { ...p.reactionCounts };
      if (p.myReaction) counts[p.myReaction] = Math.max(0, counts[p.myReaction] - 1);
      if (p.myReaction !== type) counts[type]++;
      return { ...p, reactionCounts: counts, myReaction: p.myReaction === type ? null : type };
    }));
  };

  const totalReactions = (post: Post) =>
    Object.values(post.reactionCounts).reduce((a, b) => a + b, 0);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Left Rail ── */}
        <div className="hidden lg:block lg:col-span-3 space-y-5">
          {/* Mini Profile Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
            <div className="h-16 bg-gradient-to-br from-primary/20 to-primary/5" />
            <div className="px-5 pb-5 -mt-8">
              <div className="w-16 h-16 rounded-full border-4 border-surface-container-lowest overflow-hidden bg-surface-variant mb-3">
                {session?.avatar_url
                  ? <img src={session.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                  : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">person</span>
                    </div>
                }
              </div>
              <h2 className="font-semibold text-on-surface text-lg leading-tight" style={{ fontFamily: "Manrope" }}>
                {session?.name || "Student"}
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>
                {session?.role || "Student"}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full">
                <span className="material-symbols-outlined text-[14px]">star</span>
                <span className="text-xs font-semibold" style={{ fontFamily: "JetBrains Mono" }}>
                  {xpData.total > 0 ? `${xpData.total.toLocaleString()} XP` : "0 XP"}
                </span>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-on-surface mb-3" style={{ fontFamily: "Inter" }}>Trending Topics</h3>
            <ul className="space-y-2">
              {["#DSAPractice", "#Interviews2024", "#SystemDesign", "#SummerInternships"].map(tag => (
                <li key={tag}>
                  <Link
                    className="text-primary hover:underline text-sm block py-0.5"
                    style={{ fontFamily: "Inter" }}
                    to="/feed"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Center Feed ── */}
        <div className="col-span-1 lg:col-span-6 space-y-5">

          {/* Stories Bar */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-4">
            <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar">
              {[
                { icon: "workspace_premium", label: "New Badge", color: "from-[#f59e0b] to-[#f97316]" },
                { icon: "local_fire_department", label: "7 Day Streak", color: "from-primary to-primary/60" },
              ].map(({ icon, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center ring-2 ring-primary/30 ring-offset-2 ring-offset-surface-container-lowest cursor-pointer hover:ring-primary transition-all`}>
                    <span className="material-symbols-outlined text-white text-2xl">{icon}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant text-center font-medium" style={{ fontFamily: "JetBrains Mono" }}>{label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary transition-all text-on-surface-variant">
                  <span className="material-symbols-outlined text-2xl">add</span>
                </div>
                <span className="text-[10px] text-on-surface-variant text-center font-medium" style={{ fontFamily: "JetBrains Mono" }}>Add Story</span>
              </div>
            </div>
          </div>

          {/* Post Composer */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-variant flex-shrink-0">
                {session?.avatar_url
                  ? <img src={session.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                  : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-base">person</span>
                    </div>
                }
              </div>
              <input
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handlePost()}
                className="w-full bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-on-surface placeholder:text-on-surface-variant outline-none"
                style={{ fontFamily: "Inter" }}
                placeholder={`What's on your mind, ${session?.name?.split(" ")[0] || ""}?`}
              />
            </div>

            {/* Pending image preview */}
            {pendingImageUrl && (
              <div className="mt-3 relative">
                <img src={pendingImageUrl} className="w-full max-h-60 object-cover rounded-xl" alt="Attachment" />
                <button
                  onClick={() => setPendingImageUrl(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/70"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/50">
              <div className="flex gap-1">
                {[
                  { icon: "image", label: "Photo", action: handlePhotoAttach, loading: photoUploading },
                  { icon: "videocam", label: "Video", action: () => {}, loading: false },
                  { icon: "bar_chart", label: "Poll", action: () => {}, loading: false },
                ].map(({ icon, label, action, loading: btnLoading }) => (
                  <button
                    key={label}
                    onClick={action}
                    disabled={btnLoading}
                    className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all px-2.5 py-1.5 rounded-lg disabled:opacity-60"
                  >
                    {btnLoading
                      ? <span className="w-4 h-4 border border-primary border-t-transparent rounded-full animate-spin" />
                      : <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    }
                    <span className="text-xs font-medium hidden sm:inline" style={{ fontFamily: "JetBrains Mono" }}>{label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={handlePost}
                disabled={posting || (!newPostContent.trim() && !pendingImageUrl)}
                className="bg-primary text-on-primary px-5 py-1.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50 active:scale-[0.98]"
                style={{ fontFamily: "Inter" }}
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>

          {/* Posts */}
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-12 bg-surface-container-lowest rounded-2xl shadow-sm">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-3 block">feed</span>
              <p className="text-on-surface-variant" style={{ fontFamily: "Inter" }}>No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 border-l-4 border-primary">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex-shrink-0">
                      {post.profiles?.avatar_url
                        ? <img src={post.profiles.avatar_url} className="w-full h-full object-cover" alt={post.profiles.name} />
                        : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">person</span>
                          </div>
                      }
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface leading-tight" style={{ fontFamily: "Inter" }}>
                        {post.profiles?.name || "User"}
                      </h4>
                      <p className="text-xs text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>
                        {timeAgo(post.created_at)} · {post.profiles?.role || "student"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Body */}
                {post.content.trim() && (
                  <p className="text-sm text-on-surface leading-relaxed mb-3" style={{ fontFamily: "Inter" }}>
                    {post.content}
                  </p>
                )}

                {/* Media */}
                {post.media_urls?.length > 0 && (
                  <div className="mb-3 rounded-xl overflow-hidden">
                    <img src={post.media_urls[0]} className="w-full max-h-80 object-cover" alt="Post media" />
                  </div>
                )}

                {/* Reactions Row */}
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-3 mt-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    {/* Reaction summary */}
                    {totalReactions(post) > 0 && (
                      <div className="flex items-center gap-1 mr-2 text-xs text-on-surface-variant" style={{ fontFamily: "Inter" }}>
                        {(Object.entries(post.reactionCounts) as [ReactionType, number][])
                          .filter(([, count]) => count > 0)
                          .slice(0, 3)
                          .map(([type]) => (
                            <span key={type}>{REACTION_EMOJIS[type]}</span>
                          ))
                        }
                        <span className="ml-0.5">{totalReactions(post)}</span>
                      </div>
                    )}

                    {/* React button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowReactions(showReactions === post.id ? null : post.id)}
                        className={`flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg transition-all ${
                          post.myReaction
                            ? "text-primary bg-primary/10"
                            : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                        }`}
                        style={{ fontFamily: "Inter" }}
                      >
                        <span>{post.myReaction ? REACTION_EMOJIS[post.myReaction] : "👍"}</span>
                        <span className="text-xs font-medium">{post.myReaction ? "Reacted" : "React"}</span>
                      </button>

                      {/* Reaction picker */}
                      {showReactions === post.id && (
                        <div className="absolute bottom-full left-0 mb-2 flex items-center gap-1 bg-surface-container-lowest rounded-full shadow-xl border border-outline-variant/30 px-3 py-2 z-10">
                          {(Object.entries(REACTION_EMOJIS) as [ReactionType, string][]).map(([type, emoji]) => (
                            <button
                              key={type}
                              onClick={() => handleReaction(post.id, type)}
                              className={`text-xl hover:scale-125 transition-transform p-1 rounded-full ${
                                post.myReaction === type ? "bg-primary/10" : ""
                              }`}
                              title={type}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                    {post.commentCount > 0 ? `${post.commentCount} Comments` : "Comment"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Right Rail ── */}
        <div className="hidden lg:block lg:col-span-3 space-y-5">

          {/* People You May Know */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 sticky top-6">
            <h3 className="font-semibold text-on-surface mb-4" style={{ fontFamily: "Inter" }}>People you may know</h3>
            <div className="space-y-3">
              {suggestedUsers.length === 0 ? (
                <p className="text-sm text-on-surface-variant" style={{ fontFamily: "Inter" }}>Connect with more peers to see suggestions.</p>
              ) : (
                suggestedUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-variant flex-shrink-0">
                      {user.avatar_url
                        ? <img src={user.avatar_url} className="w-full h-full object-cover" alt={user.name} />
                        : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-sm">person</span>
                          </div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-on-surface truncate" style={{ fontFamily: "Inter" }}>{user.name}</p>
                      <p className="text-xs text-on-surface-variant truncate" style={{ fontFamily: "Inter" }}>{user.headline || "PlacePro Student"}</p>
                    </div>
                    <button className="text-xs font-medium text-primary border border-primary/40 px-2.5 py-1 rounded-full hover:bg-primary hover:text-on-primary transition-all flex-shrink-0" style={{ fontFamily: "Inter" }}>
                      Connect
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Top Students */}
            {topStudents.length > 0 && (
              <div className="mt-5 pt-5 border-t border-outline-variant/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-on-surface" style={{ fontFamily: "Inter" }}>Top Students</h3>
                  <span className="text-xs text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>This Week</span>
                </div>
                <div className="space-y-2">
                  {topStudents.map((student, idx) => (
                    <div key={student.id} className={`flex items-center gap-3 p-2 rounded-xl ${idx === 0 ? "bg-[#f59e0b]/5 border border-[#f59e0b]/20" : ""}`}>
                      <span className={`text-sm font-bold w-5 text-center ${idx === 0 ? "text-[#f59e0b]" : "text-on-surface-variant"}`} style={{ fontFamily: "JetBrains Mono" }}>
                        {idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-variant flex-shrink-0">
                        {student.avatar_url
                          ? <img src={student.avatar_url} className="w-full h-full object-cover" alt={student.name} />
                          : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-xs">person</span>
                            </div>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-on-surface truncate" style={{ fontFamily: "Inter" }}>{student.name}</p>
                      </div>
                      <span className="text-xs font-bold text-primary" style={{ fontFamily: "JetBrains Mono" }}>
                        {student.xp.toLocaleString()} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
