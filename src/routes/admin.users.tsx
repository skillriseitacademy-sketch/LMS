import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Users" />
      <PageStub
        title="Users"
        description="Manage students, instructors and roles. Bulk invite and exports."
        icon={Users}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
