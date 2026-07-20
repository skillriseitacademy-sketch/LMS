import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Video, Keyboard, Plus, Users, Calendar, Clock, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/_app/rooms/")({
  head: () => ({ meta: [{ title: "Rooms — PlacePro LMS" }] }),
  component: RoomsHub,
});

function RoomsHub() {
  const [code, setCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();
  const [scheduledDate, setScheduledDate] = useState("");
  const [upcomingRooms, setUpcomingRooms] = useState<any[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    if (session?.id) {
      supabase
        .from("instant_rooms")
        .select("*")
        .eq("host_id", session.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) {
             const activeRooms = data.filter(room => {
                const roomAgeHours = (new Date().getTime() - new Date(room.created_at).getTime()) / (1000 * 60 * 60);
                return roomAgeHours <= 24;
             });
             setUpcomingRooms(activeRooms);
          }
        });
    }
  }, [session?.id]);

  const handleEndRoom = async (roomId: string) => {
    // Optimistic update
    setUpcomingRooms(prev => prev.filter(r => r.id !== roomId));
    
    // DB update
    await supabase.from("instant_rooms").update({ is_active: false }).eq("id", roomId);
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setIsJoining(true);
    navigate({ to: "/rooms/$roomCode", params: { roomCode: code.toUpperCase() } });
  };

  const handleStart = async () => {
    setIsStarting(true);
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase
      .from("instant_rooms")
      .insert({
        host_id: session?.id,
        room_url: `https://meet.jit.si/PlacePro-Room-${newCode}`,
        room_name: `room-${newCode}`,
        room_code: newCode,
      })
      .select()
      .single();

    if (data) {
      navigate({ to: "/rooms/$roomCode", params: { roomCode: data.room_code } });
    } else {
      setIsStarting(false);
      alert("Failed to create room: " + error?.message);
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledDate) return;
    setIsScheduling(true);
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase
      .from("instant_rooms")
      .insert({
        host_id: session?.id,
        room_url: `https://meet.jit.si/PlacePro-Room-${newCode}`,
        room_name: `Scheduled-${newCode}`,
        room_code: newCode,
        scheduled_for: new Date(scheduledDate).toISOString(),
      })
      .select()
      .single();

    setIsScheduling(false);
    if (data) {
      alert(`Meeting scheduled successfully! Code: ${data.room_code}`);
      setUpcomingRooms(prev => [...prev, data].sort((a, b) => new Date(a.scheduled_for).getTime() - new Date(b.scheduled_for).getTime()));
      setScheduledDate("");
    } else {
      alert("Failed to schedule room: " + error?.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--pp-surface)] pb-24 md:pb-0">
      <TopBar />
      <div className="flex-1 w-full max-w-[1280px] mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="text-center mt-4 md:mt-12 mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--pp-primary)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex justify-center mb-6 relative z-10">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-md"
              style={{ 
                backgroundColor: "var(--pp-primary-container)", 
                color: "var(--pp-on-primary-container)",
                borderColor: "var(--pp-primary)"
              }}
            >
              <Users className="w-8 h-8" />
            </div>
          </div>
          <h1 
            className="text-[40px] md:text-[56px] font-bold mb-4 leading-tight relative z-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--pp-on-surface)", letterSpacing: "-0.02em" }}
          >
            Instant Video Rooms
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto relative z-10" style={{ color: "var(--pp-on-surface-variant)" }}>
            Start a quick study session or join a peer's room to practice interviews, collaborate on code, and study together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full relative z-10">
          {/* Create Room Card */}
          <div 
            className="rounded-[24px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group border"
            style={{ 
              backgroundColor: "var(--pp-surface-container-lowest)",
              borderColor: "var(--pp-outline-variant)",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--pp-primary) 50%, transparent)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px -8px color-mix(in srgb, var(--pp-primary) 20%, transparent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--pp-outline-variant)";
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)";
            }}
          >
            <div 
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-16 -mt-16 opacity-10 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: "var(--pp-primary)" }}
            />
            
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110"
              style={{ backgroundColor: "color-mix(in srgb, var(--pp-primary) 10%, transparent)", color: "var(--pp-primary)" }}
            >
              <Video className="w-8 h-8" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col mb-8">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--pp-on-surface)" }}>
                New meeting
              </h3>
              <p className="text-sm flex-1" style={{ color: "var(--pp-on-surface-variant)" }}>
                Get a link you can share with anyone to start collaborating immediately.
              </p>
            </div>
            
            <button 
              onClick={handleStart} 
              disabled={isStarting}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all shadow-sm relative z-10"
              style={{ 
                backgroundColor: "var(--pp-primary)", 
                color: "var(--pp-on-primary)",
                opacity: isStarting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isStarting) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pp-primary-fixed-dim)";
              }}
              onMouseLeave={(e) => {
                if (!isStarting) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pp-primary)";
              }}
            >
              <Plus className="w-5 h-5" />
              {isStarting ? "Creating..." : "Start an instant room"}
            </button>
          </div>

          {/* Join Room Card */}
          <div 
            className="rounded-[24px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group border"
            style={{ 
              backgroundColor: "var(--pp-surface-container-lowest)",
              borderColor: "var(--pp-outline-variant)",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--pp-secondary) 50%, transparent)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px -8px color-mix(in srgb, var(--pp-secondary) 20%, transparent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--pp-outline-variant)";
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)";
            }}
          >
            <div 
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-16 -mt-16 opacity-10 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: "var(--pp-secondary)" }}
            />
            
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110"
              style={{ backgroundColor: "color-mix(in srgb, var(--pp-secondary) 10%, transparent)", color: "var(--pp-secondary)" }}
            >
              <Keyboard className="w-8 h-8" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col mb-8">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--pp-on-surface)" }}>
                Join with code
              </h3>
              <p className="text-sm flex-1" style={{ color: "var(--pp-on-surface-variant)" }}>
                Enter the 6-character room code provided by the meeting host.
              </p>
            </div>
            
            <form onSubmit={handleJoin} className="w-full flex flex-col gap-3 relative z-10">
              <input 
                placeholder="e.g. A1B2C3" 
                value={code} 
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full rounded-xl px-4 py-3 text-center uppercase tracking-[0.2em] font-mono font-bold outline-none transition-all border"
                style={{
                  backgroundColor: "var(--pp-surface-container-low)",
                  borderColor: "var(--pp-outline-variant)",
                  color: "var(--pp-on-surface)"
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "var(--pp-secondary)";
                  (e.currentTarget as HTMLInputElement).style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--pp-secondary) 15%, transparent)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "var(--pp-outline-variant)";
                  (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                }}
                maxLength={6}
              />
              <button 
                type="submit" 
                disabled={isJoining || code.length < 3}
                className="w-full py-3.5 rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
                style={{ 
                  backgroundColor: "var(--pp-secondary)", 
                  color: "var(--pp-on-secondary)"
                }}
              >
                {isJoining ? "Joining..." : "Join Room"}
              </button>
            </form>
          </div>

          {/* Schedule Room Card */}
          <div 
            className="rounded-[24px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden group border"
            style={{ 
              backgroundColor: "var(--pp-surface-container-lowest)",
              borderColor: "var(--pp-outline-variant)",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--pp-tertiary) 50%, transparent)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px -8px color-mix(in srgb, var(--pp-tertiary) 20%, transparent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--pp-outline-variant)";
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)";
            }}
          >
            <div 
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -mr-16 -mt-16 opacity-10 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: "var(--pp-tertiary)" }}
            />
            
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110"
              style={{ backgroundColor: "color-mix(in srgb, var(--pp-tertiary) 10%, transparent)", color: "var(--pp-tertiary)" }}
            >
              <Calendar className="w-8 h-8" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col mb-8">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--pp-on-surface)" }}>
                Schedule
              </h3>
              <p className="text-sm flex-1" style={{ color: "var(--pp-on-surface-variant)" }}>
                Plan a meeting for later and invite others.
              </p>
            </div>
            
            <form onSubmit={handleSchedule} className="w-full flex flex-col gap-3 relative z-10">
              <input 
                type="datetime-local"
                required
                value={scheduledDate} 
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-center font-bold outline-none transition-all border"
                style={{
                  backgroundColor: "var(--pp-surface-container-low)",
                  borderColor: "var(--pp-outline-variant)",
                  color: "var(--pp-on-surface)"
                }}
              />
              <button 
                type="submit" 
                disabled={isScheduling || !scheduledDate}
                className="w-full py-3.5 rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
                style={{ 
                  backgroundColor: "var(--pp-tertiary)", 
                  color: "var(--pp-on-tertiary)"
                }}
              >
                {isScheduling ? "Scheduling..." : "Schedule Meeting"}
              </button>
            </form>
          </div>
        </div>

        {/* Upcoming Meetings List */}
        {upcomingRooms.length > 0 && (
          <div className="max-w-6xl mx-auto w-full mt-12 relative z-10">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Your Active Rooms</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingRooms.map(room => (
                <div key={room.id} className="p-6 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: "var(--pp-surface-container-lowest)", borderColor: "var(--pp-outline-variant)" }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[var(--pp-primary)]" />
                      <span className="font-semibold text-sm">
                        {room.scheduled_for 
                          ? new Date(room.scheduled_for).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                          : "Instant Room"
                        }
                      </span>
                    </div>
                    <p className="font-mono text-sm text-[var(--pp-on-surface-variant)]">Code: {room.room_code}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEndRoom(room.id)}
                      className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                      title="End Room"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => navigate({ to: "/rooms/$roomCode", params: { roomCode: room.room_code } })}
                      className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors hover:bg-[var(--pp-primary-container)] text-[var(--pp-primary)]"
                    >
                      Enter Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
