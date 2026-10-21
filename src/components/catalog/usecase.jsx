import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE, Row, SectionHeading, PillTabs, Avatar, AppIcon } from '../ui'
import { PGrain, Glyph, PAD, accent } from './primitives'
import { CtaTile } from './sections'

const tr = { duration: 0.4, ease: [0.23, 1, 0.32, 1] }

/* ------------------------------------------------------------------ */
/* T3.2 Hero + run panel                                               */
/* ------------------------------------------------------------------ */
function Cluster({ apps }) {
  const rot = [-6, 4, -3, 5]
  return (
    <div className="flex items-center justify-center">
      {apps.map((a, i) => (
        <span key={a.name} title={a.name} className="w-10 h-10 rounded-full border border-slate-100 bg-white/70 backdrop-blur-glass shadow-glass flex items-center justify-center"
          style={{ marginLeft: i ? -8 : 0, zIndex: i, transform: `rotate(${rot[i]}deg)` }}>
          <AppIcon seed={a.seed} className="w-[19px] h-[19px]" />
        </span>
      ))}
    </div>
  )
}

// Reveal line inside the scroll viewport. Stagger only applies within 1s of mount.
function Line({ root, delay, late, className = '', children }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root, once: true, amount: 0.4 }} transition={{ ...tr, delay: late ? 0 : delay }}>
      {children}
    </motion.div>
  )
}

function RunScene({ run, agent, apps, root, a }) {
  const [late, setLate] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLate(true), 1000); return () => clearTimeout(t) }, [])
  let toolIdx = 0
  return (
    <div className="relative max-w-2xl mx-auto font-sans">
      <div className="absolute left-[17px] top-5 bottom-4 w-px run-guide" aria-hidden="true" />
      <Line root={root} delay={0} late={late} className="relative">
        <span className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1 pr-4 shadow-[inset_0_0_0_1px_rgba(13,22,47,.08),0_2px_6px_rgba(13,22,47,.05)]">
          <span className="relative w-[26px] h-[26px] rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(13,22,47,.07)] flex items-center justify-center">
            <AppIcon seed={apps[0].seed} className="w-3.5 h-3.5" />
            <span className="absolute -right-1 -bottom-1 w-[15px] h-[15px] rounded-full bg-indigo-brand ring-[1.5px] ring-white flex items-center justify-center">
              <svg viewBox="0 0 10 10" className="w-[9px] h-[9px]" fill="none"><path d="M2.2 5.2l1.8 1.8 3.8-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </span>
          <span className="text-[13.5px] font-medium text-ink">{run.trigger}</span>
        </span>
      </Line>
      <Line root={root} delay={0.08} late={late} className="relative mt-4 pl-1 flex items-center gap-2.5">
        <span className="rounded-full ring-2 ring-white"><Avatar seed={agent.length} size={26} /></span>
        <span className="text-[13.5px] font-medium text-ink">{agent}</span>
      </Line>
      {run.steps.map((s, i) => {
        const d = 0.16 + i * 0.08
        if (s[0] === 'n') return <Line key={i} root={root} delay={d} late={late} className="relative mt-3 pl-[42px] text-[13.5px] leading-[1.6] text-muted">{s[1]}</Line>
        const app = apps[(toolIdx++ + 1) % apps.length]
        return (
          <Line key={i} root={root} delay={d} late={late} className="relative mt-[18px] pl-1 flex items-center gap-2.5">
            <span className="w-[26px] h-[26px] rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(13,22,47,.08),0_1px_2px_rgba(13,22,47,.06)] flex items-center justify-center shrink-0"><AppIcon seed={app.seed} className="w-[15px] h-[15px]" /></span>
            <span className="flex-1 min-w-0 text-[13.5px] font-medium tracking-[-0.01em] text-ink">{s[1]}</span>
            <span className="text-xs text-muted tabular-nums opacity-80">{s[2]}</span>
          </Line>
        )
      })}
      <Line root={root} delay={0.16 + run.steps.length * 0.08} late={late} className="relative ml-[42px] mt-4 p-4 rounded-lg bg-slate-50 border border-line text-[13.5px] leading-[1.65] text-ink">
        <strong className="font-semibold" style={{ color: a }}>{run.result[0]}</strong> {run.result[1]}
      </Line>
    </div>
  )
}

