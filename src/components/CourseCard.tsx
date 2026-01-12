import { Heart, Star, User } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CourseCardProps {
  image: string
  title: string
  instructor: string
  rating: number
  reviews: number
  price: string
  originalPrice?: string
  bestseller?: boolean
  level?: string
  duration?: string
  className?: string
}

export function CourseCard({
  image,
  title,
  instructor,
  rating,
  reviews,
  price,
  originalPrice,
  className,
}: CourseCardProps) {
  return (
    <div className={cn(
      "group relative flex flex-col rounded-[2rem] bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/40",
      className
    )}>
      {/* Inset Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground/70 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-4 px-1">
        <h3 className="line-clamp-2 text-lg font-bold text-foreground leading-snug mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
             <User className="h-3 w-3" />
          </div>
          <span className="truncate">By {instructor}</span>
        </div>
        
        {/* Spacer to push details to bottom */}
        <div className="mt-auto flex items-end justify-between border-t border-border/40 pt-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-foreground">{rating}</span>
                <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-primary">{price}</span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/60">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
