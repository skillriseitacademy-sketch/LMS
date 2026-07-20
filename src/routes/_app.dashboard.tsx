import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [enrolledTopics, setEnrolledTopics] = useState<any[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;
    const load = async () => {
      const { data: p } = await supabase.from('profiles').select('*, xp_transactions(amount)').eq('id', session.user.id).single();
      if (p) {
        p.xp = p.xp_transactions ? p.xp_transactions.reduce((acc: number, t: any) => acc + t.amount, 0) : 0;
        setProfile(p);
      }
      
      const { data: topics } = await supabase.from('student_topics').select('topics(*)').eq('user_id', session.user.id);
      if (topics) {
        setEnrolledTopics(topics.map(t => t.topics).filter(Boolean));
      }
    };
    load();
  }, [session]);

  const currentXp = profile?.xp || 0;
  const level = Math.floor(currentXp / 1000) + 1;
  const nextLevelXp = level * 1000;
  const progressPercent = ((currentXp % 1000) / 1000) * 100;
  const firstName = profile?.name ? profile.name.split(' ')[0] : 'Student';

  return (
    <>
      <main className="flex-1 w-full p-4 md:p-8 max-w-[1280px] mx-auto">
        {/* Top Section: Greeting & Gamification */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-8">
          <div className="flex-1">
            <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface mb-2" style={{ fontFamily: "Manrope" }}>Welcome back, {firstName}! 👋</h1>
            <p className="text-lg leading-[1.6] text-on-surface-variant" style={{ fontFamily: "Inter" }}>Let's get you ready for your next big interview.</p>
          </div>
          {/* Gamification Widget */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex items-center gap-8 w-full lg:w-auto shrink-0">
            {/* XP */}
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs tracking-[0.05em] font-medium text-secondary font-bold uppercase" style={{ fontFamily: "JetBrains Mono" }}>Level {level}</span>
                <span className="text-xs tracking-[0.05em] font-medium text-on-surface-variant" style={{ fontFamily: "JetBrains Mono" }}>{currentXp} / {nextLevelXp} XP</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <div className="w-px h-10 bg-outline-variant mx-2"></div>
            {/* Streak */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined" data-weight="fill">local_fire_department</span>
              </div>
              <div>
                <div className="text-[24px] font-semibold leading-[1.3] text-tertiary" style={{ fontFamily: "Manrope" }}>0</div>
                <div className="text-xs tracking-[0.05em] font-medium text-on-surface-variant uppercase" style={{ fontFamily: "JetBrains Mono" }}>Day Streak</div>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Quick Launch Tiles (Top Row, Spans Full) */}
          <section className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4">
            {/* Tile 1 */}
            <Link
              to="/interview"
              className="group bg-surface-container-lowest p-6 rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined">video_chat</span>
              </div>
              <div>
                <h3
                  className="text-lg leading-[1.6] font-semibold text-on-surface"
                  style={{ fontFamily: "Inter" }}
                >
                  Start Interview
                </h3>
                <p
                  className="text-xs tracking-[0.05em] font-medium text-on-surface-variant mt-1"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  Mock with AI or Peers
                </p>
              </div>
            </Link>

            {/* Tile 2 */}
            <Link
              to="/quizzes"
              className="group bg-surface-container-lowest p-6 rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined">quiz</span>
              </div>
              <div>
                <h3
                  className="text-lg leading-[1.6] font-semibold text-on-surface"
                  style={{ fontFamily: "Inter" }}
                >
                  Take a Quiz
                </h3>
                <p
                  className="text-xs tracking-[0.05em] font-medium text-on-surface-variant mt-1"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  Test your knowledge
                </p>
              </div>
            </Link>

            {/* Tile 3 */}
            <Link
              to="/live"
              className="group bg-surface-container-lowest p-6 rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined">live_tv</span>
              </div>
              <div>
                <h3
                  className="text-lg leading-[1.6] font-semibold text-on-surface"
                  style={{ fontFamily: "Inter" }}
                >
                  Join Live Class
                </h3>
                <p
                  className="text-xs tracking-[0.05em] font-medium text-on-surface-variant mt-1"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  Starting in 15 mins
                </p>
              </div>
            </Link>

            {/* Tile 4 */}
            <Link
              to="/arena"
              className="group bg-surface-container-lowest p-6 rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined">sports_esports</span>
              </div>
              <div>
                <h3
                  className="text-lg leading-[1.6] font-semibold text-on-surface"
                  style={{ fontFamily: "Inter" }}
                >
                  Open Arena
                </h3>
                <p
                  className="text-xs tracking-[0.05em] font-medium text-on-surface-variant mt-1"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  Compete globally
                </p>
              </div>
            </Link>
          </section>

          {/* Today's Mission (Left Col, Spans 7) */}
          <section className="md:col-span-7 bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">checklist</span>
                <h2
                  className="text-[24px] font-semibold leading-[1.3] text-on-surface"
                  style={{ fontFamily: "Manrope" }}
                >
                  Today's Mission
                </h2>
              </div>
              <span
                className="bg-surface-variant text-on-surface-variant text-xs tracking-[0.05em] font-medium px-2 py-1 rounded-md"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                1/3 Completed
              </span>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {/* Task 1 (Completed) */}
              <label className="flex items-start gap-4 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                  <input
                    defaultChecked
                    className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100">
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-base leading-[1.5] text-on-surface-variant line-through group-hover:text-on-surface transition-colors"
                    style={{ fontFamily: "Inter" }}
                  >
                    Solve 2 DSA problems
                  </p>
                  <p
                    className="text-xs tracking-[0.05em] font-medium text-outline mt-1"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    +50 XP
                  </p>
                </div>
              </label>

              {/* Task 2 (Pending) */}
              <label className="flex items-start gap-4 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group border-l-[3px] border-secondary-container pl-[9px]">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                  <input
                    className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer hover:border-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100">
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-base leading-[1.5] text-on-surface font-medium"
                    style={{ fontFamily: "Inter" }}
                  >
                    Complete 1 Mock Interview
                  </p>
                  <p
                    className="text-xs tracking-[0.05em] font-medium text-outline mt-1"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    +150 XP
                  </p>
                </div>
                <button
                  className="px-3 py-1 bg-primary-container text-on-primary-container text-xs tracking-[0.05em] rounded hover:bg-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  Start
                </button>
              </label>

              {/* Task 3 (Pending) */}
              <label className="flex items-start gap-4 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group pl-3">
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                  <input
                    className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer hover:border-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100">
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="text-base leading-[1.5] text-on-surface"
                    style={{ fontFamily: "Inter" }}
                  >
                    Attend "System Design Basics" Live Class
                  </p>
                  <p
                    className="text-xs tracking-[0.05em] font-medium text-outline mt-1"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    Starts at 4:00 PM • +100 XP
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Enrolled Topics (Right Col, Spans 5) */}
          <section className="md:col-span-5 bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span>
                <h2
                  className="text-[24px] font-semibold leading-[1.3] text-on-surface"
                  style={{ fontFamily: "Manrope" }}
                >
                  Enrolled Topics
                </h2>
              </div>
              <button className="text-primary hover:text-on-primary-fixed-variant p-1 rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 items-center justify-center py-2">
              {enrolledTopics.length === 0 ? (
                <div className="col-span-2 text-center text-sm text-on-surface-variant">No enrolled topics yet.</div>
              ) : (
                enrolledTopics.slice(0, 2).map((topic, i) => (
                  <div key={topic.id} className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-2">
                      <svg
                        className={`circular-chart ${i % 2 === 0 ? 'text-primary-container' : 'text-secondary-container'} w-full h-full drop-shadow-sm`}
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="circle-bg"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        ></path>
                        <path
                          className="circle stroke-current"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          strokeDasharray="0, 100"
                        ></path>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                          className="text-[24px] font-bold leading-[1.3] text-on-surface"
                          style={{ fontFamily: "Manrope" }}
                        >
                          0%
                        </span>
                      </div>
                    </div>
                    <h3
                      className="text-base leading-[1.5] font-medium text-on-surface line-clamp-1"
                      style={{ fontFamily: "Inter" }}
                    >
                      {topic.title}
                    </h3>
                    <span
                      className={`text-xs tracking-[0.05em] font-medium mt-1 px-2 py-0.5 rounded ${i % 2 === 0 ? 'bg-primary-fixed/30 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      Enrolled
                    </span>
                  </div>
                ))
              )}
            </div>
            <button
              className="w-full mt-4 py-2 border border-outline-variant rounded-lg text-base leading-[1.5] text-primary hover:bg-surface-container-low transition-colors font-medium"
              style={{ fontFamily: "Inter" }}
            >
              View All Topics
            </button>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Navigation (Hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant flex justify-around items-center h-[72px] pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <Link
          to="/dashboard"
          aria-current="page"
          className="flex flex-col items-center justify-center w-16 h-full text-primary-container gap-1"
        >
          <div className="w-16 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined" data-weight="fill">
              dashboard
            </span>
          </div>
          <span
            className="text-[10px] tracking-[0.05em] font-bold"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Home
          </span>
        </Link>
        <Link
          to="/quizzes"
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
        >
          <span className="material-symbols-outlined">quiz</span>
          <span
            className="text-[10px] tracking-[0.05em] font-medium"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Quizzes
          </span>
        </Link>
        <Link
          to="/interview"
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
        >
          <span className="material-symbols-outlined">video_chat</span>
          <span
            className="text-[10px] tracking-[0.05em] font-medium"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Interviews
          </span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
        >
          <span className="material-symbols-outlined">person</span>
          <span
            className="text-[10px] tracking-[0.05em] font-medium"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Profile
          </span>
        </Link>
      </nav>
    </>
  );
}
