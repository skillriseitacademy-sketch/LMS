import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/admin_dashboard_user_management_directory")({
  component: AdminDashboardUserManagementDirectoryPage,
});

function AdminDashboardUserManagementDirectoryPage() {
  return (
    <>
      <aside className="bg-surface-dim dark:bg-inverse-surface border-r border-outline-variant shadow-lg fixed left-0 top-0 h-screen w-20 hover:w-sidebar-width transition-all duration-300 z-50 flex flex-col items-center py-6 gap-6 overflow-y-auto group">
        <div className="flex items-center gap-4 px-4 w-full mb-6 overflow-hidden shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              admin_panel_settings
            </span>
          </div>
          <div className="sidebar-item-label flex-col">
            <h1 className="text-headline-md font-headline-md font-black text-on-surface whitespace-nowrap">
              PlacePro Admin
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
              System Controller
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-base w-full px-2 w-full">
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">admin_panel_settings</span>
            <span className="sidebar-item-label font-body-md text-body-md">Admin Dashboard</span>
          </a>

          <a
            className="flex items-center gap-4 p-4 rounded-lg text-primary font-bold bg-surface-container-high dark:bg-surface-variant w-full transition-colors group/item opacity-80"
            href="#"
          >
            <span
              className="material-symbols-outlined shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
            <span className="sidebar-item-label font-body-md text-body-md">Users</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">school</span>
            <span className="sidebar-item-label font-body-md text-body-md">Teachers</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">shield_person</span>
            <span className="sidebar-item-label font-body-md text-body-md">Admins</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">analytics</span>
            <span className="sidebar-item-label font-body-md text-body-md">Analytics</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">video_stable</span>
            <span className="sidebar-item-label font-body-md text-body-md">Interviews</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">account_tree</span>
            <span className="sidebar-item-label font-body-md text-body-md">Projects</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">library_books</span>
            <span className="sidebar-item-label font-body-md text-body-md">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <span className="material-symbols-outlined shrink-0">topic</span>
            <span className="sidebar-item-label font-body-md text-body-md">Topics</span>
          </a>
        </nav>
        <div className="mt-auto px-4 w-full">
          <a
            className="flex items-center gap-4 p-4 rounded-lg text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-variant w-full transition-colors group/item"
            href="#"
          >
            <img
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-outline-variant"
              data-alt="A small, circular avatar portrait of a professional looking individual, set against a solid color background. The lighting is soft and flattering, suitable for a professional corporate application."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Q-Rz0vpKbcfCdW3k6tPKU2KOWC_HrDjBNZ3hYImuvcUkxJkoPsiUsptUgq2k9Rfl7wSdaqGdAd9p18rEFZwSXfAAj78kWspP12jtrOKOM1QYtWrcBfm1X7fJURr6FkTqcgITD7VEDbTjIz1AQOt0qoA980cK4fSs0UILzMU7TaWMrUedVvwnBxhfSIC27elT4vdTSMSE2PD7szItHMabQq-wAWHAKZwgqE4yRTIyYEr1zxbOboADag"
            />
            <span className="sidebar-item-label font-body-md text-body-md whitespace-nowrap">
              Admin Profile
            </span>
          </a>
        </div>
      </aside>

      <main className="flex-1 ml-20 flex flex-col h-full bg-surface-dim relative transition-all duration-300">
        <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm px-8 py-4 flex justify-between items-center z-40 sticky top-0 h-[72px] shrink-0">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold hidden md:block">
            User Management
          </h2>
          <div className="flex items-center gap-6 flex-1 md:flex-none justify-end">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Search users by name, email, or ID..."
                type="text"
              />
            </div>

            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative shrink-0">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-xl flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-lg">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),_0_2px_4px_-2px_rgb(0_0_0/0.05)] border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Total Users
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-lg text-display-lg text-on-surface">25.8k</span>
                <span className="font-label-sm text-label-sm text-primary flex items-center">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),_0_2px_4px_-2px_rgb(0_0_0/0.05)] border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Active Students
                </span>
                <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-lg text-display-lg text-on-surface">22.1k</span>
                <span className="font-label-sm text-label-sm text-primary flex items-center">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 8%
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),_0_2px_4px_-2px_rgb(0_0_0/0.05)] border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Teacher Count
                </span>
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed/50 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">co_present</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-lg text-display-lg text-on-surface">142</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center">
                  Steady
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),_0_2px_4px_-2px_rgb(0_0_0/0.05)] border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  New Signups (Today)
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-lg text-display-lg text-on-surface">45</span>
                <span className="font-label-sm text-label-sm text-primary flex items-center">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 24%
                </span>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_6px_-1px_rgb(0_0_0/0.05),_0_2px_4px_-2px_rgb(0_0_0/0.05)] border border-outline-variant/30 flex flex-col flex-1 overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold transition-colors">
                  All Users
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                  Students
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                  Teachers
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                  Admins
                </button>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-on-surface font-body-md text-body-md font-medium hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[20px]">checklist</span>
                  Bulk Actions
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-body-md text-body-md font-medium hover:bg-surface-tint hover:shadow-md hover:scale-[1.02] transition-all">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Add New User
                </button>
              </div>
            </div>

            <div className="table-container overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-surface-container-low sticky top-0 z-10">
                  <tr>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant w-12 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                        type="checkbox"
                      />
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant cursor-pointer hover:text-on-surface transition-colors">
                      <div className="flex items-center gap-2">
                        User{" "}
                        <span className="material-symbols-outlined text-[16px]">
                          arrow_downward
                        </span>
                      </div>
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant cursor-pointer hover:text-on-surface transition-colors">
                      Contact
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant">
                      Role
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant">
                      Status
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant cursor-pointer hover:text-on-surface transition-colors">
                      <div className="flex items-center gap-2">
                        Date Joined{" "}
                        <span className="material-symbols-outlined text-[16px] text-transparent group-hover:text-outline">
                          unfold_more
                        </span>
                      </div>
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-on-surface-variant font-semibold border-b border-outline-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                        type="checkbox"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          data-alt="A smiling young female student with glasses, professional but approachable portrait shot with soft studio lighting against a light gray background."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN5nsuDcGSAAR-LXi6_te2geisD9NzLk2TagO8hhF-cEo3dDM8a2KY_UmB6mchLrIArB-g3jhpouH6Ks4WVWSNGhU88sP72T-ScQnELCbCNNehXC2o4-v643QdlkM-21L45lxUpsCHZNKZQFq5Rf-UnbAvQuFvpXeOPugL91G8QDX7kK3tx1WPx4xzYvw1NOxYUOIWNJrGfe3AddH6sW7oV5L5aUdaqtlqzZ-cNDLnOCCVTP5YrGZtrQ"
                        />
                        <div>
                          <div className="font-body-md text-body-md font-semibold text-on-surface">
                            Sarah Jenkins
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">
                            ID: STU-8921
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      sarah.j@university.edu
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-fixed/30 text-on-secondary-fixed-variant font-label-sm text-label-sm">
                        Student
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-outline-variant font-label-sm text-label-sm text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Active
                      </span>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      Oct 12, 2023
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Manage Settings"
                        >
                          <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                        type="checkbox"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-headline-md text-headline-md text-primary font-bold">
                          DR
                        </div>
                        <div>
                          <div className="font-body-md text-body-md font-semibold text-on-surface">
                            Dr. Robert Chen
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">
                            ID: TCH-1044
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      r.chen@faculty.edu
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-label-sm text-label-sm">
                        Teacher
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-outline-variant font-label-sm text-label-sm text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Active
                      </span>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      Aug 05, 2021
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Manage Settings"
                        >
                          <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                        type="checkbox"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          data-alt="A casual portrait of a young male student, looking slightly off-camera, wearing a plain hoodie. The lighting is natural and bright, suggesting an outdoor or near-window setting. Clean, minimal background."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3bMrQ5TIg2JtKwzvfFnT8T8FA5DGxTOaVVntY_ld4eXG19ulc0WKfGazwFwKk95Lmhq1vfFTOmd2FkhutjqYzY2E7UpXnYi0AFzYjmc2jqx_TMXJU5eNnDK_5Tvr5RYWGdaNPooG9p8KBOZvtnX78Tf0Ebp4cZTSNLiUOrrJ85okxtn2ZPIj7SEbmh1WDFDrI6A2bTal8E0wP-crJ95nz0HXSf8_ej3l2S23fJzu03Nl2aZoyz-df8g"
                        />
                        <div>
                          <div className="font-body-md text-body-md font-semibold text-on-surface">
                            Michael Chang
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">
                            ID: STU-9102
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      m.chang22@university.edu
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-fixed/30 text-on-secondary-fixed-variant font-label-sm text-label-sm">
                        Student
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-outline-variant font-label-sm text-label-sm text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-secondary-container"></span>{" "}
                        Pending
                      </span>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      Oct 24, 2023
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Manage Settings"
                        >
                          <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors group bg-error-container/10">
                    <td className="p-4 text-center">
                      <input
                        className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                        type="checkbox"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center font-headline-md text-headline-md text-on-surface-variant font-bold">
                          AL
                        </div>
                        <div>
                          <div className="font-body-md text-body-md font-semibold text-on-surface">
                            Amanda Lewis
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">
                            ID: STU-4421
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      alewis@university.edu
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-fixed/30 text-on-secondary-fixed-variant font-label-sm text-label-sm">
                        Student
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-error/30 bg-error-container/50 font-label-sm text-label-sm text-on-error-container">
                        <span className="w-2 h-2 rounded-full bg-error"></span> Suspended
                      </span>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">
                      Jan 15, 2022
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          className="p-1 rounded text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors"
                          title="Manage Settings"
                        >
                          <span className="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
              <div className="font-label-sm text-label-sm text-on-surface-variant">
                Showing 1 to 4 of 25,842 entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
                  disabled=""
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm transition-colors">
                  1
                </button>
                <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high font-label-sm text-label-sm transition-colors">
                  3
                </button>
                <span className="text-on-surface-variant">...</span>
                <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
