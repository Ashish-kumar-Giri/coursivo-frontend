import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Sidebar, type SidebarConfig } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  config: SidebarConfig;
  storageKey: string;
}

export function DashboardLayout({ config, storageKey }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Initialize from localStorage if available
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : false;
  });

  // Persist collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isCollapsed));
  }, [isCollapsed, storageKey]);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev: boolean) => !prev);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar
          config={config}
          isCollapsed={isCollapsed}
          onToggle={handleToggleCollapse}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Sidebar - always expanded on mobile */}
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <Sidebar
              config={config}
              isCollapsed={false}
              onToggle={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar (Mobile) */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" className="text-foreground" />
          </Link>
          <ThemeToggle />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa] dark:bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
