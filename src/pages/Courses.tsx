import { useEffect, useState } from "react"
import { CourseCard } from "@/components/CourseCard"
import { courseService } from "@/api/course.service"
import type { Course } from "@/types/course.types"
import { Loader2, Search, SlidersHorizontal } from "lucide-react"
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
      <section className="bg-background border-b border-border">
        <div className="container-padding mx-auto max-w-7xl py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All Courses
          </h1>
          <p className="text-base text-muted-foreground">
            Explore our complete catalog of courses
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container-padding mx-auto max-w-7xl py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center bg-card border border-border shadow-sm">
              <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="flex-1 bg-transparent border-none outline-none px-4 text-base h-12 placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="container-padding mx-auto max-w-7xl py-8">
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
            <div className="mb-6 text-sm text-muted-foreground">
              {courses.length} {courses.length === 1 ? 'course' : 'courses'}
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground text-lg font-semibold">No courses available yet</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new content!</p>
          </div>
        )}
      </section>
    </div>
  )
}
