import { useEffect } from 'react'
import LogoWall from '../../components/LogoWall'
import Tiles from '../../components/Tiles'
import CaseStudies from '../../components/CaseStudies'
import CostHero from '../../components/CostHero'
import Integrations from '../../components/Integrations'
import UseCases from '../../components/UseCases'
import Testimonials from '../../components/Testimonials'
import Enterprise from '../../components/Enterprise'
import { agentsPage as copy, useCaseShared } from '../../content/catalog'
import { AgentsHero, AgentComparison, CompetitorTable, TasksCTA } from '../../components/catalog/agents'
import { EvalsPanel, DeployPaths, Faq } from '../../components/catalog/sections'

export default function Agents() {
  useEffect(() => { document.title = 'AI agents | Lumenfold' }, [])
  return (
    <>
      <AgentsHero copy={copy.hero} />
      <LogoWall />
      <Tiles />
      <DeployPaths copy={useCaseShared.deploy} />
      <CaseStudies />
      <AgentComparison copy={copy.comparison} />
      <EvalsPanel palette="sales" title={copy.evals.title} body={copy.evals.body} agent={copy.evals.agent} rows={copy.evals.rows} thresholds={useCaseShared.evals.thresholds} caption={useCaseShared.evals.caption} />
      {/* AgentActivity: the homepage CostHero app card, reused as-is (see handoff note). */}
      <CostHero />
      <Integrations />
      <UseCases />
      <Testimonials />
      <Enterprise />
      <CompetitorTable copy={copy.competitor} />
      <Faq {...copy.faq} />
      <TasksCTA copy={copy.tasks} />
    </>
  )
}
