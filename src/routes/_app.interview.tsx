import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { interviewRoles } from "@/lib/mock-data";
import { Bot, Video, ArrowRight, Mic } from "lucide-react";

export const Route = createFileRoute("/_app/interview")({
  head: () => ({ meta: [{ title: "Interview — PlacePro LMS" }] }),
  component: InterviewIndex,
});

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function InterviewIndex() {
  const sessionId = makeId();
  return (
    <>
      <TopBar title="Interview" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <header className="mb-6">
            <h1 className="text-display text-2xl font-bold">Pick a mode</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Practice with an AI interviewer, or book a live session with a human reviewer.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card-blue p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80">
                <Bot className="h-5 w-5 text-brand-dark" />
              </div>
              <h2 className="mt-3 text-display text-lg font-semibold">AI mock interview</h2>
              <p className="mt-1 text-xs text-foreground/70">
                Voice-style chat with an AI interviewer. Live transcript, instant feedback.
              </p>
              <Link to="/interview/ai/$sessionId" params={{ sessionId }} search={{ role: "frontend" }} className="mt-4 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
                Start AI interview <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-card-yellow p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80">
                <Video className="h-5 w-5 text-brand-dark" />
              </div>
              <h2 className="mt-3 text-display text-lg font-semibold">Live interview</h2>
              <p className="mt-1 text-xs text-foreground/70">
                Schedule a real interviewer over video. Receive a scored rubric after the call.
              </p>
              <Link to="/interview/manual/$sessionId" params={{ sessionId }} className="mt-4 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
                Book live interview <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Roles you can practice
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {interviewRoles.map((r) => (
                <Link
                  key={r.id}
                  to="/interview/ai/$sessionId"
                  params={{ sessionId: makeId() }}
                  search={{ role: r.id }}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-brand"
                >
                  <div>
                    <h4 className="text-sm font-semibold">{r.title}</h4>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                  <Mic className="h-4 w-4 text-muted-foreground transition group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
