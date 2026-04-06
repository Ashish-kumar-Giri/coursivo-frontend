import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore, useIsAuthenticated, useUser } from "@/store/auth.store";
import { getInitials } from "@/lib/user-utils";

const publicNavLinks: { name: string; href: string }[] = [];
const authenticatedNavLinks: { name: string; href: string }[] = [];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const dashboardLink =
    user?.role === "INSTRUCTOR" ? "/instructor/dashboard" : "/dashboard";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="container-padding mx-auto flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo size="md" className="text-foreground" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {(isAuthenticated ? authenticatedNavLinks : publicNavLinks).map(
            (link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ),
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          {isAuthenticated && user ? (
            // Logged in - Show user avatar
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-sm hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-lg hover:shadow-primary/20">
                  {getInitials(user.fullName)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-72 p-2 shadow-2xl border-border/50 rounded-xl"
              >
                <DropdownMenuLabel className="font-normal p-0 mb-2">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-bold text-lg shadow-sm">
                      {getInitials(user.fullName)}
                    </div>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <p className="text-sm font-bold text-foreground truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${
                          user.role === "INSTRUCTOR"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-accent/20 text-accent-foreground border border-accent/20"
                        }`}
                      >
                        {user.role === "INSTRUCTOR" ? (
                          <>
                            <Users className="h-3 w-3" /> Instructor
                          </>
                        ) : (
                          <>
                            <GraduationCap className="h-3 w-3" /> Student
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-border/50" />

                <div className="p-1">
                  <DropdownMenuItem asChild>
                    <Link
                      to={dashboardLink}
                      className="cursor-pointer py-2.5 px-3 flex items-center rounded-md font-medium text-muted-foreground focus:bg-muted focus:text-foreground"
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-border/50" />

                <div className="p-1">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer py-2.5 px-3 rounded-md text-destructive focus:text-destructive focus:bg-destructive/10 font-bold"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Not logged in - Show login/signup buttons
            <div className="hidden items-center gap-3 md:flex">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="font-bold hover:bg-muted/50 rounded-full px-5"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden bg-muted/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overflow */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="container-padding py-6 space-y-6">
            <div className="flex justify-between items-center border-b border-border/50 pb-4">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Navigation
              </span>
              <ThemeToggle />
            </div>

            {(isAuthenticated ? authenticatedNavLinks : publicNavLinks).length >
              0 && (
              <div className="flex flex-col space-y-4">
                {(isAuthenticated ? authenticatedNavLinks : publicNavLinks).map(
                  (link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ),
                )}
              </div>
            )}

            {isAuthenticated && user ? (
              <div className="bg-muted/30 rounded-xl p-4 border border-border/50 shadow-inner">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border/50">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md">
                    {getInitials(user.fullName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-none">
                      {user.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1 mt-1">
                      {user.email}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        user.role === "INSTRUCTOR"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-accent/20 text-accent-foreground border border-accent/20"
                      }`}
                    >
                      {user.role === "INSTRUCTOR" ? "Instructor" : "Student"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to={dashboardLink}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-lg hover:bg-background transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-sm font-bold text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-bold rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
