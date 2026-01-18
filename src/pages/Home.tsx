import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/CourseCard"
import { courseService } from "@/api/course.service"
import type { Course } from "@/types/course.types"
import { 
  Search, 
  Loader2,
  BookOpen,
  ChevronRight,
  Star
} from "lucide-react"

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublicCourses()
        setCourses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.03),transparent_50%)]" />
          
          <div className="container-padding mx-auto max-w-7xl relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
              
              {/* Left Content */}
              <div className="max-w-xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  New courses added daily
                </div>
                
                {/* Headline */}
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                  Learn without
                  <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    limits
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Start, switch, or advance your career with thousands of courses, hands-on projects, and certificate programs.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
                    Explore Courses
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                    For Business
                  </Button>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="hidden md:block">
                <div className="relative">
                  {/* Main card */}
                  <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-xl p-4">
                          <div className="text-3xl font-bold text-primary mb-1">50M+</div>
                          <div className="text-sm text-muted-foreground">Learners</div>
                        </div>
                        <div className="bg-primary/5 rounded-xl p-4">
                          <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                          <div className="text-sm text-muted-foreground">Courses</div>
                        </div>
                      </div>
                      
                      {/* Course preview */}
                      <div className="space-y-3">
                        <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                            ))}
                          </div>
                          <span className="text-sm font-semibold">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🎉 Popular
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Search Bar Section */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container-padding mx-auto max-w-7xl py-8">
          <div className="max-w-2xl">
            <div className="flex items-center bg-card border border-border shadow-sm">
              <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
              <input 
                type="text" 
                placeholder="Search for anything" 
                className="flex-1 bg-transparent border-none outline-none px-4 text-base h-12 placeholder:text-muted-foreground"
              />
              <Button size="sm" className="m-1 h-10 px-6">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container-padding mx-auto max-w-7xl py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">A broad selection of courses</h2>
          <p className="text-base text-muted-foreground">Choose from over 210,000 online video courses with new additions published every month</p>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {courses.slice(0, 10).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-lg font-semibold">No courses available yet</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new content!</p>
          </div>
        )}

        <div className="mt-8">
          <Link to="/courses">
            <Button variant="outline" className="font-semibold">
              Explore all courses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Become an Instructor CTA */}
      <section className="bg-muted/30 border-y border-border">
          <div className="container-padding mx-auto max-w-7xl py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Teach the world online
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Create an online video course, reach students across the globe, and earn money
                </p>
                
                <Button size="lg" className="h-12 px-6 font-semibold">
                  Start teaching today
                </Button>
              </div>
              
              <div className="hidden md:block">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-muted-foreground/20" />
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
