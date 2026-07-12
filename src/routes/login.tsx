import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, User, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AuthBackground } from "@/components/auth-background";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — PlacePro LMS" }] }),
  component: Login,
});

function Login() {
  return (
    <AuthShell
      title="Welcome back"
      sub="Log in to continue your placement journey."
      cta="Log in"
      alt={["New here?", "Create an account", "/signup"]}
    />
  );
}

export function AuthShell({
  title,
  sub,
  cta,
  alt,
}: {
  title: string;
  sub: string;
  cta: string;
  alt: [string, string, string];
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      let msg = authError.message;
      if (!msg || msg === "{}" || msg === "Failed to fetch") {
        msg =
          "Network error: Failed to connect to the authentication server. Supabase may be experiencing an outage.";
      }
      setError(msg);
      setLoading(false);
      return;
    }

    // Wait for the session to populate in our store, then redirect based on role.
    // The safest way is to fetch the profile role right here.
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();
      if (data?.role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/dashboard" });
      }
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to receive a password reset link.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/dashboard",
    });
    if (resetError) {
      setError(resetError.message);
    } else {
      setError("Check your email for the password reset link! (You can ignore the error styling, this is a success message)");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <AuthBackground />
      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-border bg-card/90 backdrop-blur p-8 shadow-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-display text-lg font-bold">PlacePro</span>
        </Link>
        <h1 className="mt-6 text-display text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>

        {error && (
          <div className={`mt-4 rounded-xl p-3 text-sm border ${error.includes("Check your email") ? "bg-green-50 text-green-700 border-green-200" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
            {error.replace("(You can ignore the error styling, this is a success message)", "")}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-3">
            <input
              required
              type="email"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm outline-none focus:border-brand"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-xs font-semibold text-brand hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="block w-full rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Please wait..." : cta}
          </button>
        </form>

        <div className="mt-5 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-sm font-semibold hover:bg-muted"
        >
          <svg className="h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          {alt[0]}{" "}
          <Link to={alt[2] as "/signup"} className="font-medium text-foreground hover:underline">
            {alt[1]}
          </Link>
        </p>
      </div>
    </div>
  );
}
