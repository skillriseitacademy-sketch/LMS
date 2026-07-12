import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";

export const Route = createFileRoute("/_app/profile/$username/connections")({
  component: ConnectionsRoute,
});

function ConnectionsRoute() {
  const { username } = Route.useParams();
  return (
    <>
      <TopBar title="Connections" />
      <div className="p-4 md:p-6 mx-auto max-w-3xl">
        <div className="text-center p-12 bg-card rounded-3xl border border-border">
          <p className="text-muted-foreground text-sm">
            Connections list for @{username} (Coming Soon)
          </p>
        </div>
      </div>
    </>
  );
}
