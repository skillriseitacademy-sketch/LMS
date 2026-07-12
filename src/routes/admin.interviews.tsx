import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SessionCard } from "@/components/monitoring/session-card";
import { LayoutDashboard, Users, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/interviews")({
  component: AdminInterviews,
});

function AdminInterviews() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [flags, setFlags] = useState<any[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchInitialData = async () => {
      const [sessionsRes, flagsRes] = await Promise.all([
        supabase
          .from("interview_sessions")
          .select("id, started_at, user_id, profiles!interview_sessions_user_id_fkey(name, avatar_url), topics(title)")
          .eq("status", "in_progress")
          .order("started_at", { ascending: false }),
        supabase
          .from("proctor_flags")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (sessionsRes.data) {
        setSessions(
          sessionsRes.data.map((s: any) => ({
            id: s.id,
            started_at: s.started_at,
            user: {
              name: s.profiles?.name,
              avatar_url: s.profiles?.avatar_url,
            },
            topic: {
              title: s.topics?.title,
            },
          }))
        );
      }
      if (flagsRes.data) {
        setFlags(flagsRes.data);
      }
    };

    fetchInitialData();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("interview-monitor")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "interview_sessions",
          filter: "status=eq.in_progress",
        },
        () => fetchInitialData() // Simplest way to sync
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "proctor_flags",
        },
        (payload) => {
          setFlags((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const totalFlags = flags.length;
  const activeSessionsCount = sessions.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Monitoring</h1>
        <p className="text-muted-foreground mt-2">
          Live monitoring of active interview sessions and proctoring flags.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
              <h3 className="text-2xl font-bold">{activeSessionsCount}</h3>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-lg text-destructive">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Flags</p>
              <h3 className="text-2xl font-bold">{totalFlags}</h3>
            </div>
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-muted/20">
          <Users className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No active sessions</h3>
          <p className="text-sm text-muted-foreground mt-1">
            When students start an interview, they will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              flags={flags.filter((f) => f.session_id === session.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
