import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  School,
  FileBarChart,
  CalendarDays,
  ClipboardList,
  UserCircle,
  PenLine,
  Megaphone,
  Newspaper,
  ListChecks,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { title: "Tổng quan", url: "/dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
  { title: "Người dùng", url: "/users", icon: Users, roles: ["admin"] },
  { title: "Sinh viên", url: "/students", icon: GraduationCap, roles: ["admin", "teacher"] },
  { title: "Hồ sơ cá nhân", url: "/student-profile", icon: UserCircle, roles: ["student"] },
  { title: "Hồ sơ", url: "/profile", icon: UserCircle, roles: ["admin", "teacher"] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();

  const filteredItems = navItems.filter((item) => user && item.roles.includes(user.role));

  const roleLabel: Record<UserRole, string> = {
    admin: "Quản trị viên",
    teacher: "Giáo viên",
    student: "Sinh viên",
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <GraduationCap className="h-7 w-7 text-sidebar-primary shrink-0" />
          {!collapsed && (
            <div>
              <h1 className="text-base font-bold text-sidebar-primary-foreground leading-tight">
                SMS
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Quản lý Sinh viên</p>
            </div>
          )}
        </div>

        {!collapsed && user && (
          <div className="px-4 py-3">
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-sidebar-primary/20 text-sidebar-primary">
              {roleLabel[user.role]}
            </span>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Điều hướng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
