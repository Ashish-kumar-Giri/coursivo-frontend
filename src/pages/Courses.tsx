import { useEffect, useState } from "react"
import { CourseCard } from "@/components/CourseCard"
import { courseService } from "@/api/course.service"
import type { Course } from "@/types/course.types"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Courses() {
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
      {/* Header */}
      <section className="bg-accent/30 border-b border-border">
        <div className="container-padding mx-auto max-w-7xl py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our complete catalog of courses from expert instructors
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container-padding mx-auto max-w-7xl py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center bg-card p-2 rounded-xl shadow-sm border border-border">
            <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm h-10 placeholder:text-muted-foreground/70"
            />
          </div>
          <Button variant="outline" className="rounded-xl">
            Filters
          </Button>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container-padding mx-auto max-w-7xl pb-20">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-destructive text-lg mb-2">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && !error && courses.length > 0 && (
          <>
            <div className="mb-6 text-muted-foreground">
              Showing {courses.length} {courses.length === 1 ? 'course' : 'courses'}
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground text-lg">No courses available yet</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new content!</p>
          </div>
        )}
      </section>
    </div>
  )
}
