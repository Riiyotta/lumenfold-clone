// System A section library for the product pages (PAGES_PRODUCT §A).
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, Row, Reveal, Avatar, Arrow, Play, Close } from '../ui'
import './product.css'

/* ---------- Tokens ---------- */
export const pad = 'px-6 md:px-12 lg:px-20'
export const logoPad = 'px-6 md:px-20 desktop:px-14'
export const stacked = `py-12 md:py-28 ${pad}`
export const pill = '!rounded-full'
export const ACCENT = '#6056ff'

// A.6: all 7 GrainBand palettes (deep / second / warm RGB, 3-stop base).
export const palettes = {
  sales: { deep: '138,105,255', second: '109,74,255', warm: '199,207,255', base: ['#e6e6fb', '#e2e3fa', '#dfe2fa'] },
  cs: { deep: '207,161,251', second: '244,114,182', warm: '125,170,255', base: ['#f0ddff', '#f6e3fb', '#fbe8f5'] },
  marketing: { deep: '116,187,224', second: '167,139,250', warm: '110,231,183', base: ['#bbe2ff', '#cbeaff', '#d6f0f5'] },
  hr: { deep: '122,196,187', second: '143,231,199', warm: '255,190,80', base: ['#bfe9d6', '#cdeede', '#d9f2e6'] },
  support: { deep: '251,146,60', second: '253,186,116', warm: '244,114,182', base: ['#ffe4cf', '#ffe9d6', '#ffe1e6'] },
  operations: { deep: '52,211,153', second: '110,231,183', warm: '96,165,250', base: ['#c6f0dd', '#d2f3e4', '#d9ecff'] },
  research: { deep: '167,139,250', second: '196,181,253', warm: '244,114,182', base: ['#e5ddff', '#ece5ff', '#f4e3fb'] },
}
// Same 5-layer builder as CLONE_SPEC §1.2 / index.css .grain-*.
export function grainBg(id = 'sales') {
  const { deep, second, warm, base } = palettes[id] || palettes.sales
  return `radial-gradient(90% 80% at 12% 0%, rgba(${deep},.55) 0%, rgba(${deep},0) 62%), radial-gradient(85% 75% at 92% 10%, rgba(${second},.55) 0%, rgba(${second},0) 62%), radial-gradient(85% 85% at 82% 100%, rgba(${deep},.5) 0%, rgba(${deep},0) 60%), radial-gradient(80% 70% at 22% 100%, rgba(${warm},.6) 0%, rgba(${warm},0) 65%), linear-gradient(160deg, ${base[0]} 0%, ${base[1]} 50%, ${base[2]} 100%)`
}
export function GrainPanel({ palette = 'sales', className = '' }) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: grainBg(palette) }} />
      <div className="grain-noise" />
    </div>
  )
}

/* Row variant without the top hairline (A.7 FeaturesHero: "the Row has no border"). */
export function BareRow({ children, innerClassName = '', className = '' }) {
  return (
    <section className={`relative flex ${className}`}>
      <div className="hidden desktop:block flex-1 basis-0 min-w-[224px] border-r border-line" />
      <div className={`relative w-full max-w-content mx-auto min-w-0 ${innerClassName}`}>{children}</div>
      <div className="hidden desktop:block flex-1 basis-0 min-w-[290px] border-l border-line" />
    </section>
  )
}

/* PageSection heading (A shared: max-w-2xl, mb-12 md:mb-14; p 16 -> md 18). */
export function PageHeading({ title, body, center = false, className = '', bodyClass = '' }) {
  return (
    <Reveal className={`max-w-2xl mb-12 md:mb-14 ${center ? 'mx-auto text-center' : ''} ${className}`}>
      <h2 className="text-[30px] md:text-[36px] leading-[1.35] tracking-[-0.025em] text-ink">{title}</h2>
      {body && <p className={`mt-5 text-base md:text-lg leading-[1.6] text-muted ${center ? 'mx-auto' : ''} ${bodyClass}`}>{body}</p>}
    </Reveal>
  )
}

