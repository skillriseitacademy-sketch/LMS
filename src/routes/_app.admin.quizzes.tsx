import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Topic {
  id: string;
  title: string;
}

interface Quiz {
  id: string;
  topic_id: string;
  title: string;
  topic?: Topic;
}

export const Route = createFileRoute("/_app/admin/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes — PlacePro LMS" }] }),
  component: AdminQuizzes,
});

function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState("");
  const [topicId, setTopicId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const [quizzesRes, topicsRes] = await Promise.all([
      supabase.from("quizzes").select("*, topic:topics(id, title)").order("created_at", { ascending: false }),
      supabase.from("topics").select("id, title").order("title")
    ]);

    if (quizzesRes.error) toast.error("Failed to fetch quizzes: " + quizzesRes.error.message);
    else setQuizzes(quizzesRes.data || []);

    if (topicsRes.error) toast.error("Failed to fetch topics: " + topicsRes.error.message);
    else {
      setTopics(topicsRes.data || []);
      if (topicsRes.data && topicsRes.data.length > 0 && !topicId) {
        setTopicId(topicsRes.data[0].id);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId) {
      toast.error("Please select a topic");
      return;
    }
    const { error } = await supabase.from("quizzes").insert([
      { title, topic_id: topicId }
    ]);
    if (error) {
      toast.error("Failed to add quiz: " + error.message);
    } else {
      toast.success("Quiz added successfully");
      setIsAdding(false);
      setTitle("");
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz? This will delete all its questions.")) return;
    const { error } = await supabase.from("quizzes").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete quiz: " + error.message);
    } else {
      toast.success("Quiz deleted");
      fetchData();
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Quizzes"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold flex items-center gap-2">
              <ListChecks className="h-6 w-6 text-brand" />
              Manage Quizzes
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage quizzes linked to topics.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
          >
            {isAdding ? "Cancel" : <><Plus className="h-3.5 w-3.5" /> Add Quiz</>}
          </button>
        </header>

        {isAdding && (
          <form onSubmit={handleAdd} className="rounded-3xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-display text-lg font-bold">Add New Quiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Quiz Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Arrays and Strings"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Topic</label>
                <select
                  required
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90">
                Save Quiz
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading quizzes...</p>
          ) : quizzes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quizzes found. Create one to get started.</p>
          ) : (
            quizzes.map((q) => (
              <div key={q.id} className="rounded-3xl border border-border bg-card p-5 flex flex-col relative group">
                <h3 className="text-display font-bold text-lg">{q.title}</h3>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-muted text-muted-foreground self-start">
                  {q.topic?.title || "Unknown Topic"}
                </span>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-error hover:text-error/80"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
