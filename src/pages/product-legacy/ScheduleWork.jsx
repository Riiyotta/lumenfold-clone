import { Link } from 'react-router-dom'
import { Row } from '../../components/ui'
import { LFade, LShrink, LHeading, Pill, FAQ, CustomerCards, NextSteps, LegacyLogoGrid, FooterCTA, DarkCard, stacked, H3L, BODY } from '../../components/product-legacy/shared'
import { Mock } from '../../components/product-legacy/mocks'
import { scheduleWork as d } from '../../content/productLegacy'

function DarkHero({ h }) {
  return (
    <Row>
      <div className="px-4 md:px-6 py-16 md:py-20">
        <div className="relative max-w-[90rem] mx-auto rounded-2xl overflow-hidden pl-dark grid grid-cols-1 lg:grid-cols-[1.1fr_1.25fr]">
          <span className="pl-dark-inset" />
          <LFade className="relative p-8 md:pt-12 md:pb-12 md:pl-14 md:pr-0 flex flex-col items-start justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-medium text-ink"><span className="w-2 h-2 rounded-full bg-indigo-brand" />{h.pill}</span>
            <h1 className="mt-6 text-[30px] md:text-[36px] lg:text-[40px] leading-[1.1] tracking-[-0.025em] text-white [text-wrap:balance]">{h.title}</h1>
            <p className="mt-5 text-base leading-[1.6] text-white/80 max-w-md">{h.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className="btn-primary font-sans">{h.primary}</Link>
              <Link to="/book-a-demo" className="btn-secondary font-sans !text-white !border-white/25 hover:!bg-white/10">{h.secondary}</Link>
            </div>
          </LFade>
          <LShrink className="relative self-end flex justify-end items-end pt-4 pl-6 lg:pl-0 min-h-[300px]">
            <div className="w-full max-w-[520px] translate-x-6 translate-y-6"><Mock kind="calendar" plain pad="p-0" /></div>
          </LShrink>
        </div>
      </div>
    </Row>
  )
}

function LayoutRow({ r, flip }) {
  return (
    <Row>
      <div className={stacked}>
        <div className={`grid grid-cols-1 items-center gap-12 ${flip ? 'lg:grid-cols-[1fr_1.25fr] lg:gap-16' : 'lg:grid-cols-[1.25fr_1fr] lg:gap-20'}`}>
          <LFade className={`relative aspect-[4/3] rounded-xl overflow-hidden ${flip ? 'lg:order-2' : ''}`}><img src={r.img} alt="" className="absolute inset-0 w-full h-full object-cover" /></LFade>
          <LFade>
            {r.pill && <Pill className="mb-6">{r.pill}</Pill>}
            <h2 className={H3L}>{r.title}</h2>
            <p className={`mt-5 ${BODY} md:text-lg md:leading-[1.6]`}>{r.body}</p>
          </LFade>
        </div>
      </div>
    </Row>
  )
}

function FeatureBento({ b }) {
  return (
    <Row className="overflow-hidden">
      <div className={`relative ${stacked}`}>
        <svg className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-10 w-[936px] h-[240px]" viewBox="0 0 936 240">
          {Array.from({ length: 40 }).map((_, i) => <path key={i} d={`M${i * 24} 0V240`} stroke="#6056ff" strokeOpacity=".07" />)}
          <rect width="936" height="240" fill="url(#plgr)" /><defs><linearGradient id="plgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" /></linearGradient></defs>
        </svg>
        <LHeading pill={b.pill} title={b.title} className="relative" />
        <div className="relative mt-[60px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-3 gap-4 desktop:gap-[.8rem]">
          {b.tiles.map((t, i) => (
            <LFade key={t.title} delay={(i % 3) * 0.08} className="bg-white border border-line border-b-line-dark shadow-[0_2px_2px_#0d162f0d] overflow-hidden flex flex-col">
              <div className="min-h-[170px] lg:min-h-[14.5rem] flex"><Mock kind={t.mock} tone={['violet', 'pink', 'blue'][i % 3]} pad="p-5" /></div>
              <div className="px-5 pt-3 pb-4 text-[13.5px] leading-[1.5] tracking-[-0.25px]">
                <h4 className="mb-1 font-medium text-ink text-[15px]">{t.title}</h4>
                <p className="text-muted">{t.body}</p>
              </div>
            </LFade>
          ))}
        </div>
      </div>
    </Row>
  )
}

// 128px original icon illustrations for the dark product cards.
function ProductArt({ i }) {
  return (
    <svg viewBox="0 0 128 128" className="w-32 h-32">
      <defs><linearGradient id={`plpa${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7281ff" /><stop offset="1" stopColor="#943bff" /></linearGradient></defs>
      {i === 0 && <>{[0, 1, 2].map(k => <rect key={k} x={24 + k * 10} y={30 + k * 14} width="60" height="40" rx="8" fill={`url(#plpa${i})`} fillOpacity={0.35 + k * 0.3} stroke="#fff" strokeOpacity=".3" />)}</>}
      {i === 1 && <><circle cx="64" cy="40" r="16" fill={`url(#plpa${i})`} /><circle cx="34" cy="86" r="13" fill={`url(#plpa${i})`} fillOpacity=".7" /><circle cx="94" cy="86" r="13" fill={`url(#plpa${i})`} fillOpacity=".7" /><path d="M64 56v10M64 66L36 74M64 66l28 8" stroke="#fff" strokeOpacity=".5" strokeWidth="2" /></>}
      {i === 2 && <><rect x="36" y="28" width="56" height="72" rx="28" fill={`url(#plpa${i})`} /><rect x="52" y="54" width="7" height="16" rx="3.5" fill="#fff" /><rect x="69" y="54" width="7" height="16" rx="3.5" fill="#fff" /></>}
    </svg>
  )
}
function ProductCards({ p }) {
  return (
    <Row>
      <div className={stacked}>
        <div className="max-w-[1024px] mx-auto">
          <LHeading pill={p.pill} title={p.title} body={p.body} className="mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {p.items.map((c, i) => (
              <LFade key={c.title} delay={i * 0.08}>
                <DarkCard tint={c.tint} to={c.to}>
                  <span className="flex flex-col items-center text-center p-5 gap-4">
                    <ProductArt i={i} />
                    <span className="font-display text-2xl text-white">{c.title}</span>
                    <span className="btn-secondary font-sans !py-1.5 !px-4 !text-white !border-white/25">Explore</span>
                  </span>
                </DarkCard>
              </LFade>
            ))}
          </div>
        </div>
      </div>
    </Row>
  )
}

export default function ScheduleWork() {
  return (
    <>
      <DarkHero h={d.hero} />
      <LayoutRow r={d.row1} />
      <LayoutRow r={d.row2} flip />
      <FeatureBento b={d.bento} />
      <FAQ {...d.faq} />
      <ProductCards p={d.products} />
      <NextSteps {...d.next} />
      <CustomerCards {...d.customers} />
      <LegacyLogoGrid label={d.logoLabel} />
      <FooterCTA />
    </>
  )
}

