import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";
import { Card } from "@/components/ui/card";
import { Swords, Code2, Shield, Loader2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/arena")({
  component: ArenaHub,
});

function ArenaHub() {
  const { session } = useAuth();
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      if (!session) return;
      const { data } = await supabase
        .from("student_topics")
        .select("status, topics(id, title, description, arena_mode)")
        .eq("user_id", session.id);

      if (data) {
        setTopics(data.map((d: any) => ({
          ...d.topics,
          enrollment_status: d.status
        })));
      }
      setLoading(false);
    }
    fetchTopics();
  }, [session]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 mt-4">
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <div className="p-4 bg-brand/10 text-brand rounded-2xl">
          <Swords className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Arena</h1>
          <p className="text-muted-foreground mt-1">
            Test your skills in Code Ranker or Capture The Flag arenas for your enrolled topics.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : topics.length === 0 ? (
        <Card className="p-12 text-center border-dashed bg-muted/20">
          <h3 className="text-xl font-semibold mb-2">No arenas available</h3>
          <p className="text-muted-foreground">
            Enroll in a topic to unlock its practice arena.
          </p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const isCTF = topic.arena_mode === "ctf" || topic.arena_mode === "mixed";
            
            return (
              <Card key={topic.id} className="overflow-hidden flex flex-col hover:border-brand/50 transition-colors">
                <div className={`h-2 w-full ${isCTF ? 'bg-destructive' : 'bg-primary'}`} />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${isCTF ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      {isCTF ? <Shield className="w-6 h-6" /> : <Code2 className="w-6 h-6" />}
                    </div>
                    <Badge variant={isCTF ? "destructive" : "default"}>
                      {isCTF ? "CTF Mode" : "Code Ranker"}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{topic.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                    {topic.description || "Practice challenges and improve your rank."}
                  </p>
                  
                  <Button asChild className="w-full gap-2">
                    <Link to={`/arena/${topic.id}`}>
                      <Play className="w-4 h-4 fill-current" />
                      Enter Arena
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
