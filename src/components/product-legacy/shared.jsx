import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE, Row, Reveal, Wordmark, Avatar, Arrow, Play, Close, Check, LogoMark } from '../ui'
import { brands, testimonialGrid, footerCta } from '../../content/productLegacy'
import './product-legacy.css'

/* ---------- Legacy motion vocabulary (B.0, Webflow IX2 table) ---------- */
export const OUT_QUART = [0.25, 1, 0.5, 1]
export const IN_OUT_QUART = [0.76, 0, 0.24, 1]
export const OUT_CIRC = [0, 0.55, 0.45, 1]
export const IN_OUT_QUAD = [0.45, 0, 0.55, 1]
export const LEGACY = { duration: 1, ease: OUT_QUART }
const VIEW = { once: true, amount: 0.2 }

// FADE: opacity 0→1, 1000ms outQuart, on scroll into view.
export function LFade({ children, className = '', delay = 0, as = 'div', amount = 0.2 }) {
  const M = motion[as]
  return <M className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount }} transition={{ ...LEGACY, delay }}>{children}</M>
}
// SLIDE up: opacity + translateY 100px→0, 1000ms outQuart.
export function LSlide({ children, className = '', delay = 0, y = 100, as = 'div' }) {
  const M = motion[as]
  return <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ ...LEGACY, delay }}>{children}</M>
}
// SLIDE right→left: x 100px→0.
export function LSlideX({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={VIEW} transition={{ ...LEGACY, delay }}>{children}</motion.div>
}
// SHRINK: scale 1.25→1 + fade.
export function LShrink({ children, className = '' }) {
  return <motion.div className={className} initial={{ opacity: 0, scale: 1.25 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW} transition={LEGACY}>{children}</motion.div>
}

/* ---------- Type + layout presets (A tokens) ---------- */
export const pad = 'px-6 md:px-12 lg:px-20'
export const stacked = 'py-12 md:py-28 px-6 md:px-12 lg:px-20'
export const H1 = 'text-[36px] md:text-[48px] leading-[1.15] tracking-[-0.1rem] text-ink [text-wrap:balance]'
export const H2 = 'text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink [text-wrap:balance]'
export const H3L = 'text-[24px] md:text-[30px] leading-[1.35] tracking-[-0.025em] text-ink'
export const H4I = 'font-display text-[22px] md:text-[24px] leading-[1.3] tracking-[-0.025em] text-indigo-brand'
export const BODY = 'text-base leading-[25.6px] text-muted'

// Copy arrays: plain strings, '#accent' (indigo span), '~gradient' span, { br: true }, { to, label } links.
export function Rich({ parts }) {
  if (typeof parts === 'string') return parts
  return parts.map((p, i) => {
    if (typeof p !== 'string') return p.br ? <br key={i} className="hidden md:block" /> : <Link key={i} to={p.to} className="text-indigo-brand hover:underline">{p.label}</Link>
    if (p.startsWith('#')) return <span key={i} className="text-indigo-brand">{p.slice(1)}</span>
    if (p.startsWith('~')) return <span key={i} className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #4d65ff, #7c3aed)' }}>{p.slice(1)}</span>
    return <span key={i}>{p}</span>
  })
}

export function Pill({ children, icon = true, className = '' }) {
  return (
    <span className={`pl-pill font-sans ${className}`}>
      {icon && <svg viewBox="0 0 18 18" className="w-[18px] h-[18px]" fill="none"><path d="M9 2l1.8 4.6L15.5 8l-4.7 1.6L9 14.5 7.2 9.6 2.5 8l4.7-1.4z" fill="#6056ff" fillOpacity=".18" stroke="#6056ff" strokeWidth="1.3" strokeLinejoin="round" /></svg>}
      {children}
    </span>
  )
}

// Centred legacy heading block: pill + h2 + p (each block FADEs in per IX2).
export function LHeading({ pill, title, body, className = '', align = 'center', maxW = 'max-w-[48rem]' }) {
  const c = align === 'center' ? 'mx-auto text-center items-center' : 'items-start'
  return (
    <LFade className={`flex flex-col ${c} ${maxW} ${className}`}>
      {pill && <Pill className="mb-6">{pill}</Pill>}
      <h2 className={H2}><Rich parts={title} /></h2>
      {body && <p className={`mt-5 ${BODY} md:text-lg md:leading-[1.6] max-w-xl`}>{body}</p>}
    </LFade>
  )
}

/* ---------- Video poster + modal placeholder ---------- */
export function VideoModal({ open, onClose, poster, title = 'Video placeholder' }) {
  useEffect(() => {
    if (!open) return
    const k = e => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [open, onClose])
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-label={title} className="relative w-full max-w-4xl aspect-video bg-surface-dark rounded-lg overflow-hidden flex items-center justify-center text-white/70"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
            {poster && <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
            <span className="relative flex items-center gap-3 font-display"><Play className="w-8 h-8" /> {title}</span>
            <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-md bg-white/10 hover:bg-white/20 text-white" aria-label="Close"><Close /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>, document.body)
}

export function VideoPoster({ src, className = '', radius = 'rounded-xl', overlay = 'bg-black/30', title, pulse = false, disc = 64, children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label={`Play ${title || 'video'}`}
        className={`group relative block w-full aspect-video overflow-hidden bg-surface-dark ${radius} ${className}`}>
        {src ? <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" /> : children}
        <span className={`absolute inset-0 ${overlay}`} />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="relative" style={{ width: disc, height: disc }}>
            {pulse && <span className="pl-pulse-ring absolute inset-0 rounded-full border-2 border-white/70" />}
            <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-white/30 group-hover:scale-110"><Play /></span>
          </span>
        </span>
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} poster={src} title={title ? `${title} (video placeholder)` : undefined} />
    </>
  )
}

/* ---------- Wandering cursor avatars (B.0 hero cursors) ----------
   translate(%) keyframes, each move 1000ms inOutQuart, holding 2–4 s between moves; hover scale 1.1 (500ms outQuart). */
function wander(points, holds) {
  const xs = [], ys = [], times = [], ease = []
  let t = 0
  const total = points.reduce((a, _, i) => a + 1 + holds[i % holds.length], 0)
  points.forEach((p, i) => {
    const prev = i === 0 ? points[points.length - 1] : points[i - 1]
    if (i === 0) { xs.push(prev[0]); ys.push(prev[1]); times.push(0) }
    t += 1; xs.push(p[0]); ys.push(p[1]); times.push(t / total); ease.push(IN_OUT_QUART)
    t += holds[i % holds.length]; xs.push(p[0]); ys.push(p[1]); times.push(t / total); ease.push('linear')
  })
  return { x: xs.map(v => `${v}%`), y: ys.map(v => `${v}%`), transition: { duration: total, times, ease, repeat: Infinity } }
}
const PATH_A = wander([[0, 0], [95, 7], [47, 16], [82, 50], [50, 50]], [3, 2, 4, 3, 2])
const PATH_B = wander([[60, 30], [10, 60], [-20, 10], [40, -10], [0, 0]], [2, 4, 3, 2, 3])

function CursorBox({ path, seed, name, tone, className }) {
  return (
    <motion.div className={`absolute hidden lg:block pointer-events-auto z-10 ${className}`} animate={{ x: path.x, y: path.y }} transition={path.transition}>
      <motion.div className="flex items-start gap-1" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5, ease: OUT_QUART }}>
        <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-sm" fill={tone}><path d="M4 2.5l15 7.2-6.4 1.9-2.6 6.3z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg>
        <span className="mt-4 flex items-center gap-2 rounded-full bg-white border border-line pl-1 pr-3 py-1 shadow-glass">
          <span className="rounded-full overflow-hidden" style={{ boxShadow: `0 0 0 2px ${tone}` }}><Avatar seed={seed} size={48} /></span>
          <span className="font-sans text-[12.5px] font-medium text-ink whitespace-nowrap">{name}</span>
        </span>
      </motion.div>
    </motion.div>
  )
}
export function Cursors({ names = ['Ines · Ops', 'Theo · Sales'] }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <CursorBox path={PATH_A} seed={7} name={names[0]} tone="#6056ff" className="left-[2%] top-[2%]" />
      <CursorBox path={PATH_B} seed={11} name={names[1]} tone="#0e9384" className="right-[1%] top-[28%] mt-[220px]" />
    </div>
  )
}

// Original sub-page hero lines backdrop (fades in).
export function HeroLines() {
  return (
    <motion.svg className="pl-hero-lines" viewBox="0 0 1360 400" preserveAspectRatio="xMidYMin slice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={LEGACY}>
      <defs>
        <linearGradient id="plhl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6056ff" stopOpacity=".16" /><stop offset="1" stopColor="#6056ff" stopOpacity="0" /></linearGradient>
        <radialGradient id="plhm" cx=".5" cy=".1" r=".7"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" /></radialGradient>
      </defs>
      {Array.from({ length: 15 }).map((_, i) => <path key={i} d={`M${680 + (i - 7) * 46} 0 L${680 + (i - 7) * 150} 400`} stroke="url(#plhl)" strokeWidth="1" />)}
      {Array.from({ length: 6 }).map((_, i) => <path key={'h' + i} d={`M0 ${40 + i * i * 10} H1360`} stroke="#6056ff" strokeOpacity={0.08 - i * 0.01} />)}
      <rect width="1360" height="400" fill="url(#plhm)" />
    </motion.svg>
  )
}

/* ---------- B.1 CenteredHero ---------- */
export function CenteredHero({ pill, title, body, cta, ctaTo = '/book-a-demo', secondary, secondaryTo = '/pricing', cursors = false, video, videoTitle, pulse, maxVideo = 'max-w-[1024px]', children }) {
  return (
    <Row className="overflow-hidden">
      <div className={`relative ${pad} pt-20 md:pt-20 pb-12 md:pb-20`}>
        <HeroLines />
        {cursors && <Cursors />}
        <div className="relative mx-auto max-w-[55rem] text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={LEGACY}><Pill className="mb-8">{pill}</Pill></motion.div>
          <motion.h1 className={H1} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...LEGACY, delay: 0.1 }}><Rich parts={title} /></motion.h1>
          <motion.p className="mt-5 max-w-[35rem] text-base md:text-lg leading-[1.6] text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.2 }}>{body}</motion.p>
          <motion.div className="mt-8 flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.3 }}>
            <Link to={ctaTo} className="btn-primary font-sans">{cta}</Link>
            {secondary && <Link to={secondaryTo} className="btn-secondary font-sans">{secondary}</Link>}
          </motion.div>
        </div>
        {video && (
          <LFade className={`relative mx-auto mt-14 md:mt-20 w-full ${maxVideo}`}>
            <VideoPoster src={video} title={videoTitle} pulse={pulse} />
          </LFade>
        )}
        {children}
      </div>
    </Row>
  )
}

