// /gtm sections: A.9 GTMHero + StatementBand, A.10 PlatformFraming, A.11 ValueProp + UseCasePair,
// A.12 TabbedCanvasDemo + EvalsDemo, A.13 TasksCTA.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE, Row, AppIcon } from '../ui'
import { Btn, Rich, pad, logoPad } from './lib'
import { FlowCanvas } from './flow'

const OUT = [0.23, 1, 0.32, 1]

/* ---------- A.9 rotating word ---------- */
function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  const [widths, setWidths] = useState([])
  const meas = useRef([])
  const reduce = useReducedMotion()
  useLayoutEffect(() => { setWidths(meas.current.map(el => el?.offsetWidth || 0)) }, [words])
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI(v => (v + 1) % words.length), 2500)
    return () => clearInterval(t)
  }, [words, reduce])
  const word = 'underline decoration-2 decoration-indigo-brand underline-offset-4 whitespace-nowrap'
  return (
    <span className="relative inline-block align-bottom overflow-hidden text-left" style={{ height: '1.4em', width: widths[i] || 'auto', transition: 'width .4s cubic-bezier(.23,1,.32,1)' }}>
      <span aria-hidden="true" className="absolute invisible left-0 top-0">
        {words.map((w, k) => <span key={w} ref={el => (meas.current[k] = el)} className={`absolute ${word}`}>{w}</span>)}
      </span>
      <AnimatePresence initial={false}>
        <motion.span key={i} className={`absolute left-0 top-0 leading-[1.4em] ${word}`}
          initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.4, ease: OUT }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ToolCard({ c, i }) {
  return (
    <motion.div className="w-[100px] shrink-0 bg-white border border-line rounded-lg p-2.5 shadow-[0_1px_4px_rgba(0,0,0,.03)] text-left"
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 + i * 0.04, ease: OUT }}>
      <span className="block w-4 h-4 rounded overflow-hidden mb-2"><AppIcon seed={c.seed} className="w-4 h-4" /></span>
      <p className="text-[10px] font-medium text-ink leading-tight truncate">{c.name}</p>
      <p className="text-[8px] text-[#b6b9c0] leading-tight truncate">{c.sub}</p>
    </motion.div>
  )
}
const fan = [
  [{ transform: 'rotate(-2.5deg) translate(-12px, 6px)', transformOrigin: 'right center' }, { transform: 'rotate(2.5deg) translate(12px, 6px)', transformOrigin: 'left center' }],
  [{ transform: 'rotate(-2deg) translate(-10px, 8px)', transformOrigin: 'right center' }, { transform: 'rotate(2deg) translate(10px, 8px)', transformOrigin: 'left center' }],
]

