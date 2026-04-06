import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { courseService } from "@/api/course.service";
import type { Course } from "@/types/course.types";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Globe,
  PlayCircle,
  Shield,
  Trophy,
  CheckCircle2,
  Zap,
  CalendarDays,
  BadgeIndianRupee,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price: number, currency: string, isFree: boolean): string {
  if (isFree || price === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await courseService.getCourseById(Number(id));
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground animate-pulse">
        {/* Hero skeleton */}
        <div className="border-b border-border/60 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:pt-24 md:pb-14">
            <div className="h-4 w-32 bg-muted rounded mb-8" />
            <div className="max-w-2xl space-y-3">
              <div className="flex gap-2 mb-4">
                <div className="h-5 w-12 bg-muted rounded-full" />
                <div className="h-5 w-20 bg-muted rounded-full" />
              </div>
              <div className="h-7 bg-muted rounded w-3/4" />
              <div className="h-7 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-full mt-2" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="flex items-center gap-2 mt-4">
                <div className="h-7 w-7 bg-muted rounded-full" />
                <div className="h-4 w-40 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Body skeleton */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left */}
            <div className="flex-1 space-y-10">
              {/* Instructor card */}
              <div className="p-5 rounded-lg border border-border/60 bg-card flex items-start gap-4">
                <div className="h-14 w-14 bg-muted rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
              {/* Details table */}
              <div className="rounded-lg border border-border/60 bg-card divide-y divide-border/40">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                    <div className="h-4 w-4 bg-muted rounded shrink-0" />
                    <div className="h-3.5 bg-muted rounded w-24 shrink-0" />
                    <div className="h-3.5 bg-muted rounded w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — purchase card skeleton */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
                <div className="aspect-video w-full bg-muted" />
                <div className="p-5 space-y-4">
                  <div className="h-7 bg-muted rounded w-1/3" />
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded w-full" />
                  <div className="border-t border-border/40 pt-4 space-y-3">
                    <div className="h-3.5 bg-muted rounded w-3/4" />
                    <div className="h-3.5 bg-muted rounded w-2/3" />
                    <div className="h-3.5 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Shield className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-lg font-semibold tracking-tight text-foreground mb-1">
          Course not found
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          {error ?? "This course may have been removed or is unavailable."}
        </p>
        <Button
          variant="outline"
          className="font-medium"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const priceLabel = formatPrice(course.price, course.currency, course.isFree);

  // ── Purchase card ──
  const purchaseCard = (
    <div className="rounded-lg border border-border/60 bg-card overflow-hidden shadow-sm">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {course.thumbnailUrl ? (
          <>
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
              <PlayCircle className="h-10 w-10 text-muted-foreground/30" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-10 w-10 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <span
            className={cn(
              "text-2xl font-semibold tracking-tight",
              course.isFree || course.price === 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-foreground",
            )}
          >
            {priceLabel}
          </span>
          {!course.isFree && course.price > 0 && (
            <p className="text-[11px] text-muted-foreground mt-0.5">
              30-day money-back guarantee
            </p>
          )}
        </div>

        <Button
          className="w-full font-medium bg-primary text-primary-foreground"
          onClick={() => setEnrolled(true)}
        >
          {enrolled ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Enrolled
            </>
          ) : course.isFree || course.price === 0 ? (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Enrol for Free
            </>
          ) : (
            "Buy Now"
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full font-medium border-border/50 hover:bg-muted/50"
        >
          Add to Wishlist
        </Button>

        {/* Course meta */}
        <div className="border-t border-border/40 pt-4 space-y-2.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BadgeIndianRupee className="h-3.5 w-3.5 shrink-0" />
            <span>
              Currency:{" "}
              <span className="text-foreground font-medium">
                {course.currency}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>Full lifetime access</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="h-3.5 w-3.5 shrink-0" />
            <span>Certificate of completion</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:pt-24 md:pb-14">
          <nav className="flex items-center gap-2 text-[13px] text-muted-foreground mb-8">
            <Link
              to="/courses"
              className="hover:text-foreground transition-colors font-medium"
            >
              Courses
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-semibold line-clamp-1">
              {course.title}
            </span>
          </nav>

          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {(course.isFree || course.price === 0) && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground text-background">
                  Free
                </span>
              )}
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground uppercase tracking-widest">
                {course.status}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug mb-3">
              {course.title}
            </h1>

            {course.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {course.description}
              </p>
            )}

            {/* Instructor */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
                {course.instructor.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-muted-foreground">
                Instructor:{" "}
                <span className="font-medium text-foreground">
                  {course.instructor.fullName}
                </span>
              </span>
            </div>
          </div>

          {/* Mobile purchase card */}
          <div className="mt-8 lg:hidden">{purchaseCard}</div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left — content sections */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* About the Instructor */}
            <section>
              <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">
                About the Instructor
              </h2>
              <div className="flex items-start gap-4 p-5 rounded-lg border border-border/60 bg-card">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xl font-semibold shrink-0">
                  {course.instructor.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold tracking-tight text-foreground">
                    {course.instructor.fullName}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    Instructor · ID #{course.instructor.id}
                  </p>
                </div>
              </div>
            </section>

            {/* Course Info */}
            <section>
              <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">
                Course Details
              </h2>
              <div className="rounded-lg border border-border/60 bg-card divide-y divide-border/40">
                {[
                  { icon: BookOpen, label: "Title", value: course.title },
                  { icon: BadgeIndianRupee, label: "Price", value: priceLabel },
                  { icon: Globe, label: "Currency", value: course.currency },
                  {
                    icon: CalendarDays,
                    label: "Published",
                    value: formatDate(course.createdAt),
                  },
                  {
                    icon: CalendarDays,
                    label: "Last updated",
                    value: formatDate(course.updatedAt),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 px-5 py-3.5"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground w-28 shrink-0">
                      {label}
                    </span>
                    <span className="text-sm text-foreground font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right — sticky purchase card (desktop) */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-20">{purchaseCard}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
