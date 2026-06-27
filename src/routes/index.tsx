import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  ListChecks,
  Mic,
  Briefcase,
  Map,
  Code2,
  FileText,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlacePro LMS — Quizzes, AI interviews, and job placement" },
      { name: "description", content: "Level up your skills with quizzes, AI mock interviews, coding challenges and a real career roadmap." },
      { property: "og:title", content: "PlacePro LMS" },
      { property: "og:description", content: "Quizzes, AI interviews, coding challenges and job placement in one platform." },
    ],
  }),
  component: Landing,
});

const features = [
  { title: "Quizzes", desc: "Topic-based assessments with AI explanations.", icon: ListChecks, tint: "bg-card-pink" },
  { title: "AI Interview", desc: "Voice-driven mock interviews with proctoring.", icon: Mic, tint: "bg-card-blue" },
  { title: "Jobs", desc: "Live listings matched to your roadmap.", icon: Briefcase, tint: "bg-card-yellow" },
  { title: "Roadmap", desc: "Personalised path to your target role.", icon: Map, tint: "bg-card-green" },
  { title: "Code", desc: "Daily coding challenges with auto-grading.", icon: Code2, tint: "bg-card-pink" },
  { title: "Resume", desc: "AI-tuned résumé builder and review.", icon: FileText, tint: "bg-card-blue" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-display text-lg font-bold">PlacePro</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-muted">Log in</Link>
          <Link to="/signup" className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:pt-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark">
          <Sparkles className="h-3 w-3" /> AI-powered placement platform
        </span>
        <h1 className="text-display mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          Level up your skills.<br />
          <span className="text-brand">Land the job.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Quizzes, AI mock interviews, coding challenges, and a real placement
          roadmap — built for students who actually ship.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/signup" className="inline-flex items-center gap-1 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/dashboard" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted">
            Preview the app
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {[
            ["12,400+", "students"],
            ["86k", "quizzes taken"],
            ["3,200+", "AI interviews"],
            ["1,540", "jobs applied"],
            ["240", "active roles"],
            ["94%", "placement rate"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-border bg-card p-4 text-left">
              <div className="text-display text-xl font-bold">{n}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className={`${f.tint} rounded-3xl border border-border p-6 transition hover:-translate-y-0.5`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80">
                <f.icon className="h-5 w-5 text-brand-dark" />
              </div>
              <h3 className="mt-4 text-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} PlacePro LMS</span>
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
