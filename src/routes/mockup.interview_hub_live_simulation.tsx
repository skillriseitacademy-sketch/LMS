import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/interview_hub_live_simulation")({
  component: InterviewHubLiveSimulationPage,
});

function InterviewHubLiveSimulationPage() {
  return (
    <>
      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex flex-col py-lg px-md z-50">
        <div className="flex items-center gap-3 mb-xl px-sm">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined fill text-[20px]">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-headline-md font-display-lg font-extrabold text-primary tracking-tight">
              PlacePro
            </h1>
            <p className="font-label-sm text-label-sm text-outline">Career OS</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-1">
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">rss_feed</span>
            <span className="font-label-sm text-label-sm">Feed</span>
          </a>

          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined fill">video_chat</span>
            <span className="font-label-sm text-label-sm">Interview Hub</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">quiz</span>
            <span className="font-label-sm text-label-sm">Quizzes</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">sports_esports</span>
            <span className="font-label-sm text-label-sm">Arena</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">work</span>
            <span className="font-label-sm text-label-sm">Jobs</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-label-sm text-label-sm">Roadmap</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">description</span>
            <span className="font-label-sm text-label-sm">Resume</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <span className="font-label-sm text-label-sm">Leaderboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-sm text-label-sm">Profile</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-label-sm text-label-sm">Rooms</span>
          </a>
        </div>

        <div className="mt-lg mb-lg">
          <button className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-sm text-label-sm hover:bg-on-primary-fixed-variant transition-colors active:scale-[0.98]">
            Start Practice
          </button>
        </div>

        <div className="border-t border-surface-variant pt-4 space-y-1">
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors duration-200"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-sm text-label-sm">Logout</span>
          </a>
        </div>
      </nav>

      <main className="ml-sidebar-width flex-1 flex flex-col h-full bg-surface-bright relative">
        <header className="h-16 flex items-center justify-between px-xl bg-surface-container-lowest border-b border-surface-variant z-40 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
                Live Interview
              </span>
            </div>
            <div className="h-4 w-px bg-outline-variant"></div>
            <h2 className="font-headline-md text-[18px] font-semibold text-on-surface">
              Software Engineer I - Core Systems
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-md border border-outline-variant/30">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                timer
              </span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface tabular-nums">
                43:12
              </span>
            </div>

            <div className="flex gap-2">
              <button
                className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Mute Microphone"
              >
                <span className="material-symbols-outlined">mic</span>
              </button>
              <button
                className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Stop Video"
              >
                <span className="material-symbols-outlined">videocam</span>
              </button>
              <button
                className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                title="Settings"
              >
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>

            <button className="bg-error hover:bg-on-error-container text-on-error px-4 py-2 rounded-lg font-label-sm text-label-sm transition-colors active:scale-[0.98] shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">call_end</span>
              Finish Interview
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden p-md gap-md">
          <div className="w-[35%] flex flex-col gap-md min-w-[320px]">
            <div
              className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] border border-surface-variant flex-shrink-0"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                className="absolute inset-0 w-full h-full object-cover"
                data-alt="A professional AI avatar resembling a senior software engineer in a modern, well-lit office setting. The avatar has a welcoming but focused expression, suitable for a tech interview. High-key lighting, corporate modern aesthetic, slate and white color palette with subtle indigo accents."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD70sWiF-q2f8qJ3iYxDmA78liEaLXL4t_M3LLQP0IHJXgR_GH3TxsD5Y7Sx0FEk69GGFkc5ua01H7dormM-zrJw80f9fvxSY4fBGB32W3UczHSUhkQj3DzjlwC399i0OpVYiwm5cnuz2adRZoBCWCnUlVKlkNt6LW6fPjp-t8opZrB8KMLZgjUTCFXw6B17YOtCgpw6Y9dD22t8tSU2enRFmBiJ1BB3sTKMhNZ7FnIAUD-sCcDrSAKTQ"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none"></div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="bg-surface-container-lowest/20 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-container"></div>
                  <span className="font-label-sm text-label-sm text-white drop-shadow-sm">
                    Alex (AI Interviewer)
                  </span>
                </div>
              </div>

              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-white/80 text-[18px] drop-shadow-md">
                  signal_cellular_alt
                </span>
              </div>

              <div className="absolute bottom-3 right-3 w-1/3 aspect-video bg-surface rounded-lg overflow-hidden border-2 border-surface-container-lowest shadow-lg">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A webcam view of a young professional student, focused and actively listening, sitting in a tidy dorm or study room. Natural daylight coming from a window, bright and clean aesthetic, matching the light-mode corporate modern SaaS style."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0UvKzHMLfiMyYGT0xbt1m1Fv25n4W3rpwO7Y7b4UuCov4_4Dbvu6JSJHBSTyNbT7ImNq5tLnFBSox7zipF8U-7KT1t4grN4N6ndkBF87gs-QiK3AC0k84H149mY-JBIdaJXfHBLaavDlt7SF5EAfzlKvHQyRyCq6mGVgGVHfKp5JGNTFrXVwLCQ1iF5cXBXmh6V-en7HtvQwL7bm6tNNW0OrCPmVGCsNXupTuhOTWoBqFGNodjbPAhA"
                />
              </div>
            </div>

            <div className="flex-1 bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
              <div className="flex border-b border-surface-variant">
                <button className="flex-1 py-3 text-center font-label-sm text-label-sm font-semibold text-primary border-b-2 border-primary bg-surface-container-low transition-colors">
                  Chat
                </button>
                <button className="flex-1 py-3 text-center font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                  Private Notes
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 editor-scrollbar">
                <div className="flex justify-center">
                  <span className="bg-surface-container px-3 py-1 rounded-full font-label-sm text-[10px] text-outline uppercase tracking-wider">
                    Interview Started
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-container text-[16px]">
                      smart_toy
                    </span>
                  </div>
                  <div className="bg-surface-container-low px-4 py-3 rounded-2xl rounded-tl-sm text-body-md font-body-md text-on-surface">
                    Hello! I'm Alex. To start, let's look at the first problem. Please write a
                    function to reverse a linked list.
                    <div className="mt-2 text-[12px] text-outline">10:02 AM</div>
                  </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant overflow-hidden">
                    <img
                      className="w-full h-full object-cover opacity-50"
                      data-alt="A simple silhouette avatar icon representing a user profile, rendered in slate and light indigo tones."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt43_cxeheqsIWBdZvZlNwVr89XK_UHIfRX3QWt0CIclmCdeYAYb1Dan0OHp2fKdpw6mKa_5V3ec6-grUVTzS895XMTa1lh-WzlOkZOoTvYorbX49jTe9ulmAvJwR3pnobBjfyCNO9YGOZ4vbgoxXi5Rt8mt-VPWP_XN6DytVb3xt6pN6H092u-pqfJsAEMGc5PRmlTcGxU6eUlet9d36kP5KlPGBGkXuUzYHtdXLw-UKSurdtoEbhnQ"
                    />
                  </div>
                  <div className="bg-primary text-on-primary px-4 py-3 rounded-2xl rounded-tr-sm text-body-md font-body-md shadow-sm">
                    Sure, I'll start by defining the list node structure.
                    <div className="mt-2 text-[12px] text-primary-fixed-dim/70 text-right">
                      10:03 AM
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-surface-variant bg-surface-bright">
                <div className="relative flex items-center">
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-2.5 pl-4 pr-12 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    placeholder="Type a message..."
                    type="text"
                  />
                  <button className="absolute right-2 p-1.5 rounded-full text-primary hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
            <div className="h-12 border-b border-surface-variant flex items-center justify-between px-4 bg-surface-bright">
              <div className="flex items-center gap-3">
                <div className="relative group cursor-pointer flex items-center gap-1.5 bg-surface-container px-2.5 py-1.5 rounded-md hover:bg-surface-container-high transition-colors">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    Python 3
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    expand_more
                  </span>
                </div>
                <div className="h-4 w-px bg-outline-variant"></div>
                <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">cloud_done</span> Saved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded transition-colors"
                  title="Format Code"
                >
                  <span className="material-symbols-outlined text-[18px]">format_align_left</span>
                </button>
                <button
                  className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded transition-colors"
                  title="Reset Code"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
                <div className="h-4 w-px bg-outline-variant mx-1"></div>
                <button className="flex items-center gap-1.5 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-3 py-1.5 rounded-md font-label-sm text-label-sm transition-colors active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  Run Code
                </button>
              </div>
            </div>

            <div className="flex-1 flex bg-[#fbfbfe]">
              <div className="w-12 bg-surface-container-lowest border-r border-surface-variant flex flex-col items-end py-4 pr-2 font-label-sm text-label-sm text-outline/50 select-none">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
              </div>

              <div className="flex-1 p-4 font-label-sm text-label-sm leading-relaxed overflow-auto editor-scrollbar whitespace-pre text-on-surface">
                <span className="text-primary font-semibold">class</span>{" "}
                <span className="text-secondary-container font-semibold">ListNode</span>:
                <span className="text-primary font-semibold">def</span>{" "}
                <span className="text-tertiary">__init__</span>(
                <span className="text-on-surface-variant">self</span>, val=0, next=
                <span className="text-primary font-semibold">None</span>):
                <span className="text-on-surface-variant">self</span>.val = val
                <span className="text-on-surface-variant">self</span>.next = next
                <span className="text-primary font-semibold">class</span>{" "}
                <span className="text-secondary-container font-semibold">Solution</span>:
                <span className="text-primary font-semibold">def</span>{" "}
                <span className="text-tertiary">reverseList</span>(
                <span className="text-on-surface-variant">self</span>, head:{" "}
                <span className="text-secondary-container">Optional</span>[
                <span className="text-secondary-container">ListNode</span>]) -&gt;{" "}
                <span className="text-secondary-container">Optional</span>[
                <span className="text-secondary-container">ListNode</span>]: prev ={" "}
                <span className="text-primary font-semibold">None</span>
                curr = head
                <span className="text-outline italic"># Your code here...</span>
                <span className="animate-pulse bg-primary/20 w-2 h-4 inline-block align-middle ml-1"></span>
              </div>
            </div>

            <div className="h-48 border-t border-surface-variant bg-surface-container-lowest flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-surface-variant bg-surface-bright">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                  Console Output
                </span>
                <button className="text-outline hover:text-on-surface transition-colors p-1">
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              </div>
              <div className="p-4 font-label-sm text-label-sm text-on-surface-variant overflow-auto editor-scrollbar flex-1">
                <span className="text-outline">Ready. Run your code to see output here.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
