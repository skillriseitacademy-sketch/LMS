import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Video, Keyboard, Plus } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/_app/rooms")({
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
    // In a real setup with the backend, we would hit /api/rooms/join/code
    // Since backend is disabled, we will just directly check the DB if possible,
    // or navigate and let the room component handle it.
    navigate({ to: "/rooms/$roomCode", params: { roomCode: code.toUpperCase() } });
  };

  const handleStart = async () => {
    setIsStarting(true);
    // Directly insert into Supabase since API route isn't available
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase
      .from("instant_rooms")
      .insert({
        host_id: session?.id,
        room_url: `https://placepro-mock.daily.co/${newCode}`,
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
    <div className="max-w-4xl mx-auto space-y-8 mt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Instant Video Rooms</h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Start a quick study session or join a peer's room to practice interviews and collaborate.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
        <Card className="p-8 flex flex-col items-center justify-center text-center space-y-6 bg-card hover:border-brand/50 transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
            <Video className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">New meeting</h3>
            <p className="text-muted-foreground text-sm">
              Get a link you can share with anyone to start collaborating immediately.
            </p>
          </div>
          <Button onClick={handleStart} disabled={isStarting} size="lg" className="w-full gap-2">
            <Plus className="w-5 h-5" />
            {isStarting ? "Creating..." : "Start an instant room"}
          </Button>
        </Card>

        <Card className="p-8 flex flex-col items-center justify-center text-center space-y-6 bg-card hover:border-primary/50 transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Keyboard className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Join with code</h3>
            <p className="text-muted-foreground text-sm">
              Enter the 6-character room code provided by the meeting host.
            </p>
          </div>
          <form onSubmit={handleJoin} className="w-full flex gap-2">
            <Input 
              placeholder="e.g. A1B2C3" 
              value={code} 
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="text-center uppercase tracking-widest font-mono font-bold"
              maxLength={6}
            />
            <Button type="submit" disabled={isJoining || code.length < 3} variant="secondary">
              Join
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
