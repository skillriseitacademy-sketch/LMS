import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { leaderboard } from "@/lib/mock-data";
import { Flame, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/lib/store";
import { useMemo } from "react";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — PlacePro LMS" }] }),
  component: Leaderboard,
});

const tabs = ["This week", "This month", "All time"] as const;

function Leaderboard() {
  const { profile } = useProfile();
  
  const currentLeaderboard = useMemo(() => {
    return leaderboard.map(r => 
      r.you ? { ...r, name: `${profile.name} (You)`, initials: profile.initials } : r
    );
  }, [profile]);

  const top3 = currentLeaderboard.slice(0, 3);
  const rest = currentLeaderboard.slice(3);

  return (
    <>
      <TopBar title="Leaderboard" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <header className="mb-5 flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-display text-2xl font-bold">Leaderboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">XP earned across quizzes, interviews and code challenges.</p>
            </div>
            <div className="flex gap-1 rounded-full border border-border bg-card p-1 text-xs">
              {tabs.map((t, i) => (
                <button key={t} className={i === 0 ? "rounded-full bg-foreground px-3 py-1.5 font-semibold text-background" : "rounded-full px-3 py-1.5 text-muted-foreground"}>
                  {t}
                </button>
              ))}
            </div>
          </header>

          <section className="grid grid-cols-3 gap-3">
            {top3.map((r, i) => {
              const podium = [
                { h: "h-32", color: "bg-xp-gold/20 border-xp-gold/40", medal: "🥇" },
                { h: "h-24", color: "bg-muted border-border", medal: "🥈" },
                { h: "h-20", color: "bg-streak/15 border-streak/30", medal: "🥉" },
              ][i];
              return (
                <div key={r.rank} className="flex flex-col items-center justify-end">
                  <Avatar className="mb-2 h-12 w-12 ring-2 ring-background">
                    <AvatarFallback className="bg-brand-light text-brand-dark text-xs font-semibold">{r.initials}</AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-semibold">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.xp.toLocaleString()} XP</p>
                  <div className={`mt-2 flex w-full items-end justify-center rounded-t-2xl border ${podium.color} ${podium.h}`}>
                    <span className="mb-1 text-2xl">{podium.medal}</span>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 w-12">Rank</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3 w-20 text-right">Level</th>
                  <th className="px-4 py-3 w-24 text-right">Streak</th>
                  <th className="px-4 py-3 w-24 text-right">Quizzes</th>
                  <th className="px-4 py-3 w-24 text-right">XP</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((r) => (
                  <tr key={r.rank} className={`border-t border-border ${r.you ? "bg-brand-light/40" : ""}`}>
                    <td className="px-4 py-3 font-semibold text-muted-foreground">#{r.rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={`text-xs ${r.you ? "bg-brand text-brand-foreground" : "bg-muted"}`}>{r.initials}</AvatarFallback>
                        </Avatar>
                        <span className={r.you ? "font-semibold text-brand-dark" : "font-medium"}>{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold">
                        <Trophy className="h-3 w-3 text-xp-gold" /> {r.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-streak">
                        <Flame className="h-3 w-3" fill="currentColor" /> {r.streak}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{r.quizzes}</td>
                    <td className="px-4 py-3 text-right font-display font-bold">{r.xp.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Climb the board — every quiz you take and interview you complete earns XP.
            <Link to="/quizzes" className="ml-1 font-semibold text-brand hover:underline">Take a quiz →</Link>
          </p>
        </div>
      </div>
    </>
  );
}
