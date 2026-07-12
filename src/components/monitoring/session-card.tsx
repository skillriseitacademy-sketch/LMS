import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, AlertTriangle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface ProctorFlag {
  id: string;
  flag_type: string;
  description: string;
  created_at: string;
}

interface SessionCardProps {
  session: {
    id: string;
    started_at: string;
    user: {
      name: string;
      avatar_url: string | null;
    };
    topic: {
      title: string;
    };
  };
  flags: ProctorFlag[];
}

export function SessionCard({ session, flags }: SessionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    if (!session.started_at) return;
    const interval = setInterval(() => {
      setElapsed(formatDistanceToNow(new Date(session.started_at)));
    }, 1000);
    setElapsed(formatDistanceToNow(new Date(session.started_at)));
    return () => clearInterval(interval);
  }, [session.started_at]);

  const recentFlag = flags[0];

  return (
    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={session.user.avatar_url || ""} />
            <AvatarFallback>{session.user.name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm">{session.user.name || "Unknown User"}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{session.topic.title}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {elapsed}
              </span>
            </div>
          </div>
        </div>
        
        {flags.length > 0 ? (
          <Badge variant="destructive" className="animate-pulse">
            {flags.length} Flags
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            Clear
          </Badge>
        )}
      </div>

      {flags.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
          <div className="flex items-center justify-between text-xs p-2 rounded-md bg-destructive/10 text-destructive-foreground">
            <div className="flex items-center gap-2 truncate">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="truncate">{recentFlag?.description}</span>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-destructive/20">
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-2 space-y-2">
            {flags.map((flag) => (
              <div key={flag.id} className="text-xs flex items-start gap-2 p-2 rounded-md bg-muted/50">
                <span className="text-muted-foreground whitespace-nowrap">
                  {new Date(flag.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span>{flag.description}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
}
