import { useEffect, useState } from "react";

export interface ProfileData {
  name: string;
  initials: string;
  headline: string;
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

export function saveQuizAttempt(attempt: QuizAttempt) {
  if (typeof window === "undefined") return;
  const history = getQuizHistory();
  history.unshift(attempt);
  localStorage.setItem("placepro-quizzes", JSON.stringify(history));
  window.dispatchEvent(new Event("quiz-updated"));
}

export function useQuizHistory() {
  const [history, setHistory] = useState<QuizAttempt[]>(getQuizHistory);

  useEffect(() => {
    const handleUpdate = () => setHistory(getQuizHistory());
    window.addEventListener("quiz-updated", handleUpdate);
    return () => window.removeEventListener("quiz-updated", handleUpdate);
  }, []);

  return history;
}
