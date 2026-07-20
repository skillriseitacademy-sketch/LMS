import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/interview/")({
  component: InterviewIndexPage,
});

function InterviewIndexPage() {
  return (
    <div className="pt-8 px-4 md:px-8 pb-8 max-w-container-max mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface mb-2" style={{ fontFamily: "Manrope" }}>Interview Hub</h2>
          <p className="text-lg leading-[1.6] text-on-surface-variant" style={{ fontFamily: "Inter" }}>Master your delivery. Track your progress. Land the offer.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-on-primary rounded-xl py-3 px-6 text-base leading-[1.5] font-semibold transition-transform duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto" style={{ fontFamily: "Inter" }}>
          <span className="material-symbols-outlined">add_circle</span>
          Schedule New Interview
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Practice Modes (Spans full width on top in this bento arrangement) */}
        <div className="lg:col-span-3">
          <h3 className="text-[24px] font-semibold leading-[1.3] text-on-surface mb-4" style={{ fontFamily: "Manrope" }}>Practice Modes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode 1 */}
            <div className="bg-surface-container-lowest rounded-[16px] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary-fixed/40 transition-all"></div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-4 text-primary relative z-10">
                <span className="material-symbols-outlined text-[28px]">psychology</span>
              </div>
              <h4 className="text-[24px] font-semibold leading-[1.3] text-on-surface mb-2 relative z-10" style={{ fontFamily: "Manrope" }}>Behavioral</h4>
              <p className="text-base leading-[1.5] text-on-surface-variant mb-6 relative z-10" style={{ fontFamily: "Inter" }}>STAR method drills, leadership principles, and culture fit simulations.</p>
              <div className="flex items-center text-primary font-semibold text-base leading-[1.5] relative z-10 group-hover:translate-x-1 transition-transform" style={{ fontFamily: "Inter" }}>
                Select Mode <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
              </div>
            </div>
            
            {/* Mode 2 */}
            <div className="bg-surface-container-lowest rounded-[16px] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-secondary-fixed/40 transition-all"></div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-4 text-secondary relative z-10">
                <span className="material-symbols-outlined text-[28px]">terminal</span>
              </div>
              <h4 className="text-[24px] font-semibold leading-[1.3] text-on-surface mb-2 relative z-10" style={{ fontFamily: "Manrope" }}>Technical</h4>
              <p className="text-base leading-[1.5] text-on-surface-variant mb-6 relative z-10" style={{ fontFamily: "Inter" }}>DSA problems, live coding environments, and algorithmic thinking.</p>
              <div className="flex items-center text-secondary font-semibold text-base leading-[1.5] relative z-10 group-hover:translate-x-1 transition-transform" style={{ fontFamily: "Inter" }}>
                Select Mode <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
              </div>
            </div>
            
            {/* Mode 3 */}
            <div className="bg-surface-container-lowest rounded-[16px] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-tertiary-fixed/40 transition-all"></div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-4 text-tertiary relative z-10">
                <span className="material-symbols-outlined text-[28px]">architecture</span>
              </div>
              <h4 className="text-[24px] font-semibold leading-[1.3] text-on-surface mb-2 relative z-10" style={{ fontFamily: "Manrope" }}>System Design</h4>
              <p className="text-base leading-[1.5] text-on-surface-variant mb-6 relative z-10" style={{ fontFamily: "Inter" }}>Architecture diagrams, scalability challenges, and trade-off analysis.</p>
              <div className="flex items-center text-tertiary font-semibold text-base leading-[1.5] relative z-10 group-hover:translate-x-1 transition-transform" style={{ fontFamily: "Inter" }}>
                Select Mode <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Interviews (Larger Column) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[24px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>Upcoming Mock Interviews</h3>
            <button className="text-primary text-base leading-[1.5] font-medium hover:underline" style={{ fontFamily: "Inter" }}>View Calendar</button>
          </div>
          <div className="bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden flex flex-col">
            {/* Session 1 (Active/Soon) */}
            <div className="p-6 border-b border-surface-variant hover:bg-surface-container-low/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs tracking-[0.05em] font-bold uppercase" style={{ fontFamily: "JetBrains Mono" }}>Oct</span>
                  <span className="text-[24px] font-semibold leading-[1.3] leading-none font-bold" style={{ fontFamily: "Manrope" }}>24</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[18px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>Behavioral Mock w/ AI</h4>
                    <span className="px-2 py-0.5 rounded-full bg-primary-container/10 text-primary text-xs tracking-[0.05em] font-medium" style={{ fontFamily: "JetBrains Mono" }}>AI Session</span>
                  </div>
                  <p className="text-base leading-[1.5] text-on-surface-variant flex items-center gap-1" style={{ fontFamily: "Inter" }}>
                    <span className="material-symbols-outlined text-[16px]">schedule</span> 2:00 PM - 3:00 PM EST
                  </p>
                </div>
              </div>
              <button className="bg-primary text-on-primary rounded-lg py-2 px-6 text-base leading-[1.5] font-medium transition-transform active:scale-[0.98] shrink-0 self-start sm:self-center" style={{ fontFamily: "Inter" }}>
                Join Now
              </button>
            </div>
            
            {/* Session 2 (Pending) */}
            <div className="p-6 border-b border-surface-variant hover:bg-surface-container-low/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-secondary-container">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface-variant flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs tracking-[0.05em] font-bold uppercase" style={{ fontFamily: "JetBrains Mono" }}>Oct</span>
                  <span className="text-[24px] font-semibold leading-[1.3] leading-none font-bold" style={{ fontFamily: "Manrope" }}>26</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[18px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>System Design w/ Peer</h4>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/10 text-secondary-container text-xs tracking-[0.05em] font-medium" style={{ fontFamily: "JetBrains Mono" }}>Peer Session</span>
                  </div>
                  <p className="text-base leading-[1.5] text-on-surface-variant flex items-center gap-1" style={{ fontFamily: "Inter" }}>
                    <span className="material-symbols-outlined text-[16px]">person</span> Alex Chen (Confirmed)
                  </p>
                </div>
              </div>
              <button className="bg-surface-variant text-on-surface-variant rounded-lg py-2 px-6 text-base leading-[1.5] font-medium cursor-not-allowed shrink-0 self-start sm:self-center" style={{ fontFamily: "Inter" }} disabled>
                Starts in 2d
              </button>
            </div>
            <div className="p-4 text-center">
              <button className="text-on-surface-variant text-base leading-[1.5] font-medium hover:text-primary transition-colors" style={{ fontFamily: "Inter" }}>Load More</button>
            </div>
          </div>
        </div>

        {/* Practice History (Smaller Column) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[24px] font-semibold leading-[1.3] text-on-surface" style={{ fontFamily: "Manrope" }}>Practice History</h3>
          </div>
          <div className="bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-6 flex flex-col gap-4">
            {/* History Item 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </div>
                <div>
                  <h4 className="text-base leading-[1.5] font-semibold text-on-surface group-hover:text-primary transition-colors" style={{ fontFamily: "Inter" }}>Arrays & Strings</h4>
                  <p className="text-xs tracking-[0.05em] font-medium text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>Oct 20 • Technical</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[18px] font-semibold leading-[1.3] text-primary" style={{ fontFamily: "Manrope" }}>85/100</span>
                <span className="text-xs tracking-[0.05em] font-medium text-primary flex items-center" style={{ fontFamily: "JetBrains Mono" }}><span className="material-symbols-outlined text-[12px]">arrow_upward</span> Strong</span>
              </div>
            </div>
            
            {/* History Item 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h4 className="text-base leading-[1.5] font-semibold text-on-surface group-hover:text-primary transition-colors" style={{ fontFamily: "Inter" }}>Leadership Qs</h4>
                  <p className="text-xs tracking-[0.05em] font-medium text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>Oct 18 • Behavioral</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[18px] font-semibold leading-[1.3] text-secondary-container" style={{ fontFamily: "Manrope" }}>68/100</span>
                <span className="text-xs tracking-[0.05em] font-medium text-secondary-container flex items-center" style={{ fontFamily: "JetBrains Mono" }}>Needs Work</span>
              </div>
            </div>
            
            {/* History Item 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">architecture</span>
                </div>
                <div>
                  <h4 className="text-base leading-[1.5] font-semibold text-on-surface group-hover:text-primary transition-colors" style={{ fontFamily: "Inter" }}>Chat App Design</h4>
                  <p className="text-xs tracking-[0.05em] font-medium text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>Oct 15 • System Design</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[18px] font-semibold leading-[1.3] text-primary" style={{ fontFamily: "Manrope" }}>92/100</span>
                <span className="text-xs tracking-[0.05em] font-medium text-primary flex items-center" style={{ fontFamily: "JetBrains Mono" }}><span className="material-symbols-outlined text-[12px]">star</span> Excellent</span>
              </div>
            </div>
            
            <button className="w-full mt-2 py-2 rounded-lg border border-outline-variant text-on-surface-variant text-base leading-[1.5] hover:bg-surface-container hover:text-on-surface transition-colors" style={{ fontFamily: "Inter" }}>
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
