import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/interview/$sessionId/feedback")({
  head: () => ({ meta: [{ title: "Interview feedback — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Interview feedback" />
      <PageStub
        title="Interview feedback"
        description="Communication, technical and confidence scores with the full transcript."
        icon={ClipboardCheck}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
