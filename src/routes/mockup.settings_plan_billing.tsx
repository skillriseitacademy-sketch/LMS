import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/settings_plan_billing")({
  component: SettingsPlanBillingPage,
});

function SettingsPlanBillingPage() {
  return (
    <>
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-16 bg-surface/80 dark:bg-background/80 backdrop-blur-md flex justify-between items-center px-8 z-40">
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full focus-within:ring-2 focus-within:ring-primary/20 rounded-full transition-all">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
              search
            </span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2 pl-12 pr-4 text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:bg-surface-container">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all hover:bg-surface-container">
            <span className="material-symbols-outlined">workspace_premium</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container-highest cursor-pointer ml-2">
            <img
              alt="Student Avatar"
              className="w-full h-full object-cover"
              data-alt="A clean, professional portrait of a young student in a well-lit modern environment, styled for a sleek SaaS application dashboard. Soft natural lighting, neutral background, reflecting a focused and driven attitude."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWkfdMBggn-yqHF_pBK9Ao_7rLmd792Jwxn7Vm2AhMuTQvAurfoWAObQ9ZKhiu_rb1Oi_wzi3iEQHsA9nDK0UjU5fuQuktQ3GftR8r8CPoOy25j63VLod1chH2I7bgMN6eKNgrJXZlviEjw2-3CNXGomFMgaDXmXVNzSywPnEO59iquLBv-8G8QVZiZjS69nh-EzjjeM5p3tjrTxh7BUNQiHAI87tSl5RqdkhFHTlcXNMIC67I0bpG8Q"
            />
          </div>
        </div>
      </header>

      <nav className="hidden md:flex flex-col h-full py-6 px-4 w-sidebar-width overflow-y-auto bg-surface-container-lowest dark:bg-inverse-surface shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] fixed left-0 top-0 z-50">
        <div className="mb-8 px-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined fill">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-headline-md font-display-lg font-extrabold text-primary dark:text-inverse-primary leading-none">
              PlacePro
            </h1>
            <span className="font-label-sm text-label-sm text-outline tracking-wider">
              Career OS
            </span>
          </div>
        </div>

        <button className="mx-4 mb-8 bg-primary text-on-primary font-body-md font-medium py-3 rounded-lg hover:bg-primary/90 transition-transform duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
          Start Practice
        </button>

        <div className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md font-medium">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span>
            <span className="font-body-md text-body-md font-medium">Feed</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">video_chat</span>
            <span className="font-body-md text-body-md font-medium">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-body-md text-body-md font-medium">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            <span className="font-body-md text-body-md font-medium">Arena</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-body-md text-body-md font-medium">Jobs</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-body-md text-body-md font-medium">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-body-md text-body-md font-medium">Resume</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-body-md text-body-md font-medium">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-body-md text-body-md font-medium">Profile</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-body-md text-body-md font-medium">Rooms</span>
          </a>
        </div>

        <div className="mt-auto pt-6 border-t border-surface-container-highest space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary dark:text-inverse-primary font-bold border-r-4 border-primary dark:border-inverse-primary bg-surface-container-low dark:bg-surface-dim transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined fill">settings</span>
            <span className="font-body-md text-body-md">Settings</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary hover:bg-surface-container dark:hover:bg-surface-variant transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md text-body-md font-medium">Logout</span>
          </a>
        </div>
      </nav>

      <main className="md:ml-sidebar-width pt-16 min-h-screen">
        <div className="max-w-container-max mx-auto px-4 md:px-xl py-8 space-y-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Plan &amp; Billing
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Manage your subscription and billing details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
                    Current Plan
                  </span>
                  <span className="bg-surface-container px-2 py-1 rounded text-xs font-medium text-primary">
                    Free Tier
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  PlacePro Basic
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  You are currently on the free tier. Upgrade to Pro to unlock advanced career
                  preparation tools.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-surface-container-high pt-6">
                <div>
                  <p className="font-body-md text-body-md font-medium text-on-surface">
                    Free forever
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Basic access to feed and roadmap.
                  </p>
                </div>
                <button className="bg-primary text-on-primary font-body-md font-medium py-2 px-6 rounded-lg hover:bg-primary/90 transition-transform duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 whitespace-nowrap">
                  Upgrade to Pro
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-label-sm text-label-sm uppercase text-outline tracking-wider mb-4">
                  Payment Method
                </h4>
                <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-lg border border-surface-container-high border-dashed">
                  <div className="w-10 h-10 rounded bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-outline-variant">
                    <span className="material-symbols-outlined">credit_card</span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md font-medium text-on-surface-variant">
                      No card added
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-surface-container-lowest text-primary border border-surface-container-high font-body-md font-medium py-2 rounded-lg hover:bg-surface-container transition-colors duration-200">
                Add Payment Method
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary-container fill text-[28px]">
                workspace_premium
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Why Upgrade to PlacePro Pro?
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-4 border-l-4 border-l-secondary-container hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary-container mb-4">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <h4 className="font-body-lg text-body-lg font-medium text-on-surface mb-1">
                  AI Resume Optimization
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Get personalized feedback to beat ATS and stand out to recruiters.
                </p>
              </div>

              <div className="glass-card rounded-xl p-4 border-l-4 border-l-secondary-container hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary-container mb-4">
                  <span className="material-symbols-outlined">video_camera_front</span>
                </div>
                <h4 className="font-body-lg text-body-lg font-medium text-on-surface mb-1">
                  Unlimited Mock Interviews
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Practice anytime with our AI interviewer, complete with detailed analysis.
                </p>
              </div>

              <div className="glass-card rounded-xl p-4 border-l-4 border-l-secondary-container hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary-container mb-4">
                  <span className="material-symbols-outlined">military_tech</span>
                </div>
                <h4 className="font-body-lg text-body-lg font-medium text-on-surface mb-1">
                  Premium Arena Access
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Compete in exclusive coding challenges and boost your global ranking.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline-md text-[20px] font-semibold text-on-surface">
                Billing History
              </h4>
              <button className="text-primary hover:text-primary-container text-sm font-medium transition-colors">
                Download All
              </button>
            </div>
            <div className="text-center py-8 border border-dashed border-surface-container-high rounded-xl bg-surface-container-lowest">
              <span className="material-symbols-outlined text-[48px] text-surface-container-highest mb-2">
                receipt_long
              </span>
              <p className="font-body-md text-on-surface-variant">
                No billing history available yet.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
