import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, AppIcon, Check, Wordmark, Laurel, Avatar, Chevron } from '../../components/ui'
import { CenteredHero, CustomerCards, LogoMarquee, StickyStack, LHeading, LFade, LSlide, FAQ, TestimonialGrid, FooterCTA, Pill, Rich, pad, stacked, H2, H3L, H4I } from '../../components/product-legacy/shared'
import { Mock, Window } from '../../components/product-legacy/mocks'
import { aiOps as d } from '../../content/productLegacy'

function StackBody({ s }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-8 p-8 lg:p-12 items-center">
      <div>
        <div className={H4I}>{s.n}</div>
        <h3 className={`${H3L} mt-2`}><Rich parts={s.title} /></h3>
        <ul className="mt-5 grid gap-2">{s.bullets.map(b => <li key={b} className="flex items-start gap-2.5 text-base leading-[1.5] text-muted"><Check className="w-[18px] h-[18px] mt-0.5 shrink-0" />{b}</li>)}</ul>
        <div className="mt-6 flex flex-wrap gap-2">{s.tools.map((t, i) => <span key={t} className="inline-flex items-center gap-2 bg-white border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink"><AppIcon seed={t.length + i} className="w-5 h-5" />{t}</span>)}</div>
        <Link to="/book-a-demo" className="btn-secondary font-sans mt-8 bg-white">{s.cta}</Link>
      </div>
      <div className="rounded-[10px] border border-line overflow-hidden min-h-[240px] flex"><Mock kind={s.mock} pad="p-5" /></div>
    </div>
  )
}

/* Template slider: slidesPerView 1, spaceBetween 4%, centred, mousewheel + keyboard, speed 300ms. */
function TemplateSlider({ s }) {
  const [i, setI] = useState(0)
  const n = s.slides.length
  const wrap = useRef(null)
  const lock = useRef(0)
  const go = v => setI(Math.max(0, Math.min(n - 1, v)))
  useEffect(() => {
    const el = wrap.current
    const f = e => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const next = i + (delta > 0 ? 1 : -1)
      if (next < 0 || next >= n || Math.abs(delta) < 8) return // release scroll at the edges
      e.preventDefault()
      if (Date.now() - lock.current < 400) return
      lock.current = Date.now(); go(next)
    }
    el.addEventListener('wheel', f, { passive: false })
    return () => el.removeEventListener('wheel', f)
  }, [i, n])
  const NavBtn = ({ dir }) => (
    <button onClick={() => go(i + dir)} disabled={dir < 0 ? i === 0 : i === n - 1} aria-label={dir < 0 ? 'Previous template' : 'Next template'}
      className="w-[3.25em] h-[3.25em] rounded-full border border-ink flex items-center justify-center text-ink transition-colors duration-200 hover:bg-[#c8dd5e] disabled:opacity-30 disabled:hover:bg-transparent">
      <Chevron dir="right" className={`w-4 h-4 ${dir < 0 ? 'rotate-180' : ''}`} />
    </button>
  )
  return (
    <Row>
      <div className={stacked}>
        <div className="flex items-end justify-between gap-6 mb-10">
          <LFade as="h2" className={H2}>{s.title}</LFade>
          <div className="hidden sm:flex gap-3"><NavBtn dir={-1} /><NavBtn dir={1} /></div>
        </div>
        <div ref={wrap} tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1) }}
          className="overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand/30" aria-roledescription="carousel">
          <div className="flex gap-[4%] transition-transform duration-300 ease-out" style={{ transform: `translateX(calc(${-i} * 104%))` }}>
            {s.slides.map((sl, k) => (
              <div key={sl.title} aria-hidden={k !== i} className="shrink-0 w-full border-2 border-ink rounded-[11px] p-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ background: sl.bg }}>
                <div>
                  <span className="font-sans text-sm text-ink/60">Template {k + 1} of {n}</span>
                  <h3 className="mt-2 font-display text-[28px] md:text-[36px] leading-[1.2] tracking-[-0.025em] text-ink">{sl.title}</h3>
                  <p className="mt-3 text-base md:text-lg leading-[1.5] text-ink/75 max-w-md">{sl.body}</p>
                  <Link to="/workflows" className="btn-secondary font-sans mt-6 bg-white !border-ink/20">Use template</Link>
                </div>
                <div className="hidden md:block"><Mock kind={['chart', 'kb', 'report', 'tickets'][k]} plain pad="p-0" /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2">{s.slides.map((_, k) => <button key={k} onClick={() => go(k)} aria-label={`Go to template ${k + 1}`} className={`h-2 rounded-full transition-all duration-300 ${k === i ? 'w-6 bg-indigo-brand' : 'w-2 bg-line-dark'}`} />)}</div>
      </div>
    </Row>
  )
}

// Looping "video" placeholder: a wide app mock with CSS loops (scan line, pulsing bars, typing line).
function LoopMock({ i }) {
  return (
    <div className="absolute left-0 top-6 lg:top-10 min-w-[900px] rounded-[14px_6px_6px_14px] border border-line overflow-hidden bg-white">
      <Window title={['Triggers', 'Approvals', 'Audit log', 'Connections'][i]} className="!rounded-none !border-0 !shadow-none">
        <div className="relative grid grid-cols-[220px_1fr] h-[360px]">
          <div className="border-r border-line p-3 grid content-start gap-1.5">{['Inbox', 'Schedules', 'Approvals', 'Runs', 'Settings'].map((t, k) => <span key={t} className={`px-2.5 py-1.5 rounded-md text-[12.5px] ${k === i ? 'bg-[#eef2ff] text-[#4b40d6] font-medium' : 'text-muted'}`}>{t}</span>)}</div>
          <div className="relative p-5 overflow-hidden">
            <span className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-indigo-brand/[.06] to-transparent" style={{ animation: 'pl-scan 4s linear infinite' }} />
            <div className="flex items-end gap-3 h-[150px]">{[40, 70, 55, 90, 65, 80, 45, 75].map((h, k) => <span key={k} className="flex-1 rounded-t origin-bottom" style={{ height: `${h}%`, background: k === 3 ? '#6056ff' : 'rgba(13,22,47,.12)', animation: `pl-bar ${2 + (k % 3) * 0.6}s ease-in-out ${k * 0.15}s infinite` }} />)}</div>
            <div className="mt-6 grid gap-2.5">
              {[0, 1, 2].map(k => <div key={k} className="flex items-center gap-2.5"><Avatar seed={k + i * 3} size={20} rounded="rounded-md" /><span className="block h-2 rounded bg-[#eef0f3] overflow-hidden" style={{ width: `${70 - k * 12}%` }}><span className="block h-full bg-[#6056ff]/25" style={{ animation: `pl-type ${3 + k}s ease-out ${k * 0.4}s infinite` }} /></span></div>)}
            </div>
          </div>
        </div>
      </Window>
    </div>
  )
}
function KeyFeatures({ items }) {
  return (
    <Row>
      <div className={stacked}>
        <StickyStack items={items} render={(f, i) => (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] min-h-[420px]">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className={H3L}>{f.title}</h3>
              <p className="mt-4 text-base md:text-lg leading-[1.6] text-muted">{f.body}</p>
            </div>
            <div className="relative overflow-hidden min-h-[340px]"><LoopMock i={i} /></div>
          </div>
        )} cardClass="overflow-hidden" />
      </div>
    </Row>
  )
}

