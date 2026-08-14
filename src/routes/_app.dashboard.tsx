import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [enrolledTopics, setEnrolledTopics] = useState<any[]>([]);

  useEffect(() => {
    if (!session?.id) return;
    const load = async () => {
      const { data: p } = await supabase
        .from("profiles")
        .select("*, xp_transactions(amount)")
        .eq("id", session.id)
        .single();
      if (p) {
        p.xp = p.xp_transactions
          ? p.xp_transactions.reduce((acc: number, t: any) => acc + t.amount, 0)
          : 0;
        setProfile(p);
      }

      const { data: topics } = await supabase
        .from("student_topics")
        .select("topics(*)")
        .eq("user_id", session.id);
      if (topics) {
        setEnrolledTopics(topics.map((t) => t.topics).filter(Boolean));
      }
    };
    load();
  }, [session]);

  const currentXp = profile?.xp || 0;
  const level = Math.floor(currentXp / 1000) + 1;
  const nextLevelXp = level * 1000;
  const progressPercent = ((currentXp % 1000) / 1000) * 100;
  const firstName = profile?.name ? profile.name.split(" ")[0] : "Student";

  return (
    <div className="p-md md:p-xl max-w-container-max mx-auto w-full">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-lg mb-xl">
        <div className="flex-1">
          <h1 className="text-headline-lg font-headline-lg text-on-surface mb-sm">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Let's get you ready for your next big interview.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant flex items-center gap-xl w-full lg:w-auto shrink-0">
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between items-end mb-xs">
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                Level {level}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {currentXp} / {nextLevelXp} XP
              </span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary-container rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
          <div className="w-px h-10 bg-outline-variant mx-2"></div>

          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div>
              <div className="text-headline-md font-headline-md text-tertiary">0</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Day Streak
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        <section className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg mb-md">
          <Link
            to="/interview"
            className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined">
                video_chat
              </span>
            </div>
            <div>
              <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                Start Interview
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                Mock with AI or Peers
              </p>
            </div>
          </Link>

          <Link
            to="/quizzes"
            className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined">
                quiz
              </span>
            </div>
            <div>
              <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                Take a Quiz
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                Test your knowledge
              </p>
            </div>
          </Link>

          <Link
            to="/live"
            className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined">
                live_tv
              </span>
            </div>
            <div>
              <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                Join Live Class
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                Starting in 15 mins
              </p>
            </div>
          </Link>

          <Link
            to="/arena"
            className="group bg-surface-container-lowest p-lg rounded-[16px] shadow-sm hover:shadow-md border border-outline-variant hover:border-primary-container transition-all flex flex-col items-start gap-md relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined">
                sports_esports
              </span>
            </div>
            <div>
              <h3 className="text-body-lg font-body-lg font-semibold text-on-surface">
                Open Arena
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                Compete globally
              </p>
            </div>
          </Link>
        </section>

        <section className="md:col-span-7 bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant p-lg flex flex-col">
          <div className="flex justify-between items-center mb-md pb-sm border-b border-surface-container-highest">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">
                checklist
              </span>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Today's Mission
              </h2>
            </div>
            <span className="bg-surface-variant text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded-md">
              1/3 Completed
            </span>
          </div>
          <div className="flex flex-col gap-sm flex-1">
            <label className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0 mt-[2px]">
                <input
                  checked
                  readOnly
                  className="peer appearance-none w-5 h-5 border border-outline-variant rounded bg-surface-container-lowest checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer"
                  type="checkbox"
                />
                <span className="material-symbols-outlined absolute text-on-primary-container text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100">
                  check
                </span>
              </div>
              <div className="flex-1">
                <p className="font-body-md text-body-md text-on-surface-variant line-through group-hover:text-on-surface transition-colors">
                  Solve 2 DSA problems
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-1">+50 XP</p>
              </div>
            </label>

            <label className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group border-l-[3px] border-secondary-container pl-[9px]">
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
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  Complete 1 Mock Interview
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-1">+150 XP</p>
              </div>
              <button className="px-3 py-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded hover:bg-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100">
                Start
              </button>
            </label>

            <label className="flex items-start gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group pl-3">
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
                <p className="font-body-md text-body-md text-on-surface">
                  Attend "System Design Basics" Live Class
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-1">
                  Starts at 4:00 PM • +100 XP
                </p>
              </div>
            </label>
          </div>
        </section>

        <section className="md:col-span-5 bg-surface-container-lowest rounded-[16px] shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05),0_2px_4px_-2px_rgb(0,0,0,0.05)] border border-outline-variant p-lg flex flex-col">
          <div className="flex justify-between items-center mb-md pb-sm border-b border-surface-container-highest">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">
                school
              </span>
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Enrolled Topics
              </h2>
            </div>
            <button className="text-primary hover:text-on-primary-fixed-variant p-1 rounded-full hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">
                more_horiz
              </span>
            </button>
          </div>
          
          {enrolledTopics.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-md">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <h3 className="font-body-lg text-on-surface mb-xs">No topics yet</h3>
              <p className="font-body-md text-on-surface-variant text-sm">You haven't enrolled in any topics.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-md flex-1 items-center justify-center py-sm">
              {enrolledTopics.slice(0, 2).map((topic, i) => {
                const colors = i === 0 
                  ? "text-primary-container" 
                  : "text-secondary-container";
                const percentage = i === 0 ? 75 : 40;
                
                return (
                  <div key={topic.id || i} className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-sm">
                      <svg
                        className={`circular-chart ${colors} w-full h-full drop-shadow-sm`}
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle stroke-current"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          strokeDasharray={`${percentage}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-headline-md text-body-lg font-bold text-on-surface">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    <h3 className="font-body-md text-body-md font-medium text-on-surface truncate w-full px-2">
                      {topic.title}
                    </h3>
                    <span className={`font-label-sm text-label-sm mt-1 px-2 py-0.5 rounded ${
                      i === 0 
                        ? "bg-primary-fixed/30 text-primary" 
                        : "bg-surface-container-highest text-on-surface-variant"
                    }`}>
                      {i === 0 ? "Advanced" : "Intermediate"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          
          <button className="w-full mt-md py-2 border border-outline-variant rounded-lg font-body-md text-body-md text-primary hover:bg-surface-container-low transition-colors font-medium">
            View All Topics
          </button>
        </section>
      </div>
    </div>
  );
}
