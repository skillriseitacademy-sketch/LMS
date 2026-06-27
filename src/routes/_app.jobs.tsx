import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/jobs")({
  head: () => ({ meta: [{ title: "Jobs — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Jobs" />
      <PageStub
        title="Jobs"
        description="Live listings from LinkedIn, Naukri and others — filtered to match your roadmap."
        icon={Briefcase}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