// typed.js-style rotating word: type, hold, erase, next.
function Typed({ words }) {
  const [w, setW] = useState(0)
  const [len, setLen] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[w]
    let t
    if (!del && len < word.length) t = setTimeout(() => setLen(len + 1), 70)
    else if (!del) t = setTimeout(() => setDel(true), 1600)
    else if (len > 0) t = setTimeout(() => setLen(len - 1), 40)
    else { setDel(false); setW((w + 1) % words.length) }
    return () => clearTimeout(t)
  }, [len, del, w])
  return <span className="text-indigo-brand">{words[w].slice(0, len)}<span className="pl-caret">|</span></span>
}
function ScaleTeam({ s }) {
  return (
    <Row>
      <div className={stacked}>
        <LFade className="text-center mx-auto max-w-3xl">
          <h2 className="font-sans text-lg font-medium text-muted">{s.a}</h2>
          <h2 className={`${H2} mt-3`}>{s.b} <Typed words={s.rotate} /></h2>
        </LFade>
        <LSlide className="mt-12 relative aspect-[16/7] rounded-xl overflow-hidden"><img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></LSlide>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {s.items.map(t => <LFade key={t} className="flex items-center gap-3 border-t border-line pt-5"><Check className="w-5 h-5 shrink-0" /><h3 className="font-sans text-lg font-medium text-ink">{t}</h3></LFade>)}
        </div>
        <LFade className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/pricing" className="btn-primary font-sans">Start for free</Link>
          <Link to="/book-a-demo" className="btn-secondary font-sans">Book a demo</Link>
        </LFade>
      </div>
    </Row>
  )
}

function PressMarquee({ items }) {
  return (
    <Row innerClassName="overflow-hidden">
      <div className="py-12 md:py-20 bg-tile-base">
        <div className="pl-press-track">
          {[0, 1].map(c => items.map(p => (
            <div key={c + p.title} aria-hidden={c > 0} className="w-[25rem] mr-8 shrink-0 bg-white border border-line p-8 flex flex-col gap-5">
              <div className="relative aspect-[16/9] overflow-hidden"><img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></div>
              <Wordmark name={p.outlet} size="sm" />
              <h3 className="font-sans text-lg leading-[1.4] font-medium text-ink">{p.title}</h3>
              <Link to="/blog" tabIndex={c ? -1 : 0} className="btn-secondary font-sans self-start">Read article</Link>
            </div>
          )))}
        </div>
      </div>
    </Row>
  )
}

function Awards({ a }) {
  return (
    <Row>
      <div className={stacked}>
        <LFade as="h2" className={`${H4I} mb-10 text-center`}>{a.title}</LFade>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {a.items.map(([n, t], i) => (
            <LFade key={n} delay={i * 0.06} className="bg-white border border-line p-6 flex flex-col items-center text-center gap-4">
              <Wordmark name={n} size="sm" className="grayscale" />
              <div className="flex items-center gap-2"><Laurel /><h3 className="font-sans text-sm text-muted">{t}</h3></div>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

export default function AiOps() {
  return (
    <>
      <CenteredHero {...d.hero} cursors />
      <CustomerCards {...d.customers} />
      <LogoMarquee />
      <Row>
        <div className={stacked}>
          <LHeading title={d.stack.title} className="mb-12 md:mb-16" />
          <StickyStack items={d.stack.items} render={s => <StackBody s={s} />} />
        </div>
      </Row>
      <TemplateSlider s={d.slider} />
      <KeyFeatures items={d.keyFeatures} />
      <ScaleTeam s={d.scale} />
      <PressMarquee items={d.press} />
      <FAQ {...d.faq} />
      <Awards a={d.awards} />
      <TestimonialGrid />
      <Row>
        <div className={`${pad} py-20 md:py-28 text-center flex flex-col items-center`}>
          <LFade><Pill className="mb-6">{d.statement.pill}</Pill></LFade>
          <LFade as="h2" className="text-[36px] md:text-[48px] leading-[1.2] tracking-[-0.15rem] text-ink">{d.statement.title}</LFade>
        </div>
      </Row>
      <FooterCTA />
    </>
  )
}
