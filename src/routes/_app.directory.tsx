import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import { Search, UserPlus, UserCheck, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/directory")({
  component: DirectoryPage,
});

function DirectoryPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);

      if (user) {
        // Fetch students and follow requests
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, name, username, avatar_url, title, xp")
          .eq("role", "student")
          .neq("id", user.id);

        const { data: requests } = await supabase
          .from("follow_requests")
          .select("*")
          .or(`requester_id.eq.${user.id},target_id.eq.${user.id}`);

        if (profiles) {
          const formatted = profiles.map((p) => {
            const req = requests?.find(
              (r) =>
                (r.requester_id === user.id && r.target_id === p.id) ||
                (r.target_id === user.id && r.requester_id === p.id)
            );
            return {
              ...p,
              connectionStatus: req?.status || "none",
              isRequester: req?.requester_id === user.id,
              requestId: req?.id,
            };
          });
          setStudents(formatted);
        }
      }
    }
    loadData();
  }, []);

  const handleConnect = async (targetId: string) => {
    if (!currentUser) return;
    const { error } = await supabase.from("follow_requests").insert([
      {
        requester_id: currentUser.id,
        target_id: targetId,
        status: "pending",
      },
    ]);
    if (!error) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === targetId
            ? { ...s, connectionStatus: "pending", isRequester: true }
            : s
        )
      );
    }
  };

  const handleAccept = async (requestId: string, targetId: string) => {
    const { error } = await supabase
      .from("follow_requests")
      .update({ status: "accepted" })
      .eq("id", requestId);
    if (!error) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === targetId ? { ...s, connectionStatus: "accepted" } : s
        )
      );
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TopBar breadcrumb={["Network", "Directory"]} />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-display text-2xl font-bold">Student Directory</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect with other learners, share progress, and grow together.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-variant border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-brand transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-border bg-card p-5 flex flex-col items-center text-center hover:border-brand/30 transition-all"
            >
              <Avatar className="w-20 h-20 mb-3 border-2 border-surface-variant">
                <AvatarImage src={s.avatar_url || ""} />
                <AvatarFallback className="text-xl">
                  {s.name?.substring(0, 2).toUpperCase() || "ST"}
                </AvatarFallback>
              </Avatar>
              <Link
                to={`/profile/${s.username || s.id}`}
                className="font-bold text-lg hover:text-brand transition"
              >
                {s.name}
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                {s.title || "Learner"} • {s.xp || 0} XP
              </p>

              {s.connectionStatus === "none" && (
                <button
                  onClick={() => handleConnect(s.id)}
                  className="w-full flex items-center justify-center gap-2 bg-brand/10 text-brand font-semibold py-2 rounded-xl hover:bg-brand/20 transition"
                >
                  <UserPlus className="w-4 h-4" /> Connect
                </button>
              )}
              {s.connectionStatus === "pending" && s.isRequester && (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-surface-variant text-muted-foreground font-semibold py-2 rounded-xl cursor-not-allowed"
                >
                  <Clock className="w-4 h-4" /> Pending
                </button>
              )}
              {s.connectionStatus === "pending" && !s.isRequester && (
                <button
                  onClick={() => handleAccept(s.requestId, s.id)}
                  className="w-full flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold py-2 rounded-xl hover:opacity-90 transition"
                >
                  <UserCheck className="w-4 h-4" /> Accept Request
                </button>
              )}
              {s.connectionStatus === "accepted" && (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-success/10 text-success font-semibold py-2 rounded-xl"
                >
                  <UserCheck className="w-4 h-4" /> Connected
                </button>
              )}
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No students found matching your search.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