/* Rich text: strings, '#word' = indigo span, { label, to } = inline link. */
export function Rich({ parts }) {
  if (typeof parts === 'string') return parts
  return parts.map((p, i) => typeof p === 'string'
    ? (p.startsWith('#') ? <span key={i} className="text-indigo-brand">{p.slice(1)}</span> : <span key={i}>{p}</span>)
    : <Link key={i} to={p.to} className="text-indigo-brand hover:underline">{p.label}</Link>)
}

export function Btn({ to = '/book-a-demo', children, kind = 'primary', round = true, className = '', onClick }) {
  const cls = `${kind === 'primary' ? 'btn-primary' : 'btn-secondary'} font-sans ${round ? pill : ''} ${className}`
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{children}</button>
  return <Link to={to} className={cls}>{children}</Link>
}

/* ---------- Line icons (original, stroke = currentColor) ---------- */
const ICONS = {
  doc: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M10 13h6M10 17h4'],
  folder: ['M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'],
  shield: ['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z', 'M9 12l2 2 4-4'],
  clock: ['M12 21a9 9 0 100-18 9 9 0 000 18z', 'M12 7v5l3 2'],
  users: ['M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z', 'M2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5', 'M16 4.5a3.5 3.5 0 010 6.5M18 14.8c1.9.7 3.1 2.5 3.5 5.2'],
  layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
  branch: ['M6 3v12', 'M6 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', 'M18 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', 'M18 9c0 5-6 5-12 7'],
  check: ['M12 21a9 9 0 100-18 9 9 0 000 18z', 'M8 12.5l2.7 2.7L16 9.5'],
  bolt: ['M13 2L4 14h7l-1 8 9-12h-7z'],
  search: ['M11 18a7 7 0 100-14 7 7 0 000 14z', 'M20 20l-4-4'],
  chat: ['M4 5h16v11H9l-5 4z', 'M8 9.5h8M8 12.5h5'],
  phone: ['M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A17 17 0 013 5a2 2 0 012-2z'],
  calendar: ['M4 6h16v14H4z', 'M4 10h16M8 3v4M16 3v4'],
  globe: ['M12 21a9 9 0 100-18 9 9 0 000 18z', 'M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z'],
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 018 0v4'],
  chart: ['M4 20V4', 'M4 20h16', 'M8 16v-4M12 16V8M16 16v-6'],
  sparkle: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', 'M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'],
  plug: ['M9 3v5M15 3v5', 'M6 8h12v3a6 6 0 01-12 0z', 'M12 17v4'],
  history: ['M3 12a9 9 0 103-6.7', 'M3 4v4h4', 'M12 8v4l3 2'],
  flag: ['M5 21V4', 'M5 4h11l-2 4 2 4H5'],
  eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z', 'M12 15a3 3 0 100-6 3 3 0 000 6z'],
  inbox: ['M3 13l3-8h12l3 8v6H3z', 'M3 13h5l1 2h6l1-2h5'],
  route: ['M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4z', 'M8 17h7a3 3 0 000-6H9a3 3 0 010-6h7'],
  key: ['M8 15a4 4 0 100-8 4 4 0 000 8z', 'M11 11h10M18 11v3M15 11v2'],
  gauge: ['M4 17a8 8 0 1116 0', 'M12 17l4-5'],
  mic: ['M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3z', 'M5 11a7 7 0 0014 0M12 18v3'],
  wave: ['M3 12h2M7 8v8M11 5v14M15 8v8M19 11v2'],
  translate: ['M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 5 7M11 5c-.8 3.5-3 6.5-6.5 8', 'M13 21l4-9 4 9M14.5 18h5'],
  grid: ['M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'],
  play: ['M7 5l12 7-12 7z'],
  code: ['M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14'],
  table: ['M4 5h16v14H4z', 'M4 10h16M4 14.5h16M10 5v14'],
  bell: ['M6 16V11a6 6 0 0112 0v5l2 2H4z', 'M10 20a2 2 0 004 0'],
  comment: ['M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1h-7l-4 4v-4H5a1 1 0 01-1-1V5a1 1 0 011-1z'],
  rocket: ['M14 4c3-1 6 0 6 0s1 3 0 6l-6 6-6-6z', 'M8 10l-3 1-2 3 4 1M14 16l-1 3-3 2-1-4', 'M15.5 8.5h.01'],
  crm: ['M4 6h16v12H4z', 'M8 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5.5 14c.4-1.6 1.3-2.4 2.5-2.4s2.1.8 2.5 2.4', 'M13 9h5M13 12h4'],
}
export function LineIcon({ name = 'doc', size = 20, stroke = 1.4, className = 'text-muted' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
      {(ICONS[name] || ICONS.doc).map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}

/* ---------- Scale-to-fit wrapper (fixed design width, scales down on small screens) ---------- */
export function useWidth(ref) {
  const [w, setW] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    setW(el.clientWidth)
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return w
}
export function ScaleBox({ width, height, children, className = '' }) {
  const ref = useRef(null)
  const w = useWidth(ref)
  const s = w ? Math.min(1, w / width) : 1
  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ height: height * s }}>
      <div className="absolute top-0 left-1/2" style={{ width, height, transform: `translateX(-50%) scale(${s})`, transformOrigin: 'top center' }}>{children}</div>
    </div>
  )
}

