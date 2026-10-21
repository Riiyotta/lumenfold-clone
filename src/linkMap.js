// Nav/footer label → route. Unmapped labels fall back to the 404 "still being built" page.
const map = {
  // Company & conversion
  Pricing: '/pricing', Enterprise: '/enterprise', 'Our story': '/about-us', About: '/about-us', Careers: '/careers',
  Customers: '/customers', 'Book a call': '/book-a-demo', 'Book a demo': '/book-a-demo', Contact: '/contact-support',
  'Get in touch': '/contact-support', Partners: '/partners', 'Find a partner agency': '/partners',
  'Privacy policy': '/privacy-policy', Privacy: '/privacy-policy', Terms: '/terms-and-conditions',
  'Security policy': '/data-security-policy', Security: '/data-security-policy', 'Trust Center': '/data-security-policy',
  'Press enquiries': '/contact-support', Newsroom: '/blog',
  // Editorial
  Blog: '/blog', Changelog: '/changelog', Events: '/events', Webinars: '/events', Resources: '/resources',
  'Field guide': '/resources', 'Product briefs and datasheets': '/resources', Topics: '/topics', Docs: '/learn',
  Documentation: '/learn', 'API and SDK': '/learn', 'Lumenfold Community': '/resources', Forum: '/resources',
  Community: '/resources', Showcase: '/customers', FAQ: '/frequently-asked-questions',
  // Comparisons
  Compare: '/vs', Scripts: '/vs', 'In-house agent platforms': '/vs', 'Classic RPA': '/vs', 'Chatbot builders': '/vs',
  'Legacy workflow suites': '/vs', Macros: '/vs', Bots: '/vs',
  // Catalog
  Integrations: '/integrations', 'Tool library': '/integrations', 'Data sync': '/integrations', Agents: '/agents',
  'Agent studio': '/agents', Overview: '/agents', Workflows: '/workflows', 'Workflow canvas': '/workflows',
  'Agent Teams': '/workflows',
  Sales: '/use-cases/sales', Marketing: '/use-cases/marketing', Support: '/use-cases/support',
  'Customer Success': '/use-cases/customer-success', 'Service Support': '/use-cases/support',
  Operations: '/use-cases/operations', 'People and Talent': '/use-cases/people', 'People ops': '/use-cases/people',
  Research: '/use-cases/research', Revenue: '/use-cases/sales', Finance: '/use-cases/operations',
}

export const linkFor = label => map[label] || `/${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
