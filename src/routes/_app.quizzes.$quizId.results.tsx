import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { quizTopics, quizQuestions } from "@/lib/mock-data";
import { Trophy, Check, X, RotateCcw, Share2 } from "lucide-react";
import { saveQuizAttempt } from "@/lib/store";

export const Route = createFileRoute("/_app/quizzes/$quizId/results")({
  head: () => ({ meta: [{ title: "Results — PlacePro LMS" }] }),
  component: Results,
});

function Results() {
  const { quizId } = useParams({ from: "/_app/quizzes/$quizId/results" });
  const topic = quizTopics.find((t) => t.id === quizId);
  const questions = quizQuestions[quizId] ?? [];
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    const raw = sessionStorage.getItem(`quiz-result-${quizId}`);
    const alreadySaved = sessionStorage.getItem(`quiz-saved-${quizId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { answers: number[] };
        setAnswers(parsed.answers);

        if (!alreadySaved) {
          const correctCount = parsed.answers.reduce(
            (s, a, i) => (a === questions[i]?.correctIndex ? s + 1 : s),
            0,
          );
          const calculatedScore = questions.length
            ? Math.round((correctCount / questions.length) * 100)
            : 0;

          saveQuizAttempt({
            quizId,
            score: calculatedScore,
            timestamp: Date.now(),
          });
          sessionStorage.setItem(`quiz-saved-${quizId}`, "true");
        }
      } catch {}
    }
  }, [quizId, questions]);

  const correctCount = answers.reduce(
    (s, a, i) => (a === questions[i]?.correctIndex ? s + 1 : s),
    0,
  );
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const xp = correctCount * 10;

  if (!topic) return null;

  return (
    <>
      <TopBar title="Quiz results" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-6 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-brand bg-brand-light">
              <div>
                <div className="text-display text-3xl font-bold text-brand-dark">{score}%</div>
                <div className="text-[10px] uppercase tracking-wide text-brand-dark/70">Score</div>
              </div>
            </div>
            <h1 className="mt-5 text-display text-xl font-bold">{topic.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              You answered {correctCount} of {questions.length} correctly.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-xp-gold/15 px-4 py-1.5 text-sm font-semibold text-foreground">
              <Trophy className="h-4 w-4 text-xp-gold" /> +{xp} XP earned
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link
                to="/quizzes/$quizId"
                params={{ quizId }}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted"
              >
                <RotateCcw className="h-3 w-3" /> Retry
              </Link>
              <Link
                to="/quizzes"
                className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
              >
                New quiz
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground"
              >
                <Share2 className="h-3 w-3" /> Share to leaderboard
              </Link>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-border bg-card p-5">
            <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Breakdown
            </h3>
            <ul className="mt-3 space-y-2">
              {questions.map((q, i) => {
                const a = answers[i];
                const ok = a === q.correctIndex;
                return (
                  <li
                    key={q.id}
                    className="flex items-start gap-3 rounded-2xl border border-border p-3"
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}
                    >
                      {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{q.prompt}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Correct:{" "}
                        <span className="text-foreground">{q.options[q.correctIndex]}</span>
                        {a !== undefined && a !== q.correctIndex && (
                          <>
                            {" "}
                            · Your answer: <span className="text-destructive">{q.options[a]}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
