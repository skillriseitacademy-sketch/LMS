import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./auth-store";

export function useGamification() {
  const { session } = useAuth();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakDates, setStreakDates] = useState<string[]>([]);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!session) return;
      try {
        // Fetch XP
        const { data: xpData, error: xpError } = await supabase
          .from("xp_transactions")
          .select("amount")
          .eq("user_id", session.id);

        let totalXp = 0;
        if (!xpError && xpData) {
          totalXp = xpData.reduce((sum, row) => sum + row.amount, 0);
        }
        setXp(totalXp);

        // Fetch Streak (Count distinct dates)
        const { data: streakData, error: streakError } = await supabase
          .from("streak_history")
          .select("date")
          .eq("user_id", session.id);

        if (!streakError && streakData) {
          setStreak(streakData.length);
          setStreakDates(streakData.map((d: any) => d.date));
        }

        // Fetch Quizzes count
        const { count: quizCount } = await supabase
          .from("quiz_attempts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", session.id);

        setQuizzesCompleted(quizCount || 0);

        // Lessons/Days (Placeholder, using topic subscriptions)
        const { count: topicCount } = await supabase
          .from("student_topics")
          .select("*", { count: "exact", head: true })
          .eq("user_id", session.id);

        setLessonsCompleted(topicCount || 0);

      } catch (err) {
        console.error("Error loading gamification stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [session]);

  const level = Math.floor(xp / 200) + 1;
  const nextLevelXp = level * 200;
  const xpInCurrentLevel = xp % 200;
  const progressPct = Math.round((xpInCurrentLevel / 200) * 100);
  const xpNeeded = nextLevelXp - xp;

  return {
    xp,
    streak,
    streakDates,
    lessonsCompleted,
    quizzesCompleted,
    level,
    nextLevelXp,
    xpNeeded,
    progressPct,
    loading,
  };
}
