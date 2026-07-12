import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  ListChecks,
  Target,
  Plus,
  X,
  BookOpen,
} from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { useQuizHistory } from "@/lib/store";
import { quizTopics } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useGamification } from "@/lib/use-gamification";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PlacePro LMS" }] }),
  component: Dashboard,
});

const missions = [
  { title: "Complete 1 quiz", xp: 10, done: true },
  { title: "Practice 1 AI interview", xp: 25, done: false },
  { title: "Solve a coding challenge", xp: 15, done: false },
];

function Dashboard() {
  const stats = useGamification();
  const quizHistory = useQuizHistory();
  const recentQuizzes = quizHistory.slice(0, 3);

  const [courses, setCourses] = useState<any[]>([]);
  const [allTopics, setAllTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const fetchEnrolled = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("student_topics")
      .select("is_primary, topics(*)")
      .eq("user_id", session.user.id);

    if (!error && data) {
      setCourses(data.map((d) => ({ ...d.topics, is_primary: d.is_primary })));
    }
    setLoading(false);
  };

  const fetchAllTopics = async () => {
    const { data } = await supabase.from("topics").select("*").order("created_at");
    if (data) setAllTopics(data);
  };

  useEffect(() => {
    fetchEnrolled();
    fetchAllTopics();
  }, []);

  const handleAddCourse = async (topicId: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    await supabase.from("student_topics").upsert({
      user_id: session.user.id,
      topic_id: topicId,
      is_primary: false,
    });
    fetchEnrolled();
    setShowAddCourse(false);
  };

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h1 className="text-display text-3xl font-bold tracking-tight md:text-4xl">
              Level up your skills
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Explore your active courses, learn from industry experts, and build job-ready skills
              for your future.
            </p>
            <div className="mt-5 flex max-w-xl items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                className="flex-1 bg-transparent text-sm outline-none"
                placeholder="Search by course, people, theme…"
              />
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <Filter className="h-3.5 w-3.5" />
              </button>
              <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">
                Search
              </button>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-display text-xl font-bold">Your Courses</h2>
              <button
                onClick={() => setShowAddCourse(true)}
                className="flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" /> Add Course
              </button>
            </div>

            {loading ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Loading courses...
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {courses.map((c, idx) => (
                  <article
                    key={c.id}
                    className={`${idx % 2 === 0 ? "bg-card-pink" : "bg-card-blue"} group relative overflow-hidden rounded-3xl border border-border p-5 transition hover:-translate-y-0.5`}
                  >
                    <span className="inline-block rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium">
                      {c.is_primary ? "Primary" : "Enrolled"}
                    </span>
                    <h3 className="mt-3 text-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-1 max-w-[16rem] text-xs text-foreground/70 line-clamp-2">
                      {c.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3 text-xs">
                      <Link
                        to="/quizzes"
                        className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background"
                      >
                        Continue <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
                {courses.length === 0 && (
                  <div className="col-span-2 py-10 text-center text-sm text-muted-foreground">
                    You haven't enrolled in any courses yet.
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Level {stats.level}</span>
              <span className="text-display text-sm font-bold text-xp-gold">{stats.xp.toLocaleString()} XP</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand" style={{ width: `${stats.progressPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{stats.xpNeeded} XP to Level {stats.level + 1}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-display text-sm font-semibold">Daily missions</h3>
            <ul className="mt-3 space-y-2">
              {missions.map((m) => (
                <li
                  key={m.title}
                  className="flex items-center gap-3 rounded-xl border border-border p-2.5"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border ${m.done ? "bg-success border-success text-white" : "border-border"}`}
                  >
                    {m.done && "✓"}
                  </span>
                  <span className="flex-1 text-xs">{m.title}</span>
                  <span className="text-[10px] font-semibold text-xp-gold">+{m.xp}</span>
                </li>
              ))}
            </ul>
          </div>

          {recentQuizzes.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-display text-sm font-semibold">Recent quizzes</h3>
              <ul className="mt-3 space-y-2">
                {recentQuizzes.map((q, i) => {
                  const topic = quizTopics.find((t) => t.id === q.quizId);
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-border p-2.5"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-light text-brand-dark shrink-0">
                        <ListChecks className="h-4 w-4" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-semibold truncate">
                          {topic?.title || q.quizId}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {new Date(q.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-foreground">{q.score}%</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {showAddCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-display text-2xl font-bold">Add a new course</h2>
              <button
                onClick={() => setShowAddCourse(false)}
                className="rounded-full p-2 hover:bg-muted text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 max-h-[60vh] overflow-y-auto">
              {allTopics
                .filter((t) => !courses.find((c) => c.id === t.id))
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleAddCourse(t.id)}
                    className="flex items-start gap-4 rounded-2xl border border-border p-4 text-left transition hover:bg-muted"
                  >
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/20 text-brand-dark">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{t.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                  </button>
                ))}
              {allTopics.filter((t) => !courses.find((c) => c.id === t.id)).length === 0 && (
                <div className="col-span-2 py-8 text-center text-sm text-muted-foreground">
                  You're already enrolled in all available courses!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
