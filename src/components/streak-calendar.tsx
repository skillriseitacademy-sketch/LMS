import { Flame, Sparkles } from "lucide-react";

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const active = new Set([11, 12, 13]);
const today = 14;

export function StreakCalendar() {
  return (
    <div className="p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-display text-base font-semibold">Streak Calendar</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Complete practical tasks every day<br />to increase your streak
          </p>
        </div>
        <button className="text-xs font-medium text-foreground hover:underline">View</button>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Flame className="h-3 w-3" /> Current streak
          </div>
          <div className="mt-1 text-display text-lg font-bold">3 <span className="text-xs font-medium text-muted-foreground">days</span></div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Flame className="h-3 w-3 text-streak" fill="currentColor" /> Longest streak
          </div>
          <div className="mt-1 text-display text-lg font-bold">28 <span className="text-xs font-medium text-muted-foreground">days</span></div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-3">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const isActive = active.has(d);
            const isToday = d === today;
            return (
              <div
                key={d}
                className={[
                  "flex aspect-square items-center justify-center rounded-full text-xs",
                  isActive ? "bg-streak/15 text-streak font-semibold" : "text-foreground/80",
                  isToday ? "ring-2 ring-streak" : "",
                ].join(" ")}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 rounded-xl border border-border bg-card divide-x divide-border">
        {[
          ["Days", "22"],
          ["Lessons", "36"],
          ["Quizzes", "18"],
          ["Minutes", "231"],
        ].map(([k, v]) => (
          <div key={k} className="p-2 text-center">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{k}</div>
            <div className="text-display text-sm font-bold">{v}</div>
          </div>
        ))}
      </div>

      <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-brand hover:underline">
        <Sparkles className="h-3 w-3" /> 2 insights available
      </button>
    </div>
  );
}
