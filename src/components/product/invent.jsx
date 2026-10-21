// /invent sections: A.14 InventHero + step strip, A.15 InlineVideo, A.16 Signals / Evals / Embed / GetStarted, A.17 StackCollapse.
// Canvas scripts (Signals, EvalsFloor, Embed) are our own designs; the spec could not capture their timing.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE, Row, Avatar, AppIcon } from '../ui'
import { Btn, GrainPanel, PageHeading, Mascot, halo, ScaleBox, VideoPoster, LineIcon, pad, stacked } from './lib'

const OUT = [0.23, 1, 0.32, 1]

/* ---------- A.14 hero ---------- */
const clouds = [
  { left: '-6%', top: 40, w: 520, h: 120, drift: 40, dur: 62, o: 0.9 },
  { left: '58%', top: 10, w: 640, h: 150, drift: -50, dur: 74, o: 0.8 },
  { left: '18%', top: 260, w: 380, h: 90, drift: 30, dur: 55, o: 0.65 },
  { left: '70%', top: 330, w: 480, h: 110, drift: -35, dur: 68, o: 0.75 },
  { left: '-10%', top: 470, w: 700, h: 170, drift: 60, dur: 80, o: 1 },
  { left: '44%', top: 560, w: 560, h: 130, drift: -25, dur: 58, o: 0.7 },
  { left: '80%', top: 640, w: 280, h: 70, drift: 45, dur: 66, o: 0.85 },
]
function Cloud({ c }) {
  return (
    <div className="invent-cloud-drift absolute" style={{ left: c.left, top: c.top, width: c.w, height: c.h, opacity: c.o, '--drift': `${c.drift}px`, animationDuration: `${c.dur}s` }}>
      <span className="absolute rounded-full bg-white" style={{ left: 0, top: '30%', width: '55%', height: '70%', filter: 'blur(14px)' }} />
      <span className="absolute rounded-full bg-white" style={{ left: '25%', top: 0, width: '50%', height: '100%', filter: 'blur(14px)' }} />
      <span className="absolute rounded-full bg-white" style={{ right: 0, top: '25%', width: '50%', height: '75%', filter: 'blur(14px)' }} />
    </div>
  )
}
const pillShadows = ['0 10px 22px rgba(96,165,250,.24)', '0 10px 22px rgba(148,59,255,.2)', '0 10px 22px rgba(96,86,255,.22)']
const pillPos = [{ right: 'calc(50% + 120px)', top: 20 }, { left: 'calc(50% + 110px)', top: 20 }, { left: 'calc(50% + 130px)', top: 100 }]
const pillDelay = ['0s', '-1.3s', '-2.6s']

export function InventHero({ h1, lines, ctas, bubbles, steps }) {
  return (
    <>
      <Row innerClassName="overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-full lg:h-[820px] pointer-events-none overflow-hidden" aria-hidden="true"
          style={{ background: 'radial-gradient(60% 55% at 50% 30%, #fff 0%, rgba(255,255,255,0) 100%), linear-gradient(180deg, #e9ecff 0%, #f3f1ff 45%, #fff 100%)' }}>
          {clouds.map((c, i) => <Cloud key={i} c={c} />)}
        </div>
        <div className={`relative py-10 md:py-20 ${pad} flex flex-col items-center text-center`}>
          <div className="relative mt-6">
            <motion.div className="relative" initial={{ opacity: 0, scale: 0.55 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 16 }}>
              <span className="absolute -inset-[109px] rounded-full pointer-events-none" style={{ background: halo }} />
              <Mascot size={128} className="relative" />
            </motion.div>
            {bubbles.map((b, i) => (
              <motion.div key={b} className="hidden lg:block absolute w-max" style={pillPos[i]}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 14, scale: 0.9 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }} transition={{ ...EASE, duration: 0.7, delay: 0.4 + i * 0.25 }}>
                <div className="invent-cloud-bob relative rounded-full bg-white px-6 py-3 text-[15px] font-medium text-ink" style={{ boxShadow: pillShadows[i], animationDelay: pillDelay[i] }}>
                  {b}
                  <svg viewBox="0 0 14 10" className={`absolute -bottom-[7px] w-3.5 h-2.5 ${i === 0 ? 'right-8' : 'left-8'}`} aria-hidden="true"><path d={i === 0 ? 'M0 0h14L12 10z' : 'M0 0h14L2 10z'} fill="#fff" /></svg>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.h1 className="max-w-3xl mt-8 text-[48px] leading-[1.25] tracking-[-0.18rem] text-ink" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.1 }}>{h1}</motion.h1>
          <motion.p className="mt-6 max-w-2xl text-base md:text-lg leading-[1.6] text-muted [text-wrap:balance]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.16 }}>
            {lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <><br className="hidden md:inline" /> </>}</span>)}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.22 }}>
            <Btn to={ctas[0].to}>{ctas[0].label}</Btn>
            <Btn to={ctas[1].to} kind="secondary" className="!bg-white">{ctas[1].label}</Btn>
          </motion.div>
        </div>
      </Row>
      <Row>
        <div>{steps.map((s, i) => <StepCell key={i} s={s} n={i + 1} />)}</div>
      </Row>
    </>
  )
}

