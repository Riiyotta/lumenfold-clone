import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { enterpriseHero, governance, stackCollapse, productionGap, comparison } from '../../content/company'
import { EASE, Row, Reveal, Grain, Avatar, AppIcon, LogoMark, Chevron } from '../ui'
import { PageHeading, pad, stacked } from './shared'

const OUT = [0.23, 1, 0.32, 1]

/* ---------- 1. EnterpriseHero ---------- */
const chipIcons = [
  'M2 6.5h9M2 3.5h9M2 9.5h5', 'M6.5 1.5l4.5 2.5v5l-4.5 2.5L2 9V4z', 'M2.5 6.5l2.5 2.5 5.5-5.5',
  'M6.5 2v9M2 6.5h9', 'M3 10l2.5-3 2 2L11 4', 'M2 4h9v6H2zM4.5 4V2.5h4V4',
]
function Chip({ label, i }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 py-1 pl-1 pr-3 text-[12px] font-medium text-ink shadow-glass-sm backdrop-blur-glass" style={{ background: 'rgba(255,255,255,.55)' }}>
      <span className="w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center text-indigo-brand">
        <svg viewBox="0 0 13 13" className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={chipIcons[i % chipIcons.length]} /></svg>
      </span>
      {label}
    </span>
  )
}

export function EnterpriseHero() {
  const h = enterpriseHero
  let n = 0
  return (
    <Row className="overflow-hidden">
      <div className={`relative pt-10 md:pt-16 ${pad}`}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-8 lg:gap-x-10 items-center pb-10 md:pb-14">
          <h1 className="lg:col-span-7 text-5xl leading-[1.2] tracking-[-0.15rem] [text-wrap:balance] font-normal text-ink">{h.title}</h1>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-base max-w-xl leading-[1.6] text-muted">{h.body}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to={h.primary.to} className="btn-primary !rounded-full">{h.primary.label}</Link>
              <Link to={h.secondary.to} className="btn-secondary !rounded-full">{h.secondary.label}</Link>
            </div>
          </div>
        </motion.div>
        <div className="pb-6 md:pb-12 lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }} className="relative w-full overflow-hidden">
            <Grain />
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: OUT }} className="relative px-6 py-10 md:px-12 md:py-16 lg:px-16">
              <div className="flex flex-col items-center gap-2.5 md:gap-3">
                {h.rows.map((row, r) => (
                  <div key={r} className="flex flex-wrap justify-center gap-2.5 md:gap-3">
                    {row.map(item => {
                      const i = n++
                      return (
                        <motion.span key={item} className="inline-flex" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.3 + i * 0.05 }}>
                          {item.startsWith('@')
                            ? <span className="w-[30px] h-[30px] rounded-full bg-white overflow-hidden" style={{ boxShadow: '0 0 0 2px rgba(255,255,255,.9), 0 2px 8px rgba(13,22,47,.12)' }}><Avatar seed={+item.slice(1)} size={30} /></span>
                            : <Chip label={item} i={i} />}
                        </motion.span>
                      )
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- 5. AgentGovernance: home ExpandTiles idiom with 3 tiles ---------- */
const tones = ['violet', 'pink', 'blue']
const ease = 'cubic-bezier(.23,1,.32,1)'

function TileArt({ i, pills }) {
  return (
    <div className="flex flex-col items-start gap-2.5">
      {pills.map((p, k) => (
        <span key={p} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`} style={i === 0 && k === 2 ? { opacity: 0.55 } : undefined}>
          {i === 1 ? <Avatar seed={k + 4} size={18} />
            : <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${i === 2 && k === 1 ? 'bg-amber-500' : 'bg-indigo-brand'}`}>
              <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1.5 4.2l1.6 1.6L6.5 2.4" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
            </span>}
          {p}
        </span>
      ))}
    </div>
  )
}

export function AgentGovernance() {
  const [active, setActive] = useState(0)
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={governance.title} body={governance.body} bodyClass="max-w-lg" />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {governance.items.map((t, i) => {
            const on = active === i
            return (
              <div key={t.label} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                className="tile relative overflow-hidden bg-tile-base lg:h-[400px] lg:basis-0 min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
                style={{ flexGrow: on ? 2.4 : 1, transition: `flex-grow .65s ${ease}` }} data-on={on}>
                <div className={`absolute inset-0 grain-${tones[i]} tile-fade`} style={{ transition: `opacity .65s ${ease}` }} />
                <div className="grain-noise" />
                <div className="tile-illus absolute left-6 top-6 hidden lg:block pointer-events-none" aria-hidden="true" style={{ transition: `opacity .45s ${ease} ${on ? '.2s' : '0s'}` }}>
                  <TileArt i={i} pills={t.pills} />
                </div>
                <div className="relative h-full hidden lg:flex flex-col justify-end p-6">
                  <div className="w-[180px]">
                    <span className="text-sm tile-label" style={{ transition: `color .65s ${ease}` }}>{t.label}</span>
                    <h4 className="mt-1.5 text-xl font-medium tracking-[-0.5px] text-ink">{t.title}</h4>
                  </div>
                  <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: `grid-template-rows .65s ${ease}` }}>
                    <div className="overflow-hidden">
                      <p className="tile-body pt-2 w-[370px] max-w-full text-sm leading-[1.6] text-ink/75" style={{ transition: `opacity .5s ${ease} ${on ? '.15s' : '0s'}` }}>{t.body}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:hidden relative p-6">
                  <div className="mb-8 mt-2 pointer-events-none" aria-hidden="true"><TileArt i={i} pills={t.pills} /></div>
                  <span className="text-sm text-ink/50">{t.label}</span>
                  <h4 className="mt-1.5 text-lg font-medium text-ink">{t.title}</h4>
                  <p className="pt-2 text-sm leading-[1.6] text-ink/75">{t.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Row>
  )
}

/* ---------- 6. StackCollapse ---------- */
const PLATES = 8, TOP_CY = 130, GAP = 42, MID_CY = TOP_CY + (PLATES / 2) * GAP // plates collapse onto the stack's midpoint
const plateVariants = {
  hidden: { opacity: 0, y: 14 },
  show: c => ({ opacity: c.op, y: 0, transition: EASE }),
  collapsed: c => ({ opacity: c.op, y: c.dy, transition: { duration: 0.6, ease: OUT } }),
}

function Plate({ cy, top, merged }) {
  const fill = top || merged ? '#eef2ff' : '#fff'
  const stroke = top || merged ? 'rgba(96,86,255,.55)' : 'rgba(13,22,47,.18)'
  const t = { transition: 'fill .45s, stroke .45s' }
  return (
    <>
      <path d={`M40 ${cy}L190 ${cy + 55}V${cy + 63}L40 ${cy + 8}z`} style={{ ...t, fill: top || merged ? '#c7cfff' : '#eceef3', stroke }} />
      <path d={`M340 ${cy}L190 ${cy + 55}V${cy + 63}L340 ${cy + 8}z`} style={{ ...t, fill: top || merged ? '#b3bdff' : '#e1e3ea', stroke }} />
      <path d={`M190 ${cy - 55}L340 ${cy}L190 ${cy + 55}L40 ${cy}z`} style={{ ...t, fill, stroke }} />
    </>
  )
}

function LayerStack({ phase }) {
  return (
    <svg viewBox="0 56 380 478" className="w-full max-w-[460px] mx-auto lg:mx-0" fill="none" strokeWidth="1">
      <motion.g initial="hidden" animate={phase} variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }, collapsed: {} }}>
        {Array.from({ length: PLATES }).map((_, k) => {
          const i = PLATES - 1 - k // paint bottom first
          const cy = TOP_CY + (i + 1) * GAP
          return (
            <motion.g key={i} custom={{ op: 0.32 + (i / (PLATES - 1)) * 0.4, dy: MID_CY - cy }} variants={plateVariants}>
              <Plate cy={cy} merged={phase === 'collapsed'} />
            </motion.g>
          )
        })}
        <motion.g custom={{ op: 1, dy: MID_CY - TOP_CY }} variants={plateVariants}>
          <Plate cy={TOP_CY} top />
          <g transform={`translate(178 ${TOP_CY - 12})`}><LogoMark size={24} /></g>
        </motion.g>
      </motion.g>
    </svg>
  )
}

const chartPaths = [
  { kind: 'bars', v: [30, 46, 38, 62, 54, 78, 70] },
  { kind: 'line', d: 'M8 86C40 80 56 60 84 62S132 36 160 40 204 18 224 16' },
  { kind: 'bars', v: [70, 58, 52, 40, 34, 26, 18] },
  { kind: 'line', d: 'M8 30C36 34 60 52 88 50S140 74 168 70 208 86 224 84' },
  { kind: 'bars', v: [22, 34, 30, 48, 60, 56, 74] },
]
const metaColors = ['#7a49ff', '#6d4fff', '#744cff']

function MiniChart({ i }) {
  const c = chartPaths[i]
  return (
    <div className="bg-white rounded-xl px-4 py-5 mt-auto" style={{ boxShadow: 'inset 0 0 0 1px rgba(13,22,47,.05)' }}>
      <svg viewBox="0 0 232 104" className="w-full h-auto" fill="none">
        {[26, 52, 78].map(y => <path key={y} d={`M0 ${y}H232`} stroke="#e6e7ea" strokeDasharray="2 4" />)}
        {c.kind === 'bars'
          ? c.v.map((h, k) => <rect key={k} x={8 + k * 32} y={100 - h} width="20" height={h} rx="3" fill="#6056ff" fillOpacity={0.25 + k * 0.1} />)
          : <><path d={c.d} stroke="#6056ff" strokeWidth="2" strokeLinecap="round" /><path d={`${c.d}V104H8z`} fill="#6056ff" fillOpacity=".08" /></>}
      </svg>
    </div>
  )
}

function Marquee() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })
  const cards = [...stackCollapse.cards, ...stackCollapse.cards]
  return (
    <div ref={ref} className="stack-marquee overflow-hidden" data-on={inView}>
      <div className="stack-marquee-track flex w-max">
        {cards.map((c, i) => (
          <div key={i} className="w-[340px] sm:w-[400px] shrink-0 pr-5" aria-hidden={i >= stackCollapse.cards.length}>
            <div className="bg-slate-50 rounded-2xl p-5 flex flex-col gap-4 h-full">
              <div>
                <h4 className="text-[15.5px] leading-[1.35] font-medium text-ink">{c.title}</h4>
                <div className="mt-1.5 flex items-center gap-1.5 text-[13px]">
                  <span style={{ color: metaColors[i % 3] }}>{c.meta[0]}</span>
                  <span className="text-muted">{c.meta[1]}</span>
                  <span style={{ color: metaColors[(i + 1) % 3] }}>{c.meta[2]}</span>
                </div>
              </div>
              <MiniChart i={i % stackCollapse.cards.length} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConvergeDiagram() {
  const ys = [28, 72, 116, 160, 204]
  return (
    <svg viewBox="0 0 360 232" className="w-full max-w-[420px] mx-auto" fill="none">
      {ys.map((y, k) => (
        <g key={y}>
          <path d={`M108 ${y}C170 ${y} 180 116 236 116`} stroke="#b6b9c0" strokeDasharray="4 6" />
          <rect x="8" y={y - 14} width="100" height="28" rx="6" fill="#fff" stroke="#e6e7ea" />
          <rect x="18" y={y - 4} width={[52, 64, 44, 70, 58][k]} height="8" rx="4" fill="#e6e7ea" />
        </g>
      ))}
      <rect x="236" y="84" width="116" height="64" rx="10" fill="#fff" stroke="#6056ff" strokeOpacity=".5" />
      <g transform="translate(250 104)"><LogoMark size={24} /></g>
      <text x="282" y="121" fontFamily="Inter" fontSize="12" fontWeight="600" fill="#0d162f">lumenfold</text>
    </svg>
  )
}

export function StackCollapse() {
  const s = stackCollapse
  const reduce = useReducedMotion()
  const [inView, setInView] = useState(false)
  const [phase, setPhase] = useState('hidden')
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    setPhase('show')
    const c = setTimeout(() => setPhase('collapsed'), (PLATES * 0.08 + 0.5 + 0.6) * 1000)
    let iv
    const w = reduce ? null : setTimeout(() => { iv = setInterval(() => setActive(a => (a + 1) % s.layers.length), 1800) }, (s.layers.length - 1) * 80 + 1600)
    return () => { clearTimeout(c); clearTimeout(w); clearInterval(iv) }
  }, [inView, reduce])

  return (
    <Row>
      <div className={stacked}>
        <Reveal className="max-w-3xl mb-12">
          <h2 className="text-[30px] md:text-[36px] tracking-[-0.025em] leading-[1.25] text-ink">{s.title}</h2>
          <p className="mt-5 text-base md:text-lg max-w-2xl leading-[1.6] text-muted">{s.body}</p>
        </Reveal>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={EASE} onViewportEnter={() => setInView(true)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <LayerStack phase={phase} />
            <div className="bg-slate-50 rounded-2xl overflow-hidden">
              <ul className="flex flex-col gap-1 p-2">
                {s.layers.map(([name, meta], i) => (
                  <li key={name} className="flex items-center gap-3 py-3 px-3.5 rounded-lg transition-all duration-300"
                    style={i === active ? { background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(13,22,47,.05), inset 0 2px 6px rgba(13,22,47,.08)' } : undefined}>
                    <span className={`text-sm font-medium transition-colors duration-300 ${i === active ? 'text-indigo-brand' : 'text-ink'}`}>{name}</span>
                    <span className="ml-auto hidden sm:inline text-[12.5px] text-muted">{meta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <h3 className="font-sans text-2xl leading-[1.3] font-normal max-w-2xl mb-8 text-ink">{s.marqueeTitle}</h3>
            <Marquee />
          </div>
          <div className="mt-8 md:mt-10 bg-slate-50 rounded-2xl p-6 md:p-10 lg:p-14 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h3 className="font-sans font-normal leading-[1.4] max-w-md text-ink" style={{ fontSize: 'clamp(24px,2.2vw,30px)' }}>{s.closingTitle}</h3>
              <p className="mt-5 max-w-sm text-base leading-[1.6]" style={{ color: 'rgba(13,22,47,.72)' }}>{s.closingBody}</p>
            </div>
            <ConvergeDiagram />
          </div>
        </motion.div>
      </div>
    </Row>
  )
}

/* ---------- 8. ProductionGap ---------- */
const bandFills = ['rgba(238,242,255,.45)', 'rgba(238,242,255,.65)', 'rgba(227,233,255,.8)', 'rgba(219,226,255,.9)']
const fade = d => ({ initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.55, delay: d } })

// framer's pathLength drives stroke-dasharray, so the dashed line is revealed through a solid masked stroke instead.
function DrawDashed({ id, d, duration, delay, on }) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="470">
        <motion.path d={d} stroke="#fff" strokeWidth="4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration, delay, ease: OUT }} />
      </mask>
      <path d={d} stroke="#b6b9c0" strokeWidth="1.5" strokeDasharray="4 6" mask={`url(#${id})`} />
    </>
  )
}

export function ProductionGap() {
  const g = productionGap
  const ref = useRef(null)
  const on = useInView(ref, { once: true, amount: 0.3 })
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={g.title} body={g.body} />
        {/* md and up: diagram */}
        <svg ref={ref} viewBox="0 0 1000 470" className="hidden md:block w-full h-auto" fill="none">
          {g.bands.map((b, i) => (
            <motion.g key={b.title} {...fade(0.6 + i * 0.15)}>
              <rect x="40" y={150 + i * 50} width="920" height="50" fill={bandFills[i]} />
              <text x="560" y={b.sub ? 171 + i * 50 : 180 + i * 50} textAnchor="middle" fontFamily="Inter" fontSize="14" fontWeight="500" fill="#0d162f">{b.title}</text>
              {b.sub && <text x="560" y={189 + i * 50} textAnchor="middle" fontFamily="Inter" fontSize="12" fill="#868a97">{b.sub}</text>}
            </motion.g>
          ))}
          <DrawDashed id="pg1" d="M240 72H860V366" duration={1.1} delay={0.1} on={on} />
          <DrawDashed id="pg2" d="M140 104V330C140 380 200 398 260 398H760" duration={1.5} delay={0.55} on={on} />
          <motion.g {...fade(0)}>
            <rect x="40" y="40" width="200" height="64" fill="#fff" stroke="#e6e7ea" />
            <text x="60" y="68" fontFamily="Inter" fontSize="14" fontWeight="600" fill="#0d162f">{g.top.title}</text>
            <text x="60" y="88" fontFamily="Inter" fontSize="12" fill="#868a97">{g.top.sub}</text>
          </motion.g>
          <motion.text {...fade(0.4)} x="550" y="60" textAnchor="middle" fontFamily="Inter" fontSize="12" fill="#868a97">The path most plans assume</motion.text>
          <motion.g {...fade(1.4)}>
            <rect x="760" y="366" width="200" height="64" fill="#fff" stroke="#6056ff" />
            <text x="780" y="394" fontFamily="Inter" fontSize="14" fontWeight="600" fill="#0d162f">Production</text>
            <text x="780" y="414" fontFamily="Inter" fontSize="12" fill="#868a97">Safe at full volume</text>
          </motion.g>
        </svg>
        {/* below md: stacked fallback */}
        <div className="md:hidden">
          <div className="border border-line bg-white px-4 py-3.5">
            <div className="text-sm font-semibold text-ink">{g.top.title}</div>
            <div className="text-xs text-muted">{g.top.sub}</div>
          </div>
          <div style={{ borderTop: '1.5px dashed rgba(96,86,255,.5)' }} />
          {g.bands.map((b, i) => (
            <div key={b.title} className="px-4 py-3.5 border-x border-b border-line" style={{ background: bandFills[i] }}>
              <div className="text-sm font-medium text-ink">{b.title}</div>
              {b.sub && <div className="text-xs text-muted">{b.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ---------- 10. CompetitorComparison ---------- */
const status = {
  yes: ['#ecfdf3', <path key="y" d="M6 10.2l2.6 2.6L14 7.4" stroke="#12b76a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />],
  partial: ['#fffbeb', <path key="p" d="M6.5 10h7" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />],
  no: ['#fef2f2', <path key="n" d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />],
}
function Disc({ s, small }) {
  return <span className={`${small ? 'w-4 h-4' : 'w-5 h-5'} mt-0.5 rounded-full shrink-0 flex items-center justify-center`} style={{ background: status[s][0] }}><svg viewBox="0 0 20 20" className="w-full h-full" fill="none">{status[s][1]}</svg></span>
}

function BrandCell({ small }) {
  return <span className="inline-flex items-center gap-1.5"><LogoMark size={small ? 16 : 18} /><span className={`font-display font-semibold tracking-[-0.03em] text-ink leading-none ${small ? 'text-[14px]' : 'text-[16px]'}`}>lumenfold</span></span>
}

function Picker({ sel, setSel, small }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const f = e => !ref.current?.contains(e.target) && setOpen(false)
    addEventListener('mousedown', f)
    return () => removeEventListener('mousedown', f)
  }, [open])
  const cur = comparison.competitors.find(c => c.id === sel)
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="group font-sans flex items-center gap-2 w-full text-left">
        <AppIcon seed={cur.seed} className={small ? 'w-4 h-4' : 'w-[18px] h-[18px]'} />
        <span className={`${small ? 'text-[12px]' : 'text-[13px]'} font-semibold text-gray-700 tracking-[-0.01em]`}>{cur.label}</span>
        <span className={`ml-auto ${small ? 'w-5 h-5' : 'w-6 h-6'} rounded-md bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors duration-150`}>
          <Chevron className={`w-3.5 h-3.5 text-gray-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {comparison.competitors.map(c => (
            <button key={c.id} onClick={() => { setSel(c.id); setOpen(false) }}
              className={`font-sans flex items-center gap-1.5 w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors duration-150 ${c.id === sel ? 'bg-gray-50' : ''}`}>
              <AppIcon seed={c.seed} className="w-3.5 h-3.5" />
              <span className={`text-[12px] font-medium ${c.id === sel ? 'text-indigo-brand' : 'text-gray-700'}`}>{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Swap({ sel, children, gap = 'gap-3' }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className={`flex ${gap}`}>{children}</motion.div>
    </AnimatePresence>
  )
}

export function CompetitorComparison() {
  const c = comparison
  const [sel, setSel] = useState(c.competitors[0].id)
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={<>{c.titleA} <span className="text-indigo-brand">{c.titleB}</span></>} body={c.body} bodyClass="max-w-lg" />
        <Reveal amount={0.15} className="border border-gray-200 overflow-hidden bg-white">
          {/* md and up */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1fr] border-b border-gray-200">
              <div className="px-5 py-3.5 border-r border-gray-100" />
              <div className="px-5 py-3.5 border-r border-gray-100 flex items-center"><BrandCell /></div>
              <div className="px-5 py-3.5"><Picker sel={sel} setSel={setSel} /></div>
            </div>
            {c.rows.map(r => {
              const [s, t] = r.them[sel]
              return (
                <div key={r.label} className="grid md:grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1fr] border-b border-gray-100 last:border-b-0">
                  <div className="px-5 py-4 text-[13px] font-medium text-gray-900 tracking-[-0.01em] leading-[1.4]">{r.label}</div>
                  <div className="px-5 py-4 flex gap-3 bg-[#fafafe]"><Disc s="yes" /><p className="text-[13px] leading-[1.55] text-gray-700">{r.us}</p></div>
                  <div className="px-5 py-4"><Swap sel={sel}><Disc s={s} /><p className="text-[13px] leading-[1.55] text-gray-500">{t}</p></Swap></div>
                </div>
              )
            })}
          </div>
          {/* below md */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 border-b border-gray-200">
              <div className="px-4 py-3 border-r border-gray-100 flex items-center"><BrandCell small /></div>
              <div className="px-4 py-3"><Picker sel={sel} setSel={setSel} small /></div>
            </div>
            {c.rows.map(r => {
              const [s, t] = r.them[sel]
              return (
                <div key={r.label} className="border-b border-gray-100 last:border-b-0">
                  <div className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.05em]">{r.label}</div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-3 flex gap-2 bg-[#fafafe]"><Disc s="yes" small /><p className="text-[12px] leading-[1.5] text-gray-700">{r.us}</p></div>
                    <div className="px-4 py-3"><Swap sel={sel} gap="gap-2"><Disc s={s} small /><p className="text-[12px] leading-[1.5] text-gray-500">{t}</p></Swap></div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </Row>
  )
}
