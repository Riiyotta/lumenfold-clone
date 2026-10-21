import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Grain } from '../ui'
import { KindLabel, CompanyLogo, CtaText } from './parts'

const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

// 1.6 HeroCarousel: status pill + auto-advancing glass slides (2000ms, pauses on hover / reduced motion).
export function HeroCarousel({ label, count, empty, slides }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const n = slides.length
  useEffect(() => {
    if (n < 2 || paused || reduce) return
    const t = setInterval(() => setIndex(i => (i + 1) % n), 2000)
    return () => clearInterval(t)
  }, [n, paused, reduce])

  return (
    <>
      <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded bg-white/55 backdrop-blur-glass-lg text-[13px] text-ink">
        <span className="w-2 h-2 rounded-full bg-indigo-brand shadow-[0_0_8px_rgba(96,86,255,.4)]" />
        {n ? <><span className="font-display font-semibold">{label}</span><span>{numberWords[n] || n} {count}</span></> : <span>{empty}</span>}
      </span>
      {n > 0 && (
        <div className="w-full overflow-hidden rounded" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]" style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((s, i) => (
              <Link key={s.title} to={s.to} tabIndex={i === index ? 0 : -1} aria-hidden={i !== index}
                className="flex-[0_0_100%] flex flex-col gap-4 p-6 rounded bg-white/55 backdrop-blur-glass-lg hover:bg-white/80 transition-colors duration-300 ease-[ease]">
                <div className="h-7 flex items-center justify-between gap-3">
                  <span className="opacity-75"><CompanyLogo name={s.partner} /></span>
                  <KindLabel className="text-indigo-dark">{s.kind}</KindLabel>
                </div>
                <h3 className="text-[22px] leading-[26.4px] font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="text-sm leading-[21px] text-ink opacity-[.85]">{s.description}</p>
                <CtaText className="text-indigo-dark">{s.cta}</CtaText>
              </Link>
            ))}
          </div>
        </div>
      )}
      {n > 1 && (
        <div className="flex gap-2 pl-1">
          {slides.map((s, i) => (
            <button key={s.title} type="button" aria-label={`Show slide ${i + 1}`} onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-[ease] ${i === index ? 'w-6 bg-indigo-dark' : 'w-1.5 bg-indigo-dark/30'}`} />
          ))}
        </div>
      )}
    </>
  )
}

// T3 GrainHero: full-bleed violet band; the rail cells exist but carry no borders inside it.
export default function HubHero({ title, accent, body, carousel }) {
  return (
    <section className="relative -mt-px border-b border-line overflow-hidden">
      <Grain tone="violet" />
      <div className="relative flex">
        <div className="hidden desktop:block flex-1 basis-0 min-w-[224px]" />
        <div className="relative w-full max-w-content mx-auto min-w-0">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="py-24 px-6 md:px-12 lg:px-20 hub-hero-grid">
            <div className="hub-hero-left flex flex-col gap-5">
              <h1 className="hub-hero-h1 text-ink">{title} <span className="text-indigo-brand">{accent}</span></h1>
              <p className="text-xl leading-8 text-ink max-w-[560px] text-pretty">{body}</p>
            </div>
            <div className="flex flex-col items-start gap-3 min-w-0"><HeroCarousel {...carousel} /></div>
          </motion.div>
        </div>
        <div className="hidden desktop:block flex-1 basis-0 min-w-[290px]" />
      </div>
    </section>
  )
}
