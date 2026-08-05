import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/interview_hub_feedback_report")({
  component: InterviewHubFeedbackReportPage,
});

function InterviewHubFeedbackReportPage() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-full py-lg px-md w-sidebar-width overflow-y-auto bg-surface-container-lowest shadow-sm fixed left-0 top-0 h-full w-sidebar-width z-50">
        <div className="mb-xl px-sm">
          <h1 className="text-headline-md font-display-lg font-extrabold text-primary">PlacePro</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Career OS</p>
        </div>

        <div className="flex-1 flex flex-col gap-sm">
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-sm text-label-sm uppercase">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span>
            <span className="font-label-sm text-label-sm uppercase">Feed</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              video_chat
            </span>
            <span className="font-label-sm text-label-sm uppercase">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-label-sm text-label-sm uppercase">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            <span className="font-label-sm text-label-sm uppercase">Arena</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-label-sm text-label-sm uppercase">Jobs</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-label-sm text-label-sm uppercase">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-label-sm text-label-sm uppercase">Resume</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-label-sm text-label-sm uppercase">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-sm text-label-sm uppercase">Profile</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-label-sm text-label-sm uppercase">Rooms</span>
          </a>
        </div>

        <div className="mt-xl px-sm mb-lg">
          <button className="w-full bg-primary text-on-primary font-label-sm text-label-sm uppercase py-md rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-[0.98]">
            Start Practice
          </button>
        </div>

        <div className="border-t border-outline-variant/30 pt-lg flex flex-col gap-sm">
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm uppercase">Settings</span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-error hover:text-error hover:bg-error-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-sm text-label-sm uppercase">Logout</span>
          </a>
        </div>
      </nav>

      <main className="flex-1 md:ml-sidebar-width h-full overflow-y-auto bg-surface-bright relative">
        <header className="sticky top-0 z-40 bg-surface-bright/80 backdrop-blur-md px-xl py-md flex justify-between items-center border-b border-outline-variant/10">
          <div className="flex items-center gap-md">
            <button className="md:hidden text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                Interview Hub
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Feedback Report</h2>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <button className="flex items-center gap-sm bg-surface-container-high hover:bg-surface-variant text-primary font-label-sm text-label-sm px-md py-sm rounded-full transition-colors">
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span className="hidden sm:inline">Share to Feed</span>
            </button>
            <img
              alt="Student Profile Picture"
              className="w-10 h-10 rounded-full border-2 border-surface-container-high object-cover"
              data-alt="A small circular avatar placeholder image showing a professional headshot of a young professional in a light, modern corporate SaaS environment."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVkvl12H26VqCb9V-fjmSr9pO_7cB7mI-9LOdSaV0E1RkVmlA7FoT-iR-TOMi3E3AomT9UQ52C54lsphvk6f7Awo_C8mABIPyDtktk-BrFStD1PksRmdwqF_nDMlMGl2wdw5Um-umaIggEjjZhGQcIKTVWyWsaW_-vsLtfe3pifOg7cbLK9yKhaF1NUHlQ6ufP25R-Oj60hWFRpgVlBRpkMpyH6GZXM1cFpRUpasxbo8yXONXeWx5nYw"
            />
          </div>
        </header>
        <div className="p-md md:p-xl max-w-container-max mx-auto space-y-xl pb-24">
          <section className="flex flex-col lg:flex-row gap-xl items-start justify-between">
            <div>
              <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
                Software Engineer Mock Interview
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span> Oct
                24, 2023
                <span className="mx-sm text-outline-variant">|</span>
                <span className="material-symbols-outlined text-[18px]">timer</span> 45 mins
                <span className="mx-sm text-outline-variant">|</span>
                <span className="material-symbols-outlined text-[18px]">person</span> Interviewer:
                AI Sarah
              </p>
            </div>
            <button className="flex items-center gap-sm bg-primary text-on-primary font-label-sm text-label-sm px-xl py-md rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-[0.98] shrink-0">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Recording
            </button>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            <div className="glass-card rounded-xl p-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
              <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-lg">
                Readiness Score
              </h4>
              <div className="relative w-48 h-48 mb-md">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-container-high"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                  />

                  <circle
                    className="text-primary transition-all duration-1000 ease-out"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="currentColor"
                    strokeDasharray="251.2"
                    stroke-dashoffset="30"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display-lg text-[56px] font-extrabold text-primary leading-none">
                    88
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">/ 100</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-sm px-md py-sm bg-surface-container-low rounded-full text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                +5 from last interview
              </div>
            </div>

            <div className="lg:col-span-2 glass-card rounded-xl p-xl flex flex-col justify-between">
              <div className="mb-lg flex justify-between items-end">
                <h4 className="font-headline-md text-headline-md text-on-surface">
                  Performance Breakdown
                </h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  Compared to target role
                </span>
              </div>
              <div className="space-y-xl flex-1 justify-center flex flex-col">
                <div>
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">forum</span>
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface">
                        Communication
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-bold">92%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded bg-secondary-container/10 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">code</span>
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface">
                        Technical Accuracy
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">
                      85%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">psychology</span>
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface">
                        Problem Solving
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-bold">88%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface">Key Strengths</h4>
              </div>
              <ul className="space-y-md">
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-xs">
                    check_circle
                  </span>
                  <div>
                    <h5 className="font-body-md text-body-md font-medium text-on-surface">
                      Clear articulation of past experiences
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">
                      You used the STAR method effectively to structure your responses when
                      discussing previous projects.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-xs">
                    check_circle
                  </span>
                  <div>
                    <h5 className="font-body-md text-body-md font-medium text-on-surface">
                      Strong grasp of core data structures
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">
                      Identified the optimal hash map approach for the algorithmic question within
                      the first 3 minutes.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-xl shadow-sm border border-outline-variant/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface">
                  Areas for Improvement
                </h4>
              </div>
              <ul className="space-y-md">
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-xs">
                    arrow_right
                  </span>
                  <div>
                    <h5 className="font-body-md text-body-md font-medium text-on-surface">
                      System Design Depth
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">
                      Could elaborate more on scalability tradeoffs. Practice discussing horizontal
                      vs vertical scaling.
                    </p>
                    <button className="mt-sm text-primary font-label-sm text-label-sm uppercase hover:underline flex items-center gap-xs">
                      View Suggested Resource{" "}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </li>
                <li className="flex items-start gap-md">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-xs">
                    arrow_right
                  </span>
                  <div>
                    <h5 className="font-body-md text-body-md font-medium text-on-surface">
                      Edge Case Testing
                    </h5>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">
                      Missed empty input and null pointer edge cases during the initial code
                      walk-through.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="fixed bottom-0 right-0 w-1/3 h-1/3 pointer-events-none opacity-20 -z-10"
            style={{
              background:
                "radial-gradient(circle at bottom right, var(--tw-colors-primary-container), transparent 70%)",
            }}
          ></div>
        </div>
      </main>
    </>
  );
}
