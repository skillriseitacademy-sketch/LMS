import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { AuthBackground } from "@/components/auth-background";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
    const { data } = await supabase
      .from("profiles")
      .select("role, onboarding_complete")
      .eq("id", session.user.id)
      .single();
    if (data?.role !== "student") {
      throw redirect({ to: "/dashboard" });
    }
    if (data.onboarding_complete) {
      throw redirect({ to: "/dashboard" });
    }
  },
  head: () => ({ meta: [{ title: "Welcome — PlacePro LMS" }] }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [educationLevel, setEducationLevel] = useState("Graduate");
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Debounced username check
  useEffect(() => {
    if (step !== 3 || !username) {
      if (!username) setUsernameStatus("idle");
      return;
    }
    const isValid = /^[a-z0-9_]{3,20}$/.test(username);
    if (!isValid) {
      setUsernameStatus("unavailable");
      return;
    }

    setUsernameStatus("checking");
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/users/check-username?u=${encodeURIComponent(username)}`);
        if (res.ok) {
          const { available } = await res.json();
          setUsernameStatus(available ? "available" : "unavailable");
        } else {
          setUsernameStatus("unavailable");
        }
      } catch {
        setUsernameStatus("unavailable");
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [username, step]);

  useEffect(() => {
    async function fetchTopics() {
      const { data } = await supabase.from("topics").select("*").order("created_at");
      if (data) {
        setTopics(data);
      } else {
        // Fallback for development if db is empty
        setTopics([
          {
            id: "fallback-1",
            title: "React Fundamentals",
            description: "Learn the basics of React.",
          },
          { id: "fallback-2", title: "System Design", description: "Scale modern web apps." },
        ]);
      }
      setFetching(false);
    }
    fetchTopics();
  }, []);

  const toggleTopic = (id: string) => {
    const next = new Set(selectedTopics);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedTopics(next);
  };

  const handleComplete = async () => {
    if (selectedTopics.size === 0) return;
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Call the API
    await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        education_level: educationLevel,
        course_ids: Array.from(selectedTopics),
        visibility,
        username, // Pass the username to the backend
      }),
    });

    // Save username locally as well (via supabase client to update profiles)
    await supabase.from("profiles").update({ visibility, username }).eq("id", session?.user.id);

    // Also update local roadmap progress just in case
    await supabase.from("user_roadmap_progress").upsert({
      user_id: session?.user.id,
      target_job: "Software Engineer",
      country: "Global",
      education_level: educationLevel,
      roadmap_json: {},
    });

    // We must invalidate the session store or reload so the app knows we're onboarded
    window.location.href = "/dashboard";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      <AuthBackground />
      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border bg-card/90 backdrop-blur p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-display text-lg font-bold">PlacePro</span>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <h1 className="text-display text-3xl font-bold">
              Welcome! What is your education level?
            </h1>
            <p className="text-muted-foreground">This helps us tailor your placement roadmap.</p>

            <div className="grid gap-3 md:grid-cols-2">
              {["Class 10", "Intermediate", "Diploma", "Graduate"].map((level) => (
                <button
                  key={level}
                  onClick={() => setEducationLevel(level)}
                  className={`rounded-2xl border p-4 text-left transition ${educationLevel === level ? "border-brand bg-brand/10" : "border-border hover:bg-muted"}`}
                >
                  <span
                    className={`block font-semibold ${educationLevel === level ? "text-brand-dark" : "text-foreground"}`}
                  >
                    {level}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="space-y-6">
            <h1 className="text-display text-3xl font-bold">Choose your courses</h1>
            <p className="text-muted-foreground">
              Select at least one course to enroll in immediately. You can add more later.
            </p>

            {fetching ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Loading courses...
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 max-h-[50vh] overflow-y-auto pr-2">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => toggleTopic(t.id)}
                    className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${selectedTopics.has(t.id) ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-border hover:bg-muted"}`}
                  >
                    <div
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${selectedTopics.has(t.id) ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${selectedTopics.has(t.id) ? "text-brand-dark" : "text-foreground"}`}
                      >
                        {t.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                Back
              </button>
              <button
                disabled={selectedTopics.size === 0}
                onClick={() => setStep(3)}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-display text-3xl font-bold">Privacy Settings</h1>
            <p className="text-muted-foreground">Choose who can see your profile and posts.</p>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Choose a Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="username"
                    className={`w-full rounded-xl border bg-background pl-8 pr-4 py-2.5 outline-none transition-colors ${usernameStatus === "unavailable" ? "border-destructive focus:border-destructive" : usernameStatus === "available" ? "border-success focus:border-success" : "border-border focus:border-brand"}`}
                    maxLength={20}
                  />
                </div>
                {usernameStatus === "checking" && <p className="text-xs text-muted-foreground mt-1">Checking availability...</p>}
                {usernameStatus === "available" && <p className="text-xs text-success mt-1">Username is available!</p>}
                {usernameStatus === "unavailable" && username.length > 0 && <p className="text-xs text-destructive mt-1">Username is taken or invalid.</p>}
                <p className="mt-1 text-xs text-muted-foreground">Only letters, numbers, and underscores (3-20 characters).</p>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-semibold mb-2">Profile Visibility</label>
                <div className="grid gap-4">
              <button
                onClick={() => setVisibility("public")}
                className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${visibility === "public" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-border hover:bg-muted"}`}
              >
                <div
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${visibility === "public" ? "border-brand bg-brand text-white" : "border-border bg-card"}`}
                >
                  {visibility === "public" && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${visibility === "public" ? "text-brand-dark" : "text-foreground"}`}
                  >
                    Public (Recommended)
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Anyone can view your profile, posts, and send you connection requests. Followers
                    are accepted automatically.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setVisibility("private")}
                className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${visibility === "private" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-border hover:bg-muted"}`}
              >
                <div
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${visibility === "private" ? "border-brand bg-brand text-white" : "border-border bg-card"}`}
                >
                  {visibility === "private" && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${visibility === "private" ? "text-brand-dark" : "text-foreground"}`}
                  >
                    Private
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Only approved connections can see your posts and profile details. You must
                    approve all requests.
                  </p>
                </div>
              </button>
            </div>
            </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted"
                disabled={loading}
              >
                Back
              </button>
              <button
                disabled={loading || usernameStatus !== "available"}
                onClick={handleComplete}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Finishing..." : "Start Learning"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
