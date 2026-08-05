import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/social_feed")({
  component: SocialFeedPage,
});

function SocialFeedPage() {
  return (
    <>
      <aside className="bg-surface-container-low shadow-md fixed left-0 top-0 h-screen w-sidebar-width hidden md:flex flex-col p-md gap-base overflow-y-auto z-40">
        <div className="mb-lg px-2">
          <h1 className="text-headline-md font-headline-md font-bold text-primary">
            PlacePro Career OS
          </h1>
          <div className="flex items-center gap-sm mt-xs">
            <img
              className="w-8 h-8 rounded-full object-cover"
              data-alt="A small, professional avatar portrait of a diverse university student in a bright, modern setting. The style is clean, corporate modern with a light-mode aesthetic, suitable for a SaaS career platform profile picture."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTil6RM5qSW_1O-5_3TVlCXb7iGFThI89yWKm1Xn_JVDfj3BoofrqfZzRMZOfQ09GVtHdS6l3fsZjcgiBrfAG3PQ7jQhiVrCcpC1BALiGrUNMid1cPZh1a6z_-FCj_Vz3afwDAvj2hZ-UJgc7tPawIGfLU28gwJa0hWCjdp9yc2Uy-GgR5K4d1m65o8-H28tslb33lNFK-Bc7kgV0dT_QajtsMRnUTt21NVqAx8dR-5IQEJ8tXT7U0rw"
            />
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Rank: #42 | 2500 XP
            </p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="dashboard">
              dashboard
            </span>
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 bg-primary-container text-on-primary-container font-bold rounded-lg translate-x-1 transition-transform font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="rss_feed">
              rss_feed
            </span>
            Feed
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="video_chat">
              video_chat
            </span>
            Interview Hub
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="quiz">
              quiz
            </span>
            Quizzes
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="live_tv">
              live_tv
            </span>
            Live Classes
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="sports_esports">
              sports_esports
            </span>
            Arena
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="work">
              work
            </span>
            Jobs
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="map">
              map
            </span>
            Roadmap
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="description">
              description
            </span>
            Resume
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="leaderboard">
              leaderboard
            </span>
            Leaderboard
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="person">
              person
            </span>
            Profile
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all font-body-md text-body-md"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="groups">
              groups
            </span>
            Rooms
          </a>
        </nav>
        <div className="mt-auto pt-lg border-t border-outline-variant">
          <button className="w-full bg-primary text-on-primary py-2 rounded-lg font-body-md font-semibold hover:bg-on-primary-fixed-variant transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col md:ml-[280px] w-full bg-[#F8FAFC]">
        <header className="bg-surface-container-lowest sticky top-0 z-30 px-lg py-md flex items-center justify-between border-b border-outline-variant shadow-sm">
          <div className="relative w-full max-w-md hidden sm:block">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
              data-icon="search"
            >
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-slate-200 rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md text-on-surface placeholder-on-surface-variant"
              placeholder="Search posts, people, or companies"
              type="text"
            />
          </div>
          <div className="flex items-center gap-md ml-auto">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined" data-icon="chat">
                chat
              </span>
            </button>
            <img
              className="w-10 h-10 rounded-full object-cover sm:hidden ml-sm border border-outline-variant"
              data-alt="A small, professional avatar portrait of a diverse university student in a bright, modern setting. The style is clean, corporate modern with a light-mode aesthetic, suitable for a SaaS career platform profile picture."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUfV0qJic9JLcpfLiqEA_Plg5yHhG6AdgqZ-xkBjkitdgHOhkovuOBnD87RJlhlUYDONxEeejEPy8kpaNwruMr3E_gV2iYcmoW_4Yx6zHVA-Kt0cR6Q7TyzMQK8IED5kRH5FPWOIY8HCEsS3ybtup6msTsgErNyUp_s91EOhkTo50ruIr0sfGa1QywrPSNhf2yHvxyHpsEvtr3P3PGybGaJ-AKt6tpRV7hkfApgWEq8uWtCAy-RNhQ3w"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-lg">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl">
            <div className="hidden lg:block lg:col-span-3 space-y-lg">
              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg">
                <div className="flex flex-col items-center text-center">
                  <img
                    className="w-20 h-20 rounded-full object-cover border-4 border-surface-container-lowest shadow-sm mb-md"
                    data-alt="A professional headshot of a young, confident university student, wearing smart casual attire. Bright, light-mode background with subtle, clean studio lighting. Corporate modern aesthetic."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAofqHnM_vkw6YthEU2tJHFbOui-CFXEcknXtM0jiCB_THRR4HAWe04lUzQFjGqhjqGT-sBobFHyckfo1P-7c4nfcscF4u5_cnd-A2-r869IUJTPhaPl-IWFQ4DrBZ4oetR1BelABaXxBUMzEHEwArjWiu2huqmAvKHU4xP9kwu7TlMqwtrGbjjicAFIA_aG_RIS_CdISiFwv7GG8bPRnAcBgkDZfBpalNUJ6Y0755utLYOYDswtz4LMQ"
                  />
                  <h2 className="font-headline-md text-headline-md text-on-surface">Alex Mercer</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                    Final Year CS @ University
                  </p>
                  <div className="mt-md inline-flex items-center gap-2 bg-secondary-container/20 text-secondary px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[18px]" data-icon="star">
                      star
                    </span>
                    <span className="font-label-sm text-label-sm font-bold">2,500 XP</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg">
                <h3 className="font-body-md text-body-lg font-semibold text-on-surface mb-md">
                  Trending Topics
                </h3>
                <ul className="space-y-sm">
                  <li>
                    <a
                      className="text-primary hover:underline font-body-md text-body-md block"
                      href="#"
                    >
                      #DSAPractice
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary hover:underline font-body-md text-body-md block"
                      href="#"
                    >
                      #Interviews2024
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary hover:underline font-body-md text-body-md block"
                      href="#"
                    >
                      #SystemDesign
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-primary hover:underline font-body-md text-body-md block"
                      href="#"
                    >
                      #SummerInternships
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-6 space-y-lg">
              <div className="flex gap-md overflow-x-auto pb-2 hide-scrollbar">
                <div className="flex flex-col items-center gap-xs flex-shrink-0 cursor-pointer">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-secondary-container to-primary">
                    <div className="w-full h-full bg-surface-container-lowest rounded-full p-[2px]">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        data-alt="Close up of a vibrant, modern 3D icon of a glowing gold star or badge, representing a new achievement in a gamified learning platform. Light clean background."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyxO0LJZQjw3OR6-oTnZVYBeJ6shjX2jwMY-vZ4m_YUuWD_KW0f9C-EnYAMKClPAsW7H3KDrr8x10DPDlaTK5vDffnA14sOYt10H5jhKxLtS6-iGD53bBknrGxjWenIBegdy_eRjnsWTIX47aGuYNfL5kNzZv_1nEcxaj6NGs_1yqmZO2GOrqslWB1OezAlDoBuY4f7Jix889DMKaMgQRsTaHYyAmVV1LkSSIPW_aZNBgxQImNHVk6sA"
                      />
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface">New Badge</span>
                </div>
                <div className="flex flex-col items-center gap-xs flex-shrink-0 cursor-pointer">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-secondary-container to-primary">
                    <div className="w-full h-full bg-surface-container-lowest rounded-full p-[2px]">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        data-alt="Close up of a vibrant, modern 3D icon of a flame, representing a 7-day study streak in a gamified learning platform. Light clean background."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwKq7XT2G-OUdrUrK2zefxTsKAEEQZU7Iz6ShLJ6xSiKvXCSm60BQqWf33F20iH4DocqCOBUN5Xk11Sk5aHvg4nak-Ep9oQaYN5BWdMj4ifezzSRHLX3nIjki7LZIVwKOOKd8glm444s7b1UN3V124QrW640aBQMUB-sAZQaFrJdIMR_sSFS4Y5hGD_195qghcKkVBwb2dynZi04CaC-UIqTzElwe15pVWtvTuat26AQKsk65HB3B83Q"
                      />
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface">7 Day Streak</span>
                </div>
                <div className="flex flex-col items-center gap-xs flex-shrink-0 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" data-icon="add">
                      add
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Add Story
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg">
                <div className="flex gap-sm">
                  <img
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-outline-variant"
                    data-alt="A small, professional avatar portrait of a diverse university student in a bright, modern setting. The style is clean, corporate modern with a light-mode aesthetic, suitable for a SaaS career platform profile picture."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnwa0-Q7qsw8m0R17wDkd4CrqiIMgcymuOPFOMuCcWaSA43LNmF7YCC2opF9-F4HgyqAIISeu3IyxM-ZvXB2qLe0DhHdW0_bpYczdcZwttZ5cZoJaMtFwi_5UgE0GfGXvbIHgpBSGCqi_B7yjKiciFobkKtqL4PZYHyArpt1-RH4S3hPnvqGqmvpTtLBVu3FS_DfCc3OSbyR6mGQAn-J5KVZ5X278Ns6uDbO1ySnB8SehhHt3KURI3nA"
                  />
                  <input
                    className="w-full bg-surface-container-low border border-slate-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md text-on-surface placeholder-on-surface-variant outline-none"
                    placeholder="What's on your mind, Alex?"
                    type="text"
                  />
                </div>
                <div className="flex justify-between items-center mt-md pt-md border-t border-outline-variant">
                  <div className="flex gap-sm">
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary-fixed-dim/20">
                      <span className="material-symbols-outlined text-[20px]" data-icon="image">
                        image
                      </span>
                      <span className="font-label-sm text-label-sm hidden sm:inline">Photo</span>
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary-fixed-dim/20">
                      <span className="material-symbols-outlined text-[20px]" data-icon="videocam">
                        videocam
                      </span>
                      <span className="font-label-sm text-label-sm hidden sm:inline">Video</span>
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary-fixed-dim/20">
                      <span className="material-symbols-outlined text-[20px]" data-icon="poll">
                        poll
                      </span>
                      <span className="font-label-sm text-label-sm hidden sm:inline">Poll</span>
                    </button>
                  </div>
                  <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg font-body-md font-semibold text-sm hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                    Post
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg border-l-4 border-primary">
                <div className="flex items-start justify-between mb-md">
                  <div className="flex gap-sm items-center">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      data-alt="A portrait of a joyful university student looking confident, shot in a bright, modern indoor environment. Clean, corporate modern SaaS aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_kax8P-NYMlfr8EUrejL-_JGuHCtVmaUdZca7d6nus01okebFIfaHDvjP_JWndwS5_toSvaJayyicPIt6Zek0m-AD9N_v0JsB3-7WgZIRuJ_n9Az8g8Z_cndiHgZXZV7LsGyKM2o0K2Yv6ZKL2rUuDguJIKi76ctbxU0o4wnUgFhiWWF7ofxZX0qZzz8x6xBdOiX5gXfA2J3ePzA6EZjr8wQfeOqD92X6-U1varcbEwtqommVWtq7GA"
                    />
                    <div>
                      <h4 className="font-body-md text-body-lg font-semibold text-on-surface">
                        Sarah Jenkins
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        2 hours ago · Mock Interview
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-primary-fixed-dim/20 text-primary px-2 py-1 rounded text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]" data-icon="verified">
                      verified
                    </span>
                    Success
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mb-md">
                  Just crushed my mock interview for a SWE intern role! The system design rounds on
                  PlacePro really helped me structure my thoughts. Big thanks to my peers for the
                  feedback! 🚀 #InterviewPrep
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant pt-md mt-md">
                  <div className="flex gap-2 text-on-surface-variant">
                    <button className="hover:text-primary hover:bg-primary-fixed-dim/20 p-1.5 rounded-full transition-all text-sm flex items-center gap-1">
                      👍 <span className="hidden sm:inline">24</span>
                    </button>
                    <button className="hover:text-primary hover:bg-primary-fixed-dim/20 p-1.5 rounded-full transition-all text-sm flex items-center gap-1">
                      🔥 <span className="hidden sm:inline">12</span>
                    </button>
                    <button className="hover:text-primary hover:bg-primary-fixed-dim/20 p-1.5 rounded-full transition-all text-sm flex items-center gap-1">
                      👏 <span className="hidden sm:inline">8</span>
                    </button>
                    <button className="hover:text-primary hover:bg-primary-fixed-dim/20 p-1.5 rounded-full transition-all text-sm flex items-center gap-1">
                      🧠 <span className="hidden sm:inline">5</span>
                    </button>
                    <button className="hover:text-primary hover:bg-primary-fixed-dim/20 p-1.5 rounded-full transition-all text-sm flex items-center gap-1">
                      🚀 <span className="hidden sm:inline">10</span>
                    </button>
                  </div>
                  <button className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      data-icon="chat_bubble_outline"
                    >
                      chat_bubble_outline
                    </span>
                    5 Comments
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg overflow-hidden">
                <div className="flex items-start justify-between mb-md">
                  <div className="flex gap-sm items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl">
                      PP
                    </div>
                    <div>
                      <h4 className="font-body-md text-body-lg font-semibold text-on-surface">
                        PlacePro Official
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        5 hours ago · Announcement
                      </p>
                    </div>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface mb-md">
                  Join our Live Class tomorrow at 6 PM EST: "Mastering Dynamic Programming
                  Patterns". Limited seats available!
                </p>
                <div className="rounded-xl overflow-hidden mb-md border border-outline-variant relative">
                  <img
                    className="w-full h-48 object-cover"
                    data-alt="A vibrant, modern graphic promoting a live coding class. It features sleek typography 'Dynamic Programming' against a dark, high-tech background with subtle geometric glowing patterns in indigo and purple. Premium SaaS aesthetic."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk3YkCtkmI3V3iJQMuQ6XfH9HCKESls99tYci6P76dEiISsEVaczojX6I8yfBpEENhqLtCZa_37KdYipyTGmbNlCYv4Cccg0QWXNuN4xDt-vGvEUmssPbDNEjJz5aYZmzFeUsNYOAxstCFhFJQjdEs0bxYLksYzEcw0PV2Di5KKFAnJ3Rglp-dy7U6xNcKQdjf6XPMWVnPHZHbF73Xs6OpFqTlCzzehVLhjKcjrCbM4HJv2MsvV1D6MA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-md">
                    <div className="text-white w-full flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">Mastering DP Patterns</p>
                        <p className="text-sm opacity-80">Tomorrow · 6 PM EST</p>
                      </div>
                      <button className="bg-primary hover:bg-on-primary-fixed-variant text-white px-4 py-2 rounded-lg font-semibold text-sm transition-transform hover:scale-105 shadow-md">
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-3 space-y-lg">
              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg">
                <h3 className="font-body-md text-body-lg font-semibold text-on-surface mb-md">
                  People you may know
                </h3>
                <div className="space-y-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-sm">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        data-alt="Small avatar of a smiling female student wearing glasses. Bright, clean background. Corporate modern style."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOSPEceiOyzQTjdYW20bHrkCPDKysulbHg74L73hkrzQ10Qq1ggjJD8Z0oSId6vIU76tEzQCx8WmzyYrh_BLQgCng3UNxWR4AZkeIheBtgQ9rkmA5fHLxR-ugTfHBokw3xSBVVW7jV0IU0kV-oS-m6FDiSTTXv4vSJP54MKYCd9NHwuIn-8W0_JHdIFo_ZCUOfZpoiLEUv9Yo91CHl3eB-mtGOVJPbg9oZLDL3xrjp4_RACfGOVUHLrw"
                      />
                      <div>
                        <p className="font-body-md text-sm font-semibold text-on-surface">
                          Emily Chen
                        </p>
                        <p className="font-label-sm text-xs text-on-surface-variant">CS @ Tech U</p>
                      </div>
                    </div>
                    <button className="text-primary border border-primary hover:bg-primary hover:text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-sm">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        data-alt="Small avatar of a focused male student. Bright, clean background. Corporate modern style."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3J88ZZrIg37rJJOymW6Zv2bsZvwfKXnEJGF6tM4QjLU7yoZ_0lrDkDXVHEeBYPJvfie7sP2atSnH67nfy3MHxBvJhDpxTHn8bLIZYlQebEt9C4RvwsTABuPG3o72k3t-DoJiqvBCJCrSoVNe8oiQLBf7Vm8fTsmBST2IZ8PfcJumV5IiKnbCrrMolgTexsV0aZQUzuZ1cIeAEgBKr5ZVbeHe7IOxIUiMRutGLe4iD5WxIECPPV3v4ng"
                      />
                      <div>
                        <p className="font-body-md text-sm font-semibold text-on-surface">
                          Marcus Doe
                        </p>
                        <p className="font-label-sm text-xs text-on-surface-variant">
                          Software Eng
                        </p>
                      </div>
                    </div>
                    <button className="text-primary border border-primary hover:bg-primary hover:text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-[16px] soft-shadow p-lg">
                <div className="flex items-center justify-between mb-md">
                  <h3 className="font-body-md text-body-lg font-semibold text-on-surface">
                    Top Students (Week)
                  </h3>
                  <span
                    className="material-symbols-outlined text-secondary-container"
                    data-icon="emoji_events"
                  >
                    emoji_events
                  </span>
                </div>
                <div className="space-y-sm">
                  <div className="flex items-center gap-sm p-2 rounded-lg bg-surface-container hover:bg-surface-variant transition-colors cursor-pointer border-l-2 border-secondary-container">
                    <span className="font-bold text-secondary-container w-4">1</span>
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      data-alt="Avatar of student ranking first. Clean, bright aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd-xubS8Us1Z8KlwLAglE5ymvpzT_snc3ixGx9h5pYbSjuFOVyGjBjcTYLkSMEekLxLxIiBgv0y195RagblKITfZ7bAtN0AeiBkzwrzFZJlu3HMExQmx5hfBvp0MCunnPmIJll2-Z1Co12Fh48O7VwkIOA2DkI_n1xVmFKAkCzXYdtae30cxwCWHPlgwnl5k_DUhcgWKmjh7Lkp6LTG_VyHlpFBMzVX0oberV40c0xktPaCAsxeLj1bw"
                    />
                    <div className="flex-1">
                      <p className="font-body-md text-sm font-semibold text-on-surface">
                        David Kim
                      </p>
                    </div>
                    <span className="font-label-sm text-xs font-bold text-secondary">3,200 XP</span>
                  </div>
                  <div className="flex items-center gap-sm p-2 rounded-lg hover:bg-surface-variant transition-colors cursor-pointer">
                    <span className="font-bold text-on-surface-variant w-4">2</span>
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      data-alt="Avatar of student ranking second. Clean, bright aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxn87AeKFJslP6M3o9znWES4N8jOSE88gbxeDcTw8AJsh-toZAkMWoMzdkguvNEa52grTYe6Ez8nKRr5rQ-4bo-vjOzq52NO8Zplw7u4sdzogWFbNdSBbkC4HNzIqPByj-Nv6xq_d5djHLOU67-j4TlBzPe43dJsPF_s5eT0zJJ0ddSzTA7rKfO7Nq0b5zmtzASh54ba2StD9wGGKZ6gytv62vMnEVv-mCLY0cIOfyy7HABULVd4e-_g"
                    />
                    <div className="flex-1">
                      <p className="font-body-md text-sm font-semibold text-on-surface">
                        Anita Silva
                      </p>
                    </div>
                    <span className="font-label-sm text-xs font-bold text-secondary">2,950 XP</span>
                  </div>
                  <div className="flex items-center gap-sm p-2 rounded-lg hover:bg-surface-variant transition-colors cursor-pointer">
                    <span className="font-bold text-on-surface-variant w-4">3</span>
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      data-alt="Avatar of student ranking third. Clean, bright aesthetic."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-lgkZQYaJGiB6lrz97e2ewB7AMulg0uUf0_iKGoHzZAOUOtBcRAQleAwEkc3_2ipHgY7aEj4IVlj5Yl94CTQ36dQlSASUWZhapch7VMJU6C-4f_altLjiz-UDka6Q6cF8LaoAAYa6yqGLIjQ-lq1J4G81hS2qtyYDeZ2F1ebOC06qSMhrpSkH7M-Xz8At0C9XNNQLAeBwxkmb4EokN3xBxc1gb86yVlpwGlCZyH1JmMJO1dooWOHqBA"
                    />
                    <div className="flex-1">
                      <p className="font-body-md text-sm font-semibold text-on-surface">
                        Omar Farooq
                      </p>
                    </div>
                    <span className="font-label-sm text-xs font-bold text-secondary">2,800 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
