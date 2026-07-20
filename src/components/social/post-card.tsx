import { Link } from "@tanstack/react-router";
import { MessageCircle, MoreHorizontal } from "lucide-react";
import { ReactionBar } from "./reaction-bar";

export function PostCard({ post }: { post: any }) {
  const author = post.profiles;
  const initials = (author?.name || "U").slice(0, 2).toUpperCase();
  
  // Format time ago (simplified for now)
  const timeAgo = new Date(post.created_at).toLocaleDateString();
  const roleDisplay = author?.headline || (author?.role === "teacher" ? "Instructor" : "Student");

  return (
    <div 
      className="rounded-[16px] p-6 mb-6"
      style={{ 
        backgroundColor: "var(--pp-surface-container-lowest)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
        borderLeft: "4px solid var(--pp-primary)"
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Link
          to="/profile/$username"
          params={{ username: author?.username || "unknown" }}
          className="flex gap-3 items-center group"
        >
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border"
            style={{ 
              backgroundColor: "var(--pp-surface-variant)", 
              color: "var(--pp-primary)",
              borderColor: "var(--pp-outline-variant)"
            }}
          >
            {initials}
          </div>
          <div>
            <h4 className="text-base font-semibold group-hover:underline" style={{ color: "var(--pp-on-surface)", fontFamily: "var(--font-display)" }}>
              {author?.name || "Unknown User"}
            </h4>
            <p className="text-xs" style={{ color: "var(--pp-on-surface-variant)", fontFamily: "var(--font-mono)" }}>
              {timeAgo} · {roleDisplay}
            </p>
          </div>
        </Link>
        <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm mb-4 whitespace-pre-wrap" style={{ color: "var(--pp-on-surface)" }}>
        {post.content}
      </p>

      {/* Media Grid */}
      {post.media_urls && post.media_urls.length > 0 && (
        <div className={`grid gap-2 mb-4 ${post.media_urls.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {post.media_urls.map((url: string, i: number) => (
            <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--pp-outline-variant)" }}>
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
      <div 
        className="flex items-center justify-between pt-4 mt-4"
        style={{ borderTop: "1px solid var(--pp-outline-variant)" }}
      >
        {/* We reuse ReactionBar, but pass it the Stitch styling classes if possible. For now, it remains functional */}
        <ReactionBar postId={post.id} reactions={post.post_reactions ?? []} />

        <button 
          className="text-xs font-medium flex items-center gap-1 transition-colors"
          style={{ color: "var(--pp-on-surface-variant)", fontFamily: "var(--font-mono)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--pp-primary)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface-variant)"; }}
        >
          <MessageCircle className="w-[18px] h-[18px]" />
          {(post.post_comments ?? []).length} Comments
        </button>
      </div>
    </div>
  );
}
