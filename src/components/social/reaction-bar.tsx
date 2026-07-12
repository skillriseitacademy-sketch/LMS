import { useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";

const EMOJI_MAP = {
  like: "👍",
  fire: "🔥",
  clap: "👏",
  brain: "🧠",
  rocket: "🚀",
};

export type ReactionType = keyof typeof EMOJI_MAP;

export function ReactionBar({
  postId,
  reactions,
}: {
  postId: string;
  reactions: { reaction_type: string; user_id: string }[];
}) {
  const { session } = useAuth();
  const [localReactions, setLocalReactions] = useState(reactions);
  const [isUpdating, setIsUpdating] = useState(false);

  // Group reactions by type
  const grouped = localReactions.reduce(
    (acc, r) => {
      acc[r.reaction_type] = (acc[r.reaction_type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const myReaction = localReactions.find((r) => r.user_id === session?.id)?.reaction_type;

  const handleReact = async (type: string) => {
    if (!session || isUpdating) return;
    setIsUpdating(true);

    // Optimistic update
    const previous = [...localReactions];
    setLocalReactions((prev) => {
      const filtered = prev.filter((r) => r.user_id !== session.id);
      if (myReaction === type) return filtered; // Toggle off
      return [...filtered, { reaction_type: type, user_id: session.id }];
    });

    try {
      const token = (supabase as any).realtime?.accessToken ?? "";
      const res = await fetch(`/api/posts/${postId}/react`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reaction_type: type }),
      });
      if (!res.ok) throw new Error("Failed to react");
    } catch {
      setLocalReactions(previous); // Rollback
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Object.entries(EMOJI_MAP).map(([type, emoji]) => {
        const count = grouped[type] || 0;
        const isActive = myReaction === type;

        if (count === 0 && !isActive) return null;

        return (
          <button
            key={type}
            onClick={() => handleReact(type)}
            disabled={isUpdating}
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
              isActive
                ? "bg-brand/10 text-brand-dark"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            <span>{emoji}</span>
            {count > 0 && <span>{count}</span>}
          </button>
        );
      })}

      {!myReaction && (
        <button
          onClick={() => handleReact("like")}
          disabled={isUpdating}
          className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          {EMOJI_MAP.like} React
        </button>
      )}
    </div>
  );
}
