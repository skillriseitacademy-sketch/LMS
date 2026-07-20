import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/leaderboard")({
  component: LeaderboardPage,
});

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";

function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const { session } = useAuth();
  
  useEffect(() => {
    async function load() {
      // Get profiles and sum xp transactions
      const { data } = await supabase.from('profiles').select('*, xp_transactions(amount)');
      if (data) {
        const withXp = data.map((u: any) => ({
          ...u,
          xp: u.xp_transactions ? u.xp_transactions.reduce((acc: number, t: any) => acc + t.amount, 0) : 0
        })).sort((a: any, b: any) => b.xp - a.xp);
        setUsers(withXp);
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="flex-1 w-full max-w-container-max mx-auto p-4 md:p-8 flex flex-col gap-8">
        {/* Header & Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2
              className="text-[32px] md:text-[40px] font-bold leading-[1.2] tracking-[-0.01em] text-on-surface"
              style={{ fontFamily: "Manrope" }}
            >
              Arena Leaderboard
            </h2>
            <p
              className="text-on-surface-variant mt-2 text-base leading-[1.5]"
              style={{ fontFamily: "Inter" }}
            >
              Compete, earn XP, and secure top placement rankings.
            </p>
          </div>
          <div className="flex bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30 shadow-sm self-start">
            <button
              className="px-4 py-1.5 rounded-md text-sm font-semibold bg-primary text-on-primary shadow-sm transition-all"
              style={{ fontFamily: "Inter" }}
            >
              Weekly
            </button>
            <button
              className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-all"
              style={{ fontFamily: "Inter" }}
            >
              Monthly
            </button>
            <button
              className="px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-all"
              style={{ fontFamily: "Inter" }}
            >
              All-Time
            </button>
          </div>
        </div>

        {/* Podium Section */}
        <div className="pt-8 pb-4">
          <div className="flex justify-center items-end gap-2 md:gap-8 h-64">
            {/* 2nd Place */}
            {users[1] && (
              <div className="flex flex-col items-center relative z-10 w-24 md:w-32 group">
                <div className="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <img
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-surface object-cover avatar-glow-2 z-10 relative shadow-[0_0_20px_rgba(71,85,105,0.4)]"
                    src={users[1].avatar_url || `https://ui-avatars.com/api/?name=${users[1].first_name}+${users[1].last_name}&background=random`}
                    alt="2nd Place"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface text-on-surface font-bold text-xs px-2 py-0.5 rounded-full border border-outline-variant shadow-sm z-20">
                    #2
                  </div>
                </div>
                <div className="w-full h-24 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-xl flex flex-col items-center justify-start pt-4 shadow-inner relative overflow-hidden border border-slate-300 border-b-0">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM0NzU1NjkiLz48L3N2Zz4=')]"></div>
                  <span
                    className="text-[24px] font-semibold leading-[1.3] text-sm md:text-base text-slate-800 relative z-10 text-center truncate w-full px-2"
                    style={{ fontFamily: "Manrope" }}
                  >
                    {users[1].first_name} {users[1].last_name?.charAt(0)}.
                  </span>
                  <span
                    className="text-xs tracking-[0.05em] font-medium text-slate-600 relative z-10 mt-1"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    {users[1].xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {users[0] && (
              <div className="flex flex-col items-center relative z-20 w-28 md:w-40 group -mb-4">
                <div className="absolute -top-12 text-secondary animate-bounce">
                  <span className="material-symbols-outlined text-4xl">workspace_premium</span>
                </div>
                <div className="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <img
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-surface object-cover avatar-glow-1 z-10 relative shadow-[0_0_25px_rgba(217,119,6,0.6)]"
                    src={users[0].avatar_url || `https://ui-avatars.com/api/?name=${users[0].first_name}+${users[0].last_name}&background=random`}
                    alt="1st Place"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-white font-black text-sm md:text-base px-4 py-1 rounded-full border-2 border-surface shadow-md z-20">
                    #1
                  </div>
                </div>
                <div className="w-full h-36 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-xl flex flex-col items-center justify-start pt-6 shadow-inner relative overflow-hidden border border-amber-300 border-b-0">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNkOTc3MDYiLz48L3N2Zz4=')]"></div>
                  <span
                    className="text-[24px] font-semibold leading-[1.3] text-base md:text-lg text-amber-900 relative z-10 text-center truncate w-full px-2"
                    style={{ fontFamily: "Manrope" }}
                  >
                    {users[0].first_name} {users[0].last_name?.charAt(0)}.
                  </span>
                  <span
                    className="text-xs tracking-[0.05em] font-bold text-amber-700 relative z-10 mt-1"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    {users[0].xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {users[2] && (
              <div className="flex flex-col items-center relative z-10 w-24 md:w-32 group">
                <div className="relative mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <img
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-surface object-cover avatar-glow-3 z-10 relative shadow-[0_0_15px_rgba(194,65,12,0.4)]"
                    src={users[2].avatar_url || `https://ui-avatars.com/api/?name=${users[2].first_name}+${users[2].last_name}&background=random`}
                    alt="3rd Place"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface text-on-surface font-bold text-xs px-2 py-0.5 rounded-full border border-outline-variant shadow-sm z-20">
                    #3
                  </div>
                </div>
                <div className="w-full h-20 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-xl flex flex-col items-center justify-start pt-3 shadow-inner relative overflow-hidden border border-orange-300 border-b-0">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNjMjQxMGMiLz48L3N2Zz4=')]"></div>
                  <span
                    className="text-[24px] font-semibold leading-[1.3] text-sm md:text-base text-orange-900 relative z-10 text-center truncate w-full px-2"
                    style={{ fontFamily: "Manrope" }}
                  >
                    {users[2].first_name} {users[2].last_name?.charAt(0)}.
                  </span>
                  <span
                    className="text-xs tracking-[0.05em] font-medium text-orange-700 relative z-10 mt-1"
                    style={{ fontFamily: "JetBrains Mono" }}
                  >
                    {users[2].xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-surface/50 backdrop-blur-md rounded-[24px] shadow-[0_8px_32px_rgb(0,0,0,0.04)] border border-outline-variant/40 overflow-hidden flex flex-col">
          {/* Table Filters */}
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
              <span className="font-medium" style={{ fontFamily: "Inter" }}>
                CS Majors
              </span>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="bg-surface-container-lowest text-on-surface-variant text-xs tracking-[0.05em] uppercase border-b border-outline-variant/30"
                  style={{ fontFamily: "JetBrains Mono" }}
                >
                  <th className="p-4 font-medium w-16 text-center">Rank</th>
                  <th className="p-4 font-medium">Student</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Recent Activity</th>
                  <th className="p-4 font-medium text-right">Total XP</th>
                </tr>
              </thead>
              <tbody
                className="text-sm text-base leading-[1.5] divide-y divide-outline-variant/20"
                style={{ fontFamily: "Inter" }}
              >
                {users.slice(3).map((u, i) => (
                  <tr key={u.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 text-center font-bold text-on-surface-variant">{i + 4}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {u.avatar_url ? (
                          <img src={u.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-surface-variant text-primary flex items-center justify-center font-bold text-xs">
                            {u.first_name?.[0]}{u.last_name?.[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-on-surface">{u.first_name} {u.last_name}</div>
                          <div className="text-xs text-on-surface-variant/70">{u.college || "University"}</div>
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
                    <td
                      className="p-4 text-right text-xs tracking-[0.05em] font-bold text-secondary"
                      style={{ fontFamily: "JetBrains Mono" }}
                    >
                      {u.xp.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {users.length <= 3 && (
                   <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No other players found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sticky User Rank Bar (Desktop) */}
      <div className="hidden md:block sticky bottom-0 w-full bg-primary text-on-primary border-t border-primary-container shadow-[0_-8px_30px_rgb(53,37,205,0.2)] z-30">
        <div className="max-w-container-max mx-auto px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center font-bold text-[24px] font-semibold leading-[1.3]"
              style={{ fontFamily: "Manrope" }}
            >
              #42
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ fontFamily: "Inter" }}>
                Your Current Rank
              </div>
              <div className="text-xs text-on-primary/80" style={{ fontFamily: "Inter" }}>
                Top 5% of Global CS Students
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div
                className="text-xs tracking-[0.05em] font-bold text-secondary-fixed"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                8,450 XP
              </div>
              <div className="text-xs text-on-primary/80" style={{ fontFamily: "Inter" }}>
                450 XP to rank up
              </div>
            </div>
            <div className="w-32 h-2 bg-black/20 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-secondary-fixed rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Rank (Sits above nav) */}
      <div className="md:hidden fixed bottom-[72px] left-0 w-full bg-primary text-on-primary py-2 px-4 z-40 shadow-[0_-4px_10px_rgb(53,37,205,0.2)] flex items-center justify-between mb-safe">
        <div className="flex items-center gap-3">
          <div
            className="font-bold text-[24px] font-semibold leading-[1.3] text-lg"
            style={{ fontFamily: "Manrope" }}
          >
            #42
          </div>
          <div className="text-xs leading-tight">
            <div className="font-semibold">Your Rank</div>
            <div className="text-on-primary/80">8,450 XP</div>
          </div>
        </div>
        <div className="w-20 h-1.5 bg-black/20 rounded-full overflow-hidden">
          <div className="w-[85%] h-full bg-secondary-fixed rounded-full"></div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant flex justify-around items-center h-[72px] pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span
            className="text-[10px] tracking-[0.05em] font-medium"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Home
          </span>
        </Link>
        <Link
          to="/jobs"
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
        >
          <span className="material-symbols-outlined">work</span>
          <span
            className="text-[10px] tracking-[0.05em] font-medium"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Jobs
          </span>
        </Link>
        {/* Active */}
        <Link
          to="/leaderboard"
          aria-current="page"
          className="flex flex-col items-center justify-center w-16 h-full text-primary relative gap-1"
        >
          <div className="absolute -top-4 bg-surface-container-lowest p-1 rounded-full border border-outline-variant shadow-sm">
            <div className="bg-primary/10 rounded-full p-2">
              <span className="material-symbols-outlined" data-weight="fill">
                leaderboard
              </span>
            </div>
          </div>
          <span
            className="text-[10px] tracking-[0.05em] font-bold mt-6"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Rank
          </span>
        </Link>
        <Link
          to="/arena"
          className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-on-surface transition-colors gap-1"
        >
          <span className="material-symbols-outlined">sports_esports</span>
          <span
            className="text-[10px] tracking-[0.05em] font-medium"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            Arena
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
