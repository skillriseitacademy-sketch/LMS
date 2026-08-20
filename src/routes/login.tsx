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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      window.location.href = "/dashboard";
    }
  }, [session]);

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
      window.location.href = "/dashboard";
    }
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
      className="min-h-screen flex items-center justify-center p-4 font-body-md text-body-md text-on-surface antialiased relative overflow-hidden"
      style={{
        backgroundColor: "#faf8ff",
        backgroundImage: `radial-gradient(at 0% 0%, hsla(242, 88%, 65%, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(242, 88%, 65%, 0.15) 0, transparent 50%)`,
      }}
    >
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-fixed rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-surface-variant rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      
      {/* Main Card Container */}
      <main className="w-full max-w-[420px] bg-surface-container-lowest rounded-xl p-8 relative z-10 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">
            PlacePro
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Log in to your Career OS
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-error-container p-3 text-sm text-on-error-container border border-error/20">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-md">
          {/* Email Field */}
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
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
                className="block w-full pl-[40px] pr-4 py-[10px] bg-surface-bright border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm placeholder:text-outline"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
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
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-[40px] pr-[40px] py-[10px] bg-surface-bright border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm placeholder:text-outline"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-outline hover:text-on-surface transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-primary text-on-primary font-label-sm text-label-sm py-[12px] rounded-lg hover:bg-on-primary-fixed-variant hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-1 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? "Logging in..." : "Log In"}
            {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
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
