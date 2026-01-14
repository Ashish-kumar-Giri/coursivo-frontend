import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from './components/layout/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import NotFound from './pages/NotFound'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

// Layout wrapper that conditionally shows Navbar
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
    </div>
  )
}

import { ServerAwakener } from './components/startup/ServerAwakener'

function App() {
  return (
    <ServerAwakener>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* 404 - Catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ServerAwakener>
  )
}

export default App
