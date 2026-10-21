// A3 /features: FeaturesHero, FeatureCatalog (14 sticky-heading categories), LogoGrid.
import LogoWall from '../../components/LogoWall'
import { FeaturesHero, FeatureCatalog } from '../../components/product/catalog'
import { features as d } from '../../content/product'

export default function Features() {
  return (
    <>
      <FeaturesHero h1={d.h1} body={d.body} ctas={d.ctas} />
      <FeatureCatalog categories={d.categories} />
      <LogoWall />
    </>
  )
}
