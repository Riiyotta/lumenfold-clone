import { Navigate } from 'react-router-dom'
import IntegrationsIndex from './IntegrationsIndex'
import IntegrationDetail from './IntegrationDetail'
import UseCaseDetail from './UseCaseDetail'
import Agents from './Agents'
import Workflows from './Workflows'
import WorkflowDetail from './WorkflowDetail'
import Article from './Article'

// Catalog/detail templates (PAGES_CATALOG T1-T4, W1-W3). Marketplace (M1-M4) is out of scope.
export const catalogRoutes = [
  { path: '/integrations', element: <IntegrationsIndex /> },
  { path: '/integrations/:slug', element: <IntegrationDetail /> },
  { path: '/use-cases/:slug', element: <UseCaseDetail /> },
  { path: '/agents', element: <Agents /> },
  { path: '/workflows', element: <Workflows /> },
  { path: '/workflows/:slug', element: <WorkflowDetail /> },
  { path: '/llm-models/:slug', element: <Article kind="llm" /> },
  { path: '/industry/:slug', element: <Article kind="industry" /> },
  // W0 empty shell in the original: redirect to the catalog index instead.
  { path: '/app-tools/:slug', element: <Navigate to="/integrations" replace /> },
]

export default catalogRoutes
