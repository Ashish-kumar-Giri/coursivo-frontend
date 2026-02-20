import { DashboardLayout } from "./DashboardLayout"
import { instructorSidebarConfig } from "@/config/sidebar.config"

export function InstructorLayout() {
  return (
    <DashboardLayout 
      config={instructorSidebarConfig} 
      storageKey="instructor-sidebar-collapsed" 
    />
  )
}
