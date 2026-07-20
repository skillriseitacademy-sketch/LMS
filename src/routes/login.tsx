import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

    const { data: { session } } = await supabase.auth.getSession();
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
      setError("Check your email for the password reset link!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EAE9FE] via-[#F2F1FF] to-[#E3E7FB] px-4 font-sans selection:bg-[#3424C2]/20">
      <div className="w-full max-w-[420px] rounded-[24px] bg-white p-8 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-display text-[#3424C2] text-3xl font-bold tracking-tight">PlacePro</h1>
          <p className="text-slate-600 mt-2 text-[15px]">Log in to your Career OS</p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-[12px] border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-slate-500 font-medium tracking-wide">OR</span>
          </div>
        </div>

        {error && (
          <div className={`mb-5 rounded-[12px] p-3.5 text-sm ${error.includes("Check your email") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5 font-mono tracking-tight uppercase">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                required
                type="email"
                className="w-full rounded-[12px] border border-slate-200 bg-white pl-10 pr-4 py-3 text-[15px] outline-none focus:border-[#3424C2] focus:ring-1 focus:ring-[#3424C2] transition-all placeholder:text-slate-400"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[13px] font-semibold text-slate-700 font-mono tracking-tight uppercase">Password</label>
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-[13px] font-semibold text-[#3424C2] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                required
                type="password"
                className="w-full rounded-[12px] border border-slate-200 bg-white pl-10 pr-4 py-3 text-[15px] outline-none focus:border-[#3424C2] focus:ring-1 focus:ring-[#3424C2] transition-all placeholder:text-slate-400 font-mono tracking-widest"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-[12px] bg-[#3424C2] py-3.5 text-[15px] font-semibold text-white hover:bg-[#2A1D9C] transition-colors disabled:opacity-70 shadow-sm"
          >
            {loading ? "Logging in..." : "Log In"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="mt-8 text-center text-[15px] text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#3424C2] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
