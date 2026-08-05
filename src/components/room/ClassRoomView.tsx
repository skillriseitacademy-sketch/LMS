import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export function ClassRoomView({
  roomCode,
  roomId,
  isHost,
  userName,
}: {
  roomCode: string;
  roomId: string;
  isHost: boolean;
  userName: string;
}) {
  const [token, setToken] = useState("");
  const { session } = useAuth();

  useEffect(() => {
    async function fetchToken() {
      const {
        data: { session: authSession },
      } = await supabase.auth.getSession();

      const res = await fetch("/api/livekit/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authSession ? { Authorization: `Bearer ${authSession.access_token}` } : {}),
        },
        body: JSON.stringify({ roomCode, userName, isHost }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);

        // Auto-start recording if host
        if (isHost && authSession) {
          fetch("/api/recordings/start", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authSession.access_token}`,
            },
            body: JSON.stringify({ roomCode, roomId }),
          });
        }
      }
    }
    fetchToken();
  }, [roomCode, userName, isHost]);

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  // Use the public LiveKit URL if available, else a placeholder
  const serverUrl = import.meta.env.VITE_LIVEKIT_URL || "wss://your-project.livekit.cloud";

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}
