import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE, Row, SectionHeading, PillTabs, Avatar, AppIcon, LogoMark, Chevron } from '../ui'
import { PGrain, Glyph, PAD } from './primitives'

const outQuint = [0.23, 1, 0.32, 1]

/* ------------------------------------------------------------------ */
/* AgentsHero                                                          */
/* ------------------------------------------------------------------ */
function AgentNode({ name, seed, tools, i, mobile }) {
  return (
    <motion.div className="flex flex-col items-center gap-2.5"
      initial={{ opacity: 0, scale: 0.85, y: 8 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: outQuint, delay: mobile ? i * 0.12 : 0.15 + i * 0.18 }}>
      <span className="relative w-14 h-14 rounded-full border border-white/60 bg-white/80 backdrop-blur-glass shadow-glass flex items-center justify-center">
        <Avatar seed={seed} size={38} />
        <span className="absolute right-0.5 bottom-0.5 w-2.5 h-2.5 rounded-full bg-[#14b8a6] ring-2 ring-white" />
      </span>
      <span className="glass-pill !px-3.5 !py-2 !gap-2">
        {name}
        <span className="flex ml-1">
          {tools.map((t, k) => (
            <span key={k} className="w-5 h-5 rounded-full bg-white shadow-glass-sm flex items-center justify-center" style={{ marginLeft: k ? -5 : 0 }}><AppIcon seed={t} className="w-2.5 h-2.5" /></span>
          ))}
        </span>
      </span>
    </motion.div>
  )
}

