import Hero from '../components/Hero'
import LogoWall from '../components/LogoWall'
import Tiles from '../components/Tiles'
import CaseStudies from '../components/CaseStudies'
import UseCases from '../components/UseCases'
import CostHero from '../components/CostHero'
import Autonomy from '../components/Autonomy'
import Enterprise from '../components/Enterprise'
import Integrations from '../components/Integrations'
import Testimonials from '../components/Testimonials'
import Featured from '../components/Featured'
import LearnMore from '../components/LearnMore'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoWall />
      <Tiles />
      <CaseStudies />
      <UseCases />
      <CostHero />
      <Autonomy />
      <Enterprise />
      <Integrations />
      <Testimonials />
      <Featured />
      <LearnMore />
    </>
  )
}
