import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, AppIcon, Check } from '../../components/ui'
import { CenteredHero, LegacyLogoGrid, LHeading, LFade, LSlide, LSlideX, BentoCards, TestimonialGrid, FooterCTA, StickyStack, Rich, pad, H2, H3L, OUT_QUART } from '../../components/product-legacy/shared'
import { Mock } from '../../components/product-legacy/mocks'

// 32px line icons for the feature icon row (original).
const GLYPHS = [
  'M5 16h6l3-8 4 16 3-8h6', 'M6 8h20M6 16h14M6 24h8', 'M8 12l8-6 8 6v12H8z M13 24v-6h6v6', 'M16 5a11 11 0 100 22 11 11 0 000-22zM5 16h22M16 5c4 4 4 18 0 22M16 5c-4 4-4 18 0 22',
  'M16 6l3 6.5 7 .9-5.2 4.8 1.4 7L16 21.6 9.8 25.2l1.4-7L6 13.4l7-.9z', 'M7 23V13M13 23V9M19 23v-6M25 23V6',
]
export const Glyph = ({ i, className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" stroke="#6056ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={GLYPHS[i % GLYPHS.length]} /></svg>
)

// Decorative top backdrop for the features block (500px; 400 at <=991) with side/top/base fades.
function FeatureBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] lg:h-[500px] overflow-hidden">
      <svg className="absolute left-1/2 -translate-x-1/2 top-0 w-[2500px] h-full" viewBox="0 0 2500 500" preserveAspectRatio="xMidYMin slice">
        {Array.from({ length: 26 }).map((_, i) => <circle key={i} cx="1250" cy="-80" r={120 + i * 48} fill="none" stroke="#6056ff" strokeOpacity={0.09 - i * 0.003} />)}
      </svg>
      <div className="absolute inset-y-0 left-0 w-[25vw] bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[25vw] bg-gradient-to-l from-white to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-white to-transparent" />
    </div>
  )
}

function IconRow({ items }) {
  return (
    <LFade className="mx-auto max-w-[70rem] grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-around gap-4 sm:gap-8 mb-16 md:mb-24">
      {items.map((t, i) => (
        <div key={t} className="flex flex-col items-center text-center gap-2">
          <Glyph i={i} />
          <h3 className="font-sans text-lg md:text-xl leading-7 font-medium text-ink">{t}</h3>
        </div>
      ))}
    </LFade>
  )
}

const XIcon = () => <svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="none" stroke="#868a97" strokeWidth="1.6" strokeLinecap="round"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" /></svg>

function CompareCards({ c }) {
  return (
    <LSlide className="mx-auto max-w-[63.6rem] grid grid-cols-1 md:grid-cols-[.6fr_1fr] items-center">
      <LSlideX className="w-[90%] mx-auto md:w-auto md:mx-0 bg-[#fcfcfd] border border-line md:border-r-0 overflow-hidden">
        <div className="h-[150px] opacity-50"><Mock kind={c.mockSmall} tone="blue" pad="p-4" /></div>
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-2"><XIcon /><h3 className="font-sans text-xl font-semibold text-ink">{c.small.title}</h3></div>
          {c.small.rows.map(r => <div key={r} className="flex items-center gap-2 py-2 border-b border-line-dark last:border-0 text-sm text-muted"><XIcon />{r}</div>)}
        </div>
      </LSlideX>
      <div className="relative z-[1] bg-[#fcfcfd] border border-[#3b32f966] overflow-hidden shadow-[0_0_1px_#26238c66,0_16px_40px_-8px_#26238c0d,0_8px_16px_#26238c0d]">
        <div className="h-[200px]"><Mock kind={c.mockLarge} pad="p-4" /></div>
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-2"><Check className="w-4 h-4" /><h3 className="font-sans text-2xl font-semibold text-ink tracking-[-0.02em]">{c.large.title}</h3></div>
          {c.large.rows.map(([lead, rest], i) => (
            <div key={lead} className="flex items-center gap-3 py-2 border-b border-line-dark last:border-0 text-base text-muted">
              <span className="w-8 h-8 shrink-0 rounded-md bg-indigo-ghost flex items-center justify-center"><Glyph i={i} className="w-5 h-5" /></span>
              <span><b className="font-semibold text-ink">{lead}</b>{rest}</span>
            </div>
          ))}
        </div>
      </div>
    </LSlide>
  )
}

