import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { BookOpen, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/api/auth.service"
import { useAuthStore } from "@/store/auth.store"

export default function SignIn() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoPassword, setShowDemoPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isLoading) return
    
    setIsLoading(true)

    try {
      const { token } = await authService.login({
        email: formData.email,
        password: formData.password,
      })

      // Save token to store (also persists to localStorage)
      setAuth(token)

      // Get user from store to check role
      const user = useAuthStore.getState().user

      toast.success("Welcome back!")

      // Redirect based on role
      if (user?.role === "INSTRUCTOR") {
        navigate("/instructor/dashboard", { replace: true })
      } else {
        navigate("/dashboard", { replace: true })
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between bg-gradient-to-br from-background via-muted/30 to-background border-r border-border overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-foreground font-serif tracking-tight">
            Coursivo
          </span>
        </Link>
        
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(var(--primary),0.1)]">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
             </span>
             Welcome Back
           </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Unlock your <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              true potential
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-sm">
            Continue where you left off and keep building your skills with industry experts.
          </p>
        </div>
        
        <p className="text-muted-foreground/60 text-sm font-medium relative z-10">
          © 2024 Coursivo. All rights reserved.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-foreground font-serif">
                Coursivo
              </span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Sign in</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Quick Login Options */}
          <div className="space-y-3 pt-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  For Demo Purpose
                </span>
              </div>
            </div>

            {/* Demo Educator Credentials */}
            <div className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">Demo Educator</p>
                  <p className="text-sm font-mono truncate">rahul@gmail.com</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono">
                      {showDemoPassword ? "3Tr3ogG(!}zy55hl>5E" : "••••••••••••••••••"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowDemoPassword(!showDemoPassword)}
                      className="text-xs text-primary hover:underline"
                    >
                      {showDemoPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="shrink-0 h-8 px-3"
                  onClick={() => {
                    setFormData({
                      email: "rahul@gmail.com",
                      password: "3Tr3ogG(!}zy55hl>5E"
                    })
                    toast.info("Demo credentials applied!")
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Demo Student Credentials */}
            <div className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">Demo Student</p>
                  <p className="text-sm font-mono truncate">vishalstu@yopmail.com</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono">
                      {showDemoPassword ? "123456" : "••••••"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowDemoPassword(!showDemoPassword)}
                      className="text-xs text-primary hover:underline"
                    >
                      {showDemoPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="shrink-0 h-8 px-3"
                  onClick={() => {
                    setFormData({
                      email: "vishalstu@yopmail.com",
                      password: "123456"
                    })
                    toast.info("Demo student credentials applied!")
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
