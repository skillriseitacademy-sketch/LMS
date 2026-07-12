import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Trophy, Shield, Code2, ArrowLeft, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/arena/$topicId")({
  component: TopicArena,
});

function TopicArena() {
  const { topicId } = Route.useParams();
  const [topic, setTopic] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch topic
      const { data: topicData } = await supabase
        .from("topics")
        .select("*")
        .eq("id", topicId)
        .single();
      setTopic(topicData);

      // Fetch challenges for this topic
      const { data: challengesData } = await supabase
        .from("code_challenges")
        .select("*")
        .eq("topic_id", topicId)
        .order("points", { ascending: true });
      setChallenges(challengesData || []);

      // Fetch topic leaderboard
      const { data: lbData } = await supabase
        .from("topic_leaderboards")
        .select("user_id, total_points, challenges_solved, profiles!topic_leaderboards_user_id_fkey(name, avatar_url)")
        .eq("topic_id", topicId)
        .order("total_points", { ascending: false })
        .limit(10);
      setLeaderboard(lbData || []);
    }
    fetchData();
  }, [topicId]);

  if (!topic) return null;

  const isCTF = topic.arena_mode === "ctf" || topic.arena_mode === "mixed";

  return (
    <div className="max-w-6xl mx-auto space-y-8 mt-4 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/arena"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div className={`p-3 rounded-xl ${isCTF ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
          {isCTF ? <Shield className="w-6 h-6" /> : <Code2 className="w-6 h-6" />}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{topic.title} Arena</h1>
          <p className="text-muted-foreground mt-1">
            {isCTF ? "Capture the flags and climb the ranks." : "Solve challenges to increase your Code Rank."}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Challenges
          </h2>
          
          <div className="space-y-3">
            {challenges.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <p className="text-muted-foreground">No challenges available yet.</p>
              </Card>
            ) : (
              challenges.map((challenge) => (
                <Card key={challenge.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
                        {challenge.category || "CODE"}
                      </Badge>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600/30 bg-yellow-600/10">
                        {challenge.points || 100} pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{challenge.description}</p>
                  </div>
                  <Button asChild variant="secondary" className="shrink-0 gap-2">
                    <Link to={`/arena/${topicId}/${challenge.id}`}>
                      <PlayCircle className="w-4 h-4" />
                      {isCTF ? "Capture" : "Solve"}
                    </Link>
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Top Hackers
          </h2>
          <Card className="overflow-hidden">
            {leaderboard.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No one has scored points yet. Be the first!
              </div>
            ) : (
              <div className="divide-y divide-border">
                {leaderboard.map((row, i) => (
                  <div key={row.user_id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 text-center font-bold text-muted-foreground text-sm">
                        #{i + 1}
                      </div>
                      <div className="font-medium">{row.profiles?.name || "Anonymous"}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-brand">{row.total_points}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{row.challenges_solved} solved</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
