import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import {
  generateInterviewFeedback,
  type InterviewFeedback,
} from "@/lib/interview-feedback.functions";
import { Loader2, ThumbsUp, AlertTriangle, RotateCcw, ArrowRight, Download } from "lucide-react";

export const Route = createFileRoute("/_app/interview/$sessionId/feedback")({
  head: () => ({ meta: [{ title: "Interview feedback — PlacePro LMS" }] }),
  component: Feedback,
});

function ScoreRing({ label, value, color }: { label: string; value: number; color: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="var(--muted)" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
        />
      </svg>
      <div className="-mt-[58px] text-display text-xl font-bold">{value}</div>
      <div className="mt-8 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Feedback() {
  const { sessionId } = useParams({ from: "/_app/interview/$sessionId/feedback" });
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ role: "interviewer" | "candidate"; text: string }[]>([]);
  const [role, setRole] = useState("Frontend Engineer");

  useEffect(() => {
    const raw = sessionStorage.getItem(`interview-${sessionId}`);
    if (!raw) {
      setError("No interview transcript found for this session.");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as {
        role: string;
        transcript: { role: "interviewer" | "candidate"; text: string }[];
      };
      setRole(parsed.role);
      setTranscript(parsed.transcript);
      generateInterviewFeedback({ data: parsed })
        .then((f) => setFeedback(f))
        .catch((e) => setError(e instanceof Error ? e.message : "Failed to generate feedback"));
    } catch (e) {
      setError("Couldn't read interview transcript.");
    }
  }, [sessionId]);

  const handleDownload = () => {
    if (!transcript.length) return;
    const text = transcript.map(t => `${t.role === "interviewer" ? "Interviewer" : "You"}:\n${t.text}`).join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${sessionId.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <TopBar title="Interview feedback" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-5">
          <header>
            <h1 className="text-display text-2xl font-bold">Your debrief</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {role} · session {sessionId.slice(0, 6)}
            </p>
          </header>

          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {!feedback && !error && (
            <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> AI is scoring your interview…
            </div>
          )}

          {feedback && (
            <>
              <div className="grid grid-cols-3 gap-3 rounded-3xl border border-border bg-card p-6">
                <ScoreRing label="Communication" value={feedback.communication} color="var(--brand)" />
                <ScoreRing label="Technical" value={feedback.technical} color="var(--xp-gold)" />
                <ScoreRing label="Confidence" value={feedback.confidence} color="var(--success)" />
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">Summary</h3>
                <p className="mt-2 text-sm leading-relaxed">{feedback.summary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="flex items-center gap-2 text-display text-sm font-semibold text-success">
                    <ThumbsUp className="h-4 w-4" /> Strengths
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {feedback.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="flex items-center gap-2 text-display text-sm font-semibold text-streak">
                    <AlertTriangle className="h-4 w-4" /> To improve
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {feedback.improvements.map((s, i) => (
                      <li key={i} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-streak" />{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {transcript.length > 0 && (
            <details className="rounded-3xl border border-border bg-card p-6">
              <summary className="cursor-pointer text-sm font-semibold">Full transcript</summary>
              <div className="mt-3 space-y-2 text-sm">
                {transcript.map((t, i) => (
                  <p key={i}>
                    <span className={`font-semibold ${t.role === "interviewer" ? "text-brand" : "text-foreground"}`}>
                      {t.role === "interviewer" ? "Interviewer" : "You"}:
                    </span>{" "}
                    <span className="text-foreground/80">{t.text}</span>
                  </p>
                ))}
              </div>
            </details>
          )}

          <div className="flex flex-wrap gap-2">
            {transcript.length > 0 && (
              <button onClick={handleDownload} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted">
                <Download className="h-3 w-3" /> Download Transcript
              </button>
            )}
            <Link to="/interview" className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold hover:bg-muted">
              <RotateCcw className="h-3 w-3" /> New interview
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
              Back to dashboard <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
