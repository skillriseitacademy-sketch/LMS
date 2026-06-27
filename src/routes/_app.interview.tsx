import { createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/interview")({
  head: () => ({ meta: [{ title: "Interview — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Interview" />
      <PageStub
        title="Interview"
        description="Choose between an AI mock interview or a live session with an interviewer."
        icon={Mic}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
