import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const EASE = { duration: 0.5, ease: [0.23, 1, 0.32, 1] }

// 3-cell "gutter rail" row: rails appear at >=1440 and form a ruled grid down the page.
export function Row({ children, className = '', innerClassName = '', as: Tag = 'section' }) {
  return (
    <Tag className={`relative flex -mt-px ${className}`}>
      <div className="hidden desktop:block flex-1 basis-0 min-w-[224px] border-r border-t border-line" />
      <div className={`relative w-full max-w-content mx-auto border-t border-line min-w-0 ${innerClassName}`}>{children}</div>
      <div className="hidden desktop:block flex-1 basis-0 min-w-[290px] border-l border-t border-line" />
    </Tag>
  )
}

export function Reveal({ children, className = '', delay = 0, amount = 0.4, y = 16, as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount }} transition={{ ...EASE, delay }}>
      {children}
    </M>
  )
}

export function SectionHeading({ title, body, className = '', bodyClass = 'max-w-xl' }) {
  return (
    <Reveal className={`max-w-2xl mb-10 md:mb-12 ${className}`}>
      <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{title}</h2>
      {body && <p className={`mt-5 text-base leading-[25.6px] text-muted ${bodyClass}`}>{body}</p>}
    </Reveal>
  )
}

export function Grain({ tone = 'violet', className = '' }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className={`absolute inset-0 grain-${tone}`} />
      <div className="grain-noise" />
    </div>
  )
}

export function PillTabs({ tabs, active, onChange, more, className = '' }) {
  return (
    <div className={`inline-flex max-w-full p-1 rounded-lg bg-white overflow-auto shadow-segmented-track ${className}`}>
      {tabs.map((t, i) => (
        <button key={t} onClick={() => onChange(i)}
          className={`font-sans shrink-0 px-4 py-2 rounded-md border text-sm transition-colors duration-150 ${i === active ? 'bg-gray-100 border-gray-200 text-gray-900' : 'border-transparent text-gray-700 hover:bg-gray-50'}`}>
          {t}
        </button>
      ))}
      {more && (
        <button className="font-sans shrink-0 px-4 py-2 rounded-md border border-transparent text-sm text-gray-700 hover:bg-gray-50 inline-flex items-center gap-1 transition-colors duration-150">
          {more} <Chevron className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

/* ---------- Icons ---------- */
export const Chevron = ({ className = 'w-3 h-3', dir = 'down' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} style={{ transform: dir === 'right' ? 'rotate(-90deg)' : undefined }}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Arrow = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const Check = ({ className = 'w-[18px] h-[18px]' }) => (
  <svg viewBox="0 0 18 18" fill="none" className={className}><circle cx="9" cy="9" r="8" fill="#6056ff" fillOpacity=".12" /><path d="M5.5 9.2l2.3 2.3 4.7-4.9" stroke="#6056ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const Plus = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 14 14" fill="none" className={className}><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
)
export const Play = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M8 5.5v13a.6.6 0 00.9.5l10.4-6.5a.6.6 0 000-1L8.9 5a.6.6 0 00-.9.5z" /></svg>
)
export const Menu = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
)
export const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
)
export const Laurel = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-gray-400">
    <path d="M6 16c-2.5-1.5-4-4.2-4-7.2M14 16c2.5-1.5 4-4.2 4-7.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    {[0, 1, 2, 3].map(i => <ellipse key={i} cx={3 + i * 0.5} cy={13 - i * 2.6} rx="1.6" ry=".8" fill="currentColor" transform={`rotate(-40 ${3 + i * 0.5} ${13 - i * 2.6})`} />)}
    {[0, 1, 2, 3].map(i => <ellipse key={'r' + i} cx={17 - i * 0.5} cy={13 - i * 2.6} rx="1.6" ry=".8" fill="currentColor" transform={`rotate(40 ${17 - i * 0.5} ${13 - i * 2.6})`} />)}
  </svg>
)

/* ---------- Brand: original Lumenfold mark ---------- */
export function LogoMark({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <defs><linearGradient id="lm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7281ff" /><stop offset="1" stopColor="#3b32f9" /></linearGradient></defs>
      <path d="M12 1.5l9.5 6v9L12 22.5l-9.5-6v-9z" fill="url(#lm)" />
      <path d="M12 1.5v21M2.5 7.5L12 12l9.5-4.5" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" fill="none" />
    </svg>
  )
}
export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 h-6 ${className}`} aria-label="Lumenfold home">
      <LogoMark />
      <span className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ink leading-none">lumenfold</span>
    </Link>
  )
}

/* ---------- Fictional wordmarks (logo walls) ---------- */
const markShapes = ['circle', 'square', 'tri', 'ring', 'bars', 'dot']
export function Wordmark({ name, className = '', size = 'md' }) {
  const i = name.length % markShapes.length
  const s = markShapes[i]
  const h = size === 'lg' ? 'text-[20px]' : size === 'sm' ? 'text-[13px] sm:text-[17px]' : 'text-[15px] sm:text-[19px]'
  return (
    <span className={`inline-flex items-center gap-1.5 text-[#3a3f4f] font-display font-semibold tracking-[-0.02em] whitespace-nowrap ${h} ${className}`}>
      <svg viewBox="0 0 16 16" className="w-[0.95em] h-[0.95em] shrink-0" fill="currentColor">
        {s === 'circle' && <circle cx="8" cy="8" r="7" />}
        {s === 'square' && <rect x="1.5" y="1.5" width="13" height="13" rx="3" />}
        {s === 'tri' && <path d="M8 1.5l7 13H1z" />}
        {s === 'ring' && <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="3" />}
        {s === 'bars' && <><rect x="1" y="2" width="3.5" height="12" rx="1" /><rect x="6.25" y="5" width="3.5" height="9" rx="1" /><rect x="11.5" y="8" width="3.5" height="6" rx="1" /></>}
        {s === 'dot' && <><circle cx="5" cy="5" r="3.5" /><circle cx="11" cy="11" r="3.5" /></>}
      </svg>
      {name}
    </span>
  )
}

