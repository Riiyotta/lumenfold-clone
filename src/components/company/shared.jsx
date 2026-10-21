import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { logoGrid, logoLink, cta as ctaDefaults } from '../../content/company'
import { EASE, Row, Reveal, Grain, Wordmark, Avatar, Arrow, Play, Close } from '../ui'
import './company.css'

// Page-hero H1 for the new-stack pages (§0.2): 36 → 48px, -0.05em, lh 1.15, Sora 400.
export const heroH1 = 'text-[36px] md:text-[48px] tracking-[-0.05em] leading-[1.15] font-normal text-ink'
// Shared padding presets (§0.2).
export const pad = 'px-6 md:px-12 lg:px-20'
export const stacked = 'py-12 md:py-28 px-6 md:px-12 lg:px-20'
// Large button size used by careers / customers heroes.
export const lg = '!text-base !px-6 !py-3'

// Renders copy arrays: strings, { label, to } links and '#word' indigo accents.
export function Rich({ parts, linkClass = 'text-indigo-brand hover:underline' }) {
  return parts.map((p, i) => typeof p === 'string'
    ? (p.startsWith('#') ? <span key={i} className="text-indigo-brand">{p.slice(1)}</span> : <span key={i}>{p}</span>)
    : <Link key={i} to={p.to} className={linkClass}>{p.label}</Link>)
}

// PageSection heading block (§0.2): max-w-2xl, h2 30/36 lh 1.35, p 16/18 lh 1.6.
export function PageHeading({ title, body, className = '', bodyClass = '', small = false }) {
  return (
    <Reveal className={`max-w-2xl mb-12 md:mb-14 ${className}`}>
      <h2 className="text-[30px] md:text-[36px] tracking-[-0.025em] leading-[1.35] text-ink">{title}</h2>
      {body && <p className={`mt-5 text-base ${small ? '' : 'md:text-lg'} leading-[1.6] text-muted ${bodyClass}`}>{body}</p>}
    </Reveal>
  )
}

