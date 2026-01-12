import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here as we build them */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
