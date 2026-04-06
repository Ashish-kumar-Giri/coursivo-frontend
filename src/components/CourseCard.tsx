import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/course.types";

export interface CourseCardProps {
  course: Course;
  className?: string;
}

function formatPrice(price: number, currency: string, isFree: boolean): string {
  if (isFree || price === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

function RatingStars({ rating = 4.5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            className={cn(
              "h-3 w-3 shrink-0",
              filled
                ? "fill-amber-400 text-amber-400"
                : half
                  ? "fill-amber-200 text-amber-400"
                  : "fill-muted text-muted-foreground/30",
            )}
          />
        );
      })}
    </div>
  );
}

export function CourseCard({ course, className }: CourseCardProps) {
  const { title, price, currency, isFree, thumbnailUrl, instructor } = course;
  const priceLabel = formatPrice(price, currency, isFree);

  return (
    <Link
      to={`/courses/${course.id}`}
      className={cn(
        "group block flex h-full cursor-pointer flex-col self-stretch overflow-hidden rounded-xl",
        "border border-border/60 bg-card",
        "transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl active:translate-y-0",
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/640x360/f1f5f9/94a3b8?text=Course";
          }}
        />
        {/* Free badge */}
        {(isFree || price === 0) && (
          <span className="absolute left-2 top-2 rounded-full bg-foreground px-2 py-0.5 text-[11px] font-medium leading-5 text-background">
            Free
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-[13px] leading-none text-muted-foreground/80">
          {instructor.fullName}
        </p>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-[13px] font-semibold leading-none text-amber-500">
            4.5
          </span>
          <RatingStars rating={4.5} />
          <span className="text-[11px] font-medium leading-none text-muted-foreground/60">
            (1,234 reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto border-t border-border/40 pt-3">
          <span
            className={cn(
              "text-[14px] font-bold tracking-tight",
              isFree || price === 0 ? "text-emerald-500" : "text-foreground",
            )}
          >
            {priceLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
