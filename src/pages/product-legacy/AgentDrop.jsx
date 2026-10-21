import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { LogoMark, Avatar, Arrow, Chevron, Wordmark } from '../../components/ui'
import { VideoPoster, LFade, FooterCTA, PrismMascot } from '../../components/product-legacy/shared'
import { Mock } from '../../components/product-legacy/mocks'
import { agentDrop as d, brands } from '../../content/productLegacy'

const W = 'max-w-content mx-auto px-6 md:px-12 lg:px-20'
const P2O = [0.25, 0.46, 0.45, 0.94] // power2.out

/* ---------- Hero: flicker intro (framer-motion replacement for the GSAP timeline) ---------- */
function Stars() {
  const pts = Array.from({ length: 46 }).map((_, i) => [(i * 61) % 100, (i * 37) % 60, i % 5 === 0 ? 1.6 : 0.9])
  return <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">{pts.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r * 0.18} fill="#fff" fillOpacity={i % 3 ? 0.5 : 0.9} />)}</svg>
}
// 8 stacked land layers (original art): base, 2 tree lines, 4 figures, 2 steps — listed back to front.
const LAND = [
  { d: 'M0 260 C240 200 480 230 720 210 S1200 190 1440 230 V400 H0z', fill: '#1d0b52' },
  { d: 'M0 290 C200 250 420 270 640 250 S1100 240 1440 270 V400 H0z', fill: '#24105e' },
  { trees: true, y: 268, fill: '#2a1464' },
  { step: true, x: 380, w: 220, y: 320, fill: '#331a73' },
  { step: true, x: 840, w: 260, y: 330, fill: '#331a73' },
  { person: true, x: 430, y: 320, s: 1, fill: '#4b2f9c' },
  { person: true, x: 960, y: 330, s: 1.1, fill: '#4b2f9c' },
  { person: true, x: 1180, y: 350, s: 0.9, fill: '#5a3cb0' },
]
function Layer({ l }) {
  if (l.d) return <path d={l.d} fill={l.fill} />
  if (l.trees) return <g fill={l.fill}>{Array.from({ length: 22 }).map((_, i) => <path key={i} d={`M${i * 68 + 10} ${l.y + 10} l18 -${40 + (i % 4) * 14} l18 ${40 + (i % 4) * 14}z`} />)}<rect y={l.y + 8} width="1440" height="200" /></g>
  if (l.step) return <rect x={l.x} y={l.y} width={l.w} height="90" rx="6" fill={l.fill} />
  return <g transform={`translate(${l.x} ${l.y}) scale(${l.s})`} fill={l.fill}><circle cx="0" cy="-58" r="11" /><path d="M-14 -44h28l6 44h-40z" /></g>
}

function Hero() {
  const reduce = useReducedMotion()
  const t = (delay, dur = 0.5, extra = {}) => reduce ? { duration: 0 } : { delay, duration: dur, ...extra }
  // dots/stars: fade .5s, then flicker in 30ms opacity steps between +0.5s and +0.74s
  const flick = { opacity: [0, 1, 0.15, 1, 0.3, 1, 0.1, 1, 0.4, 1], transition: t(0, 0.74, { times: [0, 0.676, 0.716, 0.757, 0.797, 0.838, 0.878, 0.919, 0.959, 1], ease: 'linear' }) }
  return (
    <section className="relative overflow-hidden min-h-[48.7rem] ad-hero-bg">
      <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 50% 35%, rgba(148,59,255,.35), transparent 70%)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0, 1.5, { ease: P2O })} />
      <motion.div className="absolute inset-0 ad-dots" initial={{ opacity: 0 }} animate={flick} />
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={flick}><Stars /></motion.div>
      <svg className="absolute bottom-0 left-0 w-full h-[26rem] md:h-[32rem]" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
        {LAND.map((l, i) => (
          <motion.g key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={t(0.9 + (LAND.length - 1 - i) * 0.1, 0.8, { ease: P2O })}><Layer l={l} /></motion.g>
        ))}
      </svg>
      <div className={`relative ${W} pt-24 md:pt-28 pb-[22rem] flex flex-col items-center text-center`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={t(0.8, 0.6, { ease: P2O })} className="flex items-center gap-2 text-white/80 text-sm"><LogoMark size={22} /><span className="font-display font-semibold tracking-[-0.03em] text-white text-[19px]">lumenfold</span></motion.div>
        <div className="relative mt-8">
          <motion.span aria-hidden className="absolute inset-0 font-display font-semibold text-[clamp(4.5rem,11svw,10rem)] leading-none tracking-[-0.05em] text-[#a78bfa] blur-[97px]" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={t(0.8, 0.6)}>{d.hero.title}</motion.span>
          <motion.h1 className="relative font-display font-semibold text-[clamp(4.5rem,11svw,10rem)] leading-none tracking-[-0.05em] text-white"
            initial={{ filter: 'brightness(0) contrast(0)', scale: 1 }}
            animate={{ filter: ['brightness(0) contrast(0)', 'brightness(3) contrast(3)', 'brightness(0.2) contrast(0.6)', 'brightness(2.4) contrast(2)', 'brightness(0.5) contrast(1)', 'brightness(1) contrast(1)'], scale: [1, 1, 1, 1, 1, 1, 1.05, 1] }}
            transition={reduce ? { duration: 0 } : { filter: { delay: 0.09, duration: 0.45, ease: 'linear' }, scale: { delay: 0.09, duration: 0.61, times: [0, 0.2, 0.4, 0.55, 0.65, 0.737, 0.868, 1] } }}>
            {d.hero.title}
          </motion.h1>
        </div>
        <motion.p className="mt-8 max-w-[34rem] text-xl leading-[1.5] text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={t(0.85, 0.6, { ease: P2O })}>{d.hero.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={t(0.95, 0.6, { ease: P2O })}><a href="#launches" className="ad-btn mt-8">{d.hero.cta}<Arrow /></a></motion.div>
      </div>
    </section>
  )
}

