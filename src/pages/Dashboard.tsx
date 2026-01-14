import { Link } from "react-router-dom"
import { useUser } from "@/store/auth.store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const user = useUser()

  const stats = [
    {
      title: "Enrolled Courses",
      value: "0",
      icon: BookOpen,
      description: "Active courses",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Hours Learned",
      value: "0h",
      icon: Clock,
      description: "This month",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Certificates",
      value: "0",
      icon: Award,
      description: "Earned",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Progress",
      value: "0%",
      icon: TrendingUp,
      description: "Overall completion",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  const recentCourses = [
    // Placeholder - will be populated from API
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container-padding mx-auto max-w-7xl py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.fullName || "Student"}!
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
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
          {/* Continue Learning */}
          <Card className="lg:col-span-2 border-border/40">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Pick up where you left off
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">No courses yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-sm">
                    Start your learning journey by enrolling in a course
                  </p>
                  <Link to="/courses">
                    <Button>Browse Courses</Button>
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
              <Link to="/courses" className="block">
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Courses
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Award className="mr-2 h-4 w-4" />
                My Certificates
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                Learning Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 border-border/40">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your learning history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No activity yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Your recent learning activity will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
