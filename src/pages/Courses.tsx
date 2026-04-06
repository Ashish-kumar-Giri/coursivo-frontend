import { useEffect, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courseService } from "@/api/course.service";
import type { Course } from "@/types/course.types";
import { BookOpen, Compass, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

function CourseCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-border/60 bg-card animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-video w-full bg-muted shrink-0" />
      {/* Content */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        {/* Title */}
        <div className="h-3.5 bg-muted rounded w-full" />
        <div className="h-3.5 bg-muted rounded w-4/5" />
        {/* Instructor */}
        <div className="h-3 bg-muted rounded w-1/2 mt-0.5" />
        {/* Rating */}
        <div className="h-3 bg-muted rounded w-2/3" />
        {/* Price */}
        <div className="mt-auto pt-1.5 border-t border-border/50">
          <div className="h-3.5 bg-muted rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublicCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 pb-20">
      {/* 1. Header Section - Premium Gradient */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        <div className="container-padding mx-auto max-w-7xl relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase shadow-sm mb-6">
            <Compass className="h-4 w-4" />
            Discover
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Explore our complete <br className="hidden sm:block" /> catalog of
            courses
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From critical skills to technical topics, Coursivo supports your
            professional development with access to thousands of courses.
          </p>
        </div>
      </section>

      {/* Search and Filters removed as per request */}

      {/* 3. Courses Grid */}
      <section className="container-padding mx-auto max-w-7xl pt-16">
        {/* Loading State — Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Shield className="h-12 w-12 text-destructive mb-4 opacity-50" />
            <p className="text-destructive font-medium text-lg">{error}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-6"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && !error && courses.length > 0 && (
          <div className="animate-in fade-in duration-1000 delay-300">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border/50">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                All Courses
              </h2>
              <span className="text-sm font-semibold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                {courses.length} {courses.length === 1 ? "result" : "results"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {courses.map((course) => (
                <div key={course.id}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-muted/10 rounded-2xl border border-dashed border-border/50 animate-in fade-in">
            <div className="w-20 h-20 bg-background rounded-full shadow-sm flex items-center justify-center mb-6">
              <BookOpen className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <p className="text-foreground text-2xl font-bold tracking-tight mb-2">
              No courses found
            </p>
            <p className="text-muted-foreground max-w-md text-lg">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <Button
              variant="outline"
              className="mt-8 font-bold"
              onClick={() => window.location.reload()}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
