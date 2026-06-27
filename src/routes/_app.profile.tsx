import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Trophy, Sparkles, Target, Mic, Code2, ListChecks, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — PlacePro LMS" }] }),
  component: Profile,
});

const badges = [
  { name: "First quiz", icon: ListChecks, tint: "bg-card-blue" },
  { name: "5-day streak", icon: Flame, tint: "bg-card-pink" },
  { name: "AI Interview", icon: Mic, tint: "bg-card-yellow" },
  { name: "Top 20%", icon: Trophy, tint: "bg-card-green" },
  { name: "Code chal. ×10", icon: Code2, tint: "bg-card-blue" },
  { name: "Roadmap step", icon: Target, tint: "bg-card-pink" },
];

const activity = [
  { kind: "quiz", title: "Completed React Fundamentals", xp: 80, time: "2h ago" },
  { kind: "interview", title: "AI mock interview · Frontend", xp: 60, time: "Yesterday" },
  { kind: "code", title: "Solved 'Two Sum'", xp: 25, time: "Yesterday" },
  { kind: "quiz", title: "Completed Async JavaScript", xp: 100, time: "3 days ago" },
];

function Profile() {
  const xp = 1240;
  const level = 7;
  const nextLevel = 2000;
  const pct = Math.round((xp / nextLevel) * 100);

  return (
    <>
      <TopBar title="Profile" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-light via-card to-card-yellow p-6">
            <div className="flex flex-wrap items-center gap-5">
              <Avatar className="h-20 w-20 ring-4 ring-background">
                <AvatarFallback className="bg-brand text-brand-foreground text-xl font-bold">SA</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-[240px]">
                <h1 className="text-display text-2xl font-bold">Sam Adams</h1>
                <p className="text-sm text-muted-foreground">Frontend track · joined Aug 2025</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Trophy className="h-3 w-3 text-xp-gold" /> Level {level}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Flame className="h-3 w-3 text-streak" fill="currentColor" /> 3-day streak
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Sparkles className="h-3 w-3 text-brand" /> Rank #14
                  </span>
                </div>
              </div>
              <Link to="/dashboard" className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90">
                Continue learning
              </Link>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Level {level}</span>
                <span className="font-display font-bold text-xp-gold">{xp.toLocaleString()} / {nextLevel.toLocaleString()} XP</span>
                <span className="font-medium">Level {level + 1}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-background/70">
                <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-5 grid gap-3 sm:grid-cols-4">
            {[
              ["Quizzes", "18"],
              ["Interviews", "4"],
              ["Code wins", "26"],
              ["Hours practised", "38"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-card p-4">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</div>
                <div className="text-display text-xl font-bold">{v}</div>
              </div>
            ))}
          </section>

          {/* Badges + Activity */}
          <section className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-5">
              <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">Badges</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {badges.map((b) => (
                  <div key={b.name} className={`${b.tint} rounded-2xl border border-border p-3 text-center`}>
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-background/80">
                      <b.icon className="h-4 w-4 text-brand-dark" />
                    </div>
                    <p className="mt-2 text-[11px] font-semibold leading-tight">{b.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">Recent activity</h3>
              <ul className="mt-3 space-y-2">
                {activity.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                      {a.kind === "quiz" ? <ListChecks className="h-4 w-4" /> : a.kind === "interview" ? <Mic className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.title}</p>
                      <p className="text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-xp-gold">+{a.xp} XP</span>
                  </li>
                ))}
              </ul>
              <Link to="/leaderboard" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
                See leaderboard <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
