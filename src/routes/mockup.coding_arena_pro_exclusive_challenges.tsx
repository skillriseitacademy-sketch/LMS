import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/coding_arena_pro_exclusive_challenges")({
  component: CodingArenaProExclusiveChallengesPage,
});

function CodingArenaProExclusiveChallengesPage() {
  return (
    <>
      <nav className="hidden lg:flex flex-col h-full py-8 px-4 space-y-md bg-surface-container-lowest dark:bg-on-surface shadow-md w-sidebar-width sticky top-0 left-0 z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md">
            P
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-black text-primary dark:text-primary-fixed-dim">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Career OS</p>
          </div>
        </div>
        <div className="flex-1 space-y-sm">
          <a
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-all hover:translate-x-1 duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">school</span>
            <span className="font-label-sm text-label-sm">Curriculum</span>
          </a>
          <a
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-all hover:translate-x-1 duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-label-sm text-label-sm">Mock Tests</span>
          </a>
          <a
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-all hover:translate-x-1 duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-label-sm text-label-sm">Jobs</span>
          </a>
          <a
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-primary dark:text-primary-fixed-dim font-bold border-r-4 border-primary bg-surface-container-low"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <span className="font-label-sm text-label-sm">Premium Arena</span>
          </a>
        </div>
        <div className="mt-auto space-y-sm">
          <button className="w-full py-2 px-4 bg-secondary-container text-on-secondary-container rounded-lg font-label-sm text-label-sm font-bold shadow-sm hover:scale-95 transition-transform">
            Upgrade to Pro
          </button>
          <a
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-all hover:translate-x-1 duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </a>
          <a
            className="flex items-center gap-2 px-2 py-2 rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-variant transition-all hover:translate-x-1 duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">contact_support</span>
            <span className="font-label-sm text-label-sm">Support</span>
          </a>
        </div>
      </nav>

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="flex justify-between items-center w-full px-6 py-2 max-w-container-max mx-auto bg-surface dark:bg-on-surface shadow-sm sticky top-0 z-20">
          <div className="lg:hidden">
            <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
              PlacePro Pro
            </h1>
          </div>
          <div className="hidden lg:block"></div>
          <div className="flex items-center gap-2">
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-surface-container-low active:scale-95 transition-transform">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-surface-container-low active:scale-95 transition-transform">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-container-max mx-auto w-full p-4 lg:p-xl flex flex-col gap-8">
          <section className="relative rounded-2xl bg-primary text-on-primary p-8 overflow-hidden shadow-lg border border-primary-fixed-dim">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 80% 20%, #fea619 0%, transparent 40%)",
              }}
            ></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    PRO ARENA
                  </span>
                </div>
                <h2 className="font-display-lg text-display-lg mb-2">Elite Challenges</h2>
                <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl">
                  High-stakes algorithmic and system design scenarios curated by top-tier
                  recruiters. Compete for visibility and elite badges.
                </p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center min-w-[200px] border border-on-primary/20 bg-on-primary/10">
                <p className="font-label-sm text-label-sm text-primary-fixed-dim mb-1 uppercase">
                  Next High-Stakes Tournament
                </p>
                <div className="font-headline-lg text-headline-lg font-bold text-secondary-fixed">
                  48:12:05
                </div>
                <p className="font-label-sm text-label-sm text-primary-fixed mt-1">H, M, S</p>
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Active Pro Challenges
                </h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-variant transition-colors border border-outline-variant">
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border-l-4 border-secondary-container hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden pro-glow border-y border-r border-outline-variant/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm">
                        System Design
                      </span>
                      <span className="bg-secondary-container/20 text-on-secondary-container px-2 py-1 rounded font-label-sm text-label-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">bolt</span> 2x XP
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-outline">bookmark_border</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Scalable Microservices Architecture
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                    Design a highly available distributed system capable of handling 10k TPS during
                    peak events.
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-variant">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Recruiter-Tracked
                      </div>
                      <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        1.2k Active
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm">
                        Algorithms
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-outline">bookmark_border</span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Algorithmic Optimization: O(1) Search
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                    Optimize a legacy search function handling millions of records to achieve
                    constant time complexity.
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-surface-variant">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-error font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          local_fire_department
                        </span>
                        Hard
                      </div>
                      <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">group</span>
                        850 Active
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[320px] flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-surface-variant">
                  <span
                    className="material-symbols-outlined text-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    emoji_events
                  </span>
                  <h4 className="font-headline-md text-headline-md text-on-surface">
                    Pro Leaderboard
                  </h4>
                </div>
                <div className="space-y-sm">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary-container/10 border border-secondary-container/30">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-md text-headline-md font-bold text-secondary-container w-6 text-center">
                        1
                      </span>
                      <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          data-alt="A professional headshot of a young tech student smiling, bright lighting, corporate modern aesthetic, solid clean background, confident mood."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmUadWMWVz_vv4IKStdKzvuqA3AHAIYfrtNJOzrJB9rQC2wdvnsYYddWnKLjUjibsKbV0mRhU_FCxkn8fw-FxYNEGhrY1GAiqemMWxqKtHJ-AkZrV1WUDa_FoQCnPwhLZdz_bJgPZQI1VyaMXZvYfEgFWSklSfyFw3eN79Oub8GcpeZ3c1opY9SZrPb9ZJk6nNbDtyFK59650pDUNAuW6z_HRsh-bH7Mi2ELJn9qxw1XM6J7lb_-eUmw"
                        />
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface">
                        Alex C.
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary">12.4k XP</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-md text-headline-md font-bold text-outline w-6 text-center">
                        2
                      </span>
                      <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          data-alt="A professional headshot of a young female engineering student, focused expression, bright studio lighting, corporate modern SaaS aesthetic, light grey background."
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxlmSg4MSzBz7pmclDrgtvm4R_YzDilfwK-_fPXpybb5sgTpgy2cuB1KLUXvK4ZbHuXkhsWaYT7DmnS170px333YHWVnGskAAWbtqK2Q9EEX9QhgDr7W2q-mVUWGzXHhvqHdObltD6gooofvcSpPEz0XgkWHvuMJOzJE_nq2xtrjJLP1dfKTJ9SYWti7PgQYY0jHB5UvkVMzBdFK2sXPWdiOAFwiMwJQfzyYeVJUlitm079DKh-bV46w"
                        />
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface">
                        Sarah K.
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary">11.8k XP</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-md text-headline-md font-bold text-outline-variant w-6 text-center">
                        3
                      </span>
                      <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-primary text-on-primary font-label-sm">
                          JD
                        </div>
                      </div>
                      <span className="font-body-md text-body-md font-medium text-on-surface">
                        John D.
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary">10.2k XP</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-primary font-label-sm text-label-sm hover:underline">
                  View Full Rankings
                </button>
              </div>

              <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-primary-container opacity-20">
                  <span
                    className="material-symbols-outlined text-[100px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    chat_bubble
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline-md text-headline-md mb-2">
                    Unlock Recruiter Credits
                  </h4>
                  <p className="font-body-md text-body-md text-outline-variant mb-6 text-sm">
                    Complete Pro Arena challenges to earn direct message credits with recruiters
                    from top tech firms.
                  </p>
                  <button className="w-full py-2 px-4 bg-primary-container text-on-primary-container rounded-lg font-label-sm text-label-sm font-bold shadow-sm hover:scale-95 transition-transform">
                    View Credit Balance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface dark:bg-on-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-t-xl">
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high scale-up transition-transform duration-200 p-2 rounded-xl"
          href="#"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high scale-up transition-transform duration-200 p-2 rounded-xl"
          href="#"
        >
          <span className="material-symbols-outlined">quiz</span>
          <span className="font-label-sm text-label-sm">Mocks</span>
        </a>
        <a
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1 scale-up transition-transform duration-200"
          href="#"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <span className="font-label-sm text-label-sm">Arena</span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high scale-up transition-transform duration-200 p-2 rounded-xl"
          href="#"
        >
          <span className="material-symbols-outlined">stars</span>
          <span className="font-label-sm text-label-sm">Pro</span>
        </a>
      </nav>
    </>
  );
}
