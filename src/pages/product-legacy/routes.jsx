import AgentLanding from './AgentLanding'
import SDRLanding from './SDRLanding'
import ScheduleWork from './ScheduleWork'
import UseCaseLegacy from './UseCaseLegacy'
import AiOps from './AiOps'
import { ApiPage, MultiAgents } from './B6'
import SelfDrivingGtm from './SelfDrivingGtm'
import SpecialistAgents from './SpecialistAgents'
import BdrWaitlist from './BdrWaitlist'
import AgentDrop from './AgentDrop'
import AgentsAtWork from './AgentsAtWork'
import { supportAgent, seoAgent, inbound, outbound, forCx, forMr } from '../../content/productLegacy'

// Legacy "system B" product pages + one-offs, rebuilt on the Lumenfold shell. Auto-registered by App.jsx.
export const productLegacyRoutes = [
  { path: '/customer-support-agent', element: <AgentLanding key="cs" data={supportAgent} /> },
  { path: '/seo-agent', element: <AgentLanding key="seo" data={seoAgent} seo /> },
  { path: '/inbound', element: <SDRLanding key="in" data={inbound} /> },
  { path: '/outbound', element: <SDRLanding key="out" data={outbound} outbound /> },
  { path: '/schedule-work', element: <ScheduleWork /> },
  { path: '/for-customer-experience', element: <UseCaseLegacy key="cx" data={forCx} /> },
  { path: '/for-market-research', element: <UseCaseLegacy key="mr" data={forMr} /> },
  { path: '/ai-ops', element: <AiOps /> },
  { path: '/api', element: <ApiPage /> },
  { path: '/multi-agents', element: <MultiAgents /> },
  { path: '/self-driving-gtm', element: <SelfDrivingGtm /> },
  { path: '/specialist-agents', element: <SpecialistAgents /> },
  { path: '/bdr-agent-waiting-list', element: <BdrWaitlist /> },
  { path: '/agent-drop', element: <AgentDrop /> },
  { path: '/agents-at-work', element: <AgentsAtWork /> },
]

export default productLegacyRoutes
