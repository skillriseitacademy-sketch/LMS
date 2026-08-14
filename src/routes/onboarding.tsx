import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/login" });
    const { data } = await supabase
      .from("profiles")
      .select("role, onboarding_complete")
      .eq("id", session.user.id)
      .single();
    if (data?.role !== "student") throw redirect({ to: "/dashboard" });
    if (data.onboarding_complete) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Welcome to PlacePro" }] }),
  component: Onboarding,
});

// Fallback topics
const DEFAULT_TOPICS = [
  {
    id: "ds",
    title: "Data Structures",
    description: "Master arrays, trees, graphs and algorithmic problem solving.",
  },
  {
    id: "web",
    title: "Web Dev",
    description: "Frontend, backend, and full-stack frameworks.",
  },
  {
    id: "cs",
    title: "Core CS",
    description: "OS, DBMS, Computer Networks, and Architecture.",
  },
  {
    id: "apt",
    title: "Aptitude",
    description: "Quantitative, logical, and verbal reasoning skills.",
  },
  {
    id: "sys",
    title: "System Design",
    description: "Scalable architecture and high-level design principles.",
  },
  {
    id: "hr",
    title: "HR & Soft Skills",
    description: "Interview etiquette, communication, and behavioral prep.",
  },
];

const TOPIC_ICONS: Record<string, string> = {
  "Data Structures": "data_object",
  "Web Dev": "language",
  "Core CS": "memory",
  "Aptitude": "calculate",
  "System Design": "architecture",
  "HR & Soft Skills": "psychology",
};

