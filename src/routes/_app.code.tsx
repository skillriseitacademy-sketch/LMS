import { createFileRoute } from "@tanstack/react-router";
import { Code2 } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/code")({
  head: () => ({ meta: [{ title: "Code challenges — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Code challenges" />
      <PageStub
        title="Code challenges"
        description="Daily DSA and project challenges with auto-grading and editorial solutions."
        icon={Code2}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
