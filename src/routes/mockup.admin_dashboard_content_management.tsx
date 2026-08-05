import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/admin_dashboard_content_management")({
  component: AdminDashboardContentManagementPage,
});

function AdminDashboardContentManagementPage() {
  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-20 hover:w-sidebar-width transition-all duration-300 bg-surface-dim border-r border-outline-variant shadow-lg z-50 flex flex-col items-center hover:items-start py-lg gap-lg group overflow-hidden">
        <div className="flex items-center gap-md px-md w-full">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary">admin_panel_settings</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48 shrink-0">
            <div className="text-headline-md font-headline-md font-black text-on-surface truncate">
              PlacePro Admin
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant truncate">
              System Controller
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-sm w-full px-xs">
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              admin_panel_settings
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Admin Dashboard
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              group
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Users
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              school
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Teachers
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              shield_person
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Admins
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              analytics
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Analytics
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              video_stable
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Interviews
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              account_tree
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Projects
            </span>
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item relative"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0 text-xl group-hover/item:text-primary transition-colors">
              library_books
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover/item:text-primary">
              Quizzes
            </span>
          </a>

          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold bg-surface-container-high w-full group/item relative"
            href="#"
          >
            <span
              className="material-symbols-outlined shrink-0 text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              topic
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Topics
            </span>
          </a>
        </div>
      </nav>

      <main className="ml-20 flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-surface border-b border-outline-variant shadow-sm docked full-width top-0 sticky z-40 flex justify-between items-center px-lg py-md">
          <div className="flex items-center gap-md">
            <button className="md:hidden text-on-surface-variant p-sm rounded-full hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="text-headline-md font-headline-md font-extrabold text-primary hidden md:block">
              PlacePro Admin
            </div>
          </div>
          <div className="flex flex-1 max-w-xl mx-md hidden md:flex items-center bg-surface-container-low rounded-full px-md py-sm border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-on-surface-variant mr-sm">search</span>
            <input
              className="bg-transparent border-none outline-none text-body-md w-full text-on-surface placeholder:text-on-surface-variant/70 focus:ring-0 p-0"
              placeholder="Search content, users, or settings..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-sm">
            <button className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-highest transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-sm rounded-full text-on-surface-variant hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="ml-sm w-10 h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer">
              <img
                alt="Admin Avatar"
                className="w-full h-full object-cover"
                data-alt="A small, professional avatar portrait of an admin user with short dark hair, wearing a navy blazer, against a clean light grey background, high resolution, modern SaaS UI style."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXVguJh9wRwlw-N1YhMTS2Z12TgyuV4aNXSWPT0SV96NUhLqgvXi1IgpmJkgRL9n3EjZz1pg8wFeC_12tw459ZV9RiV_mV7LCw90zHNWSoHO-DmB_nCOB_l4uZEZ546Tvk_RmK4sILB9DU_E_G_92pU6skIrFJRdPx5KsvaZpsnv_DT-IXa735VjEN6zGJ2vPnqfAjeXdbd-5Kkfol8WNhf1_sblUJMsPmx8fFmdKeBdqR_-9oPNJCA"
              />
            </div>
          </div>
        </header>
        <div className="p-xl max-w-container-max mx-auto w-full flex flex-col gap-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Content Management
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                Overview of platform educational assets and domains.
              </p>
            </div>
            <div className="relative group inline-block">
              <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-body-md font-medium flex items-center gap-sm hover:bg-surface-tint transition-colors shadow-sm">
                <span className="material-symbols-outlined text-xl">add</span>
                Create New
                <span className="material-symbols-outlined text-sm ml-xs">expand_more</span>
              </button>

              <div className="absolute right-0 top-full mt-sm w-48 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 flex flex-col py-xs">
                <button className="text-left px-md py-sm text-body-md hover:bg-surface-container-high transition-colors text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-lg text-on-surface-variant">
                    topic
                  </span>{" "}
                  Topic
                </button>
                <button className="text-left px-md py-sm text-body-md hover:bg-surface-container-high transition-colors text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-lg text-on-surface-variant">
                    quiz
                  </span>{" "}
                  Quiz
                </button>
                <button className="text-left px-md py-sm text-body-md hover:bg-surface-container-high transition-colors text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-lg text-on-surface-variant">
                    code
                  </span>{" "}
                  Challenge
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] border-l-4 border-l-primary flex items-center justify-between">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm">
                  Total Topics
                </div>
                <div className="font-headline-lg text-headline-lg text-on-surface">45</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  library_books
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] border-l-4 border-l-primary flex items-center justify-between">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm">
                  Active Quizzes
                </div>
                <div className="font-headline-lg text-headline-lg text-on-surface">120</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">quiz</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] border-l-4 border-l-primary flex items-center justify-between">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm">
                  Coding Challenges
                </div>
                <div className="font-headline-lg text-headline-lg text-on-surface">350</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">code_blocks</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] border-l-4 border-l-secondary-container flex items-center justify-between">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm">
                  Pending Reviews
                </div>
                <div className="font-headline-lg text-headline-lg text-on-surface">12</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary-fixed/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  pending_actions
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div className="lg:col-span-1 flex flex-col gap-md">
              <h2 className="font-headline-md text-headline-md text-on-surface">Major Domains</h2>
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] overflow-hidden">
                <div className="p-lg border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container text-sm">
                          account_tree
                        </span>
                      </div>
                      <span className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                        Data Structures
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                      24 Modules
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 mt-md">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Avg Completion
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">85%</span>
                  </div>
                </div>

                <div className="p-lg border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container text-sm">
                          architecture
                        </span>
                      </div>
                      <span className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                        System Design
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                      18 Modules
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 mt-md">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "62%" }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Avg Completion
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">62%</span>
                  </div>
                </div>

                <div className="p-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container text-sm">
                          functions
                        </span>
                      </div>
                      <span className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                        Algorithms
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                      32 Modules
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 mt-md">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Avg Completion
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">78%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-md">
              <div className="flex justify-between items-center">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Recent Content
                </h2>
                <button className="text-primary font-label-sm text-label-sm font-bold hover:underline flex items-center gap-xs">
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.05),0_2px_4px_-2px_rgb(0_0_0_/_0.05)] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="p-lg font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Name
                      </th>
                      <th className="p-lg font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Type
                      </th>
                      <th className="p-lg font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Author
                      </th>
                      <th className="p-lg font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-lg font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-lg">
                        <div className="font-body-md font-medium text-on-surface">
                          Advanced Trees Mastery
                        </div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">
                          Data Structures
                        </div>
                      </td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs bg-primary-fixed-dim/20 text-primary px-2 py-1 rounded font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px]">quiz</span> Quiz
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant">Dr. Alan Turing</td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs text-secondary-container font-label-sm text-label-sm">
                          <span className="w-2 h-2 rounded-full bg-secondary-container"></span>{" "}
                          Draft
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant text-right">
                        2 hrs ago
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-lg">
                        <div className="font-body-md font-medium text-on-surface">
                          Microservices vs Monoliths
                        </div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">
                          System Design
                        </div>
                      </td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs bg-surface-variant text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px]">topic</span> Topic
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant">Grace Hopper</td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs text-primary font-label-sm text-label-sm">
                          <span className="w-2 h-2 rounded-full bg-primary"></span> Live
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant text-right">
                        5 hrs ago
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-lg">
                        <div className="font-body-md font-medium text-on-surface">
                          Two Pointers Pattern
                        </div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">
                          Algorithms
                        </div>
                      </td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs bg-primary-fixed-dim/20 text-primary px-2 py-1 rounded font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px]">code</span>{" "}
                          Challenge
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant">Ada Lovelace</td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs text-primary font-label-sm text-label-sm">
                          <span className="w-2 h-2 rounded-full bg-primary"></span> Live
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant text-right">
                        1 day ago
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="p-lg">
                        <div className="font-body-md font-medium text-on-surface">
                          SQL Indexing Deep Dive
                        </div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">
                          DBMS
                        </div>
                      </td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs bg-surface-variant text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px]">topic</span> Topic
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant">E.F. Codd</td>
                      <td className="p-lg">
                        <span className="inline-flex items-center gap-xs text-tertiary-container font-label-sm text-label-sm">
                          <span className="w-2 h-2 rounded-full bg-tertiary-container"></span> Needs
                          Review
                        </span>
                      </td>
                      <td className="p-lg font-body-md text-on-surface-variant text-right">
                        2 days ago
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="py-xl w-full flex justify-center mt-auto">
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              © 2024 PlacePro Career OS. Admin Console.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
