import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Grain, Avatar, Wordmark, Chevron, Play } from '../../components/ui'
import { VideoPoster, VideoModal, LFade, FAQ, NextSteps, Cursors, pad, stacked, H2, LEGACY } from '../../components/product-legacy/shared'
import { agentsAtWork as d, photo } from '../../content/productLegacy'

const PHOTOS = [0, 2, 3, 4, 5, 6, 7, 8, 9, 20, 48, 60, 180, 201, 370, 445].map(photo)

function Header() {
  const [open, setOpen] = useState(false)
  const h = d.hero
  return (
    <Row>
      <div className="relative overflow-hidden pt-24 md:pt-32 pb-24 lg:pb-40 desktop:pb-48">
        <img src={h.poster} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '0 100%' }} />
        <span className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 via-surface-dark/55 to-surface-dark/80" />
        <div className={`relative ${pad} flex flex-col items-center text-center`}>
          <motion.span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[13px] text-white/85 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={LEGACY}>Agents at Work · Session day</motion.span>
          <motion.h1 className="mt-6 max-w-3xl text-[34px] md:text-[48px] leading-[1.15] tracking-[-0.1rem] text-white [text-wrap:balance]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...LEGACY, delay: 0.1 }}>{h.title}</motion.h1>
          <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.2 }}>
            <a href="#watch" className="btn-primary font-sans">{h.cta}</a>
            <button onClick={() => setOpen(true)} className="btn-secondary font-sans !text-white !border-white/30 hover:!bg-white/10 gap-2"><Play className="w-4 h-4" />Play trailer</button>
          </motion.div>
          <motion.div className="mt-14 flex flex-wrap justify-center items-center gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...LEGACY, delay: 0.3 }}>
            {h.logos.map(l => <span key={l} className="max-h-14 flex items-center"><Wordmark name={l} className="!text-white/80" /></span>)}
          </motion.div>
        </div>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} poster={h.poster} title="Event trailer (video placeholder)" />
    </Row>
  )
}

const Pixels = ({ className }) => <span aria-hidden className={`aw-pixels absolute w-6 h-4 ${className}`} />

function Watch() {
  const w = d.watch
  return (
    <Row>
      <div id="watch" className={`relative ${stacked} scroll-mt-20`}>
        <Pixels className="top-10 right-10" /><Pixels className="bottom-12 left-8 rotate-180" />
        <LFade as="h2" className={`${H2} mb-10`}>{w.title}</LFade>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <LFade><VideoPoster src={w.featured.img} title={w.featured.title} /><h3 className="mt-3 font-display text-lg text-ink">{w.featured.title}</h3></LFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {w.side.map(v => <LFade key={v.title}><VideoPoster src={v.img} title={v.title} disc={48} /><h3 className="mt-3 font-sans text-base font-medium text-ink">{v.title}</h3></LFade>)}
          </div>
        </div>
      </div>
    </Row>
  )
}

function Speakers() {
  return (
    <Row>
      <div className={stacked}>
        <LFade as="h2" className={`${H2} mb-10`}>Speakers</LFade>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.speakers.map(([n, r], i) => (
            <LFade key={n} delay={(i % 3) * 0.06}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden flex items-end justify-center">
                <Grain tone={['violet', 'pink', 'blue'][i % 3]} />
                <div className="relative w-[78%] mb-[-4%]"><div className="w-full aspect-square [&>span]:!w-full [&>span]:!h-full [&_svg]:!w-full [&_svg]:!h-full"><Avatar seed={i * 5 + 2} size={240} rounded="rounded-t-full" /></div></div>
              </div>
              <div className="mt-3 font-display text-lg text-ink">{n}</div>
              <div className="text-sm text-muted">{r}</div>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

function Slider({ s, offset }) {
  const ref = useRef(null)
  const by = dir => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div className="mb-14 last:mb-0">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-2xl tracking-[-0.025em] text-ink">{s.title}</h3>
        <div className="flex gap-2">
          {[-1, 1].map(dir => <button key={dir} onClick={() => by(dir)} aria-label={dir < 0 ? `Previous ${s.title}` : `Next ${s.title}`} className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:bg-[#6056ff1a] transition-colors duration-150"><Chevron dir="right" className={`w-4 h-4 ${dir < 0 ? 'rotate-180' : ''}`} /></button>)}
        </div>
      </div>
      <div ref={ref} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {s.slides.map((t, i) => (
          <div key={t} className="snap-start shrink-0 w-[80%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <VideoPoster src={PHOTOS[(offset + i) % PHOTOS.length]} title={t} disc={48} />
            <div className="mt-3 text-[15px] font-medium text-ink">{t}</div>
            <div className="text-[13px] text-muted">{s.title.replace(/s$/, '')} · {18 + ((i * 7) % 20)} min</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Sessions() {
  return (
    <Row>
      <div className={stacked}>
        <LFade as="h2" className={`${H2} mb-10`}>All sessions</LFade>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {d.sessions.map((t, i) => (
            <LFade key={t} delay={(i % 3) * 0.06}>
              <VideoPoster src={PHOTOS[(i + 5) % PHOTOS.length]} title={t} disc={48} />
              <h3 className="mt-3 font-sans text-base font-medium text-ink">{t}</h3>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

export default function AgentsAtWork() {
  return (
    <>
      <Header />
      <Watch />
      <div className="relative">
        <Cursors names={['Grace · Insights', 'Leon · Eng']} />
        <Speakers />
        <Row><div className={stacked}>{d.sliders.map((s, i) => <Slider key={s.title} s={s} offset={i * 6} />)}</div></Row>
        <Sessions />
        <FAQ {...d.faq} legacy rotate={180} />
        <NextSteps {...d.next} />
        <Row>
          <div className={`${pad} pb-16 md:pb-24 flex justify-center`}><Link to="/pricing" className="btn-primary font-sans !text-base !px-6 !py-3">Start building for free</Link></div>
        </Row>
      </div>
    </>
  )
}
