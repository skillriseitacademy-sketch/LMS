import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/quizzes/$quizId/results")({
  head: () => ({ meta: [{ title: "Quiz results — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Quiz results" />
      <PageStub
        title="Quiz results"
        description="Score circle, XP earned, per-question breakdown, and a share-to-leaderboard CTA."
        icon={Trophy}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
