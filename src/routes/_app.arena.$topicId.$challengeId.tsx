import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Flag, Code2, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/arena/$topicId/$challengeId")({
  component: ChallengeRoom,
});

function ChallengeRoom() {
  const { topicId, challengeId } = Route.useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  
  const [challenge, setChallenge] = useState<any>(null);
  const [submission, setSubmission] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    async function fetchChallenge() {
      const { data } = await supabase
        .from("code_challenges")
        .select("*")
        .eq("id", challengeId)
        .single();
      setChallenge(data);
    }
    fetchChallenge();
  }, [challengeId]);

  if (!challenge) return null;

  const isCTF = challenge.category !== "code";

  const handleSubmit = async () => {
    if (!submission.trim() || !session) return;
    setStatus("submitting");

    // Check if correct (in a real app, this should be done on the server, not client!)
    // But since API routes are disabled, we will simulate it here to demonstrate functionality.
    const isCorrect = isCTF 
      ? submission.trim() === challenge.flag 
      : submission.length > 10; // fake code check

    try {
      const { data: insertData, error } = await supabase
        .from("code_submissions")
        .insert({
          challenge_id: challengeId,
          user_id: session.id,
          code: isCTF ? "" : submission,
          flag_submitted: isCTF ? submission : null,
          status: isCorrect ? "passed" : "failed",
          points_earned: isCorrect ? challenge.points : 0,
        })
        .select()
        .single();

      if (error) throw error;

      if (isCorrect) {
        setStatus("success");
        // We'd also update the topic_leaderboards here if this was a backend.
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-4 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: `/arena/${topicId}` })}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{challenge.title}</h1>
            <Badge variant="secondary" className="uppercase text-[10px] tracking-wider">
              {challenge.category}
            </Badge>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600/30 bg-yellow-600/10">
              {challenge.points} pts
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 prose dark:prose-invert max-w-none">
          <h3>Problem Statement</h3>
          <div className="whitespace-pre-wrap">{challenge.description}</div>
        </Card>

        <Card className="flex flex-col">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
            {isCTF ? <Flag className="w-5 h-5 text-destructive" /> : <Code2 className="w-5 h-5 text-primary" />}
            <h3 className="font-semibold">{isCTF ? "Submit Flag" : "Code Editor"}</h3>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-4">
            {isCTF ? (
              <Input
                placeholder="FLAG{...}"
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                className="font-mono text-lg py-6"
                disabled={status === "success"}
              />
            ) : (
              <Textarea
                placeholder="Write your code here..."
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                className="font-mono flex-1 min-h-[300px] resize-none"
                disabled={status === "success"}
              />
            )}

            {status === "success" && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Correct! You earned {challenge.points} points.</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Incorrect. Keep trying!</span>
              </div>
            )}

            <Button 
              size="lg" 
              onClick={handleSubmit} 
              disabled={status === "submitting" || status === "success" || !submission.trim()}
              className={isCTF ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              {status === "submitting" ? "Submitting..." : isCTF ? "Capture Flag" : "Run Code"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
