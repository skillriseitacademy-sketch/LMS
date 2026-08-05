import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/career_roadmap")({
  component: CareerRoadmapPage,
});

function CareerRoadmapPage() {
  return (
    <>
      <div className="flex h-screen w-full">
        <nav className="hidden md:flex flex-col h-full p-md gap-base overflow-y-auto fixed left-0 top-0 w-sidebar-width bg-surface-container-low dark:bg-surface-container-lowest shadow-md z-20">
          <div className="flex flex-col items-center justify-center mb-xl mt-md">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-primary-container p-1">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
                data-alt="A stylized 3D avatar of a young student professional in a casual yet smart outfit, wearing glasses and a slight smile. Clean white background with soft studio lighting. Minimalist corporate modern style."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsvr_ItD5-BMxkLRCgPJhfANEj9LiSS8y0hXGiI-DRuPzaF-e-u3jThM-f_iwFeMSXrkT8ZH9WwdGCAYFUmUWxq-mTq7GhrSdLHLTrsM_35S-hOWnJqe2Z3rEbofQH_AKXQY4BksqUIBPRptBnHepipByqo7m7pjLuEw66eM2Riiqfttl45T2IW618Ff2_8QPK9fEALKtt62hodJQE6Shsn-bk6i7HCsAU9cLnkX6XK4BQ0I-su2TdnA"
              />
            </div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary">
              PlacePro Career OS
            </h1>
            <p className="text-label-sm font-label-sm text-secondary bg-secondary-fixed py-1 px-3 rounded-full mt-2">
              Rank: #42 | 2500 XP
            </p>
          </div>

          <ul className="flex flex-col gap-1 w-full flex-grow">
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-body-md text-body-md">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="font-body-md text-body-md">Feed</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">video_chat</span>
                <span className="font-body-md text-body-md">Interview Hub</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">quiz</span>
                <span className="font-body-md text-body-md">Quizzes</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">live_tv</span>
                <span className="font-body-md text-body-md">Live Classes</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">sports_esports</span>
                <span className="font-body-md text-body-md">Arena</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">work</span>
                <span className="font-body-md text-body-md">Jobs</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm bg-primary-container text-on-primary-container font-bold rounded-lg translate-x-1 transition-transform"
                href="#"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  map
                </span>
                <span className="font-body-md text-body-md">Roadmap</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">description</span>
                <span className="font-body-md text-body-md">Resume</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">leaderboard</span>
                <span className="font-body-md text-body-md">Leaderboard</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="font-body-md text-body-md">Profile</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">groups</span>
                <span className="font-body-md text-body-md">Rooms</span>
              </a>
            </li>
          </ul>

          <div className="mt-auto pt-md">
            <button className="w-full bg-primary text-on-primary py-sm px-md rounded-lg font-body-md text-body-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
              Upgrade to Pro
            </button>
          </div>
        </nav>

        <main className="ml-0 md:ml-[280px] flex-1 flex h-full relative grid-pattern bg-background overflow-hidden">
          <div
            className="flex-1 relative overflow-auto p-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
            id="roadmap-canvas"
          >
            <div className="relative min-w-[1000px] min-h-[800px] flex items-center justify-center">
              <div className="absolute z-10 flex flex-col items-center cursor-pointer group">
                <div className="w-24 h-24 bg-surface-container-lowest rounded-full flex items-center justify-center node-shadow border-4 border-secondary-container transition-transform group-hover:scale-105">
                  <span
                    className="material-symbols-outlined text-4xl text-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    school
                  </span>
                </div>
                <div className="mt-3 bg-surface-container-lowest px-4 py-2 rounded-lg node-shadow text-center">
                  <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider block mb-1">
                    Current Status
                  </span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">
                    B.Tech 3rd Year
                  </span>
                </div>
              </div>

              <div className="tree-line-horizontal w-64 left-1/2 ml-12"></div>
              <div className="tree-line-horizontal w-64 right-1/2 mr-12 bg-outline-variant"></div>
              <div className="tree-line-vertical h-64 top-1/2 mt-12 bg-outline-variant"></div>

              <div className="absolute z-10 right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                <div className="absolute left-full top-12 w-16 h-0.5 bg-primary"></div>
                <div className="absolute left-[calc(100%+4rem)] top-12 w-0.5 h-32 bg-primary -translate-y-1/2"></div>
                <div className="absolute left-[calc(100%+4rem)] top-[-2rem] w-8 h-0.5 bg-primary"></div>
                <div className="absolute left-[calc(100%+4rem)] top-[5rem] w-8 h-0.5 bg-primary"></div>
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center node-shadow ring-4 ring-primary-container ring-opacity-30 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl text-on-primary">code</span>
                </div>
                <div className="mt-3 bg-surface-container-lowest px-4 py-2 rounded-lg node-shadow border border-primary-container text-center max-w-[150px]">
                  <span className="font-body-md text-body-md font-semibold text-primary">
                    Software Eng.
                  </span>
                </div>

                <div className="absolute left-[calc(100%+6rem)] top-[-4rem] flex items-center gap-2">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-on-secondary node-shadow">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                  <span className="bg-surface-container-lowest px-2 py-1 rounded text-label-sm font-label-sm shadow-sm whitespace-nowrap border-l-2 border-secondary">
                    Master DSA
                  </span>
                </div>
                <div className="absolute left-[calc(100%+6rem)] top-[3rem] flex items-center gap-2">
                  <div className="w-12 h-12 bg-surface-container-lowest border-2 border-primary rounded-full flex items-center justify-center text-primary node-shadow">
                    <span className="material-symbols-outlined text-xl">work</span>
                  </div>
                  <span className="bg-surface-container-lowest px-2 py-1 rounded text-label-sm font-label-sm shadow-sm whitespace-nowrap border-l-2 border-primary">
                    TechCorp Intern
                  </span>
                </div>
              </div>

              <div className="absolute z-10 left-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-surface-container-lowest border-2 border-outline rounded-full flex items-center justify-center node-shadow transition-transform group-hover:scale-105">
                  <span className="material-symbols-outlined text-2xl text-outline">analytics</span>
                </div>
                <div className="mt-3 bg-surface-container-lowest px-3 py-1.5 rounded-lg node-shadow text-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Data Scientist
                  </span>
                </div>
              </div>

              <div className="absolute z-10 bottom-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-surface-container-lowest border-2 border-outline rounded-full flex items-center justify-center node-shadow transition-transform group-hover:scale-105">
                  <span className="material-symbols-outlined text-2xl text-outline">lightbulb</span>
                </div>
                <div className="mt-3 bg-surface-container-lowest px-3 py-1.5 rounded-lg node-shadow text-center">
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Product Mgr
                  </span>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-[360px] bg-surface-container-lowest shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-l border-outline-variant flex flex-col z-20 transition-transform duration-300 transform translate-x-0">
            <div className="p-lg border-b border-outline-variant flex justify-between items-start bg-surface-bright">
              <div>
                <span className="inline-block bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm px-2 py-1 rounded uppercase tracking-wider mb-2">
                  Target Role
                </span>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  Software Development Engineer
                </h2>
              </div>
              <button className="text-on-surface-variant hover:bg-surface-variant p-1 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-xl">
              <div>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  The core engineering path focused on building robust scalable systems. Demands
                  strong fundamentals in algorithms and system design.
                </p>
              </div>

              <div>
                <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-widest mb-sm">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-full text-label-sm font-label-sm border border-outline-variant/50">
                    Data Structures
                  </span>
                  <span className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-full text-label-sm font-label-sm border border-outline-variant/50">
                    Algorithms
                  </span>
                  <span className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-full text-label-sm font-label-sm border border-outline-variant/50">
                    System Design
                  </span>
                  <span className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-full text-label-sm font-label-sm border border-outline-variant/50">
                    Java / C++
                  </span>
                  <span className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-full text-label-sm font-label-sm border border-outline-variant/50">
                    REST APIs
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-label-sm font-label-sm text-outline uppercase tracking-widest mb-sm">
                  Milestones
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="bg-surface-container-low p-sm rounded-lg flex gap-3 items-center border-l-4 border-secondary">
                    <div className="w-10 h-10 rounded bg-secondary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary-container">
                        check_circle
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body-md font-body-md font-medium text-on-surface line-through decoration-outline-variant text-opacity-70">
                        Master DSA
                      </h4>
                      <p className="text-label-sm font-label-sm text-secondary">
                        Completed • 500 XP
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface-container-high p-sm rounded-lg flex gap-3 items-center border-l-4 border-primary">
                    <div className="w-10 h-10 rounded bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">work_history</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body-md font-body-md font-bold text-on-surface">
                        Build Portfolio Project
                      </h4>
                      <p className="text-label-sm font-label-sm text-primary">In Progress • 60%</p>
                    </div>
                    <button className="text-primary hover:bg-primary-fixed p-2 rounded-full transition-colors">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>

                  <div className="bg-surface border border-outline-variant border-dashed p-sm rounded-lg flex gap-3 items-center opacity-70">
                    <div className="w-10 h-10 rounded bg-surface-dim flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-outline">lock</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body-md font-body-md font-medium text-on-surface-variant">
                        Internship at TechCorp
                      </h4>
                      <p className="text-label-sm font-label-sm text-outline">
                        Prerequisite: Portfolio
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-lg border-t border-outline-variant bg-surface-container-lowest">
              <button className="w-full group relative overflow-hidden bg-surface-container-low text-primary border border-primary-container py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm">
                <span className="material-symbols-outlined">magic_button</span>
                <span className="font-body-md text-body-md font-semibold">AI Regenerate Path</span>

                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
              <p className="text-center text-label-sm font-label-sm text-outline mt-3">
                Tailor this path to your current skills
              </p>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
