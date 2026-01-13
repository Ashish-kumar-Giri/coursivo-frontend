import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/CourseCard"
import pythonImg from "@/assets/python-course.png"
import fullstackImg from "@/assets/fullstack-course.png"
import dsImg from "@/assets/datascience-course.png"
import leadershipImg from "@/assets/leadership-course.png"
import heroStudentImg from "@/assets/hero-student.png"
import { Sparkles, Search, Code, Briefcase, PenTool, LineChart } from "lucide-react"

export default function Home() {
  const recommendedCourses = [
    {
      title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviews: 485932,
      price: "$14.99",
      originalPrice: "$84.99",
      image: pythonImg,
      bestseller: true,
      level: "Beginner",
      duration: "22h 15m"
    },
    {
      title: "The Full Stack Developer's Guide to React and Spring Boot",
      instructor: "Sambhunath Sahoo",
      rating: 4.8,
      reviews: 12450,
      price: "$19.99",
      originalPrice: "$99.99",
      image: fullstackImg,
      bestseller: true,
      level: "Advanced",
      duration: "45h 30m"
    },
    {
      title: "Data Science A-Z™: Real-Life Data Science Exercises Included",
      instructor: "Kirill Eremenko",
      rating: 4.5,
      reviews: 38200,
      price: "$16.99",
      originalPrice: "$89.99",
      image: dsImg,
      bestseller: false,
      level: "Intermediate",
      duration: "28h"
    },
    {
       title: "Executive Leadership Masterclass: Leading with Confidence",
       instructor: "Dr. Sarah Chen",
       rating: 4.9,
       reviews: 15400,
       price: "$24.99",
       originalPrice: "$120.00",
       image: leadershipImg,
       bestseller: true,
       level: "All Levels",
       duration: "12h"
    }
  ]

  const categories = [
    { name: "Development", icon: Code, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Business", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Design", icon: PenTool, color: "text-pink-500", bg: "bg-pink-50" },
    { name: "Marketing", icon: LineChart, color: "text-orange-500", bg: "bg-orange-50" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Coursera-style Hero Section */}
      <section className="bg-accent/30 border-b border-border">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20">
            
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                <span>LEARN FROM EXPERTS</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
                Learn directly from world-class educators
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-muted-foreground max-w-lg">
                Purchase courses and support educators directly. Your payment goes straight to the instructors who create the content you love.
              </p>
              
              {/* Value Prop */}
              <p className="text-foreground font-medium">
                🎯 No subscriptions — pay only for what you need
              </p>
              
              {/* CTA Button */}
              <Button size="lg" className="rounded-lg px-8 h-12 text-base font-semibold">
                Explore Courses
              </Button>
              
              {/* Secondary info */}
              <p className="text-sm">
                <span className="text-primary font-semibold">100% to educators</span>
                <span className="text-muted-foreground"> — we believe in fair compensation</span>
              </p>
            </div>
            
            {/* Right Image */}
            <div className="relative flex justify-center md:justify-end">
              <img 
                src={heroStudentImg} 
                alt="Student achieving career goals" 
                className="w-full max-w-md md:max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="container-padding mx-auto max-w-7xl py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center bg-white p-2 rounded-xl shadow-lg border border-border">
            <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
            <input 
              type="text" 
              placeholder="What do you want to learn?" 
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm h-10 placeholder:text-muted-foreground/70"
            />
            <Button size="lg" className="rounded-lg px-8 font-semibold h-10">Search</Button>
          </div>
        </div>
        
        {/* Categories - Pill Style */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((cat, i) => (
            <button key={i} className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border border-border/50">
              <div className={`${cat.bg} p-2 rounded-lg`}>
                <cat.icon className={`h-4 w-4 ${cat.color}`} />
              </div>
              <span className="font-semibold text-sm text-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Grid */}
      <section className="container-padding mx-auto max-w-7xl mt-24">
        <div className="flex items-end justify-between mb-10">
           <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Editor's Picks</h2>
              <p className="text-muted-foreground">Hand-picked courses to get you started</p>
           </div>
           <Button variant="outline" className="rounded-xl hidden md:flex border-border/60">View All Courses</Button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedCourses.map((course, i) => (
            <CourseCard key={i} {...course} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="rounded-xl w-full">View All Courses</Button>
        </div>
      </section>

      {/* Modern 'Why Us' Section */}
      <section className="container-padding mx-auto max-w-7xl mt-24 mb-12">
         <div className="grid md:grid-cols-2 gap-8 items-center rounded-[2.5rem] bg-foreground text-background p-8 md:p-16 overflow-hidden relative">
            
            {/* Abstract Background on Right */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-800/50 skew-x-12 translate-x-32 hidden md:block" />

            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6 leading-tight">
                 Learning that <br/> feels like <span className="text-accent italic font-serif">play</span>.
               </h2>
               <div className="space-y-6">
                 {[
                   "Interactive code environments",
                   "Community-led peer reviews",
                   "Certificates valid worldwide"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span className="text-lg font-medium text-background/80">{item}</span>
                   </div>
                 ))}
               </div>
               <Button size="lg" className="rounded-xl mt-10 bg-white text-black hover:bg-white/90 font-bold px-8 h-12">
                 Join Coursivo
               </Button>
            </div>
            
            <div className="relative z-10 flex justify-center md:justify-end">
                <div className="relative aspect-square w-full max-w-md bg-zinc-800 rounded-3xl p-6 border border-white/10 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-500">
                    {/* Abstract Code/Content Mockup */}
                    <div className="flex items-center gap-4 mb-6">
                       <div className="h-12 w-12 rounded-full bg-zinc-700" />
                       <div>
                          <div className="h-3 w-32 bg-zinc-700 rounded-full mb-2" />
                          <div className="h-2 w-20 bg-zinc-700 rounded-full" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <div className="h-32 w-full bg-zinc-700/50 rounded-xl" />
                       <div className="grid grid-cols-3 gap-3">
                          <div className="h-20 bg-zinc-700/50 rounded-xl" />
                          <div className="h-20 bg-zinc-700/50 rounded-xl" />
                          <div className="h-20 bg-accent rounded-xl opacity-80" />
                       </div>
                    </div>
                </div>
            </div>
         </div>
      </section>
    </div>
  )
}
