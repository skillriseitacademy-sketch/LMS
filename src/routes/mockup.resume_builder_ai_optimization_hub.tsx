import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/resume_builder_ai_optimization_hub")({
  component: ResumeBuilderAiOptimizationHubPage,
});

function ResumeBuilderAiOptimizationHubPage() {
  return (
    <>
      <nav className="bg-surface-container-lowest shadow-sm w-sidebar-width h-full fixed left-0 top-0 flex flex-col h-full py-lg px-md z-50">
        <div className="mb-xl flex items-center gap-sm">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            bolt
          </span>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">PlacePro</h1>
            <p className="font-label-sm text-label-sm text-outline">Career OS</p>
          </div>
        </div>
        <button className="w-full bg-primary-container text-on-primary py-sm px-md rounded-lg font-body-md font-medium mb-xl hover:bg-primary transition-colors hover:-translate-y-0.5 duration-200">
          Start Daily Challenge
        </button>
        <ul className="flex-1 space-y-sm overflow-y-auto">
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">forum</span> Feed
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">record_voice_over</span> Interview Hub
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">quiz</span> Quizzes
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">sports_esports</span> Arena
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">work</span> Jobs
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">map</span> Roadmap
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low"
              href="#"
            >
              <span className="material-symbols-outlined">description</span> Resume
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">leaderboard</span> Leaderboard
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">person</span> Profile
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">groups</span> Rooms
            </a>
          </li>
        </ul>
        <div className="mt-auto pt-md border-t border-outline-variant/30 space-y-sm">
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span> Settings
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">help</span> Help
          </a>
        </div>
      </nav>

      <div className="flex-1 ml-sidebar-width flex flex-col min-h-screen relative">
        <header className="bg-surface border-b border-outline-variant/30 docked full-width top-0 sticky z-40 flex justify-between items-center w-full h-16 px-xl max-w-container-max mx-auto">
          <div className="flex-1 max-w-md relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full bg-surface-container border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Search resources..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-md">
            <button className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm flex items-center gap-1 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">stars</span> 1,250 XP
            </button>
            <button className="text-primary font-medium hover:text-primary-fixed transition-colors">
              Upgrade Pro
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">local_fire_department</span>
            </button>
            <img
              alt="Student avatar"
              className="w-8 h-8 rounded-full object-cover border border-outline-variant ml-sm"
              data-alt="A small, circular avatar portrait of a young professional student with a bright, welcoming expression, set against a clean white background in a well-lit studio environment, maintaining a polished corporate modern aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu4bxE6rJoDpXUPt0mQRxhe8AVqTTEiXr35W5MfJKyTcBB23PJU7sILuZuxJjPmL9vuGiGeG_0IChB3oCfIzA1eppzWzxot9CK2QGL3Vfv3aHG7h_66JFO1DtFxlSrJYi26Z16xlvYl9HtOd-lN-O4w0LYOuwNGVZAGMHNb-oL4FxOmv_26HGaC8s9VzmLYZsbF20OLG6rKHgMsfS_Xj8-GhKxBFm6Lkor7Js1pBcENIZ8bw1TE2lCKA"
            />
          </div>
        </header>

        <main className="flex-1 w-full max-w-container-max mx-auto p-xl">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-background mb-xs">
                AI Optimization Hub
              </h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg">
                Supercharge your resume with real-time AI insights.
              </p>
            </div>
            <div className="flex gap-md">
              <button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">autorenew</span> Re-Scan Resume
              </button>
              <button className="px-md py-sm rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-sm font-medium">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_fix_high
                </span>{" "}
                Apply All Suggestions
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg h-[calc(100vh-200px)] min-h-[600px]">
            <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl card-shadow p-lg flex flex-col border-l-4 border-secondary-fixed-dim">
              <div className="flex items-center gap-2 mb-md">
                <span className="material-symbols-outlined text-secondary-container">radar</span>
                <h3 className="font-headline-md text-base font-semibold">Keyword Analysis</h3>
              </div>
              <p className="font-label-sm text-label-sm text-outline mb-md">
                Match vs. Target Role (SDE II)
              </p>
              <div className="flex-1 flex flex-wrap content-start gap-2 overflow-y-auto pr-1 custom-scrollbar">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                  React
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                  Node.js
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                  TypeScript
                </span>

                <span className="px-2 py-1 rounded-full bg-secondary-fixed/30 text-secondary border border-secondary-fixed text-sm border-dashed">
                  AWS
                </span>
                <span className="px-2 py-1 rounded-full bg-secondary-fixed/30 text-secondary border border-secondary-fixed text-sm border-dashed">
                  GraphQL
                </span>
                <span className="px-2 py-1 rounded-full bg-secondary-fixed/30 text-secondary border border-secondary-fixed text-sm border-dashed">
                  CI/CD
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                  Python
                </span>
                <span className="px-2 py-1 rounded-full bg-secondary-fixed/30 text-secondary border border-secondary-fixed text-sm border-dashed">
                  Docker
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                  MongoDB
                </span>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                  REST APIs
                </span>
              </div>
              <div className="mt-md pt-md border-t border-outline-variant/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Match Score</span>
                  <span className="text-sm font-bold text-secondary-container">68%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div
                    className="bg-secondary-container h-2 rounded-full"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl card-shadow p-lg flex flex-col border-l-4 border-primary">
              <div className="flex items-center gap-2 mb-md">
                <span className="material-symbols-outlined text-primary">fact_check</span>
                <h3 className="font-headline-md text-base font-semibold">Content Quality</h3>
              </div>
              <div className="flex-1 space-y-md overflow-y-auto pr-1 custom-scrollbar">
                <div className="flex items-start gap-md p-md rounded-lg bg-surface-container-low border border-outline-variant/50">
                  <span
                    className="material-symbols-outlined text-green-600 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-medium text-sm">Grammar &amp; Spelling</h4>
                    <p className="text-sm text-on-surface-variant mt-1">
                      No errors found. Clean and professional.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-md p-md rounded-lg bg-secondary-fixed/20 border border-secondary-fixed">
                  <span
                    className="material-symbols-outlined text-secondary mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    warning
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-secondary">Metrics Included</h4>
                    <p className="text-sm text-secondary/80 mt-1">
                      Only 2 of 5 bullet points contain quantifiable results. Add numbers to
                      demonstrate impact.
                    </p>
                    <div className="mt-2 w-full bg-surface-container rounded-full h-1.5">
                      <div
                        className="bg-secondary h-1.5 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-md p-md rounded-lg bg-surface-container-low border border-outline-variant/50">
                  <span
                    className="material-symbols-outlined text-green-600 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-medium text-sm">Length Check</h4>
                    <p className="text-sm text-on-surface-variant mt-1">
                      Optimal length. Fits perfectly on one page.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-md p-md rounded-lg bg-primary/5 border border-primary/20">
                  <span
                    className="material-symbols-outlined text-primary mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    info
                  </span>
                  <div>
                    <h4 className="font-medium text-sm text-primary-container">Action Verbs</h4>
                    <p className="text-sm text-on-surface-variant mt-1">
                      Good variety, but consider replacing weak verbs like "Helped" with
                      "Facilitated".
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl card-shadow p-lg flex flex-col relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center mb-md relative z-10">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    tips_and_updates
                  </span>
                  <h3 className="font-headline-md text-base font-semibold">Smart Suggestions</h3>
                </div>
                <span className="bg-primary-container/10 text-primary-container px-2 py-0.5 rounded text-xs font-bold">
                  3 Pending
                </span>
              </div>
              <div className="flex-1 space-y-md overflow-y-auto pr-1 custom-scrollbar relative z-10">
                <div className="border border-outline-variant rounded-lg p-md bg-white hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-label-sm text-outline uppercase tracking-wider">
                      Experience &gt; Role 1
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-outline hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                      <button className="text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-error-container/30 p-2 rounded text-sm line-through text-on-surface-variant">
                      Worked on a web app and made it faster.
                    </div>
                    <div className="flex justify-center">
                      <span className="material-symbols-outlined text-outline-variant text-sm rotate-90 lg:rotate-0 lg:hidden">
                        arrow_downward
                      </span>
                      <span className="material-symbols-outlined text-outline-variant text-sm hidden lg:block">
                        arrow_downward
                      </span>
                    </div>
                    <div className="bg-surface-container-highest p-3 rounded text-sm text-on-surface border border-primary/20 relative">
                      <div className="absolute -left-1 top-3 w-2 h-2 rounded-full bg-primary"></div>
                      Architected a responsive React dashboard, improving load times by 40% and user
                      retention by 15%.
                    </div>
                  </div>
                </div>

                <div className="border border-outline-variant rounded-lg p-md bg-white hover:border-primary/50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-label-sm text-outline uppercase tracking-wider">
                      Projects &gt; Project A
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-outline hover:text-error transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                      <button className="text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-error-container/30 p-2 rounded text-sm line-through text-on-surface-variant">
                      Used Python to sort data.
                    </div>
                    <div className="flex justify-center">
                      <span className="material-symbols-outlined text-outline-variant text-sm">
                        arrow_downward
                      </span>
                    </div>
                    <div className="bg-surface-container-highest p-3 rounded text-sm text-on-surface border border-primary/20 relative">
                      <div className="absolute -left-1 top-3 w-2 h-2 rounded-full bg-primary"></div>
                      Implemented automated Python ETL pipelines, processing 1M+ rows of data daily
                      with 99.9% accuracy.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
