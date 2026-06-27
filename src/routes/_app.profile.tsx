import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Profile" />
      <PageStub
        title="Profile"
        description="Your badges, XP history, completed roadmap steps, and account settings."
        icon={User}
        bullets={[
          "Layout, data model, and interactions are spec'd in the handoff doc.",
          "Wire to Lovable Cloud + the AI Gateway when you're ready to ship live data.",
          "All semantic tokens (brand, streak, xp-gold, card tints) are already in the design system.",
        ]}
      />
    </>
  ),
});
