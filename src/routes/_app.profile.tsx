import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { TopBar } from "@/components/top-bar";
import { Bookmark, MessageCircle, ThumbsUp, MoreHorizontal, Calendar, BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostComposer } from "@/components/social/post-composer";

export const Route = createFileRoute("/_app/profile")({
  component: ProfileViewPage,
});

function ProfileViewPage() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Posts");

  const [stats, setStats] = useState({
    followers: "0",
    posts: "0",
    collections: "0",
    likes: "0"
  });

  const fetchPosts = async () => {
    if (!session?.id) return;
    const { data: userPosts } = await supabase
      .from("posts")
      .select(`
        id, content, created_at, author_id, image_url,
        author:profiles(id, name, username, avatar_url)
      `)
      .eq("author_id", session.id)
      .order("created_at", { ascending: false });

    if (userPosts) {
      setPosts(userPosts);
      setStats(s => ({ ...s, posts: userPosts.length.toString() }));
    }
  };

  useEffect(() => {
    async function loadData() {
      if (!session?.id) return;

      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.id)
        .single();

      if (prof) setProfile(prof);

      await fetchPosts();

      setLoading(false);
    }
    loadData();
  }, [session]);

  if (loading) {
    return <div className="p-12 text-center text-muted-foreground">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-12 text-center text-muted-foreground">Profile not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Cover Image */}
      <div className="w-full h-48 md:h-64 lg:h-80 bg-gradient-to-r from-primary/20 via-primary/10 to-background relative overflow-hidden">
        {profile.cover_url && (
          <img src={profile.cover_url} alt="Cover" className="w-full h-full object-cover absolute inset-0" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full -mt-16 sm:-mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column (Profile Info) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar */}
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-background shadow-sm">
                <AvatarImage src={profile.avatar_url || ""} />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  {profile.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name & Handle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2" style={{ fontFamily: "Manrope" }}>
                {profile.name}
                <BadgeCheck className="w-6 h-6 text-primary" fill="currentColor" stroke="white" />
              </h1>
              <p className="text-muted-foreground font-medium mt-1">@{profile.username || profile.name?.toLowerCase().replace(/\s/g, "")}</p>
            </div>

            {/* Bio */}
            <p className="text-foreground/90 text-sm leading-relaxed" style={{ fontFamily: "Inter" }}>
              {profile.bio || "No bio provided."}
            </p>

            {/* Stats Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <div className="text-xl font-bold text-foreground">{stats.followers}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Followers</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{stats.posts}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Posts</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{stats.collections}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Collections</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{stats.likes}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Likes</div>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column (Content) */}
          <div className="lg:col-span-3 pt-6 sm:pt-24 lg:pt-28">
            
            {/* Header Actions & Tabs */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 mb-8">
              
              {/* Tabs */}
              <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto hide-scrollbar border-b border-border w-full sm:w-auto">
                {["Posts", "Photos", "Videos", "Likes"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-1 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === tab
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {tab === "Posts" && <span className="bg-muted px-2 py-0.5 rounded text-[10px]">{stats.posts}</span>}
                    {tab === "Photos" && <span className="bg-muted px-2 py-0.5 rounded text-[10px]">0</span>}
                    {tab === "Videos" && <span className="bg-muted px-2 py-0.5 rounded text-[10px]">0</span>}
                    {tab === "Likes" && <span className="bg-muted px-2 py-0.5 rounded text-[10px]">0</span>}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <Button variant="outline" size="icon" className="rounded-xl border-border w-10 h-10">
                  <Bookmark className="w-4 h-4 text-foreground" />
                </Button>
                <Link to="/settings/profile">
                  <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Content Grid */}
            {activeTab === "Posts" && (
              <div className="flex flex-col gap-6">
                <PostComposer onPostSuccess={fetchPosts} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="flex flex-col gap-3 group">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border">
                        {post.image_url ? (
                          <img src={post.image_url} alt="Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-muted to-background">
                            <p className="text-foreground text-lg line-clamp-4 font-medium" style={{ fontFamily: "Manrope" }}>{post.content}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={post.author?.avatar_url} />
                            <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">{post.author?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{post.author?.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <div className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-xs font-medium">45</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">13</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 sm:col-span-2 py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                    <p className="font-medium">No posts yet</p>
                    <p className="text-sm mt-1">When you share posts or photos, they will appear here.</p>
                  </div>
                )}
              </div>
              </div>
            )}
            
            {activeTab !== "Posts" && (
              <div className="py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                <p className="font-medium">No {activeTab.toLowerCase()} yet</p>
                <p className="text-sm mt-1">This section is currently empty.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
