// /slack sections: A.18 SlackHero + ChatDemo, A.19 hairline-grid sections, ProgrammaticCTA, Final CTA.
// The chat script is our own; the spec notes only +400 / +1200 ms step offsets.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE, Row, Avatar, Arrow } from '../ui'
import { Btn, Rich, LineIcon, Mascot, logoPad, pad } from './lib'

/* Decorative shapes (own designs) at the spec's fixed offsets. */
const decoPos = [{ top: 80, left: '4%' }, { top: 200, right: '3%' }, { top: 500, right: '6%' }, { top: 400, left: '6%' }, { top: 700, right: '10%' }, { top: 900, left: '8%' }]
const decoShapes = [
  <><circle cx="20" cy="20" r="16" stroke="#6056ff" strokeOpacity=".4" fill="none" /><circle cx="20" cy="20" r="4" fill="#6056ff" fillOpacity=".3" /></>,
  <path d="M6 30L20 6l14 24z" stroke="#f472b6" strokeOpacity=".5" fill="none" />,
  <rect x="7" y="7" width="26" height="26" rx="7" stroke="#0e9384" strokeOpacity=".45" fill="none" transform="rotate(12 20 20)" />,
  <path d="M20 4v32M4 20h32" stroke="#6056ff" strokeOpacity=".35" strokeLinecap="round" />,
  <><circle cx="12" cy="20" r="7" stroke="#f59e0b" strokeOpacity=".5" fill="none" /><circle cx="28" cy="20" r="7" stroke="#f59e0b" strokeOpacity=".5" fill="none" /></>,
  <path d="M6 26c6-12 22-12 28 0" stroke="#0ea5e9" strokeOpacity=".5" fill="none" strokeLinecap="round" />,
]
export function SlackDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block z-0" aria-hidden="true">
      {decoPos.map((p, i) => <svg key={i} viewBox="0 0 40 40" className="absolute w-10 h-10 opacity-50" style={p}>{decoShapes[i]}</svg>)}
    </div>
  )
}

