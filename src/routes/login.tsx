import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — PlacePro LMS" }] }),
  component: Login,
});

function Login() {
  return <AuthShell title="Welcome back" sub="Log in to continue your placement journey." cta="Log in" alt={["New here?", "Create an account", "/signup"]} />;
}

export function AuthShell({ title, sub, cta, alt }: { title: string; sub: string; cta: string; alt: [string, string, string] }) {
  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-display text-lg font-bold">PlacePro</span>
        </Link>
        <h1 className="mt-6 text-display text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
        <form className="mt-6 space-y-3">
          <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" placeholder="Email" />
          <input type="password" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" placeholder="Password" />
          <Link to="/dashboard" className="block w-full rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-brand-foreground hover:opacity-90">{cta}</Link>
        </form>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          {alt[0]} <Link to={alt[2] as "/signup"} className="font-medium text-foreground hover:underline">{alt[1]}</Link>
        </p>
      </div>
    </div>
  );
}
