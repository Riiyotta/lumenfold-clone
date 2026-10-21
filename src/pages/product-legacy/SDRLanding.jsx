import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Row, Avatar, Grain, Arrow, Check } from '../../components/ui'
import { CenteredHero, LogoMarquee, LHeading, LFade, FooterCTA, Counter, Rich, pad, stacked, H2 } from '../../components/product-legacy/shared'
import { Mock } from '../../components/product-legacy/mocks'
import { Glyph } from './AgentLanding'

/* ROI stats: wireframe backdrop, 205px portrait + text column, 5 counters. */
function Roi({ r }) {
  return (
    <Row className="overflow-hidden">
      <div className={`relative ${pad} py-16`}>
        <svg className="pointer-events-none absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {Array.from({ length: 11 }).map((_, i) => <path key={i} d={`M${i * 10} 0V100M0 ${i * 10}H100`} stroke="#6056ff" strokeOpacity=".06" strokeWidth=".15" />)}
        </svg>
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-[2.2rem] text-center md:text-left">
          <LFade className="relative w-[205px] h-[260px] shrink-0 overflow-hidden flex items-end justify-center">
            <Grain tone="violet" />
            <div className="relative mb-[-6px]"><Avatar seed={13} size={205} rounded="rounded-none" /></div>
          </LFade>
          <div className="max-w-[80ch] min-w-0">
            <LFade as="h2" className={`${H2} max-w-[600px] desktop:max-w-[800px] tracking-[-0.01em]`}><Rich parts={r.title} /></LFade>
            <LFade as="p" className="mt-4 text-lg text-muted">{r.body}</LFade>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 desktop:flex desktop:gap-12 gap-x-6 gap-y-8">
              {r.stats.map(([v, l]) => (
                <LFade key={l}>
                  <Counter value={v} className="block font-display text-[32px] font-semibold text-indigo-brand leading-tight" />
                  <span className="block mt-1 text-base md:text-lg font-normal md:font-medium tracking-[-0.01em] text-ink">{l}</span>
                </LFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

const BA_SHADOW = 'shadow-[0_2px_2px_#16134a0d,0_0_1px_#16134a80]'
function BeforeAfter({ pairs }) {
  return (
    <Row>
      <div className={stacked}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_30px_1fr] gap-5 items-center">
          {pairs.map(([b, a], i) => [
            <LFade key={'b' + i} className={`bg-white p-6 flex items-center gap-3 ${BA_SHADOW}`}>
              <svg viewBox="0 0 20 20" className="w-5 h-5 shrink-0" fill="none" stroke="#b42318" strokeWidth="1.6" strokeLinecap="round"><circle cx="10" cy="10" r="8" /><path d="M7 7l6 6M13 7l-6 6" /></svg>
              <span className="text-lg md:text-xl leading-[1.33] text-ink">{b}</span>
            </LFade>,
            <LFade key={'r' + i} className="hidden md:flex justify-center text-muted"><Arrow className="w-5 h-5" /></LFade>,
            <LFade key={'a' + i} delay={0.1} className={`bg-white p-6 flex items-center gap-3 mb-6 md:mb-0 ${BA_SHADOW}`}>
              <Check className="w-5 h-5 shrink-0" />
              <span className="text-lg md:text-xl leading-[1.33] text-ink">{a}</span>
            </LFade>,
          ])}
        </div>
      </div>
    </Row>
  )
}

function Rivet({ className }) { return <span className={`hidden lg:block absolute w-2.5 h-2.5 rounded-full border border-line bg-white ${className}`} /> }
function FeaturedCase({ c }) {
  return (
    <Row>
      <div className={stacked}>
        <LFade className="relative border border-line bg-white lg:aspect-[1225/462] lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-28 p-6 lg:pt-12 lg:pr-14 lg:pb-12 lg:pl-8">
          <Rivet className="-top-[5px] -left-[5px]" /><Rivet className="-top-[5px] -right-[5px]" /><Rivet className="-bottom-[5px] -left-[5px]" /><Rivet className="-bottom-[5px] -right-[5px]" />
          <span className="hidden lg:block absolute left-0 right-0 top-8 border-t border-dashed border-line" />
          <div className="relative flex flex-col justify-center">
            <h3 className="font-display text-[24px] md:text-[30px] xl:text-[2.875vw] desktop:text-[40px] font-normal leading-[1.3] tracking-[-1px] text-ink"><Rich parts={c.title} /></h3>
            <Link to="/customers" className="btn-secondary font-sans !rounded-[18px] gap-4 mt-8 self-start">{c.cta}<Arrow /></Link>
          </div>
          <div className="relative mt-8 lg:mt-0 min-h-[240px] rounded-2xl overflow-hidden"><img src={c.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
        </LFade>
      </div>
    </Row>
  )
}

function OutboundFeatures({ f }) {
  return (
    <Row>
      <div className={stacked}>
        <LHeading pill={f.pill} title={f.title} body={f.body} maxW="max-w-[730px]" />
        <div className="mt-8 mx-auto max-w-[848px] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {f.items.map((it, i) => (
            <LFade key={it.title} delay={i * 0.06} className="max-w-[280px] lg:max-w-[400px] p-6 justify-self-center w-full">
              <span className="w-8 h-8 mb-4 flex items-center justify-center"><Glyph i={i + 1} className="w-7 h-7" /></span>
              <h4 className="mb-1 font-display text-lg font-medium text-ink">{it.title}</h4>
              <p className="text-sm leading-[1.6] text-muted">{it.body}</p>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* HowItWorks: badge loop per step — bg → #EA9F161A, text → #B3560A, spinner 2160° over 1.5s, then dot → #29BC5F.
   Steps run in sequence, repeat forever with repeatDelay .5s; state changes ease power4.out .3s. */
function Steps({ h }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [phase, setPhase] = useState({ step: -1, done: -1 })
  useEffect(() => {
    if (!inView) return
    let t, cancelled = false
    const run = (i) => {
      if (cancelled) return
      if (i >= h.steps.length) { t = setTimeout(() => { setPhase({ step: -1, done: -1 }); t = setTimeout(() => run(0), 300) }, 500); return }
      setPhase(p => ({ ...p, step: i }))
      t = setTimeout(() => { setPhase({ step: i, done: i }); t = setTimeout(() => run(i + 1), 300) }, 1500)
    }
    run(0)
    return () => { cancelled = true; clearTimeout(t) }
  }, [inView])
  const P4 = { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  return (
    <Row className="overflow-hidden">
      <div className={`relative ${stacked}`}>
        <svg className="pointer-events-none absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">{Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={(i * 37) % 100} cy={(i * 53) % 100} r=".25" fill="#6056ff" fillOpacity=".3" />)}</svg>
        <LHeading pill={h.pill} title={h.title} body={h.body} className="relative mb-12 md:mb-16" />
        <div ref={ref} className="relative mx-auto w-fit flex flex-col gap-10">
          {h.steps.map((s, i) => {
            const running = phase.step === i && phase.done < i
            const done = phase.done >= i
            return (
              <LFade key={s.label} className="flex items-start gap-4">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-white flex items-center justify-center shadow-[0_0_1px_#0d162f66,inset_0_-2px_#ededf1]"><Glyph i={i + 2} className="w-5 h-5" /></span>
                <div className="w-full max-w-[560px] bg-white rounded-xl p-3 shadow-[0_8px_16px_#26238c0d,0_16px_40px_-8px_#26238c0d,0_0_1px_#26238c66]">
                  <motion.span className="inline-flex items-center gap-2 rounded-full px-2 h-6 text-sm font-medium" initial={false}
                    animate={{ backgroundColor: running ? '#EA9F161A' : '#0d162f0a', color: running ? '#B3560A' : '#828794' }} transition={P4}>
                    {running
                      ? <motion.span className="pl-badge-spin" animate={{ rotate: 2160 }} transition={{ duration: 1.5, ease: 'linear' }} />
                      : <motion.span className="w-2 h-2 rounded-full" initial={false} animate={{ backgroundColor: done ? '#29BC5F' : '#b0b2bb' }} transition={P4} />}
                    {s.label}
                  </motion.span>
                  <p className="mt-2 px-1 text-[15px] leading-[1.55] text-ink">{s.body}</p>
                </div>
              </LFade>
            )
          })}
        </div>
      </div>
    </Row>
  )
}

const TP_SHADOW = 'shadow-[0_2px_2px_#16134a0d,0_0_1px_#16134a80]'
function TeamPlayer({ t }) {
  return (
    <Row>
      <div className={stacked}>
        <LHeading title={t.title} body={t.body} />
        <div className="mt-[60px] grid grid-cols-1 lg:grid-cols-2 gap-5">
          {t.cards.map((c, ci) => (
            <LFade key={c.title} delay={ci * 0.1} className={`bg-white ${TP_SHADOW} overflow-hidden`}>
              <h3 className="px-4 py-6 text-center font-display text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.32px] text-ink">{c.title}</h3>
              <div className="min-h-[320px] px-6 md:px-[60px] flex"><Mock kind={c.mock} tone={ci ? 'pink' : 'violet'} pad="p-6" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {c.points.map((p, i) => (
                  <div key={p} className="flex items-center gap-4 px-6 py-4 border-t border-line">
                    <Glyph i={i + ci} className="w-6 h-6 shrink-0" />
                    <span className="text-sm sm:text-lg md:text-xl leading-[1.33] text-ink">{p}</span>
                  </div>
                ))}
              </div>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* TimelineCTA: scroll-linked gradient progress bar in a 1.8rem centre column, 4 alternating rows of glass cards. */
function Timeline({ tl }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 50%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div className="relative mb-16 md:mb-20">
      <LHeading pill={tl.pill} title={tl.title} body={tl.body} className="mb-12" />
      <div ref={ref} className="relative mx-auto max-w-[900px]">
        <div className="absolute top-0 bottom-0 left-[21px] md:left-1/2 -translate-x-1/2 w-[1.8rem] flex justify-center">
          <span className="w-[3px] h-full bg-line rounded-full" />
          <motion.span className="absolute top-0 w-[3px] h-full origin-top rounded-full" style={{ scaleY: fill, background: 'linear-gradient(#6056ff, #943bff 87%, #f1e5ff 102%)' }} />
        </div>
        <div className="flex flex-col gap-10">
          {tl.rows.map(([title, sub], i) => {
            const card = (
              <div className="rounded-lg bg-white/70 backdrop-blur-[5px] border border-line px-4 py-[1.1rem] shadow-[0_0_10px_#26238c0d,0_9px_5px_#26238c0d]">
                <div className="font-display text-lg text-ink">{title}</div>
                <div className="mt-1 text-sm text-muted">{sub}</div>
              </div>
            )
            return (
              <LFade key={title} className="grid grid-cols-[max-content_1fr] md:grid-cols-[1fr_max-content_1fr] items-center gap-4 md:gap-8">
                <div className={`hidden md:block ${i % 2 ? '' : 'text-right'}`}>{i % 2 ? null : card}</div>
                <span className="relative z-[1] w-[42px] h-[42px] rounded-full bg-white border border-line flex items-center justify-center shadow-glass-sm"><Glyph i={i} className="w-5 h-5" /></span>
                <div className="hidden md:block">{i % 2 ? card : null}</div>
                <div className="md:hidden">{card}</div>
              </LFade>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function SDRLanding({ data, outbound = false }) {
  const roi = <Roi key="roi" r={data.roi} />
  const ba = <BeforeAfter key="ba" pairs={data.beforeAfter} />
  return (
    <>
      <CenteredHero {...data.hero} cursors />
      <LogoMarquee label="Trusted by revenue teams at" />
      {outbound ? [ba, roi] : [roi, ba]}
      <FeaturedCase c={data.caseStudy} />
      <OutboundFeatures f={data.features} />
      <Steps h={data.how} />
      <TeamPlayer t={data.team} />
      <FooterCTA><Timeline tl={data.timeline} /></FooterCTA>
    </>
  )
}

