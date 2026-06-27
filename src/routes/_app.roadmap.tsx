import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/roadmap")({
  head: () => ({ meta: [{ title: "Career roadmap — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Career roadmap" />
      <PageStub
        title="Career roadmap"
        description="Your personalised path to a target role, with milestones and matched jobs."
        icon={Map}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
