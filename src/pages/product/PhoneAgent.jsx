// A1v: FeatureDetail video variant (/phone-agent). No FAQ / MoreFeatures.
import LogoWall from '../../components/LogoWall'
import { FeatureHero, ShowcaseRow, IconCardGrid, ClosingCTA } from '../../components/product/lib'
import { HeroMock, Screen } from '../../components/product/mocks'
import { phonePage as d, closing } from '../../content/product'

export default function PhoneAgent() {
  const s = d.showcase
  return (
    <>
      <FeatureHero phone h1={d.h1} body={d.body} ctas={d.ctas} media={<HeroMock mock={d.mock} />} />
      <LogoWall />
      <ShowcaseRow index={0} title={s.title} body={s.body} ctas={s.ctas} media={<Screen kind={s.screen} title={s.screenTitle} />} />
      <IconCardGrid title={d.grid.title} items={d.grid.items} variant="b" />
      <ClosingCTA copy={closing} palette="sales" coins={d.coins} />
    </>
  )
}
