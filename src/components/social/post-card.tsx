import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReactionBar } from "./reaction-bar";
import { MessageCircle, MoreHorizontal } from "lucide-react";

export function PostCard({ post }: { post: any }) {
  const author = post.profiles;
  const initials = (author?.name || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const timeAgo = new Date(post.created_at).toLocaleDateString();

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm mb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <Link
          to="/profile/$username"
          params={{ username: author?.username || "unknown" }}
          className="flex items-center gap-3 group"
        >
          <Avatar className="h-10 w-10 border border-border transition-transform group-hover:scale-105">
            <AvatarFallback className="bg-brand/10 text-brand-dark text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-display text-sm font-semibold group-hover:underline">
                {author?.name}
              </span>
              {author?.username && (
                <span className="text-xs text-muted-foreground">@{author.username}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span>
                {author?.headline || (author?.role === "teacher" ? "Teacher" : "Student")}
              </span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </Link>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="text-sm text-foreground/90 whitespace-pre-wrap mb-4">{post.content}</div>

      {/* Media Grid */}
      {post.media_urls && post.media_urls.length > 0 && (
        <div
          className={`grid gap-2 mb-4 ${
            post.media_urls.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {post.media_urls.map((url: string, i: number) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border bg-muted">
              <img
                src={url}
                alt="Post media"
                className="w-full h-auto object-cover max-h-96"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer / Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <ReactionBar postId={post.id} reactions={post.post_reactions ?? []} />
        <button className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">
          <MessageCircle className="h-3.5 w-3.5" />
          <span>{(post.post_comments ?? []).length}</span>
        </button>
      </div>
    </div>
  );
}
