import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowLeft, Mic, MicOff, Video, VideoOff, PhoneOff, Users, Copy, Check, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-store";
import { useWebRTC } from "@/hooks/useWebRTC";

export const Route = createFileRoute("/rooms/$roomCode")({
  component: RoomView,
});

function VideoPlayer({ stream, muted = false, userName }: { stream: MediaStream; muted?: boolean; userName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative w-full h-full bg-surface-container-high rounded-xl overflow-hidden shadow-sm flex items-center justify-center border border-outline-variant/30">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full h-full object-cover"
      />
      {userName && (
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium z-10 flex items-center gap-2">
          {userName}
        </div>
      )}
    </div>
  );
}

function RoomView() {
  const { roomCode } = Route.useParams();
  const navigate = useNavigate();
  const { session, isLoading: authLoading } = useAuth();
  const [dbLoading, setDbLoading] = useState(true);
  const [error, setError] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [hasEnteredGuestInfo, setHasEnteredGuestInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [roomData, setRoomData] = useState<any>(null);
  
  const [guestStatus, setGuestStatus] = useState<'prejoin' | 'waiting' | 'admitted' | 'rejected'>('prejoin');
  const [waitingParticipants, setWaitingParticipants] = useState<any[]>([]);

  const isHost = session?.id && roomData?.host_id === session.id;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/rooms/${roomCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const userName = session?.name || guestEmail.split('@')[0] || "Guest";

  const {
    localStream,
    remoteStreams,
    isJoined,
    isMicMuted,
    isCamOff,
    streamError,
    initLocalStream,
    joinRoom,
    leaveRoom,
    toggleMic,
    toggleCam
  } = useWebRTC(roomCode, userName);

  useEffect(() => {
    async function checkRoom() {
      if (authLoading) return;
      if (!session && !hasEnteredGuestInfo) {
        setDbLoading(false);
        return;
      }

      setDbLoading(true);
      const { data, error: dbError } = await supabase
        .from("instant_rooms")
        .select("*")
        .eq("room_code", roomCode)
        .eq("is_active", true)
        .single();

      if (dbError || !data) {
        setError("Room not found or has ended.");
      } else {
        setRoomData(data);
        if (session?.id && data.host_id === session.id) {
          // Host automatically bypasses waiting room
          setGuestStatus('admitted');
          if (!isJoined) initLocalStream();
        } else if (!isJoined && guestStatus === 'prejoin') {
          // Initialize camera on the pre-join screen for guests
          initLocalStream();
        }
      }
      
      setDbLoading(false);
    }
    checkRoom();
  }, [roomCode, session, authLoading, hasEnteredGuestInfo, initLocalStream, isJoined, guestStatus]);

  // Realtime subscription for guest to know when they are admitted
  useEffect(() => {
    if (isHost || guestStatus !== 'waiting') return;
    
    const channel = supabase.channel(`guest-wait-${roomCode}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'room_participants',
        filter: `room_code=eq.${roomCode}`
      }, (payload) => {
        if (payload.new.user_name === userName) {
          if (payload.new.status === 'admitted') {
            setGuestStatus('admitted');
            joinRoom();
          } else if (payload.new.status === 'rejected') {
            setGuestStatus('rejected');
            setError("The host has declined your request to join.");
          }
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); }
  }, [isHost, guestStatus, roomCode, userName, joinRoom]);

  // Realtime subscription for host to see waiting participants
  useEffect(() => {
    if (!isHost) return;

    // Fetch initial
    supabase.from('room_participants')
      .select('*')
      .eq('room_code', roomCode)
      .eq('status', 'waiting')
      .then(({data}) => {
        if (data) setWaitingParticipants(data);
      });

    const channel = supabase.channel(`host-wait-${roomCode}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'room_participants',
        filter: `room_code=eq.${roomCode}`
      }, (payload) => {
        if (payload.eventType === 'INSERT' && payload.new.status === 'waiting') {
          setWaitingParticipants(prev => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setWaitingParticipants(prev => prev.filter(p => p.id !== payload.new.id));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); }
  }, [isHost, roomCode]);

  const handleJoinClick = async () => {
    if (isHost) {
      joinRoom();
      return;
    }
    setGuestStatus('waiting');
    await supabase.from('room_participants').insert({
      room_code: roomCode,
      user_id: session?.id || null,
      user_name: userName,
      status: 'waiting'
    });
  };

  const handleAdmit = async (participantId: string, status: 'admitted' | 'rejected') => {
    await supabase.from('room_participants')
      .update({ status })
      .eq('id', participantId);
  };

  if (authLoading || dbLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background z-10 p-6 text-center">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
          <ArrowLeft className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Oops!</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => navigate({ to: "/rooms" })}>Return Home</Button>
      </div>
    );
  }

  // Guest Entry
  if (!session && !hasEnteredGuestInfo) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-border shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Join Room {roomCode}</h2>
            <p className="text-muted-foreground">Please enter your email to join this session.</p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (guestEmail.trim()) {
                setHasEnteredGuestInfo(true);
              }
            }}
            className="space-y-4"
          >
            <div>
              <input
                required
                type="email"
                placeholder="Email address"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
              />
            </div>
            <Button type="submit" className="w-full py-6 text-base font-semibold">
              Continue
            </Button>
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Already have an account? <Button variant="link" className="p-0" onClick={() => navigate({ to: "/login" })}>Log in</Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Pre-join Screen / Waiting Room Screen
  if (!isJoined) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl">
            {localStream ? (
              <video
                ref={(ref) => { if (ref) ref.srcObject = localStream; }}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p>Starting camera...</p>
              </div>
            )}
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMic}
                className={`rounded-full w-12 h-12 border-0 ${isMicMuted ? 'bg-destructive hover:bg-destructive/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleCam}
                className={`rounded-full w-12 h-12 border-0 ${isCamOff ? 'bg-destructive hover:bg-destructive/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-2">Ready to join?</h1>
            <p className="text-muted-foreground mb-8">Room Code: <span className="font-mono text-foreground">{roomCode}</span></p>
            
            {streamError && (
              <div className="w-full p-4 mb-6 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20 text-left">
                {streamError}
              </div>
            )}

            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="w-full py-6 text-lg font-semibold rounded-xl mb-4 border-2"
            >
              {copied ? <Check className="w-5 h-5 mr-2 text-green-500" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? "Copied Link!" : "Copy Invite Link"}
            </Button>

            {guestStatus === 'waiting' ? (
              <div className="w-full flex flex-col items-center p-6 bg-surface-container-low rounded-2xl border border-outline-variant mt-4">
                <Loader2 className="w-10 h-10 animate-spin text-brand mb-4" />
                <h2 className="text-xl font-bold mb-2">Waiting for the host...</h2>
                <p className="text-sm text-muted-foreground">You will join automatically once admitted.</p>
              </div>
            ) : (
              <Button 
                onClick={handleJoinClick}
                disabled={!localStream}
                className="w-full py-6 text-lg font-bold rounded-xl bg-brand hover:bg-brand/90 text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:scale-[1.02]"
              >
                {isHost ? "Join Now" : "Ask to Join"}
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              onClick={() => navigate({ to: "/rooms" })}
              className="mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Active Room UI
  const totalParticipants = remoteStreams.length + 1;
  const gridCols = totalParticipants === 1 ? "grid-cols-1" :
                   totalParticipants === 2 ? "grid-cols-1 md:grid-cols-2" :
                   totalParticipants <= 4 ? "grid-cols-2" :
                   "grid-cols-2 md:grid-cols-3";

  return (
    <div className="h-screen flex flex-col bg-[#0F1115] text-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-brand/20 text-brand p-2 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-[15px] leading-tight">Instant Room</h2>
            <p className="text-xs text-white/50 font-mono">Code: {roomCode}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white h-9"
          >
            {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied" : "Copy Link"}
          </Button>
          <span className="text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            {totalParticipants} Participant{totalParticipants !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      {/* Main Video Grid */}
      <main className="flex-1 overflow-hidden flex">
        <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
          <div className={`w-full h-full max-w-7xl mx-auto grid gap-4 ${gridCols} auto-rows-fr`}>
          {/* Local User */}
          <div className="relative w-full h-full min-h-[200px]">
             {localStream && <VideoPlayer stream={localStream} muted userName={`${userName} (You)`} />}
          </div>
          
          {/* Remote Users */}
          {remoteStreams.map((remote) => (
            <div key={remote.peerId} className="relative w-full h-full min-h-[200px]">
               <VideoPlayer stream={remote.stream} userName={remote.userName} />
            </div>
          ))}
        </div>
        </div>
        
        {/* Host Waiting Room Sidebar */}
        {isHost && waitingParticipants.length > 0 && (
          <div className="w-80 bg-black/40 border-l border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 font-semibold flex items-center justify-between">
              <span>Waiting Room ({waitingParticipants.length})</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {waitingParticipants.map(p => (
                <div key={p.id} className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-3">
                  <span className="font-medium">{p.user_name}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-white/5 border-white/10 hover:bg-white/10" onClick={() => handleAdmit(p.id, 'rejected')}>Deny</Button>
                    <Button size="sm" className="flex-1 bg-brand hover:bg-brand/90 text-brand-foreground" onClick={() => handleAdmit(p.id, 'admitted')}>Admit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Controls */}
      <footer className="h-24 flex items-center justify-center gap-4 border-t border-white/10 bg-black/20 backdrop-blur-md px-6">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMic}
          className={`rounded-full w-14 h-14 border-0 transition-all ${isMicMuted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        >
          {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleCam}
          className={`rounded-full w-14 h-14 border-0 transition-all ${isCamOff ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        >
          {isCamOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </Button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <Button
          variant="destructive"
          onClick={() => {
            leaveRoom();
            navigate({ to: "/rooms" });
          }}
          className="rounded-full h-14 px-8 font-semibold text-[15px] shadow-lg shadow-red-500/20"
        >
          <PhoneOff className="w-5 h-5 mr-2" />
          Leave
        </Button>
      </footer>
    </div>
  );
}
