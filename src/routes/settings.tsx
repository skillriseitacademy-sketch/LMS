import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/settings")({
  component: SettingsLayout,
});

const NAV_ITEMS = [
  { to: "/settings/notifications", icon: "notifications", label: "Notifications" },
  { to: "/settings/billing", icon: "credit_card", label: "Plan & Billing" },
  { to: "/settings/security", icon: "lock", label: "Security & Privacy" },
  { to: "/profile", icon: "person", label: "Profile Settings" },
];

function SettingsLayout() {
  const pathname = useRouterState({ select: r => r.location.pathname });
  const { session } = useAuth();

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto min-h-screen">
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md px-4 md:px-8 h-16 flex items-center border-b border-outline-variant/30">
        <h1 className="text-2xl font-semibold text-on-surface" style={{ fontFamily: "Manrope" }}>Settings</h1>
      </header>

      <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 sticky top-24">
            {/* User info */}
            <div className="flex items-center gap-3 p-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex-shrink-0">
                {session?.avatar_url
                  ? <img src={session.avatar_url} className="w-full h-full object-cover" alt="Avatar" />
                  : <div className="w-full h-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">person</span>
                    </div>
                }
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-on-surface truncate" style={{ fontFamily: "Manrope" }}>{session?.name}</p>
                <p className="text-xs text-on-surface-variant truncate" style={{ fontFamily: "Inter" }}>Free Tier</p>
              </div>
            </div>

            <nav className="space-y-0.5">
              {NAV_ITEMS.map(({ to, icon, label }) => {
                const active = pathname === to || pathname.startsWith(to + "/");
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-on-surface-variant hover:bg-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    <span className="text-sm font-medium" style={{ fontFamily: "Inter" }}>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
