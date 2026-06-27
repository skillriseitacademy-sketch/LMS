import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Analytics" />
      <PageStub
        title="Analytics"
        description="Funnels, cohort retention, quiz difficulty heatmaps and revenue charts."
        icon={BarChart3}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
