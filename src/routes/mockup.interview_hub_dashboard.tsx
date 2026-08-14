import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/interview_hub_dashboard")({
  component: InterviewHubDashboardPage,
});

function InterviewHubDashboardPage() {
  return (
    <>
      <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/80 dark:bg-background/80 backdrop-blur-md flex justify-between items-center px-8 z-40 hidden md:flex border-none">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-64 focus-within:ring-2 focus-within:ring-primary/20 rounded-full transition-all">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
              search
            </span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:ring-0"
              placeholder="Search PlacePro..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:text-primary transition-all relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-surface"></span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">workspace_premium</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
            <img
              alt="Student Avatar"
              className="w-full h-full object-cover"
              data-alt="A close-up, high-quality, brightly lit corporate headshot of a young professional student with a neutral expression, set against a pristine, solid light-mode background. The lighting is soft and flattering, emphasizing a clean, modern aesthetic suitable for a premium SaaS career platform."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaBjiIYuPJY2TYOE2-pqXaT525BH2Qfg0w2Qq8uxsSdZksJQ9sVy0nZUOo3PF5MbxcwOFeDZCPWWW9sPRs6lzn-sb_rwPD9i28nUZH4kSFsm94lqJhV2dIonpWyEft56t-qFsct0YMsEXZY6nLDtDqlkwtXu6f3C5Hp1F1ie_oMFwFtAQ70HKlYMQoUz7lCAe2HS2zMoRbQAAZ37uc5kaCRYAQ8cNukxrRsAWFDikdLzwxjALC3eoCVA"
            />
          </div>
        </div>
      </header>

      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex flex-col py-6 px-4 overflow-y-auto z-50 hidden md:flex border-none">
        <div className="mb-8 px-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined icon-fill">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-headline-md font-display-lg font-extrabold text-primary">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Career OS
            </p>
          </div>
        </div>
        <button className="mb-6 mx-2 bg-primary hover:bg-primary/90 text-on-primary rounded-xl py-3 px-4 font-body-md text-body-md font-semibold transition-transform duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">play_arrow</span>
          Start Practice
        </button>
        <div className="flex-1 flex flex-col gap-1 mt-2">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md font-medium">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span>
            <span className="font-body-md text-body-md font-medium">Feed</span>
          </a>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined icon-fill">video_chat</span>
            <span className="font-body-md text-body-md">Interview Hub</span>
          </a>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-body-md text-body-md font-medium">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            <span className="font-body-md text-body-md font-medium">Arena</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-body-md text-body-md font-medium">Jobs</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-body-md text-body-md font-medium">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-md text-body-md font-medium">Resume</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-body-md text-body-md font-medium">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-body-md text-body-md font-medium">Profile</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-body-md text-body-md font-medium">Rooms</span>
          </a>
        </div>
        <div className="mt-8 pt-4 border-t border-surface-variant flex flex-col gap-1">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-body-md text-body-md font-medium">Settings</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md text-body-md font-medium">Logout</span>
          </a>
        </div>
      </nav>

      <main className="md:ml-sidebar-width pt-16 md:pt-24 min-h-screen px-4 md:px-xl pb-8 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              Interview Hub
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Master your delivery. Track your progress. Land the offer.
            </p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-on-primary rounded-xl py-3 px-6 font-body-md text-body-md font-semibold transition-transform duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto">
            <span className="material-symbols-outlined">add_circle</span>
            Schedule New Interview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
              Practice Modes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest rounded-[16px] p-6 card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary-fixed/40 transition-all"></div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-4 text-primary relative z-10">
                  <span className="material-symbols-outlined text-[28px]">psychology</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2 relative z-10">
                  Behavioral
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
                  STAR method drills, leadership principles, and culture fit simulations.
                </p>
                <div className="flex items-center text-primary font-semibold font-body-md text-body-md relative z-10 group-hover:translate-x-1 transition-transform">
                  Select Mode{" "}
                  <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] p-6 card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-secondary-fixed/40 transition-all"></div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-4 text-secondary relative z-10">
                  <span className="material-symbols-outlined text-[28px]">terminal</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2 relative z-10">
                  Technical
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
                  DSA problems, live coding environments, and algorithmic thinking.
                </p>
                <div className="flex items-center text-secondary font-semibold font-body-md text-body-md relative z-10 group-hover:translate-x-1 transition-transform">
                  Select Mode{" "}
                  <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] p-6 card-shadow border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-tertiary-fixed/40 transition-all"></div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-4 text-tertiary relative z-10">
                  <span className="material-symbols-outlined text-[28px]">architecture</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-2 relative z-10">
                  System Design
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
                  Architecture diagrams, scalability challenges, and trade-off analysis.
                </p>
                <div className="flex items-center text-tertiary font-semibold font-body-md text-body-md relative z-10 group-hover:translate-x-1 transition-transform">
                  Select Mode{" "}
                  <span className="material-symbols-outlined ml-1 text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Upcoming Mock Interviews
              </h3>
              <button className="text-primary font-body-md text-body-md font-medium hover:underline">
                View Calendar
              </button>
            </div>
            <div className="bg-surface-container-lowest rounded-[16px] card-shadow border border-outline-variant/30 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-surface-variant hover:bg-surface-container-low/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex flex-col items-center justify-center shrink-0">
                    <span className="font-label-sm text-label-sm font-bold uppercase">Oct</span>
                    <span className="font-headline-md text-[20px] leading-none font-bold">24</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-headline-md text-[18px] text-on-surface">
                        Behavioral Mock w/ AI
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm">
                        AI Session
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> 2:00
                      PM - 3:00 PM EST
                    </p>
                  </div>
                </div>
                <button className="bg-primary text-on-primary rounded-lg py-2 px-6 font-body-md text-body-md font-medium transition-transform active:scale-[0.98] shrink-0 self-start sm:self-center">
                  Join Now
                </button>
              </div>

              <div className="p-6 border-b border-surface-variant hover:bg-surface-container-low/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-secondary-container">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-on-surface-variant flex flex-col items-center justify-center shrink-0">
                    <span className="font-label-sm text-label-sm font-bold uppercase">Oct</span>
                    <span className="font-headline-md text-[20px] leading-none font-bold">26</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-headline-md text-[18px] text-on-surface">
                        System Design w/ Peer
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container/10 text-secondary-container font-label-sm text-label-sm">
                        Peer Session
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">person</span> Alex
                      Chen (Confirmed)
                    </p>
                  </div>
                </div>
                <button
                  className="bg-surface-variant text-on-surface-variant rounded-lg py-2 px-6 font-body-md text-body-md font-medium cursor-not-allowed shrink-0 self-start sm:self-center"
                  disabled=""
                >
                  Starts in 2d
                </button>
              </div>
              <div className="p-4 text-center">
                <button className="text-on-surface-variant font-body-md text-body-md font-medium hover:text-primary transition-colors">
                  Load More
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Practice History
              </h3>
            </div>
            <div className="bg-surface-container-lowest rounded-[16px] card-shadow border border-outline-variant/30 p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">terminal</span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                      Arrays &amp; Strings
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Oct 20 • Technical
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline-md text-[18px] text-primary">85/100</span>
                  <span className="font-label-sm text-label-sm text-primary flex items-center">
                    <span className="material-symbols-outlined text-[12px]">arrow_upward</span>{" "}
                    Strong
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                      Leadership Qs
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Oct 18 • Behavioral
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline-md text-[18px] text-secondary-container">
                    68/100
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary-container flex items-center">
                    Needs Work
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">architecture</span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                      Chat App Design
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Oct 15 • System Design
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline-md text-[18px] text-primary">92/100</span>
                  <span className="font-label-sm text-label-sm text-primary flex items-center">
                    <span className="material-symbols-outlined text-[12px]">star</span> Excellent
                  </span>
                </div>
              </div>
              <button className="w-full mt-2 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-body-md text-body-md hover:bg-surface-container hover:text-on-surface transition-colors">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
