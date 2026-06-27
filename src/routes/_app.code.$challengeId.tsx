import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/code/$challengeId")({
  head: () => ({ meta: [{ title: "Challenge — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Challenge" />
      <PageStub
        title="Challenge"
        description="Monaco-style editor, test runner, and submission history."
        icon={Terminal}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
