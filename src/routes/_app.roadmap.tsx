import { createFileRoute } from "@tanstack/react-router";
import {
  Map as MapIcon,
  Loader2,
  BookOpen,
  Target,
  Globe2,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app/roadmap")({
  head: () => ({ meta: [{ title: "Career roadmap — PlacePro LMS" }] }),
  component: RoadmapPage,
});

type RoadmapStep = {
  title: string;
  description: string;
  type: "education" | "skill" | "certification" | "project" | "job_search";
  estimatedDuration: string;
};

type RoadmapData = {
  title: string;
  description: string;
  estimatedTime: string;
  steps: RoadmapStep[];
};

function RoadmapPage() {
  const { session } = useAuth();
  const [targetJob, setTargetJob] = useState("");
  const [country, setCountry] = useState("India");
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  useEffect(() => {
    async function loadProgress() {
      if (!session) return;
      const { data, error } = await supabase
        .from("user_roadmap_progress")
        .select("*")
        .eq("user_id", session.id)
        .single();
        
      if (!error && data) {
        if (data.target_job) setTargetJob(data.target_job);
        if (data.country) setCountry(data.country);
        if (data.education_level) setEducation(data.education_level);
        
        // If they already generated a roadmap, load it automatically
        // Note: the schema in supabase.ts uses career_paths, but onboarding upserts into user_roadmap_progress
        // Let's also check career_paths if they already generated one
        const { data: pathData } = await supabase
          .from("career_paths")
          .select("roadmap_json")
          .eq("user_id", session.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();
          
        if (pathData?.roadmap_json) {
          setRoadmap(pathData.roadmap_json as RoadmapData);
        }
      }
    }
    loadProgress();
  }, [session]);

  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetJob, country, education }),
      });
      if (!res.ok) throw new Error("Failed to generate");

      const data = (await res.json()) as RoadmapData;
      setRoadmap(data);

      if (session) {
        // Save to Supabase for persistence
        await supabase.from("career_paths").insert({
          user_id: session.id,
          target_job: targetJob,
          country,
          education_level: education,
          roadmap_json: data,
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating the roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "education":
        return <BookOpen className="h-4 w-4 text-brand" />;
      case "skill":
        return <Target className="h-4 w-4 text-brand-dark" />;
      case "certification":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "project":
        return <Briefcase className="h-4 w-4 text-card-purple" />;
      case "job_search":
        return <Globe2 className="h-4 w-4 text-card-blue" />;
      default:
        return <MapIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Learning", "Roadmap"]} />
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-display text-2xl font-bold flex items-center gap-2">
            <MapIcon className="h-6 w-6 text-brand" /> AI Career Roadmap
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate a personalized, step-by-step path to your dream job based on your current
            background.
          </p>
        </div>

        {!roadmap && (
          <form
            onSubmit={generateRoadmap}
            className="rounded-3xl border border-border bg-card p-6 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  Current Education
                </label>
                <input
                  required
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="e.g. 10th standard, B.Tech CS, self-taught..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  Target Country
                </label>
                <input
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="e.g. India, USA, Remote..."
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">
                Target Role / Job
              </label>
              <input
                required
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                placeholder="e.g. Cyber Security Analyst, Frontend Developer..."
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground hover:opacity-90 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing market & generating path...
                </>
              ) : (
                "Generate My Roadmap"
              )}
            </button>
          </form>
        )}

        {roadmap && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-3xl border border-border bg-brand/5 p-6 border-brand/20">
              <h2 className="text-display text-2xl font-bold">{roadmap.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{roadmap.description}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground">
                Total Estimated Time: {roadmap.estimatedTime}
              </div>
            </div>

            <div className="relative border-l-2 border-muted ml-4 space-y-8 py-4">
              {roadmap.steps.map((step, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-card shadow-sm">
                    {getStepIcon(step.type)}
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-bold text-base text-foreground">{step.title}</h3>
                      <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        {step.estimatedDuration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setRoadmap(null)}
                className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Create Another Roadmap
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
