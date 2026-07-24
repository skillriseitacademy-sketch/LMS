import { createFileRoute } from "@tanstack/react-router";
import { Video, Plus, Trash2, Calendar, Clock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-store";

interface Topic {
  id: string;
  title: string;
}

interface Profile {
  id: string;
  name: string;
}

interface LiveClass {
  id: string;
  title: string;
  description: string;
  start_time: string;
  scheduled_at: string;
  duration_minutes: number;
  daily_room_url: string;
  status: string;
  topic?: Topic;
  teacher?: Profile;
}

export const Route = createFileRoute("/admin/live-classes")({
  head: () => ({ meta: [{ title: "Live Classes — PlacePro LMS" }] }),
  component: AdminLiveClasses,
});

function AdminLiveClasses() {
  const { session } = useAuth();
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicId, setTopicId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [roomUrl, setRoomUrl] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const [classesRes, topicsRes, teachersRes] = await Promise.all([
      supabase.from("live_classes").select("*, topic:topics(id, title), teacher:profiles!teacher_id(id, name)").order("start_time", { ascending: true }),
      supabase.from("topics").select("id, title").order("title"),
      supabase.from("profiles").select("id, name").in("role", ["teacher", "admin"]).order("name")
    ]);

    if (classesRes.error) toast.error("Failed to fetch classes: " + classesRes.error.message);
    else setClasses(classesRes.data || []);

    if (topicsRes.error) toast.error("Failed to fetch topics: " + topicsRes.error.message);
    else {
      setTopics(topicsRes.data || []);
      if (topicsRes.data && topicsRes.data.length > 0 && !topicId) setTopicId(topicsRes.data[0].id);
    }

    if (teachersRes.error) toast.error("Failed to fetch teachers: " + teachersRes.error.message);
    else {
      setTeachers(teachersRes.data || []);
      if (teachersRes.data && teachersRes.data.length > 0 && !teacherId) setTeacherId(session?.id || teachersRes.data[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId || !teacherId) {
      toast.error("Please select a topic and a teacher");
      return;
    }
    const { error } = await supabase.from("live_classes").insert([
      { 
        title, 
        description, 
        topic_id: topicId, 
        teacher_id: teacherId,
        start_time: startTime || null, // fallback
        scheduled_at: startTime || new Date().toISOString(), // Fallback for backwards compat
        duration_minutes: parseInt(duration) || 60,
        daily_room_url: roomUrl
      }
    ]);
    if (error) {
      toast.error("Failed to add class: " + error.message);
    } else {
      toast.success("Class scheduled successfully");
      setIsAdding(false);
      setTitle("");
      setDescription("");
      setStartTime("");
      setRoomUrl("");
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this class?")) return;
    const { error } = await supabase.from("live_classes").delete().eq("id", id);
    if (error) {
      toast.error("Failed to cancel class: " + error.message);
    } else {
      toast.success("Class cancelled");
      fetchData();
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Live Classes"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold flex items-center gap-2">
              <Video className="h-6 w-6 text-brand" />
              Manage Live Classes
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Schedule and manage live video sessions.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
          >
            {isAdding ? "Cancel" : <><Plus className="h-3.5 w-3.5" /> Schedule Class</>}
          </button>
        </header>

        {isAdding && (
          <form onSubmit={handleAdd} className="rounded-3xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-display text-lg font-bold">Schedule New Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Class Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Intro to Linked Lists"
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
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Teacher</label>
                <select
                  required
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Start Time</label>
                <input
                  required
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Duration (Minutes)</label>
                <input
                  required
                  type="number"
                  min="15"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Meeting URL</label>
                <input
                  required
                  type="url"
                  value={roomUrl}
                  onChange={(e) => setRoomUrl(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="https://meet.google.com/..."
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                placeholder="Optional description..."
                rows={2}
              />
            </div>
            <div className="pt-2 flex justify-end">
              <button type="submit" className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90">
                Schedule
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading classes...</p>
          ) : classes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No classes found. Schedule one to get started.</p>
          ) : (
            classes.map((c) => (
              <div key={c.id} className="rounded-3xl border border-border bg-card p-5 flex flex-col relative group">
                <div className="flex justify-between items-start">
                  <h3 className="text-display font-bold text-lg leading-tight">{c.title}</h3>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase font-bold ${c.status === 'completed' ? 'bg-muted text-muted-foreground' : 'bg-brand/10 text-brand'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-1">{c.topic?.title}</p>
                
                <div className="mt-4 space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(c.start_time || c.scheduled_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(c.start_time || c.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ({c.duration_minutes}m)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{c.teacher?.name || "Unknown"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <a href={c.daily_room_url} target="_blank" rel="noreferrer" className="text-xs font-medium text-brand hover:underline">
                    Join Room
                  </a>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-error hover:text-error/80"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Cancel
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
