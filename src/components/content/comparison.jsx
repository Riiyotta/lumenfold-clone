import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, Row, Grain, Avatar, AppIcon, LogoMark, SectionHeading } from '../ui'
import { PageSection } from './parts'

const descClass = 'max-w-xl md:text-lg md:leading-[28.8px]'

// Neutral placeholder glyph for a generic competitor category (never a real logo).
export function CompetitorGlyph({ seed = 0, size = 24 }) {
  const v = seed % 5
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {v === 0 && <circle cx="12" cy="12" r="9" fill="#5b6070" />}
      {v === 1 && <><rect x="3" y="3" width="8" height="8" rx="2" fill="#5b6070" /><rect x="13" y="13" width="8" height="8" rx="2" fill="#9ca3af" /><rect x="13" y="3" width="8" height="8" rx="2" fill="#9ca3af" /><rect x="3" y="13" width="8" height="8" rx="2" fill="#5b6070" /></>}
      {v === 2 && <><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="#5b6070" strokeWidth="2" /><path d="M7 10h6M7 14h10" stroke="#5b6070" strokeWidth="2" strokeLinecap="round" /></>}
      {v === 3 && <><rect x="3" y="3" width="18" height="18" rx="3" fill="#5b6070" /><path d="M3 9h18M9 9v12" stroke="#fff" strokeWidth="1.6" /></>}
      {v === 4 && <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 014 13.5z" fill="#5b6070" />}
    </svg>
  )
}

const tileShadow = 'shadow-[0_1px_2px_rgba(13,22,47,.05),0_8px_20px_-8px_rgba(13,22,47,.14)]'

/* ---------- 1. Hero ---------- */
export function CompareHero({ c }) {
  return (
    <Row>
      <div className="pt-10 md:pt-16 pb-16 md:pb-20 px-6 md:px-12 lg:px-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE} className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3.5">
            <span className={`w-11 h-11 rounded-xl border border-line bg-white flex items-center justify-center ${tileShadow}`}><LogoMark size={24} /></span>
            <span className="text-base text-muted">vs</span>
            <span className={`w-11 h-11 rounded-xl border border-line bg-white flex items-center justify-center ${tileShadow}`}><CompetitorGlyph seed={c.glyph} /></span>
          </div>
          <h1 className="mt-6 text-[36px] md:text-[48px] leading-[1.12] tracking-tighter text-ink">{c.title}</h1>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-[1.6] text-muted">{c.body}</p>
        </motion.div>
      </div>
    </Row>
  )
}

