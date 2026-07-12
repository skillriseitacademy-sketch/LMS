import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/_app/resume")({
  head: () => ({ meta: [{ title: "Resume — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Resume" />
      <Outlet />
    </>
  ),
});
