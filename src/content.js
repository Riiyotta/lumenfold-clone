// All copy is original placeholder content for the fictional brand "Lumenfold".

export const nav = [
  {
    label: 'Platform',
    columns: [
      { heading: 'Build', items: ['Agent studio', 'Workflow canvas', 'Knowledge base', 'Tool library'] },
      { heading: 'Run', items: ['Scheduler', 'Live monitor', 'Human review', 'Usage controls'] },
      { heading: 'Measure', items: ['Evaluations', 'Cost explorer', 'Run history', 'Audit trail'] },
      { heading: 'Connect', items: ['Integrations', 'API access', 'Webhooks', 'Data sync'] },
      { heading: 'Teams', items: ['Revenue', 'Support', 'Operations', 'Finance'] },
      { heading: 'Industries', items: ['Software', 'Logistics', 'Healthcare', 'Retail'] },
      { heading: 'Templates', items: ['Lead triage', 'Ticket routing', 'Invoice checks', 'Weekly digest'] },
      { heading: 'Security', items: ['Access roles', 'Data residency', 'Private models', 'Compliance'] },
    ],
  },
  { label: 'Solutions', columns: [
    { heading: 'By team', items: ['Sales', 'Marketing', 'Support', 'People ops'] },
    { heading: 'By size', items: ['Startups', 'Mid-market', 'Enterprise', 'Agencies'] },
  ] },
  { label: 'Resources', columns: [
    { heading: 'Learn', items: ['Field guide', 'Webinars', 'Changelog', 'Docs'] },
    { heading: 'Community', items: ['Forum', 'Events', 'Partners', 'Showcase'] },
  ] },
  { label: 'Company', columns: [
    { heading: 'About', items: ['Our story', 'Careers', 'Newsroom', 'Contact'] },
  ] },
  { label: 'Pricing' },
]

export const hero = {
  title: 'Meet your agents',
  subtitle: 'Your new teammates never sleep',
  body: 'Lumenfold lets any team design, launch and supervise AI agents that take repetitive work off the desk, without a single line of code.',
  primary: 'Watch the tour',
  secondary: 'Start free',
  bubbles: [
    'Morning! Three new leads are waiting.',
    'I drafted replies for your inbox.',
    'Want me to tidy up the CRM?',
    'Invoices are matched and filed.',
    'All caught up. Coffee time?',
  ],
}

export const logos = [
  { name: 'Northwind', link: 'Read story' }, { name: 'Halcyon' }, { name: 'Brightpath', link: 'Read story' },
  { name: 'Quillstone', link: 'Read story' }, { name: 'Orbital' }, { name: 'Tidewater', link: 'Read story' },
  { name: 'Ferrocene' }, { name: 'Maplewood', link: 'Read story' }, { name: 'Vantage&Co', link: 'Read story' },
  { name: 'Kestrel' }, { name: 'Lumora', link: 'Read story' }, { name: 'Pinecrest' },
]

export const tiles = {
  title: 'A calmer way to share the work between people and agents',
  body: 'Start with one task, then hand over more as trust grows. Lumenfold agents learn your process, check in when they are unsure, and keep a clear record of every step so your team stays in control the whole way.',
  items: [
    { label: 'Step one', title: 'Teach an agent your process', body: 'We map your workflows with you and find the agent use cases that matter most to your team.', pills: ['Reads the brief', 'Checks the CRM and enriches each lead', 'Drafts a reply'] },
    { label: 'Step two', title: 'Grow a small agent crew', body: 'Link agents together so one gathers, one decides and one follows up. Every hand-off is logged, scored and easy to review, so you can tune each step with confidence.' },
    { label: 'Step three', title: 'Review the pilot, harden it for production, and plan the next agent use cases.', body: 'Add new skills as you go. Agents pick up fresh tasks, report weekly progress, and free your people for the work only they can do.', pills: ['Ana took over intake', 'Ravi handles renewals'] },
  ],
}

