import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/teachers")({
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
        <div className="mb-5">
          <h1 className="text-display text-2xl font-bold">Teacher Approvals</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage teacher accounts. Unapproved teachers cannot create live classes or courses.
          </p>
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
