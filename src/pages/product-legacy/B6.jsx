import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Row, PillTabs, Avatar, AppIcon } from '../../components/ui'
import { CenteredHero, LHeading, LFade, BentoCards, TestimonialGrid, FooterCTA, VideoPoster, HeroLines, Pill, Rich, pad, stacked, H1, LEGACY } from '../../components/product-legacy/shared'
import { Mock } from '../../components/product-legacy/mocks'
import { apiPage, multiAgents as m } from '../../content/productLegacy'

/* ---------- /api ---------- */
export function ApiPage() {
  const b = apiPage.bento
  return (
    <>
      <CenteredHero {...apiPage.hero} />
      <Row>
        <div className={stacked}>
          <LHeading pill={b.pill} title={b.title} className="mb-12 md:mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {b.cards.map((c, i) => (
              <LFade key={c.title} delay={(i % 2) * 0.08} className="bg-white border border-line overflow-hidden flex flex-col">
                <div className="h-[260px] pb-2.5 flex"><Mock kind={c.mock} tone={c.tone} pad="p-6" /></div>
                <div className="px-6 pb-7 pt-3">
                  <h3 className="font-sans text-xl leading-7 font-medium text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-[1.6] text-muted">{c.body}</p>
                </div>
              </LFade>
            ))}
          </div>
        </div>
      </Row>
      {/* The original renders an empty security wrapper here: nothing to show. */}
      <FooterCTA />
    </>
  )
}

/* ---------- /multi-agents ---------- */
function TemplateTabs() {
  const [tab, setTab] = useState(0)
  const key = m.templates.tabs[tab]
  return (
    <Row>
      <div className={`${stacked} overflow-hidden`}>
        <LFade className="mb-8"><PillTabs tabs={m.templates.tabs} active={tab} onChange={setTab} /></LFade>
        <AnimatePresence mode="wait">
          <motion.div key={key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 [scrollbar-width:none]">
            {m.templates.sets[key].map(([name, desc, tag], i) => (
              <Link to="/workflows" key={name} className="snap-start shrink-0 w-[280px] bg-white border border-line p-5 flex flex-col gap-3 transition-colors duration-150 hover:bg-[#f9f9f9]">
                <AppIcon seed={i + tab * 6} className="w-8 h-8" />
                <h3 className="font-display text-base font-medium tracking-[-0.025em] text-ink">{name}</h3>
                <p className="text-sm leading-[1.6] text-muted flex-1">{desc}</p>
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-line">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-ink"><Avatar seed={i * 3 + tab} size={18} />Lumenfold</span>
                  <span className="rounded-full bg-tile-base px-2 py-0.5 text-[11px] text-chip-muted">{tag}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Row>
  )
}

function PatternTabs() {
  const [tab, setTab] = useState(0)
  const kinds = ['team', 'score', 'research']
  return (
    <Row>
      <div className={`${pad} pt-12 md:pt-20`}>
        <LFade className="flex justify-center"><PillTabs tabs={m.patterns.tabs} active={tab} onChange={setTab} /></LFade>
        <div className="mt-8 relative h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={tab} className="absolute inset-0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <Mock kind={kinds[tab]} tone={['violet', 'pink', 'blue'][tab]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Row>
  )
}

export function MultiAgents() {
  const h = m.hero
  return (
    <>
      <Row className="overflow-hidden">
        <div className={`relative ${pad} pt-20 pb-12 md:pb-20`}>
          <HeroLines />
          <div className="relative mx-auto max-w-[55rem] text-center flex flex-col items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={LEGACY}><Pill className="mb-8">{h.pill}</Pill></motion.div>
            <motion.h1 className={H1} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...LEGACY, delay: 0.1 }}><Rich parts={h.title} /></motion.h1>
            <motion.p className="mt-5 max-w-[42rem] text-lg md:text-xl leading-[1.5] text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.2 }}>{h.body}</motion.p>
            <motion.div className="pt-10 flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.3 }}>
              <Link to="/pricing" className="btn-primary font-sans">{h.primary}</Link>
              <Link to="/book-a-demo" className="btn-secondary font-sans">{h.secondary}</Link>
            </motion.div>
          </div>
          <LFade className="relative mx-auto mt-14 md:mt-20 w-full max-w-[900px]"><VideoPoster src={h.video} title={h.videoTitle} pulse /></LFade>
        </div>
      </Row>
      <TemplateTabs />
      <PatternTabs />
      <BentoCards {...m.bento} renderMedia={c => <Mock kind={c.mock} tone={c.tone} />} />
      <TestimonialGrid />
      <FooterCTA />
    </>
  )
}