/* ---------- Illustrated avatars (original) ---------- */
const skin = ['#f2c7a5', '#d9a07a', '#a86f4c', '#7a4a2e', '#f5d6bd', '#c58c63']
const hair = ['#2b2118', '#5a3a22', '#1d1d22', '#8a5a2b', '#b9835a', '#3a2a40']
const bgs = ['#c7cfff', '#ffd6e8', '#cdeaff', '#d8f5e3', '#ffe7c2', '#e4dcff']
export function Avatar({ seed = 0, size = 28, className = '', rounded = 'rounded-full' }) {
  const k = seed % 6, hs = (seed * 7) % 6, b = (seed * 5) % 6
  return (
    <span className={`inline-block overflow-hidden shrink-0 ${rounded} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <rect width="40" height="40" fill={bgs[b]} />
        <path d="M6 40c1.5-8 7-12 14-12s12.5 4 14 12z" fill={['#6056ff', '#0d162f', '#0e9384', '#f472b6', '#7281ff', '#5b6070'][k]} />
        <circle cx="20" cy="18" r="8" fill={skin[k]} />
        {seed % 3 === 0 ? <path d="M11.5 17c0-6 4-9.5 8.5-9.5s8.5 3.5 8.5 9.5c-1.5-3-4-4.5-8.5-4.5s-7 1.5-8.5 4.5z" fill={hair[hs]} />
          : seed % 3 === 1 ? <path d="M11 20c-1-8 3.5-12.5 9-12.5s10 4.5 9 12.5c0-4-2-7-3.5-7.5-1.5 1.5-5 2-11 1.5-2 1-3.5 3-3.5 6z" fill={hair[hs]} />
          : <path d="M12 15.5c1-4.5 4-7 8-7s7 2.5 8 7c-3-1.5-5-2-8-2s-5 .5-8 2z" fill={hair[hs]} />}
        <circle cx="17" cy="18.5" r="1" fill="#1d1d22" /><circle cx="23" cy="18.5" r="1" fill="#1d1d22" />
        <path d="M17.5 22c1.5 1.2 3.5 1.2 5 0" stroke="#1d1d22" strokeWidth=".9" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  )
}

/* ---------- Generic app-icon glyphs (original, not real brands) ---------- */
const iconColors = ['#6056ff', '#0e9384', '#f472b6', '#f59e0b', '#0ea5e9', '#ef4444', '#22c55e', '#8b5cf6', '#14b8a6', '#f97316']
export function AppIcon({ seed = 0, className = 'w-8 h-8' }) {
  const c = iconColors[seed % iconColors.length], c2 = iconColors[(seed + 3) % iconColors.length]
  const v = seed % 5
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <rect x="1" y="1" width="30" height="30" rx="8" fill={c} fillOpacity=".12" />
      {v === 0 && <><circle cx="16" cy="16" r="8" fill={c} /><circle cx="16" cy="16" r="3.5" fill="#fff" /></>}
      {v === 1 && <><rect x="8" y="8" width="7" height="7" rx="2" fill={c} /><rect x="17" y="8" width="7" height="7" rx="2" fill={c2} /><rect x="8" y="17" width="7" height="7" rx="2" fill={c2} /><rect x="17" y="17" width="7" height="7" rx="2" fill={c} /></>}
      {v === 2 && <path d="M16 6l9 16H7z" fill={c} />}
      {v === 3 && <><path d="M8 22V10l8 6 8-6v12" stroke={c} strokeWidth="3" fill="none" strokeLinejoin="round" /></>}
      {v === 4 && <><circle cx="12" cy="16" r="6" fill={c} fillOpacity=".85" /><circle cx="20" cy="16" r="6" fill={c2} fillOpacity=".85" /></>}
    </svg>
  )
}
