import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Video, Keyboard, Plus, Users, LayoutDashboard } from "lucide-react";
import { useState } from "react";
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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full relative z-10">
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
            
            <form onSubmit={handleJoin} className="w-full flex gap-3 relative z-10">
              <input 
                placeholder="e.g. A1B2C3" 
                value={code} 
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="flex-1 rounded-xl px-4 py-3 text-center uppercase tracking-[0.2em] font-mono font-bold outline-none transition-all border"
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
                className="px-6 py-3 rounded-xl font-bold transition-all shadow-sm disabled:opacity-50"
                style={{ 
                  backgroundColor: "var(--pp-surface-variant)", 
                  color: "var(--pp-on-surface)",
                  borderColor: "var(--pp-outline-variant)"
                }}
                onMouseEnter={(e) => {
                  if (!isJoining && code.length >= 3) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pp-secondary)";
                    (e.currentTarget as HTMLElement).style.color = "var(--pp-on-secondary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isJoining && code.length >= 3) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pp-surface-variant)";
                    (e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface)";
                  }
                }}
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
