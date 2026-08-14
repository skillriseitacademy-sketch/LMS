import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/resume_builder_editor")({
  component: ResumeBuilderEditorPage,
});

function ResumeBuilderEditorPage() {
  return (
    <>
      <nav className="w-sidebar-width h-full fixed left-0 top-0 bg-surface-container-lowest shadow-sm flex flex-col py-6 px-4 z-50 md:flex hidden">
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="material-symbols-outlined icon-fill text-primary text-3xl">token</span>
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md font-bold text-primary leading-none">
              PlacePro
            </span>
            <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase mt-1">
              Career OS
            </span>
          </div>
        </div>
        <button className="bg-primary text-on-primary font-body-md font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 mb-8 hover:bg-surface-tint transition-colors w-full">
          <span className="material-symbols-outlined text-[20px]">bolt</span>
          Start Daily Challenge
        </button>
        <div className="flex-1 overflow-y-auto -mx-md px-4 pb-8">
          <ul className="space-y-1">
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">forum</span> Feed
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>{" "}
                Interview Hub
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">quiz</span> Quizzes
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">sports_esports</span> Arena
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">work</span> Jobs
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">map</span> Roadmap
              </a>
            </li>

            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg bg-surface-container-low text-primary font-bold border-r-4 border-primary scale-[0.98] transition-transform duration-200"
                href="#"
              >
                <span className="material-symbols-outlined icon-fill text-[20px]">description</span>{" "}
                Resume
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">leaderboard</span>{" "}
                Leaderboard
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">person</span> Profile
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">groups</span> Rooms
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-auto pt-4 border-t border-outline-variant/30">
          <ul className="space-y-1">
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span> Settings
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">help</span> Help
              </a>
            </li>
          </ul>
          <div className="mt-4 px-2 flex items-center gap-3">
            <img
              alt="User profile photo"
              className="w-8 h-8 rounded-full object-cover border border-outline-variant/30"
              data-alt="A small, circular avatar of a young professional student with a neutral expression, clean modern lighting, matching the corporate SaaS aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBza-4TugNQNMKNQEcqlikqAvHgJXDdV0WCF9qGi1OyTFYVv2T32iuMfcUtx2nBZTdRfhVRZA5ENpyT8umtYgZELrp75C3N6J7iTvnFHyPnpZ4LC_89mUn45ZQukgYDQ4iLf-0ni634WEqwj4o0zQn5kRQiG27U_ajX2CZ5JmzAKZVzvSvgPkr_gxg3vEVJFITB-MuwDQ2-EvjsOWdNeiKdUScA4B9R9vtO-ybQ-GtPhNROQE2F2rLzlA"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="font-body-md text-sm font-semibold truncate">Alex Student</span>
              <span className="font-label-sm text-label-sm text-outline truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col h-full ml-0 md:ml-sidebar-width transition-all duration-300">
        <header className="bg-surface border-b border-outline-variant/30 flex justify-between items-center w-full h-16 px-4 md:px-xl sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-1 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
              Resume Builder
            </h1>
            <span className="hidden md:flex items-center gap-1 text-label-sm font-label-sm bg-surface-container-highest text-primary px-2 py-1 rounded-full uppercase tracking-wide ml-2">
              <span className="material-symbols-outlined text-[14px]">save</span> Auto-saved
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-md">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/50 text-on-surface font-body-md font-medium hover:bg-surface-container-lowest transition-colors">
              <span className="material-symbols-outlined text-[20px]">view_quilt</span>
              Change Template
            </button>

            <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-body-md font-medium hover:bg-surface-tint transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <div className="h-8 w-px bg-outline-variant/30 hidden md:block mx-2"></div>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors relative">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-surface-container-low">
          <section className="w-full lg:w-1/2 flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant/30 z-10 relative">
            <div className="flex-1 overflow-y-auto editor-scroll p-4 md:p-xl space-y-xl">
              <div className="bg-surface-bright rounded-xl card-shadow border border-outline-variant/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-outline-variant/20 bg-surface flex justify-between items-center cursor-pointer hover:bg-surface-container-lowest transition-colors">
                  <h2 className="font-headline-md text-lg font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      person
                    </span>{" "}
                    Personal Details
                  </h2>
                  <span className="material-symbols-outlined text-outline">expand_less</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      First Name
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                      type="text"
                      value="Alex"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Last Name
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                      type="text"
                      value="Chen"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Professional Title
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                      type="text"
                      value="Software Engineering Intern"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Email
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                      type="email"
                      value="alex.c@university.edu"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                      Phone
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                      type="tel"
                      value="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-surface-bright rounded-xl card-shadow border border-outline-variant/20 overflow-hidden border-l-4 border-l-primary">
                <div className="px-6 py-4 border-b border-outline-variant/20 bg-surface flex justify-between items-center cursor-pointer hover:bg-surface-container-lowest transition-colors">
                  <h2 className="font-headline-md text-lg font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">work</span>{" "}
                    Work Experience
                  </h2>
                  <span className="material-symbols-outlined text-outline">expand_less</span>
                </div>
                <div className="p-6 space-y-lg">
                  <div className="border border-outline-variant/30 rounded-lg p-4 relative group hover:border-primary/50 transition-colors">
                    <div className="absolute top-md right-md flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-on-surface-variant hover:text-primary rounded">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-1 text-on-surface-variant hover:text-error rounded">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          Job Title
                        </label>
                        <input
                          className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                          type="text"
                          value="Software Engineering Intern"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          Employer
                        </label>
                        <input
                          className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                          type="text"
                          value="TechNova Solutions"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          Start Date
                        </label>
                        <input
                          className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                          type="month"
                          value="2023-05"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          End Date
                        </label>
                        <input
                          className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                          type="month"
                          value="2023-08"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 relative">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                        Description
                      </label>
                      <textarea
                        className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none leading-relaxed"
                        rows="4"
                      >
                        Developed internal dashboard using React and Node.js. Improved API response
                        time by 15% through query optimization. Collaborated with UX team to
                        implement responsive design features.
                      </textarea>

                      <button className="absolute bottom-3 right-3 text-secondary-container hover:text-secondary flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded shadow-sm border border-outline-variant/20 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        <span className="font-label-sm text-xs font-semibold">Enhance</span>
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-2 border-2 border-dashed border-outline-variant/50 rounded-lg text-on-surface-variant font-body-md font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors hover:bg-surface-container-low">
                    <span className="material-symbols-outlined">add</span> Add Experience
                  </button>
                </div>
              </div>

              <div className="bg-surface-bright rounded-xl card-shadow border border-outline-variant/20 overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                <div className="px-6 py-4 bg-surface flex justify-between items-center cursor-pointer hover:bg-surface-container-lowest transition-colors">
                  <h2 className="font-headline-md text-lg font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      school
                    </span>{" "}
                    Education
                  </h2>
                  <span className="material-symbols-outlined text-outline">expand_more</span>
                </div>
              </div>
              <div className="h-8"></div>
            </div>
          </section>

          <section className="hidden lg:flex lg:w-1/2 h-full relative flex-col items-center justify-start p-8 overflow-y-auto bg-surface-variant/30">
            <div className="absolute top-md right-xl flex items-center gap-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-1 z-20">
              <button className="p-1 hover:bg-surface-container-low rounded text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
              <span className="font-label-sm text-label-sm w-12 text-center">85%</span>
              <button className="p-1 hover:bg-surface-container-low rounded text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>

            <div className="resume-preview bg-white w-full max-w-[800px] mt-8 mb-8 rounded flex-shrink-0 p-12 text-on-background relative overflow-hidden font-body-md transform scale-[0.85] origin-top">
              <div className="border-b-2 border-primary pb-6 mb-6">
                <h1 className="text-4xl font-headline-lg font-bold text-on-background mb-2">
                  Alex Chen
                </h1>
                <p className="text-lg text-primary font-medium mb-4">Software Engineering Intern</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">mail</span>{" "}
                    alex.c@university.edu
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">phone</span> (555)
                    123-4567
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> San
                    Francisco, CA
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">link</span>{" "}
                    linkedin.com/in/alexc
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-on-background uppercase tracking-wider border-b border-outline-variant/30 pb-1 mb-3 flex items-center gap-2">
                  Experience
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-on-background">TechNova Solutions</h3>
                    <span className="text-sm font-medium text-primary">May 2023 - Aug 2023</span>
                  </div>
                  <p className="italic text-sm text-on-surface-variant mb-2">
                    Software Engineering Intern
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-on-surface ml-2 marker:text-primary">
                    <li>Developed internal dashboard using React and Node.js.</li>
                    <li className="relative">
                      Improved API response time by 15% through query optimization.
                      <span className="absolute inset-0 bg-secondary-fixed/30 -mx-1 px-1 rounded border border-secondary/20 pointer-events-none"></span>
                    </li>
                    <li>Collaborated with UX team to implement responsive design features.</li>
                  </ul>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-on-background uppercase tracking-wider border-b border-outline-variant/30 pb-1 mb-3">
                  Education
                </h2>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-on-background">State University</h3>
                  <span className="text-sm font-medium text-primary">Expected May 2025</span>
                </div>
                <p className="italic text-sm text-on-surface-variant">B.S. in Computer Science</p>
                <p className="text-sm text-on-surface mt-1">GPA: 3.8/4.0 | Dean's List</p>
              </div>
            </div>

            <div className="absolute bottom-xl right-xl w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 z-30 flex flex-col overflow-hidden transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-surface p-4 border-b border-outline-variant/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined icon-fill text-secondary-container">
                    auto_awesome
                  </span>
                  <h3 className="font-headline-md text-base font-semibold text-on-surface">
                    Resume AI Score
                  </h3>
                </div>

                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-secondary-fixed-dim/20">
                  <svg
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-outline-variant/30"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-secondary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="85, 100"
                      strokeWidth="3"
                    />
                  </svg>
                  <span className="font-bold text-sm text-secondary">85</span>
                </div>
              </div>
              <div className="p-4 bg-surface-bright space-y-3">
                <p className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wide">
                  Top Suggestions
                </p>
                <div className="flex gap-3 items-start p-2 rounded hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 group-hover:scale-110 transition-transform">
                    tips_and_updates
                  </span>
                  <div>
                    <p className="text-sm font-medium text-on-surface leading-tight">
                      Quantify your impact
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      In your TechNova role, change "Improved response time by 15%" to "reduced
                      latency by 150ms handling 10k req/min".
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start p-2 rounded hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-[18px] text-error mt-0.5 group-hover:scale-110 transition-transform">
                    keyboard
                  </span>
                  <div>
                    <p className="text-sm font-medium text-on-surface leading-tight">
                      Missing Key Tech
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Add keywords for <strong>Java</strong> and <strong>Spring Boot</strong> based
                      on your target "Backend Developer" roles.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container p-2 flex justify-center border-t border-outline-variant/20">
                <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  Fix All with AI{" "}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
