import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Role } from "@/hooks/useAuth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — PlacePro" }] }),
  component: Signup,
});

function Signup() {
  const [role] = useState<Role>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    setError("");

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      navigate({ to: "/dashboard" });
    }, 500);
  };

  return (
    <div
      className="h-full min-h-screen flex items-center justify-center font-body-md text-on-background py-10"
      style={{
        backgroundColor: "#faf8ff",
        backgroundImage: `radial-gradient(circle at 10% 20%, rgba(53, 37, 205, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(53, 37, 205, 0.05) 0%, transparent 40%)`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md mx-auto p-md md:p-lg">
        {/* Brand / Header */}
        <div className="text-center mb-xl">
          <h1 className="font-display-lg text-display-lg text-primary mb-sm flex items-center justify-center gap-xs">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "40px", fontVariationSettings: '"FILL" 1' }}
            >
              school
            </span>
            PlacePro
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Your Career OS</p>
        </div>

        {/* Main Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)] border border-outline-variant/30 p-lg md:p-xl relative overflow-hidden">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-fixed"></div>
          
          <h2 className="font-headline-md text-headline-md text-on-surface mb-lg text-center">
            Create an Account
          </h2>

          {error && (
            <div className="mb-md rounded-lg bg-error-container p-3 text-sm text-on-error-container border border-error/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-md">
            {/* Full Name Field */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs" htmlFor="name">
                Full Name
              </label>
              <div className="relative group rounded-lg transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(53,37,205,0.2)]">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">person</span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-xl pr-sm py-sm bg-surface-bright border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs" htmlFor="email">
                Email address
              </label>
              <div className="relative group rounded-lg transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(53,37,205,0.2)]">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">mail</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@student.edu"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-xl pr-sm py-sm bg-surface-bright border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs" htmlFor="password">
                Password
              </label>
              <div className="relative group rounded-lg transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(53,37,205,0.2)]">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">lock</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-xl pr-sm py-sm bg-surface-bright border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 outline-none"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-sm">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary-container bg-surface-bright cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-body-md text-sm text-on-surface-variant" htmlFor="terms">
                  I agree to the{" "}
                  <a href="#" className="font-medium text-primary hover:text-primary-fixed-variant underline decoration-primary-fixed-dim decoration-2 underline-offset-2 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-primary hover:text-primary-fixed-variant underline decoration-primary-fixed-dim decoration-2 underline-offset-2 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-sm text-label-sm py-sm rounded-lg hover:bg-on-primary-fixed-variant hover:shadow-md transition-all duration-200 mt-md disabled:opacity-70 disabled:hover:shadow-none"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-xl text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Already have an account?{" "}
              <Link to="/login" className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-2 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
