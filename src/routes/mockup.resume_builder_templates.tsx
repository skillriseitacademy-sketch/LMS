import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/resume_builder_templates")({
  component: ResumeBuilderTemplatesPage,
});

function ResumeBuilderTemplatesPage() {
  return (
    <>
      <nav className="w-sidebar-width h-full fixed left-0 top-0 bg-surface-container-lowest shadow-sm flex flex-col h-full py-6 px-4 z-50 hidden md:flex">
        <div className="flex items-center gap-2 mb-8 px-2">
          <span
            className="material-symbols-outlined text-primary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            work
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            PlacePro
          </span>
          <span className="font-label-sm text-label-sm text-outline ml-auto bg-surface-container px-2 py-1 rounded-full">
            Career OS
          </span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-1">
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              dashboard
            </span>
            <span className="font-body-md text-body-md font-medium">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              forum
            </span>
            <span className="font-body-md text-body-md font-medium">Feed</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              record_voice_over
            </span>
            <span className="font-body-md text-body-md font-medium">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              quiz
            </span>
            <span className="font-body-md text-body-md font-medium">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              sports_esports
            </span>
            <span className="font-body-md text-body-md font-medium">Arena</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              work
            </span>
            <span className="font-body-md text-body-md font-medium">Jobs</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              map
            </span>
            <span className="font-body-md text-body-md font-medium">Roadmap</span>
          </a>

          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg bg-surface-container-low text-primary font-bold border-r-4 border-primary transition-colors group"
            href="#"
          >
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              description
            </span>
            <span className="font-body-md text-body-md">Resume</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              leaderboard
            </span>
            <span className="font-body-md text-body-md font-medium">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              person
            </span>
            <span className="font-body-md text-body-md font-medium">Profile</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              groups
            </span>
            <span className="font-body-md text-body-md font-medium">Rooms</span>
          </a>
        </div>
        <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-1">
          <button className="w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-body-md text-body-md font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4 group">
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              rocket_launch
            </span>
            Start Daily Challenge
          </button>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              settings
            </span>
            <span className="font-body-md text-body-md font-medium">Settings</span>
          </a>
          <a
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              help
            </span>
            <span className="font-body-md text-body-md font-medium">Help</span>
          </a>
          <div className="flex items-center gap-3 px-2 py-2 mt-2">
            <img
              alt="User profile photo"
              className="w-8 h-8 rounded-full object-cover border border-outline-variant"
              data-alt="A small circular avatar portrait of a modern, professional student looking confident. Shot on a clean studio background with bright, even lighting, emphasizing a corporate modern aesthetic with subtle indigo tones."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuKBOdk9LR4zkST9UlndnK2skshjVjN3rjxMpfCqxSjfILx7ScS5ifjCP2lr70r7rxt9FTw1jIo4rij4rO_P9vwk4sDl3VGBaM_nXfNB8xtn_ooAXGJ3VvFmkt0R7Ezx1gfXDo5zqqlr9_DJVTrR24CB4a32wE2JTly7TyF4zx5O8TFb8CmXiIeOVEj79C9pICl9fXYjZBzLmIDJpV5mPhc_Y1c2YdpxJx6TXA9wcI5Xal9h-4nRqz2Q"
            />
            <div className="flex flex-col">
              <span className="font-body-md text-[14px] font-semibold text-on-surface leading-tight">
                Alex Rivera
              </span>
              <span className="font-label-sm text-label-sm text-outline">Pro Member</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col md:ml-[280px] w-full max-w-container-max mx-auto h-screen relative bg-surface-bright pattern-bg">
        <header className="flex justify-between items-center w-full h-16 px-8 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="font-headline-md text-headline-md font-bold text-on-background">
              Choose your resume template
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-full font-body-md text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all placeholder:text-outline/70 shadow-sm"
                placeholder="Search templates..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/20 text-secondary-fixed-dim hover:bg-secondary-container/30 transition-colors">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
                <span className="font-label-sm font-bold">1,250 XP</span>
              </button>
              <button className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-body-md text-[14px] font-medium hover:bg-primary-fixed-dim transition-colors shadow-sm active:scale-95">
                Upgrade Pro
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="font-label-sm text-outline mr-2 uppercase tracking-wider">
              Filters:
            </span>
            <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-body-md text-[14px] font-medium border border-primary/20 hover:bg-primary/20 transition-colors shadow-sm">
              All
            </button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-body-md text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm">
              ATS-Friendly
            </button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-body-md text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm">
              Single Page
            </button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-body-md text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm">
              Two Column
            </button>
            <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-body-md text-[14px] border border-outline-variant/50 hover:bg-surface-container transition-colors shadow-sm ml-auto flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              More Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border-2 border-primary shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-full shadow-sm flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  Active
                </span>
              </div>
              <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
                <div
                  className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20"
                  data-alt="A pristine, minimalist resume layout on a slightly warm off-white background. The design features crisp, dark indigo typography with generous whitespace, a single-column structure, and elegant serif headings. It embodies a high-end corporate aesthetic, clean and authoritative, under bright studio lighting."
                  style={{ backgroundImage: "url('https" }}
                ></div>

                <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                  <button className="w-3/4 py-2 bg-primary text-on-primary font-body-md font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105">
                    Use This Template
                  </button>
                  <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface font-body-md font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    Preview Full
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface mb-1">
                  The Minimalist
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  Clean, text-heavy. Perfect for ATS parsing.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    ATS
                  </span>
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    1 Col
                  </span>
                </div>
              </div>
            </div>

            <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-outline-variant">
              <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
                <div
                  className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20"
                  data-alt="A modern, single-column resume design featuring a subtle light-blue header area. The layout is highly organized with distinct sections separated by thin, elegant lines. Typography is sans-serif, sharp, and highly legible. Shot flat on a clean studio table under diffused daylight, reflecting a sleek tech-forward vibe."
                  style={{ backgroundImage: "url('https" }}
                ></div>

                <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                  <button className="w-3/4 py-2 bg-primary text-on-primary font-body-md font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105">
                    Use This Template
                  </button>
                  <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface font-body-md font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    Preview Full
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface mb-1">
                  The Modernist
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  Sleek, single column layout for tech roles.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    ATS
                  </span>
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    Modern
                  </span>
                </div>
              </div>
            </div>

            <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-outline-variant">
              <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
                <div
                  className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20"
                  data-alt="An executive-style resume layout showcasing bold, commanding typography and strong horizontal dividers. The design utilizes a strict black and white palette with perhaps a touch of deep slate. It conveys authority, experience, and clarity, presented beautifully in a high-end, bright professional context."
                  style={{ backgroundImage: "url('https" }}
                ></div>

                <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                  <button className="w-3/4 py-2 bg-primary text-on-primary font-body-md font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105">
                    Use This Template
                  </button>
                  <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface font-body-md font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    Preview Full
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface mb-1">
                  The Executive
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  Bold headers, strong hierarchy.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    Classic
                  </span>
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    Multi-page
                  </span>
                </div>
              </div>
            </div>

            <div className="group template-card relative flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-outline-variant">
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 bg-secondary-container/80 text-on-secondary-container font-label-sm text-[10px] rounded-full shadow-sm uppercase tracking-wider font-bold backdrop-blur-sm">
                  New
                </span>
              </div>
              <div className="relative w-full aspect-[1/1.4] bg-surface-variant p-4">
                <div
                  className="w-full h-full bg-cover bg-center rounded bg-surface-container-lowest shadow-sm border border-outline-variant/20"
                  data-alt="A creative two-column resume design featuring a subtle, muted indigo sidebar on the left and a clean white main content area. The aesthetic is modern, approachable, and slightly gamified, with small icons and progress-bar style skill indicators. The lighting is soft and inviting, emphasizing the polished UI feel."
                  style={{ backgroundImage: "url('https" }}
                ></div>

                <div className="template-overlay absolute inset-0 bg-on-surface/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                  <button className="w-3/4 py-2 bg-primary text-on-primary font-body-md font-medium rounded-lg shadow-md hover:bg-primary-fixed-dim transition-colors transform hover:scale-105">
                    Use This Template
                  </button>
                  <button className="w-3/4 py-2 bg-surface-container-lowest text-on-surface font-body-md font-medium rounded-lg shadow-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    Preview Full
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-outline-variant/20 bg-surface-container-lowest z-10">
                <h3 className="font-headline-md text-[18px] font-semibold text-on-surface mb-1">
                  The Creative
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  Subtle sidebar column for skills &amp; contact.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    2 Col
                  </span>
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[10px] rounded uppercase tracking-wider">
                    Design
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pb-8 text-center">
            <p className="text-on-surface-variant font-body-md">
              Don't see what you need?{" "}
              <a className="text-primary font-semibold hover:underline" href="#">
                Request a new template
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
