import { createFileRoute, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { Mic, Square, ShieldAlert, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const Route = createFileRoute("/_app/interview/ai/$sessionId")({
  head: () => ({ meta: [{ title: "AI Interview — PlacePro LMS" }] }),
  component: AiVoiceInterview,
});

function AiVoiceInterview() {
  const { sessionId } = useParams({ from: "/_app/interview/ai/$sessionId" });
  const navigate = useNavigate();
  // We use router state to get the ephemeral key passed from the index page
  const routerState = useRouterState();
  const locationState = routerState.location.state as { ephemeralKey?: string; roleId?: string };
  const ephemeralKey = locationState?.ephemeralKey;

  const [status, setStatus] = useState<"connecting" | "active" | "error" | "finished">(
    "connecting",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // MediaPipe
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [proctorFlags, setProctorFlags] = useState<number>(0);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const isProctoringRef = useRef(false);

  useEffect(() => {
    if (!ephemeralKey) {
      setErrorMsg("Missing session key. Please start the interview from the previous page.");
      setStatus("error");
      return;
    }

    let mounted = true;

    async function initWebRTC() {
      try {
        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        const audioEl = document.createElement("audio");
        audioEl.autoplay = true;
        audioRef.current = audioEl;

        pc.ontrack = (e) => {
          if (mounted && audioEl.srcObject !== e.streams[0]) {
            audioEl.srcObject = e.streams[0];
          }
        };

        const ms = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        // Audio for WebRTC
        const audioTrack = ms.getAudioTracks()[0];
        pc.addTrack(audioTrack, ms);

        // Video for MediaPipe
        if (videoRef.current) {
          videoRef.current.srcObject = ms;
        }

        const dc = pc.createDataChannel("oai-events");
        dcRef.current = dc;

        dc.addEventListener("message", (e) => {
          // Handle realtime events if needed
          // e.g., session.created, input_audio_buffer.speech_started
          const event = JSON.parse(e.data);
          if (event.type === "session.created") {
            if (mounted) setStatus("active");
          }
        });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const baseUrl = "https://api.openai.com/v1/realtime";
        const model = "gpt-4o-realtime-preview-2024-12-17";

        const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            "Content-Type": "application/sdp",
          },
        });

        if (!sdpResponse.ok) {
          throw new Error("Failed to connect to AI server");
        }

        const answer = { type: "answer" as RTCSdpType, sdp: await sdpResponse.text() };
        await pc.setRemoteDescription(answer);
      } catch (err: any) {
        if (mounted) {
          setErrorMsg(err.message || "Failed to initialize interview");
          setStatus("error");
        }
      }
    }

    initWebRTC();

    return () => {
      mounted = false;
      pcRef.current?.close();
      audioRef.current?.srcObject &&
        (audioRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current?.srcObject &&
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
    };
  }, [ephemeralKey]);

  // MediaPipe Initialization
  useEffect(() => {
    async function initMediaPipe() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm",
        );
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 2,
        });
        isProctoringRef.current = true;
        detectFaces();
      } catch (e) {
        console.error("MediaPipe init error:", e);
      }
    }

    let lastVideoTime = -1;
    let lookAwayFrames = 0;

    async function detectFaces() {
      if (!isProctoringRef.current || !videoRef.current || !faceLandmarkerRef.current) return;

      const video = videoRef.current;
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;

        const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());

        let flagRaised = false;
        let reason = "";

        if (results.faceBlendshapes.length === 0) {
          lookAwayFrames++;
          if (lookAwayFrames > 60) {
            // ~2 seconds missing
            flagRaised = true;
            reason = "No face detected";
          }
        } else if (results.faceBlendshapes.length > 1) {
          flagRaised = true;
          reason = "Multiple faces detected";
        } else {
          lookAwayFrames = 0;
          // Check looking away (eye gaze) if needed, simplified here
        }

        if (flagRaised && lookAwayFrames > 60) {
          lookAwayFrames = 0; // reset to avoid spamming
          setProctorFlags((prev) => prev + 1);
          // Log to DB
          supabase
            .from("proctor_flags")
            .insert({
              session_id: sessionId,
              flag_type: "visual",
              description: reason,
            })
            .then();
        }
      }

      requestAnimationFrame(detectFaces);
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", initMediaPipe);
    }

    return () => {
      isProctoringRef.current = false;
    };
  }, [sessionId]);

  const endInterview = async () => {
    setStatus("finished");
    pcRef.current?.close();

    await supabase
      .from("interview_sessions")
      .update({
        status: "completed",
        ended_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    navigate({ to: "/dashboard" }); // Or redirect to feedback route
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <TopBar title="Voice AI Interview" />

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        {status === "connecting" && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <div className="h-16 w-16 animate-pulse rounded-full bg-brand/20 flex items-center justify-center">
              <Mic className="h-8 w-8 text-brand" />
            </div>
            <p>Connecting to AI Interviewer...</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4 text-destructive">
            <ShieldAlert className="h-12 w-12" />
            <p className="text-center font-medium max-w-sm">{errorMsg}</p>
            <button
              onClick={() => navigate({ to: "/interview" })}
              className="mt-4 rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-foreground"
            >
              Go Back
            </button>
          </div>
        )}

        {status === "active" && (
          <div className="flex w-full max-w-lg flex-col items-center gap-12">
            <div className="text-center">
              <h2 className="text-display text-3xl font-bold">Interview in progress</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The AI is listening and speaking.
              </p>
            </div>

            <div className="relative flex h-48 w-48 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-brand/30"></div>
              <div className="absolute inset-4 animate-pulse rounded-full bg-brand/50"></div>
              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-2xl">
                <Mic className="h-10 w-10" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${proctorFlags > 0 ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"}`}
                  >
                    {proctorFlags > 0 ? (
                      <ShieldAlert className="h-5 w-5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Proctoring Status</h4>
                    <p className="text-xs text-muted-foreground">
                      {proctorFlags === 0
                        ? "Everything looks good"
                        : `${proctorFlags} flag(s) raised`}
                    </p>
                  </div>
                </div>

                {/* Hidden video element for proctoring */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-16 w-16 rounded-lg object-cover border border-border"
                />
              </div>

              <button
                onClick={endInterview}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-destructive py-3 font-semibold text-destructive-foreground hover:bg-destructive/90"
              >
                <Square className="h-4 w-4" /> End Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
