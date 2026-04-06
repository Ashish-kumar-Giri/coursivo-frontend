import { Link } from "react-router-dom";
import { useUser } from "@/store/auth.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, TrendingUp, MoveRight } from "lucide-react";

export default function Dashboard() {
  const user = useUser();

  const recentCourses: any[] = []; // Placeholder

  return (
    <div className="min-h-full bg-background font-sans selection:bg-primary/20 pb-20">
      {/* 1. Header Section - Premium Gradient */}
      <section className="relative py-6 overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[80px] opacity-60 pointer-events-none" />

        <div className="container-padding mx-auto max-w-7xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-foreground mb-1.5">
            Welcome back, {user?.fullName || "Student"}!
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Continue your learning journey and track your overall progress
            across classes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-padding mx-auto max-w-7xl pt-12">
        <div className="grid gap-6 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {/* Continue Learning */}
          <Card className="lg:col-span-2 border-border/40 shadow-sm">
            <CardHeader className="border-b border-border/40 pb-4 mb-4">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Continue Learning
              </CardTitle>
              <CardDescription className="text-sm">
                Pick up exactly where you left off
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="rounded-full bg-muted/50 border border-border p-5 mb-6 shadow-sm">
                    <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground tracking-tight">
                    No courses yet
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-sm text-sm">
                    Start your learning journey by enrolling in a new exciting
                    course today.
                  </p>
                  <Link to="/courses">
                    <Button
                      size="lg"
                      className="font-medium gap-2 hover:scale-105 transition-transform shadow-md"
                    >
                      Browse Full Catalog
                      <MoveRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Course items will go here */}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-border/40 shadow-sm bg-gradient-to-b from-background to-muted/20">
              <CardHeader className="border-b border-border/40 pb-4 mb-4">
                <CardTitle className="text-xl font-semibold tracking-tight">
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/courses" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 font-medium border-border/50 hover:bg-muted/50"
                  >
                    <BookOpen className="mr-3 h-5 w-5 text-primary" />
                    Browse Catalog
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 font-medium border-border/50 hover:bg-muted/50 cursor-not-allowed opacity-70"
                >
                  <Award className="mr-3 h-5 w-5 text-amber-500" />
                  My Certificates
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 font-medium border-border/50 hover:bg-muted/50 cursor-not-allowed opacity-70"
                >
                  <TrendingUp className="mr-3 h-5 w-5 text-emerald-500" />
                  Learning Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
