// A1 FeatureDetail: one data-driven template for /knowledge, /approvals-escalations, /version-control, /collaboration.
import LogoWall from '../../components/LogoWall'
import { FeatureHero, ShowcaseRow, IconCardGrid, FAQSection, MoreFeatures, ClosingCTA } from '../../components/product/lib'
import { HeroMock, Screen } from '../../components/product/mocks'
import { featurePages, ctaPair, faqIntro, moreFeatures, closing } from '../../content/product'

export default function FeatureDetail({ page }) {
  const d = featurePages[page]
  return (
    <>
      <FeatureHero h1={d.h1} body={d.body} ctas={ctaPair} media={<HeroMock mock={d.mock} />} />
      <LogoWall />
      {d.showcase.map((s, i) => (
        <ShowcaseRow key={s.title} index={i} title={s.title} body={s.body} media={<Screen kind={s.screen} title={s.screenTitle} />} />
      ))}
      <IconCardGrid title={d.grid.title} items={d.grid.items} variant="a" />
      <FAQSection {...faqIntro} items={d.faq} />
      <MoreFeatures {...moreFeatures(d.more)} />
      <ClosingCTA copy={closing} palette="sales" />
    </>
  )
}
