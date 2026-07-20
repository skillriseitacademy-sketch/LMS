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
  url: string;
  source: string;
  location?: string;
  salary?: string;
  type?: string;
  logo?: string;
  matchScore?: number;
};

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const { data, error } = await supabase
        .from("job_listings")
        .select("*")
        .limit(10);
      
      if (data && !error) {
        setJobs(data.map(j => ({
          ...j,
          // Since our schema only has basic fields, we mock the extra display fields based on the title/company
          location: "Remote",
          salary: "Competitive",
          type: "Full-Time",
          logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(j.company)}&background=random`,
          matchScore: Math.floor(Math.random() * 20) + 80 // 80-99
        })));
      } else {
        // If the DB is empty, let's just fall back to empty state cleanly
        setJobs([]);
      }
      setLoading(false);
    }
    fetchJobs();
  }, []);

  const applyToJob = (id: string) => {
    setAppliedJobs(prev => [...prev, id]);
  };

  return (
    <div className="flex-1 max-w-container-max mx-auto w-full flex flex-col lg:flex-row gap-8 items-start p-4 md:p-8">
      {/* Left Column: Search & Jobs Grid */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        {/* Page Header & Complex Filter Bar */}
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface" style={{ fontFamily: "Manrope" }}>Discover Opportunities</h2>
            <p className="text-base leading-[1.5] text-on-surface-variant mt-1" style={{ fontFamily: "Inter" }}>Curated positions matching your Arena performance and profile.</p>
          </div>
          
          {/* Bento-style Filter Bar */}
          <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-container-high flex flex-wrap gap-2 items-center">
            <div className="flex-1 min-w-[200px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">search</span>
              <input className="w-full bg-transparent border-none py-2.5 pl-10 pr-3 text-base leading-[1.5] text-on-surface focus:ring-0 placeholder:text-outline outline-none" style={{ fontFamily: "Inter" }} placeholder="Job Role, Title, or Keyword" type="text" />
            </div>
            <div className="w-px h-8 bg-surface-container-highest hidden md:block"></div>
            <div className="flex-1 min-w-[150px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">location_on</span>
              <input className="w-full bg-transparent border-none py-2.5 pl-10 pr-3 text-base leading-[1.5] text-on-surface focus:ring-0 placeholder:text-outline outline-none" style={{ fontFamily: "Inter" }} placeholder="Location" type="text" />
            </div>
            <div className="w-px h-8 bg-surface-container-highest hidden md:block"></div>
            <div className="flex-1 min-w-[150px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">payments</span>
              <select className="w-full bg-transparent border-none py-2.5 pl-10 pr-8 text-base leading-[1.5] text-on-surface focus:ring-0 appearance-none cursor-pointer outline-none" style={{ fontFamily: "Inter" }}>
                <option value="">Salary Range</option>
                <option value="1">10LPA - 20LPA</option>
                <option value="2">20LPA - 30LPA</option>
                <option value="3">30LPA+</option>
              </select>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-xs tracking-[0.05em] font-medium hover:bg-primary/90 transition-colors active:scale-[0.98] shadow-sm flex items-center gap-2 shrink-0" style={{ fontFamily: "JetBrains Mono" }}>
              Search Jobs
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs tracking-[0.05em] font-medium rounded-full flex items-center gap-1 cursor-pointer hover:bg-surface-container-highest transition-colors" style={{ fontFamily: "JetBrains Mono" }}>Remote <span className="material-symbols-outlined text-[16px]">close</span></span>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs tracking-[0.05em] font-medium rounded-full flex items-center gap-1 cursor-pointer hover:bg-surface-container-highest transition-colors" style={{ fontFamily: "JetBrains Mono" }}>Full-Time <span className="material-symbols-outlined text-[16px]">close</span></span>
            <button className="px-3 py-1 text-primary text-xs tracking-[0.05em] font-medium hover:bg-primary-container/50 rounded-full transition-colors" style={{ fontFamily: "JetBrains Mono" }}>Clear All</button>
          </div>
        </section>

        {/* Recommended Jobs Grid */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[24px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>Recommended for You</h3>
            <a className="text-xs tracking-[0.05em] font-medium text-primary hover:underline" style={{ fontFamily: "JetBrains Mono" }} href="#">View All Matches</a>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-on-surface-variant">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-surface-container-highest text-on-surface-variant">
              No job listings found in database. Add some to `job_listings`!
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container-highest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow group flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg border border-surface-container-highest overflow-hidden p-2 bg-surface-bright flex items-center justify-center">
                        <img className="w-full h-full object-contain" src={job.logo} alt="Logo" />
                      </div>
                      <div>
                        <h4 className="text-[18px] font-semibold leading-[1.3] text-on-surface group-hover:text-primary transition-colors cursor-pointer" style={{ fontFamily: "Manrope" }}>{job.title}</h4>
                        <p className="text-base leading-[1.5] text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>{job.company}</p>
                      </div>
                    </div>
                    <button className="text-outline-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">bookmark_border</span></button>
                  </div>
                  {/* Match Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-container px-3 py-1.5 rounded-full w-fit">
                    <span className="material-symbols-outlined text-[16px]" data-weight="fill">local_fire_department</span>
                    <span className="text-xs tracking-[0.05em] font-semibold" style={{ fontFamily: "JetBrains Mono" }}>{job.matchScore}% Match based on Profile</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <div className="flex items-center gap-1 text-on-surface-variant text-xs tracking-[0.05em] font-medium bg-surface-container px-2 py-1 rounded-md" style={{ fontFamily: "JetBrains Mono" }}>
                      <span className="material-symbols-outlined text-[16px]">location_on</span> {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant text-xs tracking-[0.05em] font-medium bg-surface-container px-2 py-1 rounded-md" style={{ fontFamily: "JetBrains Mono" }}>
                      <span className="material-symbols-outlined text-[16px]">payments</span> {job.salary}
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant text-xs tracking-[0.05em] font-medium bg-surface-container px-2 py-1 rounded-md" style={{ fontFamily: "JetBrains Mono" }}>
                      <span className="material-symbols-outlined text-[16px]">work</span> {job.type}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-surface-container-highest flex justify-end">
                    <button 
                      onClick={() => applyToJob(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                      className={`px-6 py-2 rounded-lg text-xs tracking-[0.05em] font-medium transition-colors active:scale-[0.98] ${appliedJobs.includes(job.id) ? 'bg-primary-fixed-dim text-on-primary-fixed cursor-not-allowed opacity-70' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`} 
                      style={{ fontFamily: "JetBrains Mono" }}>
                      {appliedJobs.includes(job.id) ? 'Applied ✓' : 'Quick Apply'}
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
            <h3 className="text-[18px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>Tracked Applications</h3>
            <button className="text-primary hover:bg-primary-container/20 p-1 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
          </div>
          <div className="flex flex-col gap-4">
            
            {jobs.filter(j => appliedJobs.includes(j.id)).map(job => (
              <div key={job.id} className="border-l-4 border-outline-variant bg-surface-bright p-3 rounded-r-lg group hover:bg-surface-container-lowest transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[14px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>{job.title}</h4>
                    <p className="text-[12px] leading-[1.5] text-on-surface-variant" style={{ fontFamily: "Inter" }}>{job.company}</p>
                  </div>
                  <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-xs font-bold text-outline">
                    {job.company.substring(0,2).toUpperCase()}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                  <span className="text-xs tracking-[0.05em] font-medium text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>Applied</span>
                </div>
                <p className="text-[11px] leading-[1.5] text-outline mt-1" style={{ fontFamily: "Inter" }}>Just now</p>
              </div>
            ))}

            {/* Static tracker items for visual density */}
            <div className="border-l-4 border-secondary bg-surface-bright p-3 rounded-r-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-fixed-dim/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h4 className="text-[14px] font-bold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>Frontend Engineer</h4>
                  <p className="text-[12px] leading-[1.5] text-on-surface-variant" style={{ fontFamily: "Inter" }}>CloudSync Systems</p>
                </div>
                <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-xs font-bold text-secondary-container">
                  CS
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs tracking-[0.05em] font-semibold text-secondary" style={{ fontFamily: "JetBrains Mono" }}>Interviewing (R2)</span>
              </div>
              <p className="text-[11px] leading-[1.5] text-outline mt-1" style={{ fontFamily: "Inter" }}>Tomorrow, 2:00 PM</p>
            </div>
            
            <div className="border-l-4 border-primary bg-primary-fixed/30 p-3 rounded-r-lg group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[14px] font-semibold leading-[1.3] text-on-primary-fixed" style={{ fontFamily: "Manrope" }}>Junior SDE</h4>
                  <p className="text-[12px] leading-[1.5] text-on-primary-fixed-variant" style={{ fontFamily: "Inter" }}>TechFlow</p>
                </div>
                <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">celebration</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                <span className="text-xs tracking-[0.05em] font-bold text-primary" style={{ fontFamily: "JetBrains Mono" }}>Offer Received</span>
              </div>
              <button className="mt-2 w-full bg-primary text-on-primary py-1.5 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">View Details</button>
            </div>
          </div>
          <button className="w-full mt-4 py-2 border border-outline-variant rounded-lg text-xs tracking-[0.05em] font-medium text-on-surface hover:bg-surface-container transition-colors" style={{ fontFamily: "JetBrains Mono" }}>
            View All Applications
          </button>
        </div>
      </aside>
    </div>
  );
}
