import { useEffect, useState } from "react";
import { supabase, type ProjectRow, type UserRow } from "./supabase";

export type Role = "student" | "admin";

export interface UserSession {
  id: string;
  role: Role;
  name: string;
  email: string;
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

export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("placepro-session");
  return stored ? JSON.parse(stored) : null;
}

export async function loginSession(session: UserSession) {
  if (typeof window === "undefined") return;
  
  // Upsert user to Supabase
  await supabase.from("users").upsert({
    id: session.id,
    role: session.role,
    name: session.name,
    email: session.email
  });

  localStorage.setItem("placepro-session", JSON.stringify(session));
  window.dispatchEvent(new Event("auth-changed"));
}

export function logoutSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("placepro-session");
  window.dispatchEvent(new Event("auth-changed"));
}

export function useAuth() {
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    // 1. Check local session (from our mock login)
    const localSession = getSession();
    if (localSession) {
      setSession(localSession);
    }

    // 2. Check Supabase Auth
    supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
      if (sbSession?.user) {
        syncSupabaseUser(sbSession.user);
      }
    });

    // 3. Listen for Supabase Auth changes (Google OAuth)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, sbSession) => {
      if (sbSession?.user) {
        syncSupabaseUser(sbSession.user);
      } else {
        // If logged out from Supabase, fallback to local or null
        setSession(getSession());
      }
    });

    // Helper to sync Supabase user into our store and public table
    async function syncSupabaseUser(user: any) {
      const userSession: UserSession = {
        id: user.id,
        role: "student", // default role for Google sign-ins
        name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Student",
        email: user.email || ""
      };
      
      setSession(userSession);
      
      // Upsert to our public users table
      await supabase.from("users").upsert({
        id: userSession.id,
        role: userSession.role,
        name: userSession.name,
        email: userSession.email
      });
    }

    const handleUpdate = () => setSession(getSession());
    window.addEventListener("auth-changed", handleUpdate);
    
    return () => {
      window.removeEventListener("auth-changed", handleUpdate);
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session, loginSession, logoutSession };
}

// Global projects store for showcase using Supabase
export function useProjects() {
  const [projects, setProjects] = useState<ProjectShowcase[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setProjects(data.map((p: ProjectRow) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        imageUrl: p.image_url,
        githubUrl: p.github_url || undefined,
        liveUrl: p.live_url || undefined,
        authorName: p.author_name
      })));
    } else {
      // Fallback mocks if DB fails or tables aren't created yet
      setProjects([
        {
          id: "1",
          title: "Real-time Chat App",
          description: "A full-stack chat application using WebSockets.",
          imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
          githubUrl: "https://github.com/example/chat",
          liveUrl: "https://chat.example.com",
          authorName: "Sam Adams"
        }
      ]);
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
      author_name: project.authorName
    });
    window.dispatchEvent(new Event("projects-changed"));
  };

  return { projects, loading, saveProject };
}
