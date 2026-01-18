interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

// Professional logo icon for Coursivo - represents learning/growth with an abstract book + play button design
export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 40, text: "text-2xl" },
  }

  const { icon: iconSize, text: textSize } = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Abstract book with play button, representing learning content */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background circle */}
        <rect
          width="40"
          height="40"
          rx="8"
          className="fill-primary"
        />
        {/* Play/Learn symbol - combines book spine with forward arrow */}
        <path
          d="M12 10C12 9.44772 12.4477 9 13 9H16C16.5523 9 17 9.44772 17 10V30C17 30.5523 16.5523 31 16 31H13C12.4477 31 12 30.5523 12 30V10Z"
          className="fill-primary-foreground"
          opacity="0.9"
        />
        {/* Forward arrow / play button */}
        <path
          d="M20 14L30 20L20 26V14Z"
          className="fill-primary-foreground"
        />
      </svg>
      
      {showText && (
        <span className={`font-bold tracking-tight text-current ${textSize}`}>
          coursivo
        </span>
      )}
    </div>
  )
}

// Simple icon-only version for collapsed sidebar
export function LogoIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Background */}
      <rect
        width="40"
        height="40"
        rx="8"
        className="fill-primary"
      />
      {/* Book spine */}
      <path
        d="M12 10C12 9.44772 12.4477 9 13 9H16C16.5523 9 17 9.44772 17 10V30C17 30.5523 16.5523 31 16 31H13C12.4477 31 12 30.5523 12 30V10Z"
        className="fill-primary-foreground"
        opacity="0.9"
      />
      {/* Play arrow */}
      <path
        d="M20 14L30 20L20 26V14Z"
        className="fill-primary-foreground"
      />
    </svg>
  )
}
