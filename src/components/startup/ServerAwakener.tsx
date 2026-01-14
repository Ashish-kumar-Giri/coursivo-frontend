import { useEffect, useState } from "react"
import { healthService } from "@/api/health.service"
import { Loader2, Server, Coffee } from "lucide-react"

interface ServerAwakenerProps {
  children: React.ReactNode
}

export function ServerAwakener({ children }: ServerAwakenerProps) {
  const [isAwake, setIsAwake] = useState(false)
  const [startTime] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    let checkInterval: ReturnType<typeof setInterval>

    const checkHealth = async () => {
      try {
        await healthService.checkHealth()
        setIsAwake(true)
      } catch (error) {
        // Ignored, will retry
        console.log("Server still waking up...", error)
      }
    }

    // Initial check
    checkHealth()

    // Retry every 2 seconds
    checkInterval = setInterval(() => {
      if (!isAwake) {
        checkHealth()
      }
    }, 2000)

    // Update elapsed timer for UI fun
    intervalId = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => {
      clearInterval(checkInterval)
      clearInterval(intervalId)
    }
  }, [isAwake, startTime])

  if (isAwake) {
    return <>{children}</>
  }

  // If it responds immediately (local dev), we might flash this screen. 
  // We could add a small delay before showing it, but the user asked for this specific feedback.
  
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm p-4 text-center animate-in fade-in duration-300">
      <div className="max-w-md space-y-8">
        
        <div className="relative mx-auto h-24 w-24">
           <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
           <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
             <Server className="h-10 w-10 text-primary animate-pulse" />
           </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Waking up the server</h2>
          
          <div className="space-y-2 text-muted-foreground">
            <p>
              The backend is hosted on a free service.
            </p>
            <p className="font-medium text-foreground">
              It will take 3-5 minutes to spin up.
            </p>
            <p>
              Getting things ready for you...
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
           <Loader2 className="h-6 w-6 animate-spin text-primary" />
           <span className="text-sm text-muted-foreground tabular-nums">
             Waiting: {elapsed}s
           </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60 bg-muted/50 py-2 px-4 rounded-full">
          <Coffee className="h-4 w-4" />
          <span>Grab a coffee while you wait!</span>
        </div>

      </div>
    </div>
  )
}
