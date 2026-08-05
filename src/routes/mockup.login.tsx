import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-fixed rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-surface-variant rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

      <main className="w-full max-w-[420px] bg-surface-container-lowest rounded-xl shadow-soft p-xl relative z-10 border border-outline-variant/30">
        <div className="text-center mb-xl">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">PlacePro</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Log in to your Career OS
          </p>
        </div>

        <button
          className="w-full flex items-center justify-center gap-sm py-[10px] px-md border border-outline-variant rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 mb-lg"
          type="button"
        >
          <svg
            className="w-5 h-5"
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
          <span className="font-label-sm text-label-sm text-on-surface">Continue with Google</span>
        </button>

        <div className="relative flex items-center py-md mb-md">
          <div className="flex-grow border-t border-outline-variant/50"></div>
          <span className="flex-shrink-0 mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            or
          </span>
          <div className="flex-grow border-t border-outline-variant/50"></div>
        </div>

        <form action="#" className="space-y-md" method="POST">
          <div>
            <label
              className="block font-label-sm text-label-sm text-on-surface mb-xs"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-md pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </span>
              <input
                className="block w-full pl-[40px] pr-md py-[10px] bg-surface-bright border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm placeholder-outline"
                id="email"
                name="email"
                placeholder="you@university.edu"
                required=""
                type="email"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-xs">
              <label
                className="block font-label-sm text-label-sm text-on-surface"
                htmlFor="password"
              >
                Password
              </label>
              <a
                className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-md pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </span>
              <input
                className="block w-full pl-[40px] pr-md py-[10px] bg-surface-bright border border-outline-variant rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm placeholder-outline"
                id="password"
                name="password"
                placeholder="••••••••"
                required=""
                type="password"
              />
            </div>
          </div>

          <button
            className="w-full mt-xl bg-primary text-on-primary font-label-sm text-label-sm py-[12px] rounded-lg hover:bg-on-primary-fixed-variant hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-xs"
            type="submit"
          >
            Log In
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-xl text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?
            <a
              className="font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-2 hover:underline"
              href="#"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
