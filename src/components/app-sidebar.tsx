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
  BookOpen,
  Video,
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
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-store";

import { Newspaper, Users } from "lucide-react";

const main = [
  { title: "Feed", url: "/feed", icon: Newspaper },
  { title: "Connections", url: "/feed", search: "?tab=friends", icon: Users },
];

const learn = [
  { title: "Dashboard", url: "/dashboard", icon: BookOpen },
  { title: "Quizzes", url: "/quizzes", icon: ListChecks },
  { title: "Interview", url: "/interview", icon: Mic },
  { title: "Live Classes", url: "/live", icon: Video },
  { title: "Arena", url: "/arena", icon: Code2 },
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
  const { session, logoutSession } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      if (!session) return;
      const { data } = await supabase
        .from("student_topics")
        .select("topics(id, title)")
        .eq("user_id", session.id);

      if (data) {
        setCourses(data.map((d: any) => d.topics));
      }
    }
    fetchCourses();
  }, [session]);

  const renderGroup = (label: string, items: any[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const destUrl = item.url + (item.search || "");
            return (
              <SidebarMenuItem key={destUrl}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link
                    to={item.url}
                    search={item.search ? { tab: "friends" } : undefined}
                    className="flex items-center gap-3"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/feed" className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-display text-sm font-bold">PlacePro</span>
            <span className="text-[10px] text-muted-foreground">Network</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Network", main)}
        {renderGroup("Learn", learn)}

        {courses.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>My Courses</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {courses.map((course) => (
                  <SidebarMenuItem key={course.id}>
                    <SidebarMenuButton asChild isActive={isActive(`/courses/${course.id}`)}>
                      <Link to="/dashboard" className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4" />
                        <span className="truncate">{course.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {renderGroup("Career", career)}
        {renderGroup("You", you)}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {session?.role === "admin" && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/admin" className="flex items-center gap-3">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logoutSession} className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Log out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
