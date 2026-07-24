import { createFileRoute } from "@tanstack/react-router";
import { PlaySquare } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PageStub } from "@/components/page-stub";

export const Route = createFileRoute("/admin/recorded-sessions")({
  head: () => ({ meta: [{ title: "Recorded Sessions — PlacePro LMS" }] }),
  component: () => (
    <>
      <TopBar title="Recorded Sessions" />
      <PageStub
        title="Recorded Sessions"
        description="Manage Google Drive or YouTube links for recorded LMS sessions."
        icon={PlaySquare}
        bullets={[
          "Add links to recorded sessions (Drive, YouTube, etc.).",
          "Wire to your backend when you're ready to ship live data."
        ]}
      />
    </>
  ),
});