export function UseCaseHero({ uc, copy }) {
  const [tab, setTab] = useState(0)
  const view = useRef(null)
  const change = i => { setTab(i); view.current?.scrollTo({ top: 0 }) }
  const a = accent(uc.fn).a
  return (
    <Row>
      <div className="pt-10 md:pt-16 pb-16 md:pb-20 px-6 md:px-12 lg:px-20">
        <motion.div className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <Cluster apps={uc.apps} />
          <h1 className="mt-4 max-w-3xl text-[36px] md:text-[48px] leading-[1.15] tracking-[-0.05em] text-ink">{uc.h1}</h1>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-[1.6] text-muted">{uc.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary font-sans text-base px-6 py-3">{copy.primary}</Link>
            <a href="#run" className="btn-secondary font-sans text-base px-6 py-3">{copy.secondary}</a>
          </div>
        </motion.div>
        <motion.div id="run" className="relative mt-12 rounded-2xl overflow-hidden scroll-mt-24" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.1 }}>
          <PGrain palette={uc.fn} />
          <div className="relative p-3 sm:p-5 md:p-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(13,22,47,.06),0_12px_32px_-8px_rgba(13,22,47,.16),inset_0_1px_0_rgba(255,255,255,.9)]">
              <div className="hidden md:block px-7 pt-9 desktop:px-9">
                <div className="w-fit mx-auto"><PillTabs tabs={uc.tabs} active={tab} onChange={change} /></div>
              </div>
              <div ref={view} className="h-[480px] md:h-[520px] overflow-y-auto p-5 sm:p-7 md:p-9 run-mask">
                <RunScene key={tab} run={uc.runs[tab]} agent={uc.name} apps={uc.apps} root={view} a={a} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* T3.4 How it works                                                   */
/* ------------------------------------------------------------------ */
const constellation = [[50, 48, 52, 1], [24, 26, 42, 0.9], [77, 24, 40, 0.85], [19, 70, 38, 0.8], [80, 72, 44, 0.9], [50, 92, 32, 0.65], [51, 6, 30, 0.6], [97, 48, 28, 0.55]]
const consGlyphs = ['spark', 'mail', 'calendar', 'chart', 'doc', 'chat', 'bolt', 'link']

function Chips({ items, apps, glyphs }) {
  return (
    <div className="flex flex-col items-start gap-2.5 chip-mask py-6">
      {items.map((c, i) => (
        <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/55 backdrop-blur-glass shadow-glass-sm py-1 pl-1 pr-3 text-[12px] font-medium text-ink whitespace-nowrap">
          <span className="w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center">
            {glyphs ? <Glyph name={glyphs[i]} className="w-[13px] h-[13px]" color="#4b40d6" /> : <AppIcon seed={apps[i % apps.length].seed} className="w-[13px] h-[13px]" />}
          </span>
          {c}
        </span>
      ))}
    </div>
  )
}
function Connector() {
  return (
    <div className="flex items-center justify-center py-2 md:py-0 md:h-[190px]" aria-hidden="true">
      <svg viewBox="0 0 40 12" className="hidden md:block w-10 h-3" fill="none"><path d="M2 6h29" stroke="rgba(13,22,47,.30)" strokeWidth="1.5" strokeLinecap="round" /><path d="M31 2l7 4-7 4z" fill="rgba(13,22,47,.30)" /></svg>
      <svg viewBox="0 0 12 36" className="md:hidden w-3 h-9" fill="none"><path d="M6 2v25" stroke="rgba(13,22,47,.30)" strokeWidth="1.5" strokeLinecap="round" /><path d="M2 27l4 7 4-7z" fill="rgba(13,22,47,.30)" /></svg>
    </div>
  )
}

