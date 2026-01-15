import { Star } from "lucide-react"
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
      "group cursor-pointer",
      className
    )}>
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted mb-2">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = "https://placehold.co/400x225/e5e7eb/6b7280?text=Course"
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-bold text-base text-foreground line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <p className="text-xs text-muted-foreground">
          {instructor.fullName}
        </p>
        
        <div className="flex items-center gap-1">
          <span className="font-bold text-sm text-foreground">4.5</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-3 w-3",
                  i < 4 ? "fill-orange-400 text-orange-400" : "fill-orange-200 text-orange-200"
                )} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">(1,234)</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-bold text-base text-foreground">
            {formatPrice(price, currency, isFree)}
          </span>
        </div>
      </div>
    </div>
  )
}
