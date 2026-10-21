import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCases } from '../content'
import { EASE, Row, SectionHeading, PillTabs, Grain, AppIcon, Avatar } from './ui'

function Tag({ seed, children, indigo }) {
  if (indigo) return <span className="inline-flex items-center gap-1.5 rounded-full bg-white/55 border border-white/60 backdrop-blur-glass-lg shadow-glass-sm pl-1 pr-3 py-1 text-xs leading-[18px] font-medium text-accent-text"><span className="w-6 h-6 rounded-full bg-white flex items-center justify-center"><AppIcon seed={seed} className="w-4 h-4" /></span>{children}</span>
  return <span className="glass-tag"><span className="w-[17px] h-[17px] rounded-full bg-white flex items-center justify-center"><AppIcon seed={seed} className="w-3 h-3" /></span>{children}</span>
}

function Mock({ kind, i }) {
  if (kind === 'tags') return (
    <div className="flex flex-col items-center gap-2">
      <Tag seed={i} indigo>Score: 87</Tag>
      <div className="flex gap-1.5"><Tag seed={i + 1}>Fit</Tag><Tag seed={i + 2}>Intent</Tag></div>
    </div>
  )
  if (kind === 'calendar') return (
    <div className="rounded bg-white/55 border border-white/60 backdrop-blur-glass shadow-glass-sm p-3 w-[150px] mx-auto">
      <div className="grid grid-cols-5 gap-1.5">
        {['M', 'T', 'W', 'T', 'F', 9, 10, 11, 12, 13].map((d, k) => (
          <span key={k} className={`h-6 rounded-md flex items-center justify-center text-[10px] ${k === 7 ? 'bg-indigo-brand text-white font-semibold shadow-calendar-active' : 'text-chip-muted'}`}>{d}</span>
        ))}
      </div>
    </div>
  )
  if (kind === 'list') return (
    <ul className="flex flex-col gap-2.5 text-[13px] leading-[17.9px] text-ink mx-auto">
      {['Company size', 'Recent news', 'Open roles'].map((t, k) => (
        <li key={t} className="flex items-center gap-2.5"><span className={`w-1.5 h-1.5 rounded-full ${k === 0 ? 'bg-indigo-brand' : 'bg-ink/30'}`} />{t}</li>
      ))}
    </ul>
  )
  if (kind === 'timeline') return (
    <div className="flex flex-col gap-0 mx-auto">
      {['Thank-you note', 'Recap sent', 'Check in day 5'].map((t, k) => (
        <div key={t} className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <span className="w-[18px] h-[18px] rounded-full bg-white/70 shadow-glass-sm text-[10px] font-semibold text-accent-text flex items-center justify-center">{k + 1}</span>
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
          <span className={`w-6 rounded-t ${k === 2 ? 'bg-indigo-brand' : 'bg-ink/[.12]'}`} style={{ height: h }} />
          <span className="text-[11px] tabular-nums text-chip-muted">Q{k + 1}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className="relative w-[150px] h-[120px] mx-auto">
      {[0.32, 0.44, 0.55].map((o, k) => (
        <div key={k} className="absolute w-[120px] h-[94px] rounded border border-white/60 shadow-glass-sm p-2" style={{ left: k * 12, top: k * 10, background: `rgba(255,255,255,${o})` }}>
          {k === 2 && <div className="flex items-center gap-1.5"><Avatar seed={i} size={16} /><span className="text-[10px] font-medium text-chip-muted">At risk</span></div>}
        </div>
      ))}
    </div>
  )
}

const pop = { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
const popItem = delay => ({ initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { ...pop, delay } })

// Popover scene: a short request → typing → tool run → reply exchange, revealed step by step.
const scripts = {
  tags: ['Score the signups from today', 'Checked 14 profiles against your buyer fit', '3 hot leads sent to the sales channel'],
  calendar: ['Find time with the design team', 'Compared 5 calendars for next week', 'Booked Thursday 10:30 and sent invites'],
  list: ['Brief me on Northwind before 2pm', 'Read news, filings and open roles', 'One-page brief is in your inbox'],
  timeline: ['Follow up with everyone from the demo', 'Drafted 6 personal notes from call notes', 'Queued to send at 9am their time'],
  bars: ['Check this quote against the rules', 'Compared discount to tier limits', 'Within policy, ready for approval'],
  stack: ['Who might churn this quarter?', 'Scanned usage and ticket trends', '4 accounts flagged with reasons'],
}

function Dots() {
  return (
    <span className="inline-flex gap-1 px-3 py-2.5 rounded-2xl rounded-bl-md bg-white/80 shadow-glass-sm">
      {[0, 1, 2].map(k => (
        <motion.span key={k} className="w-1.5 h-1.5 rounded-full bg-ink/40" animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: k * 0.15, ease: 'easeInOut' }} />
      ))}
    </span>
  )
}

function ChatScene({ kind, i }) {
  const [ask, work, reply] = scripts[kind] || scripts.list
  const [step, setStep] = useState(0)
  useEffect(() => {
    const ts = [450, 1250, 2100, 2700].map((ms, k) => setTimeout(() => setStep(k + 1), ms))
    return () => ts.forEach(clearTimeout)
  }, [])
  const bubble = { initial: { opacity: 0, y: 8, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, scale: 0.96 }, transition: { type: 'spring', stiffness: 380, damping: 26 } }
  return (
    <div className="relative h-full flex flex-col justify-end gap-2 p-4 text-[12.5px] leading-[18px]">
      <motion.div {...bubble} className="self-end max-w-[230px] rounded-2xl rounded-br-md bg-indigo-brand text-white px-3 py-2 shadow-calendar-active">{ask}</motion.div>
      <AnimatePresence mode="popLayout">
        {step === 1 && <motion.div key="dots" {...bubble} className="self-start flex items-end gap-2"><Avatar seed={i + 4} size={22} /><Dots /></motion.div>}
        {step >= 2 && (
          <motion.div key="work" {...bubble} className="self-start ml-[30px]">
            <span className="glass-tag !pr-3 !py-1">
              <span className="w-[17px] h-[17px] rounded-full bg-white flex items-center justify-center"><AppIcon seed={i + 2} className="w-3 h-3" /></span>
              {step === 2 ? <><span className="spinner !w-2.5 !h-2.5 !border" />Working…</> : work}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {step >= 3 && (
        <motion.div {...bubble} className="self-start flex items-end gap-2">
          <Avatar seed={i + 4} size={22} />
          <span className="max-w-[230px] rounded-2xl rounded-bl-md bg-white/90 text-ink px-3 py-2 shadow-glass-sm">{reply}</span>
        </motion.div>
      )}
      {step >= 4 && (
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          className="self-start ml-[30px] inline-flex items-center gap-1 text-[11px] font-medium text-eval-teal">
          <svg viewBox="0 0 12 12" className="w-3 h-3"><circle cx="6" cy="6" r="6" fill="#0e9384" /><path d="M3.4 6.2l1.7 1.7 3.5-3.6" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
          Done in 2.4s
        </motion.div>
      )}
    </div>
  )
}

function Card({ c, i, visible, finePointer }) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useRef()
  // floating-ui useHover on the original: delay { open: 450, close: 0 }, only for (hover: hover) and (pointer: fine).
  useEffect(() => {
    clearTimeout(t.current)
    if (hover && finePointer) t.current = setTimeout(() => setOpen(true), 450)
    else setOpen(false)
    return () => clearTimeout(t.current)
  }, [hover, finePointer])

  return (
    <motion.div className="relative flex flex-col h-full" style={{ zIndex: hover ? 30 : undefined }}
      initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ ...EASE, delay: (i % 4) * 0.06 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative min-h-[230px] flex-1 overflow-hidden">
        <Grain />
        <div className="relative h-full min-h-[230px] px-5 py-6 flex flex-col justify-center" style={{ filter: hover ? 'blur(6px)' : 'none', opacity: hover ? 0.65 : 1, transition: 'filter .25s ease, opacity .25s ease' }}>
          <Mock kind={c.kind} i={i} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(4px)', transition: 'opacity .25s ease, transform .25s ease' }}>
          <Link to="/use-cases/sales" className="rounded-full border border-white/60 bg-white/90 backdrop-blur-glass-lg px-4 py-2 text-[13px] font-medium text-ink shadow-glass-pill transition-transform duration-150 hover:scale-[1.04] hover:bg-white active:scale-95"
            style={{ pointerEvents: hover ? 'auto' : 'none' }}>
            Read more
          </Link>
        </div>
      </div>
      <h3 className="font-sans mt-4 text-base leading-6 text-ink">{c.title}</h3>
      <p className="mt-1.5 text-sm leading-[21px] text-muted">{c.body}</p>
      <AnimatePresence>
        {open && (
          <motion.div key="pop" initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }} transition={pop}
            style={{ transformOrigin: 'top center' }}
            className="hidden xl:block absolute left-full top-0 ml-4 z-30 w-[372px] bg-white border border-line shadow-mega-menu p-4 pointer-events-none">
            <motion.div {...popItem(0)} className="relative h-[220px] overflow-hidden"><Grain /><ChatScene kind={c.kind} i={i} /></motion.div>
            <motion.div {...popItem(0.08)} className="mt-3 text-sm font-medium text-ink">{c.title}</motion.div>
            <motion.div {...popItem(0.16)} className="text-sm text-muted">{c.body}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function UseCases() {
  const [tab, setTab] = useState(0)
  const grid = useRef(null)
  const [visible, setVisible] = useState(false)
  const [finePointer, setFinePointer] = useState(false)
  // Original: one IntersectionObserver on the grid wrapper (threshold 0.15) reveals every card; tab change remounts the grid.
  useEffect(() => {
    const el = grid.current
    if (!el) return
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { setVisible(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => { setFinePointer(matchMedia('(hover: hover) and (pointer: fine)').matches) }, [])
  return (
    <Row>
      <div className="py-12 md:py-28 px-6 md:px-12 lg:px-20">
        <SectionHeading title={useCases.title} body={useCases.body} bodyClass="max-w-lg" />
        <div className="flex mb-5 md:mb-6"><PillTabs tabs={useCases.tabs} active={tab} onChange={setTab} more={useCases.more} /></div>
        <div ref={grid}>
          <div key={tab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {useCases.cards.map((c, i) => <Card key={c.title} c={c} i={i} visible={visible} finePointer={finePointer} />)}
          </div>
        </div>
        <div className="mt-12 md:mt-14 pt-10 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-lg md:text-xl leading-7 text-ink">{useCases.ctaText}</p>
          <Link to="/book-a-demo" className="btn-primary font-sans !rounded-full self-start sm:self-auto">{useCases.cta}</Link>
        </div>
      </div>
    </Row>
  )
}
