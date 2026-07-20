import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { Clock, ListChecks, ArrowRight, Brain, Terminal, Database, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app/quizzes/")({
  head: () => ({ meta: [{ title: "Quizzes — PlacePro LMS" }] }),
  component: QuizzesIndex,
});

const getTopicIcon = (id: string) => {
  if (id.includes('dsa') || id.includes('algo') || id.includes('coding')) return Terminal;
  if (id.includes('system') || id.includes('arch') || id.includes('db')) return Database;
  if (id.includes('behavioral') || id.includes('leadership')) return Brain;
  if (id.includes('security')) return Shield;
  return ListChecks;
};

const getTopicTheme = (difficulty: string, index: number) => {
  const themes = [
    { bg: "var(--pp-primary-container)", fg: "var(--pp-on-primary-container)", border: "var(--pp-primary)", glow: "var(--pp-primary-fixed)" },
    { bg: "var(--pp-secondary-container)", fg: "var(--pp-on-secondary-container)", border: "var(--pp-secondary)", glow: "var(--pp-secondary-fixed)" },
    { bg: "var(--pp-tertiary-container)", fg: "var(--pp-on-tertiary-container)", border: "var(--pp-tertiary)", glow: "var(--pp-tertiary-fixed)" },
  ];
  return themes[index % themes.length];
};

function QuizzesIndex() {
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const { data } = await supabase
        .from("quizzes")
        .select(`
          id,
          title,
          topics ( title, description )
        `);
      if (data) setQuizzes(data);
    }
    fetchQuizzes();
  }, []);

  return (
    <>
      <TopBar />
      <main className="p-4 md:p-8 max-w-[1280px] mx-auto">
        <header className="mb-8">
          <h1
            className="text-[32px] font-bold leading-tight mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--pp-on-surface)", letterSpacing: "-0.01em" }}
          >
            Pick a topic to start
          </h1>
          <p className="text-lg" style={{ color: "var(--pp-on-surface-variant)" }}>
            Timed assessments with AI-written explanations. You earn XP for every correct answer.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((q, idx) => {
            const Icon = getTopicIcon(q.title.toLowerCase());
            const difficulty = "Intermediate";
            const theme = getTopicTheme(difficulty, idx);
            const topicTitle = Array.isArray(q.topics) ? q.topics[0]?.title : q.topics?.title;
            const topicDesc = Array.isArray(q.topics) ? q.topics[0]?.description : q.topics?.description;

            return (
              <Link
                key={q.id}
                to="/quizzes/$quizId"
                params={{ quizId: q.id }}
                className="group relative overflow-hidden rounded-[16px] p-6 transition-all duration-300 flex flex-col"
                style={{
                  backgroundColor: "var(--pp-surface-container-lowest)",
                  border: "1px solid color-mix(in srgb, var(--pp-outline-variant) 30%, transparent)",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${theme.border} 50%, transparent)`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 16px -4px color-mix(in srgb, ${theme.border} 10%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--pp-outline-variant) 30%, transparent)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)";
                }}
              >
                {/* Decorative glow orb */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 opacity-10 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: theme.glow }}
                />

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <span
                    className="px-3 py-1 text-xs font-bold uppercase rounded-full"
                    style={{
                      backgroundColor: theme.bg,
                      color: theme.fg,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {difficulty}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:-translate-y-1 transition-transform"
                    style={{ backgroundColor: theme.bg, color: theme.fg }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--pp-on-surface)" }}
                  >
                    {q.title}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: "var(--pp-on-surface-variant)" }}>
                    {topicDesc || "Test your knowledge on this topic."}
                  </p>
                </div>

                <div
                  className="mt-6 flex items-center justify-between pt-4 relative z-10"
                  style={{ borderTop: "1px solid var(--pp-surface-variant)" }}
                >
                  <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--pp-on-surface-variant)", fontFamily: "var(--font-mono)" }}>
                    <Clock className="w-4 h-4" />
                    <span>~10 mins</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform" style={{ color: theme.border }}>
                    Start <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

