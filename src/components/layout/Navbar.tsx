import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, LayoutDashboard, User, Settings, LogOut, GraduationCap, Users } from "lucide-react"
import { toast } from "sonner"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/SearchBar"
import { Logo } from "@/components/ui/Logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore, useIsAuthenticated, useUser } from "@/store/auth.store"
import { getInitials } from "@/lib/user-utils"

const publicNavLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Mentors", href: "/mentors" },
]

const authenticatedNavLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
]



export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    navigate("/")
  }

  const dashboardLink = user?.role === "INSTRUCTOR" ? "/instructor/dashboard" : "/dashboard"

  return (
    <nav className="bg-background sticky top-0 z-50 w-full border-b border-border shadow-sm">
      <div className="container-padding mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size="md" className="text-foreground" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {(isAuthenticated ? authenticatedNavLinks : publicNavLinks).map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-normal text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <SearchBar className="hidden md:flex flex-1 max-w-md mx-4" />

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Dashboard link in navbar for logged-in users */}
          {isAuthenticated && user && (
            <Link
              to={dashboardLink}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-normal text-foreground hover:text-primary transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
          <ThemeToggle />
          
          {isAuthenticated && user ? (
            // Logged in - Show user avatar with dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-md">
                  {getInitials(user.fullName)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-2">
                {/* User Info Header */}
                <DropdownMenuLabel className="font-normal p-0 mb-2">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-sm">
                      {getInitials(user.fullName)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold text-foreground">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit ${
                        user.role === "INSTRUCTOR" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-accent text-accent-foreground"
                      }`}>
                        {user.role === "INSTRUCTOR" ? (
                          <><Users className="h-3 w-3" /> Instructor</>
                        ) : (
                          <><GraduationCap className="h-3 w-3" /> Student</>
                        )}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                {/* Menu Items */}
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer py-2.5 px-3 flex items-center">
                    <User className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer py-2.5 px-3 flex items-center">
                    <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Logout */}
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer py-2.5 px-3 text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Not logged in - Show login/signup buttons
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b bg-background md:hidden">
          <div className="container-padding space-y-4 py-4">
            <div className="flex flex-col space-y-3">
              {(isAuthenticated ? authenticatedNavLinks : publicNavLinks).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-2 py-1 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {isAuthenticated && user ? (
              // Mobile - Logged in user
              <div className="flex flex-col gap-2 pt-4 border-t">
                <div className="flex items-center gap-3 px-2 py-3 rounded-lg bg-muted/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                    {getInitials(user.fullName)}
                  </div>
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${
                      user.role === "INSTRUCTOR" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      {user.role === "INSTRUCTOR" ? "Instructor" : "Student"}
                    </span>
                  </div>
                </div>
                
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted rounded-md"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  My Profile
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted rounded-md"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Settings
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              // Mobile - Not logged in
              <div className="flex flex-col gap-2 pt-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
