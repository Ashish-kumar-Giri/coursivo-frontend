import type { SidebarConfig } from "@/components/layout/Sidebar"
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Settings,
  HelpCircle,
  GraduationCap,
  Award,
  TrendingUp,
  Heart,
  Clock,
} from "lucide-react"

// Instructor sidebar configuration
export const instructorSidebarConfig: SidebarConfig = {
  mainNavItems: {
    items: [
      { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/instructor/courses", icon: BookOpen },
    ],
  },
  contentSection: {
    title: "Content",
    items: [
      { name: "Resources", href: "/instructor/resources", icon: FileText },
    ],
  },
  bottomNavItems: [],
}

// Student sidebar configuration
export const studentSidebarConfig: SidebarConfig = {
  mainNavItems: {
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Courses", href: "/my-courses", icon: BookOpen },
      { name: "Browse Courses", href: "/courses", icon: GraduationCap },
      { name: "My Progress", href: "/progress", icon: TrendingUp },
    ],
  },
  contentSection: {
    title: "Learning",
    items: [
      { name: "Certificates", href: "/certificates", icon: Award },
      { name: "Wishlist", href: "/wishlist", icon: Heart },
      { name: "Watch Later", href: "/watch-later", icon: Clock },
    ],
  },
  bottomNavItems: [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Get Help", href: "/help", icon: HelpCircle },
  ],
  // No quick create for students
}
