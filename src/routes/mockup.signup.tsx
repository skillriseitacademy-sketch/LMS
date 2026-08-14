import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 md:p-lg">
        <div className="text-center mb-8">
          <h1 className="font-display-lg text-display-lg text-primary mb-2 flex items-center justify-center gap-1">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
            PlacePro
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Your Career OS</p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 p-6 md:p-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-fixed"></div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6 text-center">
            Create an Account
          </h2>
          <form action="#" className="space-y-md" method="POST">
            <div>
              <label
                className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative input-glow rounded-lg transition-shadow duration-200">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">person</span>
                </div>
                <input
                  autocomplete="name"
                  className="block w-full pl-8 pr-2 py-2 bg-surface-bright border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200"
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  required=""
                  type="text"
                />
              </div>
            </div>

            <div>
              <label
                className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="relative input-glow rounded-lg transition-shadow duration-200">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">mail</span>
                </div>
                <input
                  autocomplete="email"
                  className="block w-full pl-8 pr-2 py-2 bg-surface-bright border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200"
                  id="email"
                  name="email"
                  placeholder="jane@student.edu"
                  required=""
                  type="email"
                />
              </div>
            </div>

            <div>
              <label
                className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative input-glow rounded-lg transition-shadow duration-200">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">lock</span>
                </div>
                <input
                  autocomplete="new-password"
                  className="block w-full pl-8 pr-2 py-2 bg-surface-bright border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required=""
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary-container bg-surface-bright"
                  id="terms"
                  name="terms"
                  required=""
                  type="checkbox"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-body-md text-sm text-on-surface-variant" htmlFor="terms">
                  I agree to the{" "}
                  <a
                    className="font-medium text-primary hover:text-primary-fixed-variant underline decoration-primary-fixed-dim decoration-2 underline-offset-2 transition-colors"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="font-medium text-primary hover:text-primary-fixed-variant underline decoration-primary-fixed-dim decoration-2 underline-offset-2 transition-colors"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-headline-md text-body-md text-on-primary bg-primary hover:bg-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-all duration-200 transform hover:scale-[1.02]"
                type="submit"
              >
                Create Account
                <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-6 relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full flex justify-center items-center py-2 px-4 border border-outline-variant rounded-lg shadow-sm bg-surface-container-lowest font-body-md text-body-md text-on-surface hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-colors duration-200"
              type="button"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
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
          </div>
        </div>

        <p className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">
          Already have an account?
          <a
            className="font-headline-md text-body-md text-primary hover:text-primary-fixed-variant transition-colors"
            href="#"
          >
            Log In
          </a>
        </p>
      </div>
    </>
  );
}
