import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/admin_dashboard_topic_detail_management")({
  component: AdminDashboardTopicDetailManagementPage,
});

function AdminDashboardTopicDetailManagementPage() {
  return (
    <>
      <nav className="sidebar-admin fixed left-0 top-0 h-screen w-20 hover:w-[280px] bg-surface-dim dark:bg-inverse-surface border-r border-outline-variant shadow-lg z-50 flex flex-col items-center hover:items-start py-lg gap-lg overflow-x-hidden">
        <div className="px-md flex items-center justify-center w-full">
          <span
            className="material-symbols-outlined text-primary text-[32px] shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <div className="label ml-md overflow-hidden">
            <h1 className="text-headline-md font-headline-md font-black text-on-surface truncate">
              PlacePro Admin
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
              System Controller
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full px-sm gap-base mt-lg">
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              admin_panel_settings
            </span>
            <span className="label font-medium text-on-surface-variant">Admin Dashboard</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              group
            </span>
            <span className="label font-medium text-on-surface-variant">Users</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              school
            </span>
            <span className="label font-medium text-on-surface-variant">Teachers</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              shield_person
            </span>
            <span className="label font-medium text-on-surface-variant">Admins</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              analytics
            </span>
            <span className="label font-medium text-on-surface-variant">Analytics</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              video_stable
            </span>
            <span className="label font-medium text-on-surface-variant">Interviews</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              account_tree
            </span>
            <span className="label font-medium text-on-surface-variant">Projects</span>
          </a>
          <a
            className="nav-item-inactive flex items-center p-md gap-md w-full transition-all"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-on-surface-variant">
              library_books
            </span>
            <span className="label font-medium text-on-surface-variant">Quizzes</span>
          </a>

          <a
            className="nav-item-active flex items-center p-md gap-md w-full transition-all opacity-80"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-primary">topic</span>
            <span className="label font-bold text-primary">Topics</span>
          </a>
        </div>
      </nav>

      <main className="ml-20 flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm py-md px-lg flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
            <a className="hover:text-primary transition-colors" href="#">
              Content Management
            </a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <a className="hover:text-primary transition-colors" href="#">
              Topics
            </a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-bold text-on-surface">Data Structures</span>
          </div>
          <div className="flex items-center gap-md">
            <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                notifications
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-sm">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-xl bg-surface">
          <div className="max-w-container-max mx-auto space-y-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Topic: Data Structures
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                  Manage curriculum, assessments, and track performance for this topic.
                </p>
              </div>
              <div className="flex items-center gap-md">
                <button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-sm text-label-sm flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  View on App
                </button>
                <button className="px-md py-sm rounded-lg bg-primary text-on-primary hover:bg-surface-tint transition-colors font-label-sm text-label-sm flex items-center gap-xs shadow-sm hover:scale-105 transform duration-200">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit Topic
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="bg-surface-container-lowest rounded-xl p-lg card-shadow border-l-4 border-primary">
                <div className="flex items-center justify-between mb-md">
                  <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Total Enrollment
                  </h3>
                  <span className="material-symbols-outlined text-primary bg-primary-fixed-dim bg-opacity-20 rounded-full p-xs">
                    group
                  </span>
                </div>
                <div className="font-display-lg text-display-lg text-on-surface">12.5k</div>
                <div className="mt-xs text-body-md font-body-md text-secondary-container flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +15% this month
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-lg card-shadow border-l-4 border-secondary-container">
                <div className="flex items-center justify-between mb-md">
                  <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Avg. Quiz Score
                  </h3>
                  <span className="material-symbols-outlined text-secondary-container bg-secondary-fixed bg-opacity-20 rounded-full p-xs">
                    analytics
                  </span>
                </div>
                <div className="font-display-lg text-display-lg text-on-surface">76%</div>
                <div className="mt-xs w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary-container h-full rounded-full"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-lg card-shadow border-l-4 border-outline-variant">
                <div className="flex items-center justify-between mb-md">
                  <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Total Lessons
                  </h3>
                  <span className="material-symbols-outlined text-on-surface-variant bg-surface-container-high rounded-full p-xs">
                    menu_book
                  </span>
                </div>
                <div className="font-display-lg text-display-lg text-on-surface">15</div>
                <div className="mt-xs flex gap-sm">
                  <span className="px-xs py-[2px] rounded bg-primary-fixed-dim bg-opacity-20 text-primary font-label-sm text-label-sm">
                    5 Modules
                  </span>
                  <span className="px-xs py-[2px] rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                    3 Quizzes
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
              <div className="lg:col-span-2 space-y-lg">
                <div className="bg-surface-container-lowest rounded-xl card-shadow overflow-hidden flex flex-col h-full">
                  <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-bright">
                    <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary">drag_indicator</span>
                      Curriculum Builder
                    </h3>
                    <button className="text-primary hover:text-surface-tint font-label-sm text-label-sm flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[18px]">add</span> Add Module
                    </button>
                  </div>
                  <div className="p-md space-y-sm bg-surface-container-low flex-1">
                    <div className="group bg-surface-container-lowest p-md rounded-lg border border-outline-variant flex items-center justify-between hover:border-primary transition-colors cursor-move">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors cursor-grab">
                          drag_handle
                        </span>
                        <div>
                          <h4 className="font-body-lg text-body-lg text-on-surface font-medium">
                            1. Arrays &amp; Strings
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
                            3 Lessons • 1 Quiz
                          </p>
                        </div>
                      </div>
                      <button className="px-sm py-xs rounded text-primary hover:bg-primary-fixed-dim hover:bg-opacity-20 font-label-sm text-label-sm transition-colors border border-transparent hover:border-primary-fixed-dim">
                        Manage
                      </button>
                    </div>

                    <div className="group bg-surface-container-lowest p-md rounded-lg border border-outline-variant flex items-center justify-between hover:border-primary transition-colors cursor-move">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors cursor-grab">
                          drag_handle
                        </span>
                        <div>
                          <h4 className="font-body-lg text-body-lg text-on-surface font-medium">
                            2. Linked Lists
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
                            4 Lessons • 2 Challenges
                          </p>
                        </div>
                      </div>
                      <button className="px-sm py-xs rounded text-primary hover:bg-primary-fixed-dim hover:bg-opacity-20 font-label-sm text-label-sm transition-colors border border-transparent hover:border-primary-fixed-dim">
                        Manage
                      </button>
                    </div>

                    <div className="group bg-surface-container-lowest p-md rounded-lg border border-outline-variant flex items-center justify-between hover:border-primary transition-colors cursor-move">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors cursor-grab">
                          drag_handle
                        </span>
                        <div>
                          <h4 className="font-body-lg text-body-lg text-on-surface font-medium">
                            3. Stacks &amp; Queues
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
                            2 Lessons • 1 Quiz
                          </p>
                        </div>
                      </div>
                      <button className="px-sm py-xs rounded text-primary hover:bg-primary-fixed-dim hover:bg-opacity-20 font-label-sm text-label-sm transition-colors border border-transparent hover:border-primary-fixed-dim">
                        Manage
                      </button>
                    </div>

                    <div className="group bg-surface-container-lowest p-md rounded-lg border border-outline-variant flex items-center justify-between hover:border-primary transition-colors cursor-move">
                      <div className="flex items-center gap-md">
                        <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors cursor-grab">
                          drag_handle
                        </span>
                        <div>
                          <h4 className="font-body-lg text-body-lg text-on-surface font-medium">
                            4. Trees &amp; Graphs
                          </h4>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
                            5 Lessons • 3 Challenges
                          </p>
                        </div>
                      </div>
                      <button className="px-sm py-xs rounded text-primary hover:bg-primary-fixed-dim hover:bg-opacity-20 font-label-sm text-label-sm transition-colors border border-transparent hover:border-primary-fixed-dim">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-lg">
                <div className="bg-surface-container-lowest rounded-xl p-lg card-shadow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-sm">
                    <span className="material-symbols-outlined text-secondary-container">
                      assignment
                    </span>
                    Linked Assessments
                  </h3>
                  <div className="space-y-md">
                    <div className="flex items-start gap-sm">
                      <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                        <span className="material-symbols-outlined text-[18px]">quiz</span>
                      </div>
                      <div>
                        <h4 className="font-body-md text-body-md font-medium text-on-surface">
                          Mid-Topic Evaluation
                        </h4>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          20 Questions • Hard
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-sm">
                      <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                        <span className="material-symbols-outlined text-[18px]">code</span>
                      </div>
                      <div>
                        <h4 className="font-body-md text-body-md font-medium text-on-surface">
                          BST Traversal Challenge
                        </h4>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          Coding • Medium
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-lg py-sm border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-sm text-label-sm">
                    View All Assessments
                  </button>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-lg card-shadow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-md">
                    30-Day Progress Trend
                  </h3>
                  <div className="h-32 w-full bg-surface-container-low rounded-lg relative overflow-hidden flex items-end">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                    <div className="w-full flex justify-between items-end px-xs h-full pb-xs gap-1 relative z-10">
                      <div
                        className="bg-primary opacity-40 w-full rounded-t-sm"
                        style={{ height: "30%" }}
                      ></div>
                      <div
                        className="bg-primary opacity-50 w-full rounded-t-sm"
                        style={{ height: "45%" }}
                      ></div>
                      <div
                        className="bg-primary opacity-60 w-full rounded-t-sm"
                        style={{ height: "40%" }}
                      ></div>
                      <div
                        className="bg-primary opacity-70 w-full rounded-t-sm"
                        style={{ height: "60%" }}
                      ></div>
                      <div
                        className="bg-primary opacity-80 w-full rounded-t-sm"
                        style={{ height: "75%" }}
                      ></div>
                      <div
                        className="bg-primary opacity-90 w-full rounded-t-sm"
                        style={{ height: "65%" }}
                      ></div>
                      <div
                        className="bg-primary w-full rounded-t-sm"
                        style={{ height: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-center mt-sm">
                    Completion Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