/* ---------- §0.3 A: FAQ accordion ---------- */
export function FAQ({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="max-w-3xl mx-auto border border-line divide-y divide-line">
      {items.map((it, i) => {
        const on = open === i
        return (
          <div key={it.q}>
            <button onClick={() => setOpen(on ? null : i)} aria-expanded={on}
              className="group font-sans w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left hover:bg-gray-50/50 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-brand">
              <span className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center transition-all ${on ? 'bg-indigo-brand border-indigo-brand' : 'border-line group-hover:border-gray-400'}`}>
                <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke={on ? '#fff' : '#868a97'} strokeWidth="2" strokeLinecap="round">
                  {on ? <path d="M1 6h10" /> : <path d="M6 1v10M1 6h10" />}
                </svg>
              </span>
              <span className="font-display font-medium text-base md:text-lg leading-relaxed text-ink">{it.q}</span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <p className="pb-5 pl-[52px] md:pl-[56px] pr-6 text-muted leading-relaxed"><Rich parts={it.a} /></p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- §0.3 B: pricing check-list item ---------- */
export function CheckItem({ children }) {
  return (
    <li className="flex items-start gap-2">
      <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0 mt-0.5 text-green-500" fill="none"><path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="text-sm text-ink">{children}</span>
    </li>
  )
}

/* ---------- Video modal: overlay fade, dialog scale .9 → 1 (CLONE_SPEC §4.2). No real video ships with the clone. ---------- */
export function VideoModal({ open, onClose, poster, label = 'Customer video' }) {
  useEffect(() => {
    if (!open) return
    const f = e => e.key === 'Escape' && onClose()
    addEventListener('keydown', f)
    return () => removeEventListener('keydown', f)
  }, [open])
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="vm" className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div role="dialog" aria-label={label} className="relative w-full max-w-4xl aspect-video bg-surface-dark overflow-hidden rounded-xl" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
            {poster && <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
              <span className="w-16 h-16 rounded-full border-2 border-white/70 flex items-center justify-center"><Play /></span>
              <span className="text-sm text-white/80">Video preview placeholder</span>
            </div>
            <button onClick={onClose} aria-label="Close video" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors duration-150"><Close /></button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ---------- §0.3 C: media play tile ---------- */
export function MediaTile({ src, className = '' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Play video" className={`group relative block w-full overflow-hidden ${className}`}>
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-br from-indigo-brand/40 to-indigo-brand/0" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-white/25"><Play /></span>
        </span>
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} poster={src} />
    </>
  )
}

/* ---------- §0.3 D: pill tags ---------- */
const External = () => (
  <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h4v4M12 2L6.5 7.5M10.5 8.5V11a1 1 0 01-1 1H3a1 1 0 01-1-1V4.5a1 1 0 011-1h2.5" /></svg>
)
export function PillTag({ children, size = 'sm', href }) {
  if (size === 'sm') return <span className="inline-block px-3 py-1.5 bg-gray-100 text-xs font-medium text-muted rounded-full">{children}</span>
  const cls = 'inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink bg-gray-100 rounded-full'
  return href
    ? <a href={href} onClick={e => e.preventDefault()} className={`${cls} hover:bg-gray-200 transition-colors duration-150`}>{children}<External /></a>
    : <span className={cls}>{children}</span>
}

/* ---------- Legacy "section pill" replacement: glass chip (§8 mapping) ---------- */
export function GlassPill({ children, icon = true }) {
  return (
    <span className="glass-pill">
      {icon && <span className="w-[18px] h-[18px] rounded-full bg-indigo-brand/15 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-indigo-brand" /></span>}
      {children}
    </span>
  )
}

/* ---------- Native form (§6 field styles). Visual only: validates, then swaps to an inline success panel. ---------- */
const inputBase = 'w-full bg-white border rounded-lg px-4 py-3 text-base text-ink placeholder:text-muted outline-none transition-colors duration-150 focus:border-indigo-brand focus:ring-1 focus:ring-indigo-brand'
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export function NativeForm({ fields, submit, success, error, buttonClass = 'w-full bg-indigo-brand text-white font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-indigo-dark' }) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const grid = fields.some(f => f.half)

  const onSubmit = e => {
    e.preventDefault()
    const next = {}
    fields.forEach(f => {
      const v = (values[f.name] || '').trim()
      if (f.required && !v) next[f.name] = `${f.label} is required.`
      else if (f.type === 'email' && v && !emailOk(v)) next[f.name] = 'Please enter a valid email address.'
    })
    setErrors(next)
    if (!Object.keys(next).length) setDone(true)
  }

  if (done) return (
    <div role="status" className="border border-line bg-slate-50 p-6 flex items-start gap-3">
      <svg viewBox="0 0 20 20" className="w-5 h-5 shrink-0 mt-0.5" fill="none"><circle cx="10" cy="10" r="9" fill="#22c55e" fillOpacity=".15" /><path d="M6 10.3l2.6 2.6L14 7.4" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <p className="text-base text-ink">{success}</p>
    </div>
  )

  return (
    <form noValidate onSubmit={onSubmit} className={grid ? 'grid md:grid-cols-2 gap-x-4' : ''}>
      {fields.map(f => {
        const err = errors[f.name]
        const props = {
          id: `f-${f.name}`, name: f.name, placeholder: f.placeholder, value: values[f.name] || '', 'aria-invalid': !!err,
          onChange: e => setValues(v => ({ ...v, [f.name]: e.target.value })),
          className: `${inputBase} ${err ? 'border-red-500' : 'border-line'}`,
        }
        return (
          <div key={f.name} className={`mb-4 ${grid && !f.half ? 'md:col-span-2' : ''}`}>
            <label htmlFor={props.id} className="block text-sm leading-5 font-medium text-ink mb-2">{f.label}{f.required && <span className="text-muted"> *</span>}</label>
            {f.type === 'textarea' ? <textarea rows={f.rows || 4} {...props} className={`${props.className} resize-y`} />
              : f.type === 'select' ? (
                <select {...props} className={`${props.className} appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:12px] pr-10`}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23868a97' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")" }}>
                  <option value="" disabled>Choose one</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : <input type={f.type || 'text'} {...props} />}
            {err && <p className="mt-1 text-sm text-red-500">{err}</p>}
          </div>
        )
      })}
      <div className={grid ? 'md:col-span-2' : ''}>
        <button type="submit" className={buttonClass}>{submit}</button>
        {error && Object.keys(errors).length > 0 && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
    </form>
  )
}

/* ---------- §2.11 EnterpriseCTA (violet grain card with floating glass avatars) ---------- */
const floaters = [
  { top: '16%', left: '4%', r: -8 }, { top: '48%', left: '10%', r: 6 }, { top: '76%', left: '5%', r: -4 },
  { top: '14%', right: '4%', r: 7 }, { top: '50%', right: '10%', r: -6 }, { top: '74%', right: '5%', r: 5 },
]
// Route links use <Link>; same-page anchors (href: '#apply') use a plain <a> so the browser scrolls.
const Btn = ({ to, href, label, className }) => href ? <a href={href} className={className}>{label}</a> : <Link to={to} className={className}>{label}</Link>

export function GrainCTA({ title = ctaDefaults.title, highlight, body = ctaDefaults.body, primary = ctaDefaults.primary, secondary = ctaDefaults.secondary }) {
  const h = highlight && title.includes(highlight) ? title.split(highlight) : null
  return (
    <Row>
      <div className={stacked}>
        <div className="relative overflow-hidden rounded-2xl">
          <Grain />
          {floaters.map(({ r, ...pos }, i) => (
            <span key={i} className="hidden lg:flex absolute h-11 w-11 rounded-full border border-white/60 bg-white/70 backdrop-blur-glass shadow-glass items-center justify-center"
              style={{ ...pos, transform: `rotate(${r}deg)` }}><Avatar seed={i * 3 + 2} size={28} /></span>
          ))}
          <div className="relative px-6 py-16 md:py-24">
            <Reveal className="mx-auto max-w-xl flex flex-col items-center text-center">
              <h2 className="text-[30px] md:text-[36px] tracking-[-0.025em] leading-[1.35] text-ink">
                {h ? <>{h[0]}<span className="text-indigo-brand">{highlight}</span>{h[1]}</> : title}
              </h2>
              <p className="mt-5 max-w-lg mx-auto text-base md:text-lg leading-[1.6] text-ink/80">{body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {primary && <Btn {...primary} className="btn-primary !rounded-full" />}
                {secondary && <Btn {...secondary} className="btn-secondary !rounded-full !bg-white hover:!bg-[#f9f9fa]" />}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- LogoGridSection (CLONE_SPEC §3.2) with links into customer stories ---------- */
export function LogoGrid() {
  return (
    <Row innerClassName="border-b border-line">
      <div className="py-6 sm:py-12 sm:pt-14 lg:py-12 w-full">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-5 sm:gap-8 px-6 md:px-20 desktop:px-14">
          {logoGrid.map(l => (
            <div key={l.name} className="group flex flex-col items-center">
              <div className="h-10 flex items-center grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100">
                <Wordmark name={l.name} size="sm" className="group-hover:text-indigo-brand transition-colors duration-300" />
              </div>
              <div className="hidden sm:block h-4">
                {l.slug && (
                  <Link to={`/customers/${l.slug}`} className="relative text-xs font-medium text-indigo-brand/85 hover:text-indigo-brand hover:underline inline-flex items-center">
                    {logoLink}
                    <Arrow className="absolute -right-4 w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ---------- Mount-time fade-up used by page heroes ---------- */
export function MountIn({ children, className = '', delay = 0, y = 16, as = 'div' }) {
  const M = motion[as]
  return <M className={className} initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay }}>{children}</M>
}