const DEFAULT_SUGGESTED_ROLES = [
  "Software Development Engineer (SDE)",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer",
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Topics state
  const [topics, setTopics] = useState(DEFAULT_TOPICS);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

  // Roles state
  const [careerRoles, setCareerRoles] = useState(DEFAULT_SUGGESTED_ROLES);
  const [roleSearch, setRoleSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

  // Username state
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Fetch topics
      const { data: topicsData } = await supabase.from("topics").select("*");
      if (topicsData && topicsData.length > 0) {
        setTopics(topicsData);
      }
      
      // Fetch roles
      const { data: rolesData } = await supabase.from("career_roles").select("title");
      if (rolesData && rolesData.length > 0) {
        setCareerRoles(rolesData.map(r => r.title));
      }
    }
    loadData();
  }, []);

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
      const { data } = await supabase.from("profiles").select("id").eq("username", username).single();
      if (data) {
        setUsernameStatus("unavailable");
      } else {
        setUsernameStatus("available");
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [username, step]);

  const toggleTopic = (id: string) => {
    const next = new Set(selectedTopics);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedTopics(next);
  };

  const toggleRole = (role: string) => {
    const next = new Set(selectedRoles);
    if (next.has(role)) next.delete(role);
    else next.add(role);
    setSelectedRoles(next);
  };

  const handleComplete = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    // We update local DB directly as the backend API was just a placeholder
    await supabase
      .from("profiles")
      .update({
        visibility,
        username,
        onboarding_complete: true,
        skills: Array.from(selectedRoles),
      })
      .eq("id", session.user.id);

    await supabase.from("user_roadmap_progress").upsert({
      user_id: session.user.id,
      target_job: Array.from(selectedRoles).join(", ") || "Software Engineer",
      country: "Global",
      education_level: "Graduate",
      roadmap_json: {},
    });
    
    // Also insert topics to student_topics
    const topicInserts = Array.from(selectedTopics).map((topicId) => ({
      user_id: session.user.id,
      topic_id: topicId,
    }));
    
    // Wait, some topics might be from fallback and we don't have real topic_ids.
    // If topicId is a UUID, we insert it. Else we ignore.
    const validInserts = topicInserts.filter(t => t.topic_id.length > 20);
    if (validInserts.length > 0) {
      await supabase.from("student_topics").insert(validInserts);
    }

    navigate({ to: "/dashboard" });
  };

  // Step 1 render
  if (step === 1) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center py-8 selection:bg-primary/20">
        <div className="w-full max-w-[800px] flex flex-col gap-8">
          <div className="text-center space-y-md">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Welcome to PlacePro
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
              Customize your career OS. Select the topics you want to master to start building your personalized roadmap.
            </p>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">1</div>
                <span className="font-label-sm text-label-sm text-primary">Topics</span>
              </div>
              <div className="w-12 h-1 bg-surface-container-high rounded-full overflow-hidden"></div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">2</div>
              </div>
              <div className="w-12 h-1 bg-surface-container-high rounded-full"></div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">3</div>
              </div>
              <div className="w-12 h-1 bg-surface-container-high rounded-full"></div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">4</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-lg">
            {topics.map((topic) => {
              const isSelected = selectedTopics.has(topic.id);
              const icon = TOPIC_ICONS[topic.title] || "code";
              
              return (
                <button
                  key={topic.id}
                  aria-pressed={isSelected}
                  onClick={() => toggleTopic(topic.id)}
                  className={`group relative bg-surface-container-lowest rounded-2xl p-6 shadow-card border-2 text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:-translate-y-1 ${
                    isSelected ? "border-primary" : "border-transparent hover:border-outline-variant hover:shadow-card-hover"
                  }`}
                >
                  <div className={`absolute top-sm right-sm transition-opacity ${isSelected ? "text-primary opacity-100" : "text-outline opacity-0 group-hover:opacity-50"}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "" }}>
                      {isSelected ? "check_circle" : "add_circle"}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                    isSelected ? "bg-primary-container text-primary scale-110" : "bg-surface-container-high text-on-surface-variant group-hover:bg-primary-fixed-dim group-hover:text-primary"
                  }`}>
                    <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "" }}>
                      {icon}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-1">{topic.title}</h3>
                  <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">{topic.description}</p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-outline-variant">
            <button onClick={() => setStep(2)} className="px-6 py-4 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-variant transition-colors">
              Skip for now
            </button>
            <button 
              onClick={() => setStep(2)}
              disabled={selectedTopics.size === 0}
              className="px-8 py-4 rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-bold shadow-md hover:bg-primary-fixed-variant hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
            >
              Next Step
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2 render
  if (step === 2) {
    const displayRoles = careerRoles.filter((r) => r.toLowerCase().includes(roleSearch.toLowerCase()));
    
    return (
      <div className="min-h-screen bg-surface flex flex-col selection:bg-primary/20">
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-xl w-full max-w-2xl mx-auto fade-in">
          <div className="mb-8 text-center w-full">
            <h1 className="font-headline-md text-headline-md font-extrabold text-primary mb-6">
              PlacePro
            </h1>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              What roles are you targeting?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Select or search for the career paths you're preparing for. We'll tailor your roadmap accordingly.
            </p>
          </div>

          <div className="w-full mb-8">
            <div className="flex items-center justify-between px-4 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-variant -z-10 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -z-10 rounded-full transform -translate-y-1/2 transition-all duration-500"></div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm mb-1 shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>check</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary">Topics</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm mb-1 shadow-sm ring-4 ring-primary-fixed">
                  2
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">Roles</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm mb-1">
                  3
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Profile</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-6 md:p-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed opacity-30 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

            <div className="relative mb-6">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:bg-surface-lowest focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-all font-body-md text-body-md placeholder-outline"
                placeholder="Search for roles (e.g. Data Scientist)"
                type="text"
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
              />
            </div>

            {selectedRoles.size > 0 && (
              <div className="mb-6">
                <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">
                  Selected Roles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedRoles).map(role => (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className="flex items-center gap-1 px-4 py-2 rounded-full border border-primary bg-primary-container text-on-primary-container transition-colors font-body-md text-body-md shadow-sm"
                    >
                      <span>{role}</span>
                      <span className="material-symbols-outlined text-on-primary-container" style={{ fontSize: "18px" }}>close</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-4">
                Popular Suggestions
              </h3>
              <div className="flex flex-wrap gap-2">
                {displayRoles.filter(role => !selectedRoles.has(role)).map(role => (
                  <button
                    key={role}
                    onClick={() => toggleRole(role)}
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                  >
                    <span>{role}</span>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <button onClick={() => setStep(1)} className="flex items-center gap-1 text-on-surface-variant hover:text-primary font-body-md text-body-md py-2 px-4 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              disabled={selectedRoles.size === 0}
              className="bg-primary hover:bg-on-primary-fixed text-on-primary font-headline-md text-body-md py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 flex items-center gap-1 disabled:opacity-50 disabled:hover:scale-100"
            >
              Continue to Profile
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Step 3 render
  if (step === 3) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center py-8 px-4 selection:bg-primary/20">
        <main className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant p-6 md:p-xl flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-surface-container-high rounded-t-xl overflow-hidden">
            <div className="h-full bg-primary w-[75%] transition-all duration-500 ease-in-out"></div>
          </div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl pointer-events-none"></div>

          <header className="flex flex-col gap-2 relative z-10">
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span>STEP 1</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span>STEP 2</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-primary font-bold">STEP 3</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                  Claim your unique handle
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  This will be your public identity on PlacePro.
                </p>
              </div>
              <div className="hidden sm:flex h-12 w-12 bg-primary-container rounded-full items-center justify-center text-on-primary-container shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
              </div>
            </div>
          </header>

          <section className="flex flex-col gap-6 relative z-10 py-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="font-headline-md text-headline-md text-outline">@</span>
              </div>
              <input
                className={`w-full bg-surface-container-low border text-on-surface font-headline-md text-headline-md rounded-lg py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-outline ${
                  usernameStatus === "available" ? "border-[#10B981]" : usernameStatus === "unavailable" ? "border-error" : "border-outline-variant"
                }`}
                placeholder="your_handle"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                maxLength={20}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                {usernameStatus === "available" && (
                  <div className="h-6 w-6 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] transition-transform scale-100">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                )}
                {usernameStatus === "unavailable" && (
                  <div className="h-6 w-6 rounded-full bg-error/20 flex items-center justify-center text-error transition-transform scale-100">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>close</span>
                  </div>
                )}
              </div>
            </div>

            {usernameStatus === "available" && (
              <div className="flex items-center gap-2 text-[#10B981] bg-[#10B981]/10 px-4 py-2 rounded-lg animate-fade-in-up">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span className="font-body-md text-body-md font-medium">
                  Awesome! <strong className="font-semibold">@{username}</strong> is available.
                </span>
              </div>
            )}
            {usernameStatus === "unavailable" && username.length >= 3 && (
              <div className="flex items-center gap-2 text-error bg-error/10 px-4 py-2 rounded-lg animate-fade-in-up">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span className="font-body-md text-body-md font-medium">
                  Sorry, <strong className="font-semibold">@{username}</strong> is taken or invalid.
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 bg-secondary-container/20 p-4 rounded-lg border border-secondary-container/30">
              <span className="material-symbols-outlined text-secondary text-[24px]">workspace_premium</span>
              <p className="font-body-sm text-sm text-on-surface-variant leading-tight">
                Securing your username early locks in your identity for the global Leaderboard.
              </p>
            </div>
          </section>

          <footer className="flex items-center justify-between border-t border-outline-variant pt-6 mt-auto relative z-10">
            <button onClick={() => setStep(2)} className="flex items-center gap-1 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-body-md text-body-md font-medium">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Back
            </button>
            <button 
              onClick={() => setStep(4)}
              disabled={usernameStatus !== "available"}
              className="flex items-center gap-1 px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-variant transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm font-body-md text-body-md font-medium disabled:opacity-50 disabled:hover:scale-100"
            >
              Continue
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </footer>
        </main>
      </div>
    );
  }

  // Step 4 render
  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary/20">
      <header className="w-full bg-surface-container-lowest sticky top-0 z-50 shadow-sm border-b border-outline-variant flex justify-between items-center px-6 py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            school
          </span>
          <span className="text-headline-md font-headline-md font-extrabold text-primary tracking-tight">
            PlacePro
          </span>
        </div>
        <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
          Setup - Step 4 of 4
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-xl w-full max-w-4xl mx-auto">
        <div className="w-full max-w-xl mb-8">
          <div className="flex justify-between mb-2 px-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Topics</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Roles</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Profile</span>
            <span className="font-label-sm text-label-sm text-primary font-bold">Visibility</span>
          </div>
          <div className="h-2 w-full bg-surface-variant rounded-full flex overflow-hidden">
            <div className="h-full bg-primary w-full rounded-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
            Choose Your Profile Visibility
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Control who can see your achievements, projects, and career progress on PlacePro. You can change this later in settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
          <label className="cursor-pointer group relative" onClick={() => setVisibility("public")}>
            <input checked={visibility === "public"} readOnly className="peer sr-only" name="visibility" type="radio" value="public" />
            <div className={`rounded-xl p-6 md:p-xl h-full flex flex-col items-center text-center transition-all duration-300 border-2 hover:shadow-md hover:-translate-y-1 ${visibility === "public" ? "border-primary bg-surface-container-lowest" : "border-transparent bg-surface-container-lowest"}`}>
              <div className={`absolute top-md right-md h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${visibility === "public" ? "border-primary bg-primary" : "border-outline-variant"}`}>
                <span className={`material-symbols-outlined text-white text-sm ${visibility === "public" ? "opacity-100" : "opacity-0"}`} style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>

              <div className="w-32 h-32 mb-6 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/30">
                <img className="w-full h-full object-cover mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdJc-es98J3oLYYe_GdjI7CQU7jXMJdlyGZZYvu-JUTbpMHxi6-BY5FeuGpXL41f7YEuzJ04qmaqX5Zgi46XzmfF86AZk5G6XGTq1zeBYdDk8a6A-_amcWk99yy4MGXrUU3HxH7kdgLjWojy-ZNhY5JUoUzg7PkXzyWcl9Bwf5yFc3W-XQ5OYKbpSWzpHlPxfIbz4r0fhWXHY9Nednwj_CGzKy_l9ulWLPLVhcKb2EK5eQZigEXI4pQQ" />
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                Public Profile
              </h2>
              <div className="bg-secondary-container/20 text-secondary px-2 py-1 rounded-full font-label-sm text-label-sm mb-4 inline-block">
                Recommended
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Allow recruiters, peers, and mentors to discover your profile, view your projects, and see your leaderboard rankings. Best for maximum career opportunities.
              </p>
            </div>
          </label>

          <label className="cursor-pointer group relative" onClick={() => setVisibility("private")}>
            <input checked={visibility === "private"} readOnly className="peer sr-only" name="visibility" type="radio" value="private" />
            <div className={`rounded-xl p-6 md:p-xl h-full flex flex-col items-center text-center transition-all duration-300 border-2 hover:shadow-md hover:-translate-y-1 ${visibility === "private" ? "border-primary bg-surface-container-lowest" : "border-transparent bg-surface-container-lowest"}`}>
              <div className={`absolute top-md right-md h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${visibility === "private" ? "border-primary bg-primary" : "border-outline-variant"}`}>
                <span className={`material-symbols-outlined text-white text-sm ${visibility === "private" ? "opacity-100" : "opacity-0"}`} style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>

              <div className="w-32 h-32 mb-6 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/30">
                <img className="w-full h-full object-cover mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEun3MJ3a80MD6wymrA1eGBly3vw_h4LqEpZBOIb4e1BjYqgDpfx4AaVj1iFJEA84tLqClWfFZ5H6Mex2cgLFibyEOy2lzScgbduMv7L2-HJ36SHXPmjH8W_vRYgycfw8sxH6PsT5H9MQRXBhOSArCeJQHoRaitlQmkooQEFxZE8LUchn7Ag9hPq5xGoRsDEzBNZQ4eLUdXbdwhmBYQugcRWk7dANs894w0QFrXCsirUZLpLEm_aZnqw" />
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                Private Profile
              </h2>
              <div className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded-full font-label-sm text-label-sm mb-4 inline-block">
                Restricted
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Your profile is hidden from public search and leaderboards. Only users you explicitly connect with or share your direct link with can view your details.
              </p>
            </div>
          </label>
        </div>

        <div className="w-full max-w-4xl flex justify-between items-center mt-auto border-t border-outline-variant/50 pt-6">
          <button onClick={() => setStep(3)} className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors px-4 py-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
          <button 
            disabled={loading}
            onClick={handleComplete}
            className="bg-primary text-on-primary font-headline-md text-body-lg px-8 py-4 rounded-lg shadow-sm hover:bg-surface-tint hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Finishing..." : "Finish Setup"}
            {!loading && <span className="material-symbols-outlined">rocket_launch</span>}
          </button>
        </div>
      </main>
    </div>
  );
}
