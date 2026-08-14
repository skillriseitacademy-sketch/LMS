import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/admin_dashboard_quiz_editor")({
  component: AdminDashboardQuizEditorPage,
});

function AdminDashboardQuizEditorPage() {
  return (
    <>
      <aside className="bg-surface-dim border-r border-outline-variant shadow-lg fixed left-0 top-0 h-screen w-20 hover:w-sidebar-width transition-all duration-300 z-50 flex flex-col items-center py-6 gap-6 group overflow-hidden">
        <div className="flex items-center gap-4 w-full px-4 justify-center group-hover:justify-start overflow-hidden whitespace-nowrap">
          <span
            className="material-symbols-outlined text-[32px] text-primary shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            admin_panel_settings
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col">
            <span className="text-headline-md font-headline-md font-black text-on-surface">
              PlacePro Admin
            </span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              System Controller
            </span>
          </div>
        </div>
        <nav className="flex flex-col w-full px-1 gap-2 mt-8 overflow-y-auto w-full">
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">
              admin_panel_settings
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Admin Dashboard
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">group</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Users
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">school</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Teachers
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">shield_person</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Admins
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">analytics</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Analytics
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">video_stable</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Interviews
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">account_tree</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Projects
            </span>
          </a>

          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg bg-surface-container-high text-primary font-bold hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span
              className="material-symbols-outlined text-[24px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              library_books
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md">
              Quizzes
            </span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors w-full group/item"
            href="#"
          >
            <span className="material-symbols-outlined text-[24px] shrink-0">topic</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-body-md font-body-md font-medium">
              Topics
            </span>
          </a>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant w-full flex justify-center group-hover:px-md group-hover:justify-start">
          <img
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full border-2 border-primary-container shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8-cxf60vw7xqRtkRwmF5xlcCAl4M4oX8tQ2M-x9wBnuDpuWCOv_3FY_uTEBL5ihgstF38vnIRcKWaDVQDmKKushqPg97vsFRag6dPxixUJXhPXBTFIEZX-_cZwxIEbhVUcvY25rCaoBU7KGWDIB330JacDj17GPwQ57nX9TcqtNkERSbQeRFQAwsGAXg33GceIqMY3T-ovH6Yf3QpLXOwxiItopY9bJEcjDr1vkFwOGQ9VbJ7LHTsQ"
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2 flex flex-col justify-center whitespace-nowrap">
            <span className="text-body-md font-body-md font-semibold text-on-surface">
              Admin User
            </span>
            <a className="text-label-sm font-label-sm text-primary hover:underline" href="#">
              Sign Out
            </a>
          </div>
        </div>
      </aside>

      <main className="ml-20 flex-1 flex flex-col h-full bg-background transition-all duration-300 relative">
        <header className="bg-surface-container-lowest border-b border-outline-variant px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm h-[72px]">
          <div className="flex items-center gap-2 text-body-md font-body-md text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="#">
              Content Management
            </a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <a className="hover:text-primary transition-colors" href="#">
              Quizzes
            </a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Array Mastery</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-surface-container-low font-body-md text-body-md font-medium">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
              Preview
            </button>
            <div className="w-[1px] h-6 bg-outline-variant mx-1"></div>
            <button className="px-4 py-2 rounded-lg text-primary border border-primary hover:bg-primary-container hover:text-on-primary-container transition-colors font-body-md text-body-md font-medium">
              Save Draft
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors shadow-sm font-body-md text-body-md font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px]">publish</span>
              Publish
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6 pb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-headline-lg font-headline-lg text-on-surface">
                Quiz Editor: Array Mastery
              </h1>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant/30 flex flex-col gap-4 relative group">
              <div className="absolute -left-3 top-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-outline">
                <span className="material-symbols-outlined">drag_indicator</span>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="bg-surface-container-high text-on-surface-variant px-2 py-1 rounded text-label-sm font-label-sm font-bold">
                    Q1
                  </span>
                  <span className="bg-primary-fixed-dim/20 text-primary px-2 py-1 rounded text-label-sm font-label-sm">
                    Multiple Choice
                  </span>
                </div>
                <div className="flex gap-1 text-outline">
                  <button className="p-1 hover:bg-surface-container rounded transition-colors">
                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                  </button>
                  <button className="p-1 hover:bg-error-container hover:text-error rounded transition-colors">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-body-md font-body-md font-semibold text-on-surface">
                  Question Text
                </label>
                <textarea
                  className="w-full bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md min-h-[80px] resize-y"
                  placeholder="Enter question here..."
                >
                  What is the time complexity of accessing an element in an array by its index?
                </textarea>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-body-md font-body-md font-semibold text-on-surface">
                  Options
                </label>
                <div className="flex items-center gap-4">
                  <input
                    className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
                    name="q1_correct"
                    type="radio"
                  />
                  <input
                    className="flex-1 bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                    type="text"
                    value="O(n)"
                  />
                  <button className="text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    checked=""
                    className="w-5 h-5 text-primary border-outline-variant focus:ring-primary bg-primary"
                    name="q1_correct"
                    type="radio"
                  />
                  <input
                    className="flex-1 bg-surface border border-primary ring-1 ring-primary/20 rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                    type="text"
                    value="O(1)"
                  />
                  <button className="text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
                    name="q1_correct"
                    type="radio"
                  />
                  <input
                    className="flex-1 bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                    type="text"
                    value="O(log n)"
                  />
                  <button className="text-outline hover:text-error transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 text-primary font-body-md text-body-md font-medium hover:bg-primary-container/50 w-fit px-4 py-2 rounded-lg transition-colors mt-1">
                  <span className="material-symbols-outlined text-[20px]">add</span> Add Option
                </button>
              </div>
            </div>

            <button className="w-full border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary-fixed/10 transition-all group">
              <div className="bg-surface-container rounded-full p-2 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <span className="material-symbols-outlined text-[28px]">add</span>
              </div>
              <span className="font-headline-md text-headline-md font-semibold text-lg">
                Add New Question
              </span>
            </button>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant/30 sticky top-lg">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-4 pb-2 border-b border-outline-variant">
                Quiz Settings
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-body-md font-body-md font-medium text-on-surface-variant">
                    Quiz Name
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                    type="text"
                    value="Array Mastery"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-body-md font-body-md font-medium text-on-surface-variant">
                    Difficulty Level
                  </label>
                  <select className="w-full bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md appearance-none">
                    <option>Beginner</option>
                    <option selected="">Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-body-md font-body-md font-medium text-on-surface-variant">
                      Duration (mins)
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                      type="number"
                      value="15"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-body-md font-body-md font-medium text-on-surface-variant">
                      Passing Score (%)
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg p-2 focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md"
                      type="number"
                      value="70"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <label className="text-body-md font-body-md font-medium text-on-surface-variant">
                    Topics / Tags
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-outline-variant rounded-lg bg-surface">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-label-sm font-label-sm flex items-center gap-1">
                      Arrays{" "}
                      <button className="hover:text-error">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-label-sm font-label-sm flex items-center gap-1">
                      Data Structures{" "}
                      <button className="hover:text-error">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                    <input
                      className="bg-transparent border-none focus:ring-0 text-body-md font-body-md p-0 min-w-[80px] flex-1 text-on-surface"
                      placeholder="Add tag..."
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
