import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { TopBar } from "@/components/top-bar";
import { Video, Calendar, Clock, Plus, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_app/live/")({
  head: () => ({ meta: [{ title: "Live Classes — PlacePro LMS" }] }),
  component: LiveClasses,
});

function LiveClasses() {
  const { session } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [topicName, setTopicName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Instant Room state
  const [roomCode, setRoomCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();

  const fetchClasses = async () => {
    if (!session) return;
    setLoading(true);

    if (session.role === "teacher") {
      // Teachers see their own classes
      const { data } = await supabase
        .from("live_classes")
        .select("*, topics(title)")
        .eq("host_id", session.id)
        .order("start_time", { ascending: true });
      setClasses(data || []);

      // Also fetch topics to allow scheduling
      const { data: tData } = await supabase.from("topics").select("*");
      setTopics(tData || []);
    } else {
      // Students see classes for their enrolled topics
      const { data: enrolled } = await supabase
        .from("student_topics")
        .select("topic_id")
        .eq("user_id", session.id);
      if (enrolled && enrolled.length > 0) {
        const tIds = enrolled.map((e) => e.topic_id);
        const { data } = await supabase
          .from("live_classes")
          .select("*, topics(title), profiles!host_id(name)")
          .in("topic_id", tIds)
          .gte("end_time", new Date().toISOString())
          .order("start_time", { ascending: true });
        setClasses(data || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, [session]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const startDateTime = new Date(`${date}T${time}`);
      // assume 1 hr duration
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

      // Wait for proper token
      const {
        data: { session: sbSession },
      } = await supabase.auth.getSession();

      // Find the topic id
      const topic = topics.find(t => t.title === topicName);
      if (!topic) throw new Error("Topic not found. Please choose an existing topic.");

      const actualRes = await fetch("/api/classes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sbSession?.access_token}`,
        },
        body: JSON.stringify({
          title,
          topic_id: topic.id,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
        }),
      });

      if (!actualRes.ok) {
        throw new Error(await actualRes.text());
      }

      setShowSchedule(false);
      fetchClasses();
    } catch (err: any) {
      setError(err.message);
    }
    setSubmitting(false);
  };

  return (
    <>
      <TopBar title="Live Classes" />
      <div className="p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold">Live Classes & Rooms</h1>
            <p className="text-sm text-muted-foreground">
              Join interactive sessions with your instructors or peers.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center bg-card border border-border rounded-xl px-2 overflow-hidden shadow-sm">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Enter Room Code"
                className="bg-transparent border-none outline-none text-sm px-2 w-36 uppercase"
                maxLength={6}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (!roomCode.trim()) return;
                  setIsJoining(true);
                  navigate({ to: "/live/$classId", params: { classId: roomCode.toUpperCase() } });
                }}
                disabled={isJoining || !roomCode}
                className="bg-brand text-brand-foreground rounded-lg px-3 py-1.5 text-xs font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Join
              </button>
            </div>
            {session?.role === "teacher" && (
              <button
                onClick={() => setShowSchedule(true)}
                className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:opacity-90"
              >
                <Plus className="h-4 w-4" /> Schedule Class
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">Loading classes...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => {
              const start = new Date(c.start_time);
              const end = new Date(c.end_time);
              const isLiveNow = start <= new Date() && end >= new Date();
              const isPast = end < new Date();

              return (
                <article
                  key={c.id}
                  className="relative rounded-3xl border border-border bg-card p-5 transition hover:-translate-y-0.5"
                >
                  {isLiveNow && (
                    <span className="absolute right-4 top-4 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
                    </span>
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand-dark mb-4">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {c.topics?.title} - Code: {c.room_code}
                  </div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  {c.profiles && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Instructor: {c.profiles.name}
                    </p>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-foreground/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {start.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    {session?.role === "teacher" ? (
                      <Link
                        to="/live/$classId"
                        params={{ classId: c.room_code || c.id }}
                        className="block w-full rounded-xl bg-foreground py-2 text-center text-sm font-semibold text-background hover:opacity-90"
                      >
                        Host Class
                      </Link>
                    ) : isPast ? (
                      <button
                        disabled
                        className="w-full rounded-xl bg-muted py-2 text-sm font-semibold text-muted-foreground"
                      >
                        Ended
                      </button>
                    ) : (
                      <Link
                        to="/live/$classId"
                        params={{ classId: c.room_code || c.id }}
                        className={`block w-full rounded-xl py-2 text-center text-sm font-semibold ${isLiveNow ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-brand text-brand-foreground hover:opacity-90"}`}
                      >
                        {isLiveNow ? "Join Now" : "Go to Waiting Room"}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
            {classes.length === 0 && (
              <div className="col-span-full py-10 text-center text-sm text-muted-foreground">
                No upcoming classes found.
              </div>
            )}
          </div>
        )}
      </div>

      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-display text-xl font-bold">Schedule Live Class</h2>
              <button
                onClick={() => setShowSchedule(false)}
                className="rounded-full p-2 hover:bg-muted text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 text-sm text-destructive bg-destructive/10 p-3 rounded-xl border border-destructive/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium">Class Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. React Hooks Deep Dive"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium">Topic Name</label>
                <input
                  required
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Frontend Development"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium">Date</label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium">Time</label>
                  <input
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                disabled={submitting}
                type="submit"
                className="mt-2 w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Schedule Class"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
