import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE, Row, Reveal, SectionHeading, Avatar, AppIcon } from '../ui'
import { PGrain, GlassCoin, coinContent, Glyph, CheckDisc, PAD, accent } from './primitives'

/* ------------------------------------------------------------------ */
/* ClosingCTA (A.0)                                                    */
/* ------------------------------------------------------------------ */
const coinPos = [
  { top: '16%', left: '4%', r: -8 }, { top: '48%', left: '10%', r: 6 }, { top: '76%', left: '5%', r: -4 },
  { top: '14%', right: '4%', r: 7 }, { top: '50%', right: '10%', r: -6 }, { top: '74%', right: '5%', r: 5 },
]
export const genericCoins = [{ glyph: 'bolt' }, { glyph: 'mail' }, { glyph: 'chart' }, { glyph: 'calendar' }, { glyph: 'chat' }, { glyph: 'layers' }]

export function CtaTile({ palette = 'sales', coins = genericCoins, title, body, primary, secondary, to = '/', inner = 'py-16 md:py-24', titleClass = 'text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px]', className = '' }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <PGrain palette={palette} />
      <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden="true">
        {coins.slice(0, 6).map((c, i) => {
          const p = coinPos[i]
          return <GlassCoin key={i} className="absolute" style={{ top: p.top, left: p.left, right: p.right, transform: `rotate(${p.r}deg)` }}>{coinContent(c)}</GlassCoin>
        })}
      </div>
      <div className={`relative px-6 ${inner}`}>
        <Reveal className="relative mx-auto max-w-xl flex flex-col items-center text-center">
          <h2 className={`${titleClass} tracking-[-0.025em] text-ink`}>{title}</h2>
          {body && <p className="mt-5 max-w-lg text-base leading-[25.6px] text-ink/80">{body}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={to} className="btn-primary font-sans !rounded-full">{primary}</Link>
            {secondary && <Link to={to} className="btn-secondary font-sans !rounded-full !bg-white hover:!bg-[#f9f9fa]">{secondary}</Link>}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export function ClosingCTA(props) {
  return (
    <Row>
      <div className={PAD}><CtaTile {...props} /></div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ accordion (A.0)                                                 */
/* ------------------------------------------------------------------ */
const answerText = a => (typeof a === 'string' ? a : `${a.p} ${a.ul.join('. ')}.`)

export function Faq({ title, lead, link, items }) {
  const [open, setOpen] = useState(-1)
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: answerText(a) } })) }
  return (
    <Row>
      <div className={PAD}>
        <Reveal className="max-w-2xl mb-12 md:mb-14">
          <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{title}</h2>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{lead} <a href="mailto:support@lumenfold.example" className="text-indigo-brand hover:underline">{link}</a></p>
        </Reveal>
        <div className="border border-line divide-y divide-line">
          {items.map(([q, a], i) => {
            const on = open === i
            return (
              <div key={q}>
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}
                  className="group w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left font-sans hover:bg-gray-50/50 transition-colors duration-150">
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-150 ${on ? 'bg-indigo-brand border-indigo-brand text-white' : 'border-line group-hover:border-gray-400 text-muted'}`}>
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"><path d={on ? 'M2 6h8' : 'M6 2v8M2 6h8'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </span>
                  <span className="text-base md:text-lg leading-relaxed font-medium text-ink">{q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                      <div className="pb-5 pl-[52px] md:pl-[56px] pr-6 text-muted leading-relaxed">
                        {typeof a === 'string' ? <p>{a}</p> : <><p className="mb-3">{a.p}</p><ul className="list-disc pl-5 space-y-1.5">{a.ul.map(li => <li key={li}>{li}</li>)}</ul></>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* ExpandTiles (CLONE_SPEC 3.3 HowWeWork, parameterised)               */
/* Uses the .tile / .tile-fade / .tile-illus / .tile-body rules in index.css */
/* ------------------------------------------------------------------ */
const ease = 'cubic-bezier(.23,1,.32,1)'

export function ExpandTiles({ title, body, items, headingClass = '' }) {
  const [active, setActive] = useState(0)
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={title} body={body} bodyClass="max-w-lg" className={headingClass} />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {items.map((t, i) => {
            const on = active === i
            return (
              <div key={i} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                className="tile relative overflow-hidden bg-tile-base lg:h-[400px] lg:basis-0 min-w-0 outline-none"
                style={{ flexGrow: on ? 2.4 : 1, transition: `flex-grow .65s ${ease}` }} data-on={on}>
                <PGrain palette={t.tone} layerClass="tile-fade" style={{ transition: `opacity .65s ${ease}` }} />
                <div className="tile-illus absolute left-6 top-6 hidden lg:block pointer-events-none" aria-hidden="true" style={{ transition: `opacity .45s ${ease} ${on ? '.2s' : '0s'}` }}>
                  {t.illus}
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
                  <div className="mb-8 mt-2 pointer-events-none overflow-hidden max-[400px]:[zoom:0.88]" aria-hidden="true">{t.illus}</div>
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

/* Pill used in tile stacks: check disc + 16px icon + label */
function StackPill({ label, icon, seed, check = true, color, className = '', style }) {
  return (
    <span className={`glass-pill ${className}`} style={style}>
      {check && <CheckDisc color={color} />}
      {icon ? <Glyph name={icon} className="w-4 h-4" color="#4b40d6" /> : <AppIcon seed={seed} className="w-4 h-4" />}
      {label}
    </span>
  )
}

/* T1 IntegrationsPower tile visuals */
export function NodeDiagram({ chips }) {
  return (
    <div className="relative w-[290px] h-[160px]">
      <svg viewBox="0 0 290 160" className="absolute inset-0 w-full h-full" fill="none">
        <path d="M118 30C170 30 180 80 226 80" stroke="#6056ff" strokeOpacity=".45" strokeWidth="1.5" />
        <path d="M118 130C170 130 180 80 226 80" stroke="#6056ff" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      {chips.map((c, k) => (
        <span key={c} className="glass-pill absolute" style={{ left: 0, top: k ? 112 : 12 }}><AppIcon seed={k * 11 + 5} className="w-4 h-4" />{c}</span>
      ))}
      <span className="absolute w-11 h-11 rounded-full bg-white/80 backdrop-blur-glass shadow-glass flex items-center justify-center" style={{ left: 226, top: 58 }}>
        <Avatar seed={5} size={28} />
        <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-status-green ring-2 ring-white" />
      </span>
    </div>
  )
}
export function PillStack3({ pills, icons = ['bolt', 'shield', 'check'] }) {
  return (
    <div className="flex flex-col items-start gap-2.5">
      {pills.map((p, k) => <StackPill key={p} label={p} icon={icons[k]} className={k === 1 ? 'ml-6' : k === 2 ? 'ml-3' : ''} style={k === 2 ? { opacity: 0.55 } : undefined} />)}
    </div>
  )
}

/* DeployPaths (T3.6 / T4) visuals */
export function AvatarGraph({ color = '#6056ff' }) {
  const pts = [[0, 28], [110, 0], [185, 88]]
  return (
    <div className="relative w-[280px] h-[150px]">
      <svg viewBox="0 0 280 150" className="absolute inset-0 w-full h-full" fill="none">
        <path d="M44 50C80 50 84 22 110 22M154 22C190 22 190 110 185 110M44 50C80 50 90 92 110 92" stroke={color} strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      {pts.map(([x, y], k) => (
        <span key={k} className="absolute w-11 h-11 rounded-full bg-white/80 backdrop-blur-glass shadow-glass flex items-center justify-center" style={{ left: x, top: y, transform: 'rotate(-6deg)' }}>
          <Avatar seed={k * 4 + 1} size={28} />
          <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-status-green ring-2 ring-white" />
        </span>
      ))}
      <span className="absolute w-11 h-11 rounded-full flex items-center justify-center text-ink/35" style={{ left: 110, top: 70, border: '1.5px dashed rgba(13,22,47,.35)' }}>
        <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none"><path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </span>
    </div>
  )
}
export function NodeRow({ color = '#6056ff' }) {
  const nodes = [['clock', '09:00'], [null, 'run'], ['check', 'done']]
  return (
    <div className="relative w-[294px] h-[130px]">
      <svg viewBox="0 0 294 130" className="absolute inset-0 w-full h-full" fill="none">
        <path d="M54 55H120M174 55H240" stroke={color} strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      {nodes.map(([g, l], k) => (
        <div key={l} className="absolute flex flex-col items-center gap-2" style={{ left: k * 120, top: 29 }}>
          <span className="w-[54px] h-[52px] rounded-xl border border-white/60 bg-white/55 backdrop-blur-glass shadow-glass flex items-center justify-center">
            {g ? <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><Glyph name={g} className="w-[18px] h-[18px]" color={color} /></span> : <Avatar seed={8} size={32} />}
          </span>
          <span className="font-mono text-[10px] text-chip-muted">{l}</span>
        </div>
      ))}
    </div>
  )
}
export function PillStack5({ pills, color }) {
  const op = [0.55, 0.7, 0.85, 1, 1]
  const icons = ['chat', 'mail', 'doc', 'bolt', 'link']
  return (
    <div className="flex flex-col items-start gap-2">
      {pills.map((p, k) => <StackPill key={p} label={p} icon={icons[k]} color={color} className={k % 2 ? 'ml-6' : ''} style={{ opacity: op[k] }} />)}
    </div>
  )
}

export function DeployPaths({ copy, tones = ['sales', 'cs', 'marketing'] }) {
  const items = copy.items.map((t, i) => {
    const col = accent(tones[i]).a
    const illus = i === 0 ? <AvatarGraph color={col} /> : i === 1 ? <NodeRow color={col} /> : <PillStack5 pills={t.pills} color={col} />
    return { ...t, tone: tones[i], illus }
  })
  return <ExpandTiles title={copy.title} body={copy.body} items={items} />
}

/* ------------------------------------------------------------------ */
/* Evals panel (T3.5 / T4 EvalsFloor)                                  */
/* ------------------------------------------------------------------ */
const outQuint = [0.23, 1, 0.32, 1]
const chartPts = [74, 79, 77, 83, 86, 84, 89, 91, 90, 93, 94, 95]

export function EvalsPanel({ palette = 'sales', title, body, agent, rows, thresholds = [90, 90, 85, 90], caption }) {
  const ref = useRef(null)
  const go = useInView(ref, { amount: 0.3, once: true })
  const W = 560, H = 150, top = 10, bottom = 128
  const y = v => bottom - ((v - 70) / 30) * (bottom - top)
  const x = i => 8 + (i * (W - 16)) / (chartPts.length - 1)
  const line = chartPts.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(chartPts.length - 1)} ${bottom} L${x(0)} ${bottom} Z`
  const a = accent(palette).a
  return (
    <Row>
      <div className={PAD}>
        <SectionHeading title={title} body={body} className="!mb-10 md:!mb-12" />
        <div className="relative overflow-hidden">
          <PGrain palette={palette} />
          <div className="relative p-6 md:p-14 lg:p-20">
            <div ref={ref} className="border border-line bg-white overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[#f3f3f4]">
                <span className="w-6 h-6 rounded-full bg-[#f3f3f4] flex items-center justify-center overflow-hidden"><Avatar seed={6} size={24} /></span>
                <span className="text-[13.5px] font-semibold text-ink">{agent}</span>
              </div>
              <div className="px-5 pt-5 pb-4">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" fill="none">
                  {[80, 90, 100].map(v => (
                    <motion.g key={v} initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.9 }}>
                      <line x1="8" x2={W - 8} y1={y(v)} y2={y(v)} stroke="#f3f3f4" />
                      <text x={W - 8} y={y(v) - 4} textAnchor="end" fontFamily="Inter" fontSize="10" fill="#868a97">{v}%</text>
                    </motion.g>
                  ))}
                  <motion.path d={area} fill={a} fillOpacity=".08" initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} />
                  <motion.path d={line} stroke={a} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 1.1, delay: 0.2, ease: outQuint }} />
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ duration: 0.4, delay: 1.2 }}>
                    <line x1="8" x2={W - 8} y1={y(thresholds[0])} y2={y(thresholds[0])} stroke="#b42318" strokeOpacity=".55" strokeDasharray="4 4" />
                    <text x="12" y={y(thresholds[0]) - 5} fontFamily="Inter" fontSize="10" fill="#b42318">Threshold {thresholds[0]}%</text>
                  </motion.g>
                </svg>
                <p className="mt-3 text-[11.5px] text-muted">{caption[0]} <span aria-hidden="true">·</span> {caption[1]}</p>
              </div>
              {rows.map(([label, score], i) => {
                const pass = score >= thresholds[i]
                return (
                  <div key={label} className="flex items-center justify-between px-5 py-3 border-t border-[#f3f3f4]">
                    <span className="flex items-center gap-2.5 text-[13px] text-gray-700"><span className="w-1.5 h-1.5 rounded-full" style={{ background: pass ? '#0e9384' : '#b42318' }} />{label}</span>
                    <span className="text-[13px] font-medium tabular-nums" style={{ color: pass ? '#0d162f' : '#b42318' }}>{score}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}