export function AgentsHero({ copy }) {
  const ends = [103, 310, 517]
  return (
    <Row>
      <div className="pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-10 items-center pb-12 md:pb-16" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <h1 className="lg:col-span-7 max-w-[30rem] text-[48px] leading-[1.2] tracking-[-0.15rem] text-ink [text-wrap:balance]">
            {copy.h1[0]}<span className="text-indigo-brand">{copy.h1[1]}</span>{copy.h1[2]}
          </h1>
          <div className="lg:col-span-5 lg:pt-2">
            <p className="max-w-xl text-base md:text-lg leading-[1.6] text-muted">{copy.body}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/" className="btn-primary font-sans !rounded-full">{copy.primary}</Link>
              <Link to="/" className="btn-secondary font-sans !rounded-full">{copy.secondary}</Link>
            </div>
          </div>
        </motion.div>
        <motion.div className="relative overflow-hidden" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}>
          <PGrain palette="sales" />
          <div className="relative px-6 py-14 md:py-20 flex flex-col items-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/80 backdrop-blur-glass shadow-glass pl-4 pr-1.5 py-1.5">
              <span className="text-[12.5px] text-gray-700">{copy.prompt}</span>
              <span className="w-[1.5px] h-3.5 bg-indigo-brand cat-caret -ml-1.5" aria-hidden="true" />
              <span className="w-7 h-7 rounded-full bg-indigo-brand flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_1px_2px_rgba(13,22,47,.2)]">
                <Glyph name="send" className="w-3 h-3" color="#fff" stroke={2} />
              </span>
            </span>
            {/* sm+ */}
            <div className="hidden sm:block w-full max-w-[620px]">
              <svg viewBox="0 0 620 68" preserveAspectRatio="none" className="w-full h-[68px]" fill="none" aria-hidden="true">
                {ends.map((x, i) => {
                  const d = `M310 2 C310 40, ${x} 28, ${x} 66`
                  return (
                    <g key={x}>
                      <path d={d} stroke="rgba(13,22,47,.18)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                      <motion.path d={d} stroke="#6056ff" strokeWidth="1.5" strokeDasharray="3 9" vectorEffect="non-scaling-stroke" className="cat-dash"
                        style={{ animationDelay: `${i * 0.25}s` }}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.25 }} />
                    </g>
                  )
                })}
              </svg>
              <div className="grid grid-cols-3">
                {copy.nodes.map(([n, s, t], i) => <AgentNode key={n} name={n} seed={s} tools={t} i={i} />)}
              </div>
            </div>
            {/* <sm */}
            <div className="sm:hidden flex flex-col items-center">
              <span className="block w-0.5 h-[30px] my-1 cat-dash-v opacity-70" aria-hidden="true" />
              <div className="flex flex-col items-center gap-4">
                {copy.nodes.map(([n, s, t], i) => <AgentNode key={n} name={n} seed={s} tools={t} i={i} mobile />)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* AgentComparison: node canvas                                        */
/* Original is a react-flow graph whose layout/timing was not measurable.
   This is an original design in the site's motion language:
   - starts once >=20% visible; nodes pop in (opacity/scale .85 -> 1, .5s out-quint, staggered),
   - edges draw (pathLength 0 -> 1, .7s out-quint) after their nodes,
   - then every 2.4s the active route advances and an indigo packet travels the edge (.9s out-quint),
     while the 256px detail card cross-fades to that node. Tabs swap the graph. Reduced motion: static. */
/* ------------------------------------------------------------------ */
function useWidth(ref) {
  const [w, setW] = useState(600)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  return w
}

const H = 500
const curve = (a, b) => `M${a[0]} ${a[1]} C${a[0]} ${(a[1] + b[1]) / 2}, ${b[0]} ${(a[1] + b[1]) / 2}, ${b[0]} ${b[1]}`

function layout(kind, w, data) {
  if (kind === 0) {
    const agent = [w * 0.5, 72]
    const cols = [0.2, 0.5, 0.8]
    const tools = data.single.tools.map((t, i) => ({ label: t, p: [w * cols[i % 3], 196 + Math.floor(i / 3) * 62] }))
    return { hub: { p: agent, label: data.single.name, sub: data.single.sub }, nodes: [], tools, edges: tools.map((t, i) => ({ id: 't' + i, d: curve([agent[0], agent[1] + 18], [t.p[0], t.p[1] - 14]), target: i })) }
  }
  const lead = [w * 0.5, 56]
  const xs = [0.2, 0.5, 0.8]
  const nodes = data.team.specialists.map(([n, seed, tools, card], i) => ({ label: n, seed, card, p: [w * xs[i], 170] }))
  const tools = nodes.flatMap((n, i) => n ? data.team.specialists[i][2].map((t, k) => ({ label: t, p: [n.p[0], 262 + k * 40], parent: i, k })) : [])
  const edges = [
    ...nodes.map((n, i) => ({ id: 's' + i, d: curve([lead[0], lead[1] + 22], [n.p[0], n.p[1] - 16]), target: i })),
    ...nodes.map((n, i) => ({ id: 'st' + i, d: `M${n.p[0]} ${n.p[1] + 16} L${n.p[0]} ${262 - 14}`, sub: true })),
  ]
  return { hub: { p: lead, label: data.team.lead[0], sub: data.team.lead[1] }, nodes, tools, edges }
}

const pop = d => ({ initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, ease: outQuint, delay: d } })

