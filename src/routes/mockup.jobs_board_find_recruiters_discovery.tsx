import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/jobs_board_find_recruiters_discovery")({
  component: JobsBoardFindRecruitersDiscoveryPage,
});

function JobsBoardFindRecruitersDiscoveryPage() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-full p-md gap-base overflow-y-auto bg-surface-container-low shadow-md w-sidebar-width fixed left-0 top-0 z-40">
        <div className="flex items-center gap-md px-md py-lg mb-lg border-b border-outline-variant/30">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md shadow-sm">
            P
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-primary">
              PlacePro Career OS
            </h1>
            <p className="font-label-sm text-label-sm text-secondary font-medium mt-1">
              Rank: #42 | 2500 XP
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-sm flex-1">
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              dashboard
            </span>
            <span className="font-body-md text-body-md font-medium">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              rss_feed
            </span>
            <span className="font-body-md text-body-md font-medium">Feed</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              video_chat
            </span>
            <span className="font-body-md text-body-md font-medium">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              quiz
            </span>
            <span className="font-body-md text-body-md font-medium">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              live_tv
            </span>
            <span className="font-body-md text-body-md font-medium">Live Classes</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              sports_esports
            </span>
            <span className="font-body-md text-body-md font-medium">Arena</span>
          </a>

          <a
            className="flex items-center gap-md px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg translate-x-1 transition-transform shadow-sm"
            href="#"
          >
            <span className="material-symbols-outlined icon-fill">work</span>
            <span className="font-body-md text-body-md">Jobs</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              map
            </span>
            <span className="font-body-md text-body-md font-medium">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              description
            </span>
            <span className="font-body-md text-body-md font-medium">Resume</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              leaderboard
            </span>
            <span className="font-body-md text-body-md font-medium">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              person
            </span>
            <span className="font-body-md text-body-md font-medium">Profile</span>
          </a>
          <a
            className="flex items-center gap-md px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              groups
            </span>
            <span className="font-body-md text-body-md font-medium">Rooms</span>
          </a>
        </div>

        <div className="mt-auto pt-lg border-t border-outline-variant/30">
          <button className="w-full bg-secondary text-on-secondary font-body-md text-body-md font-semibold py-3 rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            Upgrade to Pro
          </button>
        </div>
      </nav>

      <main className="flex-1 md:ml-[280px] h-full overflow-y-auto w-full relative">
        <div className="w-full max-w-container-max mx-auto px-lg md:px-xl py-xl md:py-[48px]">
          <div className="flex flex-col gap-2 mb-xl">
            <h2 className="font-display-lg text-display-lg text-on-surface">Find Recruiters</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Connect directly with top tech recruiters. Skip the line and make an impression that
              lands you the interview.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-lg card-shadow border border-outline-variant/20 mb-xl flex flex-col gap-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

            <div className="relative w-full z-10">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline">search</span>
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-lg text-body-lg text-on-surface outline-none shadow-sm placeholder:text-outline-variant"
                placeholder="Search by name, company, or keywords..."
                type="text"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-body-md text-body-md font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 z-10">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <span className="material-symbols-outlined text-[20px]">domain</span>
                  Industry
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                  Company Size
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border-2 border-primary rounded-lg font-body-md text-body-md text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
                  <span className="material-symbols-outlined text-[20px] icon-fill">code</span>
                  Software Eng
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <span className="material-symbols-outlined text-[20px]">military_tech</span>
                  Seniority
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>
              <button className="ml-auto text-primary font-body-md text-body-md font-medium hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                All Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg pb-xl">
            <div className="bg-surface-container-lowest rounded-[16px] card-shadow border border-outline-variant/10 p-lg flex flex-col gap-md relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-surface-container"
                      data-alt="A professional headshot of a young woman with a warm smile, wearing a dark blazer over a light blouse, against a clean, bright, out-of-focus modern office background. High-key lighting, corporate modern aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHMitO-XxmsxHDS0u4_FNMmrcAu0niT1cL95shsaz5bUuzc5VmUNfMoQg1jYm3YzT1sGqEebH_sm5ozAJZTuYa64DJ99m49-16B_js0LzdCQyoisx43JWOut9Omr75OmqtwtST7wjXC6o2sAf7JQoe6iJVX-B_FBjFjIHyWzKvhFMt7PlIHoIr7WDjFzWmPi5MZX9o3U-_RPrRzGiC7xXWVaTF3MROwd2d5L9_jiohhut6IH2NLhJoAA"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-surface-container-lowest"></div>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">
                      Sarah Jenkins
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-[14px]">
                      Senior Technical Recruiter
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center text-primary font-bold shadow-sm">
                  G
                </div>
              </div>
              <div className="mt-2">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-2 font-semibold">
                  Top Hires Destination
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Google
                  </span>
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Stripe
                  </span>
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Meta
                  </span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <button className="w-full bg-primary text-on-primary font-body-md text-body-md font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:scale-[1.02] transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Message with 1 Credit
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-[16px] card-shadow border border-outline-variant/10 p-lg flex flex-col gap-md relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-surface-container"
                      data-alt="A professional portrait of a man in his 30s with short hair, wearing a crisp white collared shirt, sitting in a bright co-working space. Soft natural light from a window, conveying approachability and modern tech culture."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCURi4kAJHK-4pJA-yQVhhQJC_5hEjzcwLd3QGFKKnfWQD1Q2vOdk4wHmyr4eRFKF5Jzl78WxiQ11aPk0i02fe-UvhCTnAJJGq8QoEMcXGxgls1fAyG9o49luXLhZAU-bnX3JKa7quXp6PfAcBZyXlZT216BhT96qMZpy_9Cl5coQhiVxAylSDutPvvsCKQ3oRutJC3HHchakWJBv101ECtgbRdX6pIruReVhbGc-vhpipIdrpRsCFDZA"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-surface-container-lowest"></div>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">
                      David Chen
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-[14px]">
                      Engineering Talent Partner
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center text-primary font-bold shadow-sm">
                  A
                </div>
              </div>
              <div className="mt-2">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-2 font-semibold">
                  Top Hires Destination
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Amazon
                  </span>
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Netflix
                  </span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <button className="w-full bg-primary text-on-primary font-body-md text-body-md font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:scale-[1.02] transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Message with 1 Credit
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-[16px] card-shadow border border-outline-variant/10 p-lg flex flex-col gap-md relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container rounded-l-[16px]"></div>
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-surface-container"
                      data-alt="A striking professional headshot of a person with stylish glasses and a smart casual outfit, positioned against a stark white backdrop with soft, diffused studio lighting. The aesthetic is clean, premium, and focused."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ58vKht3ld1gFHGAcA29lDPJj4xFIDQZdePvB02-zWQXJsO9gc47u2q3V044fFmVYjZ38fmKHVmSQlNlXyocuW5BUHtJRARQKKIB-31EOHuVJkeTr5dPhA7mTYvZw0KL8O-bK0n-Ez9Zpgp6Et1jObsJpOxeaTxTyHQ8dYSj7h7bUp_9tjHR1y2aKWZZRjZmD7QbFvsxWiEJmj5ySGwMf79_ACowNIoxvE9w8uyWwZ8OQzY6zqD2FMg"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-2 border-surface-container-lowest"
                      title="Away"
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">
                      Elena Rodriguez
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-[14px]">
                      Campus Recruitment Lead
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center text-primary font-bold shadow-sm">
                  M
                </div>
              </div>
              <div className="mt-2">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-2 font-semibold">
                  Top Hires Destination
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Microsoft
                  </span>
                  <span className="px-3 py-1 bg-surface-container rounded-full font-body-md text-body-md text-[13px] text-on-surface-variant border border-outline-variant/20">
                    Apple
                  </span>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <button className="w-full bg-primary text-on-primary font-body-md text-body-md font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:scale-[1.02] transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Message with 1 Credit
                </button>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-[16px] border-2 border-dashed border-outline-variant/50 p-lg flex flex-col items-center justify-center gap-md min-h-[250px] cursor-pointer hover:bg-surface-container transition-colors group">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">manage_search</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">
                Discover More
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-[200px]">
                Unlock 500+ verified tech recruiters matching your profile.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
