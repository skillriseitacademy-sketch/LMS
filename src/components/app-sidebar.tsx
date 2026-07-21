import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-store";

const NAV_ITEMS = [
  { to: "/dashboard",   icon: "dashboard",       label: "Dashboard" },
  { to: "/feed",        icon: "rss_feed",        label: "Feed" },
  { to: "/interview",   icon: "video_chat",      label: "Interview Hub" },
  { to: "/quizzes",     icon: "quiz",            label: "Quizzes" },
  { to: "/live",        icon: "live_tv",         label: "Live Classes" },
  { to: "/arena",       icon: "sports_esports",  label: "Arena" },
  { to: "/jobs",        icon: "work",            label: "Jobs" },
  { to: "/roadmap",     icon: "map",             label: "Roadmap" },
  { to: "/resume",      icon: "description",     label: "Resume" },
  { to: "/leaderboard", icon: "leaderboard",     label: "Leaderboard" },
  { to: "/profile",     icon: "person",          label: "Profile" },
  { to: "/rooms",       icon: "groups",          label: "Rooms" },
];

const ADMIN_NAV_ITEMS = [
  { to: "/admin",            icon: "admin_panel_settings", label: "Admin Hub" },
  { to: "/admin/topics",     icon: "menu_book",            label: "Topics" },
  { to: "/admin/quizzes",    icon: "checklist",            label: "Admin Quizzes" },
  { to: "/admin/users",      icon: "group",                label: "Students" },
  { to: "/admin/teachers",   icon: "school",               label: "Teachers" },
  { to: "/admin/admins",     icon: "security",             label: "Admins" },
  { to: "/admin/projects",   icon: "folder",               label: "Projects" },
  { to: "/admin/interviews", icon: "mic",                  label: "Interviews" },
  { to: "/admin/analytics",  icon: "bar_chart",            label: "Analytics" },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: r => r.location.pathname });
  const { session, logoutSession } = useAuth();

  const isActive = (url: string) =>
    pathname === url || (url !== "/" && pathname.startsWith(url + "/"));

  return (
    <>
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-[280px] bg-surface-container-low shadow-md z-40 overflow-y-auto">

        {/* ── Brand Header ── */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">rocket_launch</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-primary leading-tight" style={{ fontFamily: "Manrope" }}>PlacePro</h2>
              <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono" }}>Career OS</p>
            </div>
          </div>

          {/* Start Practice CTA */}
          <Link
            to="/interview"
            className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold py-2.5 px-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm text-sm"
            style={{ fontFamily: "Inter" }}
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Start Practice
          </Link>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold translate-x-0.5"
                    : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" data-weight={active ? "fill" : undefined}>
                  {icon}
                </span>
                <span className="text-sm font-medium" style={{ fontFamily: "Inter" }}>{label}</span>
              </Link>
            );
          })}

          {session?.role === "admin" && (
            <>
              <div className="pt-4 pb-2 px-3">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "JetBrains Mono" }}>Admin Controls</p>
              </div>
              {ADMIN_NAV_ITEMS.map(({ to, icon, label }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      active
                        ? "bg-primary-container text-on-primary-container font-semibold translate-x-0.5"
                        : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]" data-weight={active ? "fill" : undefined}>
                      {icon}
                    </span>
                    <span className="text-sm font-medium" style={{ fontFamily: "Inter" }}>{label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* ── Bottom Section ── */}
        <div className="px-3 pb-4 pt-2 border-t border-outline-variant/30 space-y-1">

          {/* Settings */}
          <Link
            to="/settings/notifications"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive("/settings")
                ? "bg-primary-container text-on-primary-container font-semibold"
                : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-sm font-medium" style={{ fontFamily: "Inter" }}>Settings</span>
          </Link>

          {/* Logout */}
          <button
            onClick={logoutSession}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-error-container hover:text-error transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-sm font-medium" style={{ fontFamily: "Inter" }}>Log Out</span>
          </button>

          {/* User + XP Footer */}
          <div className="flex items-center gap-3 px-3 py-3 mt-1">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-variant flex-shrink-0 border border-outline-variant">
              {session?.avatar_url
                ? <img src={session.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">person</span>
                  </div>
              }
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-on-surface truncate" style={{ fontFamily: "Manrope" }}>
                {session?.name || "Student"}
              </p>
              <p className="text-[10px] text-on-surface-variant font-medium" style={{ fontFamily: "JetBrains Mono" }}>
                Free Tier
              </p>
            </div>
          </div>

          {/* Upgrade to Pro */}
          <Link
            to="/pro"
            className="w-full flex items-center justify-center gap-2 bg-surface-variant text-primary border border-primary/20 font-semibold py-2.5 px-4 rounded-xl hover:bg-primary hover:text-on-primary transition-all text-sm"
            style={{ fontFamily: "Inter" }}
          >
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            Upgrade to Pro
          </Link>
        </div>
      </aside>

      {/* Mobile placeholder */}
      <div className="md:hidden" />
    </>
  );
}
