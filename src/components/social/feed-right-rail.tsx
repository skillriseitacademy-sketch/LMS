import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";
import { Trophy } from "lucide-react";

type Suggestion = {
  id: string;
  name: string;
  avatar_url: string | null;
  headline: string | null;
  role: string;
};

const topStudents = [
  { rank: 1, name: "David Kim", xp: "3,200 XP", initial: "DK", avatarColor: "var(--pp-primary-container)" },
  { rank: 2, name: "Anita Silva", xp: "2,950 XP", initial: "AS", avatarColor: "var(--pp-secondary-container)" },
  { rank: 3, name: "Omar Farooq", xp: "2,800 XP", initial: "OF", avatarColor: "var(--pp-tertiary-container)" },
];

export function FeedRightRail() {
  const { session } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (!session) return;
    const token = (supabase as any).realtime?.accessToken ?? "";
    fetch("/api/feed/suggestions", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setSuggestions(data.suggestions || []))
      .catch(() => {});
  }, [session]);

  return (
    <>
      {/* People You May Know */}
      <div 
        className="rounded-[16px] p-6"
        style={{ 
          backgroundColor: "var(--pp-surface-container-lowest)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--pp-on-surface)", fontFamily: "var(--font-display)" }}>
          People you may know
        </h3>
        <div className="space-y-4">
          {(suggestions.length ? suggestions : [
            { id: '1', name: 'Emily Chen', role: 'student', headline: 'CS @ Tech U', avatar_url: null },
            { id: '2', name: 'Marcus Doe', role: 'student', headline: 'Software Eng', avatar_url: null }
          ]).map((person) => {
            const initial = person.name.slice(0, 2).toUpperCase();
            return (
              <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: "var(--pp-surface-variant)", color: "var(--pp-primary)" }}
                  >
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight" style={{ color: "var(--pp-on-surface)" }}>
                      {person.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--pp-on-surface-variant)", fontFamily: "var(--font-mono)" }}>
                      {person.headline || "Student"}
                    </p>
                  </div>
                </div>
                <button 
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-colors border"
                  style={{ 
                    borderColor: "var(--pp-primary)", 
                    color: "var(--pp-primary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pp-primary)";
                    (e.currentTarget as HTMLElement).style.color = "var(--pp-on-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--pp-primary)";
                  }}
                >
                  Connect
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini Leaderboard */}
      <div 
        className="rounded-[16px] p-6"
        style={{ 
          backgroundColor: "var(--pp-surface-container-lowest)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: "var(--pp-on-surface)", fontFamily: "var(--font-display)" }}>
            Top Students (Week)
          </h3>
          <Trophy className="w-5 h-5" style={{ color: "var(--pp-secondary-container)" }} />
        </div>
        <div className="space-y-2">
          {topStudents.map((student) => (
            <div 
              key={student.rank} 
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"
              style={{
                borderLeft: student.rank === 1 ? "2px solid var(--pp-secondary-container)" : "2px solid transparent",
                backgroundColor: student.rank === 1 ? "var(--pp-surface-container)" : "transparent"
              }}
              onMouseEnter={(e) => {
                if (student.rank !== 1) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--pp-surface-variant)";
              }}
              onMouseLeave={(e) => {
                if (student.rank !== 1) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <span 
                className="w-4 text-center font-bold" 
                style={{ color: student.rank === 1 ? "var(--pp-secondary-container)" : "var(--pp-on-surface-variant)" }}
              >
                {student.rank}
              </span>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: student.avatarColor, color: "var(--pp-on-surface)" }}
              >
                {student.initial}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "var(--pp-on-surface)" }}>
                  {student.name}
                </p>
              </div>
              <span className="text-xs font-bold" style={{ color: "var(--pp-secondary)", fontFamily: "var(--font-mono)" }}>
                {student.xp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
