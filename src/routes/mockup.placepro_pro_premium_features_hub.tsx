import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/placepro_pro_premium_features_hub")({
  component: PlaceproProPremiumFeaturesHubPage,
});

function PlaceproProPremiumFeaturesHubPage() {
  return (
    <>
      <header className="bg-surface docked full-width top-0 sticky z-50 border-b border-outline-variant shadow-sm flex justify-between items-center px-6 py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-headline-md font-headline-md font-extrabold text-primary">
            PlacePro
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            href="#"
          >
            Features
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            href="#"
          >
            How it Works
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            href="#"
          >
            Testimonials
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 hidden md:block">
            Log In
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-container hover:scale-95 transition-all duration-200">
            Get Started
          </button>
        </div>
      </header>
      <main className="max-w-container-max mx-auto px-6 py-8 flex flex-col gap-8">
        <section className="relative rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant overflow-hidden p-8 md:p-2xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high/50 to-transparent pointer-events-none"></div>
          <div className="flex-1 z-10 flex flex-col items-center md:items-start gap-4">
            <div className="inline-flex items-center gap-2 bg-secondary-container/20 text-secondary border border-secondary/30 px-4 py-1 rounded-full font-label-sm text-label-sm mb-2">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              PlacePro Pro
            </div>
            <h1 className="text-display-lg font-display-lg text-on-background">
              Accelerate Your <br /> Career Trajectory.
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg mt-2">
              Unlock AI-driven resume optimization, unlimited mock interviews, and priority arena
              access. Stand out and secure your dream role faster.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-medium hover:brightness-110 hover:scale-105 transition-all duration-200 shadow-md">
                Upgrade to Pro Now
              </button>
              <button className="bg-surface text-on-surface border border-outline-variant px-8 py-4 rounded-lg font-medium hover:bg-surface-variant transition-colors duration-200 shadow-sm">
                View Pricing
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px] rounded-xl overflow-hidden shadow-lg border border-outline-variant/50">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              data-alt="A modern, sleek dashboard interface displayed on a high-end monitor in a brightly lit, professional workspace. The screen shows detailed analytics graphs and a premium profile badge, illuminated by soft natural light creating a bright, modern light-mode aesthetic. The scene uses a clean palette of deep blacks, pristine whites, and vibrant indigo and amber accents. The mood is ambitious and technologically advanced."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV_eJfMtLZj5h2_7dk7OcYoh42ZW4wBgPz3R_5AN7AknvGJLxVPTZ1IxOS_bnTs8do3RJ2wnwoVjOrCZBuhFf5bOSmfKHpyGEop1UQqbKvKgKq4u349sbF7rDcrb0MQaIRV4B3SVgkgapgFNknsZj6Qo1nlidyd6GZxDAnihEotEYfxppS-RXJZm08d76vbGR9GEAh8zp1eJdhSH9QDV4gYzGUB0Bdr7XksCnDopJrq-Au3Xa-WcUMCQ"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-l-primary p-6 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md">AI Resume Optimization</h3>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Bypass ATS filters with intelligent keyword injection and structural formatting
              suggestions tailored to specific job descriptions.
            </p>
            <div className="mt-auto pt-4 flex items-center gap-2 font-label-sm text-label-sm text-primary">
              <span className="material-symbols-outlined text-sm">check_circle</span> 95%+ ATS Score
              Guarantee
            </div>
          </div>
          <div className="col-span-1 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-l-secondary-container p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  video_camera_front
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md">Unlimited Mock Interviews</h3>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Practice endlessly with AI interviewers. Get detailed feedback on pacing, filler
              words, and technical accuracy.
            </p>
          </div>
          <div className="col-span-1 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-l-primary p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sports_esports
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md">Premium Arena Access</h3>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Exclusive high-tier coding challenges, 2x XP multiplier, and priority placement on
              global leaderboards.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 border-l-secondary-container p-6 flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
            <div className="flex-1 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm w-max">
                New Feature
              </div>
              <h3 className="text-headline-md font-headline-md">Direct Recruiter Messages</h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Pro users get 5 direct connection credits per month to bypass the application queue
                and pitch directly to hiring managers.
              </p>
            </div>
            <div className="w-full md:w-1/3 h-32 bg-surface-container rounded-lg border border-outline-variant flex items-center justify-center relative shadow-inner">
              <span className="material-symbols-outlined text-4xl text-primary/30">mail</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-highest w-full py-8 border-t border-outline-variant mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-container-max mx-auto px-6">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="text-headline-md font-headline-md font-bold text-on-surface">
              PlacePro
            </span>
            <p className="text-body-md font-body-md text-on-surface-variant">
              © 2024 PlacePro Career OS. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Product
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Resources
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Company
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
