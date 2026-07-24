import { Bell, Search, Flame, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StreakCalendar } from "./streak-calendar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSearch } from "@/components/social/user-search";

interface TopBarProps {
  title?: string;
  breadcrumb?: string[];
}

export function TopBar({ title }: TopBarProps) {
  const { session } = useAuth();
  const initials = session?.email?.slice(0, 2).toUpperCase() ?? "U";
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    if (!session) return;
    
    // Fetch initial notifications
    fetch("/api/notifications").then(res => res.json()).then(data => {
      if (Array.isArray(data)) setNotifications(data);
    });

    // Real-time subscription
    const channel = supabase.channel("realtime:notifications")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${session.id}`
      }, (payload) => {
        // Fetch full notification data with actor info when a new one comes in
        fetch("/api/notifications").then(res => res.json()).then(data => {
          if (Array.isArray(data)) setNotifications(data);
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [session]);

  const markAllRead = async () => {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mark_all: true })
    });
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

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
      <div className="flex-1 flex items-center gap-4 max-w-sm mt-6">
        <UserSearch />
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
        <Popover>
          <PopoverTrigger asChild>
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
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 right-1 w-4 h-4 text-[10px] flex items-center justify-center font-bold text-white rounded-full border-2"
                  style={{
                    backgroundColor: "var(--pp-error)",
                    borderColor: "var(--pp-surface)",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[380px] p-0 overflow-hidden rounded-2xl shadow-xl border border-border bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs font-medium text-primary hover:underline">
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">No notifications yet</div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map(n => (
                    <Link
                      key={n.id}
                      to={n.type === "follow" ? "/profile" : "/"} // Simple link for now
                      className={`flex gap-3 p-4 border-b border-border transition-colors hover:bg-muted/50 ${!n.is_read ? 'bg-primary/5' : ''}`}
                    >
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={n.actor?.avatar_url} />
                        <AvatarFallback>{n.actor?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">{n.actor?.name}</span>{" "}
                          {n.type === "like" ? "liked your post." : 
                           n.type === "comment" ? "commented on your post." :
                           n.type === "follow" ? "started following you." : "interacted with you."}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(n.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {!n.is_read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

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
