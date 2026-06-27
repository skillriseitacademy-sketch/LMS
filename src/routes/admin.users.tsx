import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus } from "lucide-react";
import { leaderboard, newUsers, onlineUsers } from "@/lib/mock-data";
import { useProfile } from "@/lib/store";

type Filter = "all" | "online" | "new";

type AdminUsersSearch = { filter?: Filter; period?: string };

export const Route = createFileRoute("/admin/users")({
  validateSearch: (s: Record<string, unknown>): AdminUsersSearch => ({
    filter: (s.filter as Filter) || "all",
    period: (s.period as string) || undefined,
  }),
  head: () => ({ meta: [{ title: "Users — Admin · PlacePro LMS" }] }),
  component: Users,
});

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "online", label: "Online" },
  { id: "new", label: "New (last 7 days)" },
];

function Users() {
  const search = useSearch({ from: "/admin/users" });
  const [filter, setFilter] = useState<Filter>(search.filter || "all");
  const [query, setQuery] = useState("");
  const { profile } = useProfile();

  const users = useMemo(() => {
    const onlineNames = new Set(onlineUsers.map((u) => u.name));
    const newNames = new Set(newUsers.map((u) => u.name));
    const base = leaderboard.map((u) => {
      const isYou = u.name.includes("(You)");
      return {
        name: isYou ? profile.name : u.name,
        initials: isYou ? profile.initials : u.initials,
        xp: u.xp,
        level: u.level,
        isOnline: onlineNames.has(u.name),
        isNew: newNames.has(u.name),
      };
    });
    // Stitch in additional users from new/online lists not on leaderboard
    [...newUsers, ...onlineUsers].forEach((u) => {
      if (!base.some((b) => b.name === u.name)) {
        base.push({
          name: u.name,
          initials: u.initials,
          xp: Math.round(200 + Math.random() * 1500),
          level: Math.round(1 + Math.random() * 8),
          isOnline: onlineNames.has(u.name),
          isNew: newNames.has(u.name),
        });
      }
    });
    return base
      .filter((u) => (filter === "online" ? u.isOnline : filter === "new" ? u.isNew : true))
      .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  }, [filter, query]);

  return (
    <>
      <TopBar breadcrumb={["Admin", "Users"]} />
      <div className="p-4 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-display text-2xl font-bold">Users</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {search.period ? `Showing data for the last ${search.period}. ` : ""}
              {users.length} students match your filters.
            </p>
          </div>
          <button className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground">
            <UserPlus className="h-3.5 w-3.5" /> Invite student
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students…"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex gap-1 rounded-full border border-border bg-card p-1 text-xs">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={f.id === filter ? "rounded-full bg-foreground px-3 py-1.5 font-semibold text-background" : "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground"}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 w-24">Status</th>
                <th className="px-4 py-3 w-20 text-right">Level</th>
                <th className="px-4 py-3 w-24 text-right">XP</th>
                <th className="px-4 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.name} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-brand-light text-brand-dark text-xs font-semibold">{u.initials}</AvatarFallback>
                        </Avatar>
                        {u.isOnline && <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-card bg-success" />}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {u.isOnline ? (
                      <span className="rounded-md bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">Online</span>
                    ) : u.isNew ? (
                      <span className="rounded-md bg-card-blue px-2 py-0.5 text-[10px] font-semibold text-brand-dark">New</span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Offline</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{u.level}</td>
                  <td className="px-4 py-3 text-right font-display font-bold">{u.xp.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-full border border-border px-3 py-1 text-[11px] hover:bg-muted">Contact</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">No users match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
