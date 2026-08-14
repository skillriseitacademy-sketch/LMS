import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/achievements_rewards_hub")({
  component: AchievementsRewardsHubPage,
});

function AchievementsRewardsHubPage() {
  return (
    <>
      <aside className="w-sidebar-width h-full fixed left-0 top-0 bg-surface-container-lowest shadow-sm flex flex-col py-6 px-4 z-50 hidden md:flex border-r border-outline-variant/30">
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="material-symbols-outlined icon-fill-1 text-primary text-3xl">
            rocket_launch
          </span>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Career OS
            </p>
          </div>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary font-body-md font-medium rounded-lg py-3 px-4 mb-8 transition-colors shadow-sm flex items-center justify-center gap-2 group w-full">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
            bolt
          </span>
          Start Daily Challenge
        </button>
        <nav className="flex-1 overflow-y-auto space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">forum</span>
            Feed
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">record_voice_over</span>
            Interview Hub
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            Quizzes
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container/10 text-primary font-bold border-r-4 border-primary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined icon-fill-1">sports_esports</span>
            Arena
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            Jobs
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            Roadmap
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            Resume
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            Leaderboard
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            Profile
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            Rooms
          </a>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
          <a
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            Help
          </a>
        </div>
      </aside>

      <main className="flex-1 w-full md:ml-sidebar-width min-h-screen flex flex-col bg-background">
        <header className="bg-surface docked full-width top-0 sticky z-40 flex justify-between items-center w-full h-16 px-8 max-w-container-max border-b border-outline-variant/30">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-64 md:hidden">
              <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
                PlacePro
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-surface-container-low hover:bg-surface-container-high text-primary font-medium px-4 py-1.5 rounded-full transition-colors flex items-center gap-2 border border-primary/20">
              <span className="material-symbols-outlined text-sm">star</span>
              Upgrade Pro
            </button>
            <div className="flex items-center gap-1 bg-secondary-container/20 text-secondary-fixed-dim px-3 py-1.5 rounded-full font-bold">
              <span className="material-symbols-outlined icon-fill-1 text-sm text-secondary-container">
                stars
              </span>
              1,250 XP
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-secondary-container">
                <span className="material-symbols-outlined icon-fill-1">local_fire_department</span>
              </button>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 bg-surface-container-high">
              <img
                alt="Student avatar"
                className="w-full h-full object-cover"
                data-alt="A clean, minimalist 3D rendering of a generic student avatar profile picture, smooth plastic texture, soft lighting, light mode aesthetic, isolated on a light gray background."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7DPBnwwuPB7Wm_Sbv45hy-7qBTbhHmfbZVncVjxhCQ4O_JfBJwSutXTd9YtaC0RS2sXGMAnOcgt7vGDKLcmW1RKnTvZcAEnc6M6yPdGEHKMQC2lsuP2kxVwoo7PavsTGGO-TycvTNCS-EsUb99cR0s5qr3EDUVL5ntS-q450tjr-SFBMT24u-L_SqDX29BYP1fylQte4avhEp4R6DYSYa1YzBkZjkmlETI_prTKZYg-NAzgqm84vJJQ"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-xl space-y-xl overflow-y-auto">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/20 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    className="text-surface-container-highest"
                    cx="64"
                    cy="64"
                    fill="transparent"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-primary transition-all duration-1000 ease-out"
                    cx="64"
                    cy="64"
                    fill="transparent"
                    r="56"
                    stroke="currentColor"
                    stroke-dashoffset="100"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-lg text-headline-lg text-on-surface">Lvl 12</span>
                </div>
              </div>
              <div className="flex-1 w-full text-center sm:text-left z-10">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Arena Challenger
                </h2>
                <p className="text-on-surface-variant font-body-md mb-4">
                  You're in the top 15% of your cohort. Keep pushing!
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-on-surface-variant">XP Progress</span>
                    <span className="font-bold text-primary">1,250 / 2,000 XP</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full progress-glow"
                      style={{ width: "62.5%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/20 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-secondary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center mb-4 text-secondary-container relative">
                <span className="material-symbols-outlined text-4xl icon-fill-1">
                  local_fire_department
                </span>

                <div className="absolute inset-0 rounded-full border border-secondary-container/50 animate-ping opacity-75"></div>
              </div>
              <h3 className="font-display-lg text-display-lg text-on-surface mb-1">15</h3>
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Day Streak
              </p>
              <div className="mt-4 flex gap-1 justify-center w-full">
                <div className="w-6 h-2 bg-secondary-container rounded-sm"></div>
                <div className="w-6 h-2 bg-secondary-container rounded-sm"></div>
                <div className="w-6 h-2 bg-secondary-container rounded-sm"></div>
                <div className="w-6 h-2 bg-secondary-container rounded-sm"></div>
                <div className="w-6 h-2 bg-surface-container-highest rounded-sm"></div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">task_alt</span>
                  Daily Quests
                </h3>
                <span className="text-sm font-medium text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                  2/3 Done
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors opacity-60">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-on-primary text-sm icon-fill-1">
                      check
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-on-surface line-through">
                      Solve 2 Array Problems
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-1">Data Structures</p>
                  </div>
                  <div className="text-secondary-fixed-dim font-bold text-sm">+50 XP</div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors opacity-60">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-on-primary text-sm icon-fill-1">
                      check
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-on-surface line-through">
                      Complete 1 Mock Interview
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-1">Interview Hub</p>
                  </div>
                  <div className="text-secondary-fixed-dim font-bold text-sm">+100 XP</div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-secondary-container bg-surface-container hover:bg-surface-container-high transition-colors">
                  <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center flex-shrink-0 mt-0.5"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-on-surface">Review System Design Module</h4>
                    <p className="text-sm text-on-surface-variant mt-1">Roadmap</p>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-3 overflow-hidden">
                      <div
                        className="bg-secondary-container h-1.5 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-secondary-container font-bold text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">local_fire_department</span>
                    +150 XP
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-container to-primary rounded-xl p-6 text-on-primary shadow-md relative overflow-hidden flex flex-col justify-between h-48">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
                <div className="relative z-10">
                  <h3 className="font-headline-md text-headline-md font-bold mb-1">
                    Invite &amp; Earn Pro
                  </h3>
                  <p className="text-primary-fixed-dim text-sm max-w-[80%]">
                    Get 1 month of PlacePro Premium for every friend who joins.
                  </p>
                </div>
                <div className="relative z-10 flex gap-2">
                  <div className="bg-surface-container-lowest/20 px-4 py-2 rounded-lg flex-1 font-mono text-sm border border-surface-container-lowest/30 flex items-center justify-between">
                    <span className="truncate">placepro.app/ref/alex24</span>
                    <button className="hover:text-primary-fixed transition-colors">
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                  <button className="bg-surface-container-lowest text-primary font-medium px-4 py-2 rounded-lg hover:bg-surface-container-lowest/90 transition-colors shadow-sm">
                    Share
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-6 card-shadow border border-outline-variant/20">
                <h4 className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-4">
                  Next Milestone Reward
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-3xl icon-fill-1">
                      card_membership
                    </span>
                  </div>
                  <div>
                    <h5 className="font-medium text-on-surface">Pro Interview Bundle</h5>
                    <p className="text-sm text-on-surface-variant mt-1">Unlocks at Level 15</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">
                  military_tech
                </span>
                Achievements
              </h3>
              <button className="text-primary font-medium text-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-surface-container-lowest rounded-xl p-6 text-center border border-primary/20 achievement-card transition-all cursor-pointer relative">
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-16 h-16 mx-auto bg-primary-container/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-3xl icon-fill-1">code</span>
                </div>
                <h4 className="font-medium text-on-surface text-sm mb-1">Code Ninja</h4>
                <p className="text-xs text-on-surface-variant">Solve 100 Algorithmic challenges.</p>
                <div className="mt-3 text-xs font-bold text-primary bg-primary-container/10 inline-block px-2 py-1 rounded">
                  Unlocked
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-6 text-center border border-secondary-container/30 achievement-card transition-all cursor-pointer">
                <div className="w-16 h-16 mx-auto bg-secondary-container/10 rounded-full flex items-center justify-center mb-4 text-secondary-container">
                  <span className="material-symbols-outlined text-3xl icon-fill-1">
                    record_voice_over
                  </span>
                </div>
                <h4 className="font-medium text-on-surface text-sm mb-1">Interview Ace</h4>
                <p className="text-xs text-on-surface-variant">Pass 5 Mock Interviews perfectly.</p>
                <div className="mt-3 text-xs font-bold text-secondary-container bg-secondary-container/10 inline-block px-2 py-1 rounded">
                  Unlocked
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-6 text-center border border-outline-variant/20 achievement-card transition-all cursor-pointer">
                <div className="w-16 h-16 mx-auto bg-surface-container-high rounded-full flex items-center justify-center mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl">timer</span>
                </div>
                <h4 className="font-medium text-on-surface text-sm mb-1">Fastest Solver</h4>
                <p className="text-xs text-on-surface-variant">
                  Solve a Hard problem under 5 mins.
                </p>
                <div className="mt-3 text-xs font-bold text-on-surface-variant bg-surface-container-high inline-block px-2 py-1 rounded">
                  Unlocked
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-6 text-center border border-outline-variant/20 opacity-70 grayscale hover:grayscale-0 transition-all cursor-help relative">
                <div className="absolute inset-0 bg-background/40 rounded-xl backdrop-blur-[1px] flex items-center justify-center z-10 hover:opacity-0 transition-opacity">
                  <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                </div>
                <div className="w-16 h-16 mx-auto bg-surface-container-high rounded-full flex items-center justify-center mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl">emoji_events</span>
                </div>
                <h4 className="font-medium text-on-surface text-sm mb-1">Top 1%</h4>
                <p className="text-xs text-on-surface-variant">
                  Reach the global top 1% leaderboard.
                </p>
                <div className="w-full bg-surface-container-highest rounded-full h-1 mt-4">
                  <div className="bg-primary h-1 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
