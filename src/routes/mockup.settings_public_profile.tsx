import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/settings_public_profile")({
  component: SettingsPublicProfilePage,
});

function SettingsPublicProfilePage() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-full py-6 px-4 w-sidebar-width overflow-y-auto bg-surface-container-lowest dark:bg-inverse-surface shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] fixed left-0 top-0 z-50">
        <div className="mb-8 flex items-center gap-2 px-2 pt-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-display-lg text-[24px] font-black leading-none">
            P
          </div>
          <div>
            <h1 className="text-headline-md font-display-lg font-extrabold text-primary dark:text-inverse-primary leading-tight">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase opacity-80 mt-1">
              Career OS
            </p>
          </div>
        </div>

        <button className="w-full bg-primary hover:bg-surface-tint text-on-primary font-body-md font-medium py-3 rounded-lg mb-6 transition-transform duration-150 active:scale-[0.98] shadow-sm flex justify-center items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          Start Practice
        </button>

        <div className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">rss_feed</span>
            <span className="font-label-sm text-label-sm">Feed</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">video_chat</span>
            <span className="font-label-sm text-label-sm">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">quiz</span>
            <span className="font-label-sm text-label-sm">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">sports_esports</span>
            <span className="font-label-sm text-label-sm">Arena</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">work</span>
            <span className="font-label-sm text-label-sm">Jobs</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">map</span>
            <span className="font-label-sm text-label-sm">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="font-label-sm text-label-sm">Resume</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">leaderboard</span>
            <span className="font-label-sm text-label-sm">Leaderboard</span>
          </a>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-l-lg text-primary dark:text-inverse-primary font-bold border-r-4 border-primary dark:border-inverse-primary bg-surface-container-low dark:bg-surface-dim transition-colors duration-200"
            href="#"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
            <span className="font-label-sm text-label-sm">Profile</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">groups</span>
            <span className="font-label-sm text-label-sm">Rooms</span>
          </a>
        </div>

        <div className="mt-auto pt-6 border-t border-surface-variant space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="font-label-sm text-label-sm">Logout</span>
          </a>
        </div>
      </nav>

      <main className="flex-1 md:ml-sidebar-width min-h-screen">
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md px-4 md:px-xl h-16 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface">Profile Settings</h2>

          <button className="md:hidden p-2 text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        <div className="p-4 md:p-xl max-w-container-max mx-auto space-y-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-xl">
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-variant">
                <div className="flex items-center gap-4 border-b border-surface-variant pb-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container p-0.5">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        data-alt="A close-up portrait of a professional student or young professional, smiling slightly, set against a clean, light mode background with subtle warm lighting. The image should look like a high-quality SaaS platform profile picture, conveying competence and approachability."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA85mdHZb9wbTSsOejuB_gXOUVi_8lgI9FuNVGTxZfmH1zEmTHHOr4ABE24ANptBtIsoQiHEPHcgoPudh50DtM_1xuS5PJo7LKiXqAQLQKsCp9dnDUZYdPOfXj4Ubg96lZ8WPk3L0psT1iwXqgVvRmIepu2ZuYAv10nCO6iAONnRjDtR8Pe0FHIw12FP6l-8BCzhMoxNA3wPRmFIFEt5icJORVHUpXAcNDbEJnHWZdxCB_Z3bpRlnyg1Q"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface-container-lowest hover:bg-surface-tint transition-colors">
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-on-surface font-semibold">
                      Alex Rivera
                    </h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Computer Science, '25
                    </p>
                  </div>
                </div>

                <nav className="space-y-1">
                  <a
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-low text-primary font-medium"
                    href="#public-profile"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        person
                      </span>
                      <span className="font-label-sm text-label-sm">Public Profile</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </a>
                  <a
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                    href="#education"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">school</span>
                      <span className="font-label-sm text-label-sm">Education</span>
                    </div>
                  </a>
                  <a
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                    href="#preferences"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                      <span className="font-label-sm text-label-sm">Preferences</span>
                    </div>
                  </a>
                  <a
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                    href="#security"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                      <span className="font-label-sm text-label-sm">Security</span>
                    </div>
                  </a>
                </nav>

                <div className="mt-6 pt-4 border-t border-surface-variant">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Profile Strength
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">85%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <p className="font-label-sm text-[11px] text-outline mt-2">
                    Complete your Preferences to reach 100%
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-xl">
              <section
                className="bg-surface-container-lowest rounded-xl p-6 md:p-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-l-4 border-l-primary"
                id="public-profile"
              >
                <div className="mb-6">
                  <h3 className="font-headline-md text-[20px] text-on-surface mb-1">
                    Public Profile
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    This information will be displayed publicly to recruiters and peers.
                  </p>
                </div>
                <form className="space-y-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                          type="text"
                          value="Alex"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                          type="text"
                          value="Rivera"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                      Bio
                    </label>
                    <textarea
                      className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface placeholder:text-outline resize-none"
                      rows="4"
                    >
                      Passionate software engineering student focused on full-stack development.
                      Seeking summer 2025 internship opportunities in fast-paced environments.
                    </textarea>
                    <p className="text-xs text-outline mt-1 text-right">135 / 300 characters</p>
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-3">
                      Social Links
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 bg-surface p-2 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px]">link</span>
                        </div>
                        <input
                          className="flex-1 bg-transparent border-none p-0 focus:ring-0 font-body-md text-sm text-on-surface placeholder:text-outline outline-none"
                          placeholder="Portfolio URL"
                          type="url"
                          value="https://alexrivera.dev"
                        />
                      </div>
                      <div className="flex items-center gap-3 bg-surface p-2 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="w-8 h-8 rounded bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5]">
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <input
                          className="flex-1 bg-transparent border-none p-0 focus:ring-0 font-body-md text-sm text-on-surface placeholder:text-outline outline-none"
                          placeholder="LinkedIn URL"
                          type="url"
                          value="linkedin.com/in/arivera"
                        />
                      </div>
                      <div className="flex items-center gap-3 bg-surface p-2 rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <div className="w-8 h-8 rounded bg-[#181717]/10 flex items-center justify-center text-[#181717] dark:text-white dark:bg-white/10">
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          className="flex-1 bg-transparent border-none p-0 focus:ring-0 font-body-md text-sm text-on-surface placeholder:text-outline outline-none"
                          placeholder="GitHub URL"
                          type="url"
                          value="github.com/arivera-dev"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-primary hover:bg-surface-tint text-on-primary font-body-md font-medium px-6 py-2.5 rounded-lg transition-transform duration-150 active:scale-[0.98] shadow-sm"
                      type="button"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </section>

              <section
                className="bg-surface-container-lowest rounded-xl p-6 md:p-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]"
                id="education"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-md text-[20px] text-on-surface mb-1">Education</h3>
                    <p className="font-body-md text-sm text-on-surface-variant">
                      Update your current academic standing.
                    </p>
                  </div>
                </div>
                <form className="space-y-md">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                      University / College Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[20px]">
                        account_balance
                      </span>
                      <input
                        className="w-full pl-11 pr-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                        type="text"
                        value="State University Institute of Technology"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                        Degree
                      </label>
                      <select className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23777587%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat">
                        <option>Bachelors (B.Tech / B.Sc)</option>
                        <option>Masters (M.Tech / M.Sc)</option>
                        <option>Ph.D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                        Graduation Year
                      </label>
                      <select className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23777587%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat">
                        <option>2024</option>
                        <option selected="">2025</option>
                        <option>2026</option>
                        <option>2027</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 pt-4">
                    <button
                      className="bg-surface hover:bg-surface-container text-primary font-body-md font-medium px-6 py-2.5 rounded-lg border border-outline-variant transition-colors shadow-sm"
                      type="button"
                    >
                      Update Education
                    </button>
                  </div>
                </form>
              </section>

              <section
                className="bg-surface-container-lowest rounded-xl p-6 md:p-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border-l-4 border-l-secondary-container"
                id="preferences"
              >
                <div className="mb-6">
                  <h3 className="font-headline-md text-[20px] text-on-surface mb-1 flex items-center gap-2">
                    Job Preferences
                    <span className="bg-secondary-container/20 text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Action Needed
                    </span>
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    We use this to recommend relevant opportunities and roadmap content.
                  </p>
                </div>
                <div className="space-y-lg">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-3">
                      Target Roles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 rounded-full border border-primary bg-primary/10 text-primary font-body-md text-sm font-medium transition-colors hover:bg-primary/20 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check</span>{" "}
                        Frontend Dev
                      </button>
                      <button className="px-4 py-2 rounded-full border border-primary bg-primary/10 text-primary font-body-md text-sm font-medium transition-colors hover:bg-primary/20 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check</span> Backend
                        Dev
                      </button>
                      <button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant font-body-md text-sm font-medium transition-colors hover:bg-surface-container hover:border-outline">
                        Data Science
                      </button>
                      <button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant font-body-md text-sm font-medium transition-colors hover:bg-surface-container hover:border-outline">
                        UI/UX Design
                      </button>
                      <button className="px-4 py-2 rounded-full border border-dashed border-outline text-outline font-body-md text-sm font-medium transition-colors hover:bg-surface-container hover:text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">add</span> Add Role
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface mb-2">
                      Preferred Locations
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined text-[20px]">
                        location_on
                      </span>
                      <input
                        className="w-full pl-11 pr-4 py-2.5 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface placeholder:text-outline"
                        placeholder="e.g. San Francisco, Remote, New York"
                        type="text"
                        value="Remote, Austin TX"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-surface-variant">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-body-md text-on-surface font-medium group-hover:text-primary transition-colors">
                          Actively looking for jobs
                        </div>
                        <div className="text-sm text-on-surface-variant">
                          Your profile will be highlighted to verified recruiters.
                        </div>
                      </div>

                      <div className="relative w-11 h-6 bg-primary rounded-full peer-focus:ring-4 peer-focus:ring-primary/20">
                        <div className="absolute top-[2px] left-[2px] bg-white border-outline-variant border rounded-full h-5 w-5 transition-transform translate-x-full border-white"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-body-md text-on-surface font-medium group-hover:text-primary transition-colors">
                          Receive email notifications
                        </div>
                        <div className="text-sm text-on-surface-variant">
                          Get alerts for new job postings matching your preferences.
                        </div>
                      </div>

                      <div className="relative w-11 h-6 bg-surface-variant rounded-full border border-outline-variant">
                        <div className="absolute top-[1px] left-[1px] bg-white border-outline-variant border rounded-full h-5 w-5 transition-transform"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="h-8"></div>
        </div>
      </main>
    </>
  );
}
