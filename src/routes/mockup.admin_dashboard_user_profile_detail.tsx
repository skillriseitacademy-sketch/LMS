import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/admin_dashboard_user_profile_detail")({
  component: AdminDashboardUserProfileDetailPage,
});

function AdminDashboardUserProfileDetailPage() {
  return (
    <>
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-20 hover:w-sidebar-width transition-all duration-300 bg-surface-dim dark:bg-inverse-surface border-r border-outline-variant shadow-lg flex-col items-center py-6 gap-6 group z-50 overflow-hidden">
        <div className="flex flex-col items-center w-full px-2 mb-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md font-bold mb-1 group-hover:hidden transition-opacity">
            PA
          </div>
          <div className="hidden group-hover:flex flex-col items-center w-full transition-opacity opacity-0 group-hover:opacity-100 duration-300 delay-100">
            <img
              alt="Admin Avatar"
              className="w-16 h-16 rounded-full object-cover mb-2 shadow-soft"
              data-alt="A professional close up headshot of a friendly systems administrator in a well lit modern office environment. Bright natural light, corporate modern style, sharp focus, clean background."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW_Q1rEx1G91YP-Kdq91Bqd88O-v-VhfB0ZcctA_LToNHbunidubAOVn5Y2-uiidi4JfEJmC3J_jqb-9_LbS0kpwchCXcBLDCO-9aWkUw_YOG1sWirjm19jbBrZIjrhaNIC2yr29x1vW2iG7n1vM-LO1P168NdUVKM8vIz_KWw4C2yG68RRws7xl1GYAknjAxbu3Zri21wyMuzy63gxgVVB843knQgbiKulPnU8AXK_jD2RkVgri-Edg"
            />
            <h2 className="text-headline-md font-headline-md font-black text-on-surface whitespace-nowrap">
              PlacePro Admin
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              System Controller
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 px-2 overflow-y-auto w-full scrollbar-hide flex-grow">
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Admin Dashboard"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="admin_panel_settings"
            >
              admin_panel_settings
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Admin Dashboard
            </span>
          </a>

          <a
            className="flex items-center p-2 rounded-lg text-primary font-bold bg-primary-container/10 group/link w-full overflow-hidden relative"
            href="#"
            title="Users"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-primary rounded-r-full"></div>
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="group"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Users
            </span>
          </a>

          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Teachers"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="school"
            >
              school
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Teachers
            </span>
          </a>
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Admins"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="shield_person"
            >
              shield_person
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Admins
            </span>
          </a>
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Analytics"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="analytics"
            >
              analytics
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Analytics
            </span>
          </a>
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Interviews"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="video_stable"
            >
              video_stable
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Interviews
            </span>
          </a>
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Projects"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="account_tree"
            >
              account_tree
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Projects
            </span>
          </a>
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Quizzes"
          >
            <span
              className="material-symbols-outlined shrink-0 w-12 text-center"
              data-icon="library_books"
            >
              library_books
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Quizzes
            </span>
          </a>
          <a
            className="flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors group/link w-full overflow-hidden"
            href="#"
            title="Topics"
          >
            <span className="material-symbols-outlined shrink-0 w-12 text-center" data-icon="topic">
              topic
            </span>
            <span className="whitespace-nowrap font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
              Topics
            </span>
          </a>
        </div>
      </nav>

      <main className="flex-grow md:ml-20 w-full max-w-container-max mx-auto p-4 md:p-xl flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
            <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
              <span className="material-symbols-outlined text-[16px]">group</span> Users
            </a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface font-medium">User Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-variant transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">history</span> Audit Log
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-soft hover:shadow-md transform hover:-translate-y-0.5 duration-200 flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">save</span> Save Changes
            </button>
          </div>
        </div>

        <section className="bg-surface-container-lowest rounded-xl shadow-soft p-6 border border-surface-container-high relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
          <div className="relative shrink-0 group cursor-pointer">
            <img
              alt="Student Profile Picture"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-surface shadow-sm"
              data-alt="A portrait photograph of a young university student. Bright, optimistic lighting, clean white background, confident smile, modern academic vibe, high resolution, corporate modern aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmighURABm1DhBxZcNobg7acG-njqKH0SBOHiOulYi0Jk7fq5JEJcuklnCpgT25lDeBTQzZekkMrtAST7Xg_Ij9C5ZLdgNgHJ7KdPhVXo6F7am7jq6k6Kn0wqkYQJXWi-4YO7gutY0K6yneGRU6wunF-uouOjXS87NmhweYuQQaY0U7lM3L5Zdsfyb5SZ58redYYjMOI9mloJZ71RCurHZJpmECsFXoLYH0NUkZnAK_3e6z5CbNclXPA"
            />
            <div className="absolute inset-0 bg-on-surface/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <span className="material-symbols-outlined text-surface">photo_camera</span>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-md mb-1">
              <h1 className="text-headline-lg font-headline-lg text-on-surface">Alex Mercer</h1>
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1 border border-secondary-container/30">
                  <span className="material-symbols-outlined text-[14px]">school</span> Student
                </span>
                <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold flex items-center gap-1 border border-emerald-200">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Active
                </span>
              </div>
            </div>
            <p className="text-on-surface-variant font-body-md text-body-md mb-4 max-w-2xl">
              Computer Science Undergraduate at Tech University. Focus on Data Structures and
              Algorithms. Preparing for Software Engineering roles.
            </p>
            <div className="flex flex-wrap gap-4 font-label-sm text-label-sm text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">mail</span>{" "}
                alex.mercer@example.edu
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>{" "}
                Joined: Oct 12, 2023
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">location_on</span> San
                Francisco, CA
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px] shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-lg w-full md:w-auto">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Account Status
              </span>
              <button className="w-10 h-6 bg-primary rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <span className="absolute left-1 top-1 w-4 h-4 bg-surface rounded-full transition-transform translate-x-4"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Pro Subscription
              </span>
              <button className="w-10 h-6 bg-surface-container-highest rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <span className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full transition-transform"></span>
              </button>
            </div>
            <button className="mt-2 w-full py-2 rounded border border-outline text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">login</span> Login as User
            </button>
          </div>
        </section>

        <nav className="flex overflow-x-auto border-b border-outline-variant scrollbar-hide">
          <button className="px-4 py-2 text-primary font-label-sm text-label-sm font-bold border-b-2 border-primary whitespace-nowrap">
            General Info
          </button>
          <button className="px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 font-label-sm text-label-sm font-medium whitespace-nowrap transition-colors">
            Platform Activity
          </button>
          <button className="px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 font-label-sm text-label-sm font-medium whitespace-nowrap transition-colors">
            Billing &amp; Subscriptions
          </button>
          <button className="px-4 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 font-label-sm text-label-sm font-medium whitespace-nowrap transition-colors">
            Permissions
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section className="bg-surface-container-lowest rounded-xl shadow-soft p-6 border border-surface-container-high">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span> Personal
                Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    First Name
                  </label>
                  <input
                    className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface"
                    type="text"
                    value="Alex"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Last Name
                  </label>
                  <input
                    className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface"
                    type="text"
                    value="Mercer"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Email Address
                  </label>
                  <input
                    className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface"
                    type="email"
                    value="alex.mercer@example.edu"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Bio / Objectives
                  </label>
                  <textarea
                    className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface resize-none"
                    rows="3"
                  >
                    Computer Science Undergraduate at Tech University. Focus on Data Structures and
                    Algorithms. Preparing for Software Engineering roles.
                  </textarea>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl shadow-soft p-6 border border-surface-container-high">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span> Academic
                Background
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    University / Institution
                  </label>
                  <select className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface appearance-none">
                    <option>Tech University</option>
                    <option>State College</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Degree Level
                  </label>
                  <select className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface appearance-none">
                    <option>Bachelors (BSc)</option>
                    <option>Masters (MSc)</option>
                    <option>PhD</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Graduation Year
                  </label>
                  <input
                    className="px-4 py-2 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-body-md text-body-md text-on-surface"
                    type="number"
                    value="2025"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6">
            <section className="bg-surface-container-lowest rounded-xl shadow-soft p-6 border border-surface-container-high">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-4">
                Activity Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg p-2 border border-outline-variant flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-secondary-container mb-1 text-[28px]">
                    military_tech
                  </span>
                  <span className="text-headline-md font-headline-md font-bold text-on-surface">
                    2,500
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Total XP
                  </span>
                </div>

                <div className="bg-surface rounded-lg p-2 border border-outline-variant flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                  <span className="material-symbols-outlined text-primary mb-1 text-[28px]">
                    leaderboard
                  </span>
                  <span className="text-headline-md font-headline-md font-bold text-on-surface relative z-10">
                    #42
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant relative z-10">
                    Global Rank
                  </span>
                </div>

                <div className="bg-surface rounded-lg p-2 border border-outline-variant flex flex-col items-center justify-center text-center">
                  <span className="text-headline-md font-headline-md font-bold text-on-surface">
                    15
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Quizzes Done
                  </span>
                </div>

                <div className="bg-surface rounded-lg p-2 border border-outline-variant flex flex-col items-center justify-center text-center">
                  <span className="text-headline-md font-headline-md font-bold text-on-surface">
                    3
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Interviews
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">
                    Curriculum Progress
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">68%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
            </section>

            <section className="bg-error-container/20 rounded-xl shadow-soft p-6 border border-error/30 mt-auto">
              <h3 className="font-label-sm text-label-sm text-error font-bold uppercase tracking-wider mb-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">warning</span> Danger Zone
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-2 rounded bg-surface border border-outline-variant">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface font-bold">
                      Force Password Reset
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      Require user to reset on next login.
                    </p>
                  </div>
                  <button className="px-2 py-1 rounded border border-outline text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors">
                    Reset
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-surface border border-outline-variant">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface font-bold">
                      Suspend Account
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      Temporarily disable access.
                    </p>
                  </div>
                  <button className="px-2 py-1 rounded border border-secondary-container text-secondary-container font-label-sm text-label-sm hover:bg-secondary-container/10 transition-colors">
                    Suspend
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-error/10 border border-error/20">
                  <div>
                    <p className="font-label-sm text-label-sm text-error font-bold">
                      Delete Account
                    </p>
                    <p className="text-[11px] text-error/80">Permanent, irrecoverable action.</p>
                  </div>
                  <button className="px-2 py-1 rounded bg-error text-on-error font-label-sm text-label-sm hover:bg-error/90 transition-colors shadow-sm">
                    Delete
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
