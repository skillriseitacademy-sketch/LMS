import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { useR2Upload } from "@/hooks/use-r2-upload";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

const DEGREES = [
  "Bachelors (B.Tech / B.Sc)",
  "Masters (M.Tech / M.Sc)",
  "MBA",
  "PhD",
  "Diploma",
  "Other",
];
const GRAD_YEARS = Array.from({ length: 10 }, (_, i) => String(2023 + i));
const ROLE_CHIPS = [
  "Frontend Dev", "Backend Dev", "Full Stack", "Data Science",
  "UI/UX Design", "DevOps", "Mobile Dev", "AI/ML", "Cybersecurity", "Cloud",
];

type ProfileSection = "public-profile" | "education" | "preferences" | "security";

function ProfilePage() {
  const { session } = useAuth();
  const [activeSection, setActiveSection] = useState<ProfileSection>("public-profile");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const [education, setEducation] = useState({
    university: "",
    degree: "Bachelors (B.Tech / B.Sc)",
    graduationYear: "2025",
  });

  const [preferences, setPreferences] = useState({
    targetRoles: [] as string[],
    preferredLocation: "",
    activelyLooking: false,
    emailNotifications: true,
  });

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const { openPicker: openAvatarPicker, uploading: avatarUploading } = useR2Upload({
    context: "avatar",
    accept: "image/jpeg,image/png,image/webp",
  });

  useEffect(() => {
    async function loadProfile() {
      if (!session?.id) return;
      const { data } = await supabase
        .from("profiles")
        .select("name, bio, avatar_url, headline, skills, visibility")
        .eq("id", session.id)
        .single();

      if (data) {
        const parts = (data.name || "").split(" ");
        setFormData({
          firstName: parts[0] || "",
          lastName: parts.slice(1).join(" ") || "",
          bio: data.bio || "",
          portfolioUrl: "",
          linkedinUrl: "",
          githubUrl: "",
        });
        setAvatarUrl(data.avatar_url || "");
        // Skills repurposed as target roles for now
        if (data.skills?.length) {
          setPreferences(p => ({ ...p, targetRoles: data.skills }));
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, [session]);

  const handleAvatarUpload = () => {
    openAvatarPicker(async (result) => {
      setAvatarUrl(result.publicUrl);
      if (session?.id) {
        await supabase.from("profiles").update({ avatar_url: result.publicUrl }).eq("id", session.id);
        setMessage({ text: "Profile photo updated!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    });
  };

  const handleSaveProfile = async () => {
    if (!session?.id) return;
    setSaving(true);
    setMessage({ text: "", type: "" });
    const { error } = await supabase.from("profiles").update({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      bio: formData.bio,
      headline: `${education.degree} · ${education.graduationYear}`,
      skills: preferences.targetRoles,
    }).eq("id", session.id);
    setSaving(false);
    if (error) {
      setMessage({ text: "Error saving: " + error.message, type: "error" });
    } else {
      setMessage({ text: "Profile saved successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const toggleRole = (role: string) => {
    setPreferences(p => ({
      ...p,
      targetRoles: p.targetRoles.includes(role)
        ? p.targetRoles.filter(r => r !== role)
        : [...p.targetRoles, role],
    }));
  };

  const navItems: { id: ProfileSection; icon: string; label: string }[] = [
    { id: "public-profile", icon: "person", label: "Public Profile" },
    { id: "education", icon: "school", label: "Education" },
    { id: "preferences", icon: "tune", label: "Preferences" },
    { id: "security", icon: "lock", label: "Security & Privacy" },
  ];

  const profileStrength = Math.min(100,
    (formData.firstName ? 15 : 0) +
    (formData.bio ? 20 : 0) +
    (avatarUrl ? 20 : 0) +
    (education.university ? 15 : 0) +
    (preferences.targetRoles.length > 0 ? 15 : 0) +
    (formData.linkedinUrl || formData.githubUrl ? 15 : 0)
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-on-surface-variant text-sm" style={{ fontFamily: "Inter" }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md px-4 md:px-8 h-16 flex items-center border-b border-outline-variant/30">
        <h1 className="text-2xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Profile Settings</h1>
      </header>

      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left Column ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">

              {/* Avatar + Name */}
              <div className="flex items-center gap-4 border-b border-outline-variant/40 pb-6 mb-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                    {avatarUrl ? (
                      <img className="w-full h-full object-cover" src={avatarUrl} alt="Profile" />
                    ) : (
                      <div className="w-full h-full bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl">person</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleAvatarUpload}
                    disabled={avatarUploading}
                    className="absolute -bottom-1 -right-1 bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface-container-lowest hover:bg-primary/90 transition-colors disabled:opacity-60"
                    title="Change photo"
                  >
                    {avatarUploading
                      ? <span className="w-3 h-3 border border-on-primary border-t-transparent rounded-full animate-spin" />
                      : <span className="material-symbols-outlined text-[13px]">edit</span>
                    }
                  </button>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-on-surface truncate" style={{ fontFamily: "Manrope" }}>
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5 font-medium" style={{ fontFamily: "JetBrains Mono" }}>
                    {education.degree ? education.degree.split(" ")[0] : "Student"}
                    {education.graduationYear ? `, '${education.graduationYear.slice(2)}` : ""}
                  </p>
                </div>
              </div>

              {/* Section Nav */}
              <nav className="space-y-0.5">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "security") window.location.href = "/settings/security";
                      else setActiveSection(item.id);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-on-surface-variant hover:bg-surface-variant"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span className="text-sm font-medium" style={{ fontFamily: "JetBrains Mono" }}>{item.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[16px] opacity-50">chevron_right</span>
                  </button>
                ))}
              </nav>

              {/* Profile Strength */}
              <div className="mt-6 pt-5 border-t border-outline-variant/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>Profile Strength</span>
                  <span className="text-xs font-bold text-primary" style={{ fontFamily: "JetBrains Mono" }}>{profileStrength}%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${profileStrength}%` }}
                  />
                </div>
                {profileStrength < 100 && (
                  <p className="text-[11px] text-outline mt-2" style={{ fontFamily: "JetBrains Mono" }}>
                    {profileStrength < 50 ? "Add your education and preferences to boost your profile" :
                     profileStrength < 80 ? "Add social links to reach 100%" :
                     "Almost there! Complete all sections"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Global save message */}
            {message.text && (
              <div className={`px-4 py-3 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-error/10 text-error border border-error/20"
              }`} style={{ fontFamily: "Inter" }}>
                {message.text}
              </div>
            )}

            {/* ── Section: Public Profile ── */}
            {activeSection === "public-profile" && (
              <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border-l-4 border-l-primary">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Public Profile</h2>
                  <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: "Inter" }}>
                    This information will be displayed publicly to recruiters and peers.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSaveProfile(); }}>
                  {/* Name row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>First Name</label>
                      <input
                        value={formData.firstName}
                        onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface"
                        style={{ fontFamily: "Inter" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>Last Name</label>
                      <input
                        value={formData.lastName}
                        onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface"
                        style={{ fontFamily: "Inter" }}
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-medium text-on-surface" style={{ fontFamily: "JetBrains Mono" }}>Bio</label>
                      <span className="text-xs text-outline" style={{ fontFamily: "JetBrains Mono" }}>{formData.bio.length} / 300 characters</span>
                    </div>
                    <textarea
                      value={formData.bio}
                      maxLength={300}
                      onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface resize-none"
                      style={{ fontFamily: "Inter" }}
                      rows={4}
                      placeholder="Tell recruiters and peers about yourself..."
                    />
                  </div>

                  {/* Social Links */}
                  <div>
                    <label className="block text-xs font-medium text-on-surface mb-3" style={{ fontFamily: "JetBrains Mono" }}>Social Links</label>
                    <div className="space-y-3">
                      {[
                        { key: "portfolioUrl", icon: "link", placeholder: "Portfolio URL", iconBg: "bg-surface-container" },
                        { key: "linkedinUrl", icon: "work", placeholder: "LinkedIn URL", iconBg: "bg-[#0077B5]/10", iconColor: "text-[#0077B5]" },
                        { key: "githubUrl", icon: "code", placeholder: "GitHub URL", iconBg: "bg-surface-container", iconColor: "text-on-surface-variant" },
                      ].map(({ key, icon, placeholder, iconBg, iconColor }) => (
                        <div key={key} className="flex items-center gap-3 bg-surface px-3 py-2 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                          <div className={`w-8 h-8 rounded ${iconBg} flex items-center justify-center flex-shrink-0`}>
                            <span className={`material-symbols-outlined text-[18px] ${iconColor || "text-on-surface-variant"}`}>{icon}</span>
                          </div>
                          <input
                            value={(formData as any)[key]}
                            onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                            className="flex-1 bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline"
                            placeholder={placeholder}
                            style={{ fontFamily: "Inter" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-primary hover:bg-primary/90 text-on-primary font-medium px-6 py-2.5 rounded-lg transition-all shadow-sm disabled:opacity-70 active:scale-[0.98]"
                      style={{ fontFamily: "Inter" }}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* ── Section: Education ── */}
            {activeSection === "education" && (
              <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border-l-4 border-l-[#f59e0b]">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Education</h2>
                  <p className="text-sm text-on-surface-variant mt-1" style={{ fontFamily: "Inter" }}>Update your current academic standing.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>University / College Name</label>
                    <div className="flex items-center gap-3 bg-surface px-4 py-2.5 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant flex-shrink-0">school</span>
                      <input
                        value={education.university}
                        onChange={e => setEducation(p => ({ ...p, university: e.target.value }))}
                        className="flex-1 bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline"
                        placeholder="e.g. State University Institute of Technology"
                        style={{ fontFamily: "Inter" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>Degree</label>
                      <div className="relative">
                        <select
                          value={education.degree}
                          onChange={e => setEducation(p => ({ ...p, degree: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface appearance-none cursor-pointer"
                          style={{ fontFamily: "Inter" }}
                        >
                          {DEGREES.map(d => <option key={d}>{d}</option>)}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>Graduation Year</label>
                      <div className="relative">
                        <select
                          value={education.graduationYear}
                          onChange={e => setEducation(p => ({ ...p, graduationYear: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface appearance-none cursor-pointer"
                          style={{ fontFamily: "Inter" }}
                        >
                          {GRAD_YEARS.map(y => <option key={y}>{y}</option>)}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-primary hover:bg-primary/90 text-on-primary font-medium px-6 py-2.5 rounded-lg transition-all shadow-sm disabled:opacity-70 active:scale-[0.98]"
                      style={{ fontFamily: "Inter" }}
                    >
                      {saving ? "Saving..." : "Update Education"}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ── Section: Preferences ── */}
            {activeSection === "preferences" && (
              <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border-l-4 border-l-[#f59e0b]">
                <div className="mb-6 flex items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Job Preferences</h2>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 uppercase tracking-wider">ACTION NEEDED</span>
                    </div>
                    <p className="text-sm text-on-surface-variant" style={{ fontFamily: "Inter" }}>We use this to recommend relevant opportunities and roadmap content.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Target Roles */}
                  <div>
                    <label className="block text-xs font-medium text-on-surface mb-3" style={{ fontFamily: "JetBrains Mono" }}>Target Roles</label>
                    <div className="flex flex-wrap gap-2">
                      {ROLE_CHIPS.map(role => {
                        const selected = preferences.targetRoles.includes(role);
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleRole(role)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                              selected
                                ? "bg-primary text-on-primary border-primary"
                                : "bg-surface border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                            }`}
                            style={{ fontFamily: "Inter" }}
                          >
                            {selected && <span className="material-symbols-outlined text-[14px]">check</span>}
                            {role}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-dashed border-outline-variant text-outline hover:border-primary hover:text-primary transition-all"
                        style={{ fontFamily: "Inter" }}
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                        Add Role
                      </button>
                    </div>
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="block text-xs font-medium text-on-surface mb-2" style={{ fontFamily: "JetBrains Mono" }}>Preferred Locations</label>
                    <div className="flex items-center gap-3 bg-surface px-4 py-2.5 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant flex-shrink-0">location_on</span>
                      <input
                        value={preferences.preferredLocation}
                        onChange={e => setPreferences(p => ({ ...p, preferredLocation: e.target.value }))}
                        className="flex-1 bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline"
                        placeholder="e.g. Remote, Bangalore, Hyderabad"
                        style={{ fontFamily: "Inter" }}
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-4">
                    {[
                      {
                        key: "activelyLooking",
                        label: "Actively looking for jobs",
                        desc: "Your profile will be highlighted to verified recruiters.",
                      },
                      {
                        key: "emailNotifications",
                        label: "Receive email notifications",
                        desc: "Get alerts for new job postings matching your preferences.",
                      },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-outline-variant/30 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-on-surface" style={{ fontFamily: "Inter" }}>{label}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5" style={{ fontFamily: "Inter" }}>{desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreferences(p => ({ ...p, [key]: !(p as any)[key] }))}
                          className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                            (preferences as any)[key] ? "bg-primary" : "bg-surface-variant"
                          }`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            (preferences as any)[key] ? "translate-x-6" : ""
                          }`} />
                          {(preferences as any)[key] && (
                            <span className="absolute top-1/2 left-1.5 -translate-y-1/2">
                              <span className="material-symbols-outlined text-on-primary text-[11px]">check</span>
                            </span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-primary hover:bg-primary/90 text-on-primary font-medium px-6 py-2.5 rounded-lg transition-all shadow-sm disabled:opacity-70"
                      style={{ fontFamily: "Inter" }}
                    >
                      {saving ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