/* ---------- ChatDemo ---------- */
function Message({ m, show }) {
  return (
    <motion.div className="flex gap-3 px-4 py-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {m.app ? <span className="w-9 h-9 rounded-lg bg-indigo-ghost flex items-center justify-center shrink-0"><Mascot size={26} /></span> : <Avatar seed={m.seed} size={36} rounded="rounded-lg" />}
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-ink">{m.who}</span>
          {m.app && <span className="text-[10px] font-medium bg-indigo-brand/10 text-indigo-brand px-1.5 py-0.5 rounded">APP</span>}
          <span className="text-xs text-muted">{m.time}</span>
        </p>
        <p className="text-sm leading-relaxed text-ink/90 whitespace-pre-line">{m.body}</p>
        {m.actions && (
          <div className="mt-2 flex flex-col gap-1.5">
            {m.actions.map((a, i) => (
              <motion.div key={a} className="flex items-center gap-2 text-xs text-muted" initial={{ opacity: 0, x: -8 }} animate={show >= 1 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: i * 0.25 }}>
                <span className="w-4 h-4 rounded-full bg-[#ecfdf3] flex items-center justify-center"><svg viewBox="0 0 10 10" className="w-2 h-2"><path d="M2 5.2l2 2L8 3" stroke="#027a48" strokeWidth="1.6" fill="none" /></svg></span>{a}
              </motion.div>
            ))}
          </div>
        )}
        {m.reply && (
          <AnimatePresence>
            {show >= 2 && (
              <motion.div className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="mt-2 flex items-center gap-2 rounded-md border border-line bg-surface-secondary-light px-2.5 py-1.5">
                  <Avatar seed={m.reply.seed} size={18} rounded="rounded" />
                  <span className="text-xs text-ink truncate">{m.reply.text}</span>
                  <span className="ml-auto text-[11px] text-indigo-brand shrink-0">1 reply</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}
export function ChatDemo({ tabs }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [step, setStep] = useState(0) // each message has 3 sub-steps: shown, actions, reply
  const msgs = tabs[tab].messages
  const total = msgs.length * 3
  useEffect(() => { setStep(reduce ? msgs.length * 3 : 0) }, [tab])
  useEffect(() => {
    if (!inView || reduce) return
    if (step >= total) {
      const t = setTimeout(() => setTab(v => (v + 1) % tabs.length), 3200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep(s => s + 1), step % 3 === 0 ? 400 : 1200)
    return () => clearTimeout(t)
  }, [step, inView, total, reduce])
  return (
    <div ref={ref} className="relative min-h-[525px] rounded-xl border border-line bg-white overflow-hidden font-sans flex flex-col shadow-[0_24px_56px_-24px_rgba(13,22,47,.16)]">
      <div role="tablist" className="flex border-b border-line overflow-x-auto pr-no-scrollbar">
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" aria-selected={i === tab} onClick={() => setTab(i)}
            className={`font-sans shrink-0 px-4 py-3 text-sm font-medium border-r border-line last:border-r-0 transition-colors duration-150 ${i === tab ? 'bg-white text-ink' : 'bg-surface-secondary-light text-muted hover:text-ink'}`}># {t.label}</button>
        ))}
      </div>
      <div className="flex-1 py-3 flex flex-col gap-3">
        {msgs.map((m, i) => step > i * 3 && <Message key={tab + '-' + i} m={m} show={step - i * 3 - 1} />)}
      </div>
      <div className="m-3 rounded-lg border border-line px-3 py-2.5 text-sm text-muted">Message #{tabs[tab].label}</div>
    </div>
  )
}

export function SlackHero({ label, h1, body, ctas, tabs }) {
  return (
    <Row>
      <div className={`py-16 md:py-24 ${logoPad}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
            <p className="flex items-center gap-3 mb-6"><span className="w-8 h-8 rounded-lg bg-indigo-ghost flex items-center justify-center"><LineIcon name="chat" size={18} className="text-indigo-brand" /></span><span className="text-sm font-medium text-muted">{label}</span></p>
            <h1 className="font-medium text-[36px] md:text-[48px] lg:text-[60px] leading-tight tracking-[-0.025em] text-ink mb-6">{h1}</h1>
            <p className="text-lg md:text-xl leading-relaxed text-muted mb-8">{body}</p>
            <div className="flex flex-wrap gap-3">
              <Btn to={ctas[0].to} round={false}>{ctas[0].label}</Btn>
              <Btn to={ctas[1].to} kind="secondary" round={false}>{ctas[1].label}</Btn>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}><ChatDemo tabs={tabs} /></motion.div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- A.19 hairline sections ---------- */
function Head({ title, body, center = false }) {
  return (
    <motion.div className={`mb-10 md:mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}>
      <h2 className="font-medium text-[30px] md:text-[36px] leading-[1.25] tracking-[-0.025em] text-ink mb-4"><Rich parts={title} /></h2>
      {body && <p className="text-lg leading-relaxed text-muted">{body}</p>}
    </motion.div>
  )
}
const cell = { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 } }

export function TwoUpFeature({ title, body, items }) {
  return (
    <Row>
      <div className={`py-16 md:py-20 ${pad}`}>
        <Head title={title} body={body} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line">
          <div className="grid grid-cols-1 gap-px bg-line">
            {items.map((it, i) => (
              <motion.div key={it.title} className="bg-white p-6 md:p-8" {...cell} transition={{ ...EASE, delay: i * 0.05 }}>
                <span className="font-display text-sm text-indigo-brand">{i + 1}</span>
                <h3 className="mt-3 text-base font-medium text-ink mb-2">{it.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{it.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white p-6 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-sm rounded-xl border border-line bg-white font-sans shadow-[0_12px_32px_-16px_rgba(13,22,47,.18)]">
              <div className="px-4 py-2.5 border-b border-line text-[13px] font-medium text-ink"># refunds-review</div>
              <div className="p-4 flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-ghost flex items-center justify-center shrink-0"><Mascot size={22} /></span>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-ink">Lumenfold <span className="text-[10px] font-medium bg-indigo-brand/10 text-indigo-brand px-1.5 py-0.5 rounded">APP</span></p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/90">Refund of $640 for Halden Co. is over the limit. Approve?</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-md px-3 py-1 text-xs font-medium text-white bg-indigo-brand">Approve</span>
                    <span className="rounded-md px-3 py-1 text-xs font-medium text-ink border border-line">Decline</span>
                  </div>
                  <p className="mt-3 text-[11px] text-muted">Ana approved · run resumed 4s later</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

export function UseCaseGrid({ title, body, items }) {
  return (
    <Row>
      <div className="py-16 md:py-20">
        <div className={pad}><Head title={title} body={body} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border-y border-line">
          {items.map((it, i) => (
            <motion.div key={it.title} className="bg-white p-6 md:p-8" {...cell} transition={{ ...EASE, delay: (i % 2) * 0.05 }}>
              <h3 className="font-sans text-sm font-medium text-ink mb-2">{it.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Row>
  )
}

export function SplitExplainer({ title, paras, stats }) {
  return (
    <Row>
      <div className={`py-16 md:py-20 ${pad}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line">
          <motion.div className="bg-white p-8 md:p-10" {...cell} transition={EASE}>
            <h2 className="font-medium text-2xl md:text-[30px] leading-[1.3] tracking-[-0.025em] text-ink mb-6">{title}</h2>
            {paras.map(p => <p key={p} className="text-base leading-relaxed text-muted mt-4 first:mt-0">{p}</p>)}
          </motion.div>
          <div className="grid grid-cols-1 gap-px bg-line">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="bg-white px-8 md:px-10 py-6 flex flex-col justify-center" {...cell} transition={{ ...EASE, delay: i * 0.06 }}>
                <span className="font-display text-[36px] leading-tight font-medium tracking-[-0.025em] text-ink">{s.value}</span>
                <span className="mt-1 text-sm text-muted">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Row>
  )
}

export function ProgrammaticCTA({ title, chip }) {
  return (
    <Row innerClassName="bg-gradient-to-br from-white via-white to-indigo-50/30">
      <div className={`py-20 md:py-32 ${pad} flex flex-col items-center text-center`}>
        <motion.h2 className="max-w-3xl font-medium text-[30px] md:text-[36px] leading-[1.25] tracking-[-0.025em] text-ink" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}><Rich parts={title} /></motion.h2>
        <Link to={chip.to} className="group mt-10 inline-flex items-center gap-3 pl-2 pr-5 py-2.5 rounded-lg border border-black/10 hover:border-black/20 bg-white transition-colors duration-150">
          <span className="flex pl-2">{[3, 8, 5].map(s => <Avatar key={s} seed={s} size={28} className="-ml-2 ring-2 ring-white" />)}</span>
          <span className="text-base font-medium text-ink">{chip.label}</span>
          <Arrow className="w-4 h-4 text-ink transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Row>
  )
}

export function FinalCTA({ title, body, ctas }) {
  return (
    <Row>
      <div className={`py-20 md:py-28 ${pad} text-center flex flex-col items-center`}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE} className="flex flex-col items-center">
          <h2 className="max-w-2xl mb-4 font-medium text-[30px] md:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.025em] text-ink">{title}</h2>
          <p className="max-w-xl mb-8 text-lg text-muted">{body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Btn to={ctas[0].to} round={false}>{ctas[0].label}</Btn>
            <Btn to={ctas[1].to} kind="secondary" round={false}>{ctas[1].label}</Btn>
          </div>
        </motion.div>
      </div>
    </Row>
  )
}
