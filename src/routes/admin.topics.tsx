import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/topics")({
  head: () => ({ meta: [{ title: "Topics — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Topics" />
      <PageStub
        title="Topics"
        description="Syllabus tree with PDF uploads and AI question generation per topic."
        icon={BookOpen}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to your backend when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
