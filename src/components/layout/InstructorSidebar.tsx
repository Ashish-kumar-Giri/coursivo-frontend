import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo, LogoIcon } from "@/components/ui/Logo"
import { useAuthStore, useUser } from "@/store/auth.store"
import { toast } from "sonner"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  Search,
  LogOut,
  Plus,
  Mail,
  MoreVertical,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarItem {
  name: string
  href: string
  icon: React.ElementType
}

interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

// Main navigation items
const mainNavItems: SidebarSection = {
  items: [
    { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
    { name: "My Courses", href: "/instructor/courses", icon: BookOpen },
    { name: "Students", href: "/instructor/students", icon: Users },
    { name: "Analytics", href: "/instructor/analytics", icon: BarChart3 },
  ],
}

// Content management section
const contentSection: SidebarSection = {
  title: "Content",
  items: [
    { name: "Course Builder", href: "/instructor/courses/create", icon: Plus },
    { name: "Resources", href: "/instructor/resources", icon: FileText },
    { name: "Messages", href: "/instructor/messages", icon: MessageSquare },
  ],
}

// Bottom navigation items
const bottomNavItems: SidebarItem[] = [
  { name: "Settings", href: "/instructor/settings", icon: Settings },
  { name: "Get Help", href: "/instructor/help", icon: HelpCircle },
]

// Get user initials from full name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface InstructorSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function InstructorSidebar({ isCollapsed, onToggle }: InstructorSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useUser()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    navigate("/")
  }

  const isActive = (href: string) => {
    if (href === "/instructor/dashboard") {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  return (
    <aside 
      className={cn(
        "flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo / Brand */}
      <div className={cn(
        "flex h-16 items-center border-b border-sidebar-border",
        isCollapsed ? "justify-center px-2" : "px-4"
      )}>
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity overflow-hidden"
        >
          {isCollapsed ? (
            <LogoIcon size={28} />
          ) : (
            <Logo size="sm" className="text-sidebar-foreground" />
          )}
        </Link>
      </div>

      {/* Quick Create Button */}
      <div className={cn("p-3", isCollapsed && "px-2")}>
        {isCollapsed ? (
          <div className="flex flex-col gap-2">
            <Button 
              size="icon" 
              className="h-10 w-10 mx-auto shadow-sm"
              onClick={() => navigate("/instructor/courses/create")}
              title="Quick Create"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 mx-auto"
              onClick={() => navigate("/instructor/messages")}
              title="Messages"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button 
              size="lg" 
              className="flex-1 h-11 gap-2 font-semibold shadow-sm"
              onClick={() => navigate("/instructor/courses/create")}
            >
              <Plus className="h-4 w-4" />
              Quick Create
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-11 w-11 shrink-0"
              onClick={() => navigate("/instructor/messages")}
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Main Navigation - scrollable area */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-2 py-2">
        {/* Main Items */}
        <ul className="space-y-1">
          {mainNavItems.items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm transition-colors",
                  isCollapsed && "justify-center px-2",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4 shrink-0",
                  isActive(item.href) ? "text-sidebar-foreground" : "text-sidebar-foreground/60"
                )} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Content Section */}
        <div className="mt-6">
          {!isCollapsed && (
            <h3 className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              {contentSection.title}
            </h3>
          )}
          <ul className="space-y-1 mt-1">
            {contentSection.items.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm transition-colors",
                    isCollapsed && "justify-center px-2",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 shrink-0",
                    isActive(item.href) ? "text-sidebar-foreground" : "text-sidebar-foreground/60"
                  )} />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Button */}
        {!isCollapsed && (
          <button className="flex items-center gap-3 px-3 py-2 mt-1 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-sm transition-colors w-full">
            <MoreVertical className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
            More
          </button>
        )}
      </nav>

      {/* Bottom Section - fixed at bottom */}
      <div className="shrink-0 border-t border-sidebar-border">
        {/* Bottom Navigation Items */}
        <ul className="px-2 pb-2 pt-2 space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-sm transition-colors",
                  isCollapsed && "justify-center px-2",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4 shrink-0",
                  isActive(item.href) ? "text-sidebar-foreground" : "text-sidebar-foreground/60"
                )} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            </li>
          ))}
          {/* Search */}
          <li>
            <button
              title={isCollapsed ? "Search" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-sm transition-colors w-full",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Search className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
              {!isCollapsed && <span className="truncate">Search</span>}
            </button>
          </li>
          {/* Collapse/Expand button - positioned below Search */}
          <li>
            <button
              onClick={onToggle}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-sm transition-colors w-full",
                isCollapsed && "justify-center px-2"
              )}
            >
              {isCollapsed ? (
                <ChevronsRight className="h-4 w-4 text-sidebar-foreground/60" />
              ) : (
                <>
                  <ChevronsLeft className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
                  <span className="truncate">Collapse</span>
                </>
              )}
            </button>
          </li>
        </ul>

        {/* User Profile */}
        {user && (
          <div className={cn("p-2 border-t border-sidebar-border", isCollapsed && "flex justify-center")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-sm hover:bg-sidebar-accent transition-colors",
                    isCollapsed ? "justify-center" : "w-full"
                  )}
                  title={isCollapsed ? user.fullName : undefined}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold text-sm shrink-0">
                    {getInitials(user.fullName)}
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-sidebar-foreground/50 truncate">
                          {user.email}
                        </p>
                      </div>
                      <MoreVertical className="h-4 w-4 text-sidebar-foreground/50 shrink-0" />
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isCollapsed ? "center" : "end"} side="top" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/instructor/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </aside>
  )
}
