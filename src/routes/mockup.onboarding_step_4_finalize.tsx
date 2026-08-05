import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/onboarding_step_4_finalize")({
  component: OnboardingStep4FinalizePage,
});

function OnboardingStep4FinalizePage() {
  return (
    <>
      <header className="w-full bg-surface-container-lowest sticky top-0 z-50 shadow-sm border-b border-outline-variant flex justify-between items-center px-lg py-md max-w-container-max mx-auto">
        <div className="flex items-center gap-sm">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            school
          </span>
          <span className="text-headline-md font-headline-md font-extrabold text-primary tracking-tight">
            PlacePro
          </span>
        </div>
        <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
          Setup - Step 4 of 4
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-md md:p-xl w-full max-w-4xl mx-auto">
        <div className="w-full max-w-xl mb-xl">
          <div className="flex justify-between mb-sm px-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Basic Info</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Education</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Interests</span>
            <span className="font-label-sm text-label-sm text-primary font-bold">Visibility</span>
          </div>
          <div className="h-2 w-full bg-surface-variant rounded-full flex overflow-hidden">
            <div className="h-full bg-primary w-full rounded-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <div className="text-center mb-xl">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
            Choose Your Profile Visibility
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Control who can see your achievements, projects, and career progress on PlacePro. You
            can change this later in settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg w-full mb-xl">
          <label className="cursor-pointer group relative">
            <input
              checked=""
              className="peer sr-only"
              name="visibility"
              type="radio"
              value="public"
            />
            <div className="glass-panel rounded-xl p-lg md:p-xl h-full flex flex-col items-center text-center transition-all duration-300 border-2 border-transparent peer-checked:card-selected hover:shadow-md hover:-translate-y-1">
              <div className="absolute top-md right-md h-6 w-6 rounded-full border-2 border-outline-variant peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <span
                  className="material-symbols-outlined text-white text-sm opacity-0 peer-checked:opacity-100"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>

              <div className="w-32 h-32 mb-lg rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover mix-blend-multiply"
                  data-alt="A stylized, clean vector illustration in an indigo and light blue color palette showing connected nodes and avatars, representing networking and a public profile. The style is modern corporate SaaS, with soft edges and a bright, approachable mood suitable for a student career platform."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdJc-es98J3oLYYe_GdjI7CQU7jXMJdlyGZZYvu-JUTbpMHxi6-BY5FeuGpXL41f7YEuzJ04qmaqX5Zgi46XzmfF86AZk5G6XGTq1zeBYdDk8a6A-_amcWk99yy4MGXrUU3HxH7kdgLjWojy-ZNhY5JUoUzg7PkXzyWcl9Bwf5yFc3W-XQ5OYKbpSWzpHlPxfIbz4r0fhWXHY9Nednwj_CGzKy_l9ulWLPLVhcKb2EK5eQZigEXI4pQQ"
                />
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs group-hover:text-primary transition-colors">
                Public Profile
              </h2>
              <div className="bg-secondary-container/20 text-secondary px-sm py-xs rounded-full font-label-sm text-label-sm mb-md inline-block">
                Recommended
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Allow recruiters, peers, and mentors to discover your profile, view your projects,
                and see your leaderboard rankings. Best for maximum career opportunities.
              </p>
            </div>
          </label>

          <label className="cursor-pointer group relative">
            <input className="peer sr-only" name="visibility" type="radio" value="private" />
            <div className="glass-panel rounded-xl p-lg md:p-xl h-full flex flex-col items-center text-center transition-all duration-300 border-2 border-transparent peer-checked:card-selected hover:shadow-md hover:-translate-y-1">
              <div className="absolute top-md right-md h-6 w-6 rounded-full border-2 border-outline-variant peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <span
                  className="material-symbols-outlined text-white text-sm opacity-0 peer-checked:opacity-100"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              </div>

              <div className="w-32 h-32 mb-lg rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover mix-blend-multiply"
                  data-alt="A stylized, clean vector illustration in a slate and indigo color palette showing a shield or lock motif, representing privacy and a locked profile. The style is modern corporate SaaS, with soft edges and a secure, trustworthy mood suitable for a student career platform."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEun3MJ3a80MD6wymrA1eGBly3vw_h4LqEpZBOIb4e1BjYqgDpfx4AaVj1iFJEA84tLqClWfFZ5H6Mex2cgLFibyEOy2lzScgbduMv7L2-HJ36SHXPmjH8W_vRYgycfw8sxH6PsT5H9MQRXBhOSArCeJQHoRaitlQmkooQEFxZE8LUchn7Ag9hPq5xGoRsDEzBNZQ4eLUdXbdwhmBYQugcRWk7dANs894w0QFrXCsirUZLpLEm_aZnqw"
                />
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs group-hover:text-primary transition-colors">
                Private Profile
              </h2>
              <div className="bg-surface-variant text-on-surface-variant px-sm py-xs rounded-full font-label-sm text-label-sm mb-md inline-block">
                Restricted
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Your profile is hidden from public search and leaderboards. Only users you
                explicitly connect with or share your direct link with can view your details.
              </p>
            </div>
          </label>
        </div>

        <div className="w-full max-w-4xl flex justify-between items-center mt-auto border-t border-outline-variant/50 pt-lg">
          <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors px-md py-sm flex items-center gap-xs">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
          <button className="bg-primary text-on-primary font-headline-md text-body-lg px-xl py-md rounded-lg shadow-sm hover:bg-surface-tint hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center gap-sm">
            Finish Setup
            <span className="material-symbols-outlined">rocket_launch</span>
          </button>
        </div>
      </main>
    </>
  );
}
