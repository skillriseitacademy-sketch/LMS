import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Topic {
  id: string;
  title: string;
  description: string;
  arena_mode: string;
}

export const Route = createFileRoute("/admin/topics")({
  head: () => ({ meta: [{ title: "Topics — PlacePro LMS" }] }),
  component: AdminTopics,
});

function AdminTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [arenaMode, setArenaMode] = useState("code_ranker");

  const fetchTopics = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("topics").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to fetch topics: " + error.message);
    } else {
      setTopics(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("topics").insert([
      { title, description, arena_mode: arenaMode }
    ]);
    if (error) {
      toast.error("Failed to add topic: " + error.message);
    } else {
      toast.success("Topic added successfully");
      setIsAdding(false);
      setTitle("");
      setDescription("");
      setArenaMode("code_ranker");
      fetchTopics();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this topic? This may delete related quizzes and classes.")) return;
    const { error } = await supabase.from("topics").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete topic: " + error.message);
    } else {
      toast.success("Topic deleted");
      fetchTopics();
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Topics"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-brand" />
              Manage Topics
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage curriculum topics for classes and quizzes.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
          >
            {isAdding ? "Cancel" : <><Plus className="h-3.5 w-3.5" /> Add Topic</>}
          </button>
        </header>

        {isAdding && (
          <form onSubmit={handleAdd} className="rounded-3xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-display text-lg font-bold">Add New Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Advanced Data Structures"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Arena Mode</label>
                <select
                  required
                  value={arenaMode}
                  onChange={(e) => setArenaMode(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="code_ranker">Code Ranker</option>
                  <option value="ctf">CTF</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                placeholder="Detailed description of the topic..."
                rows={3}
              />
            </div>
            <div className="pt-2 flex justify-end">
              <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90">
                Save Topic
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading topics...</p>
          ) : topics.length === 0 ? (
            <p className="text-sm text-muted-foreground">No topics found. Create one to get started.</p>
          ) : (
            topics.map((t) => (
              <div key={t.id} className="rounded-3xl border border-border bg-card p-5 flex flex-col relative group">
                <h3 className="text-display font-bold text-lg">{t.title}</h3>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-muted text-muted-foreground self-start">
                  {t.arena_mode?.replace("_", " ")}
                </span>
                <p className="mt-3 text-sm text-muted-foreground flex-1 line-clamp-3">{t.description}</p>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <button
                    onClick={() => handleDelete(t.id)}
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
