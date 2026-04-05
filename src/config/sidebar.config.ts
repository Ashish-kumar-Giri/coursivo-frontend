import type { SidebarConfig } from "@/components/layout/Sidebar"
import {
  LayoutDashboard,
  BookOpen,
  PlayCircle
} from "lucide-react"

export const studentSidebarConfig: SidebarConfig = {
  mainNavItems: {
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/my-courses", icon: BookOpen },
    ],
  },
  bottomNavItems: [],
}

export const instructorSidebarConfig: SidebarConfig = {
  mainNavItems: {
    items: [
      { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/instructor/courses", icon: PlayCircle },
    ],
  },
  bottomNavItems: [],
}
