import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export type Role = "student" | "teacher" | "admin";

export interface UserSession {
  id: string;
  role: Role;
  name: string;
  email: string;
  onboarding_complete: boolean;
  visibility?: "public" | "private";
}

async function buildSession(userId: string): Promise<UserSession | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role, name, email, onboarding_complete, visibility")
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

export interface ProjectShowcase {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  authorName: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectShowcase[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setProjects(
        data.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          imageUrl: p.image_url,
          githubUrl: p.github_url || undefined,
          liveUrl: p.live_url || undefined,
          authorName: p.author_name,
        })),
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
    const handleUpdate = () => fetchProjects();
    window.addEventListener("projects-changed", handleUpdate);
    return () => window.removeEventListener("projects-changed", handleUpdate);
  }, []);

  const saveProject = async (project: Omit<ProjectShowcase, "id">) => {
    await supabase.from("projects").insert({
      title: project.title,
      description: project.description,
      image_url: project.imageUrl,
      github_url: project.githubUrl || null,
      live_url: project.liveUrl || null,
      author_name: project.authorName,
    });
    window.dispatchEvent(new Event("projects-changed"));
  };

  return { projects, loading, saveProject };
}
