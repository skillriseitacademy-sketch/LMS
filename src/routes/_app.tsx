import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, onboarding_complete")
      .eq("id", session.user.id)
      .single();

    if (profile?.role === "student" && !profile.onboarding_complete) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex selection:bg-primary-container selection:text-on-primary-container w-full">
      <AppSidebar />
      {/* Main content area */}
      <div className="flex-1 w-full min-h-screen md:pl-[280px]">
        <Outlet />
      </div>
    </div>
  );
}
