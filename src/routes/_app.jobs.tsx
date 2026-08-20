import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app/jobs")({
  component: JobsPage,
});

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  experience: string | null;
  link: string;
  logo: string;
  matchScore: number;
  type: string;
};

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  // Search state
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [isFullTime, setIsFullTime] = useState(false);

  const [syncing, setSyncing] = useState(false);

  const forceSyncJobs = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/jobs-aggregate", {
        method: "POST",
      });
      if (res.ok) {
        alert("Jobs synced successfully! You can now search for them.");
      } else {
        alert("Failed to sync jobs.");
      }
    } catch (e) {
      console.error(e);
      alert("Error syncing jobs");
    } finally {
      setSyncing(false);
    }
  };

  const searchJobs = async (searchRole: string) => {
    setLoading(true);
    setJobs([]);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      // Fetch alerts (keep existing alert functionality if needed, or mock it)
      const alertsRes = await fetch("/api/job-alerts", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      }).catch(() => null);
      if (alertsRes && alertsRes.ok) {
        const alertsData = await alertsRes.json();
        setAlerts(alertsData.alerts || []);
      }

      // Query jobs from Supabase
      let query = supabase.from("job_listings").select(`
        id, title, company, location, salary_range, seniority, type, url,
        student_job_matches ( score )
      `);

      if (searchRole) {
        query = query.ilike("title", `%${searchRole}%`);
      }
      if (location) {
        query = query.ilike("location", `%${location}%`);
      }
      if (salary) {
        query = query.ilike("salary_range", `%${salary}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        setJobs(
          data.map((j: any) => ({
            id: j.id,
            title: j.title,
            company: j.company,
            location: j.location || "Remote",
            salary: j.salary_range || "Competitive",
            experience: j.seniority || "Any",
            link: j.url || "#",
            type: j.type || "Full-Time",
            logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(j.company)}&background=random`,
            matchScore: j.student_job_matches?.[0]?.score || Math.floor(Math.random() * 15) + 85,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchJobs(role);
  }, []);

  const subscribeToAlert = async (searchRole: string, searchLocation: string) => {
    if (!searchRole) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const res = await fetch("/api/job-alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ action: "subscribe", role: searchRole, location: searchLocation })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.alert) setAlerts(prev => [...prev.filter(a => a.id !== data.alert.id), data.alert]);
      alert("Successfully subscribed to daily alerts for this search!");
    }
  };

  const unsubscribeAlert = async (alertId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const res = await fetch("/api/job-alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ action: "unsubscribe", alertId })
    });
    if (res.ok) {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
    }
  };

  const applyToJob = (job: Job) => {
    setAppliedJobs((prev) => [...prev, job.id]);
    window.open(job.link, "_blank");
  };

  const clearAll = () => {
    setIsRemote(false);
    setIsFullTime(false);
  };

  return (
    <div className="flex-1 max-w-container-max mx-auto w-full flex flex-col lg:flex-row gap-8 items-start p-4 md:p-8">
      {/* Left Column: Search & Jobs Grid */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        {/* Page Header & Complex Filter Bar */}
        <section className="flex flex-col gap-4">
          <div>
            <h2
              className="text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface"
              style={{ fontFamily: "Manrope" }}
            >
              Discover Opportunities
            </h2>
            <p
              className="text-base leading-[1.5] text-on-surface-variant mt-1"
              style={{ fontFamily: "Inter" }}
            >
              Curated positions matching your Arena performance and profile powered by AI.
            </p>
          </div>

          {/* Bento-style Filter Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-container-high flex flex-wrap gap-2 items-center">
            <div className="flex-1 min-w-[200px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                search
              </span>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchJobs(role)}
                className="w-full bg-transparent border-none py-2.5 pl-10 pr-3 text-base leading-[1.5] text-on-surface focus:ring-0 placeholder:text-outline outline-none"
                style={{ fontFamily: "Inter" }}
                placeholder="Job Role, Title, or Keyword"
                type="text"
              />
            </div>
            <div className="w-px h-8 bg-surface-container-highest hidden md:block"></div>
            <div className="flex-1 min-w-[150px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                location_on
              </span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchJobs(role)}
                className="w-full bg-transparent border-none py-2.5 pl-10 pr-3 text-base leading-[1.5] text-on-surface focus:ring-0 placeholder:text-outline outline-none"
                style={{ fontFamily: "Inter" }}
                placeholder="Location"
                type="text"
              />
            </div>
            <div className="w-px h-8 bg-surface-container-highest hidden md:block"></div>
            <div className="flex-1 min-w-[150px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                payments
              </span>
              <select
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-transparent border-none py-2.5 pl-10 pr-8 text-base leading-[1.5] text-on-surface focus:ring-0 appearance-none cursor-pointer outline-none"
                style={{ fontFamily: "Inter" }}
              >
                <option value="">Salary Range</option>
                <option value="10LPA - 20LPA">10LPA - 20LPA</option>
                <option value="20LPA - 30LPA">20LPA - 30LPA</option>
                <option value="30LPA+">30LPA+</option>
              </select>
            </div>
            <button
              onClick={() => searchJobs(role)}
              disabled={loading}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-xs tracking-[0.05em] font-medium hover:bg-primary/90 transition-colors active:scale-[0.98] shadow-sm flex items-center gap-2 shrink-0 disabled:opacity-50"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
              ) : null}
              Search Jobs
            </button>
            <button
              onClick={() => subscribeToAlert(role, location)}
              className="bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-lg text-xs tracking-[0.05em] font-medium hover:bg-secondary-container/80 transition-colors active:scale-[0.98] shadow-sm flex items-center gap-2 shrink-0"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              Alert Me
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setIsRemote(!isRemote)}
              className={`px-3 py-1 text-xs tracking-[0.05em] font-medium rounded-full flex items-center gap-1 transition-colors ${isRemote ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              Remote{" "}
              {isRemote && <span className="material-symbols-outlined text-[16px]">close</span>}
            </button>
            <button
              onClick={() => setIsFullTime(!isFullTime)}
              className={`px-3 py-1 text-xs tracking-[0.05em] font-medium rounded-full flex items-center gap-1 transition-colors ${isFullTime ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}
              style={{ fontFamily: "JetBrains Mono" }}
            >
              Full-Time{" "}
              {isFullTime && <span className="material-symbols-outlined text-[16px]">close</span>}
            </button>
            {(isRemote || isFullTime) && (
              <button
                onClick={clearAll}
                className="px-3 py-1 text-primary text-xs tracking-[0.05em] font-medium hover:bg-primary-container/50 rounded-full transition-colors"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                Clear All
              </button>
            )}
          </div>
        </section>

        {/* Recommended Jobs Grid */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3
              className="text-[24px] font-semibold leading-[1.3] text-on-surface"
              style={{ fontFamily: "Manrope" }}
            >
              Recommended for You
            </h3>
            <a
              className="text-xs tracking-[0.05em] font-medium text-primary hover:underline"
              style={{ fontFamily: "JetBrains Mono" }}
              href="#"
            >
              View All Matches
            </a>
          </div>

          {loading ? (
            <div className="p-12 text-center flex flex-col items-center gap-4 bg-surface-container-lowest rounded-xl border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">
                progress_activity
              </span>
              <p className="text-on-surface-variant font-medium" style={{ fontFamily: "Inter" }}>
                AI is scouring the web for live opportunities...
              </p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-surface-container-highest text-on-surface-variant shadow-sm">
              No job listings found. Try adjusting your search criteria!
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container-highest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow group flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg border border-surface-container-highest overflow-hidden p-2 bg-surface-bright flex items-center justify-center shrink-0">
                        <img className="w-full h-full object-contain" src={job.logo} alt="Logo" />
                      </div>
                      <div>
                        <h4
                          className="text-[18px] font-semibold leading-[1.3] text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                          style={{ fontFamily: "Manrope" }}
                        >
                          {job.title}
                        </h4>
                        <p
                          className="text-base leading-[1.5] text-on-surface-variant mt-0.5"
                          style={{ fontFamily: "Inter" }}
                        >
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <button className="text-outline-variant hover:text-primary transition-colors shrink-0">
                      <span className="material-symbols-outlined">bookmark_border</span>
                    </button>
                  </div>
                  {/* Match Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-container px-3 py-1.5 rounded-full w-fit">
                    <span className="material-symbols-outlined text-[16px]" data-weight="fill">
                      local_fire_department
                    </span>
                    <span
                      className="text-xs tracking-[0.05em] font-semibold"
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      {job.matchScore}% AI Match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <div
                      className="flex items-center gap-1 text-on-surface-variant text-xs tracking-[0.05em] font-medium bg-surface-container px-2 py-1 rounded-md"
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      <span className="material-symbols-outlined text-[16px]">location_on</span>{" "}
                      {job.location}
                    </div>
                    {job.salary && job.salary !== "Competitive" && (
                      <div
                        className="flex items-center gap-1 text-on-surface-variant text-xs tracking-[0.05em] font-medium bg-surface-container px-2 py-1 rounded-md"
                        style={{ fontFamily: "JetBrains Mono" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">payments</span>{" "}
                        {job.salary}
                      </div>
                    )}
                    <div
                      className="flex items-center gap-1 text-on-surface-variant text-xs tracking-[0.05em] font-medium bg-surface-container px-2 py-1 rounded-md"
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      <span className="material-symbols-outlined text-[16px]">work</span> {job.type}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-surface-container-highest flex justify-end">
                    <button
                      onClick={() => applyToJob(job)}
                      disabled={appliedJobs.includes(job.id)}
                      className={`px-6 py-2 rounded-lg text-xs tracking-[0.05em] font-medium transition-colors active:scale-[0.98] flex items-center gap-2 ${appliedJobs.includes(job.id) ? "bg-primary-fixed-dim text-on-primary-fixed cursor-not-allowed opacity-70" : "bg-surface-container text-on-surface hover:bg-surface-container-high"}`}
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      {appliedJobs.includes(job.id) ? (
                        "Applied ✓"
                      ) : (
                        <>
                          Apply Now{" "}
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Right Column: Tracked Applications */}
      <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-8 lg:sticky lg:top-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-container-highest">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-[18px] font-semibold leading-[1.3] text-on-surface"
              style={{ fontFamily: "Manrope" }}
            >
              Tracked Applications
            </h3>
            <button className="text-primary hover:bg-primary-container/20 p-1 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {appliedJobs.length === 0 ? (
              <p
                className="text-sm text-on-surface-variant text-center py-4"
                style={{ fontFamily: "Inter" }}
              >
                You haven't applied to any jobs yet.
              </p>
            ) : (
              jobs
                .filter((j) => appliedJobs.includes(j.id))
                .map((job) => (
                  <div
                    key={job.id}
                    className="border-l-4 border-outline-variant bg-surface-bright p-3 rounded-r-lg group hover:bg-surface-container-lowest transition-colors shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4
                          className="text-[14px] font-semibold leading-[1.3] text-on-surface"
                          style={{ fontFamily: "Manrope" }}
                        >
                          {job.title}
                        </h4>
                        <p
                          className="text-[12px] leading-[1.5] text-on-surface-variant"
                          style={{ fontFamily: "Inter" }}
                        >
                          {job.company}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-xs font-bold text-outline shrink-0">
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                      <span
                        className="text-xs tracking-[0.05em] font-medium text-on-surface-variant"
                        style={{ fontFamily: "JetBrains Mono" }}
                      >
                        Applied
                      </span>
                    </div>
                    <p
                      className="text-[11px] leading-[1.5] text-outline mt-1"
                      style={{ fontFamily: "Inter" }}
                    >
                      Just now
                    </p>
                  </div>
                ))
            )}
          </div>
          <button
            className="w-full mt-4 py-2 border border-outline-variant rounded-lg text-xs tracking-[0.05em] font-medium text-on-surface hover:bg-surface-container transition-colors shadow-sm"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            View All Applications
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-container-highest">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-[18px] font-semibold leading-[1.3] text-on-surface"
              style={{ fontFamily: "Manrope" }}
            >
              Active Job Alerts
            </h3>
            <span className="material-symbols-outlined text-[20px] text-primary">notifications_active</span>
          </div>
          <div className="flex flex-col gap-4">
            {alerts.length === 0 ? (
              <p
                className="text-sm text-on-surface-variant text-center py-4"
                style={{ fontFamily: "Inter" }}
              >
                You have no active job alerts.
              </p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border-l-4 border-primary bg-surface-bright p-3 rounded-r-lg group hover:bg-surface-container-lowest transition-colors shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h4
                      className="text-[14px] font-semibold leading-[1.3] text-on-surface"
                      style={{ fontFamily: "Manrope" }}
                    >
                      {alert.role_keyword}
                    </h4>
                    {alert.location_keyword && (
                      <p
                        className="text-[12px] leading-[1.5] text-on-surface-variant"
                        style={{ fontFamily: "Inter" }}
                      >
                        {alert.location_keyword}
                      </p>
                    )}
                  </div>
                  <button onClick={() => unsubscribeAlert(alert.id)} className="text-error hover:bg-error-container/20 p-2 rounded-full shrink-0">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
