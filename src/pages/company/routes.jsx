import Pricing from './Pricing'
import Enterprise from './Enterprise'
import AboutUs from './AboutUs'
import Careers from './Careers'
import Customers from './Customers'
import CustomerStory from './CustomerStory'
import BookDemo from './BookDemo'
import ContactSupport from './ContactSupport'
import Partners from './Partners'
import Legal from './Legal'

// Company / conversion routes. Mount inside <Routes>: companyRoutes.map(r => <Route key={r.path} {...r} />)
export const companyRoutes = [
  { path: '/pricing', element: <Pricing /> },
  { path: '/enterprise', element: <Enterprise /> },
  { path: '/about-us', element: <AboutUs /> },
  { path: '/careers', element: <Careers /> },
  { path: '/customers', element: <Customers /> },
  { path: '/customers/:slug', element: <CustomerStory /> },
  { path: '/book-a-demo', element: <BookDemo /> },
  { path: '/contact-support', element: <ContactSupport /> },
  { path: '/partners', element: <Partners /> },
  { path: '/privacy-policy', element: <Legal key="privacy" doc="privacy" /> },
  { path: '/terms-and-conditions', element: <Legal key="terms" doc="terms" /> },
  { path: '/data-security-policy', element: <Legal key="security" doc="security" /> },
]

export default companyRoutes