/* ---------- 3. Fit cards ---------- */
const Tick = ({ on }) => (
  <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${on ? 'fit-check-on' : 'bg-[#ececf1]'}`}>
    <svg viewBox="0 0 12 12" className="w-[11px] h-[11px]" fill="none" stroke={on ? '#fff' : '#868a97'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.2l2.3 2.3 4.7-4.9" /></svg>
  </span>
)

function FitBody({ mark, name, def, items, on }) {
  return (
    <>
      <div className="flex items-center gap-2.5">{mark}<span className="text-lg font-semibold tracking-tight text-ink">{name}</span></div>
      <p className={`mt-3 text-sm leading-[22.4px] ${on ? 'text-ink' : 'text-muted'}`}>{def}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map(it => <li key={it} className="flex items-start gap-3"><Tick on={on} /><p className={`text-sm leading-[21px] ${on ? 'text-ink' : 'text-muted'}`}>{it}</p></li>)}
      </ul>
    </>
  )
}

export function FitCards({ c, us }) {
  const pad = 'px-7 pb-7 pt-5 md:px-8 md:pb-8 md:pt-6'
  return (
    <PageSection>
      <SectionHeading title="Which approach fits your work" body={`Both have their place. Here is how ${c.ref} and Lumenfold agents differ in day-to-day use.`} className="mb-12 md:mb-14" bodyClass={descClass} />
      <div className="grid gap-5 md:grid-cols-2 md:items-stretch">
        <div className={`rounded-2xl bg-tile-base ${pad}`}>
          <FitBody mark={<CompetitorGlyph seed={c.glyph} size={22} />} name={c.name} {...c.fit} />
        </div>
        <div className="rounded-2xl p-[1.5px] fit-ring">
          <div className={`h-full rounded-[15px] bg-white ${pad}`}>
            <FitBody mark={<LogoMark size={22} />} name="Lumenfold" {...us} on />
          </div>
        </div>
      </div>
    </PageSection>
  )
}

/* ---------- 4. Differences (glass vignettes on a violet grain panel) ---------- */
function NodeGraph() {
  const pts = [[0, 24], [118, 0], [118, 84], [236, 42]]
  return (
    <div className="relative w-full max-w-[320px] aspect-[320/140]">
      <svg viewBox="0 0 320 140" className="absolute inset-0 w-full h-full" fill="none">
        <path d="M44 46C80 46 90 22 118 22M44 46C80 46 90 106 118 106M162 22C200 22 210 64 236 64M162 106C200 106 210 64 236 64" stroke="#6056ff" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      {pts.map(([x, y], k) => (
        <span key={k} className="absolute aspect-square rounded-full bg-white/80 backdrop-blur-glass shadow-glass flex items-center justify-center"
          style={{ left: `${(x / 320) * 100}%`, top: `${(y / 140) * 100}%`, width: `${(44 / 320) * 100}%`, opacity: k === 3 ? 0.6 : 1 }}>
          <Avatar seed={k + 2} size={28} className="!w-[64%] !h-[64%] [&_svg]:w-full [&_svg]:h-full" />
          <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-status-green ring-2 ring-white" />
        </span>
      ))}
    </div>
  )
}

function Sparkline() {
  const pts = [[0, 40], [30, 36], [60, 38], [90, 30], [120, 33], [150, 26], [180, 64], [210, 30], [240, 22], [270, 20], [300, 14]]
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
  return (
    <div className="w-full max-w-[300px] rounded bg-white/70 backdrop-blur-glass shadow-glass p-3">
      <div className="flex items-center justify-between text-[11px] font-medium text-chip-muted mb-2"><span>Eval pass rate</span><span className="text-eval-teal">96.4%</span></div>
      <svg viewBox="0 0 300 80" className="w-full h-auto" fill="none">
        <defs><linearGradient id="spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#059669" stopOpacity=".12" /><stop offset="1" stopColor="#059669" stopOpacity="0" /></linearGradient></defs>
        <line x1="0" y1="56" x2="300" y2="56" stroke="#b42318" strokeOpacity=".28" strokeDasharray="4 4" />
        <path d={`${d} L300 80 L0 80Z`} fill="url(#spark)" />
        <path d={d} stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="180" cy="64" r="4" fill="#b42318" stroke="#fff" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

function RankPills() {
  const rows = [['Small · extract', '0.4¢', 1], ['Medium · compare', '1.1¢', 0.8], ['Large · draft', '3.2¢', 0.6]]
  return (
    <div className="flex flex-col items-start gap-2.5">
      {rows.map(([l, v, o], k) => (
        <span key={l} className={`glass-pill whitespace-nowrap ${k === 1 ? 'ml-6' : ''}`} style={{ opacity: o }}>
          <span className="w-4 h-4 rounded-full bg-indigo-brand text-white text-[9px] font-semibold flex items-center justify-center">{k + 1}</span>{l}<span className="text-muted font-normal">{v}</span>
        </span>
      ))}
    </div>
  )
}

function OrchestrationPills() {
  return (
    <div className="flex flex-col items-start gap-2.5">
      {['Gatherer wrote a brief', 'Decider chose route', 'Doer updated the CRM'].map((l, k) => (
        <span key={l} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`}><Avatar seed={k + 4} size={18} />{l}</span>
      ))}
    </div>
  )
}

export function Differences({ c, alt }) {
  const cells = [<NodeGraph key="g" />, <Sparkline key="s" />, alt ? <OrchestrationPills key="o" /> : <RankPills key="r" />]
  return (
    <PageSection>
      <SectionHeading title="What changes when agents do the work" body="Three differences teams notice in their first month." className="mb-12 md:mb-14" bodyClass={descClass} />
      <div className="relative overflow-hidden rounded-2xl">
        <Grain tone="violet" />
        <div className="relative px-6 py-10 md:px-10 lg:px-14 md:py-12 grid lg:grid-cols-3 gap-y-10 gap-x-10 items-center">
          {cells.map((v, i) => <div key={i} className="flex items-center justify-center lg:h-[200px] min-w-0">{v}</div>)}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-10 mt-10 md:mt-12">
        {c.differences.map(([h, p]) => (
          <div key={h}>
            <h3 className="font-sans text-lg leading-7 font-medium tracking-tight text-ink">{h}</h3>
            <p className="mt-2.5 text-[14.5px] leading-[23.9px] text-muted">{p}</p>
          </div>
        ))}
      </div>
    </PageSection>
  )
}

/* ---------- 5. Exemplar run (scrolling transcript) ---------- */
const lineEase = [0.23, 1, 0.32, 1]
function Line({ delay, children, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.4, ease: lineEase, delay }} className={className}>
      {children}
    </motion.div>
  )
}
const circle = 'w-[26px] h-[26px] shrink-0 rounded-full bg-white flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(13,22,47,.08)]'

