import { DashboardLayout } from "./DashboardLayout"
import { studentSidebarConfig } from "@/config/sidebar.config"

export function StudentLayout() {
  return (
    <DashboardLayout 
      config={studentSidebarConfig} 
      storageKey="student-sidebar-collapsed" 
    />
  )
}
