import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/quizzes/$quizId")({
  head: () => ({ meta: [{ title: "Quiz — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Quiz" />
      <PageStub
        title="Quiz"
        description="Question by question, with timer, tab-switch detection, and instant feedback."
        icon={Brain}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
