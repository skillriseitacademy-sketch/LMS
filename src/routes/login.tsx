import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — PlacePro" }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate({ to: "/dashboard" });
    }
  }, [session, navigate]);

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
        msg = "Network error: Failed to connect to the authentication server.";
      }
      setError(msg);
      setLoading(false);
      return;
    }

    const {
      data: { session: newSession },
    } = await supabase.auth.getSession();
    if (newSession?.user) {
      navigate({ to: "/dashboard" });
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
      setError("Check your email for the password reset link!");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-md font-body-md text-body-md text-on-surface antialiased relative overflow-hidden"
      style={{
        backgroundColor: "#faf8ff",
        backgroundImage: `radial-gradient(at 0% 0%, hsla(242, 88%, 65%, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(242, 88%, 65%, 0.15) 0, transparent 50%)`,
      }}
    >
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-fixed rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-surface-variant rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      
      {/* Main Card Container */}
      <main className="w-full max-w-[420px] bg-surface-container-lowest rounded-xl p-xl relative z-10 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center mb-xl">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">
            PlacePro
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Log in to your Career OS
          </p>
        </div>

        {error && (
          <div className="mb-md rounded-lg bg-error-container p-3 text-sm text-on-error-container border border-error/20">
            {error}
          </div>
        )}

        {/* OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-sm py-[10px] px-md border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 mb-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="font-label-sm text-label-sm text-on-surface">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center py-md mb-md">
          <div className="flex-grow border-t border-outline-variant/50"></div>
          <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            or
          </span>
          <div className="flex-grow border-t border-outline-variant/50"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-md">
          {/* Email Field */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface mb-xs" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-md pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@university.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-[40px] pr-md py-[10px] bg-surface-bright border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm placeholder:text-outline"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-xs">
              <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-md pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-[40px] pr-md py-[10px] bg-surface-bright border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm placeholder:text-outline"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-xl bg-primary text-on-primary font-label-sm text-label-sm py-[12px] rounded-lg hover:bg-on-primary-fixed-variant hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-xs disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? "Logging in..." : "Log In"}
            {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-xl text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-2 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
