import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — PlacePro LMS" }] }),
  component: () => (
    <AuthShell
      title="Create your account"
      sub="Start your placement prep in under a minute."
      cta="Get started"
      alt={["Already have an account?", "Log in", "/login"]}
    />
  ),
});
