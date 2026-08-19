import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

declare global {
  interface Window {
    Metered: any;
  }
}

export interface RemoteStream {
  peerId: string;
  userName: string;
  stream: MediaStream;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: string[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  active: boolean;
}

// Rewritten for SFU Architecture (1 Publish, 1 Subscribe connection)
export function useWebRTC(roomCode: string, userName: string, onMeetingEnded?: () => void) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, RemoteStream>>({});
  const [isJoined, setIsJoined] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [streamError, setStreamError] = useState("");

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [handRaised, setHandRaised] = useState<Record<string, boolean>>({});

  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string>("");

  const localStreamRef = useRef<MediaStream | null>(null);
  const originalVideoTrackRef = useRef<MediaStreamTrack | null>(null);
  
  // SFU Connections
  const meteredMeetingRef = useRef<any>(null);
  
  const channelRef = useRef<any>(null);
  const myPeerId = useRef(Math.random().toString(36).substring(7));
  const iceServersRef = useRef<RTCIceServer[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter((device) => device.kind === "videoinput");
        setVideoDevices(videoInputDevices);
      } catch (err) {
        console.error("Error enumerating devices:", err);
      }
    };
    getDevices();
    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    return () => navigator.mediaDevices.removeEventListener("devicechange", getDevices);
  }, []);

  const initLocalStream = useCallback(
    async (forcedFacingMode?: "user" | "environment") => {
      const currentFacingMode = forcedFacingMode || facingMode;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: currentDeviceId ? { deviceId: { exact: currentDeviceId } } : { facingMode: currentFacingMode },
          audio: true,
        });
        localStreamRef.current = stream;
        
        if (!currentDeviceId && stream.getVideoTracks().length > 0) {
          const track = stream.getVideoTracks()[0];
          if (track.getSettings().deviceId) {
            setCurrentDeviceId(track.getSettings().deviceId!);
          }
        }

        setLocalStream(stream);
        setStreamError("");
        return stream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setStreamError("Could not access camera or microphone.");
        return null;
      }
    },
    [facingMode, currentDeviceId],
  );

  const joinRoom = useCallback(async () => {
    if (isJoined || meteredMeetingRef.current || channelRef.current) return;

    try {
      // 1. Fetch Metered Token from our new endpoint
      const { data: { session } } = await supabase.auth.getSession();
      const tokenRes = await fetch(`/api/rooms/${roomCode}/media-token`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });
      
      if (!tokenRes.ok) throw new Error("Failed to get media token");
      const { roomURL } = await tokenRes.json();
      
      const meeting = new window.Metered.Meeting();
      meteredMeetingRef.current = meeting;

      meeting.on("remoteTrackStarted", (remoteTrackItem: any) => {
        const streamId = remoteTrackItem.participantSessionId;
        console.log(`[SFU] Received remote track from SFU for stream: ${streamId}`);
        setRemoteStreams((prev) => {
          const existing = prev[streamId]?.stream || new MediaStream();
          existing.addTrack(remoteTrackItem.track);
          return {
            ...prev,
            [streamId]: {
              peerId: streamId,
              userName: remoteTrackItem.name || `Participant`,
              stream: existing,
            }
          };
        });
      });

      meeting.on("participantLeft", (participantInfo: any) => {
        setRemoteStreams((prev) => {
          const next = { ...prev };
          delete next[participantInfo.sessionId];
          return next;
        });
      });

      await meeting.join({
        roomURL,
        name: userName
      });
      
      console.log(`[SFU] Authenticated for room: ${roomURL}`);
      
      const stream = await initLocalStream();
      if (stream) {
        // Metered API to share local tracks if possible, or startVideo
        try {
          if (stream.getVideoTracks().length > 0) {
            await meeting.startVideo();
          }
          if (stream.getAudioTracks().length > 0) {
            await meeting.startAudio();
          }
        } catch (e) {
          console.warn("[SFU] Metered startVideo/Audio error", e);
        }
      }
      
      // 3. Fallback DataChannel over Supabase (since we are mocking SFU data messages)
      const channel = supabase.channel(`room:${roomCode}`);
      channelRef.current = channel;
      
      channel.on("broadcast", { event: "chat" }, ({ payload }) => {
        setChatMessages(prev => [...prev, payload]);
      }).on("broadcast", { event: "hand_raise" }, ({ payload }) => {
        setHandRaised(prev => ({ ...prev, [payload.peerId]: payload.isRaised }));
      });
      
      await channel.subscribe();
      setIsJoined(true);
      
    } catch (err) {
      console.error("[SFU] Failed to join room", err);
      setStreamError("Failed to join room via SFU.");
    }
  }, [roomCode, userName, isJoined, initLocalStream]);

  const leaveRoom = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    if (meteredMeetingRef.current) {
      try {
        meteredMeetingRef.current.leaveMeeting();
      } catch (e) {}
      meteredMeetingRef.current = null;
    }

    setRemoteStreams({});
    setIsJoined(false);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  }, []);

  const broadcastData = useCallback((type: string, payload: any) => {
    if (type === "chat") {
      const msg = { ...payload, type: "chat" };
      channelRef.current?.send({ type: "broadcast", event: "chat", payload: msg });
      setChatMessages(prev => [...prev, msg]);
    } else if (type === "hand_raise") {
      channelRef.current?.send({ type: "broadcast", event: "hand_raise", payload });
      setHandRaised(prev => ({ ...prev, [payload.peerId]: payload.isRaised }));
    }
  }, []);

  // Media Controls (Simplified for SFU)
  const toggleMic = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach(t => t.enabled = !t.enabled);
    setIsMicMuted(!localStreamRef.current.getAudioTracks()[0]?.enabled);
  }, []);

  const toggleCam = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach(t => t.enabled = !t.enabled);
    setIsCamOff(!localStreamRef.current.getVideoTracks()[0]?.enabled);
  }, []);

  const endMeeting = useCallback(() => {
    // Ideally ping backend to close room
    leaveRoom();
    if (onMeetingEnded) onMeetingEnded();
  }, [leaveRoom, onMeetingEnded]);

  const flipCamera = useCallback(async () => {}, []);
  const switchCamera = useCallback(async (deviceId: string) => {}, []);
  const toggleScreenShare = useCallback(async () => {}, []);

  useEffect(() => {
    return () => leaveRoom();
  }, [leaveRoom]);

  return {
    localStream,
    remoteStreams: Object.values(remoteStreams),
    isJoined,
    isMicMuted,
    isCamOff,
    isScreenSharing,
    streamError,
    facingMode,
    chatMessages,
    polls,
    handRaised,
    myPeerId: myPeerId.current,
    videoDevices,
    currentDeviceId,
    initLocalStream,
    joinRoom,
    leaveRoom,
    endMeeting,
    toggleMic,
    toggleCam,
    toggleScreenShare,
    flipCamera,
    switchCamera,
    broadcastData,
  };
}
