import { createFileRoute } from "@tanstack/react-router";
import { Video } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/interview/manual/$sessionId")({
  head: () => ({ meta: [{ title: "Live interview — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Live interview" />
      <PageStub
        title="Live interview"
        description="Daily.co video call with interviewer scoring panel."
        icon={Video}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to your backend when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