/* ---------- B.2 Legacy logo grid (13) + marquee ---------- */
export function LegacyLogoGrid({ label, count = 13 }) {
  return (
    <Row>
      <div className="pt-10 pb-[60px] md:pb-[100px] px-6 md:px-20 desktop:px-14">
        <LFade as="p" className="mx-auto max-w-[780px] text-center text-base sm:text-lg md:text-xl text-muted mb-10">{label}</LFade>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-x-[50px] gap-y-10">
          {brands.slice(0, count).map(n => (
            <div key={n} className="flex items-center justify-center h-[22px] grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"><Wordmark name={n} size="sm" /></div>
          ))}
        </div>
      </div>
    </Row>
  )
}

export function LogoMarquee({ label, dark = false }) {
  const period = brands.slice(0, 22)
  return (
    <Row innerClassName={`${dark ? '!border-white/10' : 'border-b border-line'} overflow-hidden`} className={dark ? '[&>div]:border-white/10' : ''}>
      <div className={`py-10 md:py-12 pl-marquee ${dark ? 'text-white' : ''}`}>
        {label && <p className={`mb-8 text-center text-sm font-medium ${dark ? 'text-white/60' : 'text-muted'}`}>{label}</p>}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="pl-marquee-track">
            {[0, 1, 2].map(copy => period.map(n => (
              <div key={copy + n} className="pl-marquee-cell flex items-center justify-center h-14 md:h-14" aria-hidden={copy > 0}>
                <Wordmark name={n} size="sm" className={dark ? '!text-white/70' : 'grayscale'} />
              </div>
            )))}
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- Counter (counterUp: 2000ms, 100ms steps) ---------- */
export function Counter({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const m = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/)
  const [shown, setShown] = useState(m ? m[1] + '0' + m[3] : value)
  useEffect(() => {
    if (!inView || !m) return
    const target = parseFloat(m[2].replace(/,/g, ''))
    const dec = (m[2].split('.')[1] || '').length
    let step = 0
    const steps = 20
    const id = setInterval(() => {
      step++
      const v = (target * step) / steps
      const s = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')
      setShown(m[1] + s + m[3])
      if (step >= steps) clearInterval(id)
    }, 100)
    return () => clearInterval(id)
  }, [inView])
  return <span ref={ref} className={className}>{shown}</span>
}

/* ---------- B.6 TestimonialGrid ---------- */
export function TestimonialGrid({ title = testimonialGrid.title, pill = testimonialGrid.pill }) {
  return (
    <Row>
      <div className={stacked}>
        <LHeading pill={pill} title={title} className="mb-12 md:mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialGrid.items.map((t, i) => (
            <LFade key={t.name} delay={(i % 3) * 0.08}>
              <Link to="/customers" className="flex flex-col h-full bg-white border border-line border-b-line-dark p-7 shadow-[0_2px_2px_#0d162f0d] transition-all duration-200 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_#0d162f0d]">
                <p className="flex-grow mb-6 text-base leading-[1.5] text-ink">“{t.quote}”</p>
                <div className="flex items-center gap-3">
                  <Avatar seed={t.seed} size={48} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-[13px] text-muted">{t.role}, <span className="font-medium text-ink/80">{t.company}</span></div>
                  </div>
                </div>
                {t.metric && <span className="mt-4 self-start rounded-md px-3 py-1.5 text-[13px] font-semibold text-white" style={{ backgroundImage: 'linear-gradient(135deg, #6056ff, #8b5cf6)' }}>{t.metric}</span>}
              </Link>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ---------- Mascots (original) + mouse parallax for the footer CTA ---------- */
export function PrismMascot({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <defs><linearGradient id="plpr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7281ff" /><stop offset=".6" stopColor="#6056ff" /><stop offset="1" stopColor="#943bff" /></linearGradient></defs>
      <path d="M60 8l48 82a6 6 0 01-5 9H17a6 6 0 01-5-9z" fill="url(#plpr)" />
      <path d="M60 8L46 99M60 8l14 91" stroke="#fff" strokeOpacity=".25" strokeWidth="1.5" />
      <rect x="46" y="58" width="7" height="16" rx="3.5" fill="#fff" /><rect x="67" y="58" width="7" height="16" rx="3.5" fill="#fff" />
    </svg>
  )
}
export function WorldMascot({ className = '' }) {
  return (
    <svg viewBox="0 0 160 160" className={className}>
      <defs><radialGradient id="plwd" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#a5b4fc" /><stop offset=".55" stopColor="#6056ff" /><stop offset="1" stopColor="#3b32f9" /></radialGradient></defs>
      <circle cx="80" cy="84" r="66" fill="url(#plwd)" />
      <path d="M28 70c20 8 34-6 52 2s30 18 52 6M24 100c26-6 40 10 62 4s28-16 50-8" stroke="#fff" strokeOpacity=".22" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="84" rx="66" ry="18" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="2" />
      <rect x="62" y="66" width="9" height="22" rx="4.5" fill="#fff" /><rect x="89" y="66" width="9" height="22" rx="4.5" fill="#fff" />
    </svg>
  )
}
function useMouseParallax() {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 }), sy = useSpring(my, { stiffness: 80, damping: 20 })
  useEffect(() => {
    const f = e => { mx.set((e.clientX / innerWidth - 0.5) * 2); my.set((e.clientY / innerHeight - 0.5) * 2) }
    addEventListener('mousemove', f)
    return () => removeEventListener('mousemove', f)
  }, [])
  const a = { x: useTransform(sx, v => `${v * 5}%`), y: useTransform(sy, v => `${v * 5}%`) }
  const b = { x: useTransform(sx, v => `${v * -5}%`), y: useTransform(sy, v => `${v * -5}%`) }
  return [a, b]
}
function Stars() {
  const pts = [[8, 18], [16, 62], [24, 34], [38, 12], [62, 20], [74, 44], [86, 14], [92, 58], [50, 70], [30, 80], [70, 82], [12, 88]]
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 0.25 : 0.4} fill="#6056ff" fillOpacity={i % 2 ? 0.25 : 0.4} />)}
    </svg>
  )
}

