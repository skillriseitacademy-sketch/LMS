import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/quizzes")({
  head: () => ({ meta: [{ title: "Quizzes — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Quizzes" />
      <PageStub
        title="Quizzes"
        description="Create and schedule quizzes, generate questions with AI, then publish."
        icon={ListChecks}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
