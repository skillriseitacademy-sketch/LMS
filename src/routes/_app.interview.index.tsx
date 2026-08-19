import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_app/interview/")({
  component: InterviewIndexPage,
});

function InterviewIndexPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingTrackId, setStartingTrackId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      
      // Fetch tracks
      const { data: tracksData } = await supabase
        .from("interview_tracks")
        .select("*")
        .order("name");
        
      setTracks(tracksData || []);

      // Fetch history
      const { data: historyData } = await supabase
        .from("interview_sessions")
        .select("*, interview_tracks(name)")
        .eq("user_id", session.id)
        .order("started_at", { ascending: false })
        .limit(5);
        
      setHistory(historyData || []);
      setLoading(false);
    };
    fetchData();
  }, [session]);

  const handleStartInterview = async (trackId: string) => {
    if (startingTrackId) return;
    setStartingTrackId(trackId);
    
    try {
      const { data: { session: authSession } } = await supabase.auth.getSession();
      
      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authSession?.access_token}`
        },
        body: JSON.stringify({ track_id: trackId })
      });
      
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      
      navigate({
        to: "/interview/ai/$sessionId",
        params: { sessionId: data.session_id },
        state: { ephemeralKey: data.client_secret } as any
      });
      
    } catch (err) {
      console.error(err);
      alert("Failed to start session. " + err);
      setStartingTrackId(null);
    }
  };

  const getIconForTrack = (name: string) => {
    if (name.toLowerCase().includes("behavior")) return "psychology";
    if (name.toLowerCase().includes("design")) return "architecture";
    return "terminal";
  };

  const getColorClassForTrack = (index: number) => {
    const colors = ["primary", "secondary", "tertiary"];
    return colors[index % colors.length];
  };

  return (
    <div className="pt-8 px-4 md:px-8 pb-8 max-w-container-max mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2
            className="text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface mb-2"
            style={{ fontFamily: "Manrope" }}
          >
            Interview Hub
          </h2>
          <p
            className="text-lg leading-[1.6] text-on-surface-variant"
            style={{ fontFamily: "Inter" }}
          >
            Master your delivery. Track your progress. Land the offer.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-on-surface-variant">Loading dashboard...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Practice Modes */}
          <div className="lg:col-span-3">
            <h3
              className="text-[24px] font-semibold leading-[1.3] text-on-surface mb-4"
              style={{ fontFamily: "Manrope" }}
            >
              Practice Modes (AI Tracks)
            </h3>
            
            {tracks.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
                No interview tracks available. Admins need to create them.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tracks.map((track, idx) => {
                  const icon = getIconForTrack(track.name);
                  const color = getColorClassForTrack(idx);
                  
                  return (
                    <div 
                      key={track.id}
                      onClick={() => handleStartInterview(track.id)}
                      className={`bg-surface-container-lowest rounded-[16px] p-6 shadow-sm border border-outline-variant/30 hover:border-${color}/50 transition-all duration-300 group cursor-pointer relative overflow-hidden`}
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-${color}-fixed/40 transition-all`}></div>
                      <div className={`w-12 h-12 rounded-xl bg-${color}-container/10 flex items-center justify-center mb-4 text-${color} relative z-10`}>
                        <span className="material-symbols-outlined text-[28px]">{icon}</span>
                      </div>
                      <h4
                        className="text-[24px] font-semibold leading-[1.3] text-on-surface mb-2 relative z-10"
                        style={{ fontFamily: "Manrope" }}
                      >
                        {track.name}
                      </h4>
                      <p
                        className="text-base leading-[1.5] text-on-surface-variant mb-6 relative z-10 line-clamp-3"
                        style={{ fontFamily: "Inter" }}
                      >
                        {track.description || "Start a simulated AI interview session tailored for this track."}
                      </p>
                      <div
                        className={`flex items-center text-${color} font-semibold text-base leading-[1.5] relative z-10 group-hover:translate-x-1 transition-transform`}
                        style={{ fontFamily: "Inter" }}
                      >
                        {startingTrackId === track.id ? "Connecting..." : "Select Mode"}{" "}
                        <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* History */}
          <div className="lg:col-span-3 flex flex-col gap-4 mt-4">
            <h3
              className="text-[24px] font-semibold leading-[1.3] text-on-surface"
              style={{ fontFamily: "Manrope" }}
            >
              Recent Sessions
            </h3>
            
            {history.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
                You haven't completed any interviews yet. Select a mode above to begin!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map(session => (
                  <div key={session.id} className="bg-surface-container-lowest rounded-[16px] shadow-sm border border-outline-variant/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-primary">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex flex-col items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">psychology</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className="text-[18px] font-semibold leading-[1.3] text-on-surface"
                            style={{ fontFamily: "Manrope" }}
                          >
                            {session.interview_tracks?.name || "General Interview"}
                          </h4>
                          <span
                            className="px-2 py-0.5 rounded-full bg-primary-container/10 text-primary text-xs tracking-[0.05em] font-medium uppercase"
                            style={{ fontFamily: "JetBrains Mono" }}
                          >
                            {session.status}
                          </span>
                        </div>
                        <p
                          className="text-sm leading-[1.5] text-on-surface-variant flex items-center gap-1"
                          style={{ fontFamily: "Inter" }}
                        >
                          <span className="material-symbols-outlined text-[16px]">schedule</span> 
                          {new Date(session.started_at).toLocaleDateString()} at {new Date(session.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