/* Folder edge: a tab-shaped top with an edge shadow, stacked over the previous section. */
function FolderEdge({ tab = 'left', fill = '#404040' }) {
  const x = tab === 'left' ? 6 : tab === 'mid' ? 38 : 64
  return (
    <svg className="absolute -top-[47px] left-0 w-full h-12 pointer-events-none" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden>
      <defs><filter id="ad-edge" x="-5%" y="-100%" width="110%" height="300%"><feDropShadow dx="0" dy="-1.2" stdDeviation="1.2" floodColor="#000" floodOpacity=".45" /></filter></defs>
      <path d={`M0 12V7.5Q0 6 1.5 6H${x}Q${x + 1.5} 6 ${x + 2.5} 3L${x + 3.5} 1Q${x + 4.2} 0 ${x + 5.5} 0H${x + 26}Q${x + 27.3} 0 ${x + 28} 1L${x + 29} 3Q${x + 30} 6 ${x + 31.5} 6H98.5Q100 6 100 7.5V12z`} fill={fill} filter="url(#ad-edge)" />
    </svg>
  )
}
function Folder({ tab, children, className = '' }) {
  return (
    <section className={`relative bg-[#404040] mt-12 ${className}`}>
      <FolderEdge tab={tab} />
      <div className={`${W} py-16 md:py-24`}>{children}</div>
    </section>
  )
}
const ADPill = ({ children }) => <span className="inline-flex items-center rounded-full bg-[#5f5d67] px-4 py-2 text-sm font-medium text-white">{children}</span>

