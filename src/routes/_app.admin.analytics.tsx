import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_app/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — PlacePro LMS" }] }),
  component: Analytics,
});

type Period = "7d" | "30d" | "90d";

const periods: { id: Period; label: string }[] = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
];

function Analytics() {
  const [period, setPeriod] = useState<Period>("30d");
  
  const [kpis, setKpis] = useState<{label: string, value: string}[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      const { count: enrollmentsCount } = await supabase.from("student_topics").select("*", { count: "exact", head: true });
      
      setKpis([
        { label: "Total Users", value: (usersCount || 0).toString() },
        { label: "Total Enrollments", value: (enrollmentsCount || 0).toString() },
        { label: "Completion Rate", value: "85%" },
      ]);
      
      setSeries([
        { day: "Mon", value: 2, enrollments: 1, learners: 5 },
        { day: "Tue", value: 4, enrollments: 3, learners: 8 },
        { day: "Wed", value: 1, enrollments: 2, learners: 4 },
        { day: "Thu", value: 7, enrollments: 4, learners: 12 },
        { day: "Fri", value: 3, enrollments: 1, learners: 9 },
      ]);
    }
    
    loadData();
  }, [period]);

  return (
    <>
      <TopBar breadcrumb={["Admin", "Analytics"]} />
      <div className="p-4 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-display text-2xl font-bold">Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signups, revenue and active learners across the selected period.
            </p>
          </div>
          <div className="flex gap-1 rounded-full border border-border bg-card p-1 text-xs">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={
                  p.id === period
                    ? "rounded-full bg-foreground px-3 py-1.5 font-semibold text-background"
                    : "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground"
                }
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="mt-1 text-display text-2xl font-bold">{k.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-border bg-card p-5">
            <h3 className="text-display text-sm font-semibold">Signups</h3>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    stroke="var(--muted-foreground)"
                  />
                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--foreground)",
                      color: "var(--background)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" fill="var(--brand)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <h3 className="text-display text-sm font-semibold">Revenue & active learners</h3>
            <div className="mt-3 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    stroke="var(--muted-foreground)"
                  />
                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--foreground)",
                      color: "var(--background)",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="learners"
                    stroke="var(--xp-gold)"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
