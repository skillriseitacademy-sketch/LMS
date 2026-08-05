import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type Role = "student" | "teacher" | "admin";

export interface UserSession {
  id: string;
  role: Role;
  name: string;
  email: string;
  onboarding_complete: boolean;
  visibility?: "public" | "private";
  avatar_url?: string;
}

async function buildSession(userId: string): Promise<UserSession | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role, name, email, onboarding_complete, visibility, avatar_url")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: userId,
    role: data.role as Role,
    name: data.name,
    email: data.email,
    onboarding_complete: data.onboarding_complete ?? false,
    visibility: data.visibility ?? "private",
    avatar_url: data.avatar_url ?? undefined,
  };
}

export function useAuth() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial session
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (s?.user) {
        const userSession = await buildSession(s.user.id);
        setSession(userSession);
      } else {
        setSession(null);
      }
      setIsLoading(false);
    });

    // Subscribe to auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, s) => {
      if (s?.user) {
        const userSession = await buildSession(s.user.id);
        setSession(userSession);
      } else {
        setSession(null);
      }
      if (event === "INITIAL_SESSION") {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logoutSession = async () => {
    await supabase.auth.signOut();
    setSession(null);
    window.location.href = "/login";
  };

  return { session, isLoading, logoutSession };
}