export function GTMHero({ eyebrow, words, h1, cards }) {
  return (
    <Row>
      <div className={`py-8 md:py-12 overflow-hidden ${logoPad}`}>
        <motion.div className="text-center max-w-5xl mx-auto pt-8 md:pt-12 pb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <p className="font-medium text-xl md:text-2xl text-ink mb-3">{eyebrow} <RotatingWord words={words} /></p>
          <h1 className="font-medium text-[2.25rem] md:text-5xl lg:text-[3.2rem] leading-[1.15] tracking-[-0.025em] text-indigo-brand">{h1}</h1>
        </motion.div>
        <div className="hidden lg:block pb-6 relative">
          <div className="py-4 flex flex-col gap-3 items-center" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 15%, black 85%, transparent)' }}>
            {[0, 1].map(r => (
              <div key={r} className="flex items-center">
                <div className="flex gap-2" style={fan[r][0]}>{cards.slice(r * 6, r * 6 + 3).map((c, k) => <ToolCard key={c.name} c={c} i={r * 6 + k} />)}</div>
                <div className="w-10 shrink-0" />
                <div className="flex gap-2" style={fan[r][1]}>{cards.slice(r * 6 + 3, r * 6 + 6).map((c, k) => <ToolCard key={c.name} c={c} i={r * 6 + 3 + k} />)}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </Row>
  )
}

export function StatementBand({ text }) {
  return (
    <Row>
      <div className="flex flex-col items-center px-6">
        <span className="w-px h-16 md:h-20 bg-gradient-to-b from-transparent to-line" />
        <motion.p className="py-4 max-w-[36ch] text-center text-lg md:text-xl text-muted" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}>{text}</motion.p>
        <span className="w-px h-16 md:h-20 bg-gradient-to-b from-line to-transparent" />
      </div>
    </Row>
  )
}

/* ---------- A.10 PlatformFraming ---------- */
export function PlatformFraming({ title, labels, bubbles }) {
  return (
    <Row>
      <div className={`overflow-hidden ${logoPad}`}>
        <div className="relative py-16 md:py-24 lg:py-32 mb-16 min-h-[480px] -mx-6 md:-mx-20 desktop:-mx-14 px-6 md:px-20 desktop:px-14 flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(96,86,255,.04), transparent 70%)' }}>
          <motion.svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }}>
            <defs>
              <radialGradient id="pfline" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#6056ff" stopOpacity=".05" /><stop offset=".6" stopColor="#6056ff" stopOpacity=".22" /><stop offset="1" stopColor="#6056ff" stopOpacity=".05" /></radialGradient>
            </defs>
            {bubbles.map(b => <line key={b.name} x1="50" y1="50" x2={b.x} y2={b.y} stroke="url(#pfline)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 4" />)}
          </motion.svg>
          {bubbles.map((b, i) => (
            <motion.div key={b.name} className="hidden lg:flex absolute flex-col items-center gap-2" style={{ left: `${b.x}%`, top: `${b.y}%`, x: '-50%', y: '-50%' }}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: b.delay + 0.3, ease: OUT }}>
              <motion.div className="flex flex-col items-center gap-2" animate={{ y: [0, -8, 0] }} transition={{ duration: b.float, ease: 'easeInOut', repeat: Infinity, delay: i * 0.4 }}>
                <motion.span className="rounded-full bg-white border border-line flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,.04),0_0_0_1px_rgba(0,0,0,.02)] hover:shadow-md transition-shadow"
                  style={{ width: b.s, height: b.s }} whileHover={{ scale: 1.08 }} transition={{ duration: 0.25 }}>
                  <span style={{ width: b.s * 0.6, height: b.s * 0.6 }}><AppIcon seed={b.seed} className="w-full h-full" /></span>
                </motion.span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-line shadow-sm whitespace-nowrap">
                  <span className="text-[11px] font-medium text-ink">{b.name}</span>
                  <span className="w-px h-3 bg-line" />
                  <span className="text-[10px] font-semibold text-indigo-dark">{b.stat}</span>
                </span>
              </motion.div>
            </motion.div>
          ))}
          <motion.div className="relative max-w-[680px] text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: OUT }}>
            <h2 className="font-medium text-[30px] md:text-[36px] leading-[1.3] tracking-[-0.025em] text-ink max-w-lg mx-auto"><Rich parts={title} /></h2>
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {labels.map(l => <span key={l} className="glass-pill !py-1.5 !text-[12px]">{l}</span>)}
            </div>
          </motion.div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.11 ValuePropHeading + UseCasePair ---------- */
export function ValuePropHeading({ text }) {
  return (
    <Row innerClassName="border-b border-line">
      <div className="pt-16 md:pt-24 lg:pt-32 pb-10 md:pb-12 lg:pb-14 px-8 lg:px-20">
        <motion.h3 className="max-w-3xl text-2xl md:text-[30px] leading-[1.25] md:leading-[1.625] tracking-[-0.025em] text-ink"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}>{text}</motion.h3>
      </div>
    </Row>
  )
}
function Sticker({ seed }) {
  const c = ['#6056ff', '#f472b6', '#0e9384', '#f59e0b'][seed % 4]
  return (
    <svg viewBox="0 0 128 128" className="w-32 h-32" aria-hidden="true">
      <path d="M64 6l14 22 25-6-4 25 22 14-22 14 4 25-25-6-14 22-14-22-25 6 4-25L7 61l22-14-4-25 25 6z" fill="#fff" stroke="#e6e7ea" />
      <path d="M64 18l11 17 20-4-3 20 17 11-17 11 3 20-20-4-11 17-11-17-20 4 3-20-17-11 17-11-3-20 20 4z" fill={c} fillOpacity=".14" />
      <path d="M50 64l10 10 20-22" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
const CheckRow = ({ t }) => (
  <li className="flex items-center gap-2.5">
    <span className="w-5 h-5 rounded-full bg-indigo-brand/10 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M2.5 6.2l2.3 2.3L9.5 3.8" stroke="#6056ff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
    <span className="text-base text-ink">{t}</span>
  </li>
)
export function UseCasePair({ cells }) {
  return (
    <Row innerClassName="border-b border-line">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {cells.map((c, i) => (
          <motion.div key={c.title} className={`group p-8 lg:py-16 lg:px-20 ${i === 0 ? 'border-b md:border-b-0 md:border-r border-line' : ''}`}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ ...EASE, delay: i * 0.05 }}>
            <div className="mb-6 relative w-fit flex gap-3 mt-12">
              {c.images.map(src => <img key={src} src={src} alt="" className="w-32 h-32 aspect-square object-cover rounded-md" loading="lazy" />)}
              <span className="absolute -top-12 -right-14 rotate-12 group-hover:rotate-[20deg] transition-transform duration-300"><Sticker seed={c.sticker} /></span>
            </div>
            <h3 className="font-medium text-2xl md:text-[30px] leading-[1.3] tracking-[-0.025em] text-ink mb-3">{c.title}</h3>
            <p className="text-base leading-relaxed text-muted mb-5">{c.body}</p>
            <ul className="space-y-2.5">{c.checks.map(t => <CheckRow key={t} t={t} />)}</ul>
          </motion.div>
        ))}
      </div>
    </Row>
  )
}

