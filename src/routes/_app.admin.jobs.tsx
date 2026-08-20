import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app/admin/jobs")({
  component: AdminJobs,
});

function AdminJobs() {
  const [runs, setRuns] = useState<any[]>([]);

  const [syncing, setSyncing] = useState(false);

  const loadRuns = async () => {
    const { data } = await supabase
      .from("job_ingestion_runs")
      .select("*")
      .order("started_at", { ascending: false });
    if (data) setRuns(data);
  };

  useEffect(() => {
    loadRuns();
  }, []);

  const handleRunIngestion = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/jobs-aggregate", {
        method: "POST",
      });
      if (res.ok) {
        alert("Ingestion triggered successfully!");
        loadRuns(); // Refresh table
      } else {
        alert("Failed to trigger ingestion. Check Vercel logs.");
      }
    } catch (e) {
      console.error(e);
      alert("Error triggering ingestion");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Job Aggregator"]} />
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-display text-2xl font-bold">Job Aggregator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor and trigger job ingestion runs from integrated API feeds.
            </p>
          </div>
          <button 
            onClick={handleRunIngestion}
            disabled={syncing}
            className="rounded-xl bg-brand px-4 py-2 font-semibold text-brand-foreground shadow hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {syncing && <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>}
            {syncing ? "Running..." : "Run Ingestion Now"}
          </button>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="text-lg font-bold mb-4">Ingestion History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/50 text-muted-foreground">
                <tr>
                  <th className="pb-3 font-medium">Run ID</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Started At</th>
                  <th className="pb-3 font-medium">Jobs Found</th>
                  <th className="pb-3 font-medium">Jobs New</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {runs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">
                      No ingestion runs found.
                    </td>
                  </tr>
                ) : (
                  runs.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3 font-mono text-xs">{r.id}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            r.status === "running"
                              ? "bg-blue-500/10 text-blue-500"
                              : r.status === "finished"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3">{new Date(r.started_at).toLocaleString()}</td>
                      <td className="py-3">{r.jobs_found}</td>
                      <td className="py-3">{r.jobs_new}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
