import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/CourseCard"
import { courseService } from "@/api/course.service"
import type { Course } from "@/types/course.types"
import { 
  Loader2, BookOpen, ChevronRight, Star,
  PlayCircle, Award, Target, Zap, Globe, Shield, CheckCircle2
} from "lucide-react"

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublicCourses()
        setCourses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      
      {/* 1. Hero Section - Premium Split Layout with Glassmorphism Float */}
      <section className="relative pt-20 pb-28 md:pb-32 overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        <div className="container-padding mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Transform your career
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                Unlock your <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  true potential
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Master the world's most in-demand skills with expert-led courses, hands-on projects, and a community of ambitious learners.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/courses">
                  <Button size="lg" className="h-14 px-8 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                    Explore 10,000+ Courses
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold bg-background/50 backdrop-blur-sm hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                    Join for Free
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-6 border-t border-border/50">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center shadow-sm overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center shadow-sm z-10">
                    <span className="text-xs font-bold text-primary-foreground">+50k</span>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-orange-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="font-semibold text-foreground">4.8/5</span> <span className="text-muted-foreground">from 10k+ reviews</span>
                </div>
              </div>
            </div>

            {/* Right Visual Floating Elements */}
            <div className="relative hidden lg:block h-[600px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
              {/* Main abstract window */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded border border-border/50 shadow-2xl overflow-hidden backdrop-blur-md">
                 {/* Internal grid mock */}
                 <div className="w-full h-full p-8 relative">
                    <div className="w-3/4 h-8 bg-background/50 rounded mb-6 backdrop-blur"></div>
                    <div className="w-full h-32 bg-background/50 rounded mb-4 backdrop-blur"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-background/50 rounded backdrop-blur"></div>
                      <div className="h-24 bg-background/50 rounded backdrop-blur"></div>
                    </div>
                 </div>
              </div>
              
              {/* Floating Card 1 */}
              <div className="absolute top-[20%] -left-[10%] bg-card p-4 rounded border border-border shadow-2xl w-64 transform -rotate-3 hover:rotate-0 transition-all duration-300">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary">
                     <Award className="h-6 w-6" />
                   </div>
                   <div>
                     <div className="font-bold text-foreground">Industry Certified</div>
                     <div className="text-xs text-muted-foreground">Recognized worldwide</div>
                   </div>
                 </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-[25%] -left-[5%] bg-card p-4 rounded border border-border shadow-2xl w-72 transform rotate-2 hover:rotate-0 transition-all duration-300">
                 <div className="flex items-center gap-4">
                   <div className="relative w-12 h-12">
                     <div className="absolute inset-0 bg-orange-400/20 rounded animate-ping"></div>
                     <div className="relative w-full h-full bg-orange-400/10 rounded flex items-center justify-center text-orange-500">
                       <PlayCircle className="h-6 w-6" />
                     </div>
                   </div>
                   <div>
                     <div className="font-bold text-foreground">2,500+ Hours</div>
                     <div className="text-xs text-muted-foreground">Of premium video content</div>
                   </div>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Key Value Props */}
      <section className="py-20 border-b border-border bg-background">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Why Coursivo?</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Built for modern learners</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Learn at your own pace", desc: "Access high-quality video courses 24/7 on any device. Lifetime access included." },
              { icon: Zap, title: "Learn by doing", desc: "Interactive quizzes, coding exercises, and real-world projects that put skills to the test." },
              { icon: Globe, title: "Global community", desc: "Join thousands of learners worldwide. Network, share, and grow together." }
            ].map((prop, i) => (
              <div key={i} className="group p-8 rounded border border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <prop.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{prop.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="container-padding mx-auto max-w-7xl py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Top courses right now</h2>
            <p className="text-lg text-muted-foreground">The most popular choices from our global community of learners.</p>
          </div>
          <Link to="/courses" className="hidden md:inline-flex shrink-0">
            <Button variant="outline" className="font-semibold group">
              View all courses
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <Loader2 className="h-10 w-10 animate-spin text-primary relative" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Shield className="h-12 w-12 text-destructive mb-4 opacity-50" />
            <p className="text-destructive font-medium">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {courses.slice(0, 10).map((course) => (
              <div key={course.id} className="group h-full">
                <div className="h-full transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <CourseCard course={course} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && courses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-muted/10 rounded border border-dashed border-border border-border/50">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-6" />
            <p className="text-foreground text-xl font-bold mb-2">No courses published yet</p>
            <p className="text-muted-foreground max-w-sm">We're working hard to bring you the best content. Check back very soon!</p>
          </div>
        )}
        
        {/* Mobile View All */}
        <div className="mt-10 text-center md:hidden">
          <Link to="/courses">
            <Button variant="outline" size="lg" className="w-full font-semibold group">
              Explore all courses
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. Instructor CTA */}
      <section className="relative overflow-hidden bg-zinc-950 text-zinc-50 py-24 isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_40%)]" />
        
        <div className="container-padding mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-black/90 flex items-center justify-center">
                   <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 group">
                     <PlayCircle className="h-10 w-10 text-white translate-x-0.5 group-hover:text-primary transition-colors" />
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                Become an instructor
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                Share your knowledge with millions of students across the globe. We provide the tools, you provide the expertise. Start teaching today and earn while you empower others.
              </p>
              
              <ul className="space-y-5 mb-10 text-white/80">
                {['Publish your course your way', 'Build your personal brand', 'Earn money from every enrollment'].map((item, i) => (
                   <li key={i} className="flex items-center gap-4">
                     <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                       <CheckCircle2 className="h-5 w-5" />
                     </div>
                     <span className="font-medium text-lg">{item}</span>
                   </li>
                ))}
              </ul>

              <Link to="/signup">
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-0 hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/20">
                  Start teaching today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
