// A2 /slack: SlackHero + ChatDemo, LogoGrid, Two-up, Integrations (30-cell wall), use-case grid, split explainer,
// EnterpriseSecurity, ProgrammaticCTA, FeaturedIn, Final CTA.
import LogoWall from '../../components/LogoWall'
import Integrations from '../../components/Integrations'
import Enterprise from '../../components/Enterprise'
import Featured from '../../components/Featured'
import { SlackDeco, SlackHero, TwoUpFeature, UseCaseGrid, SplitExplainer, ProgrammaticCTA, FinalCTA } from '../../components/product/slack'
import { slack as d } from '../../content/product'

export default function Slack() {
  return (
    <div className="relative">
      <SlackDeco />
      <SlackHero label={d.label} h1={d.h1} body={d.body} ctas={d.ctas} tabs={d.tabs} />
      <LogoWall />
      <TwoUpFeature {...d.twoUp} />
      <Integrations />
      <UseCaseGrid {...d.useCases} />
      <SplitExplainer {...d.explainer} />
      <Enterprise />
      <ProgrammaticCTA {...d.programmatic} />
      <Featured />
      <FinalCTA {...d.final} />
    </div>
  )
}
