import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/recruiter_credit_dashboard")({
  component: RecruiterCreditDashboardPage,
});

function RecruiterCreditDashboardPage() {
  return (
    <>
      <nav className="hidden lg:flex flex-col h-screen sticky top-0 left-0 w-sidebar-width bg-surface-container-lowest shadow-md py-8 px-4 space-y-md z-40">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold font-headline-md text-headline-md">
            P
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-black text-primary">PlacePro</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Career OS</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">school</span>
            <span className="font-label-sm text-label-sm">Curriculum</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-label-sm text-label-sm">Mock Tests</span>
          </a>

          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-all duration-200 hover:translate-x-1"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              work
            </span>
            <span className="font-label-sm text-label-sm">Jobs</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">workspace_premium</span>
            <span className="font-label-sm text-label-sm">Premium Arena</span>
          </a>
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-outline-variant">
          <button className="w-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-sm">stars</span> Upgrade to Pro
          </button>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">contact_support</span>
            <span className="font-label-sm text-label-sm">Support</span>
          </a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col min-w-0 pb-[80px] lg:pb-0">
        <header className="flex justify-between items-center w-full px-6 py-2 max-w-container-max mx-auto bg-surface shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-bold text-primary lg:hidden">
              PlacePro Pro
            </span>
            <span className="font-headline-md text-headline-md font-bold text-primary hidden lg:inline">
              Recruiter Credits
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 hover:scale-95">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 hover:scale-95">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-xl max-w-container-max mx-auto w-full space-y-xl">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-2px_rgba(0,0,0,0.05)] p-6 flex flex-col justify-between border-l-4 border-primary">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
                    Available Credits
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Use credits to direct message recruiters.
                  </p>
                </div>
                <div className="bg-secondary-container/20 text-secondary-container px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  <span className="font-label-sm text-label-sm font-bold">Pro Member</span>
                </div>
              </div>
              <div className="flex items-end gap-4">
                <span className="font-display-lg text-display-lg text-primary leading-none">8</span>
                <span className="font-body-md text-body-md text-on-surface-variant pb-1">
                  / 10 this month
                </span>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center">
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">update</span> Resets in 12
                  days (Nov 1)
                </div>
                <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-primary-fixed-variant transition-colors flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-sm">search</span> Find Recruiters
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-2px_rgba(0,0,0,0.05)] p-6 flex flex-col border-l-4 border-secondary-container">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">
                  emoji_events
                </span>{" "}
                Earn More
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-1">
                Complete challenges in the Premium Arena to earn bonus recruiter credits.
              </p>
              <div className="space-y-sm">
                <div className="bg-surface-container-low p-2 rounded-lg flex justify-between items-center">
                  <span className="font-label-sm text-label-sm text-on-surface">
                    Mock Test Streak (3/5)
                  </span>
                  <span className="text-secondary font-bold font-label-sm text-label-sm">
                    +1{" "}
                    <span className="material-symbols-outlined text-[10px] align-middle">toll</span>
                  </span>
                </div>
                <div className="bg-surface-container-low p-2 rounded-lg flex justify-between items-center">
                  <span className="font-label-sm text-label-sm text-on-surface">
                    Complete Resume Profile
                  </span>
                  <span className="text-secondary font-bold font-label-sm text-label-sm">
                    +2{" "}
                    <span className="material-symbols-outlined text-[10px] align-middle">toll</span>
                  </span>
                </div>
              </div>
              <button className="mt-4 w-full border border-outline text-on-surface-variant px-2 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-colors">
                Go to Arena
              </button>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Recent Activity</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Last 30 Days
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm border-b border-outline-variant">
                    <th className="p-4 font-medium">Recruiter</th>
                    <th className="p-4 font-medium">Company / Role</th>
                    <th className="p-4 font-medium">Date Used</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                        JS
                      </div>
                      <span className="text-on-surface font-medium">Jane Smith</span>
                    </td>
                    <td className="p-4">
                      <div className="text-on-surface">TechCorp</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Frontend Developer
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant font-label-sm text-label-sm">
                      Oct 18, 2023
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-surface-variant text-primary px-2 py-1 rounded-full font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">done_all</span>{" "}
                        Responded
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                        MR
                      </div>
                      <span className="text-on-surface font-medium">Mike Ross</span>
                    </td>
                    <td className="p-4">
                      <div className="text-on-surface">FinTech Innovations</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Software Engineer
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant font-label-sm text-label-sm">
                      Oct 15, 2023
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded-full font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          mark_email_read
                        </span>{" "}
                        Message Read
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="p-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-surface-dim text-on-surface-variant flex items-center justify-center font-bold text-sm">
                        AL
                      </div>
                      <span className="text-on-surface font-medium">Amanda Lee</span>
                    </td>
                    <td className="p-4">
                      <div className="text-on-surface">Global Systems</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Data Analyst
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant font-label-sm text-label-sm">
                      Oct 10, 2023
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 border border-secondary text-secondary px-2 py-1 rounded-full font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>{" "}
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-t-xl">
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">quiz</span>
          <span className="font-label-sm text-label-sm">Mocks</span>
        </a>

        <a
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1 scale-up transition-transform duration-200"
          href="#"
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            work
          </span>
          <span className="font-label-sm text-label-sm font-bold">Jobs</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined mb-1">workspace_premium</span>
          <span className="font-label-sm text-label-sm">Arena</span>
        </a>
      </nav>
    </>
  );
}
