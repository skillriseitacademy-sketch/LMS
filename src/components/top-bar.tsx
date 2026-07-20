import { Bell, Search, Flame, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StreakCalendar } from "./streak-calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopBarProps {
  title?: string;
  breadcrumb?: string[];
}

export function TopBar({ title }: TopBarProps) {
  const { session } = useAuth();
  const initials = session?.email?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <header
      className="sticky top-0 z-30 hidden md:flex h-16 items-center gap-4 px-8"
      style={{
        backgroundColor: "color-mix(in srgb, var(--pp-surface) 85%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "none",
      }}
    >
      {/* Search */}
      <div className="flex-1 flex items-center gap-4 max-w-sm">
        <div
          className="relative w-full transition-all focus-within:ring-2 rounded-full"
          style={{ outline: "2px solid transparent" }}
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--pp-outline-variant)" }}
          />
          <input
            type="text"
            placeholder="Search PlacePro..."
            className="w-full rounded-full py-2 pl-10 pr-4 text-sm border-0 outline-none"
            style={{
              backgroundColor: "var(--pp-surface-container-low)",
              color: "var(--pp-on-surface)",
              fontFamily: "var(--font-sans)",
            }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-5 ml-auto">
        {/* Streak pill */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--pp-secondary-container)",
                color: "var(--pp-on-secondary-container)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <Flame className="w-3.5 h-3.5 animate-flame" fill="currentColor" />
              <span>3 days</span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[360px] p-0">
            <StreakCalendar />
          </PopoverContent>
        </Popover>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-full transition-colors"
          style={{ color: "var(--pp-on-surface-variant)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--pp-primary)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface-variant)")
          }
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
            style={{
              backgroundColor: "var(--pp-error)",
              borderColor: "var(--pp-surface)",
            }}
          />
        </button>

        {/* Premium icon */}
        <button
          className="p-2 rounded-full transition-colors"
          style={{ color: "var(--pp-on-surface-variant)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--pp-primary)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--pp-on-surface-variant)")
          }
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <Avatar className="w-8 h-8 border" style={{ borderColor: "var(--pp-outline-variant)" }}>
          <AvatarImage src={session?.avatar_url} />
          <AvatarFallback
            className="text-xs font-semibold"
            style={{
              backgroundColor: "var(--pp-primary-container)",
              color: "var(--pp-on-primary-container)",
            }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
