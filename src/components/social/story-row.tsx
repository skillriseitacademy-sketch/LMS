/**
 * StoryRow — Horizontal scrollable strip of story avatars.
 *
 * Changes from original:
 *  - Accepts `stacks: StoryStack[]` from useStories (instead of raw Story[])
 *  - Ring is gray when all stories in a stack have been seen (allSeen)
 *  - Own-user entry shows "+" add-story overlay when no active stories
 *  - onStoryClick(stackIndex) callback to open StoryViewer
 *  - onAddStory callback to open StoryCreator
 */

import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import type { StoryStack } from "@/hooks/useStories";

// ─── Ring colour map ─────────────────────────────────────────────────────────

const storyTypeRing: Record<string, string> = {
  streak:      "ring-streak",
  achievement: "ring-xp-gold",
  media:       "ring-brand",
  status:      "ring-success",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface StoryRowProps {
  stacks: StoryStack[];
  currentUserId: string;
  hasOwnActiveStory: boolean;
  onStoryClick: (stackIndex: number) => void;
  onAddStory: () => void;
}

// ─── StoryRow ─────────────────────────────────────────────────────────────────

export function StoryRow({
  stacks,
  currentUserId,
  hasOwnActiveStory,
  onStoryClick,
  onAddStory,
}: StoryRowProps) {
  // Partition: own stack (always first) vs others
  const ownStack = stacks.find((s) => s.userId === currentUserId);
  const otherStacks = stacks.filter((s) => s.userId !== currentUserId);

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
      {/* ── Own story slot ── */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        {ownStack ? (
          // Has active stories → clickable like others
          <button
            onClick={() => onStoryClick(stacks.indexOf(ownStack))}
            className="flex flex-col items-center gap-1 group outline-none"
          >
            <StoryAvatar stack={ownStack} isOwn />
            <span className="text-[10px] text-muted-foreground max-w-[56px] text-center truncate">
              Your story
            </span>
          </button>
        ) : (
          // No active story → show + affordance
          <button
            onClick={onAddStory}
            className="flex flex-col items-center gap-1 group outline-none"
          >
            <div className="relative rounded-full ring-2 ring-dashed ring-border/50 transition-transform group-hover:scale-105">
              <div className="h-14 w-14 rounded-full bg-muted/60 flex items-center justify-center">
                <PlusCircle className="h-7 w-7 text-muted-foreground group-hover:text-brand transition-colors" />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Add story</span>
          </button>
        )}
      </div>

      {/* ── Other users' stacks ── */}
      {otherStacks.map((stack) => {
        const globalIdx = stacks.indexOf(stack);
        const firstStory = stack.stories[0];
        const msLeft = new Date(firstStory.expires_at).getTime() - Date.now();
        const hrsLeft = Math.max(0, Math.floor(msLeft / 3_600_000));

        return (
          <button
            key={stack.userId}
            onClick={() => onStoryClick(globalIdx)}
            className="flex flex-col items-center gap-1 shrink-0 group outline-none"
          >
            <StoryAvatar stack={stack} />
            <span className="text-[10px] text-muted-foreground max-w-[56px] text-center truncate">
              {hrsLeft}h left
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── StoryAvatar ──────────────────────────────────────────────────────────────

function StoryAvatar({ stack, isOwn = false }: { stack: StoryStack; isOwn?: boolean }) {
  const { profile, stories, allSeen } = stack;
  const name = profile.name ?? "User";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // Dominant story type drives ring colour (first story in stack)
  const dominantType = stories[0]?.story_type ?? "status";
  const ringColor = allSeen
    ? "ring-muted-foreground/30"          // Gray ring = fully seen
    : storyTypeRing[dominantType] ?? "ring-border";

  return (
    <div
      className={`relative rounded-full ring-2 ring-offset-2 ring-offset-background ${ringColor} transition-all group-hover:scale-105 group-hover:ring-offset-4`}
    >
      <Avatar className="h-14 w-14">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={name} className="object-cover rounded-full" />
        ) : null}
        <AvatarFallback className="bg-brand/20 text-brand-dark text-sm font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Story type icon badge */}
      <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-brand flex items-center justify-center">
        <span className="text-[8px] text-white font-bold">
          {dominantType === "streak"
            ? "🔥"
            : dominantType === "achievement"
            ? "⭐"
            : dominantType === "media"
            ? "📷"
            : "💬"}
        </span>
      </span>

      {/* Story count badge (>1 story in stack) */}
      {stories.length > 1 && (
        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-foreground text-background text-[8px] font-bold flex items-center justify-center">
          {stories.length}
        </span>
      )}
    </div>
  );
}

// ─── Legacy StoryCard (kept for backward compat) ──────────────────────────────

export { StoryAvatar as StoryCard };
