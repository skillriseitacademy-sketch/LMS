import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/jobs_board_discovery_explorer")({
  component: JobsBoardDiscoveryExplorerPage,
});

function JobsBoardDiscoveryExplorerPage() {
  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex flex-col py-lg px-md overflow-y-auto z-50">
        <div className="mb-8 px-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container">
              rocket_launch
            </span>
          </div>
          <div>
            <h1 className="font-display-lg text-headline-md font-extrabold text-primary tracking-tight">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">
              Career OS
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-1 flex-1">
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-sm text-label-sm">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">rss_feed</span>
              <span className="font-label-sm text-label-sm">Feed</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">video_chat</span>
              <span className="font-label-sm text-label-sm">Interview Hub</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">quiz</span>
              <span className="font-label-sm text-label-sm">Quizzes</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">sports_esports</span>
              <span className="font-label-sm text-label-sm">Arena</span>
            </a>
          </li>

          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low active:scale-[0.98] transition-transform duration-150"
              href="#"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                work
              </span>
              <span className="font-label-sm text-label-sm">Jobs</span>
            </a>
          </li>

          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">map</span>
              <span className="font-label-sm text-label-sm">Roadmap</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">description</span>
              <span className="font-label-sm text-label-sm">Resume</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">leaderboard</span>
              <span className="font-label-sm text-label-sm">Leaderboard</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">person</span>
              <span className="font-label-sm text-label-sm">Profile</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200 active:scale-[0.98]"
              href="#"
            >
              <span className="material-symbols-outlined">groups</span>
              <span className="font-label-sm text-label-sm">Rooms</span>
            </a>
          </li>
        </ul>

        <div className="mt-auto pt-6 border-t border-surface-container-highest">
          <button className="w-full mb-4 bg-primary text-on-primary py-3 rounded-lg font-label-sm text-label-sm shadow-sm hover:bg-primary/90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span> Start Practice
          </button>
          <ul className="flex flex-col gap-1">
            <li>
              <a
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-200"
                href="#"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="font-label-sm text-label-sm">Settings</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors duration-200"
                href="#"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-sm text-label-sm">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="ml-[280px] flex-1 flex flex-col min-h-screen">
        <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/80 backdrop-blur-md flex justify-between items-center px-xl z-40 border-b border-transparent">
          <div className="flex-1 max-w-md relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              placeholder="Search PlacePro..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 ring-primary/30 transition-all">
              <img
                alt="Student Avatar"
                className="w-full h-full object-cover"
                data-alt="A professional headshot of a young student in a bright, modern indoor setting, wearing business casual attire. The lighting is soft and natural, suggesting a high-end corporate or modern academic environment. The style is highly realistic photography."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClWPDOkvWPjrnnyosHM_jcKs0aLdlPK6HPr3IA8N_Qhr8x2lM-6qLJaZVqEpd61_mP-zK9aWQbHgfBuqUUfTHPS_u7sDMLZI6KthP-KhEXcFCXLw1y593hbGaTIIfnFaD5Tn8F-bv9MEEuroM7WyFEq4h8CVXk5l-1swghTUyIT_aTG1kPMB37jC1xJPO3CvWoqER3JQvIfxG3UlYjnPCrjo3U1e8NLrlDssUCjyFMrhQJ71Gy4_g5RA"
              />
            </div>
          </div>
        </header>

        <main className="mt-16 p-xl flex-1 max-w-container-max mx-auto w-full flex gap-xl items-start">
          <div className="flex-1 flex flex-col gap-lg min-w-0">
            <section className="flex flex-col gap-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Discover Opportunities
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Curated positions matching your Arena performance and profile.
                </p>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-container-high flex flex-wrap gap-2 items-center">
                <div className="flex-1 min-w-[200px] relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full bg-transparent border-none py-2.5 pl-10 pr-3 font-body-md text-body-md text-on-surface focus:ring-0 placeholder:text-outline"
                    placeholder="Job Role, Title, or Keyword"
                    type="text"
                  />
                </div>
                <div className="w-px h-8 bg-surface-container-highest hidden md:block"></div>
                <div className="flex-1 min-w-[150px] relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                    location_on
                  </span>
                  <input
                    className="w-full bg-transparent border-none py-2.5 pl-10 pr-3 font-body-md text-body-md text-on-surface focus:ring-0 placeholder:text-outline"
                    placeholder="Location"
                    type="text"
                  />
                </div>
                <div className="w-px h-8 bg-surface-container-highest hidden md:block"></div>
                <div className="flex-1 min-w-[150px] relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                    payments
                  </span>
                  <select className="w-full bg-transparent border-none py-2.5 pl-10 pr-8 font-body-md text-body-md text-on-surface focus:ring-0 appearance-none cursor-pointer">
                    <option value="">Salary Range</option>
                    <option value="1">10LPA - 20LPA</option>
                    <option value="2">20LPA - 30LPA</option>
                    <option value="3">30LPA+</option>
                  </select>
                </div>
                <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors active:scale-[0.98] shadow-sm flex items-center gap-2 shrink-0">
                  Search Jobs
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full flex items-center gap-1 cursor-pointer hover:bg-surface-container-highest transition-colors">
                  Remote <span className="material-symbols-outlined text-[16px]">close</span>
                </span>
                <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full flex items-center gap-1 cursor-pointer hover:bg-surface-container-highest transition-colors">
                  Full-Time <span className="material-symbols-outlined text-[16px]">close</span>
                </span>
                <button className="px-3 py-1 text-primary font-label-sm text-label-sm hover:bg-primary-container/50 rounded-full transition-colors">
                  Clear All
                </button>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Recommended for You
                </h3>
                <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">
                  View All Matches
                </a>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-md">
                <div className="bg-surface-container-lowest rounded-xl p-lg border border-surface-container-highest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow group flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg border border-surface-container-highest overflow-hidden p-2 bg-surface-bright flex items-center justify-center">
                        <img
                          alt="Company Logo"
                          className="w-full h-full object-contain"
                          data-alt="A clean, minimalist logo of a modern tech company featuring geometric shapes in blue and grey. The background is pure white. High contrast, professional corporate identity."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBID_L2bsWUXmO-3uEBQRE0CNprfzJudJIvzdmhijtzAWro802S8kVgPFFouqSQj39EHMcQH0NEnPI5FQdFNBR8tqaB8QpaCRsjlsnwIX6lXIl8gpZel54-mCixra3PG8OUsYhJzivcQPiaLioN1Fm3y14MjCqpWWRfF3_VsHkk9P83qPOT5O0BSL2OMrX-xPKwm-Gym7SpdRgxUMiMCWwoZ8wYMOX9BH--W5qS_g3W5an8x9baS1YO3Q"
                        />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-[18px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                          SDE I - Backend
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                          Nexus Technologies
                        </p>
                      </div>
                    </div>
                    <button className="text-outline-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">bookmark_border</span>
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-container px-3 py-1.5 rounded-full w-fit">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      98% Match based on System Design
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>{" "}
                      Bangalore
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[16px]">payments</span> 18 -
                      24 LPA
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[16px]">work</span> Full-Time
                    </div>
                  </div>
                  <div className="pt-4 border-t border-surface-container-highest flex justify-end">
                    <button className="bg-surface-container text-on-surface px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]">
                      Quick Apply
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-lg border border-surface-container-highest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow group flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg border border-surface-container-highest overflow-hidden p-2 bg-surface-bright flex items-center justify-center">
                        <img
                          alt="Company Logo"
                          className="w-full h-full object-contain"
                          data-alt="A stylized, modern 'F' logo in vibrant orange and dark grey tones. The design is flat, vector-style, set against a clean white background. Represents an innovative fintech startup."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHmL_zUctN1un-KFasBRMs1rPEi9Q_NB26e7PuACGeb42hgND4zMS1_UxUtKcLuEksjWXvB-5s0fllH9Av9bJpmRge1duyTLZI3v7b55hP-E9HF-kmpvVPUBlEtDxhrJfgGnrxlYUQJKDva8Q0ZFbAY0l4YmXXkj9MUmFJtSwbes_mGKCIGWNRnPgVk3iMahe_1rGe4pcdRgK1NgkTrX4B4FL2z5STkUDvHyx-4MSzLjrqv6UxITkdVg"
                        />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-[18px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                          Data Scientist
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                          FinEdge Analytics
                        </p>
                      </div>
                    </div>
                    <button className="text-outline-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">bookmark_border</span>
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed w-fit px-3 py-1.5 rounded-full">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      insights
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      92% Match based on Python &amp; ML
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>{" "}
                      Remote
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[16px]">payments</span> 15 -
                      20 LPA
                    </div>
                  </div>
                  <div className="pt-4 border-t border-surface-container-highest flex justify-end">
                    <button className="bg-surface-container text-on-surface px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-high transition-colors active:scale-[0.98]">
                      Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="w-[320px] shrink-0 flex flex-col gap-md sticky top-24">
            <div className="bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-container-highest">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface">
                  Tracked Applications
                </h3>
                <button className="text-primary hover:bg-primary-container/20 p-1 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="border-l-4 border-secondary bg-surface-bright p-3 rounded-r-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-fixed-dim/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-[14px] font-bold text-on-surface">
                        Frontend Engineer
                      </h4>
                      <p className="font-body-md text-[12px] text-on-surface-variant">
                        CloudSync Systems
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-xs font-bold text-secondary-container">
                      CS
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      Interviewing (R2)
                    </span>
                  </div>
                  <p className="font-body-md text-[11px] text-outline mt-1">Tomorrow, 2:00 PM</p>
                </div>

                <div className="border-l-4 border-outline-variant bg-surface-bright p-3 rounded-r-lg group hover:bg-surface-container-lowest transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-[14px] font-semibold text-on-surface">
                        Full Stack Dev
                      </h4>
                      <p className="font-body-md text-[12px] text-on-surface-variant">
                        Innovate Inc
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-xs font-bold text-outline">
                      IN
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Applied
                    </span>
                  </div>
                  <p className="font-body-md text-[11px] text-outline mt-1">3 days ago</p>
                </div>

                <div className="border-l-4 border-primary bg-primary-fixed/30 p-3 rounded-r-lg group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-md text-[14px] font-semibold text-on-primary-fixed">
                        Junior SDE
                      </h4>
                      <p className="font-body-md text-[12px] text-on-primary-fixed-variant">
                        TechFlow
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">celebration</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      check_circle
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      Offer Received
                    </span>
                  </div>
                  <button className="mt-2 w-full bg-primary text-on-primary py-1.5 rounded text-[11px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
              <button className="w-full mt-4 py-2 border border-outline-variant rounded-lg font-label-sm text-label-sm text-on-surface hover:bg-surface-container transition-colors">
                View All Applications
              </button>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
