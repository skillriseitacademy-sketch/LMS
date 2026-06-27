import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { Clock, ListChecks, Sparkles, ArrowRight } from "lucide-react";
import { quizTopics } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes — PlacePro LMS" }] }),
  component: QuizzesIndex,
});

function QuizzesIndex() {
  return (
    <>
      <TopBar title="Quizzes" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <header className="mb-6">
            <h1 className="text-display text-2xl font-bold">Pick a topic to start</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Timed assessments with AI-written explanations. You earn XP for every correct answer.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {quizTopics.map((t) => (
              <Link
                key={t.id}
                to="/quizzes/$quizId"
                params={{ quizId: t.id }}
                className={`${t.tint} group rounded-3xl border border-border p-5 transition hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium">
                      {t.difficulty}
                    </span>
                    <h3 className="mt-3 text-display text-lg font-semibold">{t.title}</h3>
                    <p className="mt-1 max-w-[18rem] text-xs text-foreground/70">{t.description}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/70">
                    <Sparkles className="h-5 w-5 text-brand-dark" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3 text-xs text-foreground/70">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><ListChecks className="h-3 w-3" />{t.questions} questions</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{t.minutes} min</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background">
                    Start <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