/* Step cell stage cards */
const glass = 'rounded-xl border border-white/60 bg-white/70 px-4 py-3 backdrop-blur-glass shadow-glass text-left'
function StageCards({ s }) {
  if (s.kind === 'chat') return (
    <div className="flex flex-col gap-2 w-full">
      {s.items.map((m, i) => (
        <div key={i} className={`${glass} max-w-[380px] ${m.me ? 'self-end !bg-indigo-brand !text-white !border-indigo-brand' : 'self-start'} text-[13px] leading-snug flex items-start gap-2`}>
          {!m.me && <Mascot size={20} className="shrink-0 mt-px" />}{m.t}
        </div>
      ))}
    </div>
  )
  if (s.kind === 'form') return (
    <div className={`${glass} w-full grid grid-cols-2 gap-x-4 gap-y-2.5`}>
      {s.items.map(([k, v]) => (
        <div key={k} className="min-w-0"><p className="text-[10.5px] text-muted">{k}</p><p className="mt-0.5 rounded-md border border-line bg-white px-2 py-1 text-[12px] text-ink truncate">{v}</p></div>
      ))}
    </div>
  )
  if (s.kind === 'diff') return (
    <div className={`${glass} w-full flex flex-col gap-1.5 font-mono text-[11.5px]`}>
      {s.items.map(([t, v]) => (
        <span key={v} className="rounded-md px-2.5 py-1" style={t === '-' ? { background: 'rgba(254,243,242,.7)', color: 'rgba(180,35,24,.75)' } : { background: 'rgba(236,253,243,.9)', color: '#027a48' }}>{t} {v}</span>
      ))}
    </div>
  )
  if (s.kind === 'integrations') return (
    <div className="w-full flex flex-col gap-2">
      {s.items.map(([seed, name, state]) => (
        <div key={name} className={`${glass} flex items-center gap-3 !py-2.5`}>
          <AppIcon seed={seed} className="w-6 h-6" /><span className="text-[13px] font-medium text-ink">{name}</span>
          <span className="ml-auto text-[11px] font-medium text-status-green bg-[#ecfdf3] rounded-full px-2 py-0.5">{state}</span>
        </div>
      ))}
    </div>
  )
  // 'tags': a row of glass pills
  return (
    <div className="w-full flex flex-wrap justify-center gap-2">
      {s.items.map((t, i) => <span key={t} className="glass-pill"><Avatar seed={i + 3} size={18} />{t}</span>)}
    </div>
  )
}
function StepCell({ s, n }) {
  const v = { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 } }
  return (
    <motion.div className="px-8 py-12 border-b border-line last:border-b-0 flex flex-col items-center" {...v} transition={EASE}>
      <div className="relative min-h-28 w-full flex items-center justify-center">
        <motion.span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[240px] max-w-full pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(closest-side, rgba(96,86,255,.09), transparent), radial-gradient(closest-side, rgba(148,59,255,.05), transparent)', filter: 'blur(28px)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...EASE, delay: 0.1 }} />
        <motion.div className="relative w-full" initial={{ opacity: 0, y: 10, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...EASE, delay: 0.2 }}>
          <ScaleBox width={546} height={s.h || 120}><div className="w-[546px] h-full flex items-center"><StageCards s={s} /></div></ScaleBox>
        </motion.div>
      </div>
      <motion.p className="mt-6 flex items-center gap-2 text-xs font-medium text-muted" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...EASE, delay: 0.3 }}>
        <motion.span className="w-1.5 h-1.5 rounded-full bg-status-green" animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
        Step {n} · {s.status}
      </motion.p>
      <motion.p className="mt-1.5 text-[15px] font-medium text-ink text-center" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ ...EASE, delay: 0.58 }}>{s.caption}</motion.p>
    </motion.div>
  )
}

