import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/interview/ai/$sessionId")({
  head: () => ({ meta: [{ title: "AI interview — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="AI interview" />
      <PageStub
        title="AI interview"
        description="Voice-driven mock interview with proctoring and live transcript."
        icon={Bot}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