/* ---------- A.12 shared shell ---------- */
function DemoRow({ title, body, children }) {
  return (
    <Row innerClassName="bg-gradient-to-br from-white via-white to-indigo-50/30">
      <div className={`py-20 md:py-32 ${pad}`}>
        <motion.div className="max-w-2xl mx-auto mb-10 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}>
          <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink"><Rich parts={title} /></h2>
          {body && <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{body}</p>}
        </motion.div>
        {children}
      </div>
    </Row>
  )
}

export function PlaybookDemo({ title, body, tabs }) {
  const [tab, setTab] = useState(0)
  const [st, setSt] = useState({ step: -1, total: 1 })
  const t = tabs[tab]
  const finished = st.step >= st.total
  const status = st.step < 0 ? 'Waiting for the next trigger…' : finished ? t.doneText : t.status[Math.min(st.step, t.status.length - 1)]
  return (
    <DemoRow title={title} body={body}>
      <div className="max-w-5xl mx-auto rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div role="tablist" className="flex border-b border-line overflow-x-auto pr-no-scrollbar">
          {tabs.map((x, i) => (
            <button key={x.label} role="tab" aria-selected={i === tab} onClick={() => setTab(i)}
              className={`font-sans relative shrink-0 px-5 py-3 text-sm font-medium transition-colors duration-150 ${i === tab ? 'text-indigo-brand' : 'text-muted hover:text-ink'}`}>
              {x.label}
              {i === tab && <motion.span layoutId="pb-bar" className="absolute left-0 right-0 bottom-0 h-0.5 bg-indigo-brand" transition={{ duration: 0.3, ease: OUT }} />}
            </button>
          ))}
        </div>
        <div className="relative">
          <FlowCanvas graph={t.graph} height={500} onStep={(step, total) => setSt({ step, total })} />
          <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm border-t border-line px-4 py-2.5 flex items-center gap-3">
            {finished ? <span className="w-3.5 h-3.5 rounded-full bg-[#22c55e]" /> : <span className="workforce-spin shrink-0" />}
            <span className="text-xs text-gray-600 truncate min-w-0 flex-1">{status}</span>
            {finished && <span className={`font-mono text-xs font-semibold ${t.score >= 90 ? 'text-[#22c55e]' : 'text-indigo-brand'}`}>{t.score}/100</span>}
          </div>
        </div>
      </div>
    </DemoRow>
  )
}

