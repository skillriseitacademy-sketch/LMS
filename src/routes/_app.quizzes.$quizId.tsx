import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { AlertCircle, Check, X, ArrowRight, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app/quizzes/$quizId")({
  head: () => ({ meta: [{ title: "Quiz — PlacePro LMS" }] }),
  component: QuizScreen,
});

function QuizScreen() {
  const { quizId } = useParams({ from: "/_app/quizzes/$quizId" });
  const navigate = useNavigate();

  const [topic, setTopic] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  useEffect(() => {
    async function loadQuiz() {
      // 1. Fetch quiz info (with topics for title)
      const { data: quiz } = await supabase
        .from("quizzes")
        .select(`id, title, topics ( title, description )`)
        .eq("id", quizId)
        .single();
      
      if (quiz) {
        setTopic({
          title: quiz.title,
          description: Array.isArray(quiz.topics) ? (quiz.topics[0] as any)?.description : (quiz.topics as any)?.description,
          minutes: 10
        });
      }

      // 2. Fetch questions
      const { data: qs } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: true });

      if (qs) {
        setQuestions(qs.map(q => ({
          ...q,
          correctIndex: q.correct_index,
        })));
      }
      setLoading(false);
    }
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    if (loading) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [loading]);

  const q = questions[index];
  const progress = questions.length ? ((index + (revealed ? 1 : 0)) / questions.length) * 100 : 0;

  const finish = (final: number[]) => {
    sessionStorage.setItem(
      `quiz-result-${quizId}`,
      JSON.stringify({ answers: final, ts: Date.now() }),
    );
    navigate({ to: "/quizzes/$quizId/results", params: { quizId } });
  };

  const submit = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const next = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (index + 1 >= questions.length) {
      finish(newAnswers);
      return;
    }
    setAnswers(newAnswers);
    setIndex(index + 1);
    setSelected(null);
    setRevealed(false);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const lowTime = secondsLeft < 30;

  if (loading) {
    return (
      <>
        <TopBar title="Loading Quiz..." />
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </>
    );
  }

  if (!topic || !q) {
    return (
      <>
        <TopBar title="Quiz not found" />
        <div className="p-8 text-center text-sm text-muted-foreground">
          <p>We couldn't find that quiz or it has no questions.</p>
          <Link
            to="/quizzes"
            className="mt-3 inline-block rounded-full bg-brand px-4 py-2 text-xs text-brand-foreground"
          >
            Back to quizzes
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title={topic.title} />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              Question {index + 1} <span className="text-foreground/40">/ {questions.length}</span>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono font-semibold ${lowTime ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-card text-foreground"}`}
            >
              <Clock className="h-3 w-3" /> {mm}:{ss}
            </span>
          </div>

          <div className="mb-5 h-1.5 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-display text-lg font-semibold leading-snug">{q.prompt}</h2>
            <div className="mt-5 space-y-2">
              {q.options.map((opt: string, i: number) => {
                const isSelected = selected === i;
                const isCorrect = revealed && i === q.correctIndex;
                const isWrong = revealed && isSelected && i !== q.correctIndex;
                return (
                  <button
                    key={i}
                    disabled={revealed}
                    onClick={() => setSelected(i)}
                    className={[
                      "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition",
                      isCorrect
                        ? "border-success bg-success/10 text-foreground"
                        : isWrong
                          ? "border-destructive bg-destructive/10 text-foreground"
                          : isSelected
                            ? "border-brand bg-brand-light text-brand-dark"
                            : "border-border bg-card hover:border-foreground/30",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${isSelected || isCorrect ? "bg-foreground text-background" : "bg-muted text-foreground"}`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </span>
                    {isCorrect && <Check className="h-4 w-4 text-success" />}
                    {isWrong && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="mt-5 rounded-2xl border border-brand/30 bg-brand-light/60 p-4 text-sm text-brand-dark">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertCircle className="h-4 w-4" /> Explanation
                </div>
                <p className="mt-1 text-foreground/80">{q.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {selected !== null && !revealed ? "Ready?" : ""}
              </span>
              {!revealed ? (
                <button
                  onClick={submit}
                  disabled={selected === null}
                  className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all disabled:opacity-50"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={next}
                  className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-all"
                >
                  {index + 1 === questions.length ? "Finish Quiz" : "Next Question"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
