import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DailyIframe from "@daily-co/daily-js";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/rooms/$roomCode")({
  component: RoomView,
});

function RoomView() {
  const { roomCode } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let callObject: any = null;

    async function initRoom() {
      // Fetch room details from DB directly (bypassing API route since backend is off)
      const { data, error: dbError } = await supabase
        .from("instant_rooms")
        .select("*")
        .eq("room_code", roomCode)
        .eq("is_active", true)
        .single();

      if (dbError || !data) {
        setError("Room not found or has ended.");
        setLoading(false);
        return;
      }

      const container = document.getElementById("daily-container");
      if (!container) return;

      callObject = DailyIframe.createFrame(container, {
        iframeStyle: {
          width: "100%",
          height: "100%",
          border: "0",
          borderRadius: "0.75rem",
        },
        showLeaveButton: true,
      });

      await callObject.join({ url: data.room_url });
      
      callObject.on("left-meeting", () => {
        navigate({ to: "/rooms" });
      });

      setLoading(false);
    }

    initRoom();

    return () => {
      if (callObject) {
        callObject.leave().then(() => callObject.destroy());
      }
    };
  }, [roomCode, navigate]);

  return (
    <div className="h-[calc(100vh-6rem)] max-h-[800px] flex flex-col pt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/rooms" })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-xl font-bold">Instant Room</h2>
            <p className="text-sm text-muted-foreground font-mono">Code: {roomCode}</p>
          </div>
        </div>
      </div>

      <Card className="flex-1 relative overflow-hidden bg-card border-border shadow-lg">
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 className="w-8 h-8 animate-spin text-brand mb-4" />
            <p className="text-muted-foreground">Joining room...</p>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 p-6 text-center">
            <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
              <ArrowLeft className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Oops!</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => navigate({ to: "/rooms" })}>
              Return to Rooms
            </Button>
          </div>
        )}

        <div id="daily-container" className="w-full h-full bg-black/5" />
      </Card>
    </div>
  );
}
