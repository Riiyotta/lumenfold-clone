import { partners as p } from '../../content/company'
import { Row, Reveal } from '../../components/ui'
import { FAQ, GrainCTA, GlassPill, NativeForm, MountIn, pad, stacked } from '../../components/company/shared'

const h2 = 'text-[30px] md:text-[36px] tracking-[-0.025em] leading-[1.35] text-ink'
const Accent = ({ a, b, after = false }) => after ? <><span className="text-indigo-brand">{a}</span>{b}</> : <>{a} <span className="text-indigo-brand">{b}</span></>

// 48px indigo benefit icons (original).
const benefitIcons = ['M24 8l4.9 10 11.1 1.6-8 7.8 1.9 11L24 33.2l-9.9 5.2 1.9-11-8-7.8L19.1 18z', 'M10 12h28v18H22l-8 6v-6h-4z', 'M24 8l16 8-16 8-16-8zM14 21v9c0 3 4.5 6 10 6s10-3 10-6v-9']

/* Hero → EnterpriseHero top grid (7/5) with a rectangular image on the right */
function PartnersHero() {
  return (
    <Row className="overflow-hidden">
      <MountIn className={`pt-10 md:pt-16 pb-10 md:pb-14 ${pad} grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-center`}>
        <div className="lg:col-span-7">
          <GlassPill>{p.pill}</GlassPill>
          <h1 className="mt-6 text-5xl leading-[1.2] tracking-[-0.15rem] [text-wrap:balance] font-normal text-ink"><Accent a={p.titleA} b={p.titleB} after /></h1>
          <p className="mt-5 max-w-[30rem] text-base md:text-lg leading-[1.6] text-muted">{p.body}</p>
          <div className="mt-6"><a href="#apply" className="btn-primary !rounded-full">{p.cta}</a></div>
        </div>
        <div className="lg:col-span-5">
          <img src="/assets/photos/co-partners-hero.webp" alt="" className="w-full aspect-[3/2] object-cover border border-line" />
        </div>
      </MountIn>
    </Row>
  )
}

/* Feature card → square bordered 2-column card */
function FeatureCard() {
  return (
    <Row>
      <div className={stacked}>
        <Reveal amount={0.3} className="grid md:grid-cols-2 border border-line">
          <img src="/assets/photos/co-partners-feature.webp" alt="" className="w-full h-full min-h-[260px] object-cover" />
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className={h2}><Accent a={p.featureA} b={p.featureB} /></h2>
            <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{p.featureBody}</p>
            <div className="mt-8"><a href="#certified" className="btn-secondary">{p.featureCta}</a></div>
          </div>
        </Reveal>
      </div>
    </Row>
  )
}

/* Benefits bento → hairline grid, 3 columns of small + large cells (order alternates) */
function Benefits() {
  let icon = 0
  return (
    <Row>
      <div className={stacked}>
        <Reveal className="max-w-3xl mx-auto text-center mb-12 md:mb-14 flex flex-col items-center">
          <GlassPill>{p.benefitsPill}</GlassPill>
          <h2 className={`mt-6 ${h2}`}><Accent a={p.benefitsA} b={p.benefitsB} /></h2>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{p.benefitsBody}</p>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-px bg-line border border-line">
          {p.bento.map((col, c) => (
            <div key={c} className="flex flex-col gap-px">
              {col.map((cell, k) => (
                <Reveal key={cell.title} amount={0.2} delay={c * 0.06} className={`bg-surface-light p-6 md:p-8 flex flex-col ${k === col.length - 1 ? 'flex-1' : ''}`}>
                  {cell.kind === 'small' && (
                    <svg viewBox="0 0 48 48" className="w-12 h-12 mb-2 text-indigo-brand" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"><path d={benefitIcons[icon++ % 3]} /></svg>
                  )}
                  <h3 className="text-lg leading-[1.3] font-normal text-ink">{cell.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">{cell.body}</p>
                  {cell.img && <div className="mt-6 overflow-hidden"><img src={cell.img} alt="" className="w-full aspect-[16/10] object-cover" /></div>}
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}

function PartnersFAQ() {
  return (
    <Row>
      <div className={stacked}>
        <Reveal className="text-center max-w-2xl mx-auto mb-12"><h2 className={h2}>{p.faqA}<span className="text-indigo-brand">{p.faqB}</span></h2></Reveal>
        <FAQ items={p.faq} />
      </div>
    </Row>
  )
}

function Apply() {
  return (
    <Row>
      <div id="apply" className={`${stacked} scroll-mt-16`}>
        <Reveal className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <h2 className={h2}>{p.applyTitle}</h2>
          <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{p.applyBody}</p>
        </Reveal>
        <div className="max-w-xl mx-auto">
          <NativeForm fields={p.fields} submit={p.submit} success={p.success} />
        </div>
      </div>
    </Row>
  )
}

export default function Partners() {
  return (
    <>
      <PartnersHero />
      <FeatureCard />
      <Benefits />
      <PartnersFAQ />
      <div id="certified" className="scroll-mt-16">
        <GrainCTA title={`${p.certA} ${p.certB}`} highlight={p.certB} body={p.certBody} primary={{ label: p.certCta, href: '#apply' }} secondary={null} />
      </div>
      <Apply />
    </>
  )
}
