import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

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

// True P2P WebRTC using Supabase Realtime for signaling
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
  
  // Peer Connections
  const peersRef = useRef<Record<string, RTCPeerConnection>>({});
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

  const createPeerConnection = useCallback((peerId: string, peerName: string, isInitiator: boolean) => {
    const pc = new RTCPeerConnection({
      iceServers: iceServersRef.current.length > 0 ? iceServersRef.current : [{ urls: "stun:stun.l.google.com:19302" }]
    });

    peersRef.current[peerId] = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        channelRef.current?.send({
          type: "broadcast",
          event: "signal",
          payload: { type: "ice-candidate", senderId: myPeerId.current, targetId: peerId, candidate: event.candidate }
        });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStreams(prev => {
        const existing = prev[peerId]?.stream || new MediaStream();
        existing.addTrack(event.track);
        return {
          ...prev,
          [peerId]: {
            peerId,
            userName: peerName,
            stream: existing
          }
        };
      });
    };

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current!));
    }

    if (isInitiator) {
      pc.createOffer().then(offer => {
        return pc.setLocalDescription(offer);
      }).then(() => {
        channelRef.current?.send({
          type: "broadcast",
          event: "signal",
          payload: { type: "offer", senderId: myPeerId.current, senderName: userName, targetId: peerId, sdp: pc.localDescription }
        });
      });
    }

    return pc;
  }, [userName]);

  const joinRoom = useCallback(async () => {
    if (isJoined || channelRef.current) return;

    try {
      // 1. Get TURN credentials from .env via import.meta.env
      const turnUrl = import.meta.env.VITE_TURN_URL;
      const turnUser = import.meta.env.VITE_TURN_USERNAME;
      const turnCred = import.meta.env.VITE_TURN_CREDENTIAL;
      
      if (turnUrl && turnUser && turnCred) {
        iceServersRef.current = [{
          urls: turnUrl,
          username: turnUser,
          credential: turnCred
        }];
      } else {
        iceServersRef.current = [{ urls: "stun:stun.l.google.com:19302" }];
      }

      const stream = await initLocalStream();
      if (!stream) return;

      // 2. Setup Supabase Realtime Channel
      const channel = supabase.channel(`room:${roomCode}`);
      channelRef.current = channel;
      
      channel.on("broadcast", { event: "signal" }, async ({ payload }) => {
        const { type, senderId, senderName, targetId, sdp, candidate } = payload;
        
        // Ignore messages not for us (unless it's a general peer-joined broadcast)
        if (targetId && targetId !== myPeerId.current) return;

        if (type === "peer-joined") {
          // A new peer joined, let's create a connection as the initiator
          createPeerConnection(senderId, senderName, true);
        } else if (type === "offer") {
          // Received an offer, create connection as receiver
          const pc = createPeerConnection(senderId, senderName, false);
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          channel.send({
            type: "broadcast",
            event: "signal",
            payload: { type: "answer", senderId: myPeerId.current, targetId: senderId, sdp: pc.localDescription }
          });
        } else if (type === "answer") {
          // Received an answer
          const pc = peersRef.current[senderId];
          if (pc) await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        } else if (type === "ice-candidate") {
          // Received an ICE candidate
          const pc = peersRef.current[senderId];
          if (pc) await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
      
      channel.on("broadcast", { event: "chat" }, ({ payload }) => {
        setChatMessages(prev => [...prev, payload]);
      }).on("broadcast", { event: "hand_raise" }, ({ payload }) => {
        setHandRaised(prev => ({ ...prev, [payload.peerId]: payload.isRaised }));
      }).on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        // Handle peer leave
        // Supabase presence can be used for reliable leave tracking, but we'll stick to a simple signaling for now
      });
      
      await channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Announce ourselves to existing peers
          channel.send({
            type: "broadcast",
            event: "signal",
            payload: { type: "peer-joined", senderId: myPeerId.current, senderName: userName }
          });
          setIsJoined(true);
        }
      });
      
    } catch (err: any) {
      console.error("[WebRTC] Failed to join room", err);
      setStreamError(`Failed to join room: ${err?.message || 'Unknown error'}`);
    }
  }, [roomCode, userName, isJoined, initLocalStream, createPeerConnection]);

  const leaveRoom = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    Object.values(peersRef.current).forEach(pc => pc.close());
    peersRef.current = {};

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

  // Media Controls
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

  return {
    localStream,
    remoteStreams: Object.values(remoteStreams),
    isJoined,
    joinRoom,
    leaveRoom,
    endMeeting,
    isMicMuted,
    isCamOff,
    isScreenSharing,
    toggleMic,
    toggleCam,
    flipCamera,
    switchCamera,
    toggleScreenShare,
    streamError,
    videoDevices,
    currentDeviceId,
    chatMessages,
    broadcastData,
    polls,
    handRaised,
    initLocalStream,
  };
}
