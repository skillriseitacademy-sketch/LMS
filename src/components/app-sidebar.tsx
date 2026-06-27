import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  ListChecks,
  Mic,
  Briefcase,
  Map,
  Code2,
  FileText,
  Trophy,
  User,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const learn = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Quizzes", url: "/quizzes", icon: ListChecks },
  { title: "Interview", url: "/interview", icon: Mic },
  { title: "Code", url: "/code", icon: Code2 },
];

const career = [
  { title: "Jobs", url: "/jobs", icon: Briefcase },
  { title: "Roadmap", url: "/roadmap", icon: Map },
  { title: "Resume", url: "/resume", icon: FileText },
];

const you = [
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => pathname === url || pathname.startsWith(url + "/");

  const renderGroup = (label: string, items: typeof learn) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-display text-sm font-bold">PlacePro</span>
            <span className="text-[10px] text-muted-foreground">LMS</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Learn", learn)}
        {renderGroup("Career", career)}
        {renderGroup("You", you)}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/admin" className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
