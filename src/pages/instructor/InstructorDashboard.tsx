import { Link } from "react-router-dom"
import { useUser } from "@/store/auth.store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, DollarSign, TrendingUp, Plus, Eye, Edit } from "lucide-react"

export default function InstructorDashboard() {
  const user = useUser()

  const stats = [
    {
      title: "Total Courses",
      value: "0",
      icon: BookOpen,
      description: "Published courses",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Students",
      value: "0",
      icon: Users,
      description: "Enrolled students",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: "₹0",
      icon: DollarSign,
      description: "This month",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg. Rating",
      value: "0.0",
      icon: TrendingUp,
      description: "Course ratings",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const myCourses = [
    // Placeholder - will be populated from API
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container-padding mx-auto max-w-7xl py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.fullName || "Instructor"}!
              </h1>
              <p className="text-muted-foreground">
                Manage your courses and track your performance
              </p>
            </div>
            <Link to="/instructor/courses/create">
              <Button size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-padding mx-auto max-w-7xl py-8">
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* My Courses */}
          <Card className="lg:col-span-2 border-border/40">
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

          {/* Quick Actions */}
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Shortcuts to common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/instructor/courses/create" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              </Link>
              <Link to="/instructor/courses" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Manage Courses
                </Button>
              </Link>
              <Link to="/instructor/students" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  View Students
                </Button>
              </Link>
              <Link to="/instructor/analytics" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 border-border/40">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest student enrollments and course updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No activity yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Your recent activity will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
