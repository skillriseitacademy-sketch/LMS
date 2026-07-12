import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flame, Trophy } from "lucide-react";
import { ConnectionButton } from "@/components/social/connection-button";

export const Route = createFileRoute("/_app/profile/$username")({
  component: ProfileRoute,
});

function ProfileRoute() {
  const { username } = Route.useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ xp: 0, streak: 0, level: 1 });

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        // Load profile by username
        const { data: profData, error: profError } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single();

        if (profError || !profData) {
          setProfile(null);
          return;
        }
        setProfile(profData);

        // Fetch XP / Streak
        // Only works if RLS allows or we fetch via edge function / API
        // For now try directly (might fail if not public/admin/self)
        const [xpRes, streakRes] = await Promise.all([
          supabase.from("xp_transactions").select("amount").eq("user_id", profData.id),
          supabase.from("streak_history").select("id").eq("user_id", profData.id)
        ]);
        
        let xp = 0;
        if (xpRes.data) xp = xpRes.data.reduce((sum, row) => sum + row.amount, 0);
        let streak = 0;
        if (streakRes.data) streak = streakRes.data.length;
        
        setStats({ xp, streak, level: Math.floor(xp / 200) + 1 });
      } catch (err) {
        console.error("Error loading profile", err);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, [username]);

  return (
    <>
      <TopBar title="Profile" />
      <div className="p-4 md:p-6 mx-auto max-w-4xl">
        {loading ? (
          <div className="text-center py-12 text-sm text-muted-foreground">Loading profile...</div>
        ) : !profile ? (
          <div className="text-center p-12 bg-card rounded-3xl border border-border">
            <p className="text-muted-foreground text-sm">
              User @{username} not found.
            </p>
          </div>
        ) : (
          <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-light via-card to-card-blue p-6">
            <div className="flex flex-wrap items-center gap-5">
              <Avatar className="h-20 w-20 ring-4 ring-background">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-brand text-brand-foreground text-xl font-bold">
                    {profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-[240px]">
                <h1 className="text-display text-2xl font-bold">{profile.name}</h1>
                <p className="text-sm font-medium text-brand">@{profile.username}</p>
                {profile.headline && <p className="text-sm text-muted-foreground mt-1">{profile.headline}</p>}
                
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Trophy className="h-3 w-3 text-xp-gold" /> Level {stats.level}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 font-semibold">
                    <Flame className="h-3 w-3 text-streak" fill="currentColor" /> {stats.streak}-day streak
                  </span>
                </div>
              </div>
              <ConnectionButton 
                targetId={profile.id}
                initialStatus={null}
                targetVisibility={profile.visibility}
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
