import { Link } from 'react-router-dom'
import { palettes } from '../../content/catalog'
import { AppIcon, Avatar } from '../ui'
import './catalog.css'

/* GrainBand 5-layer builder (CLONE_SPEC 1.2) fed by the function palettes (PAGES_CATALOG A.0). */
export function grainBg(id = 'sales') {
  const p = palettes[id] || palettes.sales
  const r = (c, a) => `rgba(${c},${a})`
  return `radial-gradient(90% 80% at 12% 0%, ${r(p.deep, 0.55)} 0%, ${r(p.deep, 0)} 62%), radial-gradient(85% 75% at 92% 10%, ${r(p.second, 0.55)} 0%, ${r(p.second, 0)} 62%), radial-gradient(85% 85% at 82% 100%, ${r(p.deep, 0.5)} 0%, ${r(p.deep, 0)} 60%), radial-gradient(80% 70% at 22% 100%, ${r(p.warm, 0.6)} 0%, ${r(p.warm, 0)} 65%), linear-gradient(160deg, ${p.base[0]} 0%, ${p.base[1]} 50%, ${p.base[2]} 100%)`
}
export const accent = id => palettes[id] || palettes.sales

export function PGrain({ palette = 'sales', className = '', layerClass = '', style }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className={`absolute inset-0 ${layerClass}`} style={{ background: grainBg(palette), ...style }} />
      <div className="grain-noise" />
    </div>
  )
}

/* Standard StackedSection inner padding */
export const PAD = 'py-12 md:py-28 px-6 md:px-12 lg:px-20'
export const PADX = 'px-6 md:px-12 lg:px-20'

/* ---------- Lumenfold glyphs (original, stroke 1.6) ---------- */
const G = {
  bolt: 'M11 2L4 11h5l-1 7 7-9h-5z',
  mail: 'M3 5h14v10H3zM3 5l7 6 7-6',
  calendar: 'M4 5h12v11H4zM4 8.5h12M7 3v3M13 3v3',
  chart: 'M4 16V9M8.5 16V5M13 16v-5M17 16H3',
  doc: 'M6 3h6l3 3v11H6zM12 3v3h3M8.5 10h4M8.5 13h4',
  chat: 'M4 5h12v8H9l-3.5 3v-3H4z',
  search: 'M9 15A6 6 0 109 3a6 6 0 000 12zM17 17l-3.6-3.6',
  shield: 'M10 3l6 2.5V10c0 3.6-2.6 6-6 7-3.4-1-6-3.4-6-7V5.5z',
  users: 'M7.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 16c.4-2.6 2.2-4 4.5-4s4.1 1.4 4.5 4M13 4.3a2.5 2.5 0 010 4.4M14.5 12c1.4.4 2.3 1.7 2.5 4',
  database: 'M10 7c3.3 0 6-1 6-2.3S13.3 2.5 10 2.5 4 3.5 4 4.7 6.7 7 10 7zM4 4.7v10.6C4 16.5 6.7 17.5 10 17.5s6-1 6-2.2V4.7M4 10c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3',
  globe: 'M10 17a7 7 0 100-14 7 7 0 000 14zM3 10h14M10 3c2 2 2.8 4.4 2.8 7S12 15 10 17c-2-2-2.8-4.4-2.8-7S8 5 10 3z',
  spark: 'M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6z',
  clock: 'M10 17a7 7 0 100-14 7 7 0 000 14zM10 6v4l2.5 2',
  flag: 'M5 17V3.5M5 4h9l-2 3 2 3H5',
  inbox: 'M3 11l2-7h10l2 7v5H3zM3 11h4l1 2h4l1-2h4',
  link: 'M8.5 11.5a3 3 0 004.2 0l2.5-2.5a3 3 0 00-4.2-4.2l-1 1M11.5 8.5a3 3 0 00-4.2 0L4.8 11a3 3 0 004.2 4.2l1-1',
  send: 'M3 10l14-6-5 13-2.5-5.5z',
  layers: 'M10 3l7 4-7 4-7-4zM3 10.5l7 4 7-4M3 14l7 4 7-4',
  bell: 'M5 14V9a5 5 0 0110 0v5l1.5 1.5h-13zM8.5 17.5h3',
  check: 'M4.5 10.5l3.5 3.5 7.5-8',
  play: 'M7 4.5v11l8.5-5.5z',
  warn: 'M10 3.5l7.5 13h-15zM10 8.5v3.5M10 14.3v.2',
}
export const glyphNames = Object.keys(G)
export function Glyph({ name = 'spark', className = 'w-5 h-5', color = 'currentColor', stroke = 1.6 }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d={G[name] || G.spark} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* 44px glass coin (ClosingCTA / T1 aurora). Holds a 20px icon or a 28px avatar. */
export function GlassCoin({ children, size = 44, className = '', style }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full border border-white/60 bg-white/70 backdrop-blur-glass shadow-glass shrink-0 ${className}`} style={{ width: size, height: size, ...style }}>
      {children}
    </span>
  )
}
export const coinContent = c => {
  if (c.avatar != null) return <Avatar seed={c.avatar} size={28} />
  if (c.app != null) return <AppIcon seed={c.app} className="w-5 h-5" />
  return <Glyph name={c.glyph} className="w-5 h-5" color="#4b40d6" />
}

/* 16px check disc (glass pills) */
export function CheckDisc({ color = '#6056ff' }) {
  return (
    <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: color }}>
      <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1.5 4.2l1.6 1.6L6.5 2.4" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
    </span>
  )
}

/* Logo tile used by T1 cards (48px, 6px inset) and T2 hero (56px, 8px inset). */
export function LogoTile({ seed, size = 48, inset = 6, className = '' }) {
  return (
    <span className={`flex items-center justify-center rounded-lg bg-white border border-line overflow-hidden shrink-0 ${className}`} style={{ width: size, height: size, padding: inset }}>
      <AppIcon seed={seed} className="block w-full h-full" />
    </span>
  )
}

/* ---------- Catalog controls (A.0 text field / select) ---------- */
const field = 'h-[42px] py-2.5 text-sm text-ink bg-white border border-line rounded-button outline-none transition-all duration-150 focus:border-indigo-brand focus:ring-2 focus:ring-indigo-brand/20'

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"><Glyph name="search" className="w-4 h-4" stroke={2} /></span>
      <input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder}
        className={`${field} w-full pl-10 pr-4 placeholder:text-muted`} />
    </div>
  )
}

export function SelectField({ value, onChange, options, label }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)} aria-label={label}
        className={`${field} w-full sm:w-auto px-4 pr-10 appearance-none cursor-pointer font-sans`}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {/* Spec: original renders no chevron; Lumenfold may add a 16px chevron at right-3. */}
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  )
}

/* ---------- Breadcrumb (T2) ---------- */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.to ? <Link to={it.to} className="hover:text-ink transition-colors duration-150">{it.label}</Link> : <span className="text-ink" aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
