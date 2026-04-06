import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="max-w-md space-y-6 text-center">
        {/* 404 Text */}
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
          <Link to="/">
            <Button size="lg" className="w-full gap-2 sm:w-auto">
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full gap-2 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-border pt-8">
          <p className="mb-3 text-sm text-muted-foreground">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/courses">
              <Button variant="link" size="sm">
                Browse Courses
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="link" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="link" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