function StackCardBody({ s }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-8 p-8 lg:p-12 items-center">
      <div>
        <div className="font-display text-[22px] md:text-[24px] text-indigo-brand tracking-[-0.025em]">{s.n}</div>
        <h3 className={`${H3L} mt-2`}><Rich parts={s.title} /></h3>
        <ul className="mt-5 grid gap-2">{s.bullets.map(b => <li key={b} className="flex items-start gap-2.5 text-base leading-[1.5] text-muted"><Check className="w-[18px] h-[18px] mt-0.5 shrink-0" />{b}</li>)}</ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {s.tools.map((t, i) => <span key={t} className="inline-flex items-center gap-2 bg-white border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink"><AppIcon seed={t.length + i} className="w-5 h-5" />{t}</span>)}
        </div>
        <Link to="/book-a-demo" className="btn-secondary font-sans mt-8 bg-white">{s.cta}</Link>
      </div>
      <div className="rounded-[10px] border border-line overflow-hidden min-h-[240px] flex"><Mock kind={s.mock} pad="p-5" /></div>
    </div>
  )
}

function WhatItDoes({ w }) {
  return (
    <Row className="overflow-hidden">
      <div className={`relative ${pad} pt-16 md:pt-28 pb-12 md:pb-28`}>
        <motion.svg className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-39.6vw] md:top-[-23.2vw] lg:top-[-11.7vw] w-[140%] h-[40rem]" viewBox="0 0 1400 640" preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ scale: { duration: 2, ease: OUT_QUART }, opacity: { duration: 0.5 } }}>
          <defs><radialGradient id="plwg" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#6056ff" stopOpacity=".14" /><stop offset="1" stopColor="#6056ff" stopOpacity="0" /></radialGradient></defs>
          <ellipse cx="700" cy="420" rx="620" ry="220" fill="url(#plwg)" />
          {Array.from({ length: 7 }).map((_, i) => <ellipse key={i} cx="700" cy="420" rx={180 + i * 70} ry={60 + i * 24} fill="none" stroke="#6056ff" strokeOpacity={0.12 - i * 0.014} />)}
        </motion.svg>
        <LFade className="relative mx-auto max-w-[48rem] text-center flex flex-col items-center">
          <h2 className={H2}><Rich parts={w.title} /></h2>
          <Link to="/pricing" className="btn-primary font-sans mt-8">{w.cta}</Link>
        </LFade>
        <div className="relative mt-[10vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {w.cards.map((c, i) => (
            <LFade key={c.title} delay={i * 0.08} className="bg-white border border-line overflow-hidden flex flex-col">
              {c.mock ? <div className="h-[200px] pb-2.5"><Mock kind={c.mock} tone={c.tone} pad="p-5" /></div> : <div className="h-6" />}
              <div className="px-5 pb-6 pt-3">
                <h3 className="font-sans text-xl leading-7 font-medium text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-[1.5] text-muted">{c.body}</p>
              </div>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

export default function AgentLanding({ data, seo = false }) {
  const f = data.features
  return (
    <>
      <CenteredHero {...data.hero} cursors />
      <LegacyLogoGrid label={data.logoLabel} />
      <Row className="overflow-hidden">
        <div className={`relative ${pad} pt-16 md:pt-28 pb-12 md:pb-28`}>
          <FeatureBackdrop />
          <LHeading pill={f.pill} title={f.title} body={f.body} className="relative mb-12" />
          {seo && <div className="relative mb-16 md:mb-24"><StickyStack items={f.steps} render={s => <StackCardBody s={s} />} /></div>}
          <div className="relative"><IconRow items={f.icons} /></div>
          <CompareCards c={f.compare} />
        </div>
      </Row>
      <BentoCards {...data.bento} renderMedia={c => <Mock kind={c.mock} tone={c.tone} />} />
      <WhatItDoes w={data.what} />
      <TestimonialGrid />
      <FooterCTA />
    </>
  )
}
