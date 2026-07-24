import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, UserPlus, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase, createUserAdmin } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/admin/teachers")({
  head: () => ({ meta: [{ title: "Teachers — Admin · PlacePro LMS" }] }),
  component: Teachers,
});

type TeacherWithProfile = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  specialization: string[] | null;
  is_approved: boolean;
};

function Teachers() {
  const [teachers, setTeachers] = useState<TeacherWithProfile[]>([]);
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

  const fetchTeachers = async () => {
    setLoading(true);
    // Fetch profiles where role = 'teacher'
    const { data: profiles, error: pError } = await supabase
      .from("profiles")
      .select("id, name, email, avatar_url")
      .eq("role", "teacher");

    if (pError || !profiles) {
      console.error(pError);
      setLoading(false);
      return;
    }

    const ids = profiles.map((p) => p.id);
    if (ids.length === 0) {
      setTeachers([]);
      setLoading(false);
      return;
    }

    // Fetch teacher details
    const { data: details, error: tError } = await supabase
      .from("teachers")
      .select("id, bio, specialization, is_approved")
      .in("id", ids);

    if (tError) {
      console.error(tError);
    }

    const combined: TeacherWithProfile[] = profiles.map((p) => {
      const d = details?.find((x) => x.id === p.id);
      return {
        id: p.id,
        name: p.name,
        email: p.email,
        avatar_url: p.avatar_url,
        bio: d?.bio || null,
        specialization: d?.specialization || null,
        is_approved: d?.is_approved || false,
      };
    });

    setTeachers(combined);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setInviteError("");
    setInviteSuccess("");

    try {
      const { user, error } = await createUserAdmin({
        email: inviteEmail,
        password: invitePassword,
        role: "teacher",
        name: inviteName,
      });

      if (error) {
        throw new Error(error);
      }

      setInviteSuccess("Teacher created successfully!");
      setInviteName("");
      setInviteEmail("");
      setInvitePassword("");
      
      fetchTeachers();
      
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

  const toggleApproval = async (id: string, currentlyApproved: boolean) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    // We either insert or update the teacher row
    const { error } = await supabase.from("teachers").upsert({
      id: id,
      is_approved: !currentlyApproved,
      approved_by: !currentlyApproved ? session.user.id : null,
    });

    if (!error) {
      setTeachers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_approved: !currentlyApproved } : t)),
      );
    }
  };

  return (
    <>
      <TopBar breadcrumb={["Admin", "Teachers"]} />
      <div className="p-4 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-display text-2xl font-bold">Teacher Approvals</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage teacher accounts. Unapproved teachers cannot create live classes or courses.
            </p>
          </div>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:opacity-90">
                <UserPlus className="h-3.5 w-3.5" /> Create teacher
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new teacher</DialogTitle>
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

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 w-32">Status</th>
                <th className="px-4 py-3 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading &&
                teachers.map((t) => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {t.avatar_url ? (
                            <img
                              src={t.avatar_url}
                              alt={t.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <AvatarFallback className="bg-brand-light text-brand-dark text-xs font-semibold">
                              {t.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="font-medium">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.email}</td>
                    <td className="px-4 py-3">
                      {t.is_approved ? (
                        <span className="rounded-md bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                          Approved
                        </span>
                      ) : (
                        <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleApproval(t.id, t.is_approved)}
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] transition-colors ${
                          t.is_approved
                            ? "border-destructive text-destructive hover:bg-destructive/10"
                            : "border-success text-success hover:bg-success/10"
                        }`}
                      >
                        {t.is_approved ? (
                          <>
                            <X className="h-3 w-3" /> Revoke
                          </>
                        ) : (
                          <>
                            <Check className="h-3 w-3" /> Approve
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              {!loading && teachers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No teachers found.
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
