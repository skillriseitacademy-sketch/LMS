import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/admin_dashboard")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  return (
    <>
      <aside className="fixed left-0 top-0 h-screen admin-sidebar transition-all duration-300 bg-surface-dim dark:bg-inverse-surface border-r border-outline-variant shadow-lg z-50 flex flex-col items-center py-6 gap-6 group overflow-hidden md:hover:items-start md:hover:px-md">
        <div className="flex items-center justify-center md:justify-start w-full md:group-hover:px-sm transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary" data-icon="rocket_launch">
              rocket_launch
            </span>
          </div>
          <div className="sidebar-label ml-2 flex-col">
            <h1 className="text-headline-md font-headline-md font-black text-on-surface leading-tight">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">System Controller</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 w-full mt-8">
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-primary font-bold bg-surface-container-high dark:bg-surface-variant relative md:group-hover:justify-start justify-center group/item w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="admin_panel_settings">
              admin_panel_settings
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Admin Dashboard</span>

            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full hidden md:block"></div>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="group">
              group
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Users</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="school">
              school
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Teachers</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="shield_person">
              shield_person
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Admins</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="analytics">
              analytics
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Analytics</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="video_stable">
              video_stable
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Interviews</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="account_tree">
              account_tree
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Projects</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="library_books">
              library_books
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Quizzes</span>
          </a>
          <a
            className="sidebar-item flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors md:group-hover:justify-start justify-center w-full"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0" data-icon="topic">
              topic
            </span>
            <span className="sidebar-label ml-2 font-label-sm text-label-sm">Topics</span>
          </a>
        </nav>

        <div className="mt-auto w-full md:group-hover:px-sm pt-4 border-t border-outline-variant flex justify-center md:justify-start items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-variant shrink-0">
            <img
              alt="Admin Avatar"
              className="w-full h-full object-cover"
              data-alt="A professional headshot of a female tech administrator with glasses, lit by soft studio lighting against a clean, light mode neutral background, maintaining a corporate modern aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtrZS76_KOxb7eD5Ogo58jEL06mA1pBNUf0_pBgdIsxf49EYE5W9JjJKiaJGJFqFut9sjpeNWHiqVm6DjghQHjXLm-UlIlYmdVnj537HDyNPqSkTw64cnraEM2SgdZc4kx35gqbv2SZNg0bG1_NtJlmRmVtOco21z95f76b1swA08bV1V6cWNqUeeXDfgBksGgteZlcqrmVEj7BcolHnRa8bL2X7dSKMvwcJKJ3UqyudafNFmtZ6lvUQ"
            />
          </div>
          <div className="sidebar-label ml-2 flex-col">
            <p className="font-label-sm text-label-sm font-bold text-on-surface">Eleanor R.</p>
            <p className="font-label-sm text-[10px] text-on-surface-variant">Super Admin</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-[80px] flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant px-8 py-4 flex justify-between items-center shadow-sm">
          <h2 className="text-headline-md font-headline-md font-bold text-on-surface">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-surface-container-low rounded-full border border-outline-variant">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                System Optimal
              </span>
            </div>
            <button className="p-1 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors relative">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-secondary-container"></span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-container-max mx-auto w-full flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card border-l-4 border-primary flex flex-col gap-2 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Total Students
                  </p>
                  <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">24.5k</h3>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg text-primary">
                  <span className="material-symbols-outlined" data-icon="groups">
                    groups
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto">
                <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">
                  trending_up
                </span>
                <span>+12% vs last month</span>
              </div>

              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card border-l-4 border-secondary-container flex flex-col gap-2 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Active Interviews
                  </p>
                  <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">1.2k</h3>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg text-secondary-container">
                  <span className="material-symbols-outlined" data-icon="video_chat">
                    video_chat
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-sm font-medium mt-auto">
                <span className="material-symbols-outlined text-[16px]" data-icon="schedule">
                  schedule
                </span>
                <span>In progress right now</span>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-container/5 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card border-l-4 border-tertiary flex flex-col gap-2 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Content Mastery
                  </p>
                  <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">78%</h3>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg text-tertiary">
                  <span className="material-symbols-outlined" data-icon="school">
                    school
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-sm font-medium mt-auto">
                <span className="material-symbols-outlined text-[16px]" data-icon="bar_chart">
                  bar_chart
                </span>
                <span>Avg platform score</span>
              </div>
              <div className="w-full bg-surface-variant h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: "78%" }}></div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary/5 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card border-l-4 border-primary-fixed-dim flex flex-col gap-2 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Revenue / Pro
                  </p>
                  <h3 className="text-headline-lg font-headline-lg text-on-surface mt-1">$12k</h3>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg text-primary-fixed-dim">
                  <span className="material-symbols-outlined" data-icon="payments">
                    payments
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary-fixed-dim text-sm font-medium mt-auto">
                <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">
                  trending_up
                </span>
                <span>+5% vs last week</span>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-fixed-dim/10 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[400px]">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-headline-md font-headline-md font-semibold text-on-surface">
                  User Growth
                </h3>
                <select className="bg-surface-container-low border border-outline-variant text-label-sm font-label-sm rounded-md px-2 py-1 focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>

              <div className="flex-1 bg-surface-variant/30 rounded-lg border border-outline-variant/50 relative overflow-hidden flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
                <svg className="w-full h-full" preserveaspectratio="none" viewBox="0 0 100 40">
                  <path
                    d="M0,40 L0,30 C10,25 20,35 30,20 C40,5 50,25 60,15 C70,5 80,15 90,5 L100,0 L100,40 Z"
                    fill="rgba(79, 70, 229, 0.1)"
                  />
                  <path
                    d="M0,30 C10,25 20,35 30,20 C40,5 50,25 60,15 C70,5 80,15 90,5 L100,0"
                    fill="none"
                    stroke="#3525cd"
                    strokeWidth="0.5"
                    vector-effect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card flex flex-col">
              <div className="mb-4">
                <h3 className="text-headline-md font-headline-md font-semibold text-on-surface">
                  Content Distribution
                </h3>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center relative">
                <div className="w-40 h-40 rounded-full border-[16px] border-surface-variant relative">
                  <div
                    className="absolute inset-[-16px] rounded-full border-[16px] border-primary"
                    style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 70%)" }}
                  ></div>
                  <div
                    className="absolute inset-[-16px] rounded-full border-[16px] border-secondary-container"
                    style={{ clipPath: "polygon(50% 50%, 0 70%, 0 0, 30% 0)" }}
                  ></div>
                  <div
                    className="absolute inset-[-16px] rounded-full border-[16px] border-tertiary"
                    style={{ clipPath: "polygon(50% 50%, 30% 0, 100% 0)" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-headline-md font-headline-md font-bold text-on-surface">
                      1.4k
                    </span>
                    <span className="text-[10px] font-label-sm text-on-surface-variant uppercase">
                      Modules
                    </span>
                  </div>
                </div>
                <div className="mt-6 w-full flex flex-col gap-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="text-on-surface-variant">DSA Problems</span>
                    </div>
                    <span className="font-medium text-on-surface">55%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      <span className="text-on-surface-variant">System Design</span>
                    </div>
                    <span className="font-medium text-on-surface">30%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <span className="text-on-surface-variant">Soft Skills</span>
                    </div>
                    <span className="font-medium text-on-surface">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-card p-6 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-4 border-b border-outline-variant pb-2">
              <h3 className="text-headline-md font-headline-md font-semibold text-on-surface">
                Recent Activity
              </h3>
              <button className="text-primary font-label-sm text-label-sm hover:underline flex items-center gap-1">
                View All{" "}
                <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
              <div className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]" data-icon="post_add">
                    post_add
                  </span>
                </div>
                <div className="flex-1 border-b border-outline-variant/30 pb-4 group-last:border-0 group-last:pb-0">
                  <p className="text-body-md font-body-md text-on-surface">
                    <span className="font-semibold">Sarah J.</span> added 10 new DSA problems to the{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                      Advanced Graphs
                    </span>{" "}
                    module.
                  </p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                    10 mins ago
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]" data-icon="campaign">
                    campaign
                  </span>
                </div>
                <div className="flex-1 border-b border-outline-variant/30 pb-4 group-last:border-0 group-last:pb-0">
                  <p className="text-body-md font-body-md text-on-surface">
                    <span className="font-semibold">System</span>: New Interview Hub update v2.4
                    deployed successfully.
                  </p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                    1 hour ago
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]" data-icon="person_add">
                    person_add
                  </span>
                </div>
                <div className="flex-1 border-b border-outline-variant/30 pb-4 group-last:border-0 group-last:pb-0">
                  <p className="text-body-md font-body-md text-on-surface">
                    <span className="font-semibold">Admin Team</span> invited 50 new beta testers
                    for the Live Classes feature.
                  </p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                    3 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 w-8 h-8 rounded-full bg-tertiary-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]" data-icon="warning">
                    warning
                  </span>
                </div>
                <div className="flex-1 border-b border-outline-variant/30 pb-4 group-last:border-0 group-last:pb-0">
                  <p className="text-body-md font-body-md text-on-surface">
                    <span className="font-semibold">Automated Alert</span>: High server load
                    detected on Database Cluster B during peak quiz hours.
                  </p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                    Yesterday, 14:30
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
