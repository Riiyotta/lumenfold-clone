import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Row, Avatar, Wordmark, Check, Plus, Arrow } from '../../components/ui'
import LogoWall from '../../components/LogoWall'
import { LFade, FooterCTA, Rich, stacked, pad, H2, LEGACY, OUT_CIRC, IN_OUT_QUAD } from '../../components/product-legacy/shared'
import { Mock } from '../../components/product-legacy/mocks'
import { Glyph } from './AgentLanding'

const LG = '!text-base !px-6 !py-3 !rounded-full'

function Hero({ h }) {
  return (
    <Row>
      <div className={`${pad} pt-14 md:pt-20 pb-6`}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          <motion.div className="lg:w-[490px] lg:mr-10 shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={LEGACY}>
            <div className="h-10 flex items-center text-base font-medium text-ink">{h.tag}</div>
            <h1 className="mt-2 mb-8 text-[40px] md:text-[48px] leading-[1.1] tracking-[-0.15rem] text-ink [text-wrap:balance]">{h.title}</h1>
            <p className="mb-8 text-base md:text-lg leading-[1.6] text-ink/80">{h.body}</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link to="/book-a-demo" className={`btn-primary font-sans gap-2 ${LG}`}>{h.primary}<Arrow /></Link>
              <Link to="/pricing" className={`btn-secondary font-sans ${LG}`}>{h.secondary}</Link>
            </div>
          </motion.div>
          <motion.div className="relative flex-1 min-w-0 max-w-[600px] w-full aspect-[6/5] rounded-xl overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.15 }}>
            <Mock kind={h.mock} />
          </motion.div>
        </div>
      </div>
    </Row>
  )
}

function LogoRow({ label }) {
  return (
    <>
      <Row><LFade as="p" className="px-6 md:px-20 pt-16 md:pt-[120px] pb-8 text-center text-base md:text-lg text-muted max-w-[760px] mx-auto">{label}</LFade></Row>
      <LogoWall />
    </>
  )
}

