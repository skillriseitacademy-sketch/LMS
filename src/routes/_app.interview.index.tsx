import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { interviewRoles } from "@/lib/mock-data";
import { Bot, Video, ArrowRight, Mic } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app/interview/")({
  head: () => ({ meta: [{ title: "Interview — PlacePro LMS" }] }),
  component: InterviewIndex,
});

function InterviewIndex() {
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);

  const startAiInterview = async (roleId: string) => {
    setStarting(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch("/api/interview/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ topic_id: roleId }), // We use roleId for now
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      // Navigate to the AI interview session, passing the ephemeral key in state
      navigate({
        to: `/interview/ai/${data.session_id}`,
        state: { ephemeralKey: data.client_secret, roleId } as any,
      });
    } catch (e) {
      console.error(e);
      alert("Failed to start AI interview");
    }
    setStarting(false);
  };

  return (
    <>
      <TopBar title="Interview" />
      <div className="p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <header className="mb-6">
            <h1 className="text-display text-2xl font-bold">Pick a mode</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Practice with an AI interviewer, or book a live session with a human reviewer.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card-blue p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80">
                <Bot className="h-5 w-5 text-brand-dark" />
              </div>
              <h2 className="mt-3 text-display text-lg font-semibold">AI mock interview</h2>
              <p className="mt-1 text-xs text-foreground/70">
                Voice-style chat with an AI interviewer. Full proctoring enabled.
              </p>
              <button
                disabled={starting}
                onClick={() => startAiInterview("frontend")}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background disabled:opacity-50"
              >
                {starting ? "Starting..." : "Start AI interview"} <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="rounded-3xl border border-border bg-card-yellow p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/80">
                <Video className="h-5 w-5 text-brand-dark" />
              </div>
              <h2 className="mt-3 text-display text-lg font-semibold">Live interview</h2>
              <p className="mt-1 text-xs text-foreground/70">
                Schedule a real interviewer over video. Receive a scored rubric after the call.
              </p>
              <Link
                to="/interview/manual/$sessionId"
                params={{ sessionId: "test" }}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
              >
                Book live interview <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <section className="mt-8">
            <h3 className="text-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Roles you can practice
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {interviewRoles.map((r) => (
                <button
                  key={r.id}
                  disabled={starting}
                  onClick={() => startAiInterview(r.id)}
                  className="group flex w-full text-left items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-brand disabled:opacity-50"
                >
                  <div>
                    <h4 className="text-sm font-semibold">{r.title}</h4>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                  <Mic className="h-4 w-4 text-muted-foreground transition group-hover:text-brand" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
