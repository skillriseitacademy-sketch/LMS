import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/onboarding_step_3_username")({
  component: OnboardingStep3UsernamePage,
});

function OnboardingStep3UsernamePage() {
  return (
    <>
      <main className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant p-lg md:p-xl flex flex-col gap-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-surface-container-high rounded-t-xl overflow-hidden">
          <div className="h-full bg-primary w-[75%] transition-all duration-500 ease-in-out"></div>
        </div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-fixed opacity-30 rounded-full blur-3xl pointer-events-none"></div>

        <header className="flex flex-col gap-sm relative z-10">
          <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
            <span>STEP 1</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span>STEP 2</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary font-bold">STEP 3</span>
          </div>
          <div className="flex items-center justify-between mt-sm">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Claim your unique handle
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                This will be your public identity on PlacePro.
              </p>
            </div>
            <div className="hidden sm:flex h-12 w-12 bg-primary-container rounded-full items-center justify-center text-on-primary-container shrink-0">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                badge
              </span>
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-lg relative z-10 py-md">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
              <span className="font-headline-md text-headline-md text-outline">@</span>
            </div>
            <input
              className="w-full bg-surface-container-low border border-outline-variant text-on-surface font-headline-md text-headline-md rounded-lg py-md pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-outline"
              id="username-input"
              placeholder="your_handle"
              type="text"
              value="alex_dev"
            />
            <div className="absolute inset-y-0 right-0 pr-md flex items-center pointer-events-none">
              <div
                className="h-6 w-6 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] transition-transform scale-100"
                id="availability-icon"
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-sm text-[#10B981] bg-[#10B981]/10 px-md py-sm rounded-lg animate-fade-in-up"
            id="status-message"
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span className="font-body-md text-body-md font-medium">
              Awesome! <strong className="font-semibold">@alex_dev</strong> is available.
            </span>
          </div>

          <div className="flex items-center gap-md bg-secondary-container/20 p-md rounded-lg border border-secondary-container/30">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              workspace_premium
            </span>
            <p className="font-body-sm text-sm text-on-surface-variant leading-tight">
              Securing your username early locks in your identity for the global Leaderboard.
            </p>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-outline-variant pt-lg mt-auto relative z-10">
          <button className="flex items-center gap-xs px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors font-body-md text-body-md font-medium">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back
          </button>
          <button className="flex items-center gap-xs px-lg py-sm rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-variant transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm font-body-md text-body-md font-medium">
            Continue
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </footer>
      </main>
    </>
  );
}
