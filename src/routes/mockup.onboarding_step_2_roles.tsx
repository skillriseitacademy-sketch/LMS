import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/onboarding_step_2_roles")({
  component: OnboardingStep2RolesPage,
});

function OnboardingStep2RolesPage() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center p-md md:p-xl w-full max-w-2xl mx-auto fade-in">
        <div className="mb-xl text-center w-full">
          <h1 className="font-headline-md text-headline-md font-extrabold text-primary mb-lg">
            PlacePro
          </h1>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
            What roles are you targeting?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Select or search for the career paths you're preparing for. We'll tailor your roadmap
            accordingly.
          </p>
        </div>

        <div className="w-full mb-xl">
          <div className="flex items-center justify-between px-md relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-variant -z-10 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -z-10 rounded-full transform -translate-y-1/2 transition-all duration-500"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm mb-xs shadow-sm">
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  check
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-primary">Profile</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm mb-xs shadow-sm ring-4 ring-primary-fixed">
                2
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold">Roles</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm mb-xs">
                3
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Skills</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-lg md:p-xl mb-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed opacity-30 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

          <div className="relative mb-lg">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:bg-surface-lowest focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-all font-body-md text-body-md placeholder-outline"
              id="role-search"
              placeholder="Search for roles (e.g. Data Scientist)"
              type="text"
            />
          </div>

          <div className="mb-lg hidden" id="selected-roles-container">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm">
              Selected Roles
            </h3>
            <div className="flex flex-wrap gap-sm" id="selected-roles-list"></div>
          </div>

          <div>
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-md">
              Popular Suggestions
            </h3>
            <div className="flex flex-wrap gap-sm" id="suggestion-chips">
              <button
                className="role-chip flex items-center gap-xs px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                data-role="Software Development Engineer (SDE)"
              >
                <span>Software Development Engineer (SDE)</span>
                <span className="material-symbols-outlined icon-add" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span
                  className="material-symbols-outlined icon-check text-on-primary"
                  style={{ fontSize: "18px" }}
                >
                  check
                </span>
              </button>
              <button
                className="role-chip selected flex items-center gap-xs px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                data-role="Frontend Developer"
              >
                <span>Frontend Developer</span>
                <span className="material-symbols-outlined icon-add" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span
                  className="material-symbols-outlined icon-check text-on-primary"
                  style={{ fontSize: "18px" }}
                >
                  check
                </span>
              </button>
              <button
                className="role-chip flex items-center gap-xs px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                data-role="Backend Developer"
              >
                <span>Backend Developer</span>
                <span className="material-symbols-outlined icon-add" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span
                  className="material-symbols-outlined icon-check text-on-primary"
                  style={{ fontSize: "18px" }}
                >
                  check
                </span>
              </button>
              <button
                className="role-chip flex items-center gap-xs px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                data-role="Data Analyst"
              >
                <span>Data Analyst</span>
                <span className="material-symbols-outlined icon-add" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span
                  className="material-symbols-outlined icon-check text-on-primary"
                  style={{ fontSize: "18px" }}
                >
                  check
                </span>
              </button>
              <button
                className="role-chip flex items-center gap-xs px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                data-role="Product Manager"
              >
                <span>Product Manager</span>
                <span className="material-symbols-outlined icon-add" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span
                  className="material-symbols-outlined icon-check text-on-primary"
                  style={{ fontSize: "18px" }}
                >
                  check
                </span>
              </button>
              <button
                className="role-chip flex items-center gap-xs px-4 py-2 rounded-full border border-outline-variant bg-surface hover:bg-surface-variant text-on-surface transition-colors font-body-md text-body-md shadow-sm"
                data-role="UI/UX Designer"
              >
                <span>UI/UX Designer</span>
                <span className="material-symbols-outlined icon-add" style={{ fontSize: "18px" }}>
                  add
                </span>
                <span
                  className="material-symbols-outlined icon-check text-on-primary"
                  style={{ fontSize: "18px" }}
                >
                  check
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <button className="flex items-center gap-xs text-on-surface-variant hover:text-primary font-body-md text-body-md py-2 px-4 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <button className="bg-primary hover:bg-on-primary-fixed text-on-primary font-headline-md text-body-md py-3 px-xl rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 flex items-center gap-xs">
            Continue to Skills
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </>
  );
}