export function HowItWorks({ uc, copy }) {
  const [l, r] = copy.compareHead
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={copy.howTitle} className="!mb-10 md:!mb-14" />
        <div className="relative rounded-2xl overflow-hidden">
          <PGrain palette={uc.fn} />
          <div className="relative px-6 py-10 md:px-10 lg:px-14 md:py-12 grid grid-cols-1 md:grid-cols-[1fr_44px_1fr_44px_1fr] items-center">
            <div className="flex items-center justify-center md:h-[200px]"><Chips items={uc.triggers} apps={uc.apps} /></div>
            <Connector />
            <div className="flex items-center justify-center md:h-[200px]">
              <div className="relative w-[200px] h-[170px]">
                {constellation.map(([x, y, s, o], i) => {
                  const d = Math.round(s * 0.66), ic = Math.round(d * 0.6)
                  return (
                    <span key={i} className="absolute rounded-xl border border-white/60 bg-white/55 backdrop-blur-glass shadow-glass-sm flex items-center justify-center"
                      style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, opacity: o, transform: 'translate(-50%,-50%)' }}>
                      <span className="rounded-full bg-white flex items-center justify-center overflow-hidden" style={{ width: d, height: d }}>
                        {i === 0 ? <Avatar seed={uc.name.length} size={d} /> : <span className="block" style={{ width: ic, height: ic }}><Glyph name={consGlyphs[i]} className="w-full h-full" color={accent(uc.fn).d} stroke={1.8} /></span>}
                      </span>
                    </span>
                  )
                })}
              </div>
            </div>
            <Connector />
            <div className="flex items-center justify-center md:h-[200px]"><Chips items={uc.actions} glyphs={['flag', 'calendar', 'layers', 'chat']} /></div>
          </div>
        </div>
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-[1fr_44px_1fr_44px_1fr] gap-y-10">
          {uc.features.map(([h, p], i) => (
            <FeatureCell key={h} h={h} p={p} spacer={i < 2} />
          ))}
        </div>
        <div className="mt-16 md:mt-24 border border-line bg-white">
          <div className="hidden md:grid grid-cols-2 border-b border-line">
            <div className="py-4 text-center text-base text-muted">{l}</div>
            <div className="py-4 flex items-center justify-center gap-2 border-l border-dashed border-ink/10 text-base font-medium text-ink">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M12 1.5l9.5 6v9L12 22.5l-9.5-6v-9z" fill="#6056ff" /></svg>{r}
            </div>
          </div>
          {uc.compare.map(([no, yes], i) => (
            <div key={i} className={`grid md:grid-cols-2 ${i ? 'border-t border-dashed border-ink/10' : ''}`}>
              <div className="flex gap-3.5 p-6">
                <span className="w-6 h-6 -mt-[2px] rounded-full bg-[#f3f3f4] flex items-center justify-center shrink-0"><svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#868a97" strokeWidth="1.4" strokeLinecap="round" /></svg></span>
                <p className="-mt-1 text-[15px] leading-[1.6] text-muted">{no}</p>
              </div>
              <div className="flex gap-3.5 p-6 border-t border-dashed border-ink/10 md:border-t-0 md:border-l">
                <span className="w-6 h-6 -mt-[2px] rounded-full bg-[#ecfdf3] flex items-center justify-center shrink-0"><svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none"><path d="M2 5.2l2 2 4-4.4" stroke="#0e9384" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <p className="-mt-1 text-[15px] leading-[1.6] text-ink">{yes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}
function FeatureCell({ h, p, spacer }) {
  return (
    <>
      <div>
        <h3 className="font-sans text-lg font-medium tracking-[-0.025em] text-ink">{h}</h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.65] text-muted">{p}</p>
      </div>
      {spacer && <div className="hidden md:block" />}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* T3.9 Related use-cases rail (UseCases card grid, function palette)  */
/* ------------------------------------------------------------------ */
function Mock({ kind, a, i }) {
  const sh = { boxShadow: `0 2px 8px ${a}4d` }
  if (kind === 'tags') return (
    <div className="flex flex-col items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/55 border border-white/60 backdrop-blur-glass-lg shadow-glass-sm pl-1 pr-3 py-1 text-xs leading-[18px] font-medium" style={{ color: a }}><span className="w-6 h-6 rounded-full bg-white flex items-center justify-center"><AppIcon seed={i + 2} className="w-4 h-4" /></span>Priority: high</span>
      <div className="flex gap-1.5"><span className="glass-tag"><span className="w-[17px] h-[17px] rounded-full bg-white flex items-center justify-center"><AppIcon seed={i + 5} className="w-3 h-3" /></span>Routed</span><span className="glass-tag"><span className="w-[17px] h-[17px] rounded-full bg-white flex items-center justify-center"><AppIcon seed={i + 8} className="w-3 h-3" /></span>Tagged</span></div>
    </div>
  )
  if (kind === 'calendar') return (
    <div className="rounded bg-white/55 border border-white/60 backdrop-blur-glass shadow-glass-sm p-3 w-[150px] mx-auto">
      <div className="grid grid-cols-5 gap-1.5">
        {['M', 'T', 'W', 'T', 'F', 14, 15, 16, 17, 18].map((d, k) => (
          <span key={k} className={`h-6 rounded-md flex items-center justify-center text-[10px] ${k === 8 ? 'text-white font-semibold' : 'text-chip-muted'}`} style={k === 8 ? { background: a, ...sh } : undefined}>{d}</span>
        ))}
      </div>
    </div>
  )
  if (kind === 'list') return (
    <ul className="flex flex-col gap-2.5 text-[13px] leading-[17.9px] text-ink mx-auto">
      {['Sources checked', 'Summary drafted', 'Owner notified'].map((t, k) => (
        <li key={t} className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: k === 0 ? a : 'rgba(13,22,47,.3)' }} />{t}</li>
      ))}
    </ul>
  )
  if (kind === 'timeline') return (
    <div className="flex flex-col mx-auto">
      {['Picked up', 'In progress', 'Handed back'].map((t, k) => (
        <div key={t} className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <span className="w-[18px] h-[18px] rounded-full bg-white/70 shadow-glass-sm text-[10px] font-semibold flex items-center justify-center" style={{ color: a }}>{k + 1}</span>
            {k < 2 && <span className="w-px h-3 bg-ink/15" />}
          </div>
          <span className="text-[12px] text-ink leading-[18px]">{t}</span>
        </div>
      ))}
    </div>
  )
  if (kind === 'bars') return (
    <div className="flex items-end justify-center gap-3 h-[80px]">
      {[14, 28, 56].map((h, k) => (
        <div key={k} className="flex flex-col items-center gap-1">
          <span className="w-6 rounded-t" style={{ height: h, background: k === 2 ? a : 'rgba(13,22,47,.12)', ...(k === 2 ? sh : {}) }} />
          <span className="text-[11px] tabular-nums text-chip-muted">W{k + 1}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className="relative w-[150px] h-[120px] mx-auto">
      {[0.32, 0.44, 0.55].map((o, k) => (
        <div key={k} className="absolute w-[120px] h-[94px] rounded border border-white/60 shadow-glass-sm p-2" style={{ left: k * 12, top: k * 10, background: `rgba(255,255,255,${o})` }}>
          {k === 2 && <div className="flex items-center gap-1.5"><Avatar seed={i} size={16} /><span className="text-[10px] font-medium text-chip-muted">Needs review</span></div>}
        </div>
      ))}
    </div>
  )
}

const pop = { duration: 0.3, ease: [0.23, 1, 0.32, 1] }

function AgentCard({ c, i, visible, fn, finePointer }) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useRef()
  const a = accent(fn).a
  useEffect(() => {
    clearTimeout(t.current)
    if (hover && finePointer) t.current = setTimeout(() => setOpen(true), 450)
    else setOpen(false)
    return () => clearTimeout(t.current)
  }, [hover, finePointer])
  return (
    <motion.div className="relative flex flex-col h-full" style={{ zIndex: hover ? 30 : undefined }}
      initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: (i % 4) * 0.06 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link to={`/use-cases/${c.slug}`} className="absolute inset-0 z-10" aria-label={c.name} />
      <div className="relative min-h-[230px] flex-1 overflow-hidden">
        <PGrain palette={fn} />
        <div className="relative h-full min-h-[230px] px-5 py-6 flex flex-col justify-center" style={{ filter: hover ? 'blur(6px)' : 'none', opacity: hover ? 0.65 : 1, transition: 'filter .25s ease, opacity .25s ease' }}>
          <Mock kind={c.kind} a={a} i={i} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(4px)', transition: 'opacity .25s ease, transform .25s ease' }}>
          <span className="rounded-full border border-white/60 bg-white/90 backdrop-blur-glass-lg px-4 py-2 text-[13px] font-medium text-ink shadow-glass-pill">Read more</span>
        </div>
      </div>
      <h3 className="font-sans mt-4 text-base leading-6 text-ink">{c.name}</h3>
      <p className="mt-1.5 text-sm leading-[21px] text-muted">{c.desc}</p>
      <AnimatePresence>
        {open && (
          <motion.div key="pop" initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }} transition={pop}
            style={{ transformOrigin: 'top center' }}
            className={`hidden xl:block absolute top-0 z-30 w-[372px] bg-white border border-line shadow-mega-menu p-4 pointer-events-none ${i % 4 === 3 ? 'right-full mr-4' : 'left-full ml-4'}`}>
            <div className="relative h-[220px] overflow-hidden"><PGrain palette={fn} /><div className="relative h-full flex items-center justify-center scale-125"><Mock kind={c.kind} a={a} i={i} /></div></div>
            <div className="mt-3 text-sm font-medium text-ink">{c.name}</div>
            <div className="text-sm text-muted">{c.desc}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function RelatedRail({ title, items, fn }) {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.15, once: true })
  const [fine, setFine] = useState(false)
  useEffect(() => { setFine(matchMedia('(hover: hover) and (pointer: fine)').matches) }, [])
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={title} />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {items.map((c, i) => <AgentCard key={c.slug} c={c} i={i} visible={visible} fn={fn} finePointer={fine} />)}
        </div>
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* T3.10 StackCollapse + final CTA                                      */
/* ------------------------------------------------------------------ */
function Plates({ a }) {
  const layers = ['Agents', 'Tools', 'Memory', 'Models']
  return (
    <svg viewBox="0 0 460 340" className="w-full max-w-[460px] mx-auto lg:mx-0" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#f3f4f8" /></linearGradient>
      </defs>
      {layers.map((l, k) => {
        const y = 24 + k * 74
        const on = k === 0
        return (
          <g key={l}>
            <path d={`M60 ${y + 40} L60 ${y + 50} L230 ${y + 90} L400 ${y + 50} L400 ${y + 40} L230 ${y + 80} Z`} stroke="#e6e7ea" fill="#f3f4f8" />
            <path d={`M230 ${y} L400 ${y + 40} L230 ${y + 80} L60 ${y + 40} Z`} fill="#fff" />
            <path d={`M230 ${y} L400 ${y + 40} L230 ${y + 80} L60 ${y + 40} Z`} fill={on ? a : 'url(#pl)'} fillOpacity={on ? 0.14 : 1} stroke={on ? a : '#e6e7ea'} strokeOpacity={on ? 0.6 : 1} />
            <text x="230" y={y + 44} textAnchor="middle" fontFamily="Inter" fontSize="12.5" fontWeight="500" fill={on ? a : '#5b6070'}>{l}</text>
          </g>
        )
      }).reverse()}
    </svg>
  )
}

export function StackCollapse({ fn, copy, coins, cta }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const [active, setActive] = useState(-1)
  const n = copy.items.length
  const a = accent(fn).a
  useEffect(() => {
    if (!inView) return
    let iv
    const t = setTimeout(() => { setActive(0); iv = setInterval(() => setActive(x => (x + 1) % n), 1800) }, n * 80 + 1600)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [inView, n])
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={copy.title} body={copy.body} />
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <Plates a={a} />
          <div className="bg-slate-50 rounded-2xl overflow-hidden">
            <motion.ul className="flex flex-col gap-1 p-2" initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}>
              {copy.items.map(([l, m], i) => {
                const on = i === active
                return (
                  <motion.li key={l} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: tr } }}
                    className={`flex items-center gap-3 py-3 px-3.5 rounded-lg transition-all duration-300 ${on ? 'bg-white shadow-[inset_0_0_0_1px_rgba(13,22,47,.05),inset_0_2px_6px_rgba(13,22,47,.04)]' : ''}`}>
                    <span className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: on ? a : 'rgba(13,22,47,.2)' }} />
                    <span className="text-sm font-medium transition-colors duration-300" style={{ color: on ? a : '#0d162f' }}>{l}</span>
                    <span className="ml-auto hidden sm:inline text-[12.5px] text-muted">{m}</span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>
        </div>
        <CtaTile className="mt-16 md:mt-20" palette={fn} coins={coins} inner="py-12 md:py-24" titleClass="text-2xl md:text-[36px] md:leading-[48.6px]" title={cta.title} body={cta.body} primary={cta.primary} />
      </div>
    </Row>
  )
}