export function ExemplarRun({ run }) {
  // Stagger delays only apply within the first second after mount; later reveals have none.
  const [early, setEarly] = useState(true)
  useEffect(() => { const t = setTimeout(() => setEarly(false), 1000); return () => clearTimeout(t) }, [])
  const d = v => (early ? v : 0)
  let step = 0
  return (
    <PageSection>
      <SectionHeading title="Watch an agent work through a real case" body="A replay of one run, step by step, exactly as the team sees it." className="mb-12 md:mb-14" bodyClass={descClass} />
      <div className="relative overflow-hidden">
        <Grain tone="violet" />
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: lineEase }} className="relative p-6 md:p-14 lg:p-20">
          <div className="bg-white border border-line">
            <div className="run-viewport h-[480px] md:h-[560px] overflow-y-auto p-6 sm:p-8 md:p-10">
              <div className="relative max-w-2xl mx-auto pb-4">
                <span className="run-rail" />
                <Line delay={d(0)} className="relative">
                  <span className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1 pr-4 shadow-[inset_0_0_0_1px_rgba(13,22,47,.08),0_2px_6px_rgba(13,22,47,.05)]">
                    <span className={`relative ${circle}`}>
                      <AppIcon seed={2} className="w-3.5 h-3.5" />
                      <span className="absolute -bottom-1 -right-1 w-[15px] h-[15px] rounded-full bg-indigo-brand flex items-center justify-center shadow-[0_0_0_1.5px_#fff]">
                        <svg viewBox="0 0 10 10" className="w-2 h-2" fill="#fff"><path d="M5.8 1L2 5.6h2.6L4 9l4-4.8H5.4z" /></svg>
                      </span>
                    </span>
                    <span className="text-[13.5px] font-medium text-ink">{run.trigger}</span>
                  </span>
                </Line>
                <Line delay={d(0.08)} className="relative mt-4 flex items-center gap-2.5 pl-1">
                  <Avatar seed={run.seed} size={26} className="ring-2 ring-white" />
                  <span className="text-[13.5px] font-medium text-ink">{run.agent}</span>
                </Line>
                {run.steps.map(([kind, text, count], i) => {
                  const delay = d(0.16 + step++ * 0.08)
                  return kind === 'tool' ? (
                    <Line key={i} delay={delay} className="relative mt-[18px] flex items-center gap-2.5 pl-1 text-[13.5px] font-medium tracking-[-0.01em] text-ink">
                      <span className={circle}><AppIcon seed={i + 3} className="w-[15px] h-[15px]" /></span>
                      <span>{text}</span>
                      <span className="text-xs tabular-nums text-muted opacity-80">{count}</span>
                    </Line>
                  ) : (
                    <Line key={i} delay={delay} className="relative mt-[18px] pl-[42px] text-[13.5px] leading-[21.6px] text-muted">{text}</Line>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}

/* ---------- 6. Comparison table ---------- */
function Status({ s }) {
  const cfg = {
    check: ['bg-[#ecfdf3]', <path key="c" d="M2.5 6.2l2.3 2.3 4.7-4.9" stroke="#027a48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />, 'w-3 h-3'],
    partial: ['bg-[#fffbeb]', <path key="p" d="M3 6h6" stroke="#b45309" strokeWidth="2.4" strokeLinecap="round" />, 'w-3 h-3'],
    no: ['bg-[#fef2f2]', <path key="n" d="M3 3l6 6M9 3L3 9" stroke="#b42318" strokeWidth="2.2" strokeLinecap="round" />, 'w-2.5 h-2.5'],
  }[s]
  return (
    <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${cfg[0]}`} aria-label={s}>
      <svg viewBox="0 0 12 12" className={cfg[2]} fill="none">{cfg[1]}</svg>
    </span>
  )
}

const UsMark = ({ h = 18 }) => (
  <span className="inline-flex items-center gap-1.5" style={{ height: h }}>
    <LogoMark size={h} /><span className="font-display font-semibold tracking-[-0.03em] text-ink leading-none" style={{ fontSize: h * 0.8 }}>lumenfold</span>
  </span>
)

export function CompareTable({ c }) {
  return (
    <PageSection>
      <SectionHeading title="Side by side, question by question" body="The seven questions teams ask most when they compare approaches." className="mb-12 md:mb-14" bodyClass={descClass} />
      <div className="border border-gray-200 bg-white overflow-hidden">
        {/* md and up */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1fr] border-b border-gray-200">
            <div className="px-5 py-3.5 border-r border-gray-100" />
            <div className="px-5 py-3.5 border-r border-gray-100 flex items-center"><UsMark /></div>
            <div className="px-5 py-3.5 flex items-center gap-2"><CompetitorGlyph seed={c.glyph} size={16} /><span className="text-[13px] font-semibold text-gray-700 tracking-[-0.01em]">{c.name}</span></div>
          </div>
          {c.table.map((r, i) => (
            <div key={r.q} className={`grid grid-cols-[220px_1fr_1fr] lg:grid-cols-[260px_1fr_1fr] ${i < c.table.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="px-5 py-4 flex items-start gap-3 border-r border-gray-100 text-[13px] leading-[18.2px] font-medium text-gray-900 tracking-[-0.01em]">{r.q}</div>
              <div className="px-5 py-4 flex items-start gap-3 border-r border-gray-100 bg-[#fafafe]"><Status s={r.us[0]} /><p className="text-[13px] leading-[20.15px] text-gray-700">{r.us[1]}</p></div>
              <div className="px-5 py-4 flex items-start gap-3"><Status s={r.them[0]} /><p className="text-[13px] leading-[20.15px] text-gray-500">{r.them[1]}</p></div>
            </div>
          ))}
        </div>
        {/* below md */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 border-b border-gray-200">
            <div className="px-4 py-2.5 border-r border-gray-100 flex items-center"><UsMark h={16} /></div>
            <div className="px-4 py-2.5 flex items-center gap-2"><CompetitorGlyph seed={c.glyph} size={14} /><span className="text-xs font-semibold text-gray-700">{c.name}</span></div>
          </div>
          {c.table.map((r, i) => (
            <div key={r.q} className={i < c.table.length - 1 ? 'border-b border-gray-100' : ''}>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 tracking-[.05em] uppercase">{r.q}</div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-3 flex items-start gap-2 bg-[#fafafe]"><Status s={r.us[0]} /><p className="text-xs leading-[18px] text-gray-700">{r.us[1]}</p></div>
                <div className="px-4 py-3 flex items-start gap-2"><Status s={r.them[0]} /><p className="text-xs leading-[18px] text-gray-500">{r.them[1]}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

/* ---------- 7. Switching steps (HowWeWork tiles with "Step 1–3") ---------- */
const tones = ['violet', 'pink', 'blue']
const ease = 'cubic-bezier(.23,1,.32,1)'

function StepIllustration({ i, item }) {
  if (i === 1) return <NodeGraph />
  return (
    <div className="flex flex-col items-start gap-2.5">
      {item.pills.map((p, k) => (
        <span key={p} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`}>
          {i === 0
            ? <span className="w-4 h-4 rounded-full bg-indigo-brand flex items-center justify-center shrink-0"><svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1.5 4.2l1.6 1.6L6.5 2.4" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg></span>
            : <Avatar seed={k + 7} size={18} />}
          {p}{i === 2 && <span className="text-muted font-normal">Wk {k + 2}</span>}
        </span>
      ))}
    </div>
  )
}

export function SwitchSteps({ steps }) {
  const [active, setActive] = useState(0)
  return (
    <PageSection>
      <SectionHeading title="Switching takes three steps" body="A gradual move that keeps the current setup running until the new one has earned its place." className="mb-12 md:mb-14" bodyClass={descClass} />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
        {steps.map((t, i) => {
          const on = active === i
          return (
            <div key={t.label} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
              className="tile relative overflow-hidden bg-tile-base lg:h-[400px] lg:basis-0 min-w-0 outline-none"
              style={{ flexGrow: on ? 2.4 : 1, transition: `flex-grow .65s ${ease}` }} data-on={on}>
              <div className={`absolute inset-0 grain-${tones[i]} tile-fade`} style={{ transition: `opacity .65s ${ease}` }} />
              <div className="grain-noise" />
              <div className="tile-illus absolute left-6 top-6 hidden lg:block pointer-events-none w-[320px]" aria-hidden="true" style={{ transition: `opacity .45s ${ease} ${on ? '.2s' : '0s'}` }}>
                <StepIllustration i={i} item={t} />
              </div>
              <div className="relative h-full hidden lg:flex flex-col justify-end p-6">
                <div className="w-[180px]">
                  <span className="text-sm tile-label" style={{ transition: `color .65s ${ease}` }}>{t.label}</span>
                  <h4 className="mt-1.5 text-xl font-medium tracking-tight text-ink">{t.title}</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: `grid-template-rows .65s ${ease}` }}>
                  <div className="overflow-hidden">
                    <p className="tile-body pt-2 w-[370px] max-w-full text-sm leading-[1.6] text-ink/75" style={{ transition: `opacity .5s ${ease} ${on ? '.15s' : '0s'}` }}>{t.body}</p>
                  </div>
                </div>
              </div>
              <div className="lg:hidden relative p-6">
                <div className="mb-8 mt-2 pointer-events-none max-w-[320px]" aria-hidden="true"><StepIllustration i={i} item={t} /></div>
                <span className="text-sm text-ink/50">{t.label}</span>
                <h4 className="mt-1.5 text-lg font-medium text-ink">{t.title}</h4>
                <p className="pt-2 text-sm leading-[1.6] text-ink/75">{t.body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </PageSection>
  )
}
