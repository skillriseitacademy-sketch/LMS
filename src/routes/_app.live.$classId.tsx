import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { TopBar } from "@/components/top-bar";
import { useAuth } from "@/lib/auth-store";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/live/$classId")({
  head: () => ({ meta: [{ title: "Live Class — PlacePro LMS" }] }),
  component: LiveClassRoom,
});

function LiveClassRoom() {
  const { classId } = Route.useParams();
  const { session } = useAuth();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    async function loadClass() {
      if (!session) return;
      const { data, error } = await supabase
        .from("live_classes")
        .select("*, topics(title)")
        .eq("id", classId)
        .single();

      if (error || !data) {
        setError("Class not found");
      } else {
        setClassData(data);

        // Log attendance if student
        if (session.role === "student" && !hasJoined) {
          await supabase.from("class_attendance").upsert(
            {
              class_id: classId,
              user_id: session.id,
              joined_at: new Date().toISOString(),
            },
            { onConflict: "class_id,user_id" },
          );
          setHasJoined(true);
        }
      }
      setLoading(false);
    }
    loadClass();
  }, [classId, session, hasJoined]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <TopBar title={classData?.title || "Live Class"} />

      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate({ to: "/live" })}
              className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Live Classes
            </button>
            <h1 className="text-display text-2xl font-bold">{classData?.title}</h1>
            <p className="text-sm text-muted-foreground">{classData?.topics?.title}</p>
          </div>
        </div>

        <div className="flex-1 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading room...
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center text-sm text-destructive">
              {error}
            </div>
          ) : classData?.daily_room_url ? (
            <iframe
              ref={iframeRef}
              title="Live Class Room"
              src={`${classData.daily_room_url}?theme=dark`}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Room URL not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
