import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/resume")({
  head: () => ({ meta: [{ title: "Resume — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Resume" />
      <PageStub
        title="Resume"
        description="AI-tuned résumé builder with role-specific suggestions."
        icon={FileText}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