function Graph({ kind, w, data, go, active, still }) {
  const g = layout(kind, w, data)
  const live = g.edges.find(e => e.target === active && !e.sub)
  return (
    <motion.div key={kind} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <svg width={w} height={H} className="absolute inset-0" fill="none" aria-hidden="true">
        {g.edges.map((e, i) => (
          <motion.path key={e.id} d={e.d} stroke={!e.sub && e.target === active ? '#6056ff' : 'rgba(13,22,47,.22)'} strokeWidth="1.5" strokeDasharray={e.sub ? '3 4' : undefined}
            initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 0.7, ease: outQuint, delay: 0.35 + i * 0.06 }} style={{ transition: 'stroke .3s' }} />
        ))}
        {go && !still && live && (
          <circle key={`${kind}-${active}`} r="3.5" fill="#6056ff">
            <animateMotion dur="0.9s" fill="freeze" path={live.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.23 1 0.32 1" />
          </circle>
        )}
      </svg>
      {go && (
        <>
          <motion.div className="absolute" style={{ left: g.hub.p[0], top: g.hub.p[1], x: '-50%', y: '-50%' }} {...pop(0)}>
            <div className="scale-125">
              <span className="inline-flex items-center gap-2 bg-gray-900 rounded-full pl-1.5 pr-3 py-1.5 ring-[5px] ring-indigo-500/15 shadow-lg whitespace-nowrap">
                <span className="w-6 h-6 rounded-full bg-indigo-brand flex items-center justify-center"><Glyph name="spark" className="w-3.5 h-3.5" color="#fff" /></span>
                <span className="flex flex-col leading-tight"><span className="text-xs font-semibold text-white">{g.hub.label}</span><span className="text-[11px] text-white/50">{g.hub.sub}</span></span>
              </span>
            </div>
          </motion.div>
          {g.nodes.map((n, i) => (
            <motion.div key={n.label} className="absolute" style={{ left: n.p[0], top: n.p[1], x: '-50%', y: '-50%' }} {...pop(0.2 + i * 0.12)}>
              <span className={`inline-flex items-center gap-2 bg-white rounded-full pl-1.5 pr-3 py-1.5 shadow-[0_0_0_1px_rgba(13,22,47,.08),0_2px_6px_rgba(13,22,47,.06)] text-xs font-medium text-ink whitespace-nowrap transition-shadow duration-300 ${active === i ? '!shadow-[0_0_0_1.5px_#6056ff,0_4px_14px_rgba(96,86,255,.25)]' : ''}`}>
                <Avatar seed={n.seed} size={22} />{n.label}
              </span>
            </motion.div>
          ))}
          {g.tools.map((t, i) => (
            <motion.div key={t.label} className="absolute" style={{ left: t.p[0], top: t.p[1], x: '-50%', y: '-50%' }} {...pop(0.5 + i * 0.05)}>
              <span className={`inline-block font-mono text-xs text-gray-700 bg-white rounded-lg px-2.5 py-1.5 shadow-[0_0_0_1px_rgba(13,22,47,.08)] whitespace-nowrap transition-colors duration-300 ${kind === 0 && active === i ? '!text-indigo-brand' : ''}`}>{t.label}</span>
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}

export function AgentComparison({ copy }) {
  const [tab, setTab] = useState(1)
  const [active, setActive] = useState(0)
  const canvas = useRef(null)
  const w = useWidth(canvas)
  const go = useInView(canvas, { amount: 0.2, once: true })
  const reduced = useReducedMotion()
  const count = tab === 0 ? copy.single.tools.length : copy.team.specialists.length
  useEffect(() => {
    setActive(0)
    if (!go || reduced) return
    const iv = setInterval(() => setActive(a => (a + 1) % count), 2400)
    return () => clearInterval(iv)
  }, [go, tab, count, reduced])
  const spec = tab === 1 ? copy.team.specialists[active] : null
  const card = tab === 1 ? { title: `${spec[0]} agent`, lines: spec[3] } : { title: copy.single.card.title, lines: copy.single.card.lines }
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={copy.title} body={copy.body} className="!mb-12" />
        <div className="hidden md:block relative overflow-hidden">
          <PGrain palette="sales" />
          <div className="relative p-6 md:p-14 lg:p-20">
            <div ref={canvas} className="relative h-[500px] border border-line bg-white dot-grid overflow-hidden">
              <AnimatePresence mode="wait">
                <Graph key={tab} kind={tab} w={w} data={copy} go={go} active={active} still={reduced} />
              </AnimatePresence>
              <motion.div className="absolute left-4 bottom-4 w-64 rounded-xl bg-white shadow-[inset_0_0_0_1px_rgba(13,22,47,.08),0_8px_24px_-8px_rgba(13,22,47,.14)] p-4"
                initial={{ opacity: 0, y: 8 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ ...EASE, delay: 0.9 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={card.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease: outQuint }}>
                    <div className="text-[13px] font-semibold text-ink mb-2">{card.title}</div>
                    {card.lines.map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 text-xs"><span className="text-muted">{k}</span><span className="text-ink font-medium">{v}</span></div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <div className="absolute bottom-4 right-4">
                <PillTabs tabs={copy.tabs} active={tab} onChange={setTab} className="!bg-white/90 backdrop-blur-glass" />
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden relative overflow-hidden">
          <PGrain palette="sales" />
          <div className="relative p-5 flex flex-col gap-4">
            {copy.mobile.map(c => (
              <div key={c.title} className="border border-gray-200 bg-white p-5">
                <div className="text-base font-medium text-ink mb-3">{c.title}</div>
                <ul className="flex flex-col gap-2">
                  {c.items.map(it => <li key={it} className="flex items-center gap-2 text-sm text-muted"><Glyph name="check" className="w-[15px] h-[15px] shrink-0" color="#6056ff" stroke={2} />{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* CompetitorComparison                                                */
/* ------------------------------------------------------------------ */
const CheckDot = () => <span className="w-5 h-5 rounded-full bg-[#ecfdf3] flex items-center justify-center shrink-0"><Glyph name="check" className="w-3 h-3" color="#0e9384" stroke={2} /></span>
const WarnDot = () => <span className="w-5 h-5 rounded-full bg-[#fffbeb] flex items-center justify-center shrink-0"><Glyph name="warn" className="w-3 h-3" color="#d97706" stroke={1.8} /></span>
const Brand = () => <span className="inline-flex items-center gap-1.5 h-[18px]"><LogoMark size={18} /><span className="font-display text-[15px] font-semibold tracking-[-0.03em] text-ink leading-none">lumenfold</span></span>

function Picker({ options, sel, onSel, small }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="w-full flex items-center gap-2 font-sans text-left">
        <Glyph name="layers" className="w-4 h-4 shrink-0" color="#868a97" />
        <span className={`flex-1 ${small ? 'text-xs' : 'text-[13px]'} font-semibold tracking-[-0.01em] text-gray-700`}>{options[sel]}</span>
        <span className={`${small ? 'w-5 h-5' : 'w-6 h-6'} rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-150`}>
          <span className="transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}><Chevron className="w-3.5 h-3.5 text-gray-600" /></span>
        </span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute -left-1 -right-1 sm:left-0 sm:right-0 mt-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden" role="listbox">
            {options.map((o, i) => (
              <button key={o} role="option" aria-selected={i === sel} onClick={() => { onSel(i); setOpen(false) }}
                className={`block w-full text-left font-sans px-4 py-3 text-[13px] font-medium transition-colors duration-150 ${i === sel ? 'text-indigo-brand bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}>{o}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function CompetitorTable({ copy }) {
  const [sel, setSel] = useState(0)
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={<>{copy.title[0]}<span className="text-indigo-brand">{copy.title[1]}</span></>} body={copy.body} className="!mb-12 md:!mb-14" />
        <div className="border border-gray-200 bg-white">
          {/* md+ */}
          <div className="hidden md:grid md:grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1fr] border-b border-gray-200">
            <div className="px-5 py-3.5 border-r border-gray-100" />
            <div className="px-5 py-3.5 border-r border-gray-100 flex items-center"><Brand /></div>
            <div className="px-5 py-3.5"><Picker options={copy.options} sel={sel} onSel={setSel} /></div>
          </div>
          {copy.rows.map(([label, ours, theirs]) => (
            <div key={label} className="hidden md:grid md:grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1fr] border-b border-gray-100 last:border-b-0">
              <div className="px-5 py-4 text-[13px] font-medium text-gray-900 leading-[1.4] border-r border-gray-100">{label}</div>
              <div className="bg-[#fafafe] px-5 py-4 flex gap-3 border-r border-gray-100"><CheckDot /><p className="text-[13px] text-gray-700 leading-[1.55]">{ours}</p></div>
              <motion.div key={sel} className="px-5 py-4 flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}><WarnDot /><p className="text-[13px] text-gray-500 leading-[1.55]">{theirs[sel]}</p></motion.div>
            </div>
          ))}
          {/* <md */}
          <div className="md:hidden grid grid-cols-2 border-b border-gray-200">
            <div className="px-4 py-2.5 border-r border-gray-100 flex items-center"><span className="scale-90 origin-left"><Brand /></span></div>
            <div className="px-4 py-2.5"><Picker options={copy.options} sel={sel} onSel={setSel} small /></div>
          </div>
          {copy.rows.map(([label, ours, theirs]) => (
            <div key={'m' + label} className="md:hidden border-b border-gray-100 last:border-b-0">
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-gray-400">{label}</div>
              <div className="grid grid-cols-2">
                <div className="bg-[#fafafe] px-4 py-3 flex flex-col gap-2 border-r border-gray-100"><CheckDot /><p className="text-xs leading-[1.5] text-gray-700">{ours}</p></div>
                <motion.div key={sel} className="px-4 py-3 flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}><WarnDot /><p className="text-xs leading-[1.5] text-gray-500">{theirs[sel]}</p></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* TasksCTA: 4-phase scripted checklist                                */
/* ------------------------------------------------------------------ */
const h2cls = 'text-[30px] md:text-[36px] lg:text-[48px] leading-[1.25] lg:leading-normal tracking-[-0.025em] text-ink text-center max-w-3xl'

export function TasksCTA({ copy }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const [phase, setPhase] = useState('idle')
  const n = copy.items.length
  useEffect(() => {
    if (!inView) return
    setPhase('initial')
    const ts = [setTimeout(() => setPhase('tasks'), 2000), setTimeout(() => setPhase('checking'), 3500), setTimeout(() => setPhase('final'), 3500 + n * 40 + 500)]
    return () => ts.forEach(clearTimeout)
  }, [inView, n])
  const showGrid = phase === 'tasks' || phase === 'checking' || phase === 'final'
  const checking = phase === 'checking' || phase === 'final'
  return (
    <Row innerClassName="min-h-[500px] flex items-center justify-center overflow-hidden">
      <div ref={ref} className="absolute inset-0" aria-hidden="true" />
      <motion.div className="absolute inset-0 p-8 flex items-center justify-center pointer-events-none" aria-hidden={!showGrid}
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={phase === 'final' ? { opacity: 0.3, filter: 'blur(12px)' } : showGrid ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }}
        transition={{ duration: 0.8 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 max-w-4xl">
          {copy.items.map((t, i) => (
            <motion.div key={t} className={`items-center gap-2.5 ${i >= 16 ? 'hidden lg:flex' : i >= 8 ? 'hidden sm:flex' : 'flex'}`}
              initial={{ opacity: 0 }} animate={{ opacity: showGrid ? 1 : 0 }} transition={{ duration: 0.4, delay: showGrid && phase === 'tasks' ? i * 0.02 : 0 }}>
              <motion.span className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                initial={false}
                animate={checking ? { backgroundColor: '#6056ff', borderColor: '#6056ff', scale: [1, 1.2, 1] } : { backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(134,138,151,.4)', scale: 1 }}
                transition={{ duration: 0.2, delay: checking ? i * 0.04 : 0 }}>
                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><motion.path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: checking ? 1 : 0 }} transition={{ duration: 0.2, delay: checking ? i * 0.04 : 0 }} /></svg>
              </motion.span>
              <span className="text-sm text-muted whitespace-nowrap transition-[text-decoration-color] duration-200"
                style={{ textDecoration: 'line-through', textDecorationColor: checking ? 'rgba(134,138,151,.5)' : 'transparent', transitionDelay: checking ? `${i * 40}ms` : '0ms' }}>{t}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="relative px-6 py-16 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {(phase === 'idle' || phase === 'initial') && (
            <motion.h2 key="first" className={h2cls} initial={{ opacity: 0, y: 20 }} animate={phase === 'initial' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.6 }}>{copy.first}</motion.h2>
          )}
          {phase === 'final' && (
            <motion.div key="final" className="flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h2 className={`${h2cls} mb-8`}>{copy.final}</h2>
              <Link to="/" className="btn-primary font-sans text-lg px-8 py-4">{copy.cta}</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Row>
  )
}
