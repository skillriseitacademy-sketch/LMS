import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/leaderboard_global_rankings")({
  component: LeaderboardGlobalRankingsPage,
});

function LeaderboardGlobalRankingsPage() {
  return (
    <>
      <aside className="hidden md:flex flex-col h-full py-6 px-4 w-sidebar-width fixed left-0 top-0 bg-surface-container-lowest shadow-sm z-50 border-r border-outline-variant/30">
        <div className="mb-8 px-2">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">PlacePro</h1>
          <p className="font-label-sm text-label-sm text-outline tracking-wider uppercase mt-1">
            Career OS
          </p>
        </div>
        <nav className="flex-1 space-y-sm overflow-y-auto pr-2 custom-scrollbar">
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              dashboard
            </span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              forum
            </span>
            <span className="font-body-md text-body-md">Feed</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              record_voice_over
            </span>
            <span className="font-body-md text-body-md">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              quiz
            </span>
            <span className="font-body-md text-body-md">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              sports_esports
            </span>
            <span className="font-body-md text-body-md">Arena</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              work
            </span>
            <span className="font-body-md text-body-md">Jobs</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              map
            </span>
            <span className="font-body-md text-body-md">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              description
            </span>
            <span className="font-body-md text-body-md">Resume</span>
          </a>

          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg bg-surface-container-low text-primary font-bold border-l-4 border-primary shadow-sm transform scale-[0.98] transition-transform duration-200"
            href="#"
          >
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              leaderboard
            </span>
            <span className="font-body-md text-body-md">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              person
            </span>
            <span className="font-body-md text-body-md">Profile</span>
          </a>
          <a
            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              groups
            </span>
            <span className="font-body-md text-body-md">Rooms</span>
          </a>
        </nav>
        <div className="mt-auto pt-6 space-y-md border-t border-outline-variant/30 px-2">
          <button className="w-full bg-primary text-on-primary py-2 rounded-lg font-body-md font-semibold shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors transform hover:scale-[1.02] active:scale-[0.98]">
            Start Daily Challenge
          </button>
          <div className="flex flex-col space-y-sm">
            <a
              className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                settings
              </span>
              <span className="font-body-md text-body-md">Settings</span>
            </a>
            <a
              className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                help
              </span>
              <span className="font-body-md text-body-md">Help</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-sidebar-width flex flex-col min-h-screen relative pb-24 md:pb-0">
        <header className="hidden md:flex justify-between items-center w-full h-16 px-8 bg-surface border-b border-outline-variant/30 sticky top-0 z-40">
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-full font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-outline/70"
                placeholder="Search students, skills..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <button className="text-primary font-body-md font-semibold hover:text-primary-container transition-colors">
              Upgrade Pro
            </button>
            <div className="flex items-center gap-2 bg-secondary-container/20 text-secondary border border-secondary-container/50 px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm">stars</span>
              <span className="font-label-sm font-bold tracking-wider">1,250 XP</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 rounded-full text-secondary hover:bg-secondary-container/10 transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </button>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50 cursor-pointer hover:border-primary transition-colors">
              <img
                alt="Student avatar"
                className="w-full h-full object-cover"
                data-alt="A clean, professional headshot of a young male student in a bright, modern light-mode setting. He is wearing a simple indigo t-shirt against a pure white background. The lighting is soft and flattering, creating a premium SaaS profile picture aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgMr7Bvv3p2PNGFC7AJWqw2SeNYezh_evwybnImROPfBFH8rIWU-fQl2YNmBzjqmgSvNTkk4z3tdNbjcqMFdkAjWGX-RYEryFH1of3f7kYLKfck2rQLs-eqEIZEfjtFcNuvfitqhVyrowtWhqfGVZHjV0KOJIq_WxW6fvhcC72TU1UPOAy0fO1iNPNTbE_G62HLX-3ufqH5eS4W0apce8Lpbt8qTLJQmyO16Ea-WpOruh_Pr9GlUN7Mw"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-xl flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">
                Arena Leaderboard
              </h2>
              <p className="text-on-surface-variant mt-2 font-body-md">
                Compete, earn XP, and secure top placement rankings.
              </p>
            </div>
            <div className="flex bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30 shadow-sm self-start">
              <button className="px-4 py-1.5 rounded-md text-sm font-semibold bg-primary text-on-primary shadow-sm transition-all">
                Weekly
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-all">
                Monthly
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-all">
                All-Time
              </button>
            </div>
          </div>

          <div className="pt-8 pb-4">
            <div className="flex justify-center items-end gap-2 md:gap-lg h-64">
              <div className="flex flex-col items-center relative z-10 w-24 md:w-32 group">
                <div className="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <img
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-surface object-cover avatar-glow-2 z-10 relative"
                    data-alt="A bright, high-key professional profile photo of a female student with short dark hair. The image uses a clean, minimal light-mode aesthetic. She looks confident, set against a subtle slate-gray backdrop that matches the silver tier of a gamified leaderboard."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXpNmwUJ2ZOW4QcGwb-XDpeFbE6hQTIWLjKzObKCbi2CcNMEYUNG21Vo4uOJylo8JBi11xFol8EYW4vlrvvFBFWxrKecfx7L-RM_HDuUjKjKoeqBEYjx41Y_AnR_kU0SQhvJN_8dYzG0l0zW2kJyQhrrmVZh1Aro_imN16qmRCWbvgJxol0JpDVkiPqxD5OzbAYuJt6y9nHbM8lezT0udKr5nxayH5Eh69Xw5VqdFZmmprK0R8TDBifw"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface text-on-surface font-bold text-xs px-2 py-0.5 rounded-full border border-outline-variant shadow-sm z-20">
                    #2
                  </div>
                </div>
                <div className="w-full h-24 podium-2 rounded-t-xl flex flex-col items-center justify-start pt-4 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM0NzU1NjkiLz48L3N2Zz4=')]"></div>
                  <span className="font-headline-md text-sm md:text-base text-slate-800 relative z-10 text-center leading-tight truncate w-full px-2">
                    Sarah L.
                  </span>
                  <span className="font-label-sm text-slate-600 relative z-10 mt-1">18.4k XP</span>
                </div>
              </div>

              <div className="flex flex-col items-center relative z-20 w-28 md:w-40 group -mb-4">
                <div className="absolute -top-12 text-secondary animate-bounce">
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                </div>
                <div className="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <img
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-surface object-cover avatar-glow-1 z-10 relative"
                    data-alt="A premium, studio-quality headshot of a male student looking determined and victorious. He is set against a very bright, almost pure white background, fitting a sleek SaaS interface. The image is crisp, with subtle warm golden lighting accents highlighting his top-tier leaderboard position."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv_tiZII2mdPA-kt-io2dHUANg6s-w6J8F0kKNoqVw0djMckVr5q2tn_gWZrnnDjuzJmX5y7FmPtI-i5bTuncygZpWFWpq6d7exETUFwB-KOceOs_Cx5KgaG85Pcp4Y8IbCmGyDPWXrMdgvlvpvDyKCmngHTv1u8WXTZ9Qz27pTNX0pn1NlVjEn2EApSxgr18aHlN7UJvMM_ieluSxGX8LpE2yS90i3sohmtxNJK0-1s48nuJxQZRONQ"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-white font-black text-sm md:text-base px-4 py-1 rounded-full border-2 border-surface shadow-md z-20">
                    #1
                  </div>
                </div>
                <div className="w-full h-36 podium-1 rounded-t-xl flex flex-col items-center justify-start pt-6 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNkOTc3MDYiLz48L3N2Zz4=')]"></div>
                  <span className="font-headline-md text-base md:text-lg text-amber-900 relative z-10 text-center leading-tight truncate w-full px-2">
                    Alex Chen
                  </span>
                  <span className="font-label-sm font-bold text-amber-700 relative z-10 mt-1">
                    24.2k XP
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center relative z-10 w-24 md:w-32 group">
                <div className="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <img
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-surface object-cover avatar-glow-3 z-10 relative"
                    data-alt="A clean, modern headshot of a male student wearing glasses in a light-mode environment. The background is a soft, airy white. He has a friendly expression, and the overall image feels polished and appropriate for a professional academic leaderboard context."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEU5T99kDtmitx1Twv6cJqvN6oqF4J5UR_MjqaVzzcJK8CSvBpb_cW8w0PYhDQsjZYcz0nd04zITMw-5FhGO-RDT1oY4G1VfglFv4SdwQLVKcj3Z8gfqg090k5nfrXpEHjaZPtpkCh_fi4u9C9L1gyCftJ5K5DCk9mRkvS2Z3G3CgLVaTBt80WT1iawqq2GgjsrtCamg5yneviuHrFkELRTIdKHREczYrDIXPmG4ve5HHXPh-HqCUjog"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface text-on-surface font-bold text-xs px-2 py-0.5 rounded-full border border-outline-variant shadow-sm z-20">
                    #3
                  </div>
                </div>
                <div className="w-full h-20 podium-3 rounded-t-xl flex flex-col items-center justify-start pt-3 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNjMjQxMGMiLz48L3N2Zz4=')]"></div>
                  <span className="font-headline-md text-sm md:text-base text-orange-900 relative z-10 text-center leading-tight truncate w-full px-2">
                    David K.
                  </span>
                  <span className="font-label-sm text-orange-700 relative z-10 mt-1">16.8k XP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden flex flex-col">
            <div className="border-b border-outline-variant/30 p-4 flex flex-wrap gap-4 items-center justify-between bg-surface/50">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-container/10 text-primary border border-primary/20">
                  Global
                </button>
                <button className="px-3 py-1.5 rounded-full text-sm font-medium text-on-surface-variant hover:bg-surface-container-low border border-transparent hover:border-outline-variant/30 transition-all">
                  College
                </button>
                <button className="px-3 py-1.5 rounded-full text-sm font-medium text-on-surface-variant hover:bg-surface-container-low border border-transparent hover:border-outline-variant/30 transition-all">
                  Friends
                </button>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                <span className="font-medium">CS Majors</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest text-on-surface-variant font-label-sm text-xs uppercase tracking-wider border-b border-outline-variant/30">
                    <th className="p-4 font-medium w-16 text-center">Rank</th>
                    <th className="p-4 font-medium">Student</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Recent Activity</th>
                    <th className="p-4 font-medium text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-body-md divide-y divide-outline-variant/20">
                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center font-bold text-on-surface-variant">4</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant text-primary flex items-center justify-center font-bold text-xs">
                          EJ
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">Emma Johnson</div>
                          <div className="text-xs text-on-surface-variant/70">Stanford Univ.</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="flex gap-1">
                        <span className="w-2 h-6 rounded-sm bg-primary/40"></span>
                        <span className="w-2 h-6 rounded-sm bg-primary/80"></span>
                        <span className="w-2 h-6 rounded-sm bg-primary"></span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-sm font-bold text-secondary">
                      15,900
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center font-bold text-on-surface-variant">5</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant text-primary flex items-center justify-center font-bold text-xs">
                          MP
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">Michael Park</div>
                          <div className="text-xs text-on-surface-variant/70">MIT</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="flex gap-1">
                        <span className="w-2 h-6 rounded-sm bg-primary/20"></span>
                        <span className="w-2 h-6 rounded-sm bg-primary/60"></span>
                        <span className="w-2 h-6 rounded-sm bg-primary"></span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-sm font-bold text-secondary">
                      14,250
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center font-bold text-on-surface-variant">6</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant text-primary flex items-center justify-center font-bold text-xs">
                          SR
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">Sofia Rodriguez</div>
                          <div className="text-xs text-on-surface-variant/70">Berkeley</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="flex gap-1">
                        <span className="w-2 h-6 rounded-sm bg-primary"></span>
                        <span className="w-2 h-6 rounded-sm bg-primary/80"></span>
                        <span className="w-2 h-6 rounded-sm bg-primary/40"></span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-sm font-bold text-secondary">
                      13,800
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="hidden md:block sticky bottom-0 w-full bg-primary text-on-primary border-t border-primary-container shadow-[0_-8px_30px_rgb(53,37,205,0.2)] z-30">
          <div className="max-w-container-max mx-auto px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center font-bold font-headline-md">
                #42
              </div>
              <div>
                <div className="font-semibold text-sm">Your Current Rank</div>
                <div className="text-xs text-on-primary/80">Top 5% of Global CS Students</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-label-sm font-bold text-secondary-fixed">8,450 XP</div>
                <div className="text-xs text-on-primary/80">450 XP to rank up</div>
              </div>
              <div className="w-32 h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-secondary-fixed rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant/30 flex justify-around items-center h-16 z-50 px-2 pb-safe shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium mt-1">Home</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined text-[24px]">work</span>
          <span className="text-[10px] font-medium mt-1">Jobs</span>
        </a>

        <a
          className="flex flex-col items-center justify-center w-16 h-full text-primary relative"
          href="#"
        >
          <div className="absolute -top-3 bg-surface p-1 rounded-full border border-outline-variant/20 shadow-sm">
            <div className="bg-primary/10 rounded-full p-2">
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                leaderboard
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold mt-6">Rank</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined text-[24px]">sports_esports</span>
          <span className="text-[10px] font-medium mt-1">Arena</span>
        </a>
        <a
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant"
          href="#"
        >
          <span className="material-symbols-outlined text-[24px]">person</span>
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </a>
      </nav>

      <div className="md:hidden fixed bottom-16 left-0 w-full bg-primary text-on-primary py-2 px-4 z-40 shadow-[0_-4px_10px_rgb(53,37,205,0.2)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold font-headline-md text-lg">#42</div>
          <div className="text-xs leading-tight">
            <div className="font-semibold">Your Rank</div>
            <div className="text-on-primary/80">8,450 XP</div>
          </div>
        </div>
        <div className="w-20 h-1.5 bg-black/20 rounded-full overflow-hidden">
          <div className="w-[85%] h-full bg-secondary-fixed rounded-full"></div>
        </div>
      </div>
    </>
  );
}
