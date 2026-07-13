import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Flame,
  Trophy,
  Sparkles,
  Target,
  Mic,
  Code2,
  ListChecks,
  ArrowRight,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { useProfile, useQuizHistory } from "@/lib/store";
import { useGamification } from "@/lib/use-gamification";
import { quizTopics } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — PlacePro LMS" }] }),
  component: Profile,
});

const badges = [
  // Badges will be loaded dynamically later
];



function Profile() {
  const { profile, saveProfile } = useProfile();
  const stats = useGamification();
  const quizHistory = useQuizHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  // Sync form when profile loads/updates from other tabs
  useEffect(() => {
    setEditForm(profile);
  }, [profile]);

  const recentQuizzes = quizHistory.slice(0, 3).map((q) => {
    const topic = quizTopics.find((t) => t.id === q.quizId);
    return {
      kind: "quiz",
      title: `Completed ${topic?.title || q.quizId}`,
      xp: q.score * 10,
      time: new Date(q.timestamp).toLocaleDateString(),
    };
  });
  const activity = [...recentQuizzes].slice(0, 4);

  return (
    <>
      <TopBar title="Profile" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-light via-card to-card-yellow p-6">
            <div className="flex flex-wrap items-center gap-5">
              <Avatar className="h-20 w-20 ring-4 ring-background">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-brand text-brand-foreground text-xl font-bold">
                    {profile.initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-[240px]">
                {isEditing ? (
                  <div className="space-y-2 bg-background p-3 rounded-xl border border-border">
                    <input
                      className="w-full bg-transparent text-lg font-bold outline-none"
                      value={editForm.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const initials =
                          name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase() || "??";
                        setEditForm({ ...editForm, name, initials });
                      }}
                      placeholder="Name"
                    />
                    <input
                      className="w-full bg-transparent text-sm text-muted-foreground outline-none"
                      value={(editForm as any).username || ""}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value } as any)}
                      placeholder="Username"
                    />
                    <input
                      className="w-full bg-transparent text-sm text-muted-foreground outline-none"
                      value={editForm.headline}
                      onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                      placeholder="Headline"
                    />
                    <input
                      className="w-full bg-transparent text-sm text-muted-foreground outline-none"
                      value={editForm.avatar_url || ""}
                      onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                      placeholder="Avatar URL (optional)"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          saveProfile(editForm);
                          setIsEditing(false);
                        }}
                        className="p-1.5 rounded bg-success/20 text-success hover:bg-success/30"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditForm(profile);
                          setIsEditing(false);
                        }}
                        className="p-1.5 rounded bg-destructive/20 text-destructive hover:bg-destructive/30"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <h1 className="text-display text-2xl font-bold">{profile.name}</h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {(profile as any).username && (
                      <p className="text-sm font-medium text-brand">@{(profile as any).username}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{profile.headline}</p>
                  </>
                )}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Trophy className="h-3 w-3 text-xp-gold" /> Level {stats.level}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Flame className="h-3 w-3 text-streak" fill="currentColor" /> {stats.streak}-day streak
                  </span>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
              >
                Continue learning
              </Link>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Level {stats.level}</span>
                <span className="font-display font-bold text-xp-gold">
                  {stats.xp.toLocaleString()} / {stats.nextLevelXp.toLocaleString()} XP
                </span>
                <span className="font-medium">Level {stats.level + 1}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-background/70">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${stats.progressPct}%` }}
                />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-4">
            {[
              ["Quizzes", quizHistory.length.toString()],
              ["Interviews", "0"],
              ["Code wins", "0"],
              ["Hours practised", "0"],
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
              <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Badges
              </h3>
              {badges.length > 0 ? (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {badges.map((b) => (
                    <div
                      key={b.name}
                      className={`${(b as any).tint} rounded-2xl border border-border p-3 text-center`}
                    >
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-background/80">
                        <b.icon className="h-4 w-4 text-brand-dark" />
                      </div>
                      <p className="mt-2 text-[11px] font-semibold leading-tight">{b.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 text-sm text-muted-foreground py-6 text-center">
                  No badges earned yet. Keep learning!
                </div>
              )}
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Recent activity
              </h3>
              {activity.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {activity.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-2xl border border-border p-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                        {a.kind === "quiz" ? (
                          <ListChecks className="h-4 w-4" />
                        ) : a.kind === "interview" ? (
                          <Mic className="h-4 w-4" />
                        ) : (
                          <Code2 className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{a.title}</p>
                        <p className="text-[11px] text-muted-foreground">{a.time}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-xp-gold">+{a.xp} XP</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-3 text-sm text-muted-foreground py-6 text-center">
                  No recent activity. Start a quiz to see it here!
                </div>
              )}
              <Link
                to="/leaderboard"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
              >
                See leaderboard <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
