import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/student_dashboard")({
  component: StudentDashboardPage,
});

function StudentDashboardPage() {
  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-sidebar-width bg-surface-container-low dark:bg-surface-container-lowest shadow-md z-40 overflow-y-auto p-md gap-base">
        <div className="flex items-center gap-md mb-xl mt-sm px-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-outline-variant">
            <img
              alt="User Avatar"
              className="w-full h-full object-cover"
              data-alt="A professional, high-quality headshot portrait of a young male student in a bright, modern SaaS context. He is smiling slightly, facing forward, bathed in soft, natural studio lighting. The background is a clean, neutral gradient. The image perfectly embodies a clean, professional career OS avatar."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi3FNmZE_Dj1rsBlEqNDiH9JpHOlPHTBMxDNmK0Gy56uxhyv9UEkIWEkAWnYmo8l-Lgon5TIhTyG-mE9OztuKH26M9pGftTJx0h2KmxgREsSO_ESCwJKp4HcSdteLLhMQv2WAO3_wq2ztSSsueNFhn4lUVZaquBbXxyRihsYvr2LZUPp6cPj59FBduJ6LPBaCNpBFEQx1QiqHiKilnG-4j6t7GwLyL3Uz4fKnaW542ofA0fBYDhBXq0w"
            />
          </div>
          <div>
            <h2 className="text-headline-md font-headline-md font-bold text-primary">
              PlacePro Career OS
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Rank: #42 | 2500 XP
            </p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-[2px]">
          <a
            aria-current="page"
            className="flex items-center gap-md px-md py-sm bg-primary-container text-on-primary-container font-bold rounded-lg group transition-transform translate-x-1"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="dashboard" data-weight="fill">
              dashboard
            </span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="rss_feed">
              rss_feed
            </span>
            <span className="font-body-md text-body-md font-medium">Feed</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="video_chat">
              video_chat
            </span>
            <span className="font-body-md text-body-md font-medium">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="quiz">
              quiz
            </span>
            <span className="font-body-md text-body-md font-medium">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="live_tv">
              live_tv
            </span>
            <span className="font-body-md text-body-md font-medium">Live Classes</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="sports_esports">
              sports_esports
            </span>
            <span className="font-body-md text-body-md font-medium">Arena</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="work">
              work
            </span>
            <span className="font-body-md text-body-md font-medium">Jobs</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="map">
              map
            </span>
            <span className="font-body-md text-body-md font-medium">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="description">
              description
            </span>
            <span className="font-body-md text-body-md font-medium">Resume</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="leaderboard">
              leaderboard
            </span>
            <span className="font-body-md text-body-md font-medium">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="person">
              person
            </span>
            <span className="font-body-md text-body-md font-medium">Profile</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-variant rounded-lg group transition-all"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="groups">
              groups
            </span>
            <span className="font-body-md text-body-md font-medium">Rooms</span>
          </a>
        </nav>

        <div className="mt-auto pt-lg">
          <button className="w-full py-sm px-md bg-surface-variant text-primary font-body-md font-medium rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined" data-icon="workspace_premium">
              workspace_premium
            </span>
            Upgrade to Pro
          </button>
        </div>
      </aside>

      <main className="flex-1 w-full md:ml-[280px] p-md md:p-xl max-w-container-max mx-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-lg mb-xl">
          <div className="flex-1">
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-sm">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant">
              Let's get you ready for your next big interview.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant flex items-center gap-xl w-full lg:w-auto shrink-0">
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between items-end mb-xs">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                  Level 4
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  2500 / 5000 XP
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary-container rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div className="w-px h-10 bg-outline-variant mx-2"></div>

            <div className="flex items-center gap-sm">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span
                  className="material-symbols-outlined"
                  data-icon="local_fire_department"
                  data-weight="fill"
                >
                  local_fire_department
                </span>
              </div>
              <div>
                <div className="text-headline-md font-headline-md text-tertiary">12</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  Day Streak
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          <section className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg mb-md">
            <a
              className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
              href="#"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined" data-icon="video_chat">
                  video_chat
                </span>
              </div>
              <div>
                <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                  Start Interview
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Mock with AI or Peers
                </p>
              </div>
            </a>

            <a
              className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
              href="#"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined" data-icon="quiz">
                  quiz
                </span>
              </div>
              <div>
                <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                  Take a Quiz
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Test your knowledge
                </p>
              </div>
            </a>

            <a
              className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
              href="#"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined" data-icon="live_tv">
                  live_tv
                </span>
              </div>
              <div>
                <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                  Join Live Class
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Starting in 15 mins
                </p>
              </div>
            </a>

            <a
              className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
              href="#"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined" data-icon="sports_esports">
                  sports_esports
                </span>
              </div>
              <div>
                <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                  Open Arena
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Compete globally
                </p>
              </div>
            </a>
          </section>

          <section className="md:col-span-7 bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant p-lg flex flex-col">
            <div className="flex justify-between items-center mb-md pb-sm border-b border-surface-container-highest">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-secondary" data-icon="checklist">
                  checklist
                </span>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  Today's Mission
                </h2>
              </div>
              <span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded-md">
                1/3 Completed
              </span>
            </div>
            <div className="flex flex-col gap-sm flex-1">
              <label className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                  <input
                    checked=""
                    className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer"
                    type="checkbox"
                  />
                  <span
                    className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100"
                    data-icon="check"
                  >
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface-variant line-through group-hover:text-on-surface transition-colors">
                    Solve 2 DSA problems
                  </p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">+50 XP</p>
                </div>
              </label>

              <label className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group border-l-[3px] border-secondary-container pl-[9px]">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                  <input
                    className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer hover:border-primary"
                    type="checkbox"
                  />
                  <span
                    className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100"
                    data-icon="check"
                  >
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface font-medium">
                    Complete 1 Mock Interview
                  </p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">+150 XP</p>
                </div>
                <button className="px-3 py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded hover:bg-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100">
                  Start
                </button>
              </label>

              <label className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group pl-3">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                  <input
                    className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer hover:border-primary"
                    type="checkbox"
                  />
                  <span
                    className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100"
                    data-icon="check"
                  >
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface">
                    Attend "System Design Basics" Live Class
                  </p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">
                    Starts at 4:00 PM • +100 XP
                  </p>
                </div>
              </label>
            </div>
          </section>

          <section className="md:col-span-5 bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant p-lg flex flex-col">
            <div className="flex justify-between items-center mb-md pb-sm border-b border-surface-container-highest">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary" data-icon="school">
                  school
                </span>
                <h2 className="text-headline-md font-headline-md text-on-surface">
                  Enrolled Topics
                </h2>
              </div>
              <button className="text-primary hover:text-on-primary-fixed-variant p-1 rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined" data-icon="more_horiz">
                  more_horiz
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-md flex-1 items-center justify-center py-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-sm">
                  <svg
                    className="circular-chart text-primary-container w-full h-full drop-shadow-sm"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-md text-body-lg font-bold text-on-surface">
                      75%
                    </span>
                  </div>
                </div>
                <h3 className="font-body-md text-body-md font-medium text-on-surface">
                  Data Structures
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 bg-primary-fixed/30 px-2 py-0.5 rounded text-primary">
                  Advanced
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-sm">
                  <svg
                    className="circular-chart text-secondary-container w-full h-full drop-shadow-sm"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="40, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-md text-body-lg font-bold text-on-surface">
                      40%
                    </span>
                  </div>
                </div>
                <h3 className="font-body-md text-body-md font-medium text-on-surface">Web Dev</h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 bg-surface-container-highest px-2 py-0.5 rounded">
                  Intermediate
                </span>
              </div>
            </div>
            <button className="w-full mt-md py-2 border border-outline-variant rounded-lg font-body-md text-body-md text-primary hover:bg-surface-container-low transition-colors font-medium">
              View All Topics
            </button>
          </section>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant flex justify-around items-center h-[72px] pb-safe z-50 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <a
          aria-current="page"
          className="flex flex-col items-center justify-center w-16 h-full text-primary-container gap-1"
          href="#"
        >
          <div className="w-16 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined" data-icon="dashboard" data-weight="fill">
              dashboard
            </span>
          </div>
          <span className="font-label-sm text-[10px] font-bold">Home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="quiz">
            quiz
          </span>
          <span className="font-label-sm text-[10px] font-medium">Quizzes</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="video_chat">
            video_chat
          </span>
          <span className="font-label-sm text-[10px] font-medium">Interviews</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="person">
            person
          </span>
          <span className="font-label-sm text-[10px] font-medium">Profile</span>
        </a>
      </nav>
    </>
  );
}