/* Evals dashboard demo. Timings are our own (spec: bar height .4s [.25,.1,.25,1], dots spring 400/15). */
export function EvalsDemo({ title, body, suite }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const seen = useInView(ref, { amount: 0.3, once: true })
  const [k, setK] = useState(-1) // index of active test; tests.length = finished
  const n = suite.tests.length
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setK(v => (v >= n ? -1 : v + 1)), k < 0 ? 600 : k >= n ? 3600 : 750)
    return () => clearTimeout(t)
  }, [k, inView, n])
  const done = suite.tests.slice(0, Math.max(0, k))
  const avg = done.length ? done.reduce((a, b) => a + b.score, 0) / done.length : 0
  const fin = k >= n
  const bars = [...suite.history, fin ? Math.round(avg) : 0]
  return (
    <DemoRow title={title} body={body}>
      <div ref={ref} className="max-w-5xl mx-auto rounded-lg border border-gray-200 bg-white flex overflow-hidden font-sans">
        <div className="hidden lg:flex flex-col w-[420px] shrink-0 border-r border-line p-6">
          <p className="text-[13px] font-semibold text-gray-900">{suite.title}</p>
          <p className="text-[11px] text-gray-400">{suite.meta}</p>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-[28px] font-bold tracking-[-0.02em] text-ink tabular-nums">{avg ? avg.toFixed(1) : '--'}</span>
            <motion.span className="text-xs font-medium text-[#22c55e]" animate={{ opacity: fin ? 1 : 0 }} transition={{ duration: 0.3 }}>{suite.delta}</motion.span>
          </div>
          <div className="relative mt-auto pt-8">
            <div className="relative h-[150px] flex items-end gap-2">
              <span className="absolute inset-x-0 border-t border-dashed border-gray-300" style={{ bottom: `${suite.threshold}%` }} />
              <span className="absolute right-0 text-[9px] text-gray-400 -translate-y-full" style={{ bottom: `${suite.threshold}%` }}>pass {suite.threshold}</span>
              {bars.map((h, i) => {
                const last = i === bars.length - 1
                return (
                  <div key={i} className="flex-1 h-full flex items-end">
                    <motion.span className="w-full rounded-t-sm" style={{ background: last ? (h ? '#6056ff' : '#e5e7eb') : '#c7d2fe' }}
                      initial={{ height: 0 }} animate={{ height: seen ? `${last && !h ? 8 : h}%` : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: last ? 0 : i * 0.04 }} />
                  </div>
                )
              })}
            </div>
            <div className="mt-1.5 flex gap-2">{bars.map((_, i) => <span key={i} className="flex-1 text-center text-[9px] text-gray-400">{suite.runLabel}{suite.firstRun + i}</span>)}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5"><AppIcon seed={suite.seed} className="w-5 h-5" /><span className="text-[13px] font-semibold text-gray-900">{suite.listTitle}</span>
            <span className="ml-auto text-[11px] text-gray-400 tabular-nums">{Math.max(0, Math.min(k, n))}/{n}</span></div>
          {suite.tests.map((t, i) => {
            const pending = i > k && !fin, active = i === k
            const isDone = i < k || fin
            return (
              <div key={t.name} className="px-5 py-4 flex items-center gap-3 border-b border-gray-50 last:border-0"
                style={{ opacity: pending ? 0.35 : 1, background: active ? '#f5f3ff' : 'transparent', transition: 'opacity .3s, background .2s' }}>
                <span className="w-3 h-3 flex items-center justify-center shrink-0">
                  {active ? <span className="workforce-spin-12" /> : isDone ? (
                    <motion.span key={'d' + k} className="w-2.5 h-2.5 rounded-full" style={{ background: t.score >= suite.threshold ? '#22c55e' : '#eab308' }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} />
                  ) : <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />}
                </span>
                <span className="text-[13px] text-ink truncate min-w-0 flex-1">{t.name}</span>
                <span className="font-mono text-[13px] font-semibold text-ink tabular-nums">{isDone ? t.score : '--'}</span>
              </div>
            )
          })}
        </div>
      </div>
    </DemoRow>
  )
}

/* ---------- A.13 TasksCTA (4-phase script, PAGES_CATALOG T4 timings) ---------- */
export function TasksCTA({ first, final, button, tasks }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState('initial')
  useEffect(() => {
    if (!inView) return
    if (reduce) { setPhase('final'); return }
    const ts = [setTimeout(() => setPhase('tasks'), 2000), setTimeout(() => setPhase('checking'), 3500), setTimeout(() => setPhase('final'), 3500 + tasks.length * 40 + 500)]
    return () => ts.forEach(clearTimeout)
  }, [inView])
  const checked = phase === 'checking' || phase === 'final'
  return (
    <Row>
      <div ref={ref} className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {phase !== 'initial' && (
            <motion.div key="grid" className="absolute inset-0 p-8 flex items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(20px)' }} animate={phase === 'final' ? { opacity: 0.3, filter: 'blur(12px)' } : { opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8 }}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 max-w-4xl">
                {tasks.map((t, i) => (
                  <motion.li key={t} className={`items-center gap-2.5 ${i >= 16 ? 'hidden lg:flex' : i >= 8 ? 'hidden sm:flex' : 'flex'}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                    <motion.span className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                      animate={checked ? { backgroundColor: '#6056ff', borderColor: '#6056ff', scale: [1, 1.2, 1] } : { backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(134,138,151,.4)', scale: 1 }}
                      transition={{ duration: 0.2, delay: checked ? i * 0.04 : 0 }}>
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5"><motion.path d="M2.5 6.2l2.3 2.3L9.5 3.8" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: checked ? 1 : 0 }} transition={{ duration: 0.2, delay: checked ? i * 0.04 : 0 }} /></svg>
                    </motion.span>
                    <span className={`text-sm text-muted whitespace-nowrap transition-all duration-200 ${checked ? 'line-through decoration-muted/50' : ''}`} style={{ transitionDelay: checked ? `${i * 40}ms` : '0ms' }}>{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {phase === 'initial' && (
            <motion.h2 key="h1" className="relative px-6 max-w-3xl text-center text-[30px] md:text-[36px] lg:text-[48px] leading-[1.35] lg:leading-normal tracking-[-0.025em] text-ink"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.6 }}>{first}</motion.h2>
          )}
          {phase === 'final' && (
            <motion.div key="h2" className="relative px-6 flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h2 className="max-w-3xl mb-8 text-[30px] md:text-[36px] lg:text-[48px] leading-[1.35] lg:leading-normal tracking-[-0.025em] text-ink">{final}</h2>
              <Btn to={button.to} round={false} className="!text-lg !px-8 !py-4">{button.label}</Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Row>
  )
}