export const cases = [
  { company: 'Northwind', title: 'How Northwind cleared a two-week support backlog in four days with agents', cta: 'Read the story', stats: [['4 days', 'to clear backlog'], ['62%', 'tickets auto-resolved'], ['9 hrs', 'saved per rep weekly']] },
  { company: 'Tidewater', title: 'Tidewater gave every account manager a research assistant that never tires', cta: 'Read the story', stats: [['3x', 'more accounts covered'], ['40 min', 'prep time cut'], ['$1.2M', 'new pipeline added in a quarter']] },
  { company: 'Brightpath', title: 'Brightpath now answers every inbound lead in under a minute, day or night', cta: 'Read the story', stats: [['48 sec', 'median first reply to new leads'], ['27%', 'lift in meetings'], ['24/7', 'coverage']] },
]

export const useCases = {
  title: 'Ready-made agents for the busywork that keeps slowing teams down',
  body: 'Pick a starting point, adjust it to the way your team works, and have it running before lunch today.',
  tabs: ['Sales', 'Support', 'Operations', 'Marketing'],
  more: '+3 more',
  cards: [
    { title: 'Lead qualifier', body: 'Scores every new signup against your ideal buyer profile.', kind: 'tags' },
    { title: 'Meeting booker', body: 'Finds a time that suits everyone and books it.', kind: 'calendar' },
    { title: 'Account researcher', body: 'Builds a one-page brief before each sales call.', kind: 'list' },
    { title: 'Follow-up writer', body: 'Drafts thoughtful nudges after every meeting.', kind: 'timeline' },
    { title: 'Deal desk helper', body: 'Checks every quote against your pricing rules in seconds.', kind: 'bars' },
    { title: 'Churn watcher', body: 'Flags accounts showing early signs of risk.', kind: 'stack' },
    { title: 'Renewal reminder', body: 'Lines up renewal tasks a full quarter ahead.', kind: 'list' },
    { title: 'Pipeline tidier', body: 'Fixes stale stages and missing fields overnight.', kind: 'tags' },
  ],
  ctaText: 'Not sure where to start? We can help you pick.',
  cta: 'Talk to us',
}

export const costHero = {
  title: 'See what agents really cost you',
  titleLines: ['See what agents', 'really cost you'],
  body: 'Every run is tracked with its tools, model, quality score and price, so budgets never surprise you.',
  primary: 'Book a demo',
  secondary: 'View pricing',
  tabs: ['Revenue team', 'Support desk', 'Finance ops', 'People team'],
  kpis: [
    { label: 'Tasks completed', value: '18,402', delta: '+12% this week', tone: 'indigo' },
    { label: 'Average eval score', value: '96.4%', delta: '+1.8 pts', tone: 'teal' },
    { label: 'Cost per task', value: '$0.041', delta: '-9% vs last month', tone: 'teal' },
    { label: 'Hours returned', value: '1,236', delta: '+204 this week', tone: 'indigo' },
  ],
  columns: ['Task', 'Agent', 'Model', 'Eval', 'Cost'],
  rows: [
    ['Qualify inbound signup', 'Iris', 'Model A', '98%', '$0.03'],
    ['Summarise discovery call', 'Milo', 'Model B', '95%', '$0.06'],
    ['Update deal stage', 'Iris', 'Model A', '99%', '$0.01'],
    ['Draft follow-up email', 'Juno', 'Model C', '94%', '$0.04'],
    ['Enrich company profile', 'Milo', 'Model B', '97%', '$0.05'],
    ['Book intro meeting', 'Juno', 'Model A', '96%', '$0.02'],
    ['Check quote discount', 'Iris', 'Model C', '99%', '$0.02'],
    ['Log call notes', 'Milo', 'Model A', '97%', '$0.01'],
    ['Flag at-risk renewal', 'Juno', 'Model B', '93%', '$0.07'],
    ['Route support ticket', 'Iris', 'Model C', '98%', '$0.02'],
  ],
}

