import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/jobs_board_application_tracker")({
  component: JobsBoardApplicationTrackerPage,
});

function JobsBoardApplicationTrackerPage() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-full py-lg px-md w-sidebar-width overflow-y-auto bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] z-50 flex-shrink-0">
        <div className="mb-xl flex items-center gap-sm">
          <span className="font-display-lg text-headline-md font-extrabold text-primary">
            PlacePro
          </span>
        </div>
        <div className="flex-1 space-y-sm">
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span>
            <span className="font-label-sm text-label-sm">Feed</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">video_chat</span>
            <span className="font-label-sm text-label-sm">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-label-sm text-label-sm">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            <span className="font-label-sm text-label-sm">Arena</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low active:scale-[0.98] transition-transform duration-150"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-label-sm text-label-sm">Jobs</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-label-sm text-label-sm">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-label-sm text-label-sm">Resume</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-label-sm text-label-sm">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-sm text-label-sm">Profile</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-label-sm text-label-sm">Rooms</span>
          </a>
        </div>
        <div className="mt-auto space-y-sm pt-md border-t border-surface-container-high">
          <button className="w-full bg-primary text-on-primary py-sm rounded-lg font-label-sm text-label-sm hover:bg-primary-container transition-colors active:scale-[0.98]">
            Start Practice
          </button>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-sm text-label-sm">Logout</span>
          </a>
        </div>
      </nav>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex justify-between items-center px-xl w-full h-16 z-40 bg-surface/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-md md:hidden">
            <span className="font-display-lg text-headline-md font-black text-primary">
              PlacePro
            </span>
          </div>
          <div className="hidden md:flex items-center flex-1 max-w-md mx-xl">
            <div className="relative w-full focus-within:ring-2 focus-within:ring-primary/20 rounded-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full text-body-md font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Search jobs, companies, or resources..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-md ml-auto">
            <button className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-container-low">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-all p-2 rounded-full hover:bg-surface-container-low">
              <span className="material-symbols-outlined">workspace_premium</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ml-sm border-2 border-surface-container-highest">
              <img
                alt="Student Avatar"
                className="w-full h-full object-cover"
                data-alt="A professional headshot of a young student in a modern SaaS application header. Clean lighting, soft background."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjwZxl3CjUTrybg0PekgDzUoVfOLs9kJlRi7qrv3y2-neqqJqPfXpqwckPukhb2KX33AkAbWi7OUdqkWp267wKLsUrS_2-w0SpvMcZYW6uKmJuTJdWHPi4q3uVTNBUTgCaYxgPW-ZhZ25eyWyx5ZabWBZa4DEqfzEjtJu0tZ6RNPyqATtncaHor47VfLQhlgykKidbiTz08cAZNrhoN9v0khCkAuhmjP7iq0ymA77mgLCucc3dByyn2g"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-auto overflow-y-hidden p-xl">
          <div className="mb-lg flex justify-between items-end">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-background">
                Job Applications
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                Track your progress and access interview prep resources.
              </p>
            </div>
            <div className="flex gap-sm">
              <button className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span> Filter
              </button>
              <button className="px-md py-sm bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary-container active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-sm">add</span> New App
              </button>
            </div>
          </div>

          <div className="flex gap-lg h-[calc(100%-80px)] pb-md">
            <div className="flex flex-col min-w-[320px] w-[320px] bg-surface-container/30 rounded-xl p-md border border-surface-container-high kanban-col-bg">
              <div className="flex justify-between items-center mb-md">
                <div className="flex items-center gap-sm">
                  <span className="w-3 h-3 rounded-full bg-outline"></span>
                  <h2 className="font-headline-md text-[16px] font-semibold text-on-background">
                    Applied
                  </h2>
                  <span className="px-2 py-1 bg-surface-container-highest rounded-full text-xs font-label-sm text-on-surface-variant">
                    2
                  </span>
                </div>
                <button className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-md pr-sm custom-scrollbar">
                <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-l-4 border-outline cursor-pointer hover:shadow-md transition-shadow group relative">
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex items-center gap-xs">
                      <div className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-surface">
                        G
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Google
                      </span>
                    </div>
                    <span className="text-xs text-outline font-label-sm">2d ago</span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-background mb-xs">
                    Software Engineer, New Grad
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-md font-body-md line-clamp-1">
                    Mountain View, CA
                  </p>
                  <div className="pt-sm border-t border-surface-container-highest flex items-center justify-between">
                    <span className="text-xs font-label-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">history</span>{" "}
                      Awaiting response
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-l-4 border-outline cursor-pointer hover:shadow-md transition-shadow group relative">
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex items-center gap-xs">
                      <div className="w-6 h-6 rounded bg-[#E1F5FE] flex items-center justify-center text-xs font-bold text-[#0288D1]">
                        S
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Stripe
                      </span>
                    </div>
                    <span className="text-xs text-outline font-label-sm">1w ago</span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-background mb-xs">
                    Backend Developer
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-md font-body-md line-clamp-1">
                    Remote
                  </p>
                  <div className="pt-sm border-t border-surface-container-highest flex items-center justify-between">
                    <span className="text-xs font-label-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">history</span>{" "}
                      Awaiting response
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[320px] w-[320px] bg-surface-container/30 rounded-xl p-md border border-surface-container-high kanban-col-bg">
              <div className="flex justify-between items-center mb-md">
                <div className="flex items-center gap-sm">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <h2 className="font-headline-md text-[16px] font-semibold text-on-background">
                    Online Assessment
                  </h2>
                  <span className="px-2 py-1 bg-surface-container-highest rounded-full text-xs font-label-sm text-on-surface-variant">
                    1
                  </span>
                </div>
                <button className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-md pr-sm custom-scrollbar">
                <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-l-4 border-secondary-container cursor-pointer hover:shadow-md transition-shadow group relative">
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex items-center gap-xs">
                      <div className="w-6 h-6 rounded bg-[#FFF3E0] flex items-center justify-center text-xs font-bold text-[#F57C00]">
                        A
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Amazon
                      </span>
                    </div>
                    <span className="text-xs text-secondary font-label-sm bg-secondary-fixed px-1.5 py-0.5 rounded">
                      Due in 3d
                    </span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-background mb-xs">
                    SDE I
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-md font-body-md line-clamp-1">
                    Seattle, WA
                  </p>
                  <div className="p-sm bg-surface-container-lowest border border-outline-variant rounded-lg mb-sm">
                    <p className="text-xs font-label-sm text-on-surface-variant mb-1">Next Step:</p>
                    <p className="text-sm font-body-md text-on-background font-medium">
                      Complete Hackerrank OA
                    </p>
                  </div>
                  <div className="pt-sm border-t border-surface-container-highest flex items-center justify-between">
                    <a
                      className="text-xs font-label-sm text-primary hover:text-primary-container flex items-center gap-1 transition-colors"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[14px]">menu_book</span> DSA
                      Patterns
                    </a>
                    <button className="text-xs font-label-sm text-secondary hover:text-on-secondary-container flex items-center gap-1 bg-secondary-fixed/50 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>{" "}
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[320px] w-[320px] bg-surface-container/30 rounded-xl p-md border border-surface-container-high kanban-col-bg">
              <div className="flex justify-between items-center mb-md">
                <div className="flex items-center gap-sm">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <h2 className="font-headline-md text-[16px] font-semibold text-on-background">
                    Interviewing
                  </h2>
                  <span className="px-2 py-1 bg-surface-container-highest rounded-full text-xs font-label-sm text-on-surface-variant">
                    1
                  </span>
                </div>
                <button className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-md pr-sm custom-scrollbar">
                <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-l-4 border-primary cursor-pointer hover:shadow-md transition-shadow group relative">
                  <div className="flex justify-between items-start mb-sm">
                    <div className="flex items-center gap-xs">
                      <div className="w-6 h-6 rounded bg-[#E8EAF6] flex items-center justify-center text-xs font-bold text-[#3F51B5]">
                        M
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Meta
                      </span>
                    </div>
                    <span className="text-xs text-primary font-label-sm">Tomorrow</span>
                  </div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-background mb-xs">
                    Frontend Engineer
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-md font-body-md line-clamp-1">
                    Menlo Park, CA
                  </p>
                  <div className="p-sm bg-primary/5 border border-primary/20 rounded-lg mb-sm">
                    <p className="text-xs font-label-sm text-primary mb-1">Next Step:</p>
                    <p className="text-sm font-body-md text-on-background font-medium">
                      Technical Screen (React)
                    </p>
                  </div>
                  <div className="pt-sm border-t border-surface-container-highest flex flex-col gap-2">
                    <p className="text-xs font-label-sm text-outline">Linked Resources:</p>
                    <a
                      className="text-xs font-label-sm text-on-surface hover:text-primary flex items-center gap-2 bg-surface-container-lowest border border-outline-variant p-1.5 rounded transition-colors"
                      href="#"
                    >
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[14px]">video_chat</span>
                      </div>
                      Mock Interview Hub
                    </a>
                    <a
                      className="text-xs font-label-sm text-on-surface hover:text-primary flex items-center gap-2 bg-surface-container-lowest border border-outline-variant p-1.5 rounded transition-colors"
                      href="#"
                    >
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[14px]">quiz</span>
                      </div>
                      React Q&amp;A Bank
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[320px] w-[320px] bg-surface-container/30 rounded-xl p-md border border-surface-container-high kanban-col-bg">
              <div className="flex justify-between items-center mb-md">
                <div className="flex items-center gap-sm">
                  <span className="w-3 h-3 rounded-full bg-on-primary-fixed-variant"></span>
                  <h2 className="font-headline-md text-[16px] font-semibold text-on-background">
                    Final Round
                  </h2>
                  <span className="px-2 py-1 bg-surface-container-highest rounded-full text-xs font-label-sm text-on-surface-variant">
                    0
                  </span>
                </div>
                <button className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-md pr-sm custom-scrollbar flex items-center justify-center">
                <div className="text-center p-md border-2 border-dashed border-outline-variant rounded-xl text-outline">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                    auto_awesome
                  </span>
                  <p className="font-label-sm text-sm">No applications here yet.</p>
                  <p className="font-body-md text-xs mt-1">Keep pushing!</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 w-full bg-surface-container-lowest border-t border-surface-container-high flex justify-around items-center h-16 z-50 pb-safe">
        <a
          className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm text-[10px] mt-1">Home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-full h-full text-primary"
          href="#"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            work
          </span>
          <span className="font-label-sm text-[10px] mt-1 font-bold">Jobs</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined">video_chat</span>
          <span className="font-label-sm text-[10px] mt-1">Prep</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-[10px] mt-1">Profile</span>
        </a>
      </nav>
    </>
  );
}
