import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthBackground } from "@/components/auth-background";
import { Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/oauth/consent")({
  head: () => ({ meta: [{ title: "Authorize App — PlacePro LMS" }] }),
  component: OAuthConsent,
});

function OAuthConsent() {
  const navigate = useNavigate();
  // In a real OAuth flow, you would extract the client_id, scopes, and redirect_uri
  // from the URL search parameters to display here.

  const handleAuthorize = () => {
    // In a real flow, this would call Supabase to generate the auth code and redirect.
    alert(
      "Authorization simulated! In a real app, you would be redirected back to the requesting application.",
    );
    navigate({ to: "/dashboard" });
  };

  const handleDeny = () => {
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <AuthBackground />
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-border bg-card/90 backdrop-blur p-8 shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <h1 className="text-display text-2xl font-bold">Authorize App</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A third-party application is requesting access to your PlacePro account.
        </p>

        <div className="mt-6 rounded-xl bg-muted/50 p-4 border border-border text-left">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand" /> This app would like to:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Access your basic profile information</li>
            <li>Read your placement data</li>
          </ul>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleAuthorize}
            className="block w-full rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-brand-foreground hover:opacity-90 transition-opacity"
          >
            Authorize Application
          </button>
          <button
            onClick={handleDeny}
            className="block w-full rounded-xl border border-border bg-background py-2.5 text-center text-sm font-semibold hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">Only authorize applications you trust.</p>
      </div>
    </div>
  );
}
