import { Heart, Star, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/types/course.types"

export interface CourseCardProps {
  course: Course
  className?: string
}

// Format price based on currency
function formatPrice(price: number, currency: string, isFree: boolean): string {
  if (isFree || price === 0) return "Free"
  
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

export function CourseCard({ course, className }: CourseCardProps) {
  const { title, description, price, currency, isFree, thumbnailUrl, instructor } = course

  return (
    <div className={cn(
      "group relative flex flex-col rounded-[2rem] bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/40",
      className
    )}>
      {/* Inset Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = "https://placehold.co/400x300/1e293b/ffffff?text=Course"
          }}
        />
        <button className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground/70 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm">
          <Heart className="h-4 w-4" />
        </button>
        {isFree && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            FREE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-4 px-1">
        <h3 className="line-clamp-2 text-lg font-bold text-foreground leading-snug mb-2">
          {title}
        </h3>
        
        <p className="line-clamp-2 text-sm text-muted-foreground mb-3">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
             <User className="h-3 w-3" />
          </div>
          <span className="truncate">By {instructor.fullName}</span>
        </div>
        
        {/* Spacer to push details to bottom */}
        <div className="mt-auto flex items-end justify-between border-t border-border/40 pt-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-foreground">4.5</span>
                <span className="text-xs text-muted-foreground">(0)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className={cn(
              "text-lg font-bold",
              isFree ? "text-green-600" : "text-primary"
            )}>
              {formatPrice(price, currency, isFree)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
