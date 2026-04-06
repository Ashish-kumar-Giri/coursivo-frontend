import { useEffect, useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { courseService } from "@/api/course.service";
import type { Course } from "@/types/course.types";
import { BookOpen, Compass, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

function CourseCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-lg border border-border/60 bg-card">
      {/* Thumbnail */}
      <div className="aspect-video w-full shrink-0 bg-muted" />
      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Title */}
        <div className="h-3.5 w-full rounded bg-muted" />
        <div className="h-3.5 w-4/5 rounded bg-muted" />
        {/* Instructor */}
        <div className="mt-0.5 h-3 w-1/2 rounded bg-muted" />
        {/* Rating */}
        <div className="h-3 w-2/3 rounded bg-muted" />
        {/* Price */}
        <div className="mt-auto border-t border-border/50 pt-1.5">
          <div className="h-3.5 w-1/3 rounded bg-muted" />
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
    <div className="min-h-screen bg-background pb-20 font-sans selection:bg-primary/20">
      {/* 1. Header Section - Premium Gradient */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-background pb-24 pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 opacity-60 blur-[100px]" />

        <div className="container-padding animate-in fade-in slide-in-from-bottom-8 relative z-10 mx-auto max-w-7xl text-center duration-1000">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary shadow-sm">
            <Compass className="h-4 w-4" />
            Discover
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Explore our complete <br className="hidden sm:block" /> catalog of
            courses
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
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
            <Shield className="mb-4 h-12 w-12 text-destructive opacity-50" />
            <p className="text-lg font-medium text-destructive">{error}</p>
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
          <div className="animate-in fade-in delay-300 duration-1000">
            <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                All Courses
              </h2>
              <span className="rounded-full bg-muted/50 px-3 py-1 text-sm font-semibold text-muted-foreground">
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
          <div className="animate-in fade-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-muted/10 py-32 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-sm">
              <BookOpen className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <p className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              No courses found
            </p>
            <p className="max-w-md text-lg text-muted-foreground">
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
