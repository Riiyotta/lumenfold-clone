import { about as a } from '../../content/company'
import { Row, Reveal } from '../../components/ui'
import { GlassPill, MountIn, heroH1, pad, stacked } from '../../components/company/shared'

// Legacy Webflow page rebuilt on the new shell (§8 mapping): CareersHero pattern, then a split story section.
function AboutHero() {
  return (
    <Row className="overflow-hidden">
      <div className={`pt-10 md:pt-16 pb-16 md:pb-20 ${pad}`}>
        <MountIn className="flex flex-col items-center text-center">
          <GlassPill>{a.pill}</GlassPill>
          <h1 className={`mt-6 max-w-3xl ${heroH1}`}>{a.titleA}<span className="text-indigo-brand">{a.titleB}</span>{a.titleC}</h1>
        </MountIn>
        <MountIn delay={0.1} y={18} className="mt-12">
          <img src="/assets/photos/co-about-wide.webp" alt="The Lumenfold office" loading="eager" className="w-full border border-line aspect-[2.4/1] object-cover" />
        </MountIn>
      </div>
    </Row>
  )
}

function Story() {
  return (
    <Row>
      <div className={stacked}>
        <Reveal className="flex justify-center mb-12"><GlassPill>{a.storyPill}</GlassPill></Reveal>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <Reveal amount={0.3}><img src="/assets/photos/co-about-square.webp" alt="" className="w-full aspect-square object-cover border border-line" /></Reveal>
          <Reveal amount={0.3} delay={0.08}>
            <h3 className="text-2xl leading-[1.35] tracking-[-0.025em] font-normal text-ink mb-6">{a.storyTitle}</h3>
            <div className="co-prose">
              {a.paras.map(t => <p key={t}>{t}</p>)}
              <ul>{a.list.map(t => <li key={t}>{t}</li>)}</ul>
              <p>{a.closing.map((t, i) => i % 2 ? <a key={i} href="#" onClick={e => e.preventDefault()}>{t}</a> : <span key={i}>{t}</span>)}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Row>
  )
}

export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <Story />
    </>
  )
}
