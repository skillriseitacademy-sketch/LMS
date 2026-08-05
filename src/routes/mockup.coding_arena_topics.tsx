import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/coding_arena_topics")({
  component: CodingArenaTopicsPage,
});

function CodingArenaTopicsPage() {
  return (
    <>
      <aside className="bg-surface-container-low dark:bg-surface-container-lowest fixed left-0 top-0 h-screen w-sidebar-width flex flex-col p-md gap-base overflow-y-auto shadow-md border-r border-outline-variant z-40 hidden md:flex">
        <div className="flex items-center gap-sm mb-lg px-sm pt-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
            <img
              alt="User Avatar"
              className="w-full h-full object-cover"
              data-alt="A stylized, modern geometric avatar with vibrant corporate indigo and soft white tones, abstract corporate SaaS profile picture aesthetic, high key lighting, smooth vector styling."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA27dXO6iy8peulwDIabMgxzJULEO4c40mFbzkbn3yYF4bmqfTD3yzLEMzbQcQMzeWkDbZ_Pws9Vq967d1KWAW_ESLhQfQiBvBLDZLVwMVZEk_F3GRjtOeyRIMiYYaaNDG-GVapzt1H5xrHWCKBYmZB7Io6h1mkDieAFMwXnstc86gFLucVRW_UD3gqpO_r01T-nGatUhw9FWz2c677VqIrp5yDWdNdudB0T26-n1Sisg1ZD4g4bclC3g"
            />
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary truncate leading-tight">
              PlacePro Career OS
            </h1>
            <p className="font-label-sm text-label-sm text-secondary-container mt-1">
              Rank: #42 | 2500 XP
            </p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              dashboard
            </span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              rss_feed
            </span>
            <span className="font-body-md text-body-md">Feed</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              video_chat
            </span>
            <span className="font-body-md text-body-md">Interview Hub</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              quiz
            </span>
            <span className="font-body-md text-body-md">Quizzes</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              live_tv
            </span>
            <span className="font-body-md text-body-md">Live Classes</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 bg-primary-container text-on-primary-container font-bold rounded-lg translate-x-1 transition-transform group"
            href="#"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_esports
            </span>
            <span className="font-body-md text-body-md font-bold">Arena</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              work
            </span>
            <span className="font-body-md text-body-md">Jobs</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              map
            </span>
            <span className="font-body-md text-body-md">Roadmap</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              description
            </span>
            <span className="font-body-md text-body-md">Resume</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              leaderboard
            </span>
            <span className="font-body-md text-body-md">Leaderboard</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              person
            </span>
            <span className="font-body-md text-body-md">Profile</span>
          </a>

          <a
            className="flex items-center gap-md px-sm py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group mb-4"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              groups
            </span>
            <span className="font-body-md text-body-md">Rooms</span>
          </a>
        </nav>

        <div className="mt-auto px-sm pb-sm">
          <button className="w-full bg-primary text-on-primary font-body-md text-body-md font-semibold py-2 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors shadow-sm">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-sidebar-width min-h-screen relative bg-grid-pattern">
        <div className="max-w-container-max mx-auto px-md md:px-xl py-xl pb-32">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="material-symbols-outlined text-secondary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
                <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider">
                  Active Challenge Season
                </span>
              </div>
              <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Arena Topics</h2>
              <p className="font-body-lg text-body-lg text-outline max-w-2xl">
                Master individual concepts to increase your global rank. Choose your battleground
                and start solving curated challenge sets.
              </p>
            </div>

            <div className="flex gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
              <div className="text-center px-4 border-r border-outline-variant">
                <p className="font-label-sm text-label-sm text-outline mb-1">Global Rank</p>
                <p className="font-headline-md text-headline-md text-primary">#42</p>
              </div>
              <div className="text-center px-4">
                <p className="font-label-sm text-label-sm text-outline mb-1">Total Solved</p>
                <p className="font-headline-md text-headline-md text-on-surface">348</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
            <article className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),_0_2px_4px_-2px_rgb(0_0_0_/_0.05)] flex flex-col relative overflow-hidden group hover:border-primary-fixed-dim transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <header className="flex justify-between items-start mb-6 pl-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">text_format</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Strings</h3>
                </div>
                <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">stars</span> Code Ranker
                </span>
              </header>
              <div className="flex items-center justify-between mb-8 pl-2">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Easy</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      15
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Med</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      22
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Hard</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">8</span>
                  </div>
                </div>

                <div className="w-24 h-24 relative">
                  <svg className="circular-chart w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle stroke-primary"
                      d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="65, 100"
                    />
                    <text className="percentage" x="18" y="20.35">
                      29/45
                    </text>
                  </svg>
                </div>
              </div>
              <div className="mt-auto pl-2">
                <button className="w-full bg-surface-container hover:bg-primary text-primary hover:text-on-primary font-body-md text-body-md font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md">
                  <span>Enter Arena</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>

            <article className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),_0_2px_4px_-2px_rgb(0_0_0_/_0.05)] flex flex-col relative overflow-hidden group hover:border-primary-fixed-dim transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <header className="flex justify-between items-start mb-6 pl-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">data_array</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Arrays</h3>
                </div>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded-sm shadow-sm flex items-center gap-1 border border-outline-variant">
                  <span className="material-symbols-outlined text-[14px]">shuffle</span> Mixed Mode
                </span>
              </header>
              <div className="flex items-center justify-between mb-8 pl-2">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Easy</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      30
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Med</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      45
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Hard</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      12
                    </span>
                  </div>
                </div>

                <div className="w-24 h-24 relative">
                  <svg className="circular-chart w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle stroke-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="82, 100"
                    />
                    <text className="percentage" x="18" y="20.35">
                      72/87
                    </text>
                  </svg>
                </div>
              </div>
              <div className="mt-auto pl-2">
                <button className="w-full bg-surface-container hover:bg-primary text-primary hover:text-on-primary font-body-md text-body-md font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md">
                  <span>Enter Arena</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>

            <article className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),_0_2px_4px_-2px_rgb(0_0_0_/_0.05)] flex flex-col relative overflow-hidden group hover:border-primary-fixed-dim transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
              <header className="flex justify-between items-start mb-6 pl-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary-fixed-dim flex items-center justify-center text-on-secondary-fixed group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[28px]">memory</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Dynamic Prog.
                  </h3>
                </div>
                <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-1 rounded-sm shadow-sm flex items-center gap-1 border border-error/20">
                  <span className="material-symbols-outlined text-[14px]">flag</span> CTF
                </span>
              </header>
              <div className="flex items-center justify-between mb-8 pl-2">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Easy</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Med</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      35
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    <span className="font-label-sm text-label-sm text-outline w-12">Hard</span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      25
                    </span>
                  </div>
                </div>

                <div className="w-24 h-24 relative">
                  <svg className="circular-chart w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle stroke-secondary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="25, 100"
                    />
                    <text className="percentage" x="18" y="20.35">
                      18/70
                    </text>
                  </svg>
                </div>
              </div>
              <div className="mt-auto pl-2">
                <button className="w-full bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed font-body-md text-body-md font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md">
                  <span>Enter Arena</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