/* Launch-card carousel: slidesPerView 1, spaceBetween 4%, centred, speed 300ms. */
function Launches() {
  const l = d.launches
  const [i, setI] = useState(0)
  const n = l.cards.length
  return (
    <section id="launches" className="relative bg-[#404040] -mt-[6%] md:-mt-[4%] z-[1]">
      <FolderEdge tab="mid" />
      <div className={`${W} py-16 md:py-24`}>
        <LFade className="max-w-2xl">
          <ADPill>{l.pill}</ADPill>
          <h2 className="mt-6 text-[30px] md:text-[40px] leading-[1.2] tracking-[-0.025em] text-white">{l.title}</h2>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-white/70">{l.body}</p>
        </LFade>
        <div className="mt-12 overflow-hidden" tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowRight') setI(Math.min(n - 1, i + 1)); if (e.key === 'ArrowLeft') setI(Math.max(0, i - 1)) }}>
          <div className="flex gap-[4%] transition-transform duration-300 ease-out" style={{ transform: `translateX(calc(${-i} * 104%))` }}>
            {l.cards.map((c, k) => (
              <div key={c.title} aria-hidden={k !== i} className="shrink-0 w-full grid grid-cols-1 md:grid-cols-[.8fr_1fr] rounded-2xl overflow-hidden bg-white text-ink shadow-[0_14px_20px_9px_#0000004f]">
                <div className="relative min-h-[260px] overflow-hidden">
                  <div className="absolute inset-y-0 -left-16 right-0 flex"><Mock kind={c.mock} tone={c.tone} /></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col items-start justify-center">
                  <span className="inline-flex rounded-full bg-tile-base px-3 py-1 text-[13px] font-medium text-indigo-brand">{c.day}</span>
                  <h3 className="mt-4 font-display text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.025em]">{c.title}</h3>
                  <p className="mt-4 text-base leading-[1.6] text-muted">{c.body}</p>
                  <Link to="/pricing" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-brand">{c.link}<Arrow className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} aria-label="Previous launch" className="w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30"><Chevron dir="right" className="w-4 h-4 rotate-180" /></button>
          {l.cards.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Launch ${k + 1}`} className={`h-2 rounded-full transition-all duration-300 ${k === i ? 'w-6 bg-white' : 'w-2 bg-white/30'}`} />)}
          <button onClick={() => setI(Math.min(n - 1, i + 1))} disabled={i === n - 1} aria-label="Next launch" className="w-11 h-11 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30"><Chevron dir="right" className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  )
}

function Demo() {
  const [q, setQ] = useState('')
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
      <div>
        <h2 className="text-[30px] md:text-[40px] leading-[1.2] tracking-[-0.025em] text-white">{d.demo.title}</h2>
        <div className="mt-8 flex items-center gap-3 rounded-full bg-white pl-5 pr-2 py-2 max-w-xl">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Describe the job you want done…" className="flex-1 min-w-0 bg-transparent outline-none text-[15px] text-ink placeholder:text-muted" />
          <Link to="/pricing" aria-label="Build agent" className="w-9 h-9 rounded-full bg-indigo-brand text-white flex items-center justify-center shrink-0"><Arrow /></Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{d.demo.chips.map(c => <button key={c} onClick={() => setQ(c)} className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm text-white/85 hover:bg-white/10 transition-colors duration-150">{c}</button>)}</div>
      </div>
      <div className="ad-bob w-32 md:w-40 mx-auto"><PrismMascot className="w-full h-auto" /></div>
    </div>
  )
}

export default function AgentDrop() {
  const [v1, ...rest] = d.videos
  return (
    <div className="ad-page pb-1">
      <Hero />
      <Launches />
      <Folder tab="left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <LFade><ADPill>Teaser</ADPill><h2 className="mt-6 text-[30px] md:text-[40px] leading-[1.2] tracking-[-0.025em] text-white">{d.teaser.title}</h2><p className="mt-5 text-base md:text-lg leading-[1.6] text-white/70">{d.teaser.body}</p></LFade>
          <LFade className="relative aspect-[4/3] rounded-2xl overflow-hidden"><img src={d.teaser.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></LFade>
        </div>
      </Folder>
      <Folder tab="right"><LFade as="h2" className="mb-8 text-2xl md:text-3xl text-white">{v1.title}</LFade><VideoPoster src={v1.img} title={v1.title} radius="rounded-2xl" /></Folder>
      {[rest.slice(0, 2), rest.slice(2, 4)].map((pair, k) => (
        <Folder key={k} tab={k ? 'right' : 'mid'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {pair.map(v => <LFade key={v.title}><VideoPoster src={v.img} title={v.title} radius="rounded-2xl" /><h3 className="mt-4 text-lg font-display text-white">{v.title}</h3></LFade>)}
          </div>
        </Folder>
      ))}
      <Folder tab="left"><Demo /></Folder>
      <Folder tab="mid">
        <LFade className="max-w-3xl mx-auto text-center">
          <p className="font-display text-[24px] md:text-[32px] leading-[1.35] tracking-[-0.02em] text-white">“{d.testimonial.quote}”</p>
          <div className="mt-8 inline-flex items-center gap-3"><Avatar seed={d.testimonial.seed} size={48} /><span className="text-left"><span className="block text-white font-medium">{d.testimonial.name}</span><span className="block text-sm text-white/60">{d.testimonial.role}</span></span></div>
        </LFade>
      </Folder>
      <section className="relative bg-[#404040] mt-12 overflow-hidden pl-marquee">
        <FolderEdge tab="right" />
        <div className="py-14">
          <div className="pl-marquee-track">{[0, 1, 2].map(c => brands.slice(0, 22).map(nm => <div key={c + nm} aria-hidden={c > 0} className="pl-marquee-cell flex justify-center"><Wordmark name={nm} size="sm" className="!text-white/70" /></div>))}</div>
        </div>
      </section>
      <section className="relative bg-[#404040] mt-12">
        <FolderEdge tab="left" />
        <div className="[&_section>div]:border-white/10"><FooterCTA dark /></div>
      </section>
    </div>
  )
}