/* ---------- Video poster + modal placeholder (no real video ships with the clone) ---------- */
export function VideoModal({ open, onClose, poster, title = 'Product video' }) {
  useEffect(() => {
    if (!open) return
    const f = e => e.key === 'Escape' && onClose()
    addEventListener('keydown', f)
    return () => removeEventListener('keydown', f)
  }, [open, onClose])
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="ov" className="fixed inset-0 z-[100] bg-ink/70 flex items-center justify-center p-4 md:p-10" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.div role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-[#0a0a0a]"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={EASE}>
            {poster && <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
              <span className="font-display text-xl">{title}</span>
              <span className="mt-2 text-sm text-white/70">The video player is a placeholder in this preview.</span>
            </div>
            <button onClick={onClose} aria-label="Close video" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors duration-150"><Close /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
export function VideoPoster({ src, title, className = '', disc = 'glass', overlay = true }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {overlay && <div className="absolute inset-0 bg-black/30" />}
      <button type="button" onClick={() => setOpen(true)} aria-label={`Play: ${title}`}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 ${disc === 'glass' ? 'bg-white/20 border border-white/30 hover:bg-white/30 hover:scale-110' : 'border-2 border-white bg-white/10 hover:bg-white/25'}`}>
        <Play className="w-6 h-6 translate-x-[1px]" />
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} poster={src} title={title} />
    </div>
  )
}

/* ---------- Original mascot: a rounded "fold" with two eyes (not the homepage lantern) ---------- */
export function Mascot({ size = 128, className = '' }) {
  const id = useRef('pm' + Math.random().toString(36).slice(2, 7)).current
  return (
    <svg viewBox="0 0 76 76" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6355F5" /><stop offset="1" stopColor="#4D40EC" /></linearGradient>
        <radialGradient id={`${id}c`} cx=".2" cy=".15" r=".6"><stop offset="0" stopColor="#43E3F5" stopOpacity=".5" /><stop offset="1" stopColor="#43E3F5" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}p`} cx=".85" cy=".9" r=".6"><stop offset="0" stopColor="#F06BD8" stopOpacity=".45" /><stop offset="1" stopColor="#F06BD8" stopOpacity="0" /></radialGradient>
      </defs>
      {['b', 'c', 'p'].map(k => <rect key={k} x="5" y="5" width="66" height="66" rx="24" fill={`url(#${id}${k})`} />)}
      <path d="M5 30c11 6 22 8 33 8s22-2 33-8" stroke="#fff" strokeOpacity=".16" strokeWidth="1.2" fill="none" />
      <rect x="26.04" y="26.39" width="8.1" height="18.3" rx="4.05" fill="#fff" />
      <rect x="41.87" y="26.39" width="8.1" height="18.3" rx="4.05" fill="#fff" />
    </svg>
  )
}
export const halo = 'radial-gradient(circle, rgba(99,85,245,0.16) 0%, rgba(99,85,245,0.06) 42%, rgba(99,85,245,0) 68%)'

/* ---------- A.2 ShowcaseRow ---------- */
export function ShowcaseRow({ index = 0, title, body, media, ctas }) {
  const flip = index % 2 === 1
  return (
    <Row>
      <div className={stacked}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={flip ? 'lg:order-2' : ''}>
            <Reveal className="max-w-2xl">
              <h2 className="text-[30px] md:text-[36px] leading-[1.35] tracking-[-0.025em] text-ink">{title}</h2>
              <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{body}</p>
            </Reveal>
            {ctas && (
              <Reveal className="mt-8 flex flex-wrap gap-4" delay={0.05}>
                <Btn to={ctas[0].to}>{ctas[0].label}</Btn>
                <Btn to={ctas[1].to} kind="secondary">{ctas[1].label}</Btn>
              </Reveal>
            )}
          </div>
          <motion.div className={`overflow-hidden rounded-xl border border-line bg-white ${flip ? 'lg:order-1' : ''}`}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={EASE}>
            {media}
          </motion.div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.3 IconCardGrid: (a) 2-col row cards, (b) 3-col stacked cards ---------- */
export function IconCardGrid({ title, items, variant = 'a' }) {
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={title} />
        <div className={variant === 'a' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'}>
          {items.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ ...EASE, delay: Math.min(i, 3) * 0.05 }}
              className={variant === 'a' ? 'flex items-start gap-4 border border-line bg-white p-6' : 'flex flex-col gap-4 border border-line bg-white p-6'}>
              {variant === 'a' ? (
                <span className="w-10 h-10 rounded-md border border-line bg-[#f3f3f4] flex items-center justify-center shrink-0"><LineIcon name={c.icon} size={20} /></span>
              ) : <LineIcon name={c.icon} size={28} className="text-ink" />}
              <div className="min-w-0">
                <h3 className={`${variant === 'a' ? 'text-base leading-[1.4]' : 'text-lg leading-7'} font-medium tracking-[-0.025em] text-ink`}>{c.title}</h3>
                <p className={`${variant === 'a' ? 'mt-1.5' : 'mt-2'} text-sm leading-[1.6] text-muted`}>{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.4 FAQAccordion ---------- */
export function FAQSection({ title, intro, link, items }) {
  const [open, setOpen] = useState(null)
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(it => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) }
  return (
    <Row>
      <div className={stacked}>
        <Reveal className="max-w-2xl mb-12 md:mb-14">
          <h2 className="text-[30px] md:text-[36px] leading-[1.35] tracking-[-0.025em] text-ink">{title}</h2>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{intro} <Link to={link.to} className="text-indigo-brand hover:underline">{link.label}</Link></p>
        </Reveal>
        <div className="border border-line divide-y divide-line">
          {items.map((it, i) => {
            const on = open === i
            return (
              <div key={it.q}>
                <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on}
                  className="group font-sans w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left hover:bg-gray-50/50 transition-colors duration-150">
                  <span className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center transition-all duration-150 ${on ? 'bg-indigo-brand border-indigo-brand' : 'border-line group-hover:border-gray-400'}`}>
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke={on ? '#fff' : '#868a97'} strokeWidth="2" strokeLinecap="round">
                      {on ? <path d="M1 6h10" /> : <path d="M6 1v10M1 6h10" />}
                    </svg>
                  </span>
                  <span className="font-medium text-base md:text-lg leading-relaxed text-ink">{it.q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="a" className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="pb-5 pl-[52px] md:pl-[56px] pr-6 text-base leading-relaxed text-muted">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </div>
    </Row>
  )
}

/* ---------- A.5 MoreFeatures (3 link cards, no reveal on cards) ---------- */
export function MoreFeatures({ title, body, items }) {
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={title} body={body} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map(c => (
            <Link key={c.to} to={c.to} className="group flex flex-col gap-4 border border-line bg-white p-6 hover:bg-surface-secondary-light transition-colors duration-150">
              <LineIcon name={c.icon} size={28} className="text-ink" />
              <h3 className="text-lg leading-7 font-medium tracking-[-0.025em] text-ink">{c.title}</h3>
              <p className="text-sm leading-[1.6] text-muted">{c.body}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-indigo-brand">
                Learn more <Arrow className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.6 ClosingCTA (grain band + 6 static glass coins) ---------- */
const coinSpots = [
  { top: '16%', left: '4%', r: -8 }, { top: '48%', left: '10%', r: 6 }, { top: '76%', left: '5%', r: -4 },
  { top: '14%', right: '4%', r: 7 }, { top: '50%', right: '10%', r: -6 }, { top: '74%', right: '5%', r: 5 },
]
const defaultCoins = [{ avatar: 3 }, { icon: 'chat' }, { avatar: 8 }, { icon: 'calendar' }, { avatar: 5 }, { icon: 'bolt' }]
export function ClosingCTA({ copy, palette = 'sales', coins = defaultCoins, primaryOnly = false }) {
  return (
    <Row>
      <div className={stacked}>
        <div className="relative overflow-hidden rounded-2xl">
          <GrainPanel palette={palette} />
          <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden="true">
            {coins.map((c, i) => {
              const { r, ...pos } = coinSpots[i]
              return (
                <span key={i} className="absolute w-11 h-11 rounded-full border border-white/60 bg-white/70 backdrop-blur-glass shadow-glass flex items-center justify-center" style={{ ...pos, transform: `rotate(${r}deg)` }}>
                  {c.avatar != null ? <Avatar seed={c.avatar} size={28} /> : <LineIcon name={c.icon} size={20} stroke={1.6} className="text-indigo-brand" />}
                </span>
              )
            })}
          </div>
          <div className="relative px-6 py-16 md:py-24">
            <div className="relative mx-auto max-w-xl flex flex-col items-center text-center">
              <Reveal>
                <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{copy.title}</h2>
                <p className="mt-5 mx-auto max-w-lg text-base leading-[1.6] text-ink/80">{copy.body}</p>
              </Reveal>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Btn to={copy.primary.to}>{copy.primary.label}</Btn>
                {!primaryOnly && copy.secondary && <Btn to={copy.secondary.to} kind="secondary" className="!bg-white hover:!bg-[#f9f9fa]">{copy.secondary.label}</Btn>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.1 FeatureHero (split 5/7 + mock card) ---------- */
export function FeatureHero({ h1, body, ctas, media, phone = false }) {
  return (
    <Row>
      <div className={`pt-10 md:pt-16 pb-16 md:pb-20 overflow-hidden ${pad}`}>
        <motion.div className={`grid grid-cols-1 lg:grid-cols-12 ${phone ? 'gap-y-8' : 'gap-y-10'} lg:gap-x-12 items-center`}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <div className="lg:col-span-5">
            <h1 className={`text-[36px] md:text-[48px] leading-[1.15] ${phone ? 'tracking-[-0.05em]' : 'tracking-[-0.1rem]'} [text-wrap:balance] text-ink`}>{h1}</h1>
            <p className="mt-5 max-w-xl text-base md:text-lg leading-[1.6] text-muted">{body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Btn to={ctas[0].to}>{ctas[0].label}</Btn>
              <Btn to={ctas[1].to} kind="secondary">{ctas[1].label}</Btn>
            </div>
          </div>
          <motion.div className="lg:col-span-7 min-w-0" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}>
            <div className="overflow-hidden rounded-xl border border-line bg-white font-sans">{media}</div>
          </motion.div>
        </motion.div>
      </div>
    </Row>
  )
}
