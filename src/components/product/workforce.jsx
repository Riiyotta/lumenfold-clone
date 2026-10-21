// /workforce: A.8 SplitTitleHero + workflow canvas, and a data-driven ExpandTiles (CS 3.3 layout).
// ExpandTiles is rebuilt here (not imported) because the homepage Tiles component takes no props and
// /workforce needs two instances with their own copy, palettes and illustrations.
import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, Row, SectionHeading, Avatar, AppIcon, LogoMark } from '../ui'
import { Btn, GrainPanel, pad } from './lib'
import { FlowCanvas } from './flow'

export function SplitTitleHero({ h1, body, ctas, graph, status, chip }) {
  return (
    <Row>
      <div className={`pt-10 md:pt-16 overflow-hidden ${pad}`}>
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-8 lg:gap-x-10 items-center pb-10 md:pb-14"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <h1 className="lg:col-span-7 text-[48px] leading-[1.2] tracking-[-0.15rem] [text-wrap:balance] text-ink">{h1}</h1>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="max-w-xl text-base leading-[1.6] text-muted">{body}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Btn to={ctas[0].to}>{ctas[0].label}</Btn>
              <Btn to={ctas[1].to} kind="secondary">{ctas[1].label}</Btn>
            </div>
          </div>
        </motion.div>
        <motion.div className="pb-6 md:pb-12 lg:pb-20" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}>
          <div className="relative overflow-hidden p-3 md:p-6 lg:p-8">
            <GrainPanel palette="sales" />
            <motion.div className="relative" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={EASE}>
              <FlowCanvas graph={graph} height={460} className="border border-line">
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-line">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  <span className="text-sm font-medium text-ink">{status}</span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-line">
                  <AppIcon seed={chip.seed} className="w-4 h-4" />
                  <span className="text-sm font-medium text-ink">{chip.label}</span>
                </div>
              </FlowCanvas>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Row>
  )
}

/* ---------- Tile illustrations (original; 300 x 140-148) ---------- */
const CheckDot = () => (
  <span className="w-4 h-4 rounded-full bg-indigo-brand flex items-center justify-center shrink-0">
    <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1.5 4.2l1.6 1.6L6.5 2.4" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
  </span>
)
const Bubble = ({ x, y, children, dim }) => (
  <span className="absolute w-11 h-11 rounded-full bg-white/80 backdrop-blur-glass shadow-glass flex items-center justify-center" style={{ left: x, top: y, opacity: dim ? 0.6 : 1 }}>{children}</span>
)

function Illus({ id, pills = [] }) {
  if (id === 'pills') return (
    <div className="flex flex-col items-start gap-2.5 w-[300px]">
      {pills.map((p, k) => <span key={p} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`}>{<CheckDot />}{p}</span>)}
    </div>
  )
  if (id === 'hub') return (
    <div className="relative w-[300px] h-[140px]">
      <svg viewBox="0 0 300 140" className="absolute inset-0" fill="none">
        <path d="M150 70L42 22M150 70L42 118M150 70L258 22M150 70L258 118" stroke="#6056ff" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      <span className="absolute left-[124px] top-[44px] w-[52px] h-[52px] rounded-2xl bg-white/85 backdrop-blur-glass shadow-glass flex items-center justify-center"><LogoMark size={26} /></span>
      {[[20, 0, 1], [20, 96, 6], [236, 0, 12], [236, 96, 17]].map(([x, y, s]) => <Bubble key={s} x={x} y={y}><AppIcon seed={s} className="w-6 h-6" /></Bubble>)}
    </div>
  )
  if (id === 'review') return (
    <div className="flex flex-col items-start gap-2.5 w-[300px]">
      {pills.map((p, k) => (
        <span key={p} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`}><Avatar seed={k + 4} size={18} />{p}<span className={k === 2 ? 'text-muted font-normal' : 'text-status-green font-normal'}>{k === 2 ? 'Waiting' : 'Approved'}</span></span>
      ))}
    </div>
  )
  if (id === 'placeholder') return (
    <div className="relative w-[300px] h-[148px]">
      <svg viewBox="0 0 300 148" className="absolute inset-0" fill="none">
        <path d="M44 30C90 30 100 74 128 74M44 118C90 118 100 74 128 74M172 74H236" stroke="#6056ff" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      <Bubble x={0} y={8}><Avatar seed={3} size={28} /></Bubble>
      <Bubble x={0} y={96}><Avatar seed={8} size={28} /></Bubble>
      <Bubble x={128} y={52}><Avatar seed={5} size={28} /></Bubble>
      <span className="absolute left-[236px] top-[52px] w-11 h-11 rounded-full flex items-center justify-center text-[18px] text-ink/40" style={{ border: '1.5px dashed rgba(13,22,47,.35)' }}>+</span>
    </div>
  )
  if (id === 'typing') return (
    <div className="w-[300px] h-[140px] flex items-center">
      <div className="w-full flex items-center gap-2 rounded-full border border-white/60 bg-white/70 backdrop-blur-glass shadow-glass pl-4 pr-1.5 py-1.5">
        <span className="text-[12.5px] font-medium text-ink truncate">{pills[0]}</span>
        <span className="pr-caret inline-block bg-indigo-brand rounded-full shrink-0" style={{ width: 1.5, height: 14 }} />
        <span className="ml-auto w-7 h-7 rounded-full bg-indigo-brand flex items-center justify-center shrink-0">
          <svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </div>
  )
  // 'models': stack of model chips
  return (
    <div className="relative w-[300px] h-[140px]">
      {pills.map((p, k) => (
        <span key={p} className="glass-pill absolute" style={{ left: k * 22, top: k * 34, opacity: k === pills.length - 1 ? 0.6 : 1 }}>
          <span className="w-4 h-4 rounded-[5px]" style={{ background: ['#6056ff', '#0e9384', '#f472b6', '#f59e0b'][k % 4] }} />{p}
        </span>
      ))}
    </div>
  )
}

const ease = 'cubic-bezier(.23,1,.32,1)'
export function ExpandTiles({ title, body, bodyClass = 'max-w-xl', items }) {
  const [active, setActive] = useState(0)
  return (
    <Row>
      <div className={`py-12 md:py-28 ${pad}`}>
        <SectionHeading title={title} body={body} bodyClass={bodyClass} />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {items.map((t, i) => {
            const on = active === i
            return (
              <div key={t.title} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} data-on={on}
                className="tile relative overflow-hidden bg-tile-base lg:h-[400px] lg:basis-0 min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
                style={{ flexGrow: on ? 2.4 : 1, transition: `flex-grow .65s ${ease}` }}>
                <div className="tile-fade absolute inset-0" style={{ transition: `opacity .65s ${ease}` }}><GrainPanel palette={t.palette} /></div>
                <div className="tile-illus absolute left-6 top-6 hidden lg:block pointer-events-none" aria-hidden="true" style={{ transition: `opacity .45s ${ease} ${on ? '.2s' : '0s'}` }}>
                  <Illus id={t.illus} pills={t.pills} />
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
                  <div className="mb-8 mt-2 pointer-events-none overflow-hidden" aria-hidden="true"><Illus id={t.illus} pills={t.pills} /></div>
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
