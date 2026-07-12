import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Search, MapPin, DollarSign, Clock, ExternalLink, Loader2 } from "lucide-react";
import { TopBar } from "@/components/top-bar";


export const Route = createFileRoute("/_app/jobs")({
  head: () => ({ meta: [{ title: "Jobs — PlacePro LMS" }] }),
  component: JobsPage,
});

interface JobListing {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  experience: string | null;
  link: string;
}

function JobsPage() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [lpa, setLpa] = useState("");
  const [location, setLocation] = useState("");
  
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setJobs([]);

    try {
      // The user provided this key in the prompt, moving to env variable to avoid secrets in code
      const key = import.meta.env.VITE_GEMINI_API_KEY || "";
      
      const promptText = `Find live, real job openings on the internet matching these criteria:
      Role: "${role}"
      Experience required: "${experience || 'Any'}"
      Salary expected: "${lpa || 'Any'}"
      Location: "${location || 'Any'}"
      
      Return a list of actual job postings currently available. Ensure the 'link' is a valid URL to the job posting or application page.
      If no exact matches are found, return similar relevant roles.`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  jobs: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        title: { type: "STRING", description: "Job title" },
                        company: { type: "STRING", description: "Company name" },
                        location: { type: "STRING", description: "Job location (e.g., Remote, Bangalore, etc.)" },
                        salary: { type: "STRING", description: "Salary or LPA, if specified", nullable: true },
                        experience: { type: "STRING", description: "Required experience", nullable: true },
                        link: { type: "STRING", description: "A valid URL link to apply for the job" },
                      },
                      required: ["title", "company", "location", "link"],
                    },
                  },
                },
                required: ["jobs"],
              },
            },
          }),
        }
      );

      if (!geminiRes.ok) {
        throw new Error("Failed to communicate with AI provider.");
      }

      const data = await geminiRes.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!resultText) {
        throw new Error("Failed to parse jobs data.");
      }

      const object = JSON.parse(resultText);

      if (object.jobs && Array.isArray(object.jobs)) {
        setJobs(object.jobs);
      } else {
        setJobs([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TopBar title="Jobs" />
      <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
        
        {/* Search Header */}
        <div className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand-dark">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-display text-xl font-bold">Find Your Next Job</h1>
              <p className="text-sm text-muted-foreground">AI scans the web to find live jobs matching your criteria.</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Job Role / Title *
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand transition appearance-none"
              >
                <option value="">Any</option>
                <option value="Fresher / 0 years">Fresher (0 years)</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Salary / LPA
              </label>
              <input
                type="text"
                placeholder="e.g. 5-10 LPA"
                value={lpa}
                onChange={(e) => setLpa(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Remote, Bangalore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
              />
            </div>

            <div className="lg:col-span-5 flex justify-end mt-2">
              <button
                type="submit"
                disabled={isLoading || !role.trim()}
                className="flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {isLoading ? "Scanning web..." : "Search Live Jobs"}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {error && (
          <div className="rounded-xl border border-danger/20 bg-danger/10 p-4 text-sm text-danger mb-8">
            {error}
          </div>
        )}

        {!isLoading && hasSearched && jobs.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground">
            No jobs found matching your criteria. Try adjusting your search terms.
          </div>
        )}

        {jobs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Search Results</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, idx) => (
                <div key={idx} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition group">
                  <div className="flex-1">
                    <h3 className="text-display text-lg font-bold line-clamp-1">{job.title}</h3>
                    <p className="text-brand font-semibold text-sm mt-1">{job.company}</p>
                    
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">{job.location}</span>
                      </div>
                      
                      {job.experience && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">{job.experience}</span>
                        </div>
                      )}
                      
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">{job.salary}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90 transition group-hover:bg-brand group-hover:text-brand-foreground"
                    >
                      Apply Now <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
