import { Bell, Flame, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StreakCalendar } from "./streak-calendar";

interface TopBarProps {
  title?: string;
  breadcrumb?: string[];
}

export function TopBar({ title, breadcrumb }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1 min-w-0">
        {breadcrumb ? (
          <nav className="text-xs text-muted-foreground truncate">
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-1.5">/</span>}
                <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>
                  {b}
                </span>
              </span>
            ))}
          </nav>
        ) : title ? (
          <h1 className="text-display text-base font-semibold truncate">{title}</h1>
        ) : null}
      </div>
      <Button variant="ghost" size="icon" className="hidden md:inline-flex">
        <Search className="h-4 w-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm transition hover:bg-accent">
            <Flame className="h-3.5 w-3.5 text-streak animate-flame" fill="currentColor" />
            <span>3 days</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[360px] p-0">
          <StreakCalendar />
        </PopoverContent>
      </Popover>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-streak" />
      </Button>
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-brand text-brand-foreground text-xs font-semibold">
          SA
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
