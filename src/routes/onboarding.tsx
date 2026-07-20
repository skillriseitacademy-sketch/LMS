import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Sparkles, ArrowRight, Search, CheckCircle2, Shield, Globe, Lock, ArrowLeft, LogOut } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
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

const TOPICS = [
  { id: "ds", title: "Data Structures", desc: "Master arrays, trees, graphs and algorithmic problem...", icon: "{}", color: "text-[#3424C2]", bg: "bg-[#3424C2]/10" },
  { id: "web", title: "Web Dev", desc: "Frontend, backend, and full-stack frameworks.", icon: "🌐", color: "text-slate-600", bg: "bg-slate-100" },
  { id: "cs", title: "Core CS", desc: "OS, DBMS, Computer Networks, and Architecture.", icon: "⚙️", color: "text-slate-600", bg: "bg-slate-100" },
  { id: "apt", title: "Aptitude", desc: "Quantitative, logical, and verbal reasoning skills.", icon: "🧮", color: "text-slate-600", bg: "bg-slate-100" },
  { id: "sys", title: "System Design", desc: "Scalable architecture and high-level design principles.", icon: "📐", color: "text-slate-600", bg: "bg-slate-100" },
  { id: "hr", title: "HR & Soft Skills", desc: "Interview etiquette, communication, and behavior...", icon: "🤝", color: "text-slate-600", bg: "bg-slate-100" },
];

