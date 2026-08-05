import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/coding_arena_challenge_list")({
  component: CodingArenaChallengeListPage,
});

function CodingArenaChallengeListPage() {
  return (
    <>
      <nav className="hidden md:flex flex-col h-screen w-sidebar-width fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-lowest shadow-md z-40 p-md gap-base overflow-y-auto">
        <div className="mb-lg px-sm pt-md">
          <h1 className="text-headline-md font-headline-md font-bold text-primary">
            PlacePro Career OS
          </h1>
          <div className="flex items-center gap-sm mt-md p-sm bg-surface-container rounded-lg border border-outline-variant/30">
            <img
              className="w-10 h-10 rounded-full object-cover shadow-sm bg-surface-variant"
              data-alt="A modern, professional 3D style avatar portrait of a user. The lighting is soft and flattering, set against a clean, light surface background. Indigo and soft blue ambient light hints at a high-tech SaaS environment, reflecting a serious but approachable student profile."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4rFBLA1Iw8fNC48NSnDeKEoA05M79LC7p6uxaa31jD2yOptzM30sjRn7XhKwbNR4FYzRASub5TVkGVeUSjpYtNpsnqse7DvYMy9CL1bHCTI47pEVa19061TQnb2UQ3nkkVmAeBpep5lN0diz5pPFpprfidodiJ-yNp10NFPvUWsCl3wlTSJ0X2xYv5d-DaGCWRbL1Boz0QLXeelmlId7pUEq2m2OKR0JtlOvcOnAOBl8D08_Ght2Pbg"
            />
            <div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">
                Rank: #42 | 2500 XP
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-sm">
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              dashboard
            </span>
            Dashboard
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              rss_feed
            </span>
            Feed
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              video_chat
            </span>
            Interview Hub
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              quiz
            </span>
            Quizzes
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              live_tv
            </span>
            Live Classes
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg bg-primary-container text-on-primary-container font-bold translate-x-1 transition-transform font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_esports
            </span>
            Arena
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              work
            </span>
            Jobs
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              map
            </span>
            Roadmap
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              description
            </span>
            Resume
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              leaderboard
            </span>
            Leaderboard
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              person
            </span>
            Profile
          </a>
          <a
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-body-md text-body-md"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              groups
            </span>
            Rooms
          </a>
        </div>

        <div className="mt-auto pt-lg pb-sm">
          <button className="w-full py-sm px-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-lg hover:bg-secondary-fixed transition-colors shadow-sm flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-sm">star</span>
            Upgrade to Pro
          </button>
        </div>
      </nav>

      <main className="flex-1 md:ml-[280px] w-full min-h-screen bg-surface">
        <div className="max-w-container-max mx-auto p-md md:p-xl space-y-xl">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline-variant/40 pb-md">
            <div>
              <div className="flex items-center gap-sm mb-xs">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
                  Topic: Data Structures
                </span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">
                  chevron_right
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Arrays &amp; Strings
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-sm">
                Array Manipulation Challenges
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm max-w-2xl">
                Master fundamental operations, sliding windows, and two-pointer techniques to
                optimize array processing algorithms.
              </p>
            </div>
            <div className="flex gap-sm">
              <div className="bg-surface-container rounded-lg p-sm px-md border border-outline-variant/30 text-center shadow-sm">
                <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Topic Mastery
                </div>
                <div className="flex items-end justify-center gap-1">
                  <span className="font-headline-md text-headline-md text-primary">64</span>
                  <span className="font-body-md text-body-md text-on-surface-variant mb-1">%</span>
                </div>
              </div>
              <div className="bg-surface-container rounded-lg p-sm px-md border border-outline-variant/30 text-center shadow-sm">
                <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Solved
                </div>
                <div className="flex items-end justify-center gap-1">
                  <span className="font-headline-md text-headline-md text-on-surface">14</span>
                  <span className="font-body-md text-body-md text-on-surface-variant mb-1">
                    /22
                  </span>
                </div>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-md">
            <div className="lg:col-span-2 bg-white rounded-xl p-lg border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-md">
                    <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        local_fire_department
                      </span>
                      Daily Featured
                    </span>
                    <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">stars</span> +150 XP
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                    Optimal Meeting Points
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                    Given a 2D grid representing a city, find the best meeting point for all
                    employees that minimizes total travel distance using Manhattan distance.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-md">
                    <span className="bg-primary/5 text-primary border border-primary/20 font-label-sm text-label-sm px-2 py-1 rounded">
                      2D Arrays
                    </span>
                    <span className="bg-primary/5 text-primary border border-primary/20 font-label-sm text-label-sm px-2 py-1 rounded">
                      Math
                    </span>
                    <span className="bg-primary/5 text-primary border border-primary/20 font-label-sm text-label-sm px-2 py-1 rounded">
                      Sorting
                    </span>
                  </div>
                </div>
                <div className="mt-lg flex items-center justify-between border-t border-outline-variant/30 pt-md">
                  <div className="flex items-center gap-sm">
                    <span className="w-2 h-2 rounded-full bg-error"></span>
                    <span className="font-label-sm text-label-sm text-error uppercase">Hard</span>
                  </div>
                  <button className="bg-primary text-on-primary font-body-md text-body-md px-lg py-sm rounded-lg hover:bg-primary-fixed-variant hover:scale-105 transition-all duration-200 shadow-sm flex items-center gap-2">
                    Solve Challenge{" "}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-lg border border-outline-variant/30 shadow-sm flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md text-lg">
                Top Solvers Today
              </h3>
              <div className="space-y-sm flex-1">
                <div className="flex items-center justify-between bg-white p-sm rounded-lg border border-outline-variant/20 shadow-sm">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-sm">
                      1
                    </div>
                    <span className="font-body-md text-body-md font-medium text-on-surface">
                      Alex Chen
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold">1.2s</span>
                </div>
                <div className="flex items-center justify-between bg-white p-sm rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant text-sm">
                      2
                    </div>
                    <span className="font-body-md text-body-md text-on-surface">Sarah J.</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">1.4s</span>
                </div>
                <div className="flex items-center justify-between bg-white p-sm rounded-lg border border-outline-variant/20">
                  <div className="flex items-center gap-sm">
                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant text-sm">
                      3
                    </div>
                    <span className="font-body-md text-body-md text-on-surface">Priya M.</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">1.8s</span>
                </div>
              </div>
              <button className="w-full mt-md py-sm text-primary font-label-sm text-label-sm border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
                View Full Rankings
              </button>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] overflow-hidden">
            <div className="p-md border-b border-outline-variant/30 bg-surface-container/50 flex flex-col md:flex-row gap-md justify-between items-center">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline shadow-sm"
                  placeholder="Search challenges..."
                  type="text"
                />
              </div>
              <div className="flex gap-sm w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                <button className="px-md py-1.5 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full whitespace-nowrap">
                  All
                </button>
                <button className="px-md py-1.5 bg-surface text-on-surface-variant border border-outline-variant/50 hover:bg-surface-variant font-label-sm text-label-sm rounded-full whitespace-nowrap transition-colors">
                  Unsolved
                </button>
                <button className="px-md py-1.5 bg-surface text-on-surface-variant border border-outline-variant/50 hover:bg-surface-variant font-label-sm text-label-sm rounded-full whitespace-nowrap transition-colors">
                  Easy
                </button>
                <button className="px-md py-1.5 bg-surface text-on-surface-variant border border-outline-variant/50 hover:bg-surface-variant font-label-sm text-label-sm rounded-full whitespace-nowrap transition-colors">
                  Medium
                </button>
                <button className="px-md py-1.5 bg-surface text-on-surface-variant border border-outline-variant/50 hover:bg-surface-variant font-label-sm text-label-sm rounded-full whitespace-nowrap transition-colors">
                  Hard
                </button>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-12 gap-4 px-lg py-sm bg-surface/50 border-b border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-5">Challenge</div>
              <div className="col-span-3">Tags</div>
              <div className="col-span-2 text-center">Difficulty &amp; XP</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="flex flex-col divide-y divide-outline-variant/20">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-md md:px-lg py-md items-center hover:bg-surface-container-low transition-colors group">
                <div className="col-span-1 hidden md:flex justify-center">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                  <div className="flex items-center gap-2 md:hidden mb-1">
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-label-sm text-label-sm text-primary">Solved</span>
                  </div>
                  <h4 className="font-headline-md text-base md:text-headline-md text-on-surface font-medium group-hover:text-primary transition-colors">
                    Two Sum Variations
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant truncate">
                    Find pairs in sorted array matching target sum.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-wrap gap-2">
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Two Pointers
                  </span>
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Hash Map
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-1">
                  <span className="font-label-sm text-label-sm text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                    Easy
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">25 XP</span>
                </div>
                <div className="col-span-1 flex justify-end md:justify-end">
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-lg">code</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-md md:px-lg py-md items-center hover:bg-surface-container-low transition-colors group relative border-l-4 border-l-secondary-container bg-surface/30">
                <div className="col-span-1 hidden md:flex justify-center">
                  <span className="w-5 h-5 rounded-full border-2 border-outline-variant"></span>
                </div>
                <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                  <h4 className="font-headline-md text-base md:text-headline-md text-on-surface font-medium group-hover:text-primary transition-colors">
                    Maximum Subarray Sum
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant truncate">
                    Implement Kadane's algorithm to find max contiguous sum.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-wrap gap-2">
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Dynamic Prog.
                  </span>
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Math
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-1">
                  <span className="font-label-sm text-label-sm text-secondary-container font-medium bg-secondary-container/10 px-2 py-0.5 rounded">
                    Medium
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">50 XP</span>
                </div>
                <div className="col-span-1 flex justify-end md:justify-end">
                  <button className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors shadow-sm md:opacity-0 group-hover:opacity-100 focus:opacity-100">
                    Start
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-md md:px-lg py-md items-center hover:bg-surface-container-low transition-colors group relative border-l-4 border-l-transparent hover:border-l-error">
                <div className="col-span-1 hidden md:flex justify-center">
                  <span className="w-5 h-5 rounded-full border-2 border-outline-variant"></span>
                </div>
                <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                  <h4 className="font-headline-md text-base md:text-headline-md text-on-surface font-medium group-hover:text-primary transition-colors">
                    Trapping Rain Water
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant truncate">
                    Compute volume of water trapped after raining on elevation map.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-wrap gap-2">
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Two Pointers
                  </span>
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Stack
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-1">
                  <span className="font-label-sm text-label-sm text-error font-medium bg-error/10 px-2 py-0.5 rounded">
                    Hard
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    100 XP
                  </span>
                </div>
                <div className="col-span-1 flex justify-end md:justify-end">
                  <button className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors shadow-sm md:opacity-0 group-hover:opacity-100 focus:opacity-100">
                    Start
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-md md:px-lg py-md items-center hover:bg-surface-container-low transition-colors group relative border-l-4 border-l-transparent hover:border-l-secondary-container">
                <div className="col-span-1 hidden md:flex justify-center">
                  <span className="w-5 h-5 rounded-full border-2 border-outline-variant"></span>
                </div>
                <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                  <h4 className="font-headline-md text-base md:text-headline-md text-on-surface font-medium group-hover:text-primary transition-colors">
                    Longest Substring Without Repeating
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant truncate">
                    Find length of longest substring without repeating characters.
                  </p>
                </div>
                <div className="col-span-1 md:col-span-3 flex flex-wrap gap-2">
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Sliding Window
                  </span>
                  <span className="bg-primary/5 text-primary/80 border border-primary/10 font-label-sm text-[10px] px-2 py-0.5 rounded">
                    Strings
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-1">
                  <span className="font-label-sm text-label-sm text-secondary-container font-medium bg-secondary-container/10 px-2 py-0.5 rounded">
                    Medium
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">50 XP</span>
                </div>
                <div className="col-span-1 flex justify-end md:justify-end">
                  <button className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1.5 rounded hover:bg-primary hover:text-white transition-colors shadow-sm md:opacity-0 group-hover:opacity-100 focus:opacity-100">
                    Start
                  </button>
                </div>
              </div>
            </div>

            <div className="p-md border-t border-outline-variant/30 flex items-center justify-between bg-surface/50">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Showing 1-4 of 22 challenges
              </span>
              <div className="flex gap-1">
                <button
                  className="w-8 h-8 rounded flex items-center justify-center border border-outline-variant text-outline cursor-not-allowed"
                  disabled=""
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center bg-primary text-on-primary font-label-sm shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center border border-outline-variant/50 text-on-surface hover:bg-surface-variant transition-colors font-label-sm">
                  2
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center border border-outline-variant/50 text-on-surface hover:bg-surface-variant transition-colors font-label-sm">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">
                  ...
                </span>
                <button className="w-8 h-8 rounded flex items-center justify-center border border-outline-variant/50 text-on-surface hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
