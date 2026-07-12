import { Link } from "@tanstack/react-router";
import { Flame, Trophy, Sparkles, BookOpen, Newspaper, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/lib/store";
import { useAuth } from "@/lib/auth-store";

const navItems = [
  { title: "Feed", url: "/feed", icon: Newspaper },
  { title: "Connections", url: "/feed?tab=friends", icon: Users },
  { title: "Dashboard", url: "/dashboard", icon: BookOpen },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];

type Props = { xp?: number; streak?: number };

import { UserSearch } from "./user-search";

export function FeedLeftRail({ xp = 0, streak = 0 }: Props) {
  const { session } = useAuth();
  const { profile } = useProfile();
  const initials = (profile.name || session?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <UserSearch />
      {/* Mini profile card */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        {/* Gradient header */}
        <div className="h-16 bg-gradient-to-br from-brand-light via-card-blue to-brand/20" />
        <div className="flex flex-col items-center px-4 pb-4 -mt-8">
          <Avatar className="h-16 w-16 ring-4 ring-card shadow-md">
            <AvatarFallback className="bg-brand text-brand-foreground text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <p className="mt-2 text-display text-sm font-bold">{profile.name || session?.name}</p>
          <p className="text-xs text-muted-foreground text-center line-clamp-1 mt-0.5">
            {session?.role === "teacher" ? "Teacher" : "Student"}
          </p>

          {/* XP bar */}
          <div className="mt-3 w-full">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-xp-gold" /> {xp.toLocaleString()} XP
              </span>
              <span className="inline-flex items-center gap-1">
                <Flame className="h-3 w-3 text-streak animate-flame" /> {streak} day streak
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-700"
                style={{ width: `${Math.min(100, (xp % 2000) / 20)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Nav shortcuts */}
        <nav className="border-t border-border px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url as any}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* View profile link */}
        {session && (
          <div className="border-t border-border px-4 py-3">
            <Link
              to="/profile/$username"
              params={{ username: (profile as any).username || "unknown" }}
              className="text-xs text-brand hover:underline"
            >
              View public profile →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
