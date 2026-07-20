import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/_app/resume")({
  head: () => ({ meta: [{ title: "Resume — PlacePro LMS" }] }),
  component: () => (
    <div className="flex flex-col min-h-screen bg-[var(--pp-surface)] pb-24 md:pb-0">
      <TopBar />
      <div className="flex-1 w-full max-w-[1280px] mx-auto overflow-y-auto">
        <Outlet />
      </div>
    </div>
  ),
});
