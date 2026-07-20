import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowLeft, Mic, MicOff, Video, VideoOff, PhoneOff, Users, Copy, Check, UserPlus, X, Home, Calendar, Bell, Settings, LogOut, MessageSquare, LayoutGrid, Menu, MonitorUp, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-store";
import { useWebRTC } from "@/hooks/useWebRTC";

export const Route = createFileRoute("/rooms/$roomCode")({
  component: RoomView,
});

function VideoPlayer({ stream, muted = false, userName, isLocal = false }: { stream: MediaStream; muted?: boolean; userName?: string, isLocal?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check if track is muted/disabled
  const audioTrack = stream.getAudioTracks()[0];
  const isAudioMuted = audioTrack ? !audioTrack.enabled : true;

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error("Video play error:", e));
    }
  }, [stream]);

  return (
    <div className={`relative w-full h-full bg-[#1A1D24] rounded-3xl overflow-hidden flex items-center justify-center border-4 ${isLocal ? 'border-brand' : 'border-transparent'}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full h-full object-cover"
      />
      {isAudioMuted && !isLocal && (
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-xl text-white z-10 flex items-center justify-center">
          <MicOff className="w-4 h-4 opacity-70" />
        </div>
      )}
      {userName && (
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-sm font-medium z-10 flex items-center gap-2">
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
  const [showSidebar, setShowSidebar] = useState(false);

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
        const roomAgeHours = (new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60 * 60);
        if (roomAgeHours > 24) {
          setError("This room has expired. Instant rooms are only active for 24 hours.");
          setDbLoading(false);
          return;
        }

        setRoomData(data);
        if (session?.id && data.host_id === session.id) {
          // Host automatically bypasses waiting room
          setGuestStatus('admitted');
          if (!isJoined) initLocalStream();
        } else if (!isJoined && guestStatus === 'prejoin') {
          // Check if guest is already in the database
          const { data: participantData } = await supabase
            .from('room_participants')
            .select('status')
            .eq('room_code', roomCode)
            .eq('user_name', userName)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (participantData?.status === 'admitted') {
            setGuestStatus('admitted');
          } else if (participantData?.status === 'waiting') {
            setGuestStatus('waiting');
          }
          
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
            sessionStorage.setItem(`auto_join_${roomCode}`, 'true');
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

  // Auto-join on refresh if previously joined
  useEffect(() => {
    if (localStream && !isJoined && sessionStorage.getItem(`auto_join_${roomCode}`) === 'true') {
      joinRoom();
      if (!isHost) setGuestStatus('admitted');
    }
  }, [localStream, isJoined, roomCode, isHost, joinRoom]);

  // Realtime subscription for host to see waiting participants
  useEffect(() => {
    if (!isHost) return;

    // Fetch initial
    supabase.from('room_participants')
      .select('*')
      .eq('room_code', roomCode)
      .eq('status', 'waiting')
      .then(({data}) => {
        if (data && data.length > 0) {
          setWaitingParticipants(data);
          setShowSidebar(true);
        }
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
          setShowSidebar(true);
        } else if (payload.eventType === 'UPDATE') {
          if (payload.new.status === 'waiting') {
             setWaitingParticipants(prev => {
                if (!prev.find(p => p.id === payload.new.id)) {
                   setShowSidebar(true);
                   return [...prev, payload.new];
                }
                return prev;
             });
          } else {
             setWaitingParticipants(prev => prev.filter(p => p.id !== payload.new.id));
          }
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); }
  }, [isHost, roomCode]);

  const handleJoinClick = async () => {
    if (isHost || guestStatus === 'admitted') {
      sessionStorage.setItem(`auto_join_${roomCode}`, 'true');
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
                {isHost || guestStatus === 'admitted' ? "Join Now" : "Ask to Join"}
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
                   totalParticipants <= 4 ? "grid-cols-1 md:grid-cols-2" :
                   "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className="h-screen flex bg-[#0F1115] text-white overflow-hidden p-3 gap-3">
      {/* Left Sidebar Navigation (Hidden on Mobile) */}
      <aside className="hidden md:flex w-[60px] flex-col items-center py-6 bg-[#1A1D24] rounded-[24px] border border-white/5 shadow-2xl justify-between">
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-brand-foreground shadow-lg shadow-brand/20 mb-4 cursor-pointer hover:scale-105 transition-transform">
            <MonitorUp className="w-5 h-5" />
          </div>
          <button className="text-white/50 hover:text-white transition-colors p-2"><Home className="w-5 h-5" /></button>
          <button className="text-brand bg-brand/10 p-2 rounded-xl"><Video className="w-5 h-5" /></button>
          <button className="text-white/50 hover:text-white transition-colors p-2"><Users className="w-5 h-5" /></button>
          <button className="text-white/50 hover:text-white transition-colors p-2"><Calendar className="w-5 h-5" /></button>
          <button className="text-white/50 hover:text-white transition-colors p-2"><Bell className="w-5 h-5" /></button>
          <button className="text-white/50 hover:text-white transition-colors p-2"><Settings className="w-5 h-5" /></button>
        </div>
        <button 
          className="text-white/50 hover:text-white transition-colors p-2 mt-auto"
          onClick={() => navigate({ to: "/rooms" })}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </aside>

      {/* Center Main Area */}
      <main className="flex-1 flex flex-col relative min-w-0 bg-[#0F1115]">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-2 md:px-4 shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-white hover:text-brand transition-colors">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h2 className="text-lg md:text-xl font-bold tracking-tight truncate max-w-[120px] md:max-w-none">Design meeting</h2>
            <div className="hidden sm:flex bg-brand/20 text-brand px-3 py-1 rounded-full text-xs font-semibold items-center gap-1.5 ml-2">
              <Users className="w-3.5 h-3.5" /> Group
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-3">
              <button className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black">
                <div className="w-3.5 h-3.5 rounded-sm bg-black" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-transparent border-2 border-white/20 flex flex-wrap items-center justify-center gap-0.5 p-1.5">
                <div className="w-2 h-2 rounded-[2px] border border-white/50" />
                <div className="w-2 h-2 rounded-[2px] border border-white/50" />
                <div className="w-2 h-2 rounded-[2px] border border-white/50" />
                <div className="w-2 h-2 rounded-[2px] border border-white/50" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-transparent text-brand flex items-center justify-center">
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={() => setShowSidebar(!showSidebar)}
                className={`flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${showSidebar ? 'bg-brand/20 text-brand border-brand/30' : 'bg-transparent border-white/20 hover:bg-white/5 text-white/90'}`}
              >
                <Users className="w-4 h-4" /> {totalParticipants}
              </button>
              <button className="hidden sm:flex text-brand text-sm font-medium hover:text-brand/80 transition-colors items-center gap-1.5" onClick={handleCopyLink}>
                {copied ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {copied ? "Copied" : "Invite"}
              </button>
            </div>
            <div className="flex items-center gap-2 bg-transparent border border-white/20 rounded-full px-3 py-1.5 text-sm font-medium font-mono shrink-0">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              12:34
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <div className="flex-1 p-2 pt-0 pb-[100px]">
          <div className={`w-full h-full grid gap-4 ${gridCols} auto-rows-fr`}>
            {/* Local User */}
            <div className="relative w-full h-full min-h-[200px]">
              {localStream && <VideoPlayer stream={localStream} muted userName="You" isLocal={true} />}
            </div>
            
            {/* Remote Users */}
            {remoteStreams.map((remote) => (
              <div key={remote.peerId} className="relative w-full h-full min-h-[200px]">
                <VideoPlayer stream={remote.stream} userName={remote.userName} />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Bottom Controls */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center md:justify-between w-full px-4 md:px-6 max-w-4xl z-20 pointer-events-none">
          <button className="hidden md:flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium pointer-events-auto">
            <Menu className="w-5 h-5 text-brand" /> Tools
          </button>
          
          <div className="flex items-center gap-2 md:gap-3 bg-transparent pointer-events-auto">
            <button
              onClick={toggleMic}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isMicMuted ? 'bg-[#2A2E38] text-white/50' : 'bg-[#2A2E38] hover:bg-[#323642] text-white'}`}
            >
              {isMicMuted ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
            
            <button
              className="w-[60px] h-12 md:w-[72px] md:h-14 rounded-xl md:rounded-[20px] bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg shadow-red-500/20"
              onClick={async () => {
                sessionStorage.removeItem(`auto_join_${roomCode}`);
                leaveRoom();
                if (isHost) {
                  await supabase.from('instant_rooms').update({ is_active: false }).eq('room_code', roomCode);
                }
                navigate({ to: "/rooms" });
              }}
            >
              <PhoneOff className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            
            <button
              onClick={toggleCam}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isCamOff ? 'bg-[#2A2E38] text-white/50' : 'bg-[#2A2E38] hover:bg-[#323642] text-white'}`}
            >
              {isCamOff ? <VideoOff className="w-5 h-5 md:w-6 md:h-6" /> : <Video className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
            
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#2A2E38] hover:bg-[#323642] flex items-center justify-center transition-all">
              <Settings className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
            </button>
          </div>
          
          <div className="hidden md:block w-20" /> {/* Spacer to balance 'Tools' button */}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className={`w-[340px] bg-[#1A1D24] rounded-[24px] border border-white/5 shadow-2xl p-6 flex-col absolute md:relative right-3 top-3 bottom-3 z-30 transition-transform md:translate-x-0 ${showSidebar ? 'flex translate-x-0' : 'hidden md:hidden lg:flex translate-x-[120%]'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-brand" /> Participants
          </h2>
          <button 
            onClick={() => setShowSidebar(false)}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" /> {/* Use X icon if imported, else fallback */}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Waiting Room Section (Host Only) */}
              {isHost && waitingParticipants.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Waiting to Join ({waitingParticipants.length})</h3>
                  <div className="space-y-3">
                    {waitingParticipants.map(p => (
                      <div key={p.id} className="bg-brand/5 rounded-2xl p-4 border border-brand/20 flex flex-col gap-3">
                        <span className="font-medium">{p.user_name}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-white" onClick={() => handleAdmit(p.id, 'rejected')}>Deny</Button>
                          <Button size="sm" className="flex-1 bg-brand hover:bg-brand/90 text-brand-foreground" onClick={() => handleAdmit(p.id, 'admitted')}>Admit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* In Call Section */}
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">In Call ({totalParticipants})</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-medium">
                        {userName[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-sm">{userName} (You)</span>
                    </div>
                    {isHost && <span className="text-xs text-brand bg-brand/10 px-2 py-1 rounded-md">Host</span>}
                  </div>
                  
                  {remoteStreams.map(remote => (
                    <div key={remote.peerId} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 font-medium">
                          {remote.userName[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-sm text-white/90">{remote.userName}</span>
                      </div>
                      <Mic className="w-4 h-4 text-white/30" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </aside>
    </div>
  );
}
