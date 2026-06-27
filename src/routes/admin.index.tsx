import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { Users2, MessageSquare, ShoppingBag, Clock, BookOpen, LayoutGrid, ChevronRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — PlacePro LMS" }] }),
  component: AdminDashboard,
});

const kpis = [
  { label: "All Users", value: "200", icon: Users2 },
  { label: "Conversations", value: "30.10k", icon: MessageSquare },
  { label: "30 days sales", value: "80", icon: ShoppingBag },
  { label: "Avg time", value: "50m", icon: Clock },
  { label: "Courses", value: "12", icon: BookOpen },
  { label: "Categories", value: "05", icon: LayoutGrid },
];

const chart = [
  { day: "10 Nov", value: 2 },
  { day: "11 Nov", value: 3 },
  { day: "12 Nov", value: 2.5 },
  { day: "13 Nov", value: 2 },
  { day: "14 Nov", value: 1.8 },
  { day: "15 Nov", value: 2.2 },
  { day: "16 Nov", value: 1.6 },
];

const newUsers = [
  { name: "James Brown", time: "2 days", initials: "JB" },
  { name: "Tony Stark", time: "2 days", initials: "TS" },
  { name: "James Brown", time: "2 days", initials: "JB" },
  { name: "Mike Banner", time: "2 days", initials: "MB" },
];

const online = [
  { name: "Sophia Williams", time: "Join 3 months ago", initials: "SW" },
  { name: "Arthur Taylor", time: "Join 4 months ago", initials: "AT" },
  { name: "David Smith", time: "Join 4 months ago", initials: "DS" },
  { name: "Harry Potter", time: "Join 4 months ago", initials: "HP" },
  { name: "Frank Gary", time: "Join 4 months ago", initials: "FG" },
];

const events = [
  { name: "Mike Banner", status: "Logged In", tone: "success", time: "2 hours ago" },
  { name: "Nina Smith", status: "Logged Out", tone: "danger", time: "10 hours ago" },
  { name: "Alex Simitsis", status: "Logged In", tone: "success", time: "12 hours ago" },
  { name: "Tony Stark", status: "Logged Out", tone: "danger", time: "15 hours ago" },
];

const blogs = [
  { title: "How to Sell Online Course On Your Shopify Store", new: true, days: "2 days ago", color: "bg-success" },
  { title: "16 Canva Black Friday templates for online course creators", new: true, days: "2 days ago", color: "bg-brand" },
  { title: "The 14-Step Checklist to Prepare Your Online School For Black Friday", days: "2 days ago", color: "bg-muted-foreground" },
  { title: "From Emergency Remote Training to Long Team Effective & Profitable Online Learning", days: "2 days ago", color: "bg-muted-foreground" },
];

function AdminDashboard() {
  return (
    <>
      <TopBar breadcrumb={["Home", "Dashboard"]} />
      <div className="p-4 md:p-6">
        <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-display text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Gain real-time insights into your school's analytics and activities.</p>
          </div>
          <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm hover:opacity-90">
            Create Course
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* KPIs */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {kpis.map((k) => (
                  <div key={k.label} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
                      <k.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{k.label}</div>
                      <div className="text-display text-lg font-bold">{k.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center gap-4 border-b border-border pb-3 text-sm">
                {["New signups", "Revenue", "Product sales", "Active learners"].map((t, i) => (
                  <button key={t} className={i === 0 ? "border-b-2 border-foreground pb-2 font-semibold" : "pb-2 text-muted-foreground"}>
                    {t}
                  </button>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">Latest Activity</span>
              </div>
              <div className="h-64 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
                    <Tooltip
                      cursor={{ fill: "var(--muted)" }}
                      contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--foreground)", color: "var(--background)" }}
                    />
                    <Bar dataKey="value" fill="var(--brand)" radius={[8, 8, 0, 0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom row */}
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

          {/* Users panel */}
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
              {online.map((u, i) => (
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
