import { createFileRoute } from "@tanstack/react-router";
import { PlaySquare, Save, Calendar, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
  start_time: string;
  status: string;
  recording_storage_path: string | null;
  topic?: Topic;
  teacher?: Profile;
}

export const Route = createFileRoute("/_app/admin/recorded-sessions")({
  head: () => ({ meta: [{ title: "Recorded Sessions — PlacePro LMS" }] }),
  component: AdminRecordedSessions,
});

function AdminRecordedSessions() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [recordingUrl, setRecordingUrl] = useState("");
  const [status, setStatus] = useState("");

  const fetchClasses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("live_classes")
      .select("*, topic:topics(id, title), teacher:profiles!teacher_id(id, name)")
      .order("start_time", { ascending: false });

    if (error) {
      toast.error("Failed to fetch sessions: " + error.message);
    } else {
      setClasses(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleEdit = (c: LiveClass) => {
    setEditingId(c.id);
    setRecordingUrl(c.recording_storage_path || "");
    setStatus(c.status || "scheduled");
  };

  const handleSave = async (id: string) => {
    const { error } = await supabase
      .from("live_classes")
      .update({
        recording_storage_path: recordingUrl,
        status: status,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update session: " + error.message);
    } else {
      toast.success("Session updated successfully");
      setEditingId(null);
      fetchClasses();
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Recorded Sessions"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold flex items-center gap-2">
              <PlaySquare className="h-6 w-6 text-brand" />
              Manage Recordings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Add recording links (YouTube/Drive) to past live sessions.
            </p>
          </div>
        </header>

        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading sessions...</div>
          ) : classes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">No sessions found.</div>
          ) : (
            <div className="divide-y divide-border">
              {classes.map((c) => (
                <div key={c.id} className="p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-display font-bold text-base leading-tight">{c.title}</h3>
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase font-bold ${c.status === 'completed' ? 'bg-brand/10 text-brand' : 'bg-muted text-muted-foreground'}`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{c.topic?.title} • {c.teacher?.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(c.start_time || new Date()).toLocaleDateString()}</span>
                    </div>
                    
                    {!editingId || editingId !== c.id ? (
                      c.recording_storage_path ? (
                        <div className="mt-2 flex items-center gap-1 text-xs text-brand truncate max-w-[300px] md:max-w-[400px]">
                          <Video className="h-3.5 w-3.5 shrink-0" />
                          <a href={c.recording_storage_path} target="_blank" rel="noreferrer" className="hover:underline truncate">
                            {c.recording_storage_path}
                          </a>
                        </div>
                      ) : (
                        <div className="mt-2 text-xs italic text-muted-foreground">No recording added.</div>
                      )
                    ) : null}
                  </div>

                  {editingId === c.id ? (
                    <div className="flex-1 w-full md:w-auto bg-muted/50 p-3 rounded-2xl border border-border space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs"
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Recording URL (YouTube/Drive)</label>
                        <input
                          type="url"
                          value={recordingUrl}
                          onChange={(e) => setRecordingUrl(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full hover:bg-muted"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(c.id)}
                          className="inline-flex items-center gap-1 bg-brand text-brand-foreground px-3 py-1.5 text-xs font-semibold rounded-full hover:opacity-90"
                        >
                          <Save className="h-3 w-3" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(c)}
                      className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90"
                    >
                      Edit Recording
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
