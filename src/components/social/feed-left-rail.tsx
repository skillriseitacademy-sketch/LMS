import { useAuth } from "@/lib/auth-store";
import { Star } from "lucide-react";

export function FeedLeftRail() {
  const { session } = useAuth();
  const firstName = session?.email?.split("@")[0] ?? "Alex";
  const initials = session?.email?.slice(0, 2).toUpperCase() ?? "AL";
  const roleDisplay = session?.role === "teacher" ? "Instructor" : "Final Year CS @ University";

  return (
    <>
      {/* Mini Profile Card */}
      <div 
        className="rounded-[16px] p-6 flex flex-col items-center text-center transition-all"
        style={{ 
          backgroundColor: "var(--pp-surface-container-lowest)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
        }}
      >
        <div 
          className="w-20 h-20 rounded-full mb-4 flex items-center justify-center font-bold text-2xl border-4"
          style={{ 
            backgroundColor: "var(--pp-surface-variant)", 
            color: "var(--pp-primary)",
            borderColor: "var(--pp-surface-container-lowest)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          {initials}
        </div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--pp-on-surface)", fontFamily: "var(--font-display)" }}>
          {firstName}
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--pp-on-surface-variant)" }}>
          {roleDisplay}
        </p>
        <div 
          className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ 
            backgroundColor: "color-mix(in srgb, var(--pp-secondary-container) 20%, transparent)",
            color: "var(--pp-secondary)"
          }}
        >
          <Star className="w-[18px] h-[18px]" fill="currentColor" />
          <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)" }}>
            2,500 XP
          </span>
        </div>
      </div>

      {/* Trending Topics */}
      <div 
        className="rounded-[16px] p-6"
        style={{ 
          backgroundColor: "var(--pp-surface-container-lowest)",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)"
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--pp-on-surface)", fontFamily: "var(--font-display)" }}>
          Trending Topics
        </h3>
        <ul className="space-y-3">
          {["#DSAPractice", "#Interviews2024", "#SystemDesign", "#SummerInternships"].map((tag) => (
            <li key={tag}>
              <a 
                href="#" 
                className="text-base hover:underline transition-colors block"
                style={{ color: "var(--pp-primary)" }}
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
