import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface ParticipantMediaState {
  audioEnabled: boolean;
  videoEnabled: boolean;
  screenSharing: boolean;
  handRaised: boolean;
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

// True P2P WebRTC using Supabase Realtime for signaling
export function useWebRTC(roomCode: string, userName: string, isHost: boolean = false, onMeetingEnded?: () => void) {
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
  const [participantStates, setParticipantStates] = useState<Record<string, ParticipantMediaState>>({});
  const isMicMutedRef = useRef(isMicMuted);
  useEffect(() => { isMicMutedRef.current = isMicMuted; }, [isMicMuted]);


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

  const updateMyState = useCallback((partial: Partial<ParticipantMediaState>) => {
    setParticipantStates(prev => {
      const current = prev[myPeerId.current] || { audioEnabled: true, videoEnabled: true, screenSharing: false, handRaised: false };
      const updated = { ...current, ...partial };
      channelRef.current?.send({ type: "broadcast", event: "participant_state", payload: { peerId: myPeerId.current, state: updated } });
      return { ...prev, [myPeerId.current]: updated };
    });
  }, []);

  const initLocalStream = useCallback(
    async (forcedFacingMode?: "user" | "environment") => {
      const currentFacingMode = forcedFacingMode || facingMode;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: currentDeviceId ? { deviceId: { exact: currentDeviceId } } : { facingMode: currentFacingMode },
          audio: true,
        });

        // Ensure old tracks are stopped before replacing
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach(t => t.stop());
        }

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

    
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed') {
         toast.info(`${peerName} left the meeting`);
         setRemoteStreams(prev => {
            const next = { ...prev };
            delete next[peerId];
            return next;
         });
         setParticipantStates(prev => {
            const next = { ...prev };
            delete next[peerId];
            return next;
         });
         pc.close();
         delete peersRef.current[peerId];
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
          channel.send({ type: "broadcast", event: "participant_state", payload: { peerId: myPeerId.current, state: participantStates[myPeerId.current] || { audioEnabled: !isMicMutedRef.current, videoEnabled: !isCamOff, screenSharing: isScreenSharing, handRaised: false } } });
          toast.success(`${senderName} joined the meeting`);
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
      
      
      channel.on("broadcast", { event: "participant_state" }, ({ payload }) => {
        setParticipantStates(prev => ({ ...prev, [payload.peerId]: payload.state }));
      });

      channel.on("broadcast", { event: "control" }, ({ payload }) => {
        if (payload.targetId === myPeerId.current || payload.targetId === "all") {
          if (payload.action === "mute" && !isMicMutedRef.current) {
            toast("Host muted your microphone");
            localStreamRef.current?.getAudioTracks().forEach(t => t.enabled = false);
            setIsMicMuted(true);
            updateMyState({ audioEnabled: false });
          } else if (payload.action === "remove") {
            toast.error("You were removed from the meeting");
            leaveRoom();
            if (onMeetingEnded) onMeetingEnded();
          } else if (payload.action === "lower_hand") {
            toast("Host lowered your hand");
            setHandRaised(prev => ({ ...prev, [myPeerId.current]: false }));
            updateMyState({ handRaised: false });
          } else if (payload.action === "end_meeting") {
            toast.error("The host ended the meeting.");
            leaveRoom();
            if (onMeetingEnded) onMeetingEnded();
          }
        }
      });
      
      channel.on("broadcast", { event: "chat" }, ({ payload }) => {
        if (payload.senderId !== myPeerId.current) toast.message(`${payload.senderName}: ${payload.text}`);
        setChatMessages(prev => [...prev, payload]);
      }).on("broadcast", { event: "hand_raise" }, ({ payload }) => {
        if (payload.isRaised && payload.peerId !== myPeerId.current) toast(`${payload.senderName || "Someone"} raised their hand`, { icon: "✋" });
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
          updateMyState({ audioEnabled: !isMicMutedRef.current, videoEnabled: !isCamOff, screenSharing: isScreenSharing, handRaised: false });
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
    if (type === "control") {
      channelRef.current?.send({ type: "broadcast", event: "control", payload });
      return;
    }
    if (type === "chat") {
      const msg = { ...payload, type: "chat" };
      channelRef.current?.send({ type: "broadcast", event: "chat", payload: msg });
      setChatMessages(prev => [...prev, msg]);
    } else if (type === "hand_raise") {
      channelRef.current?.send({ type: "broadcast", event: "hand_raise", payload: { ...payload, senderName: userName } });
      updateMyState({ handRaised: payload.isRaised });
      setHandRaised(prev => ({ ...prev, [payload.peerId]: payload.isRaised }));
    }
  }, []);

  // Media Controls
    const toggleMic = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach(t => t.enabled = !t.enabled);
    const isMuted = !localStreamRef.current.getAudioTracks()[0]?.enabled;
    setIsMicMuted(isMuted);
    updateMyState({ audioEnabled: !isMuted });
  }, [updateMyState]);

  const toggleCam = useCallback(async () => {
    if (!localStreamRef.current) return;
    
    if (!isCamOff) {
      // Turning OFF - stop track to turn off camera light
      localStreamRef.current.getVideoTracks().forEach(t => {
        t.stop();
        if (localStreamRef.current) localStreamRef.current.removeTrack(t);
      });
      setIsCamOff(true);
      updateMyState({ videoEnabled: false });
      setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
    } else {
      // Turning ON - request new track
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: currentDeviceId ? { deviceId: { exact: currentDeviceId } } : { facingMode: facingMode },
        });
        const newTrack = stream.getVideoTracks()[0];
        
        localStreamRef.current.getVideoTracks().forEach(t => localStreamRef.current?.removeTrack(t));
        localStreamRef.current.addTrack(newTrack);
        
        Object.values(peersRef.current).forEach(pc => {
          const sender = pc.getSenders().find(s => s.track?.kind === "video");
          if (sender) sender.replaceTrack(newTrack);
        });
        
        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
        setIsCamOff(false);
        updateMyState({ videoEnabled: true });
      } catch (err) {
        console.error("Error turning camera back on:", err);
      }
    }
  }, [isCamOff, currentDeviceId, facingMode]);

  const endMeeting = useCallback(() => {
    // Ideally ping backend to close room
    leaveRoom();
    if (onMeetingEnded) onMeetingEnded();
  }, [leaveRoom, onMeetingEnded]);

  const flipCamera = useCallback(async () => {}, []);
  const switchCamera = useCallback(async (deviceId: string) => {}, []);

  const revertToCamera = useCallback(async () => {
    if (!localStreamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: currentDeviceId ? { deviceId: { exact: currentDeviceId } } : { facingMode: facingMode },
      });
      const newTrack = stream.getVideoTracks()[0];
      
      localStreamRef.current.getVideoTracks().forEach(t => {
        t.stop();
        if (localStreamRef.current) localStreamRef.current.removeTrack(t);
      });
      localStreamRef.current.addTrack(newTrack);
      
      Object.values(peersRef.current).forEach(pc => {
        const sender = pc.getSenders().find(s => s.track?.kind === "video");
        if (sender) sender.replaceTrack(newTrack);
      });
      
      setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
      setIsScreenSharing(false);
      updateMyState({ screenSharing: false });
      setIsCamOff(false);
        updateMyState({ videoEnabled: true });
    } catch (err) {
      console.error("Error reverting to camera:", err);
    }
  }, [currentDeviceId, facingMode]);

  const toggleScreenShare = useCallback(async () => {
    if (!localStreamRef.current) return;
    
    const anyoneSharing = Object.entries(participantStates).some(([id, s]) => s.screenSharing && id !== myPeerId.current);
    if (anyoneSharing && !isScreenSharing) {
        toast.error("Someone is already presenting");
        return;
    }
    if (!localStreamRef.current) return;

    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        screenTrack.onended = () => {
          revertToCamera();
        };

        localStreamRef.current.getVideoTracks().forEach(t => {
          t.stop();
          if (localStreamRef.current) localStreamRef.current.removeTrack(t);
        });
        localStreamRef.current.addTrack(screenTrack);

        Object.values(peersRef.current).forEach(pc => {
          const sender = pc.getSenders().find(s => s.track?.kind === "video");
          if (sender) sender.replaceTrack(screenTrack);
        });

        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
        setIsScreenSharing(true);
        updateMyState({ screenSharing: true });
        setIsCamOff(true);
      updateMyState({ videoEnabled: false });
      } catch (e) {
        console.error("Error sharing screen:", e);
      }
    } else {
      revertToCamera();
    }
  }, [isScreenSharing, revertToCamera, participantStates]);

  // Cleanup tracks when component unmounts
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      Object.values(peersRef.current).forEach(pc => pc.close());
    };
  }, []);

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
    participantStates,
    broadcastData,
    polls,
    handRaised,
    initLocalStream,
    facingMode,
    myPeerId: myPeerId.current,
  };
}
