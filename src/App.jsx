import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Row } from './components/ui'
import Home from './pages/Home'

// Each page group exports `<group>Routes` from src/pages/<group>/routes.jsx; pick them all up.
const groups = import.meta.glob('./pages/*/routes.jsx', { eager: true })
const groupRoutes = Object.values(groups).flatMap(m => Object.entries(m).filter(([k]) => k.endsWith('Routes')).flatMap(([, v]) => v))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

// Routes that render without the site footer, matching the original.
const NO_FOOTER = new Set(['/specialist-agents'])

function SiteFooter() {
  const { pathname } = useLocation()
  return NO_FOOTER.has(pathname) ? null : <Footer />
}

function NotFound() {
  return (
    <Row>
      <div className="py-28 px-6 md:px-12 lg:px-20 min-h-[60vh]">
        <h1 className="text-[48px] leading-[1.1] tracking-[-0.15rem] text-ink">Page not found</h1>
        <p className="mt-5 text-base leading-[25.6px] text-muted max-w-xl">This page is still being built, or it doesn't exist.</p>
        <Link to="/" className="btn-secondary font-sans mt-8">Back to home</Link>
      </div>
    </Row>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Navbar />
      <main className="pt-16 bg-white overflow-x-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          {groupRoutes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </BrowserRouter>
  )
}
