import type { SidebarConfig } from "@/components/layout/Sidebar"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  Plus,
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
      { name: "Students", href: "/instructor/students", icon: Users },
      { name: "Analytics", href: "/instructor/analytics", icon: BarChart3 },
    ],
  },
  contentSection: {
    title: "Content",
    items: [
      { name: "Course Builder", href: "/instructor/courses/create", icon: Plus },
      { name: "Resources", href: "/instructor/resources", icon: FileText },
      { name: "Messages", href: "/instructor/messages", icon: MessageSquare },
    ],
  },
  bottomNavItems: [
    { name: "Settings", href: "/instructor/settings", icon: Settings },
    { name: "Get Help", href: "/instructor/help", icon: HelpCircle },
  ],
  quickCreateLabel: "Quick Create",
  quickCreateHref: "/instructor/courses/create",
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