/* ---------- B.7 LegacyFooterCTA ---------- */
export function FooterCTA({ copy = footerCta, children, dark = false }) {
  const [a, b] = useMouseParallax()
  return (
    <Row className={dark ? '[&>div]:border-white/10' : ''} innerClassName={dark ? '!border-white/10' : ''}>
      <div className="py-12 md:py-20 px-6 md:px-12 lg:px-20">
        <div className={`relative overflow-hidden rounded-2xl border px-5 pt-20 pb-16 md:px-16 md:pt-16 md:pb-16 ${dark ? 'bg-[#1b1b23] border-white/10' : 'bg-white border-line'}`}>
          <Stars />
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[100px] w-[90%] h-[200px] rounded-[50%] bg-[#943bff] opacity-[.08] blur-[15px]" />
          <motion.div style={a} className="absolute top-10 right-10 w-[70px] sm:w-[100px] lg:w-[145px] pointer-events-none"><PrismMascot className="w-full h-auto" /></motion.div>
          <motion.div style={b} className="absolute -bottom-4 left-5 w-[90px] sm:w-[140px] lg:w-[195px] pointer-events-none"><WorldMascot className="w-full h-auto" /></motion.div>
          {children}
          <LFade className="relative mx-auto max-w-2xl text-center flex flex-col items-center">
            <h2 className={`${H2} ${dark ? '!text-white' : ''}`}><Rich parts={copy.title} /></h2>
            <p className={`mt-5 max-w-lg text-base md:text-lg leading-[1.5] ${dark ? 'text-white/70' : 'text-muted'}`}>{copy.body}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/book-a-demo" className="btn-primary font-sans">{copy.primary}</Link>
              <Link to="/book-a-demo" className={`btn-secondary font-sans ${dark ? '!text-white !border-white/20' : 'bg-white'}`}>{copy.secondary}</Link>
            </div>
            <div className={`mt-5 flex items-center gap-2 text-sm ${dark ? 'text-white/60' : 'text-muted'}`}>
              <span>{copy.fine[0]}</span>
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5"><path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="#6056ff" /></svg>
              <span>{copy.fine[1]}</span>
            </div>
          </LFade>
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.4 FAQ accordion (with optional legacy timings) ----------
   default: height/opacity .2s, +/- disc. legacy: open 800ms ease, close 300ms, plus rotates `rotate` degrees. */
export function FAQ({ title, body, link, items, legacy = false, rotate = 135 }) {
  const [open, setOpen] = useState(null)
  return (
    <Row>
      <div className={stacked}>
        <Reveal className="max-w-2xl mb-12 md:mb-14">
          <h2 className={H2}>{title}</h2>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{body} <Link to="/frequently-asked-questions" className="text-indigo-brand hover:underline">{link}</Link></p>
        </Reveal>
        <div className="border border-line divide-y divide-line">
          {items.map((it, i) => {
            const on = open === i
            return (
              <div key={it.q}>
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on}
                  className="group font-sans w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left hover:bg-gray-50/50 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-brand/40">
                  <span className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center transition-all duration-150 ${on ? 'bg-indigo-brand border-indigo-brand' : 'border-line group-hover:border-gray-400'}`}>
                    {legacy
                      ? <motion.svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke={on ? '#fff' : '#868a97'} strokeWidth="2" strokeLinecap="round" animate={{ rotate: on ? rotate : 0 }} transition={{ duration: on ? 0.8 : 0.3, ease: 'easeInOut' }}><path d="M6 1v10M1 6h10" /></motion.svg>
                      : <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke={on ? '#fff' : '#868a97'} strokeWidth="2" strokeLinecap="round">{on ? <path d="M1 6h10" /> : <path d="M6 1v10M1 6h10" />}</svg>}
                  </span>
                  <span className="font-medium text-base md:text-lg leading-relaxed text-ink">{it.q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1, transition: { duration: legacy ? 0.8 : 0.2, ease: legacy ? 'easeInOut' : undefined } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: legacy ? 0.3 : 0.2 } }} className="overflow-hidden">
                      <p className="pb-5 pl-[52px] md:pl-[56px] pr-6 text-muted leading-relaxed">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(it => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })) }) }} />
      </div>
    </Row>
  )
}

/* ---------- Sticky stacked cards (B.3 SEO, B.11 #3 / #5) ----------
   Each card sticks at top 6rem (+20px per card). Scroll-linked: scale 1 → .8 over 25% of section progress
   once the next card arrives; bg tint #fff → tile-base between 20% and 55% of the card's own window. */
function StackCard({ i, n, progress, children, className }) {
  const start = i / n
  const scale = useTransform(progress, [start, Math.min(start + 0.25, 1)], [1, i === n - 1 ? 1 : 0.8])
  const bg = useTransform(progress, [start + 0.2 / n, start + 0.55 / n], ['rgba(255,255,255,0.95)', i === n - 1 ? 'rgba(255,255,255,0.95)' : 'rgba(246,245,249,0.95)'])
  return (
    <motion.div className={`pl-stack-card border border-line backdrop-blur-[5px] shadow-[0_12px_20px_-4px_#0000000d,0_4px_8px_-2px_#0000001a] ${className}`}
      style={{ top: `calc(6rem + ${i * 20}px)`, scale, backgroundColor: bg }}>
      {children}
    </motion.div>
  )
}
export function StickyStack({ items, render, cardClass = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 6rem', 'end end'] })
  return (
    <div ref={ref} className="relative flex flex-col gap-10 md:gap-16">
      {items.map((it, i) => <StackCard key={i} i={i} n={items.length} progress={scrollYProgress} className={cardClass}>{render(it, i)}</StackCard>)}
    </div>
  )
}

/* ---------- B.4 BentoCards ---------- */
export function BentoCards({ pill, title, body, cards, renderMedia }) {
  return (
    <Row>
      <div className={`${pad} pt-16 md:pt-28 pb-12 md:pb-28`}>
        <LHeading pill={pill} title={title} body={body} className="mb-12 md:mb-20" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {cards.map((c, i) => (
            <LFade key={c.title} className={`overflow-hidden bg-tile-base border border-line flex flex-col ${c.wide ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''} ${c.top ? 'flex-col-reverse' : ''}`}>
              <div className={`px-6 md:px-8 lg:px-12 ${c.top ? 'pt-8 pb-8 md:pb-12' : 'pt-4 md:pt-6 pb-8 md:pb-12'} ${c.wide ? 'lg:py-12 flex flex-col justify-center' : ''}`}>
                <h3 className={`${H4I} ${c.top ? '' : 'mt-4'}`}>{c.title}</h3>
                <p className="mt-3 text-base md:text-lg leading-[1.5] text-muted">{c.body}</p>
                {c.wide && c.logos && (
                  <>
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {c.logos.map(l => <div key={l} className="flex items-center gap-2 text-sm text-ink"><AppIconLite name={l} />{l}</div>)}
                    </div>
                    <Link to="/integrations" className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-indigo-brand">{c.link}<Arrow className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" /></Link>
                  </>
                )}
              </div>
              <LFade className="flex-1 min-h-[220px] relative">{renderMedia(c, i)}</LFade>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}
function AppIconLite({ name }) {
  const c = ['#6056ff', '#0e9384', '#f472b6', '#f59e0b', '#0ea5e9', '#ef4444'][name.length % 6]
  return <span className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-semibold text-white shrink-0" style={{ background: c }}>{name[0]}</span>
}

/* ---------- B.9 CustomerCards / NextSteps / ProductCards ---------- */
export function CustomerCards({ pill, title, items }) {
  return (
    <Row>
      <div className={stacked}>
        <LHeading pill={pill} title={title} className="mb-12 md:mb-14" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-8 gap-8">
          {items.map((c, i) => (
            <LSlide key={c.company} delay={i * 0.08} className="border border-line p-3 flex flex-col">
              <div className="relative w-full overflow-hidden rounded-lg pt-[56.25%]">
                <img src={c.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-[#00000080]" />
                <span className="absolute top-4 left-4 h-[1.8rem] max-w-[10rem] flex items-center"><Wordmark name={c.company} size="sm" className="!text-white" /></span>
              </div>
              <h3 className="pt-4 px-1 font-sans text-lg leading-[1.45] font-medium text-ink">{c.title}</h3>
              <Link to="/customers" className="btn-secondary font-sans mt-4 self-start gap-1.5">{c.cta}<Arrow className="w-3.5 h-3.5" /></Link>
            </LSlide>
          ))}
        </div>
      </div>
    </Row>
  )
}

export function NextSteps({ title, items }) {
  return (
    <Row>
      <div className={stacked}>
        <LFade as="h2" className={`${H3L} mb-10 md:mb-12 max-w-2xl`}>{title}</LFade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((s, i) => (
            <LSlide key={s.title} delay={i * 0.08} className={`bg-white border border-line p-5 flex flex-col gap-6 ${s.big ? 'md:row-span-2' : ''}`}>
              {s.big && <div className="flex-1 min-h-[140px] flex items-center justify-center bg-tile-base"><LogoMark size={72} /></div>}
              <h3 className="font-display text-xl leading-[1.3] tracking-[-0.02em] text-ink">{s.title}</h3>
              <Link to={s.to || '/book-a-demo'} className="btn-secondary font-sans self-start gap-1.5">{s.cta}<Arrow className="w-3.5 h-3.5" /></Link>
            </LSlide>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* Dark product cards: hover overlay gradient opacity 0 → .2 (500ms outQuart). */
export function DarkCard({ tint, children, to = '/agents', className = '' }) {
  return (
    <Link to={to} className={`group relative overflow-hidden rounded-[10px] pl-dark block ${className}`}>
      <span className="pl-dark-inset" />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(303deg, ${tint[0]}, ${tint[1]})`, transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }} />
      <span className="relative block">{children}</span>
    </Link>
  )
}

export { Check }
