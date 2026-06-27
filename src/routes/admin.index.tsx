import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import {
  Users2, MessageSquare, ShoppingBag, Clock, DollarSign, Activity, ChevronRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { computeKpis, newUsers, onlineUsers, events, blogs, type Period } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — PlacePro LMS" }] }),
  component: AdminDashboard,
});

const iconForKpi = (label: string) => {
  if (label.includes("User")) return Users2;
  if (label.includes("Conversations")) return MessageSquare;
  if (label.includes("signups")) return ShoppingBag;
  if (label.includes("time")) return Clock;
  if (label.includes("Revenue")) return DollarSign;
  return Activity;
};

const periods: { id: Period; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
];

const tabs = ["New signups", "Revenue", "Product sales", "Active learners"] as const;
type Tab = typeof tabs[number];

const tabKeyMap: Record<Tab, "value" | "revenue" | "learners"> = {
  "New signups": "value",
  "Revenue": "revenue",
  "Product sales": "value",
  "Active learners": "learners",
};

function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("7d");
  const [tab, setTab] = useState<Tab>("New signups");
  const { series, kpis } = useMemo(() => computeKpis(period), [period]);
  const dataKey = tabKeyMap[tab];
  const navigate = useNavigate();

  return (
    <>
      <TopBar breadcrumb={["Home", "Dashboard"]} />
      <div className="p-4 md:p-6">
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-display text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Gain real-time insights into your school's analytics and activities.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-full border border-border bg-card p-1 text-xs">
              {periods.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={p.id === period ? "rounded-full bg-foreground px-3 py-1.5 font-semibold text-background" : "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground"}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
              Create Course
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* KPIs */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {kpis.map((k) => {
                  const Icon = iconForKpi(k.label);
                  let filterType: "all" | "new" | "online" = "all";
                  if (k.label.includes("signups") || k.label.includes("New")) filterType = "new";
                  if (k.label.includes("Active") || k.label.includes("Online")) filterType = "online";
                  return (
                    <button 
                      key={k.label} 
                      onClick={() => navigate({ to: "/admin/users", search: { period, filter: filterType } })}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition hover:border-brand/40 text-left w-full cursor-pointer"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{k.label}</div>
                        <div className="text-display text-lg font-bold">{k.value}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center gap-4 border-b border-border pb-3 text-sm">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={t === tab ? "border-b-2 border-foreground pb-2 font-semibold" : "pb-2 text-muted-foreground hover:text-foreground"}
                  >
                    {t}
                  </button>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">Latest Activity</span>
              </div>
              <div className="h-64 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                    <Tooltip
                      cursor={{ fill: "var(--muted)" }}
                      contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--foreground)", color: "var(--background)", fontSize: 12 }}
                      labelStyle={{ color: "var(--background)", opacity: 0.7 }}
                      formatter={(v: number) => [tab === "Revenue" ? `$${v}` : v, tab]}
                    />
                    <Bar 
                      dataKey={dataKey} 
                      fill="var(--brand)" 
                      radius={[8, 8, 0, 0]} 
                      maxBarSize={48}
                      onClick={() => navigate({ to: "/admin/users", search: { period, filter: tab === "Active learners" ? "online" : tab === "New signups" ? "new" : "all" } })}
                      style={{ cursor: "pointer" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-display text-sm font-semibold">How to sell Courses blog</h3>
                  <button className="text-xs text-muted-foreground hover:text-foreground">See All</button>
                </div>
                <ul className="space-y-3">
                  {blogs.map((b) => (
                    <li key={b.title} className={`border-l-2 ${b.color} pl-3`}>
                      <div className="flex items-start gap-2">
                        <p className="flex-1 text-sm">{b.title}</p>
                        {b.new && <span className="rounded-md bg-card-blue px-2 py-0.5 text-[10px] font-semibold text-brand-dark">New</span>}
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{b.days}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-display text-sm font-semibold">Events Log</h3>
                  <button className="text-xs text-muted-foreground hover:text-foreground">See All</button>
                </div>
                <ul className="space-y-2">
                  {events.map((e, i) => (
                    <li key={i} className="flex items-center gap-3 rounded-xl border border-border p-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-xs">{e.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{e.name}</span>
                          <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${e.tone === "success" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                            {e.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{e.time}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-display text-sm font-semibold">Users</h3>
              <button className="text-xs text-muted-foreground hover:text-foreground">See All</button>
            </div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">New User</p>
            <ul className="space-y-2">
              {newUsers.map((u, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-brand-light text-brand-dark text-xs font-semibold">{u.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{u.name}</div>
                    <div className="text-[11px] text-muted-foreground">{u.time}</div>
                  </div>
                  <button className="rounded-full border border-border px-3 py-1 text-[11px] hover:bg-muted">Contact</button>
                </li>
              ))}
            </ul>
            <p className="mb-2 mt-5 text-xs font-semibold text-muted-foreground">Online Users</p>
            <ul className="space-y-2">
              {onlineUsers.map((u, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-muted text-xs">{u.initials}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{u.name}</div>
                    <div className="text-[11px] text-muted-foreground">{u.time}</div>
                  </div>
                  <button className="rounded-full border border-border px-3 py-1 text-[11px] hover:bg-muted">Contact</button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