export const autonomy = {
  title: 'Four stages from helper to trusted teammate',
  body: 'Agents earn more freedom as they prove themselves. Choose how much each one gets and change it any time.',
  tabs: ['Assist', 'Suggest', 'Act with review', 'Fully hands-off'],
  levels: [
    { name: 'Assist', body: 'The agent prepares drafts and notes while a person does the final work.' },
    { name: 'Suggest', body: 'The agent proposes next steps and waits for a quick yes before acting.' },
    { name: 'Review', body: 'The agent acts on its own and a teammate spot-checks the results later.' },
    { name: 'Hands-off', body: 'The agent owns the task end to end and only escalates real exceptions.' },
  ],
}

export const enterprise = {
  title: 'Built for demanding teams',
  body: 'Lumenfold keeps your data private, your access tidy and your auditors happy, with controls that grow with your company.',
  badges: ['Audit', 'Privacy'],
  columns: [
    { title: 'Access and identity', items: ['Single sign-on', 'Role-based permissions', 'Team workspaces', 'Session controls'] },
    { title: 'Data protection', items: ['Encryption at rest and in transit', 'Regional data hosting', 'Bring your own model provider keys', 'No model training'] },
    { title: 'Oversight', items: ['Full audit log', 'Human approval steps', 'Usage limits', 'Alerting with dedicated support'] },
  ],
}

export const integrations = { titleStart: 'Plugs into all your', highlight: 'tools', link: 'Browse all integrations' }

export const testimonials = [
  { company: 'Quillstone', quote: 'Our agents handle the busywork now, so the team spends its days with customers instead of spreadsheets.', name: 'Dana Whitlock', role: 'Head of Revenue Operations, Quillstone' },
  { company: 'Maplewood', quote: 'We launched our first agent in an afternoon. Three months later it quietly runs half of our onboarding checklist for us.', name: 'Sam Okafor', role: 'Director of Customer Success, Maplewood' },
]

export const featured = {
  label: 'As seen in',
  press: ['The Ledger', 'Signal Daily', 'Forge Weekly', 'Byteline'],
  awards: [
    { name: 'Analyst Hub', caption: 'Rising vendor of the year' },
    { name: 'Peer Review', caption: 'Rated 4.8 by users', stars: true },
    { name: 'Growth 50', caption: 'Fastest growing tools list' },
    { name: 'Market Map', caption: 'Leader in agent platforms' },
  ],
}

export const learnMore = {
  title: 'Go deeper with us',
  cards: [
    { title: 'The complete field guide to rolling out AI agents across your whole company', body: 'A practical playbook covering pilots, success metrics, rollout plans and the mistakes we see teams make most often.', cta: 'Get the guide', visual: 'report' },
    { title: 'Live session: building your first agent crew', body: 'Join our product team as they build a working three-agent workflow from scratch, live, and answer all your questions along the way.', cta: 'Save a seat', visual: 'people' },
  ],
}

export const footer = {
  tagline: 'AI agents for every team',
  legal: '© 2026 Lumenfold Labs. A fictional company built for demo use.',
  groups: [
    { title: 'Use Cases', links: ['Sales', 'Customer Success', 'Marketing', 'Service Support', 'Operations', 'People and Talent', 'Research'] },
    { title: 'Platform', links: ['Overview', 'Agents', 'Agent Teams', 'Toolkit'] },
    { title: 'Compare', links: ['Scripts', 'In-house agent platforms', 'Classic RPA', 'Chatbot builders', 'Legacy workflow suites', 'Macros', 'Bots'] },
    { title: 'Support', links: ['Get in touch', 'Documentation', 'Changelog', 'API and SDK', 'Pricing', 'Book a call', 'Enterprise', 'Partners', 'Find a partner agency'] },
    { title: 'Learn', links: ['Lumenfold Community', 'Academy', 'Customers', 'Blog', 'Events', 'Product briefs and datasheets', 'Topics'] },
    { title: 'Company', links: ['Careers', 'Trust Center', 'Press enquiries'] },
    { title: 'Legal', links: ['Privacy policy', 'Security policy', 'Terms'] },
  ],
}
