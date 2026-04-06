import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { courseService } from "@/api/course.service";
import type { Course } from "@/types/course.types";
import {
  Loader2,
  BookOpen,
  ChevronRight,
  Star,
  PlayCircle,
  Award,
  Target,
  Zap,
  Globe,
  Shield,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
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
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* 1. Hero Section - Premium Split Layout with Glassmorphism Float */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-background pb-28 pt-20 md:pb-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/10 opacity-50 blur-[120px]" />

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div className="animate-in fade-in slide-in-from-bottom-8 max-w-2xl space-y-8 duration-1000">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Transform your career
              </div>

              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground lg:text-7xl">
                Unlock your <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  true potential
                </span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
                Master the world's most in-demand skills with expert-led
                courses, hands-on projects, and a community of ambitious
                learners.
              </p>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Link to="/courses">
                  <Button className="h-11 w-full px-6 text-sm font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30 sm:w-auto">
                    Explore 10,000+ Courses
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="h-11 w-full bg-background/50 px-6 text-sm font-bold backdrop-blur-sm transition-all hover:-translate-y-0.5 sm:w-auto"
                  >
                    Join for Free
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 border-t border-border/50 pt-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted shadow-sm"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Student"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary shadow-sm">
                    <span className="text-xs font-bold text-primary-foreground">
                      +50k
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-orange-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">4.8/5</span>{" "}
                  <span className="text-muted-foreground">
                    from 10k+ reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Floating Elements */}
            <div className="animate-in fade-in slide-in-from-right-8 relative hidden h-[600px] delay-200 duration-1000 lg:block">
              {/* Main abstract window */}
              <div className="absolute right-0 top-1/2 aspect-square w-[85%] -translate-y-1/2 overflow-hidden rounded border border-border/50 bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl backdrop-blur-md">
                {/* Internal grid mock */}
                <div className="relative h-full w-full p-8">
                  <div className="mb-6 h-8 w-3/4 rounded bg-background/50 backdrop-blur"></div>
                  <div className="mb-4 h-32 w-full rounded bg-background/50 backdrop-blur"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded bg-background/50 backdrop-blur"></div>
                    <div className="h-24 rounded bg-background/50 backdrop-blur"></div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-[10%] top-[20%] w-64 -rotate-3 transform rounded border border-border bg-card p-4 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">
                      Industry Certified
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Recognized worldwide
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -left-[5%] bottom-[25%] w-72 rotate-2 transform rounded border border-border bg-card p-4 shadow-2xl transition-all duration-300 hover:rotate-0">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 animate-ping rounded bg-orange-400/20"></div>
                    <div className="relative flex h-full w-full items-center justify-center rounded bg-orange-400/10 text-orange-500">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">
                      2,500+ Hours
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Of premium video content
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Value Props */}
      <section className="border-b border-border bg-background py-20">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              Why Coursivo?
            </h2>
            <h3 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Built for modern learners
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Learn at your own pace",
                desc: "Access high-quality video courses 24/7 on any device. Lifetime access included.",
              },
              {
                icon: Zap,
                title: "Learn by doing",
                desc: "Interactive quizzes, coding exercises, and real-world projects that put skills to the test.",
              },
              {
                icon: Globe,
                title: "Global community",
                desc: "Join thousands of learners worldwide. Network, share, and grow together.",
              },
            ].map((prop, i) => (
              <div
                key={i}
                className="group rounded border border-border/50 bg-muted/20 p-8 transition-colors hover:bg-muted/50"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <prop.icon className="h-6 w-6" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-foreground">
                  {prop.title}
                </h4>
                <p className="leading-relaxed text-muted-foreground">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="container-padding mx-auto max-w-7xl py-24">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Top courses right now
            </h2>
            <p className="text-lg text-muted-foreground">
              The most popular choices from our global community of learners.
            </p>
          </div>
          <Link to="/courses" className="hidden shrink-0 md:inline-flex">
            <Button variant="outline" className="group font-semibold">
              View all courses
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
              <Loader2 className="relative h-10 w-10 animate-spin text-primary" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Shield className="mb-4 h-12 w-12 text-destructive opacity-50" />
            <p className="font-medium text-destructive">{error}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {courses.slice(0, 10).map((course) => (
              <div key={course.id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded border border-dashed border-border border-border/50 bg-muted/10 py-32 text-center">
            <BookOpen className="mb-6 h-16 w-16 text-muted-foreground/30" />
            <p className="mb-2 text-xl font-bold text-foreground">
              No courses published yet
            </p>
            <p className="max-w-sm text-muted-foreground">
              We're working hard to bring you the best content. Check back very
              soon!
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-10 text-center md:hidden">
          <Link to="/courses">
            <Button
              variant="outline"
              size="lg"
              className="group w-full font-semibold"
            >
              Explore all courses
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. Instructor CTA */}
      <section className="relative isolate overflow-hidden bg-zinc-950 py-24 text-zinc-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_40%)]" />

        <div className="container-padding relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/40 to-black/90">
                  <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition-transform duration-300 hover:scale-110">
                    <PlayCircle className="h-10 w-10 translate-x-0.5 text-white transition-colors group-hover:text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 space-y-6 lg:order-2">
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Become an instructor
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-white/70">
                Share your knowledge with millions of students across the globe.
                We provide the tools, you provide the expertise. Start teaching
                today and earn while you empower others.
              </p>

              <ul className="mb-10 space-y-5 text-white/80">
                {[
                  "Publish your course your way",
                  "Build your personal brand",
                  "Earn money from every enrollment",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 border-0 bg-primary px-8 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:bg-primary/90"
                >
                  Start teaching today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
