import { useEffect, useState, useRef } from "react";
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
  
  // Recording states
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    async function fetchToken() {
      const {
        data: { session: authSession },
      } = await supabase.auth.getSession();

      const res = await fetch("/api/livekit-token", {
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

        if (isHost && authSession) {
          try {
            // Use local screen recording for instant download on teacher desktop
            const stream = await navigator.mediaDevices.getDisplayMedia({
              video: { displaySurface: "browser" },
              audio: true
            });

            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            mediaRecorderRef.current = mediaRecorder;
            recordedChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
              }
            };

            mediaRecorder.onstop = () => {
              const blob = new Blob(recordedChunksRef.current, {
                type: "video/webm",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.style.display = "none";
              a.href = url;
              a.download = `Class_Recording_${roomCode}.webm`;
              a.click();
              window.URL.revokeObjectURL(url);
            };

            mediaRecorder.start();
          } catch (err) {
            console.error("Screen recording access denied or failed", err);
          }
        }
      }
    }
    fetchToken();

    return () => {
      // Stop recording and trigger download on unmount (when leaving room)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
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
