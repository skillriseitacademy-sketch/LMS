import { createFileRoute } from "@tanstack/react-router";
import { FolderGit2 } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({ meta: [{ title: "Projects — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Projects" />
      <PageStub
        title="Projects"
        description="Curate the public project showcase that lives on the landing page."
        icon={FolderGit2}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
