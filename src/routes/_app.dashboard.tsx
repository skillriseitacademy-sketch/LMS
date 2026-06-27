import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Filter, ChevronRight, Sparkles, ListChecks, Target } from "lucide-react";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PlacePro LMS" }] }),
  component: Dashboard,
});

const courses = [
  { tag: "Student", title: "UI/UX designer", desc: "Master the principles of user interface and user experience design.", tasks: 350, projects: 3, progress: 72, tint: "bg-card-pink", cta: "Continue", modules: "12/16" },
  { tag: "Recommended", title: "QA engineer", desc: "Learn the fundamentals of quality assurance and software testing.", tasks: 622, projects: 4, progress: 0, tint: "bg-card-blue", cta: "Apply", date: "20 July" },
  { tag: "Popular", title: "Recruiter", desc: "Understand the hiring process and talent acquisition end-to-end.", tasks: 420, projects: 2, progress: 0, tint: "bg-card-yellow", cta: "Apply", date: "5 Aug" },
  { tag: "Student", title: "Front-end developer", desc: "Build stunning and responsive websites with React and Tailwind.", tasks: 510, projects: 5, progress: 34, tint: "bg-card-green", cta: "Continue", modules: "6/18" },
];

const missions = [
  { title: "Complete 1 quiz", xp: 10, done: true },
  { title: "Practice 1 AI interview", xp: 25, done: false },
  { title: "Solve a coding challenge", xp: 15, done: false },
];

function Dashboard() {
  return (
    <>
      <TopBar title="Dashboard" />
      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h1 className="text-display text-3xl font-bold tracking-tight md:text-4xl">Level up your skills</h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Explore top courses, learn from industry experts, and build job-ready skills for your future.
            </p>
            <div className="mt-5 flex max-w-xl items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search by course, people, theme…" />
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <Filter className="h-3.5 w-3.5" />
              </button>
              <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">Search</button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {courses.map((c) => (
              <article key={c.title} className={`${c.tint} group relative overflow-hidden rounded-3xl border border-border p-5 transition hover:-translate-y-0.5`}>
                <span className="inline-block rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium">{c.tag}</span>
                <h3 className="mt-3 text-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 max-w-[16rem] text-xs text-foreground/70">{c.desc}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-foreground/70">
                  <span className="inline-flex items-center gap-1"><ListChecks className="h-3 w-3" /> {c.tasks} tasks</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" /> {c.projects} projects</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-foreground/70">
                    <span>Progress</span>
                    <span className="font-semibold">{c.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-background/70">
                    <div className="h-full rounded-full bg-foreground transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3 text-xs">
                  <span className="text-foreground/70">
                    {c.modules ? <>Modules: <span className="font-semibold text-foreground">{c.modules}</span></> :
                      <>Start date: <span className="font-semibold text-foreground">{c.date}</span></>}
                  </span>
                  <button className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background">
                    {c.cta} <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Level 7</span>
              <span className="text-display text-sm font-bold text-xp-gold">1,240 XP</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand" style={{ width: "62%" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">760 XP to Level 8</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-display text-sm font-semibold">Daily missions</h3>
            <ul className="mt-3 space-y-2">
              {missions.map((m) => (
                <li key={m.title} className="flex items-center gap-3 rounded-xl border border-border p-2.5">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${m.done ? "bg-success border-success text-white" : "border-border"}`}>
                    {m.done && "✓"}
                  </span>
                  <span className="flex-1 text-xs">{m.title}</span>
                  <span className="text-[10px] font-semibold text-xp-gold">+{m.xp}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/leaderboard" className="block rounded-2xl border border-border bg-brand-light p-5 hover:opacity-90">
            <Sparkles className="h-5 w-5 text-brand-dark" />
            <h3 className="mt-2 text-display text-sm font-semibold text-brand-dark">Leaderboard</h3>
            <p className="text-xs text-brand-dark/70">You're #14 this week — push for top 10.</p>
          </Link>
        </aside>
      </div>
    </>
  );
}
