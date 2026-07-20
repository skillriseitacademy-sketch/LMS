import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface RemoteStream {
  peerId: string;
  userName: string;
  stream: MediaStream;
}

export function useWebRTC(roomCode: string, userName: string, onMeetingEnded?: () => void) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, RemoteStream>>({});
  const [isJoined, setIsJoined] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [streamError, setStreamError] = useState("");

  const localStreamRef = useRef<MediaStream | null>(null);
  const originalVideoTrackRef = useRef<MediaStreamTrack | null>(null);
  const peerConnectionsRef = useRef<Record<string, RTCPeerConnection>>({});
  const candidateBufferRef = useRef<Record<string, RTCIceCandidateInit[]>>({});
  const channelRef = useRef<any>(null);
  const myPeerId = useRef(Math.random().toString(36).substring(7));
  const iceServersRef = useRef<RTCIceServer[]>([]);
  const iceCandidatesQueueRef = useRef<Record<string, RTCIceCandidateInit[]>>({});
  const iceCandidateTimerRef = useRef<Record<string, NodeJS.Timeout | null>>({});

  // Initialize local media
  const initLocalStream = useCallback(async (forcedFacingMode?: 'user' | 'environment') => {
    const currentFacingMode = forcedFacingMode || facingMode;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: currentFacingMode }, 
        audio: true 
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      setStreamError("");
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
      setStreamError("Could not access camera or microphone. Please check permissions.");
      return null;
    }
  }, [facingMode]);
  
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

  const flipCamera = useCallback(async () => {
    if (!localStreamRef.current) return;
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: newFacingMode } }
      });
      
      const newVideoTrack = newStream.getVideoTracks()[0];
      const oldVideoTrack = localStreamRef.current.getVideoTracks()[0];
      
      if (oldVideoTrack) {
        oldVideoTrack.stop();
        localStreamRef.current.removeTrack(oldVideoTrack);
      }
      
      localStreamRef.current.addTrack(newVideoTrack);
      setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
      setFacingMode(newFacingMode);

      // Replace track in all peer connections
      Object.values(peerConnectionsRef.current).forEach(pc => {
        const sender = pc.getSenders().find(s => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(newVideoTrack);
        }
      });
    } catch (err) {
      console.error("Error flipping camera:", err);
      // Fallback if 'exact' facingMode fails (e.g. desktop)
      setFacingMode(newFacingMode);
    }
  }, [facingMode]);

  const toggleScreenShare = useCallback(async () => {
    if (!localStreamRef.current) return;

    if (isScreenSharing) {
      // Turn off screen sharing
      const cameraTrack = originalVideoTrackRef.current;
      if (cameraTrack) {
        // Replace track in all peer connections
        Object.values(peerConnectionsRef.current).forEach(pc => {
          const sender = pc.getSenders().find(s => s.track?.kind === 'video');
          if (sender) {
            sender.replaceTrack(cameraTrack);
          }
        });

        // Update local stream to show camera
        const screenTrack = localStreamRef.current.getVideoTracks()[0];
        if (screenTrack) {
          screenTrack.stop();
          localStreamRef.current.removeTrack(screenTrack);
        }
        localStreamRef.current.addTrack(cameraTrack);
        
        // Force re-render
        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
      }
      setIsScreenSharing(false);
      originalVideoTrackRef.current = null;
    } else {
      // Turn on screen sharing
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        
        const cameraTrack = localStreamRef.current.getVideoTracks()[0];
        if (cameraTrack) {
          originalVideoTrackRef.current = cameraTrack;
          localStreamRef.current.removeTrack(cameraTrack);
        }

        localStreamRef.current.addTrack(screenTrack);
        setLocalStream(new MediaStream(localStreamRef.current.getTracks()));

        // Replace track in all peer connections
        Object.values(peerConnectionsRef.current).forEach(pc => {
          const sender = pc.getSenders().find(s => s.track?.kind === 'video');
          if (sender) {
            sender.replaceTrack(screenTrack);
          }
        });

        setIsScreenSharing(true);

        // Listen for user stopping screen share via browser UI
        screenTrack.onended = () => {
          if (originalVideoTrackRef.current && localStreamRef.current) {
            const currentScreenTrack = localStreamRef.current.getVideoTracks()[0];
            if (currentScreenTrack) {
              localStreamRef.current.removeTrack(currentScreenTrack);
            }
            localStreamRef.current.addTrack(originalVideoTrackRef.current);
            setLocalStream(new MediaStream(localStreamRef.current.getTracks()));
            
            Object.values(peerConnectionsRef.current).forEach(pc => {
              const sender = pc.getSenders().find(s => s.track?.kind === 'video');
              if (sender) {
                sender.replaceTrack(originalVideoTrackRef.current!);
              }
            });
          }
          setIsScreenSharing(false);
          originalVideoTrackRef.current = null;
        };
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    }
  }, [isScreenSharing]);

  const getConfiguration = (): RTCConfiguration => ({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      // Env-var based fallback if needed
      ...(import.meta.env.VITE_TURN_URL ? [{
        urls: import.meta.env.VITE_TURN_URL,
        username: import.meta.env.VITE_TURN_USERNAME,
        credential: import.meta.env.VITE_TURN_CREDENTIAL
      }] : []),
      // Dynamically fetched Metered TURN servers
      ...iceServersRef.current
    ],
    iceTransportPolicy: 'all'
  });

  const createPeerConnection = (peerId: string, peerName: string) => {
    if (peerConnectionsRef.current[peerId]) {
      return peerConnectionsRef.current[peerId];
    }
    
    const pc = new RTCPeerConnection(getConfiguration());
    
    // Add local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        console.log(`[WebRTC] Adding local track: ${track.kind} to peer ${peerId}`);
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        if (!iceCandidatesQueueRef.current[peerId]) {
          iceCandidatesQueueRef.current[peerId] = [];
        }
        iceCandidatesQueueRef.current[peerId].push(event.candidate);

        if (!iceCandidateTimerRef.current[peerId]) {
          iceCandidateTimerRef.current[peerId] = setTimeout(() => {
            channelRef.current?.send({
              type: 'broadcast',
              event: 'ice-candidates-batch',
              payload: {
                to: peerId,
                from: myPeerId.current,
                candidates: iceCandidatesQueueRef.current[peerId]
              }
            });
            iceCandidatesQueueRef.current[peerId] = [];
            iceCandidateTimerRef.current[peerId] = null;
          }, 250); // Batch for 250ms
        }
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
      if (pc.connectionState === 'failed') {
        // Attempt ICE restart before giving up
        console.log(`[WebRTC] Connection failed for ${peerId}, attempting ICE restart...`);
        pc.restartIce();
        pc.createOffer({ iceRestart: true }).then(offer => {
          return pc.setLocalDescription(offer);
        }).then(() => {
          channelRef.current?.send({
            type: 'broadcast',
            event: 'offer',
            payload: {
              to: peerId,
              from: myPeerId.current,
              userName: userName,
              offer: pc.localDescription
            }
          });
        }).catch(err => {
          console.error(`[WebRTC] ICE restart failed for ${peerId}:`, err);
          // Only clean up after restart also fails
          setRemoteStreams(prev => {
            const next = { ...prev };
            delete next[peerId];
            return next;
          });
          delete peerConnectionsRef.current[peerId];
        });
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
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
      // Don't clean up on 'disconnected' — wait for connectionState handler to attempt restart
      if (pc.iceConnectionState === 'closed') {
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
    if (isJoined || channelRef.current) return;
    
    // Proactively clean up any stale global channels for this room before creating a new one
    supabase.getChannels().forEach(ch => {
      if (ch.topic === `realtime:room:${roomCode}`) {
        supabase.removeChannel(ch);
      }
    });

    try {
      const turnRes = await fetch("/api/turn");
      if (turnRes.ok) {
        const iceData = await turnRes.json();
        if (Array.isArray(iceData)) {
          iceServersRef.current = iceData;
        }
      }
    } catch (err) {
      console.error("Failed to fetch dynamic TURN credentials:", err);
    }

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
        
        if (pc.signalingState !== 'stable') {
          console.log(`[WebRTC] Ignoring offer from ${from} because signaling state is ${pc.signalingState}`);
          return;
        }

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
          if (pc.signalingState !== 'have-local-offer') {
            console.log(`[WebRTC] Ignoring answer from ${from} because signaling state is ${pc.signalingState}`);
            return;
          }
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
      .on('broadcast', { event: 'ice-candidates-batch' }, async ({ payload }) => {
        const { to, from, candidates } = payload;
        if (to !== myPeerId.current) return;
        
        const pc = peerConnectionsRef.current[from];
        for (const candidate of candidates) {
          if (pc && pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
          } else {
            if (!candidateBufferRef.current[from]) candidateBufferRef.current[from] = [];
            candidateBufferRef.current[from].push(candidate);
          }
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
      .on('broadcast', { event: 'end-meeting' }, () => {
        if (onMeetingEnded) {
          onMeetingEnded();
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
      channelRef.current = null;
    }
    
    Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
    peerConnectionsRef.current = {};
    setRemoteStreams({});
    setIsJoined(false);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      if (originalVideoTrackRef.current) {
        originalVideoTrackRef.current.stop();
        originalVideoTrackRef.current = null;
      }
      localStreamRef.current = null;
      setLocalStream(null);
      setIsMicMuted(false);
      setIsCamOff(false);
      setIsScreenSharing(false);
    }
  }, []);

  const endMeeting = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'end-meeting',
        payload: { from: myPeerId.current }
      });
    }
    leaveRoom();
  }, [leaveRoom]);

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
    isScreenSharing,
    streamError,
    facingMode,
    initLocalStream,
    joinRoom,
    leaveRoom,
    endMeeting,
    toggleMic,
    toggleCam,
    toggleScreenShare,
    flipCamera
  };
}
