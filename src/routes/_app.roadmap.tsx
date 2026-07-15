import { createFileRoute } from "@tanstack/react-router";
import {
  Map as MapIcon,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { RoadmapTree, TreeNode } from "@/components/RoadmapTree";

export const Route = createFileRoute("/_app/roadmap")({
  head: () => ({ meta: [{ title: "Career roadmap — PlacePro LMS" }] }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const { session } = useAuth();
  const [targetJob, setTargetJob] = useState("");
  const [country, setCountry] = useState("India");
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(false);
  const [rootNode, setRootNode] = useState<TreeNode | null>(null);

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
        
        // Let's check if the user already has a root node in roadmap_nodes
        const { data: rootNodes } = await supabase
          .from("roadmap_nodes")
          .select("*")
          .eq("user_id", session.id)
          .eq("type", "root")
          .limit(1)
          .single();
          
        if (rootNodes) {
           setRootNode({
             id: rootNodes.id,
             label: rootNodes.label,
             type: "root",
             level: rootNodes.level,
             field: rootNodes.field,
             description: rootNodes.description
           });
        }
      }
    }
    loadProgress();
  }, [session]);

  const generateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Instead of calling the API immediately for the root, we can just instantiate the root node.
    // The user will click it to expand and trigger the AI generation.
    const newRootId = `root-${Date.now()}`;
    const newRoot: TreeNode = {
      id: newRootId,
      label: `${education} → ${targetJob}`,
      type: "root",
      level: education,
      field: targetJob,
      description: `Starting point: ${education}. Goal: ${targetJob} in ${country}.`
    };
    
    setRootNode(newRoot);

    if (session) {
      // Save root node to DB for caching and persistence
      await supabase.from("roadmap_nodes").insert({
        id: newRootId,
        user_id: session.id,
        parent_id: null,
        label: newRoot.label,
        type: "root",
        field: targetJob,
        level: education,
        description: newRoot.description
      });
      
      // Update progress
      await supabase.from("user_roadmap_progress").upsert({
        user_id: session.id,
        target_job: targetJob,
        country,
        education_level: education,
        roadmap_json: {} // No longer using this
      });
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Learning", "Roadmap"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-display text-2xl font-bold flex items-center gap-2">
            <MapIcon className="h-6 w-6 text-brand" /> Interactive Career Map
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore your personalized, node-based path to your dream job. Click a node to discover the next steps.
          </p>
        </div>

        {!rootNode ? (
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
                  placeholder="e.g. B.Tech 2nd Year, Class 12..."
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
                Target Role / Field of Interest
              </label>
              <input
                required
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                placeholder="e.g. Cyber Security, Frontend Developer..."
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-brand-foreground hover:opacity-90 flex items-center justify-center gap-2"
            >
              Start Exploring
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RoadmapTree initialNode={rootNode} />

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setRootNode(null)}
                className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Reset Map
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

