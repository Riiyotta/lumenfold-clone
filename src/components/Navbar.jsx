import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../content'
import { linkFor } from '../linkMap'
import { Logo, Chevron, Menu, Close } from './ui'

export default function Navbar() {
  const [glow, setGlow] = useState({ x: 0, y: 0, on: false })
  const [open, setOpen] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [section, setSection] = useState(null)
  const ref = useRef(null)
  const timer = useRef()
  const openRef = useRef(null)
  const lastClose = useRef(0)
  openRef.current = open

  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, on: true })
  }
  // Radix NavigationMenu defaults measured on the original: open after 200ms (delayDuration),
  // immediate when a menu is already open or was closed <300ms ago (skipDelayDuration), close after 150ms.
  const enter = i => {
    clearTimeout(timer.current)
    if (openRef.current !== null || performance.now() - lastClose.current < 300) setOpen(i)
    else timer.current = setTimeout(() => setOpen(i), 200)
  }
  const stay = i => { clearTimeout(timer.current); setOpen(i) }
  const leave = () => { clearTimeout(timer.current); if (openRef.current === null) return; timer.current = setTimeout(() => { lastClose.current = performance.now(); setOpen(null) }, 150) }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { setGlow(g => ({ ...g, on: false })); leave() }}
        className="relative bg-white/80 backdrop-blur-md border-b border-line">
        <div className="pointer-events-none absolute inset-0 transition-opacity duration-300" style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(600px circle at ${glow.x}px ${glow.y}px, rgba(96,86,255,0.08), transparent 40%), radial-gradient(240px circle at ${glow.x}px ${glow.y}px, rgba(96,86,255,0.12), transparent 50%)`,
        }} />

        {/* Desktop */}
        <div className="relative hidden header:flex h-16">
          <div className="flex-1 flex items-center justify-end pr-6 border-r border-line min-w-[224px]"><Logo /></div>
          <nav className="relative px-6 flex items-center">
            <ul className="flex items-center">
              {nav.map((item, i) => (
                <li key={item.label} onMouseEnter={() => item.columns ? enter(i) : leave()} onMouseLeave={leave}>
                  <Link to={item.columns ? '#' : linkFor(item.label)} onClick={e => item.columns && e.preventDefault()} className={`font-sans flex items-center px-4 py-2 text-sm transition-colors duration-150 ${open === i ? 'text-indigo-brand' : 'text-ink hover:text-indigo-brand'}`}>
                    {item.label}
                    {item.columns && <Chevron className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />}
                  </Link>
                </li>
              ))}
            </ul>
            {/* The original's tailwindcss-animate fade classes ship no CSS, so the panel appears/disappears instantly. */}
            {open !== null && nav[open].columns && (
                <div key={open}
                  onMouseEnter={() => stay(open)} onMouseLeave={leave}
                  className="absolute left-0 top-full w-max bg-white border border-line shadow-mega-menu">
                  <div className="flex flex-wrap gap-x-12 gap-y-8 max-w-[1000px] pt-7 pb-7 pr-14 pl-9">
                    {nav[open].columns.map(col => (
                      <div key={col.heading} className="min-w-[170px]">
                        <div className="text-[15px] leading-[22.5px] text-muted mb-2">{col.heading}</div>
                        <ul>
                          {col.items.map(it => (
                            <li key={it}><Link to={linkFor(it)} onClick={() => setOpen(null)} className="block rounded-lg -mx-3 px-3 py-2 text-[15px] font-medium text-ink hover:bg-tile-base hover:text-indigo-brand transition-colors duration-150">{it}</Link></li>
                          ))}
                        </ul>
                        <a href="#" className="group inline-flex items-center gap-1 rounded-md -mx-2 px-2 py-1 mt-2 text-[13px] text-muted hover:bg-tile-base hover:text-indigo-brand transition-colors duration-150">
                          View all <Chevron dir="right" className="w-[13px] h-[13px] transition-transform duration-150 group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
            )}
          </nav>
          <div className="flex-1 flex items-center justify-start gap-3 pl-6 border-l border-line min-w-[290px]">
            <a href="#" className="btn-secondary font-sans">Sign in</a>
            <Link to="/book-a-demo" className="btn-primary">Start for free</Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="relative header:hidden h-16 flex items-center justify-between pl-6 pr-4">
          <Logo />
          <button onClick={() => setDrawer(true)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Open menu"><Menu /></button>
        </div>
      </div>

      {drawer && (
        <div className="header:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setDrawer(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-[320px] bg-white shadow-xl flex flex-col overflow-y-auto">
            <div className="px-5 py-4 border-b border-line flex items-center justify-between">
              <Logo />
              <button onClick={() => setDrawer(false)} className="p-1.5 rounded-md hover:bg-gray-100" aria-label="Close menu"><Close /></button>
            </div>
            {nav.map((item, i) => item.columns ? (
              <div key={item.label} className="border-b border-line">
                <button onClick={() => setSection(section === i ? null : i)} className="font-sans w-full flex items-center justify-between px-5 py-4 text-base font-medium text-ink">
                  {item.label}<Chevron className={`w-4 h-4 transition-transform duration-200 ${section === i ? 'rotate-180' : ''}`} />
                </button>
                {section === i && (
                  <div className="bg-gray-50/50 px-5 pb-4">
                    {item.columns.map(col => (
                      <div key={col.heading} className="pt-3">
                        <div className="text-sm text-muted mb-1">{col.heading}</div>
                        {col.items.map(it => <Link key={it} to={linkFor(it)} onClick={() => setDrawer(false)} className="block py-1.5 text-[15px] text-ink">{it}</Link>)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} to={linkFor(item.label)} onClick={() => setDrawer(false)} className="px-5 py-4 border-b border-line text-base font-medium text-ink">{item.label}</Link>
            ))}
            <div className="p-5 flex flex-col gap-3 border-t border-line mt-auto">
              <a href="#" className="btn-secondary font-sans w-full">Sign in</a>
              <Link to="/book-a-demo" onClick={() => setDrawer(false)} className="btn-primary w-full">Start for free</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
