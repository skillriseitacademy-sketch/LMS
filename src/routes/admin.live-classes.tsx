import { createFileRoute } from "@tanstack/react-router";
import { Video } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/live-classes")({
  head: () => ({ meta: [{ title: "Live Classes — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Live Classes" />
      <PageStub
        title="Live Classes"
        description="Manage live class links and schedules for students."
        icon={Video}
        bullets={[
          "Add and manage links for live sessions.",
          "Wire to your backend when you're ready to ship live data."
        ]}
      />
    </>
  ),
});
