import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/settings_notifications")({
  component: SettingsNotificationsPage,
});

function SettingsNotificationsPage() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-full py-6 px-4 w-sidebar-width overflow-y-auto bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] z-50 fixed left-0 top-0">
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="text-headline-md font-display-lg font-extrabold text-primary">
            PlacePro
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container py-1 px-2 rounded-full">
            Career OS
          </span>
        </div>
        <button className="w-full bg-primary text-on-primary py-2 px-4 rounded-lg font-headline-md text-body-md hover:bg-primary-container transition-colors duration-200 mb-6 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]">
          <span className="material-symbols-outlined text-on-primary" style={{ fontSize: "20px" }}>
            play_arrow
          </span>
          Start Practice
        </button>
        <div className="flex-1 flex flex-col gap-1">
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span>
            <span className="font-body-md text-body-md">Feed</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">video_chat</span>
            <span className="font-body-md text-body-md">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-body-md text-body-md">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            <span className="font-body-md text-body-md">Arena</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-body-md text-body-md">Jobs</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-body-md text-body-md">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-md text-body-md">Resume</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-body-md text-body-md">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-body-md text-body-md">Profile</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-body-md text-body-md">Rooms</span>
          </a>
        </div>
        <div className="mt-auto pt-6 border-t border-outline-variant/30 flex flex-col gap-1">
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              settings
            </span>
            <span className="font-body-md text-body-md">Settings</span>
          </a>
          <a
            className="flex items-center gap-4 py-2 px-4 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors duration-200 active:scale-[0.98]"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md text-body-md">Logout</span>
          </a>
          <div className="mt-4 px-2 flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
              data-alt="A professional headshot of a student in a modern indoor setting with soft lighting. The styling is clean and corporate modern, reflecting a bright, optimistic SaaS application aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7GZWkHiuiCCRmYTWe3BvtFoqQaDDNlJgu5s-25_ugDj0k2RJUdUqAnoB0m2l8Fvx_CK2w-gqS65I82lLH__0O1GXFQlEeZI5DLOvsyggZtVh5qJ127YU1070f1P7f20wQjOPOKL0f5VaTV4A8NpJt-DGZruTqTpfD7NPJ3HPegEl_a2OgczmMIRJH_lU_DfBpKHE1VnGVJBU5Yixunl1iLTCbSnlaOPJ6UjdcS1Z4EJ4kpLS5q0t2lQ"
            />
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Alex Chen
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">
                Computer Science
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 md:ml-sidebar-width flex flex-col min-h-screen relative">
        <header className="hidden md:flex justify-between items-center px-8 w-[calc(100%-280px)] h-16 z-40 fixed top-0 right-0 bg-surface/80 backdrop-blur-md">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 rounded-lg transition-all">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-body-md text-on-surface placeholder-outline focus:outline-none focus:border-primary focus:bg-surface transition-colors"
                placeholder="Search PlacePro..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all active:scale-[0.98] relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined">workspace_premium</span>
            </button>
            <div className="ml-2 w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-[14px] cursor-pointer shadow-sm">
              AC
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-xl mt-0 md:mt-16 w-full max-w-container-max mx-auto">
          <div className="mb-6">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-1">
              Notification Preferences
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Control how and when PlacePro communicates with you.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-lg">
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
                  <span className="material-symbols-outlined text-primary">work_history</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Career Opportunities
                  </h2>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <h3 className="font-body-lg text-body-lg text-on-surface font-medium">
                        Interview Invitations
                      </h3>
                      <p className="font-body-md text-[14px] text-on-surface-variant mt-1">
                        Get instantly notified when a company invites you to interview.
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                      <input
                        checked=""
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        id="toggle-interview"
                        name="toggle"
                        type="checkbox"
                      />
                      <label
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        htmlFor="toggle-interview"
                      ></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <h3 className="font-body-lg text-body-lg text-on-surface font-medium">
                        New Job Matches
                      </h3>
                      <p className="font-body-md text-[14px] text-on-surface-variant mt-1">
                        Alerts for new postings that align with your profile and skills.
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                      <input
                        checked=""
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        id="toggle-jobs"
                        name="toggle"
                        type="checkbox"
                      />
                      <label
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        htmlFor="toggle-jobs"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
                  <span className="material-symbols-outlined text-secondary-container">
                    sports_esports
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Practice &amp; Preparation
                  </h2>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <h3 className="font-body-lg text-body-lg text-on-surface font-medium">
                        Coding Arena Challenges
                      </h3>
                      <p className="font-body-md text-[14px] text-on-surface-variant mt-1">
                        Notifications for upcoming tournaments and daily challenges.
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                      <input
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        id="toggle-arena"
                        name="toggle"
                        type="checkbox"
                      />
                      <label
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        htmlFor="toggle-arena"
                      ></label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <h3 className="font-body-lg text-body-lg text-on-surface font-medium">
                        Quiz Reminders
                      </h3>
                      <p className="font-body-md text-[14px] text-on-surface-variant mt-1">
                        Scheduled nudges to complete your daily aptitude quizzes.
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                      <input
                        checked=""
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        id="toggle-quizzes"
                        name="toggle"
                        type="checkbox"
                      />
                      <label
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        htmlFor="toggle-quizzes"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
                  <span className="material-symbols-outlined text-outline">forum</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Community</h2>
                </div>
                <div className="space-y-md">
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <h3 className="font-body-lg text-body-lg text-on-surface font-medium">
                        Social Feed Activity
                      </h3>
                      <p className="font-body-md text-[14px] text-on-surface-variant mt-1">
                        Mentions, likes, and comments on your feed posts.
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                      <input
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        id="toggle-social"
                        name="toggle"
                        type="checkbox"
                      />
                      <label
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        htmlFor="toggle-social"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-lg">
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <h3 className="font-headline-md text-[18px] text-on-surface mb-1">
                  Email Delivery
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-4">
                  Crucial updates like interview invites will always be sent to your registered
                  email address, regardless of push notification settings.
                </p>
                <a
                  className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1"
                  href="#"
                >
                  Manage Email Settings{" "}
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-2 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg font-body-md text-body-md bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
