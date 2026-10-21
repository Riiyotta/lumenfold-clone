// A2 /workforce: SplitTitleHero + canvas, LogoGrid, 2x ExpandTiles, Integrations, Testimonials, FAQ, ClosingCTA.
import LogoWall from '../../components/LogoWall'
import Integrations from '../../components/Integrations'
import Testimonials from '../../components/Testimonials'
import { FAQSection, ClosingCTA } from '../../components/product/lib'
import { SplitTitleHero, ExpandTiles } from '../../components/product/workforce'
import { workforce as d, faqIntro, closing } from '../../content/product'

export default function Workforce() {
  return (
    <>
      <SplitTitleHero h1={d.h1} body={d.body} ctas={d.ctas} graph={d.graph} status={d.status} chip={d.chip} />
      <LogoWall />
      <ExpandTiles {...d.how} />
      <ExpandTiles {...d.deploy} bodyClass="max-w-lg" />
      <Integrations />
      <Testimonials />
      <FAQSection {...faqIntro} items={d.faq} />
      <ClosingCTA copy={closing} palette="sales" />
    </>
  )
}
