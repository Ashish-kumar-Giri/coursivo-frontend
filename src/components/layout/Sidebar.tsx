import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo, LogoIcon } from "@/components/ui/Logo"
import { useAuthStore, useUser } from "@/store/auth.store"
import { toast } from "sonner"
import {
  LogOut,
  Plus,
  Mail,
  MoreVertical,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types for sidebar configuration
export interface SidebarItem {
  name: string
  href: string
  icon: React.ElementType
}

export interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

export interface SidebarConfig {
  mainNavItems: SidebarSection
  contentSection?: SidebarSection
  bottomNavItems: SidebarItem[]
  quickCreateLabel?: string
  quickCreateHref?: string
}

// Get user initials from full name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface SidebarProps {
  config: SidebarConfig
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ config, isCollapsed, onToggle }: SidebarProps) {
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
    // Exact match for main dashboard routes
    if (href.endsWith("/dashboard")) {
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
        "flex h-16 items-center border-b border-sidebar-border shrink-0",
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

      {/* Quick Create Button - Only show if configured */}
      {config.quickCreateHref && (
        <div className={cn("p-3 shrink-0", isCollapsed && "px-2")}>
          {isCollapsed ? (
            <div className="flex flex-col gap-2">
              <Button 
                size="icon" 
                className="w-full h-10"
                onClick={() => navigate(config.quickCreateHref!)}
                title={config.quickCreateLabel}
              >
                <Plus className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-full h-10"
                title="Messages"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                className="flex-1 gap-2 font-semibold"
                onClick={() => navigate(config.quickCreateHref!)}
              >
                <Plus className="h-4 w-4" />
                {config.quickCreateLabel || "Quick Create"}
              </Button>
              <Button variant="outline" size="icon" title="Messages">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Main Navigation - scrollable area */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-2 py-2">
        {/* Main Items */}
        <ul className="space-y-1">
          {config.mainNavItems.items.map((item) => (
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
                  "shrink-0",
                  isCollapsed ? "h-5 w-5" : "h-4 w-4"
                )} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Content Section - Only show if configured */}
        {config.contentSection && (
          <div className="mt-6">
            {!isCollapsed && config.contentSection.title && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                {config.contentSection.title}
              </h3>
            )}
            <ul className="space-y-1">
              {config.contentSection.items.map((item) => (
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
                      "shrink-0",
                      isCollapsed ? "h-5 w-5" : "h-4 w-4"
                    )} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Bottom Section - fixed at bottom */}
      <div className="shrink-0 border-t border-sidebar-border">
        {/* Bottom Navigation Items */}
        <ul className="px-2 pb-2 pt-2 space-y-1">
          {config.bottomNavItems.map((item) => (
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
                  "shrink-0",
                  isCollapsed ? "h-5 w-5" : "h-4 w-4"
                )} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Button */}
        <div className="px-2 pb-2">
          <button
            title={isCollapsed ? "Search" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 w-full text-sm font-medium rounded-sm transition-colors",
              isCollapsed && "justify-center px-2",
              "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Search className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
            {!isCollapsed && <span>Search</span>}
          </button>
        </div>

        {/* Collapse Toggle Button */}
        <div className="px-2 pb-2">
          <button
            onClick={onToggle}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex items-center gap-3 px-3 py-2 w-full text-sm font-medium rounded-sm transition-colors",
              isCollapsed && "justify-center px-2",
              "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-5 w-5 shrink-0" />
            ) : (
              <>
                <ChevronsLeft className="h-4 w-4 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className={cn(
          "border-t border-sidebar-border p-2",
          isCollapsed && "px-1"
        )}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-3 w-full p-2 rounded-sm transition-colors",
                  "hover:bg-sidebar-accent text-sidebar-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {user?.fullName ? getInitials(user.fullName) : "U"}
                  </span>
                </div>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left overflow-hidden">
                      <p className="text-sm font-medium truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-sidebar-foreground/60 truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                    <MoreVertical className="h-4 w-4 text-sidebar-foreground/60 shrink-0" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align={isCollapsed ? "center" : "end"} 
              side={isCollapsed ? "right" : "top"}
              className="w-56"
            >
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}
