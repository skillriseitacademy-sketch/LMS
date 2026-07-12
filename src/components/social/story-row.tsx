import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Story = {
  id: string;
  user_id: string;
  story_type: string;
  content: string | null;
  profiles: { id: string; name: string; username?: string; avatar_url: string | null };
  expires_at: string;
};

const storyTypeRing: Record<string, string> = {
  streak: "ring-streak",
  achievement: "ring-xp-gold",
  media: "ring-brand",
  status: "ring-success",
};

export function StoryRow({ stories }: { stories: Story[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
      {stories.map((story) => (
        <Link
          key={story.id}
          to="/profile/$username"
          params={{ username: story.profiles.username || "unknown" }}
          className="flex flex-col items-center gap-1 shrink-0 group"
        >
          <StoryCard story={story} />
        </Link>
      ))}
    </div>
  );
}

export function StoryCard({ story }: { story: Story }) {
  const name = story.profiles.name ?? "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const ringColor = storyTypeRing[story.story_type] ?? "ring-border";

  // Hours remaining in story life
  const msLeft = new Date(story.expires_at).getTime() - Date.now();
  const hrsLeft = Math.max(0, Math.floor(msLeft / 3_600_000));

  return (
    <>
      <div
        className={`relative rounded-full ring-2 ring-offset-2 ring-offset-background ${ringColor} transition-transform group-hover:scale-105`}
      >
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-brand/20 text-brand-dark text-sm font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {/* Story type icon overlay */}
        <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-brand flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">
            {story.story_type === "streak"
              ? "🔥"
              : story.story_type === "achievement"
                ? "⭐"
                : story.story_type === "media"
                  ? "📷"
                  : "💬"}
          </span>
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground max-w-[56px] text-center truncate">
        {hrsLeft}h left
      </span>
    </>
  );
}
