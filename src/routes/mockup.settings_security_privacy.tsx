import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/settings_security_privacy")({
  component: SettingsSecurityPrivacyPage,
});

function SettingsSecurityPrivacyPage() {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest dark:bg-inverse-surface shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] z-50 flex flex-col py-6 px-4 overflow-y-auto hidden md:flex">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-headline-md font-display-lg font-extrabold text-primary dark:text-inverse-primary tracking-tight">
            PlacePro
          </h1>
          <span className="text-label-sm font-label-sm text-outline">Career OS</span>
        </div>
        <button className="mb-6 w-full bg-primary text-on-primary py-2 px-4 rounded-lg font-body-md hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
          Start Practice
        </button>
        <nav className="flex-1 flex flex-col gap-1">
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              dashboard
            </span>
            <span className="font-body-md">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              rss_feed
            </span>
            <span className="font-body-md">Feed</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              video_chat
            </span>
            <span className="font-body-md">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              quiz
            </span>
            <span className="font-body-md">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              sports_esports
            </span>
            <span className="font-body-md">Arena</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              work
            </span>
            <span className="font-body-md">Jobs</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              map
            </span>
            <span className="font-body-md">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              description
            </span>
            <span className="font-body-md">Resume</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              leaderboard
            </span>
            <span className="font-body-md">Leaderboard</span>
          </a>

          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-primary dark:text-inverse-primary font-bold border-r-4 border-primary dark:border-inverse-primary bg-surface-container-low dark:bg-surface-dim transition-colors duration-200 group"
            href="#"
          >
            <span
              className="material-symbols-outlined group-hover:scale-110 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person
            </span>
            <span className="font-body-md">Profile</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              groups
            </span>
            <span className="font-body-md">Rooms</span>
          </a>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/30 flex flex-col gap-1">
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              settings
            </span>
            <span className="font-body-md">Settings</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-error dark:hover:text-error-container hover:bg-error-container/20 transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              logout
            </span>
            <span className="font-body-md">Logout</span>
          </a>
          <div className="mt-4 flex items-center gap-2 px-4">
            <img
              alt="Student Profile Picture"
              className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-high"
              data-alt="A small circular avatar of a professional student, modern clean lighting, against a solid pastel background. Headshot framing."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN3CK2M4f9lWpMYmPcOAsRBRafhVtdOVJKRLchPgves63I4Rteg8waejBKcYe9CWWRXuVHfbXl6brjkCLlLekmda5pR-QMcYReyHOXsB8BAh1jPN2F5ABt8DpcRCvWAkoUo9zmYzKoNujAsMFpyMQTtVqYxA8jECSW18w2qPGJmubR7P6JKSV97ezKS-oecLUphNiBn4I_TdK5BuZBSkCCsokkbXkorlPVRD5Q21X76BpMQjBwPuloig"
            />
            <div className="flex flex-col">
              <span className="font-body-md font-semibold text-on-surface">Alex Mercer</span>
              <span className="font-label-sm text-outline">Pro Tier</span>
            </div>
          </div>
        </div>
      </aside>

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-16 bg-surface/80 dark:bg-background/80 backdrop-blur-md z-40 flex justify-between items-center px-8 md:px-xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-on-surface p-2 hover:bg-surface-container rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="relative focus-within:ring-2 focus-within:ring-primary/20 rounded-lg transition-shadow duration-200 hidden md:block">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="pl-8 pr-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-lg text-body-md focus:outline-none focus:border-primary/50 w-64 transition-colors"
              placeholder="Search Career OS..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-all relative group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 text-secondary hover:text-secondary-container hover:bg-surface-container rounded-full transition-all group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              workspace_premium
            </span>
          </button>
          <img
            alt="Student Avatar"
            className="w-8 h-8 rounded-full object-cover md:hidden border border-outline-variant"
            data-alt="A small circular avatar of a professional student, modern clean lighting, against a solid pastel background. Headshot framing."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKjYch6cdpCNnbooKzQFdFKGIXnu0qeJo-fQc0MYVPQ_MoMOt-hiprGcVIFM9_9TENlG_7TuR0Q6xJyy7uLhIgJCv550_GgES9zhYxcuspP8_jNp1qfiqzCSCR50f28zRguOP6hnNYXnlctNns7heEJixbimkd3v8LMEqOmeJp66ZnYNASmRBccAYljYouKiMpmf2KDlpY53vNIkaeo5xMpqVZBxKc54z-25qfLTShMk9SD4ghMegETw"
          />
        </div>
      </header>

      <main className="flex-1 ml-0 md:ml-sidebar-width pt-16 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-container-max p-4 md:p-xl flex flex-col gap-8">
          <header className="flex flex-col gap-2 border-b border-outline-variant/30 pb-6">
            <div className="flex items-center gap-2 text-outline font-label-sm">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>Profile</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-primary font-semibold">Security &amp; Privacy</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface tracking-tight">
              Security &amp; Privacy
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl">
              Manage your account security, authentication methods, and review active sessions to
              keep your Career OS data safe.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-xl">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <section className="glass-card rounded-xl p-6 md:p-xl flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-4 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      lock
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Password</h3>
                    <p className="font-label-sm text-outline">Last changed 45 days ago</p>
                  </div>
                </div>
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-label-sm text-on-surface-variant"
                      htmlFor="current_password"
                    >
                      Current Password
                    </label>
                    <input
                      className="px-4 py-2 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface"
                      id="current_password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-label-sm text-on-surface-variant"
                        htmlFor="new_password"
                      >
                        New Password
                      </label>
                      <input
                        className="px-4 py-2 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface"
                        id="new_password"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-label-sm text-on-surface-variant"
                        htmlFor="confirm_password"
                      >
                        Confirm New Password
                      </label>
                      <input
                        className="px-4 py-2 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface"
                        id="confirm_password"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-label-sm text-outline">
                      Must be at least 12 characters, include a number and symbol.
                    </p>
                    <button
                      className="bg-primary text-on-primary font-label-sm py-2 px-6 rounded-lg hover:bg-primary-container hover:shadow-md transition-all active:scale-95"
                      type="button"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </section>

              <section className="glass-card rounded-xl p-6 md:p-xl flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        shield_person
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">
                        Two-Factor Authentication
                      </h3>
                      <p className="font-body-md text-on-surface-variant mt-1">
                        Add an extra layer of security to your account by requiring a code from an
                        authenticator app upon login.
                      </p>
                    </div>
                  </div>

                  <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      checked=""
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-surface-container-high appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out focus:outline-none"
                      id="tfa_toggle"
                      name="toggle"
                      type="checkbox"
                    />
                    <label
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer transition-colors duration-200 ease-in-out"
                      htmlFor="tfa_toggle"
                    ></label>
                  </div>
                </div>
                <div className="mt-4 bg-surface-container-low rounded-lg p-4 border-l-4 border-primary flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">info</span>
                  <div className="flex-1">
                    <h4 className="font-body-md font-semibold text-on-surface">
                      Authenticator App Active
                    </h4>
                    <p className="font-label-sm text-outline mt-1">
                      Your account is currently protected via Google Authenticator.
                    </p>
                  </div>
                  <button className="text-primary font-label-sm hover:underline hover:text-primary-container transition-colors">
                    Configure
                  </button>
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] p-6 flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-4">
                  <h3 className="font-body-lg font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline">devices</span>
                    Active Sessions
                  </h3>
                  <button className="text-error font-label-sm hover:underline transition-colors">
                    Sign out all
                  </button>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-surface-container rounded text-primary">
                      <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-label-sm font-semibold text-on-surface flex items-center gap-1">
                        MacBook Pro{" "}
                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      </p>
                      <p className="font-label-sm text-outline">Bengaluru, India • Safari</p>
                      <p className="font-label-sm text-outline">Active now</p>
                    </div>
                  </div>
                  <hr className="border-outline-variant/20" />

                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-surface-container rounded text-outline">
                      <span className="material-symbols-outlined text-[20px]">smartphone</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-label-sm font-semibold text-on-surface">iPhone 13</p>
                      <p className="font-label-sm text-outline">Mumbai, India • CareerOS App</p>
                      <p className="font-label-sm text-outline">Last active: 2 hours ago</p>
                    </div>
                    <button
                      className="text-outline hover:text-error transition-colors p-1"
                      title="Revoke Session"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="p-1 bg-surface-container rounded text-outline">
                      <span className="material-symbols-outlined text-[20px]">laptop_windows</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-label-sm font-semibold text-on-surface">Windows PC</p>
                      <p className="font-label-sm text-outline">Delhi, India • Chrome</p>
                      <p className="font-label-sm text-outline">Last active: 3 days ago</p>
                    </div>
                    <button
                      className="text-outline hover:text-error transition-colors p-1"
                      title="Revoke Session"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section className="mt-6 border border-error/30 rounded-xl p-6 bg-error-container/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-headline-md text-error flex items-center gap-2">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
                Danger Zone
              </h3>
              <p className="font-body-md text-on-surface-variant mt-1 max-w-xl">
                Permanently delete your account and all associated data. This action cannot be
                undone.
              </p>
            </div>
            <button className="bg-surface border border-error text-error font-label-sm py-2 px-6 rounded-lg hover:bg-error hover:text-on-error transition-colors active:scale-95 whitespace-nowrap">
              Delete Account
            </button>
          </section>
        </div>
      </main>
    </>
  );
}
