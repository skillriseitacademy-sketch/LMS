import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/onboarding_step_1_topics")({
  component: OnboardingStep1TopicsPage,
});

function OnboardingStep1TopicsPage() {
  return (
    <>
      <div className="w-full max-w-[800px] flex flex-col gap-xl">
        <div className="text-center space-y-md">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Welcome to PlacePro
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Customize your career OS. Select the topics you want to master to start building your
            personalized roadmap.
          </p>

          <div className="flex items-center justify-center gap-sm mt-lg">
            <div className="flex items-center gap-sm">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">
                1
              </div>
              <span className="font-label-sm text-label-sm text-primary">Topics</span>
            </div>
            <div className="w-12 h-1 bg-surface-container-high rounded-full overflow-hidden"></div>
            <div className="flex items-center gap-sm opacity-50">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">
                2
              </div>
            </div>
            <div className="w-12 h-1 bg-surface-container-high rounded-full"></div>
            <div className="flex items-center gap-sm opacity-50">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">
                3
              </div>
            </div>
            <div className="w-12 h-1 bg-surface-container-high rounded-full"></div>
            <div className="flex items-center gap-sm opacity-50">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">
                4
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md md:gap-lg"
          id="topics-grid"
        >
          <button
            aria-pressed="true"
            className="topic-card group relative bg-surface-container-lowest rounded-2xl p-lg shadow-card border-2 border-primary text-left transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onclick="toggleCard(this)"
          >
            <div className="absolute top-sm right-sm text-primary opacity-100 transition-opacity">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-container text-primary flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
              <span
                className="material-symbols-outlined text-headline-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                data_object
              </span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-xs">
              Data Structures
            </h3>
            <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
              Master arrays, trees, graphs and algorithmic problem solving.
            </p>
          </button>

          <button
            aria-pressed="false"
            className="topic-card group relative bg-surface-container-lowest rounded-2xl p-lg shadow-card border-2 border-transparent hover:border-outline-variant text-left transition-all hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onclick="toggleCard(this)"
          >
            <div className="absolute top-sm right-sm text-outline opacity-0 group-hover:opacity-50 transition-opacity">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim transition-colors group-hover:text-primary">
              <span className="material-symbols-outlined text-headline-md">language</span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-xs">
              Web Dev
            </h3>
            <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
              Frontend, backend, and full-stack frameworks.
            </p>
          </button>

          <button
            aria-pressed="false"
            className="topic-card group relative bg-surface-container-lowest rounded-2xl p-lg shadow-card border-2 border-transparent hover:border-outline-variant text-left transition-all hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onclick="toggleCard(this)"
          >
            <div className="absolute top-sm right-sm text-outline opacity-0 group-hover:opacity-50 transition-opacity">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim transition-colors group-hover:text-primary">
              <span className="material-symbols-outlined text-headline-md">memory</span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-xs">
              Core CS
            </h3>
            <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
              OS, DBMS, Computer Networks, and Architecture.
            </p>
          </button>

          <button
            aria-pressed="false"
            className="topic-card group relative bg-surface-container-lowest rounded-2xl p-lg shadow-card border-2 border-transparent hover:border-outline-variant text-left transition-all hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onclick="toggleCard(this)"
          >
            <div className="absolute top-sm right-sm text-outline opacity-0 group-hover:opacity-50 transition-opacity">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim transition-colors group-hover:text-primary">
              <span className="material-symbols-outlined text-headline-md">calculate</span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-xs">
              Aptitude
            </h3>
            <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
              Quantitative, logical, and verbal reasoning skills.
            </p>
          </button>

          <button
            aria-pressed="false"
            className="topic-card group relative bg-surface-container-lowest rounded-2xl p-lg shadow-card border-2 border-transparent hover:border-outline-variant text-left transition-all hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onclick="toggleCard(this)"
          >
            <div className="absolute top-sm right-sm text-outline opacity-0 group-hover:opacity-50 transition-opacity">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim transition-colors group-hover:text-primary">
              <span className="material-symbols-outlined text-headline-md">architecture</span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-xs">
              System Design
            </h3>
            <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
              Scalable architecture and high-level design principles.
            </p>
          </button>

          <button
            aria-pressed="false"
            className="topic-card group relative bg-surface-container-lowest rounded-2xl p-lg shadow-card border-2 border-transparent hover:border-outline-variant text-left transition-all hover:shadow-card-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onclick="toggleCard(this)"
          >
            <div className="absolute top-sm right-sm text-outline opacity-0 group-hover:opacity-50 transition-opacity">
              <span className="material-symbols-outlined">add_circle</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim transition-colors group-hover:text-primary">
              <span className="material-symbols-outlined text-headline-md">psychology</span>
            </div>
            <h3 className="font-headline-md text-body-lg font-bold text-on-surface mb-xs">
              HR &amp; Soft Skills
            </h3>
            <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
              Interview etiquette, communication, and behavioral prep.
            </p>
          </button>
        </div>

        <div className="flex items-center justify-between mt-xl pt-lg border-t border-outline-variant">
          <button className="px-lg py-md rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-variant transition-colors">
            Skip for now
          </button>
          <button className="px-xl py-md rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-bold shadow-md hover:bg-primary-fixed-variant hover:scale-105 transition-all flex items-center gap-sm">
            Next Step
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
