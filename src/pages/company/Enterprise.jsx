import Testimonials from '../../components/Testimonials'
import EnterpriseSecurity from '../../components/Enterprise'
import CaseStudies from '../../components/CaseStudies'
import Integrations from '../../components/Integrations'
import { LogoGrid, GrainCTA } from '../../components/company/shared'
import { EnterpriseHero, AgentGovernance, StackCollapse, ProductionGap, CompetitorComparison } from '../../components/company/enterprise'

// Section order from PAGES_COMPANY §2. Home sections are reused as-is.
export default function Enterprise() {
  return (
    <>
      <EnterpriseHero />
      <LogoGrid />
      <Testimonials />
      <EnterpriseSecurity />
      <AgentGovernance />
      <StackCollapse />
      <CaseStudies />
      <ProductionGap />
      <Integrations />
      <CompetitorComparison />
      <GrainCTA />
    </>
  )
}
