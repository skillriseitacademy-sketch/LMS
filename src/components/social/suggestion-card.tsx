import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConnectionButton } from "./connection-button";

type Suggestion = {
  id: string;
  name: string;
  username?: string;
  avatar_url: string | null;
  headline: string | null;
  role: string;
  visibility?: "public" | "private";
};

export function SuggestionCard({ user }: { user: Suggestion }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-muted/30 transition hover:bg-muted/50 border border-border">
      <Link
        to="/profile/$username"
        params={{ username: user.username || "unknown" }}
        className="flex items-center gap-3 min-w-0"
      >
        <Avatar className="h-10 w-10 shrink-0 border border-border">
          <AvatarFallback className="bg-brand/10 text-brand-dark text-xs font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1 truncate">
            <span className="text-display text-sm font-semibold truncate">{user.name}</span>
            {user.username && <span className="text-[10px] text-muted-foreground truncate">@{user.username}</span>}
          </div>
          <span className="text-[10px] text-muted-foreground truncate">
            {user.headline || (user.role === "teacher" ? "Teacher" : "Student")}
          </span>
        </div>
      </Link>
      <ConnectionButton
        targetId={user.id}
        initialStatus={null}
        targetVisibility={user.visibility ?? "private"}
        size="sm"
      />
    </div>
  );
}
