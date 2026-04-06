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
        "group block cursor-pointer flex flex-col rounded-xl overflow-hidden self-stretch h-full",
        "border border-border/60 bg-card",
        "transition-all duration-300 hover:border-border hover:shadow-xl hover:-translate-y-1 active:translate-y-0",
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted shrink-0">
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
          <span className="absolute top-2 left-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground text-background leading-5">
            Free
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-[15px] leading-snug text-foreground line-clamp-2 tracking-tight">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-[13px] text-muted-foreground/80 leading-none">
          {instructor.fullName}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[13px] font-semibold text-amber-500 leading-none">
            4.5
          </span>
          <RatingStars rating={4.5} />
          <span className="text-[11px] text-muted-foreground/60 leading-none font-medium">
            (1,234 reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-border/40">
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
