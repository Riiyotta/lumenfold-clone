import FeatureDetail from './FeatureDetail'
import PhoneAgent from './PhoneAgent'
import BulkRun from './BulkRun'
import Tools from './Tools'
import Workforce from './Workforce'
import Gtm from './Gtm'
import Invent from './Invent'
import Slack from './Slack'
import Features from './Features'

// Product (system A) routes, auto-registered by src/App.jsx.
export const productRoutes = [
  { path: '/knowledge', element: <FeatureDetail key="knowledge" page="knowledge" /> },
  { path: '/approvals-escalations', element: <FeatureDetail key="approvals" page="approvals" /> },
  { path: '/version-control', element: <FeatureDetail key="version" page="version" /> },
  { path: '/collaboration', element: <FeatureDetail key="collaboration" page="collaboration" /> },
  { path: '/phone-agent', element: <PhoneAgent /> },
  { path: '/workforce', element: <Workforce /> },
  { path: '/gtm', element: <Gtm /> },
  { path: '/invent', element: <Invent /> },
  { path: '/slack', element: <Slack /> },
  { path: '/features', element: <Features /> },
  { path: '/bulk-run', element: <BulkRun /> },
  { path: '/tools', element: <Tools /> },
]