function Values({ v }) {
  return (
    <Row>
      <div className={stacked}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-12 items-end">
          <LFade as="h2" className={H2}><Rich parts={v.title} /></LFade>
          <LFade as="p" className="text-base md:text-lg leading-[1.6] text-muted">{v.body}</LFade>
        </div>
        {/* IX2: centred heading scales .92 → 1 (300ms outCirc, delay 200ms) */}
        <motion.h3 className="mt-16 md:mt-24 mx-auto max-w-2xl text-center text-[24px] md:text-[30px] leading-[1.35] tracking-[-0.025em] text-ink"
          initial={{ scale: 0.92, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.3, ease: OUT_CIRC, delay: 0.2 }}>{v.center}</motion.h3>
        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-8">
          {v.cards.map((c, i) => (
            <LFade key={c.title} delay={i * 0.08} className="bg-white border border-line p-4 shadow-[0_2px_10px_#0f1a2f0f]">
              <div className="h-[200px] rounded-md overflow-hidden mb-5 flex"><Mock kind={c.mock} tone={c.tone} pad="p-4" /></div>
              <h3 className="font-sans text-xl leading-[1.4] font-medium text-ink px-1 pb-2">{c.title}</h3>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* Vertical tabs: accordion cards (menu on the left). Body opens: height 0→auto, scale .96→1, y 20→0, opacity 0→1 (inOutQuad). */
function VTabs({ t }) {
  const [on, setOn] = useState(0)
  return (
    <Row>
      <div className={stacked}>
        <LFade as="h2" className={`${H2} mb-10 md:mb-12`}>{t.title}</LFade>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="relative w-full lg:max-w-[640px] desktop:w-[60%] aspect-[4/3] rounded-xl overflow-hidden lg:order-2 lg:flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={on} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: IN_OUT_QUAD }}>
                <Mock kind={t.items[on].mock} tone={['violet', 'pink', 'blue'][on]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full lg:max-w-[480px] flex flex-col gap-3 lg:order-[-1]" role="tablist">
            {t.items.map((it, i) => {
              const a = on === i
              return (
                <div key={it.title} className={`border bg-white transition-colors duration-200 ${a ? 'border-indigo-brand/40 shadow-[0_2px_10px_#0f1a2f0f]' : 'border-line hover:bg-[#f9f9fa]'}`}>
                  <button role="tab" aria-selected={a} onClick={() => setOn(i)} className="w-full text-left px-6 py-5 font-display text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.02em] text-ink">{it.title}</button>
                  <AnimatePresence initial={false}>
                    {a && (
                      <motion.div key="b" className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: IN_OUT_QUAD }}>
                        <motion.div className="px-6 pb-6 origin-top" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.5, ease: IN_OUT_QUAD }}>
                          <p className="text-base md:text-lg leading-[1.6] text-muted">{it.body}</p>
                          <ul className="mt-4 grid gap-2">{it.checks.map(c => <li key={c} className="flex items-center gap-2.5 text-[15px] text-ink"><Check className="w-5 h-5 shrink-0" />{c}</li>)}</ul>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Row>
  )
}

function CaseStudy({ c }) {
  return (
    <Row>
      <div className={stacked}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <LFade>
            <h2 className={H2}>{c.title}</h2>
            <div className="mt-6 flex items-center gap-6">{c.logos.map(l => <Wordmark key={l} name={l} />)}</div>
            <p className="mt-6 text-base md:text-lg leading-[1.6] text-muted">{c.body}</p>
            <Link to="/customers" className="btn-secondary font-sans mt-8 gap-1.5">Read the story<Arrow className="w-3.5 h-3.5" /></Link>
          </LFade>
          <LFade className="relative aspect-[16/10] rounded-xl overflow-hidden"><img src={c.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></LFade>
        </div>
      </div>
    </Row>
  )
}

function Testimonial({ q }) {
  return (
    <Row>
      <div className={stacked}>
        <LFade className="relative overflow-hidden bg-[#f3f2ff] desktop:bg-white desktop:border desktop:border-line desktop:shadow-[0_4px_20px_#0c0b2c12] p-8 md:p-[60px]">
          <div className="relative max-w-[880px] mx-auto desktop:text-center">
            <blockquote className="font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.4] tracking-[-0.02em] text-ink">“{q.quote}”</blockquote>
            <div className="mt-8 flex items-center gap-3 desktop:justify-center">
              <Avatar seed={q.seed} size={48} />
              <div className="text-left"><div className="text-base font-medium text-ink">{q.name}</div><div className="text-sm text-muted">{q.role}</div></div>
            </div>
          </div>
          <svg viewBox="0 0 80 80" className="absolute -bottom-3 -right-3 w-24 h-24 opacity-80" fill="none">
            <path d="M40 8l28 16v32L40 72 12 56V24z" fill="#6056ff" fillOpacity=".08" stroke="#6056ff" strokeOpacity=".35" />
            <path d="M40 8v64M12 24l28 16 28-16" stroke="#6056ff" strokeOpacity=".35" />
          </svg>
        </LFade>
      </div>
    </Row>
  )
}

function AllFeatures({ a }) {
  return (
    <Row>
      <div className={`${pad} py-20 md:py-[100px]`}>
        <LFade className="max-w-2xl mb-12">
          <h3 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{a.title}</h3>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{a.body}</p>
        </LFade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {a.items.map(([t, b], i) => (
            <LFade key={t} delay={(i % 4) * 0.06} className="bg-white border border-indigo-ghost shadow-[0_4px_20px_#0d162f12] px-6 py-8">
              <span className="w-10 h-10 flex items-center justify-center bg-indigo-ghost"><Glyph i={i} className="w-6 h-6" /></span>
              <h4 className="mt-5 text-xl font-medium text-ink">{t}</h4>
              <p className="mt-2 text-base leading-[1.5] text-muted">{b}</p>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

function Team({ t }) {
  return (
    <Row>
      <div className={`${pad} pt-16 md:pt-[120px] pb-12 md:pb-28`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <LFade className="relative aspect-[4/3] rounded-xl overflow-hidden"><img src={t.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></LFade>
          <LFade>
            <h3 className={H2}><Rich parts={t.title} /></h3>
            <ul className="mt-6 grid gap-3">{t.checks.map(c => <li key={c} className="flex items-center gap-2.5 text-base text-ink"><Check className="w-5 h-5 shrink-0" />{c}</li>)}</ul>
            <ul className="mt-6 pt-6 border-t border-line grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {t.plus.map(p => <li key={p} className="flex items-center gap-2 text-sm text-muted"><span className="w-5 h-5 rounded-full border border-line flex items-center justify-center text-indigo-brand"><Plus className="w-2.5 h-2.5" /></span>{p}</li>)}
            </ul>
          </LFade>
        </div>
      </div>
    </Row>
  )
}

export default function UseCaseLegacy({ data }) {
  return (
    <>
      <Hero h={data.hero} />
      <LogoRow label={data.logoLabel} />
      <Values v={data.values} />
      <VTabs t={data.tabs} />
      {data.caseStudy && <CaseStudy c={data.caseStudy} />}
      <Testimonial q={data.testimonial} />
      <AllFeatures a={data.all} />
      <Team t={data.team} />
      <FooterCTA />
    </>
  )
}
