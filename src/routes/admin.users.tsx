import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Loader2, Eye, EyeOff } from "lucide-react";
import { useProfile } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Invite state
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    const { data: profs } = await supabase
      .from("profiles")
      .select("id, name, avatar_url, created_at, role, email")
      .eq("role", "student")
      .order("created_at", { ascending: false });
      
    const { data: xpData } = await supabase.from("xp_transactions").select("user_id, amount");
    
    const xpMap = new Map();
    for (const x of xpData || []) {
      xpMap.set(x.user_id, (xpMap.get(x.user_id) || 0) + x.amount);
    }
      
    if (profs) {
      const enriched = profs.map(p => {
        const isNew = new Date(p.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
        const xp = xpMap.get(p.id) || 0;
        return {
          id: p.id,
          name: p.name,
          email: p.email,
          initials: p.name.substring(0, 2).toUpperCase(),
          avatar_url: p.avatar_url,
          xp: xp,
          level: Math.floor(xp / 200) + 1,
          isOnline: false, // Needs realtime presence to be accurate
          isNew: isNew
        };
      });
      setProfiles(enriched);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setInviteError("");
    setInviteSuccess("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email: inviteEmail,
          password: invitePassword,
          name: inviteName,
          role: "student",
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text);
      }

      setInviteSuccess("Student created successfully!");
      setInviteName("");
      setInviteEmail("");
      setInvitePassword("");
      
      loadUsers();
      
      setTimeout(() => {
        setInviteOpen(false);
        setInviteSuccess("");
      }, 2000);
    } catch (err: any) {
      setInviteError(err.message);
    } finally {
      setInviting(false);
    }
  };

  const users = profiles
    .filter((u) => (filter === "online" ? u.isOnline : filter === "new" ? u.isNew : true))
    .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <TopBar breadcrumb={["Admin", "Users"]} />
      <div className="p-4 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-display text-2xl font-bold">Users</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {search.period
                ? `Showing data for the last ${search.period.replace("d", " days")}. `
                : ""}
              {users.length} students match your filters.
            </p>
          </div>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:opacity-90">
                <UserPlus className="h-3.5 w-3.5" /> Create student
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new student</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleInvite} className="mt-4 space-y-4">
                {inviteError && (
                  <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                    {inviteError}
                  </div>
                )}
                {inviteSuccess && (
                  <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700 border border-green-200">
                    {inviteSuccess}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Name</label>
                  <input
                    required
                    type="text"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Email address</label>
                  <input
                    required
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={invitePassword}
                      onChange={(e) => setInvitePassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button
                  disabled={inviting}
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50"
                >
                  {inviting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {inviting ? "Creating..." : "Create account"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
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
                className={
                  f.id === filter
                    ? "rounded-full bg-foreground px-3 py-1.5 font-semibold text-background"
                    : "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground"
                }
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
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                  </td>
                </tr>
              )}
              {!loading && users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          {u.avatar_url ? (
                            <img
                              src={u.avatar_url}
                              alt={u.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <AvatarFallback className="bg-brand-light text-brand-dark text-xs font-semibold">
                              {u.initials}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        {u.isOnline && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-card bg-success" />
                        )}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {u.isOnline ? (
                      <span className="rounded-md bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                        Online
                      </span>
                    ) : u.isNew ? (
                      <span className="rounded-md bg-card-blue px-2 py-0.5 text-[10px] font-semibold text-brand-dark">
                        New
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Offline</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{u.level}</td>
                  <td className="px-4 py-3 text-right font-display font-bold">
                    {u.xp.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-full border border-border px-3 py-1 text-[11px] hover:bg-muted">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No users match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
