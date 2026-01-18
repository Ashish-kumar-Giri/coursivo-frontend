import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from './components/layout/Navbar'
import { ServerAwakener } from './components/startup/ServerAwakener'
import { Loader2 } from 'lucide-react'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const Courses = lazy(() => import('./pages/Courses'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SignIn = lazy(() => import('./pages/auth/SignIn'))
const SignUp = lazy(() => import('./pages/auth/SignUp'))

// Instructor pages - lazy loaded separately
const InstructorLayout = lazy(() => import('./components/layout/InstructorLayout').then(m => ({ default: m.InstructorLayout })))
const InstructorDashboard = lazy(() => import('./pages/instructor/InstructorDashboard'))
const CourseBuilder = lazy(() => import('./pages/instructor/CourseBuilder'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

// Layout wrapper that conditionally shows Navbar
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  const isInstructorPage = location.pathname.startsWith('/instructor')

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {!isAuthPage && !isInstructorPage && <Navbar />}
      <main>{children}</main>
    </div>
  )
}

function App() {
  return (
    <ServerAwakener>
      <BrowserRouter>
        <AppLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Instructor Routes - with sidebar layout */}
              <Route path="/instructor" element={<InstructorLayout />}>
                <Route path="dashboard" element={<InstructorDashboard />} />
                <Route path="courses/create" element={<CourseBuilder />} />
                <Route path="courses/:id/edit" element={<CourseBuilder />} />
              </Route>

              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* 404 - Catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ServerAwakener>
  )
}

export default App
