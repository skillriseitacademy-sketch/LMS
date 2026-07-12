import { useEffect, useState } from "react";
import { supabase, type QuizAttemptRow } from "./supabase";

export interface ProfileData {
  name: string;
  initials: string;
  headline: string;
  avatar_url?: string;
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  timestamp: number;
}

const defaultProfile: ProfileData = {
  name: "Sam Adams",
  initials: "SA",
  headline: "Frontend track · joined Aug 2025",
};

export function getProfile(): ProfileData {
  if (typeof window === "undefined") return defaultProfile;
  const stored = localStorage.getItem("placepro-profile");
  return stored ? JSON.parse(stored) : defaultProfile;
}

export function saveProfile(profile: ProfileData) {
  if (typeof window === "undefined") return;
  localStorage.setItem("placepro-profile", JSON.stringify(profile));
  window.dispatchEvent(new Event("profile-updated"));
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(getProfile);

  useEffect(() => {
    const handleUpdate = () => setProfile(getProfile());
    window.addEventListener("profile-updated", handleUpdate);
    return () => window.removeEventListener("profile-updated", handleUpdate);
  }, []);

  return { profile, saveProfile };
}

export function getQuizHistory(): QuizAttempt[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("placepro-quizzes");
  return stored ? JSON.parse(stored) : [];
}

export async function saveQuizAttempt(attempt: QuizAttempt) {
  if (typeof window === "undefined") return;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Save to local storage as fallback/optimistic
  const history = getQuizHistory();
  history.unshift(attempt);
  localStorage.setItem("placepro-quizzes", JSON.stringify(history));
  window.dispatchEvent(new Event("quiz-updated"));

  // Save to Supabase if user is logged in
  if (session?.user?.id) {
    await supabase.from("quiz_attempts").insert({
      user_id: session.user.id,
      quiz_id: attempt.quizId,
      score: attempt.score,
      created_at: new Date(attempt.timestamp).toISOString(),
    });
  }
}

export function useQuizHistory() {
  const [history, setHistory] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.id) {
        const { data } = await supabase
          .from("quiz_attempts")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const formatted = data.map((d: QuizAttemptRow) => ({
            quizId: d.quiz_id,
            score: d.score,
            timestamp: new Date(d.created_at).getTime(),
          }));
          setHistory(formatted);
          return;
        }
      }
      // Fallback to local storage
      setHistory(getQuizHistory());
    };

    fetchHistory();

    const handleUpdate = () => fetchHistory();
    window.addEventListener("quiz-updated", handleUpdate);
    return () => window.removeEventListener("quiz-updated", handleUpdate);
  }, []);

  return history;
}
