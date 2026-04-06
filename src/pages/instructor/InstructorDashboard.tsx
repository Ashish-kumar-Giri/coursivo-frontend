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
import { BookOpen, Users, Plus, BarChart } from "lucide-react";

export default function InstructorDashboard() {
  const user = useUser();

  const stats = [
    {
      title: "Total Courses",
      value: "0",
      icon: BookOpen,
      description: "Published actively",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Total Students",
      value: "0",
      icon: Users,
      description: "Enrolled globally",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Total Revenue",
      value: "$0",
      icon: BarChart,
      description: "Lifetime earnings",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  const myCourses: any[] = []; // Placeholder

  return (
    <div className="min-h-full bg-background font-sans selection:bg-primary/20 pb-20">
      {/* Header Section - Premium Gradient */}
      <section className="relative py-6 overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute top-0 left-0 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[80px] opacity-60 pointer-events-none" />

        <div className="container-padding mx-auto max-w-7xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-foreground mb-1.5">
                Hello, {user?.fullName || "Instructor"}
              </h1>
              <p className="text-sm text-muted-foreground max-w-xl">
                Manage your curriculum, track enrollments, and monitor your
                success.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link to="/instructor/courses/create">
                <Button
                  size="sm"
                  className="font-medium gap-2 text-primary-foreground shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Create New Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-padding mx-auto max-w-7xl pt-10">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground tracking-tight">
                  {stat.title}
                </CardTitle>
                <div
                  className={`${stat.bgColor} ${stat.borderColor} border p-2 rounded-xl`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold tracking-tight text-foreground mb-1">
                  {stat.value}
                </div>
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {/* My Courses Manager */}
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="border-b border-border/40 pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold tracking-tight">
                    Your Courses
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Content you are actively managing
                  </CardDescription>
                </div>
                <Link to="/instructor/courses">
                  <Button variant="outline" size="sm" className="font-medium">
                    View Catalog
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {myCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="rounded-full bg-muted/50 border border-border p-5 mb-6 shadow-sm">
                    <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground tracking-tight">
                    No published courses
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-sm text-sm">
                    Start creating your very first course and share your
                    knowledge globally.
                  </p>
                  <Link to="/instructor/courses/create">
                    <Button className="font-medium shadow-sm hover:-translate-y-0.5 transition-transform">
                      <Plus className="mr-2 h-4 w-4" />
                      Build Your First Course
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
        </div>
      </div>
    </div>
  );
}
