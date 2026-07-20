import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface RemoteStream {
  peerId: string;
  userName: string;
  stream: MediaStream;
}

export function useWebRTC(roomCode: string, userName: string) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, RemoteStream>>({});
  const [isJoined, setIsJoined] = useState(false);
  
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [streamError, setStreamError] = useState("");

  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionsRef = useRef<Record<string, RTCPeerConnection>>({});
  const candidateBufferRef = useRef<Record<string, RTCIceCandidateInit[]>>({});
  const channelRef = useRef<any>(null);
  const myPeerId = useRef(Math.random().toString(36).substring(7));

  // Initialize local media
  const initLocalStream = useCallback(async () => {
    if (localStreamRef.current) return localStreamRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      setLocalStream(stream);
      setStreamError("");
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
      setStreamError("Could not access camera or microphone. Please check permissions.");
      return null;
    }
  }, []);
  
  const toggleMic = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setIsMicMuted(!localStreamRef.current.getAudioTracks()[0]?.enabled);
  }, []);

  const toggleCam = useCallback(() => {
    if (!localStreamRef.current) return;
    localStreamRef.current.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    setIsCamOff(!localStreamRef.current.getVideoTracks()[0]?.enabled);
  }, []);

  const configuration: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      ...(import.meta.env.VITE_TURN_URL ? [{
        urls: import.meta.env.VITE_TURN_URL,
        username: import.meta.env.VITE_TURN_USERNAME,
        credential: import.meta.env.VITE_TURN_CREDENTIAL
      }] : [])
    ]
  };

  const createPeerConnection = (peerId: string, peerName: string) => {
    const pc = new RTCPeerConnection(configuration);
    
    // Add local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        console.log(`[WebRTC] Adding local track: ${track.kind} to peer ${peerId}`);
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(`[WebRTC] Sending ICE candidate to ${peerId}`);
        channelRef.current?.send({
          type: 'broadcast',
          event: 'ice-candidate',
          payload: {
            to: peerId,
            from: myPeerId.current,
            candidate: event.candidate,
          }
        });
      }
    };

    pc.ontrack = (event) => {
      console.log(`[WebRTC] ontrack fired for peer ${peerId}. Track kind: ${event.track.kind}`);
      setRemoteStreams(prev => {
        // Safely construct or update the stream to ensure both audio/video tracks are attached
        const existingStream = prev[peerId]?.stream || new MediaStream();
        existingStream.addTrack(event.track);
        
        return {
          ...prev,
          [peerId]: {
            peerId,
            userName: peerName,
            stream: existingStream
          }
        };
      });
    };

    pc.onconnectionstatechange = () => {
      console.log(`[WebRTC] connectionState for ${peerId} changed to: ${pc.connectionState}`);
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        setRemoteStreams(prev => {
          const next = { ...prev };
          delete next[peerId];
          return next;
        });
        delete peerConnectionsRef.current[peerId];
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`[WebRTC] iceConnectionState for ${peerId} changed to: ${pc.iceConnectionState}`);
      if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'closed') {
        setRemoteStreams(prev => {
          const next = { ...prev };
          delete next[peerId];
          return next;
        });
        delete peerConnectionsRef.current[peerId];
      }
    };

    peerConnectionsRef.current[peerId] = pc;
    return pc;
  };

  const joinRoom = useCallback(async () => {
    if (isJoined) return;
    const stream = await initLocalStream();
    if (!stream) return; // Wait for permissions

    const channel = supabase.channel(`room:${roomCode}`);
    channelRef.current = channel;

    channel
      .on('broadcast', { event: 'join' }, async ({ payload }) => {
        const { from, userName: peerName } = payload;
        if (from === myPeerId.current) return;

        const pc = createPeerConnection(from, peerName);
        
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        console.log(`[WebRTC] Sending offer to ${from}`);
        channel.send({
          type: 'broadcast',
          event: 'offer',
          payload: {
            to: from,
            from: myPeerId.current,
            userName: userName,
            offer
          }
        });
      })
      .on('broadcast', { event: 'offer' }, async ({ payload }) => {
        const { to, from, userName: peerName, offer } = payload;
        if (to !== myPeerId.current) return;
        console.log(`[WebRTC] Received offer from ${from}`);

        const pc = createPeerConnection(from, peerName);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        
        if (candidateBufferRef.current[from]) {
          console.log(`[WebRTC] Flushing ${candidateBufferRef.current[from].length} buffered ICE candidates for ${from}`);
          for (const c of candidateBufferRef.current[from]) {
            await pc.addIceCandidate(new RTCIceCandidate(c)).catch(console.error);
          }
          delete candidateBufferRef.current[from];
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        console.log(`[WebRTC] Sending answer to ${from}`);
        channel.send({
          type: 'broadcast',
          event: 'answer',
          payload: {
            to: from,
            from: myPeerId.current,
            answer
          }
        });
      })
      .on('broadcast', { event: 'answer' }, async ({ payload }) => {
        const { to, from, answer } = payload;
        if (to !== myPeerId.current) return;
        console.log(`[WebRTC] Received answer from ${from}`);

        const pc = peerConnectionsRef.current[from];
        if (pc) {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
          
          if (candidateBufferRef.current[from]) {
            console.log(`[WebRTC] Flushing ${candidateBufferRef.current[from].length} buffered ICE candidates for ${from}`);
            for (const c of candidateBufferRef.current[from]) {
              await pc.addIceCandidate(new RTCIceCandidate(c)).catch(console.error);
            }
            delete candidateBufferRef.current[from];
          }
        }
      })
      .on('broadcast', { event: 'ice-candidate' }, async ({ payload }) => {
        const { to, from, candidate } = payload;
        if (to !== myPeerId.current) return;
        console.log(`[WebRTC] Received ICE candidate from ${from}`);

        const pc = peerConnectionsRef.current[from];
        if (pc) {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
          } else {
            console.log(`[WebRTC] Buffering ICE candidate for ${from} (RemoteDescription not set)`);
            if (!candidateBufferRef.current[from]) candidateBufferRef.current[from] = [];
            candidateBufferRef.current[from].push(candidate);
          }
        } else {
          console.log(`[WebRTC] Buffering ICE candidate for ${from} (PeerConnection not ready)`);
          if (!candidateBufferRef.current[from]) candidateBufferRef.current[from] = [];
          candidateBufferRef.current[from].push(candidate);
        }
      })
      .on('broadcast', { event: 'leave' }, ({ payload }) => {
        const { from } = payload;
        if (peerConnectionsRef.current[from]) {
          peerConnectionsRef.current[from].close();
          delete peerConnectionsRef.current[from];
          setRemoteStreams(prev => {
            const next = { ...prev };
            delete next[from];
            return next;
          });
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsJoined(true);
          channel.send({
            type: 'broadcast',
            event: 'join',
            payload: {
              from: myPeerId.current,
              userName
            }
          });
        }
      });

    const handleUnload = () => {
      if (channelRef.current) {
        channelRef.current.send({
          type: 'broadcast',
          event: 'leave',
          payload: { from: myPeerId.current }
        });
      }
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };

  }, [roomCode, userName, isJoined, initLocalStream]);

  const leaveRoom = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'leave',
        payload: { from: myPeerId.current }
      });
      supabase.removeChannel(channelRef.current);
    }
    
    Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
    peerConnectionsRef.current = {};
    setRemoteStreams({});
    setIsJoined(false);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
      setIsMicMuted(false);
      setIsCamOff(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      // Auto leave on unmount
      leaveRoom();
    };
  }, [leaveRoom]);

  return {
    localStream,
    remoteStreams: Object.values(remoteStreams),
    isJoined,
    isMicMuted,
    isCamOff,
    streamError,
    initLocalStream,
    joinRoom,
    leaveRoom,
    toggleMic,
    toggleCam
  };
}
