import { Link } from "react-router-dom"
import { useUser } from "@/store/auth.store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { SearchBar } from "@/components/ui/SearchBar"

export default function InstructorDashboard() {
  const user = useUser()

  const stats = [
    {
      title: "Total Courses",
      value: "0",
      icon: BookOpen,
      description: "Published courses",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Students",
      value: "0",
      icon: Users,
      description: "Enrolled students",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const myCourses = [
    // Placeholder - will be populated from API
  ]

  return (
    <div className="min-h-full bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                Welcome back, {user?.fullName || "Instructor"}!
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Manage your courses and track your performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <SearchBar className="hidden lg:flex w-64" />
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              <Link to="/instructor/courses/create">
                <Button size="lg" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Create Course</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          {/* My Courses */}
          <Card className="border-border/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>
                    Manage your published courses
                  </CardDescription>
                </div>
                <Link to="/instructor/courses">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {myCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No courses yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Start creating your first course and share your knowledge with students
                  </p>
                  <Link to="/instructor/courses/create">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Course
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
  )
}
