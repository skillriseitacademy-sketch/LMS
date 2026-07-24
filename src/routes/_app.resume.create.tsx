import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { MinimalistTemplate } from "@/components/resume/templates/MinimalistTemplate";
import { ModernistTemplate } from "@/components/resume/templates/ModernistTemplate";
import { ExecutiveTemplate } from "@/components/resume/templates/ExecutiveTemplate";

export const Route = createFileRoute("/_app/resume/create")({
  component: ResumeEditorPage,
});

function ResumeEditorPage() {
  const { session } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState("Minimalist");
  const [resumeData, setResumeData] = useState({
    firstName: "",
    lastName: "",
    title: "Software Engineering Intern",
    email: "",
    phone: "(555) 123-4567",
    experiences: [
      {
        id: "1",
        title: "Software Engineering Intern",
        employer: "TechNova Solutions",
        startDate: "2023-05",
        endDate: "2023-08",
        description: "Developed internal dashboard using React and Node.js.\nImproved API response time by 15% through query optimization.\nCollaborated with UX team to implement responsive design features."
      }
    ]
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session) {
      const parts = session.name ? session.name.split(" ") : ["", ""];
      setResumeData(prev => ({
        ...prev,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        email: session.email || ""
      }));
    }
  }, [session]);

  const handleUpdate = (field: string, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpUpdate = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const saveResumeToDatabase = async () => {
    if (!session?.id) return;
    setSaving(true);
    await supabase.from("resumes").upsert({
      user_id: session.id,
      title: `${resumeData.firstName}'s Resume`,
      content: resumeData
    });
    setSaving(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full transition-all duration-300">
      {/* TopAppBar */}
      <header className="bg-surface border-b border-outline-variant/30 flex justify-between items-center w-full h-16 px-4 md:px-8 sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Resume Builder</h1>
          <span className="hidden md:flex items-center gap-1 text-label-sm font-label-sm bg-surface-container-highest text-primary px-2 py-1 rounded-full uppercase tracking-wide ml-2">
            <span className="material-symbols-outlined text-[14px]">{saving ? 'sync' : 'save'}</span> {saving ? 'Saving...' : 'Auto-saved'}
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <select 
            value={selectedTemplate} 
            onChange={e => setSelectedTemplate(e.target.value)}
            className="hidden md:block bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-sm text-on-surface font-medium outline-none focus:border-primary"
          >
            <option value="Minimalist">The Minimalist</option>
            <option value="Modernist">The Modernist</option>
            <option value="Executive">The Executive</option>
          </select>
          <button onClick={saveResumeToDatabase} disabled={saving} className="flex items-center gap-2 bg-surface-container text-on-surface px-4 py-2 rounded-lg font-body-md font-medium hover:bg-surface-container-high transition-all">
            Save to DB
          </button>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-body-md font-medium hover:bg-surface-tint transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      {/* Builder Workspace: Split Pane */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-surface-container-low h-[calc(100vh-64px)]">
        
        {/* Left Pane: Editor Form */}
        <section className="w-full lg:w-1/2 flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant/30 z-10 relative overflow-y-auto">
          <div className="p-4 md:p-8 space-y-8">
            
            {/* Section: Personal Info */}
            <div className="bg-surface-bright rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-outline-variant/20 bg-surface flex justify-between items-center cursor-pointer hover:bg-surface-container-lowest transition-colors">
                <h2 className="font-headline-md text-lg font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">person</span> Personal Details
                </h2>
                <span className="material-symbols-outlined text-outline">expand_less</span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">First Name</label>
                  <input value={resumeData.firstName} onChange={e => handleUpdate('firstName', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Last Name</label>
                  <input value={resumeData.lastName} onChange={e => handleUpdate('lastName', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="text" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Professional Title</label>
                  <input value={resumeData.title} onChange={e => handleUpdate('title', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Email</label>
                  <input value={resumeData.email} onChange={e => handleUpdate('email', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="email" />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Phone</label>
                  <input value={resumeData.phone} onChange={e => handleUpdate('phone', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="tel" />
                </div>
              </div>
            </div>
            
            {/* Section: Experience */}
            <div className="bg-surface-bright rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden border-l-4 border-l-primary">
              <div className="px-6 py-4 border-b border-outline-variant/20 bg-surface flex justify-between items-center cursor-pointer hover:bg-surface-container-lowest transition-colors">
                <h2 className="font-headline-md text-lg font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">work</span> Work Experience
                </h2>
                <span className="material-symbols-outlined text-outline">expand_less</span>
              </div>
              <div className="p-6 space-y-6">
                
                {resumeData.experiences.map((exp, idx) => (
                  <div key={exp.id} className="border border-outline-variant/30 rounded-lg p-4 relative group hover:border-primary/50 transition-colors">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-on-surface-variant hover:text-primary rounded"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                      <button className="p-1 text-on-surface-variant hover:text-error rounded"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase">Job Title</label>
                        <input value={exp.title} onChange={e => handleExpUpdate(exp.id, 'title', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="text" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase">Employer</label>
                        <input value={exp.employer} onChange={e => handleExpUpdate(exp.id, 'employer', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="text" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase">Start Date</label>
                        <input value={exp.startDate} onChange={e => handleExpUpdate(exp.id, 'startDate', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="month" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase">End Date</label>
                        <input value={exp.endDate} onChange={e => handleExpUpdate(exp.id, 'endDate', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" type="month" />
                      </div>
                    </div>
                    <div className="space-y-1 relative">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase">Description</label>
                      <textarea value={exp.description} onChange={e => handleExpUpdate(exp.id, 'description', e.target.value)} className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none leading-relaxed" rows={4}></textarea>
                    </div>
                  </div>
                ))}

                <button className="w-full py-2 border-2 border-dashed border-outline-variant/50 rounded-lg text-on-surface-variant font-body-md font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors hover:bg-surface-container-low">
                  <span className="material-symbols-outlined">add</span> Add Experience
                </button>
              </div>
            </div>
            
          </div>
        </section>

        {/* Right Pane: Live Preview & AI Overlay */}
        <section className="hidden lg:flex lg:w-1/2 h-full relative flex-col items-center justify-start p-8 overflow-y-auto bg-surface-variant/30">
          
          {/* AI Floating Assistant */}
          <div className="absolute top-4 right-4 bg-surface-container-lowest shadow-md rounded-2xl p-4 w-72 border border-primary-container z-20 transition-all">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </div>
              <div>
                <p className="font-body-sm text-sm text-on-surface">Consider adding metrics to your TechNova experience to increase impact score by ~15%.</p>
                <button className="mt-2 text-xs font-label-sm text-primary font-medium hover:underline">Apply suggestion</button>
              </div>
            </div>
          </div>

          {/* The A4 Resume Preview Page */}
          <div className="w-[800px] min-h-[1056px] bg-white shadow-xl origin-top scale-[0.6] xl:scale-[0.75] transition-transform flex-shrink-0" style={{ transformOrigin: 'top center' }}>
            {selectedTemplate === "Minimalist" && <MinimalistTemplate data={resumeData} />}
            {selectedTemplate === "Modernist" && <ModernistTemplate data={resumeData} />}
            {selectedTemplate === "Executive" && <ExecutiveTemplate data={resumeData} />}
          </div>
        </section>
        
      </main>
    </div>
  );
}