/* ---------- A.15 InlineVideo ---------- */
export function InlineVideo({ title, body, poster }) {
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={title} body={body} />
        <VideoPoster src={poster} title={title} disc="ring" overlay={false} className="aspect-video w-full border border-line bg-ink" />
      </div>
    </Row>
  )
}

/* ---------- A.16 Signals / Evals frames ---------- */
function MascotBadge() {
  return (
    <span className="absolute right-6 md:right-10 -top-[30px] z-10 w-[60px] h-[60px] rounded-2xl bg-white border border-line shadow-glass flex items-center justify-center">
      <Mascot size={40} />
    </span>
  )
}
function DemoFrame({ title, body, children }) {
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={title} body={body} />
        <motion.div className="relative" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={EASE}>
          <MascotBadge />
          <div className="relative overflow-hidden border border-gray-200 bg-white h-[380px] md:h-[500px]">{children}</div>
        </motion.div>
      </div>
    </Row>
  )
}

function useTicker(ref, ms) {
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setTick(v => v + 1), ms)
    return () => clearInterval(t)
  }, [inView, reduce, ms])
  return tick
}

export function SignalsDemo({ title, body, signals, agents }) {
  const ref = useRef(null)
  const tick = useTicker(ref, 1600)
  const shown = Array.from({ length: Math.min(4, tick + 1) }, (_, k) => tick - k).map(i => ({ i, ...signals[i % signals.length] }))
  const current = shown[0]
  const counts = agents.map((_, a) => Array.from({ length: tick + 1 }, (_, i) => signals[i % signals.length].to).filter(x => x === a).length)
  return (
    <DemoFrame title={title} body={body}>
      <div ref={ref} className="absolute inset-0 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute inset-0 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_1fr] items-center gap-4 p-4 md:p-10 font-sans">
        <div className="relative flex flex-col gap-2.5 min-w-0">
          <p className="text-[11px] text-muted mb-1">Incoming signals</p>
          <AnimatePresence initial={false}>
            {shown.map((s, k) => (
              <motion.div key={s.i} layout className={`flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 shadow-sm ${k === 0 ? 'border-indigo-brand/45' : 'border-line'}`}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: k === 0 ? 1 : 0.55 - k * 0.1, x: 0 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, ease: OUT }}>
                <AppIcon seed={s.seed} className="w-5 h-5" />
                <span className="text-[12.5px] text-ink truncate">{s.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <svg viewBox="0 0 120 300" className="hidden md:block w-[120px] h-[300px]" aria-hidden="true">
          {agents.map((_, a) => {
            const y = 60 + a * 90, on = current && current.to === a
            return <path key={a} d={`M0 150 C 60 150, 60 ${y}, 120 ${y}`} fill="none" stroke={on ? '#6056ff' : '#e5e7eb'} strokeWidth={on ? 2 : 1.4} strokeDasharray={on ? '6 4' : undefined} style={{ transition: 'stroke .3s' }}>
              {on && <animate attributeName="stroke-dashoffset" from="20" to="0" dur=".6s" repeatCount="indefinite" />}
            </path>
          })}
        </svg>
        <div className="flex flex-col gap-4">
          {agents.map((a, k) => {
            const on = current && current.to === k
            return (
              <div key={a.name} className={`flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 transition-all duration-300 ${on ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.12)]' : 'border-gray-200'}`}>
                <Avatar seed={a.avatar} size={28} rounded="rounded-[6px]" />
                <span className="min-w-0 hidden sm:block"><span className="block text-[13px] font-medium text-ink truncate">{a.name}</span><span className="block text-[11px] text-muted truncate">{a.role}</span></span>
                <span className="ml-auto text-[11px] font-semibold text-indigo-brand tabular-nums">{counts[k]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </DemoFrame>
  )
}

export function EvalsFloor({ title, body, scenarios }) {
  const ref = useRef(null)
  const tick = useTicker(ref, 260)
  const n = scenarios.length
  const cycle = n + 10
  const t = tick % cycle
  const pass = scenarios.slice(0, Math.min(t, n)).filter(s => s.ok).length
  const ran = Math.min(t, n)
  return (
    <DemoFrame title={title} body={body}>
      <div ref={ref} className="absolute inset-0 flex flex-col p-4 md:p-8 font-sans">
        <div className="flex items-center gap-4 pb-4 border-b border-line">
          <div><p className="text-[11px] text-muted">Scenarios run</p><p className="text-xl font-semibold text-ink tabular-nums">{ran}/{n}</p></div>
          <div><p className="text-[11px] text-muted">Passing</p><p className="text-xl font-semibold text-status-green tabular-nums">{ran ? Math.round((pass / ran) * 100) : 0}%</p></div>
          <div className="ml-auto hidden sm:flex items-center gap-3 text-[11px] text-muted">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22c55e]" />Pass</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#eab308]" />Review</span>
          </div>
        </div>
        <div className="flex-1 mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 content-start overflow-hidden">
          {scenarios.map((s, i) => {
            const state = i < t ? (s.ok ? 'pass' : 'warn') : i === t ? 'run' : 'idle'
            return (
              <div key={s.name} className="rounded-lg border px-2.5 py-2 transition-all duration-300 min-w-0"
                style={{ borderColor: state === 'run' ? '#6056ff' : '#e6e7ea', background: state === 'run' ? '#f5f3ff' : '#fff', opacity: state === 'idle' ? 0.45 : 1 }}>
                <div className="flex items-center gap-1.5">
                  {state === 'run' ? <span className="workforce-spin-12" /> : <span className="w-2 h-2 rounded-full" style={{ background: state === 'pass' ? '#22c55e' : state === 'warn' ? '#eab308' : '#e5e7eb' }} />}
                  <span className="text-[10px] text-muted tabular-nums">#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 text-[11px] text-ink leading-tight truncate">{s.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </DemoFrame>
  )
}

/* ---------- A.16 Embed ---------- */
export function EmbedDemo({ title, body, channels, pool }) {
  const [items, setItems] = useState(channels)
  const [poolIdx, setPoolIdx] = useState(0)
  const toggle = name => setItems(xs => xs.map(x => (x.name === name ? { ...x, linked: !x.linked } : x)))
  const remove = name => setItems(xs => xs.filter(x => x.name !== name))
  const add = () => { const p = pool[poolIdx % pool.length]; setPoolIdx(i => i + 1); setItems(xs => [...xs, { ...p, name: xs.some(x => x.name === p.name) ? `${p.name} ${poolIdx + 2}` : p.name, linked: true }]) }
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={title} body={body} />
        <div className="relative mt-10 border border-line overflow-hidden">
          <GrainPanel palette="sales" />
          <div className="relative p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence initial={false}>
                {items.map(c => (
                  <motion.div key={c.name} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: c.linked ? 1 : 0.4, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.3, ease: OUT }}
                    className={`group relative rounded-xl border bg-white p-3 ${c.linked ? 'border-indigo-brand/45' : 'border-line'}`}>
                    <button type="button" onClick={() => toggle(c.name)} className="font-sans w-full text-left" aria-pressed={c.linked}>
                      <AppIcon seed={c.seed} className="w-7 h-7" />
                      <p className="mt-2 text-[13px] font-medium text-ink truncate">{c.name}</p>
                      <p className="text-[11px] text-muted">{c.linked ? 'Linked' : 'Not linked'}</p>
                    </button>
                    <button type="button" onClick={() => remove(c.name)} aria-label={`Remove ${c.name}`} className="font-sans absolute top-2 right-2 w-5 h-5 rounded-full text-muted hover:text-ink hover:bg-gray-100 text-xs leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity">×</button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.button layout type="button" onClick={add}
                className="font-sans rounded-xl border border-dashed border-indigo-brand/40 bg-white/50 p-3 min-h-[96px] text-[13px] font-medium text-indigo-brand hover:border-solid hover:border-indigo-brand hover:bg-white transition-colors duration-150">
                + Add a channel
              </motion.button>
            </div>
            <div className="rounded-2xl bg-white border border-line shadow-glass p-4 font-sans">
              <div className="flex items-center gap-2 pb-3 border-b border-line"><Mascot size={24} /><span className="text-[13px] font-medium text-ink">Lumenfold helper</span><span className="ml-auto w-2 h-2 rounded-full bg-status-green" /></div>
              <p className="mt-3 rounded-2xl rounded-tl-md bg-[#f3f3f4] px-3 py-2 text-[12px] text-ink">Hi! I can track orders, change bookings or find a policy.</p>
              <p className="mt-2 ml-auto w-fit rounded-2xl rounded-br-md bg-indigo-brand text-white px-3 py-2 text-[12px]">Where is order 5521?</p>
              <p className="mt-3 text-[10.5px] text-muted">Live on {items.filter(x => x.linked).length} channels</p>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.17 StackCollapse ---------- */
export function StackCollapse({ title, body, rows }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (!inView) return
    let iv
    const t = setTimeout(() => { iv = setInterval(() => setActive(a => (a + 1) % rows.length), 1800) }, rows.length * 80 + 1600)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [inView, rows.length])
  const list = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: EASE } }
  return (
    <Row>
      <div className={stacked}>
        <Reveal title={title} body={body} />
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.svg viewBox="0 0 460 380" className="w-full max-w-[460px] mx-auto" variants={list} initial="hidden" animate={inView ? 'show' : 'hidden'} aria-hidden="true">
            {rows.map((_, i) => {
              const k = rows.length - 1 - i, y = 60 + k * 56, on = k === active
              return (
                <motion.g key={i} variants={item}>
                  <path d={`M230 ${y}l170 50-170 50-170-50z`} fill={on ? '#6056ff' : '#fff'} fillOpacity={on ? 0.14 : 1} stroke={on ? '#6056ff' : '#cfd0d5'} strokeWidth="1.2" style={{ transition: 'all .3s' }} />
                  <path d={`M60 ${y + 50}v10l170 50 170-50v-10`} fill="none" stroke={on ? '#6056ff' : '#e6e7ea'} strokeWidth="1.2" style={{ transition: 'all .3s' }} />
                </motion.g>
              )
            })}
          </motion.svg>
          <div className="bg-slate-50 rounded-2xl overflow-hidden">
            <motion.ul className="flex flex-col gap-1 p-2" variants={list} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              {rows.map((r, i) => (
                <motion.li key={r.label} variants={item} onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-3 py-3 px-3.5 rounded-lg transition-all duration-300 ${i === active ? 'bg-white shadow-[inset_0_0_0_1px_rgba(13,22,47,.05),inset_0_2px_6px_rgba(13,22,47,.04)]' : ''}`}>
                  <LineIcon name={r.icon} size={16} className={i === active ? 'text-indigo-brand' : 'text-muted'} />
                  <span className={`text-sm font-medium transition-colors duration-300 ${i === active ? 'text-indigo-brand' : 'text-ink'}`}>{r.label}</span>
                  <span className="ml-auto hidden sm:inline text-[12.5px] text-muted">{r.meta}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </Row>
  )
}
function Reveal({ title, body }) {
  return (
    <motion.div className="max-w-2xl mb-10 md:mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}>
      <h2 className="text-[30px] md:text-[36px] leading-[1.25] tracking-[-0.025em] text-ink">{title}</h2>
      <p className="mt-5 max-w-xl text-base leading-[1.6] text-muted">{body}</p>
    </motion.div>
  )
}

/* ---------- A.16 GetStarted ---------- */
export function GetStarted({ title, body, cta }) {
  return (
    <Row>
      <div className={stacked}>
        <div className="relative overflow-hidden rounded-2xl">
          <GrainPanel palette="sales" />
          <div className="relative px-6 py-16 md:py-24 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: -18, scale: 0.6 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ type: 'spring', stiffness: 220, damping: 13 }}>
              <Mascot size={72} />
            </motion.div>
            <div className="mt-6 max-w-xl">
              <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{title}</h2>
              <p className="mt-5 mx-auto max-w-lg text-base leading-[1.6] text-ink/80">{body}</p>
            </div>
            <div className="mt-8"><Btn to={cta.to}>{cta.label}</Btn></div>
          </div>
        </div>
      </div>
    </Row>
  )
}