const SUGGESTED_ROLES = [
  "Software Development Engineer (SDE)",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer"
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set(["ds"]));
  const [roleSearch, setRoleSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set(["Frontend Developer"]));
  const [username, setUsername] = useState("alex_dev");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "unavailable">("available");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [loading, setLoading] = useState(false);

  // Debounced username check
  useEffect(() => {
    if (step !== 3 || !username) return;
    const isValid = /^[a-z0-9_]{3,20}$/.test(username);
    if (!isValid) {
      setUsernameStatus("unavailable");
      return;
    }
    setUsernameStatus("checking");
    const timeout = setTimeout(async () => {
      // Mock API call since actual API doesn't exist
      setUsernameStatus("available");
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
    const { data: { session } } = await supabase.auth.getSession();
    
    // We update local DB directly as the backend API was just a placeholder
    await supabase.from("profiles").update({ 
      visibility, 
      username,
      onboarding_complete: true,
      skills: Array.from(selectedRoles)
    }).eq("id", session?.user.id);

    await supabase.from("user_roadmap_progress").upsert({
      user_id: session?.user.id,
      target_job: Array.from(selectedRoles).join(", ") || "Software Engineer",
      country: "Global",
      education_level: "Graduate",
      roadmap_json: {},
    });

    window.location.href = "/dashboard";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 selection:bg-[#3424C2]/20 relative">
      
      {/* Log Out Button (Fixed top-right) */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors z-20"
      >
        <LogOut className="h-4 w-4" /> Log out
      </button>
      
      {/* Top Navigation */}
      {step === 4 && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-2 text-[#3424C2] font-bold text-xl tracking-tight">
            <Sparkles className="h-5 w-5" />
            PlacePro
          </div>
          <div className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Setup - Step 4 of 4
          </div>
        </div>
      )}

      <div className={`max-w-4xl mx-auto px-4 ${step === 4 ? "pt-32" : "pt-16 pb-24"}`}>
        
        {/* Step 1 & 2 Header */}
        {step < 3 && (
          <div className="text-center mb-10">
            {step === 1 ? (
              <>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Welcome to PlacePro</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Customize your career OS. Select the topics you want to master to start building your personalized roadmap.</p>
              </>
            ) : (
              <>
                <div className="text-[#3424C2] font-bold text-xl tracking-tight mb-6">PlacePro</div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">What roles are you targeting?</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Select or search for the career paths you're preparing for. We'll tailor your roadmap accordingly.</p>
              </>
            )}
          </div>
        )}

        {/* Progress Bar (Step 1-3) */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-4 mb-12 max-w-lg mx-auto">
            {[1, 2, 3, 4].map((num, i) => (
              <div key={num} className="flex items-center gap-4">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold transition-colors ${
                  step === num ? "bg-[#3424C2] text-white" : step > num ? "bg-[#3424C2] text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {step > num ? <CheckCircle2 className="h-4 w-4" /> : num}
                </div>
                {num === step && step === 1 && <span className="text-[#3424C2] font-semibold text-sm -ml-2 pr-2">Topics</span>}
                {num === step && step === 2 && <span className="text-[#3424C2] font-semibold text-sm -ml-2 pr-2">Roles</span>}
                {num === step && step === 3 && <span className="text-[#3424C2] font-semibold text-sm -ml-2 pr-2">Identity</span>}
                {i < 3 && <div className={`h-[2px] w-12 ${step > num ? "bg-[#3424C2]" : "bg-slate-200"}`}></div>}
              </div>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className={step === 4 ? "mt-0" : "bg-transparent"}>
          
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`relative p-6 rounded-2xl text-left bg-white border transition-all ${
                    selectedTopics.has(topic.id) 
                      ? "border-[#3424C2] shadow-[0_0_0_1px_#3424C2] shadow-sm" 
                      : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {selectedTopics.has(topic.id) && (
                    <div className="absolute top-4 right-4 text-[#3424C2]">
                      <CheckCircle2 className="h-5 w-5 fill-white" />
                    </div>
                  )}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl mb-4 ${selectedTopics.has(topic.id) ? "bg-[#3424C2] text-white" : topic.bg + " " + topic.color}`}>
                    {topic.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{topic.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{topic.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm">
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for roles (e.g. Data Scientist)"
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#3424C2] focus:ring-1 focus:ring-[#3424C2] outline-none transition-all text-[15px]"
                />
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">Popular Suggestions</h3>
                <div className="flex flex-wrap gap-3">
                  {SUGGESTED_ROLES.filter(r => r.toLowerCase().includes(roleSearch.toLowerCase())).map((role) => (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        selectedRoles.has(role)
                          ? "bg-slate-50 border-[#3424C2] text-[#3424C2]"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {role} {selectedRoles.has(role) ? "✓" : "+"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Claim your unique handle</h2>
              <p className="text-slate-500 mb-8">This will be your public identity on PlacePro.</p>

              <div className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                usernameStatus === "available" ? "border-emerald-200 bg-emerald-50/30" :
                usernameStatus === "unavailable" ? "border-red-200 bg-red-50/30" :
                "border-slate-200 bg-slate-50"
              }`}>
                <span className="text-slate-400 font-medium text-lg">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="username"
                  maxLength={20}
                />
                {usernameStatus === "available" && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                )}
              </div>

              {usernameStatus === "available" && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-700 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="font-medium text-sm">Awesome! @{username} is available.</p>
                </div>
              )}

              <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
                <Shield className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800 font-medium">
                  Securing your username early locks in your identity for the global Leaderboard.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Choose Your Profile Visibility</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Control who can see your achievements, projects, and career progress on PlacePro. You can change this later in settings.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Public */}
                <button
                  onClick={() => setVisibility("public")}
                  className={`relative flex flex-col items-center text-center p-8 rounded-3xl border-2 transition-all bg-white ${
                    visibility === "public" ? "border-[#3424C2] shadow-[0_8px_30px_rgba(52,36,194,0.12)]" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className={`absolute top-6 right-6 h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    visibility === "public" ? "border-[#3424C2]" : "border-slate-300"
                  }`}>
                    {visibility === "public" && <div className="h-3 w-3 bg-[#3424C2] rounded-full" />}
                  </div>

                  <div className="h-32 w-32 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                    <Globe className="h-12 w-12 text-[#3424C2]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">Public Profile</h3>
                  <div className="bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    Recommended
                  </div>
                  <p className="text-slate-500 leading-relaxed px-4">
                    Allow recruiters, peers, and mentors to discover your profile, view your projects, and see your leaderboard rankings. Best for maximum career opportunities.
                  </p>
                </button>

                {/* Private */}
                <button
                  onClick={() => setVisibility("private")}
                  className={`relative flex flex-col items-center text-center p-8 rounded-3xl border-2 transition-all bg-white ${
                    visibility === "private" ? "border-[#3424C2] shadow-[0_8px_30px_rgba(52,36,194,0.12)]" : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className={`absolute top-6 right-6 h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    visibility === "private" ? "border-[#3424C2]" : "border-slate-300"
                  }`}>
                    {visibility === "private" && <div className="h-3 w-3 bg-[#3424C2] rounded-full" />}
                  </div>

                  <div className="h-32 w-32 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                    <Lock className="h-12 w-12 text-slate-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">Private Profile</h3>
                  <div className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    Restricted
                  </div>
                  <p className="text-slate-500 leading-relaxed px-4">
                    Your profile is hidden from public search and leaderboards. Only users you explicitly connect with or share your direct link with can view your details.
                  </p>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className={`mt-12 flex items-center max-w-2xl mx-auto pt-8 border-t border-slate-200 ${step === 4 ? "max-w-3xl justify-between" : "justify-between"}`}>
          {step === 1 ? (
            <button className="text-slate-500 font-medium text-sm hover:text-slate-800 transition-colors">
              Skip for now
            </button>
          ) : (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 text-slate-600 font-medium hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={
                (step === 1 && selectedTopics.size === 0) || 
                (step === 2 && selectedRoles.size === 0) ||
                (step === 3 && usernameStatus !== "available")
              }
              className="flex items-center gap-2 bg-[#3424C2] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A1D9C] transition-colors disabled:opacity-50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={loading}
              className="flex items-center gap-2 bg-[#3424C2] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#2A1D9C] transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? "Finishing..." : "Finish Setup"} <Sparkles className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
