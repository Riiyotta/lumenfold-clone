// Catalog / detail page copy for the fictional brand "Lumenfold".
// Every app, agent, workflow and article here is invented placeholder content.

/* ------------------------------------------------------------------ */
/* Function palettes (PAGES_CATALOG A.0)                               */
/* ------------------------------------------------------------------ */
export const palettes = {
  sales: { deep: '138,105,255', second: '109,74,255', warm: '199,207,255', base: ['#e6e6fb', '#e2e3fa', '#dfe2fa'], a: '#6056ff', d: '#4b40d6' },
  cs: { deep: '207,161,251', second: '244,114,182', warm: '125,170,255', base: ['#f0ddff', '#f6e3fb', '#fbe8f5'], a: '#db2777', d: '#be185d' },
  marketing: { deep: '116,187,224', second: '167,139,250', warm: '110,231,183', base: ['#bbe2ff', '#cbeaff', '#d6f0f5'], a: '#0284c7', d: '#0369a1' },
  hr: { deep: '122,196,187', second: '143,231,199', warm: '255,190,80', base: ['#bfe9d6', '#cdeede', '#d9f2e6'], a: '#0e9384', d: '#0a7468' },
  support: { deep: '251,146,60', second: '253,186,116', warm: '244,114,182', base: ['#ffe4cf', '#ffe9d6', '#ffe1e6'], a: '#ea580c', d: '#c2410c' },
  operations: { deep: '52,211,153', second: '110,231,183', warm: '96,165,250', base: ['#c6f0dd', '#d2f3e4', '#d9ecff'], a: '#059669', d: '#047857' },
  research: { deep: '167,139,250', second: '196,181,253', warm: '244,114,182', base: ['#e5ddff', '#ece5ff', '#f4e3fb'], a: '#7c3aed', d: '#6d28d9' },
}

/* ------------------------------------------------------------------ */
/* Integrations: 15 categories x 8 fictional apps                      */
/* ------------------------------------------------------------------ */
// [label, nouns used in step rows, phrase used in detail copy]
const cats = [
  ['CRM & Pipeline', ['contact', 'deal'], 'pipeline'],
  ['Email & Inbox', ['message', 'draft'], 'inbox'],
  ['Calendars & Scheduling', ['event', 'booking'], 'calendar'],
  ['Docs & Knowledge', ['page', 'note'], 'knowledge base'],
  ['Project Management', ['task', 'project'], 'project boards'],
  ['Customer Support', ['ticket', 'reply'], 'support queue'],
  ['Finance & Billing', ['invoice', 'payment'], 'finance records'],
  ['Marketing Automation', ['campaign', 'segment'], 'campaigns'],
  ['Analytics & BI', ['report', 'metric'], 'dashboards'],
  ['Data & Warehousing', ['table', 'row'], 'data stores'],
  ['HR & Recruiting', ['candidate', 'employee'], 'people data'],
  ['E-commerce & Retail', ['order', 'product'], 'storefront'],
  ['Developer Tools', ['issue', 'build'], 'engineering tools'],
  ['Chat & Messaging', ['channel', 'thread'], 'team chat'],
  ['Files & Storage', ['file', 'folder'], 'shared files'],
]

const apps = [
  // CRM & Pipeline
  ['Pipewise', 'Track every deal stage and let agents nudge stalled opportunities forward.'],
  ['Dealhaven', 'A shared home for accounts, contacts and the notes your sellers leave behind after each call.'],
  ['Closewren', 'Lightweight pipeline for small teams.'],
  ['Leadloom', 'Capture inbound leads from forms and enrich them before a rep ever opens the record.'],
  ['Accountry', 'Account planning boards with stakeholder maps, renewal dates and health notes in one view.'],
  ['Funnelby', 'Visual sales funnels that update themselves as deals move.'],
  ['Kinroster', 'Relationship tracking for partnerships and channel teams who juggle many contacts at once across regions, programs and shared accounts.'],
  ['Prospectory', 'Build prospect lists and keep them fresh.'],
  // Email & Inbox
  ['Mailfern', 'Shared inboxes with tidy labels, assignments and drafts that agents can prepare for you.'],
  ['Inboxwell', 'Send, sort and archive mail at scale.'],
  ['Letterkite', 'Transactional email with templates, previews and delivery logs that agents can read when a customer asks where their message went.'],
  ['Postmoss', 'Quiet, private mail for small offices.'],
  ['Replyly', 'Suggested replies and snippets for busy teams.'],
  ['Threadnest', 'Group long conversations into readable threads and surface the ones still waiting on you.'],
  ['Sendwick', 'Bulk outreach with throttling and bounce handling.'],
  ['Quillpost', 'Newsletters and one-off sends.'],
  // Calendars & Scheduling
  ['Meetmoth', 'Booking pages that respect focus time.'],
  ['Clockfern', 'Team calendars with shared availability, buffers and travel time so agents can find a slot that actually works for everyone.'],
  ['Timequill', 'Log hours against projects without leaving your calendar.'],
  ['Bookwell', 'Appointment booking for clinics, studios and service desks.'],
  ['Hourglen', 'Simple shift planning.'],
  ['Datebird', 'Round-robin scheduling that spreads meetings fairly across a team and reschedules politely when plans change.'],
  ['Weekwren', 'Weekly planning boards that line up tasks with open calendar blocks.'],
  ['Slotsmith', 'Room and resource booking for offices.'],
  // Docs & Knowledge
  ['Notewhale', 'Collaborative docs with comments, mentions and version history.'],
  ['Wikifold', 'An internal wiki your agents can search, quote and keep up to date when policies change.'],
  ['Pagegrove', 'Structured pages for playbooks.'],
  ['Briefbarn', 'Store creative briefs, approvals and final assets together so nothing gets lost between teams.'],
  ['Knowcove', 'Answers for your help center, written once and reused everywhere customers ask the same question in slightly different words.'],
  ['Scrollmint', 'Long-form writing with outlines and review.'],
  ['Inkmeadow', 'Meeting notes that turn into action items.'],
  ['Docuthorn', 'Contracts and policy documents with clause search.'],
  // Project Management
  ['Taskfinch', 'Fast task lists with due dates, owners and gentle reminders.'],
  ['Sprintmoor', 'Sprint planning for product and engineering teams that want estimates, burndown and retros in one place.'],
  ['Boardhollow', 'Kanban boards for any process.'],
  ['Tickety', 'Small-team task tracking.'],
  ['Roadwren', 'Roadmaps that connect goals to the work underneath them.'],
  ['Milestonery', 'Milestone tracking for client projects with status updates your agents can draft every Friday afternoon before the weekly sync.'],
  ['Kanbird', 'Visual work queues with limits.'],
  ['Planquay', 'Portfolio planning across many teams and quarters.'],
  // Customer Support
  ['Helpharbor', 'A calm help desk with queues, macros and satisfaction surveys built in.'],
  ['Ticketpine', 'Ticketing for growing support teams.'],
  ['Caselark', 'Case management for complex, multi-step customer issues that pass between several teams before they are resolved.'],
  ['Queuefox', 'Smart routing that sends each request to the right person.'],
  ['Assistree', 'Live chat and in-app messaging.'],
  ['Resolvo', 'Escalation tracking with timers.'],
  ['Fixhaven', 'Field service requests, visits and parts in one simple tool.'],
  ['Askmarsh', 'Community forums where customers help each other and agents step in with verified answers.'],
  // Finance & Billing
  ['Ledgerly', 'Bookkeeping for modern finance teams with clean, auditable ledgers.'],
  ['Invoicewren', 'Send invoices and chase payment.'],
  ['Billbrook', 'Subscription billing with plans, coupons, proration and dunning that agents can explain to confused customers in plain language.'],
  ['Payroost', 'Accept card and bank payments online.'],
  ['Coinquill', 'Multi-currency accounts and transfers for global teams.'],
  ['Expensemoth', 'Expense reports that check receipts against policy before a manager ever looks.'],
  ['Taxtide', 'Sales tax rates and filings.'],
  ['Receiptly', 'Capture, read and file receipts automatically.'],
  // Marketing Automation
  ['Adwick', 'Plan and pace paid campaigns across channels.'],
  ['Funnelfern', 'Landing pages and forms that feed straight into your nurture flows.'],
  ['Blastbird', 'Email campaigns for small brands.'],
  ['Segmint', 'Audience segments built from product usage, purchase history and profile fields, refreshed every hour.'],
  ['Brandbrook', 'Brand assets and guidelines in one library.'],
  ['Promoss', 'Promotions and discount codes.'],
  ['Newslark', 'Social scheduling with a shared content calendar and approvals for every post before it goes live.'],
  ['Reachwell', 'Lifecycle messaging across email, push and text, triggered by what customers actually do.'],
  // Analytics & BI
  ['Metricove', 'Product analytics with events, funnels and retention.'],
  ['Chartling', 'Quick charts from any spreadsheet.'],
  ['Dashmoor', 'Shared dashboards for leadership reviews, with notes and owners for every number on the page.'],
  ['Graphfen', 'Explore relationships across your data.'],
  ['Trendquay', 'Forecasts and anomaly alerts for the metrics that matter most to your business each week.'],
  ['Pulseboard', 'Real-time KPI walls for the office.'],
  ['Statgrove', 'Experiment results with clear confidence ranges.'],
  ['Cohortly', 'Cohort tables and lifetime value curves that update daily and explain themselves in a sentence or two.'],
  // Data & Warehousing
  ['Tablewren', 'A friendly database for operations teams.'],
  ['Rowharbor', 'Spreadsheet-style tables with types, views and permissions.'],
  ['Lakefold', 'Columnar storage for large event data, with fast queries your agents can run on a schedule.'],
  ['Schemadew', 'Schema registry and change review.'],
  ['Pipeloom', 'Move data between systems on a schedule with retries, alerts and a readable history of every sync.'],
  ['Warehousely', 'Managed warehouse for growing teams.'],
  ['Syncbarrow', 'Two-way sync between apps.'],
  ['Columnly', 'Data catalog with owners and definitions.'],
  // HR & Recruiting
  ['Hirewell', 'Applicant tracking with scorecards and structured interviews.'],
  ['Talentmoss', 'Source and engage candidates.'],
  ['Rosterly', 'Employee directory and org charts that stay current as people join, move and change teams.'],
  ['Peoplepine', 'Core HR records, time off and documents in one secure place for every employee.'],
  ['Onboardo', 'Onboarding checklists that assign work to IT, managers and buddies automatically.'],
  ['Payslate', 'Payroll runs and pay slips.'],
  ['Benefitly', 'Benefits enrollment made clear.'],
  ['Recruitwren', 'Interview scheduling and candidate updates for high-volume hiring teams across many locations, time zones and open roles.'],
  // E-commerce & Retail
  ['Cartwren', 'Hosted storefronts with themes, carts and checkout.'],
  ['Shopmoss', 'A tiny shop for makers.'],
  ['Orderloft', 'Order management across marketplaces, warehouses and stores with one shared view of every shipment.'],
  ['Stockquay', 'Inventory counts and reorder points.'],
  ['Checkoutly', 'Faster checkout with saved details.'],
  ['Parcelfin', 'Shipping labels, rates and tracking updates customers can follow without opening a ticket.'],
  ['Basketry', 'Product bundles and upsells.'],
  ['Returnwell', 'Self-serve returns and exchanges with rules for refunds, store credit and restocking.'],
  // Developer Tools
  ['Commitfox', 'Code hosting with reviews and branch rules.'],
  ['Buildmoor', 'Continuous integration with fast, cached builds.'],
  ['Deploywren', 'One-click deploys with previews for every change and a rollback button your on-call engineer will appreciate.'],
  ['Logpine', 'Search and tail application logs.'],
  ['Issuequay', 'Issue tracking for engineering teams with labels, priorities and links back to the code that fixed them.'],
  ['Branchly', 'Feature flags and gradual rollouts.'],
  ['Testgrove', 'End-to-end test runs and reports.'],
  ['Hookwell', 'Reliable webhooks with retries.'],
  // Chat & Messaging
  ['Chatterbarn', 'Team chat with channels and threads.'],
  ['Pingmoss', 'Lightweight alerts to phones and desktops.'],
  ['Huddlewren', 'Quick audio rooms for teams that would rather talk for two minutes than type for twenty.'],
  ['Murmurly', 'Async video updates.'],
  ['Channelfin', 'Shared channels with partners and customers, with guest access and clear boundaries.'],
  ['Echoquay', 'Announcements that reach everyone.'],
  ['Pagerlark', 'On-call paging and escalation policies so the right engineer is woken up, and only when it matters.'],
  ['Roomfern', 'Chat rooms for communities.'],
  // Files & Storage
  ['Filegrove', 'Cloud storage with fast search across every document.'],
  ['Boxwren', 'Simple file sharing.'],
  ['Vaultmoss', 'Encrypted storage for sensitive records, with access logs auditors can read without a translator.'],
  ['Folderly', 'Folder templates for client work.'],
  ['Drivequay', 'Team drives with permissions.'],
  ['Sharefin', 'Send large files with expiring links and download receipts.'],
  ['Archivewell', 'Long-term archives with retention rules that delete what you no longer need to keep.'],
  ['Clipharbor', 'Screenshots and short clips.'],
]

const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
const cap = s => s[0].toUpperCase() + s.slice(1)

const actionTpl = [
  ['Create {o}', 'Adds a new {o} with mapped fields.'],
  ['Update {o}', 'Changes fields on an existing {o}.'],
  ['Find {o}', 'Looks up a {o} by any field you choose.'],
  ['List {o}s', 'Returns recent {o}s with optional filters.'],
  ['Tag {o}', 'Applies or clears labels on a {o}.'],
  ['Summarize {o}', 'Writes a short, readable digest of a {o}.'],
  ['Archive {o}', 'Moves a {o} out of view after a check.'],
]
const triggerTpl = [
  ['New {o}', 'Fires whenever a {o} is created.'],
  ['{O} updated', 'Fires when a tracked {o} field changes.'],
  ['{O} removed', 'Fires right after a {o} is deleted.'],
  ['{O} matched', 'Fires when a {o} meets your filter rule.'],
]
const fill = (t, o) => t.replace(/\{o\}/g, o).replace(/\{O\}/g, cap(o))

export const categories = cats.map(c => c[0])

export const integrations = apps.map(([name, desc], i) => {
  const [category, nouns, phrase] = cats[Math.floor(i / 8)]
  const h = hash(name)
  // Some apps have no steps at all (section omitted), some exceed the 12-row cap.
  const nA = h % 5 === 0 ? 0 : 2 + (h % 13)
  const nT = h % 5 === 0 ? 0 : h % 9
  const actions = []
  for (let k = 0; k < nA; k++) { const [t, d] = actionTpl[k % actionTpl.length]; const o = nouns[Math.floor(k / actionTpl.length) % 2]; actions.push([fill(t, o), fill(d, o)]) }
  const triggers = []
  for (let k = 0; k < nT; k++) { const [t, d] = triggerTpl[k % triggerTpl.length]; const o = nouns[Math.floor(k / triggerTpl.length) % 2]; triggers.push([fill(t, o), fill(d, o)]) }
  return { name, slug: slugify(name), category, phrase, desc, seed: i, actions, triggers }
})

export const catalogIndex = {
  title: 'Connect Lumenfold agents to the tools your team already lives in',
  body: 'Browse more than a hundred ready connectors. Each one gives agents safe, scoped access to real everyday work.',
  primary: 'Start building free',
  secondary: 'Talk to sales',
  search: 'Search integrations',
  all: 'All categories',
  reset: 'Reset',
  loadMore: 'Load more integrations',
  empty: ['No integrations found', 'Try a different search or category.'],
  pageSize: 48,
}

export const integrationsPower = {
  title: 'Built for real-world connections',
  body: 'Lumenfold handles auth, retries and rate limits so agents can focus on outcomes.',
  items: [
    { tone: 'sales', label: 'Secure access', title: 'Scoped credentials for every single agent', body: 'Each agent receives only the permissions it needs. Tokens are stored encrypted, rotated on schedule and revoked the moment you remove a connection.', chips: ['Read only', 'Live sync'] },
    { tone: 'cs', label: 'Steady runs', title: 'Retries, limits and backoff handled for you', body: 'When an app slows down or rejects a call, Lumenfold waits, retries and reports back clearly instead of failing halfway through the job.', pills: ['Retry queued', 'Limit respected', 'Run completed'] },
    { tone: 'marketing', label: 'Custom tools', title: 'Bring any internal API in a few minutes', body: 'Describe an endpoint once and it becomes a reusable tool every agent can call, with inputs checked before anything leaves your workspace.', pills: ['Schema imported', 'Inputs validated', 'Tool published'] },
  ],
}

export const catalogFaq = {
  title: 'Frequently asked questions',
  lead: 'Still curious about something else?',
  link: 'Contact our support team',
  items: [
    ['Do I need to write code to connect an app?', 'No. Most connectors take a single sign-in. Pick the app, approve the requested access and your agents can start using it straight away.'],
    ['Which permissions does an agent receive?', { p: 'Only the scopes you approve during setup. You can narrow them further per agent:', ul: ['Read only, or read and write', 'Limited to chosen folders, boards or lists', 'Paused or revoked at any time'] }],
    ['What happens if a connected app goes down?', 'Runs pause on that step, retry with backoff and alert the owner if the app stays unavailable. Nothing is skipped silently.'],
    ['Can I connect an internal tool that is not listed here?', 'Yes. Import an API description or define an endpoint by hand, and it becomes a private tool available only inside your workspace.'],
    ['Are integrations included on every plan?', 'Every plan includes the full connector library. Higher plans add private tools, custom rate limits and dedicated connection support.'],
  ],
}

export const catalogCta = {
  title: 'Give every agent the right set of tools',
  body: 'Start with a free workspace, connect a couple of apps and watch your first agent finish real work today.',
  primary: 'Start building free',
  secondary: 'Book a demo',
}

// T2 copy builders (detail page)
export const integrationDetail = item => ({
  crumbs: ['Home', 'Integrations', item.name],
  title: `${item.name} integration`,
  body: `Give Lumenfold agents direct access to ${item.name} so they can read, update and act on your ${item.phrase} without any copy and paste.`,
  primary: `Connect ${item.name} now`,
  secondary: 'View setup guide',
  more: `More ${item.category} integrations`,
  stepsTitle: `What your agents can do with ${item.name}`,
  stepsBody: `Every action and trigger below can be handed to an agent as a tool. Combine them freely, set approval rules, and review each call in the run history.`,
  setupTitle: `Set up ${item.name} in three steps`,
  setupBody: 'Most teams connect, test and hand the app to an agent in under ten minutes.',
  setup: [
    ['Sign in and approve access', `Choose ${item.name} from the library, sign in with an admin account and confirm the scopes your agents will be allowed to use.`],
    ['Pick the tools to share', 'Select which actions and triggers each agent may call. Leave anything sensitive switched off, or require a human approval before it runs.'],
    ['Run a test task', 'Ask an agent to complete one small job, review every step in the timeline, then turn the connection on for your whole team.'],
  ],
  setupCta: 'Start building',
  cta: {
    title: `Put ${item.name} to work with an agent`,
    body: `Connect ${item.name} once and every Lumenfold agent you build can use it safely, with a clear record of each step it takes.`,
    primary: 'Start building free',
    secondary: 'Book a demo',
  },
})

/* ------------------------------------------------------------------ */
/* Use cases (T3): one flagship agent + 7 siblings per function        */
/* Run steps: ['n', narrative] | ['t', tool label, counter]            */
/* ------------------------------------------------------------------ */
const fnData = [
  {
    fn: 'sales', label: 'Sales',
    slug: 'inbound-lead-qualifier', name: 'Inbound Lead Qualifier', desc: 'Scores new leads and books the good ones.', kind: 'tags',
    apps: ['Leadloom', 'Pipewise', 'Mailfern', 'Meetmoth'],
    h1: 'Qualify every inbound lead before lunch arrives',
    body: 'The Inbound Lead Qualifier reads each signup, researches the company, scores fit against your rules and books a call when a lead is worth it.',
    tabs: ['Demo request form', 'Free trial signup', 'Webinar attendee list'],
    runs: [
      { trigger: 'New demo request submitted in Leadloom', steps: [
        ['n', 'A request just came in from a logistics company. I will check the domain, headcount and recent hiring before scoring it.'],
        ['t', 'Looking up company profile and headcount', '01'], ['t', 'Reading the last three press mentions', '02'],
        ['n', 'They run forty depots and are hiring dispatch planners, which closely matches our ideal profile for the operations plan.'],
        ['t', 'Scoring fit against the qualification rules', '03'], ['t', 'Booking a discovery call in Meetmoth', '04'],
        ['n', 'The score is 86, above the threshold, so I offered three slots and drafted a short note for the account owner.'] ],
        result: ['Qualified and booked.', 'Harbor Freightlines scored 86 out of 100 on fit and intent. The buyer picked Thursday at 10:00 for a discovery call, and the deal now sits in Pipewise at the first stage with a research summary attached. I flagged their depot count and current routing tool as talking points for the rep.'] },
      { trigger: 'Trial workspace created by new user', steps: [
        ['n', 'Someone from a design studio started a trial. Studios this size rarely convert alone, so I will look for team signals.'],
        ['t', 'Checking invited teammates and workspace activity', '01'], ['t', 'Matching email domain to an existing account', '02'],
        ['n', 'Two colleagues joined within an hour and they connected a file store, which usually means a real evaluation is underway.'],
        ['t', 'Updating the contact record in Pipewise', '03'], ['t', 'Drafting a friendly check-in from Mailfern', '04'],
        ['n', 'I kept the tone light and offered a short setup session rather than a sales call, as your playbook suggests.'] ],
        result: ['Warm trial, nurture first.', 'Northgate Studio has three active users and one connected app after day one. I logged them as a product-qualified lead, queued a setup offer for tomorrow morning and set a reminder to re-score on day four. No sales call yet, because their usage pattern fits the self-serve path better.'] },
      { trigger: 'Webinar attendee list uploaded to Leadloom', steps: [
        ['n', 'There are 212 attendees. I will remove existing customers and partner staff, then rank the rest by fit and attention.'],
        ['t', 'Removing duplicates and current customer accounts', '01'], ['t', 'Ranking attendees by watch time and questions', '02'],
        ['n', 'Thirty-one people stayed for the full session and asked questions, and nine of them work at companies in our target segment.'],
        ['t', 'Creating nine follow-up tasks for account owners', '03'], ['t', 'Sending personalised recap emails to the rest', '04'],
        ['n', 'Each recap links the recording and the one resource most related to the question that person asked live.'] ],
        result: ['Nine hot follow-ups ready.', 'From 212 attendees, nine high-fit prospects now have tasks assigned to their account owners, with context on what they asked. The remaining 168 eligible contacts received a recap and the recording. Thirty-five records were skipped as customers or partner staff, and every decision is logged in the run history.'] },
    ],
    triggers: ['New form submission', 'Trial workspace created', 'Event list uploaded', 'Reply to outreach email'],
    actions: ['Score and route lead', 'Book discovery call', 'Update deal stage', 'Notify owner in chat'],
    features: [
      ['Researches before it scores', 'Every lead gets a short company profile pulled from public sources and your own records, so scores reflect real context rather than a form field or two.'],
      ['Follows your own rules', 'Write qualification rules the way your team already talks about fit. The agent applies them consistently and explains exactly why each lead passed or missed.'],
      ['Books the meeting for you', 'When a lead clears the bar, the agent offers open slots from the right rep’s calendar and confirms the booking without long email threads.'],
    ],
    compare: [
      ['Reps skim form fields and guess which leads deserve a call today.', 'Every lead is researched and scored against the same written rules within minutes of arriving.'],
      ['Hot leads wait in a shared inbox until someone has a spare moment.', 'Qualified leads are routed to the right owner instantly, with a summary of why they matter.'],
      ['Booking a first call takes three or four emails back and forth.', 'The agent offers open slots from the rep’s calendar and confirms the meeting in a single reply.'],
      ['CRM records are half complete and rarely updated after the first touch.', 'Contact and deal fields are filled in automatically and kept current as new signals appear.'],
      ['Nobody remembers why a lead was disqualified last quarter.', 'Each decision is logged with the reasons behind it, so you can audit and refine your rules later.'],
      ['Weekend and overnight signups go cold before Monday morning.', 'Leads are handled around the clock, so buyers hear back while their interest is still fresh.'],
    ],
    evals: [['Fit score accuracy', 94], ['Correct owner routing', 97], ['Tone matches the playbook', 88], ['Booking confirmed first try', 82]],
    siblings: [
      ['Account Researcher', 'Builds a one-page brief before every call.', 'list', 'Walk into every sales call fully prepared'],
      ['Meeting Booker', 'Finds a time and confirms it politely.', 'calendar', 'Book first meetings without the email ping-pong'],
      ['Follow-up Writer', 'Drafts tailored follow-ups after each meeting.', 'timeline', 'Send thoughtful follow-ups within minutes, every time'],
      ['Pipeline Hygienist', 'Fixes stale fields and missing next steps.', 'stack', 'Keep your pipeline clean without nagging reps'],
      ['Deal Desk Helper', 'Checks discount requests against pricing policy.', 'bars', 'Approve fair discounts faster with clear reasoning'],
      ['Lost Lead Reviver', 'Re-engages old leads when signals change.', 'tags', 'Bring lost leads back when timing finally fits'],
      ['Forecast Summarizer', 'Writes the weekly forecast note for leadership.', 'bars', 'Turn messy pipeline data into a clear forecast'],
    ],
  },
  {
    fn: 'cs', label: 'Customer success',
    slug: 'renewal-risk-scout', name: 'Renewal Risk Scout', desc: 'Warns owners early when accounts cool off.', kind: 'stack',
    apps: ['Dealhaven', 'Metricove', 'Helpharbor', 'Huddlewren'],
    h1: 'Spot renewal risk months before the conversation',
    body: 'Renewal Risk Scout watches usage, support history and sentiment across every account, then warns owners early with a clear reason and a next step.',
    tabs: ['Usage dropped this month', 'Champion left the company', 'Ticket volume spiking'],
    runs: [
      { trigger: 'Weekly usage report finished in Metricove', steps: [
        ['n', 'Active seats at Brightmere Health fell from 140 to 96 over four weeks. I will check whether this pattern is seasonal.'],
        ['t', 'Comparing usage with the same period last year', '01'], ['t', 'Reading recent support conversations for this account', '02'],
        ['n', 'Last year’s dip was under five percent, and two recent tickets mention a rival tool being piloted by one department.'],
        ['t', 'Updating the account health score in Dealhaven', '03'], ['t', 'Posting a risk alert in the account channel', '04'],
        ['n', 'I suggested a usage review with the department lead and attached a list of the features they stopped using.'] ],
        result: ['At risk, early warning sent.', 'Brightmere Health dropped 31 percent in active seats, well beyond its usual seasonal dip, and the renewal is 94 days away. The account owner has an alert with the evidence, a list of lapsed features and a suggested agenda for a usage review. The health score moved from 72 to 54 and is now flagged amber.'] },
      { trigger: 'Contact marked as departed in Dealhaven', steps: [
        ['n', 'Our main champion at Copperline Foods changed jobs. Without a sponsor, renewals of this size often stall in procurement.'],
        ['t', 'Finding other active users at the account', '01'], ['t', 'Ranking contacts by seniority and product usage', '02'],
        ['n', 'Two power users remain, and one manages the team that owns the budget line, so she is the natural new sponsor.'],
        ['t', 'Drafting an introduction note for the account owner', '03'], ['t', 'Creating a follow-up task due this Friday', '04'],
        ['n', 'I also noted the former champion’s new company as a possible lead and passed it to the sales team.'] ],
        result: ['New sponsor identified.', 'Copperline Foods lost its champion, but Dana Ortiz, who leads the budget-owning team and logs in daily, is a strong replacement. The owner has a drafted introduction and a task due Friday. The departed champion’s new employer went to sales as a warm lead, with a short note explaining the history.'] },
      { trigger: 'Ticket count doubled for one account', steps: [
        ['n', 'Fenwick Labs opened eleven tickets in five days, against a normal two. I will group them to find a shared cause.'],
        ['t', 'Clustering open tickets by topic and severity', '01'], ['t', 'Checking release notes for related recent changes', '02'],
        ['n', 'Eight tickets relate to the export format shipped last Tuesday, so this looks like a product issue rather than churn.'],
        ['t', 'Linking tickets to the known issue in Helpharbor', '03'], ['t', 'Sharing a status summary with the account owner', '04'],
        ['n', 'I kept the health score steady and recommended a proactive apology once the fix ships to customers.'] ],
        result: ['Product issue, not churn.', 'Fenwick Labs’ spike traces back to last week’s export change, which explains eight of eleven tickets. They are linked to the known issue, the account owner has a plain summary, and a reminder is set to send a proactive note once engineering confirms the fix. Renewal risk is unchanged for now.'] },
    ],
    triggers: ['Weekly usage report', 'Contact role changes', 'Support ticket spike', 'Survey score submitted'],
    actions: ['Update health score', 'Alert account owner', 'Draft outreach note', 'Open save plan task'],
    features: [
      ['Reads every signal at once', 'Usage, tickets, survey answers and contact changes are combined into one view, so a quiet decline is caught even when no single number looks alarming.'],
      ['Explains each risk clearly', 'Alerts arrive with the evidence behind them and a plain-language reason, so owners know what changed and why it matters before calling.'],
      ['Suggests the next move', 'For every flagged account the agent proposes a concrete step, from a usage review to an executive check-in, based on what worked before.'],
    ],
    compare: [
      ['Health scores are updated by hand once a quarter, if at all.', 'Health scores refresh daily from usage, tickets and sentiment, with every change explained.'],
      ['Risk surfaces when the customer asks to cancel at renewal time.', 'Owners hear about risk months earlier, while there is still time to change the outcome.'],
      ['Champion changes go unnoticed until emails start bouncing.', 'Role changes are caught quickly and a replacement sponsor is suggested from active users.'],
      ['Ticket spikes look like churn even when the product is at fault.', 'Ticket clusters are linked to known issues, so teams respond to the real cause instead.'],
      ['Every manager tracks accounts in a different spreadsheet.', 'One shared view shows each account’s status, the evidence behind it and the agreed next step.'],
      ['Save plays depend on who happens to own the account.', 'Proven save plays are suggested consistently, so every customer gets the same thoughtful care.'],
    ],
    evals: [['Risk flagged before renewal', 93], ['Correct reason identified', 91], ['Outreach tone approved', 87], ['Sponsor suggestion accepted', 84]],
    siblings: [
      ['Onboarding Guide', 'Walks new accounts through their first month.', 'timeline', 'Help new customers reach value in weeks'],
      ['Review Deck Builder', 'Prepares quarterly review slides from live data.', 'bars', 'Prepare quarterly reviews in minutes, not days'],
      ['Expansion Spotter', 'Finds teams that are ready for more seats.', 'tags', 'Find expansion opportunities hiding in usage data'],
      ['Survey Responder', 'Replies to every survey comment personally.', 'list', 'Answer every survey comment with genuine care'],
      ['Adoption Coach', 'Nudges users toward features they skipped.', 'stack', 'Grow product adoption one helpful nudge away'],
      ['Renewal Paperwork Clerk', 'Prepares quotes and renewal forms early.', 'calendar', 'Have renewal paperwork ready long before deadlines'],
      ['Sponsor Update Writer', 'Drafts monthly notes for customer sponsors.', 'timeline', 'Keep executive sponsors informed without extra meetings'],
    ],
  },
  {
    fn: 'marketing', label: 'Marketing',
    slug: 'campaign-brief-writer', name: 'Campaign Brief Writer', desc: 'Drafts complete campaign briefs from rough ideas.', kind: 'list',
    apps: ['Briefbarn', 'Segmint', 'Adwick', 'Newslark'],
    h1: 'Turn rough ideas into launch-ready campaign briefs',
    body: 'Campaign Brief Writer gathers goals, audience data and past results, then drafts a complete brief with messaging, channels and timelines your team can review quickly.',
    tabs: ['Product launch request', 'Seasonal promotion idea', 'Webinar series kickoff'],
    runs: [
      { trigger: 'New request filed in Briefbarn today', steps: [
        ['n', 'Product asked for launch support for the new reporting feature. I will pull the spec, audience data and similar past launches.'],
        ['t', 'Reading the feature spec and release date', '01'], ['t', 'Pulling audience size for active admins in Segmint', '02'],
        ['n', 'About 4,800 admins use reports weekly. Our last two feature launches did best with a short video and an in-app banner.'],
        ['t', 'Comparing results from the last six launches', '03'], ['t', 'Drafting the brief with three message options', '04'],
        ['n', 'I proposed a two-week plan across email, in-app and social, and flagged the release date as tight for video.'] ],
        result: ['Brief ready for review.', 'The reporting launch brief covers the goal, audience, three headline options, a channel plan and a day-by-day timeline. It targets 4,800 weekly report users first, then all admins. A budget estimate and success metrics are included, with a risk note that the video may need a simpler format to meet the date.'] },
      { trigger: 'Promotion idea posted in team chat', steps: [
        ['n', 'Someone suggested a spring discount for annual plans. Before drafting, I will check margins and how the last promotion performed.'],
        ['t', 'Reviewing last year’s spring promotion results', '01'], ['t', 'Checking discount limits in the pricing policy', '02'],
        ['n', 'Last spring’s offer lifted upgrades but mostly pulled renewals forward, so a smaller targeted offer may work better this year.'],
        ['t', 'Sizing the monthly-plan segment in Segmint', '03'], ['t', 'Drafting the brief with an approval checklist', '04'],
        ['n', 'I recommended 15 percent for monthly customers only, and added finance as a required approver.'] ],
        result: ['Targeted promotion proposed.', 'The brief suggests a 15 percent annual upgrade offer limited to 2,300 monthly customers, avoiding last year’s renewal pull-forward. It includes copy for email and in-app, a three-week window, forecast impact with ranges, and an approval step for finance before anything is scheduled or announced.'] },
      { trigger: 'Webinar series added to the calendar', steps: [
        ['n', 'Marketing wants a three-part webinar series next quarter. I will outline topics based on the questions customers ask most.'],
        ['t', 'Grouping recent support questions by topic', '01'], ['t', 'Checking speaker availability for next quarter', '02'],
        ['n', 'Integrations, permissions and reporting are the top three themes, and two product managers are free on the proposed dates.'],
        ['t', 'Drafting session outlines and a promotion schedule', '03'], ['t', 'Scheduling social posts in Newslark for approval', '04'],
        ['n', 'Posts are saved as drafts so the social lead can adjust them before anything goes out.'] ],
        result: ['Series planned end to end.', 'Three sessions are outlined around integrations, permissions and reporting, each with a speaker, agenda and registration copy. Promotion starts four weeks ahead across email and social, with posts waiting as drafts in Newslark. The brief lists registration targets per session and a follow-up plan for attendees and no-shows.'] },
    ],
    triggers: ['New campaign request', 'Idea posted in chat', 'Calendar event added', 'Quarterly goals updated'],
    actions: ['Draft campaign brief', 'Size target audience', 'Schedule draft posts', 'Request stakeholder approval'],
    features: [
      ['Starts from real results', 'Every brief draws on how similar campaigns actually performed, so recommendations are grounded in your own numbers rather than generic best practice.'],
      ['Writes in your brand voice', 'Point the agent at your style guide and recent winners. Headlines, body copy and calls to action come back sounding like your own team.'],
      ['Plans the whole timeline', 'Briefs include owners, channels and dates for every step, with approvals built in, so a review meeting becomes a kickoff instead of a rewrite.'],
    ],
    compare: [
      ['Briefs start from a blank page and take most of a week.', 'A complete first draft arrives within the hour, built from your goals, data and past results.'],
      ['Audience sizes are rough guesses made the night before launch.', 'Segments are sized from live data, so every plan starts with realistic reach and targets.'],
      ['Past campaign learnings live in slide decks nobody can find.', 'Results from previous campaigns are pulled in automatically and cited right inside the brief.'],
      ['Copy drifts from brand guidelines as more people edit it.', 'Drafts follow your style guide closely, with tone notes included for every channel.'],
      ['Approvals happen in scattered threads and get forgotten.', 'Approval steps are part of the brief, with named reviewers and clear deadlines for each one.'],
      ['Scheduling posts is a separate, manual chore after sign-off.', 'Approved content is queued as drafts in your tools, ready to publish with a single click.'],
    ],
    evals: [['Brief sections complete', 96], ['Brand voice adherence', 92], ['Audience data accuracy', 89], ['Timeline is feasible', 86]],
    siblings: [
      ['Social Post Drafter', 'Writes a week of posts from one brief.', 'stack', 'Fill your social calendar from one brief'],
      ['Search Outline Builder', 'Plans articles around real search intent.', 'list', 'Plan articles people are actually searching for'],
      ['Event Promoter', 'Runs reminders before and after events.', 'calendar', 'Fill every event seat with timely reminders'],
      ['Newsletter Editor', 'Assembles the monthly newsletter from updates.', 'timeline', 'Ship a polished newsletter every single month'],
      ['Ad Copy Tester', 'Proposes variants and reports the winners.', 'bars', 'Find winning ad copy with less guesswork'],
      ['Review Collector', 'Asks happy customers for public reviews.', 'tags', 'Turn happy customers into public champions'],
      ['Launch Recap Writer', 'Summarizes results after each campaign ends.', 'bars', 'Learn from every launch with honest recaps'],
    ],
  },
  {
    fn: 'hr', label: 'People',
    slug: 'interview-loop-coordinator', name: 'Interview Loop Coordinator', desc: 'Books panels, shares prep and chases feedback.', kind: 'calendar',
    apps: ['Hirewell', 'Meetmoth', 'Recruitwren', 'Chatterbarn'],
    h1: 'Schedule full interview loops without the shuffle',
    body: 'Interview Loop Coordinator finds times that suit candidates and panels, books rooms, shares prep notes and gathers scorecards, so recruiters can focus on people.',
    tabs: ['Onsite loop requested', 'Interviewer calls in sick', 'Scorecards still missing'],
    runs: [
      { trigger: 'Candidate moved to onsite in Hirewell', steps: [
        ['n', 'Priya Shah is moving to the onsite stage for the platform engineer role. The loop needs four interviewers across two time zones.'],
        ['t', 'Reading the interview plan for this role', '01'], ['t', 'Checking four panel calendars in Meetmoth', '02'],
        ['n', 'The best window is Wednesday morning in London, which is late afternoon for the candidate and inside everyone’s working hours.'],
        ['t', 'Sending three time options to the candidate', '03'], ['t', 'Booking video rooms and sharing prep notes', '04'],
        ['n', 'Priya chose the first option, so I confirmed every invite and shared her portfolio with the panel.'] ],
        result: ['Loop booked for Wednesday.', 'Priya Shah’s four-part onsite is set for Wednesday from 09:00 to 12:30 London time, with breaks between sessions. Each interviewer has the role scorecard, her portfolio and an assigned focus area. The recruiter has a summary in Hirewell and a reminder to collect feedback by Thursday at noon.'] },
      { trigger: 'Panelist declined tomorrow’s interview session', steps: [
        ['n', 'Marcus can no longer join tomorrow’s system design interview. I will look for a trained replacement before asking to reschedule.'],
        ['t', 'Finding qualified interviewers for system design', '01'], ['t', 'Checking their availability for the same slot', '02'],
        ['n', 'Elena is trained for this interview and free at the same time, so the candidate’s schedule does not need to change.'],
        ['t', 'Swapping the invite and sharing prep notes', '03'], ['t', 'Posting a quick update in the hiring channel', '04'],
        ['n', 'I thanked Elena in the channel and logged the swap so interview load stays balanced across the team.'] ],
        result: ['Swapped with no delay.', 'Elena replaced Marcus for tomorrow’s system design session at the same time, so the candidate sees no change at all. She has the notes and scorecard. The swap is logged, and Marcus’s interview count for the month is adjusted so the rotation stays fair. Nothing is needed from the recruiter.'] },
      { trigger: 'Feedback deadline passed for candidate loop', steps: [
        ['n', 'Two of four scorecards for Jonah Reyes are still missing, and the hiring decision meeting is tomorrow morning.'],
        ['t', 'Checking which interviewers have not submitted', '01'], ['t', 'Sending friendly reminders with direct links', '02'],
        ['n', 'One interviewer submitted within ten minutes. The other is travelling, so I offered a short voice note option instead.'],
        ['t', 'Transcribing the voice note into the scorecard', '03'], ['t', 'Compiling a feedback summary for the debrief', '04'],
        ['n', 'All four perspectives are now in one place, with shared themes and disagreements clearly marked.'] ],
        result: ['Debrief pack complete.', 'All four scorecards for Jonah Reyes are in, including one captured from a voice note. The debrief summary lists strengths, concerns and the two areas where interviewers disagreed, so the meeting can focus there. The hiring manager has the pack, and the recruiter has a checklist for the next steps.'] },
    ],
    triggers: ['Candidate stage changed', 'Interviewer declines invite', 'Feedback deadline reached', 'Offer approved'],
    actions: ['Book interview panel', 'Share prep materials', 'Chase missing scorecards', 'Compile debrief summary'],
    features: [
      ['Handles every time zone', 'The agent weighs candidate and panel working hours, travel and focus time, then proposes options that feel considerate to everyone involved.'],
      ['Keeps panels balanced', 'Interview load is tracked across your team, so the same people are not booked every week and trained replacements are found quickly.'],
      ['Closes the feedback loop', 'Scorecards are chased politely, summarised clearly and delivered before the debrief, so hiring decisions never wait on a missing form.'],
    ],
    compare: [
      ['Recruiters spend hours trading emails to line up four calendars.', 'Loops are booked in minutes, with options that respect every participant’s working hours.'],
      ['A single cancellation can push the whole loop back a week.', 'Trained replacements are found for the same slot, so candidates rarely notice any change.'],
      ['Interviewers arrive without notes or a clear focus area.', 'Every panelist gets the scorecard, candidate materials and a focus area well ahead of time.'],
      ['Scorecards trickle in days late, delaying every decision.', 'Feedback is chased with friendly reminders and collected before the debrief meeting starts.'],
      ['The same few people end up doing most interviews.', 'Interview load is spread fairly across trained staff and tracked month by month for you.'],
      ['Candidates wait in silence between stages of the process.', 'Candidates receive timely, warm updates at every stage, so the experience reflects well on you.'],
    ],
    evals: [['Slots inside working hours', 98], ['Correct panel composition', 95], ['Candidate message quality', 90], ['Scorecards before debrief', 88]],
    siblings: [
      ['Offer Letter Drafter', 'Prepares offers from approved templates.', 'list', 'Send accurate offer letters on the same day'],
      ['Onboarding Buddy', 'Guides new hires through their first week.', 'timeline', 'Give every new hire a smooth first week'],
      ['Policy Answer Desk', 'Answers handbook questions with sources.', 'tags', 'Answer policy questions instantly with cited sources'],
      ['Referral Tracker', 'Keeps referrers updated on their candidates.', 'stack', 'Keep employee referrals moving and well informed'],
      ['Time-off Planner', 'Checks coverage before approving leave.', 'calendar', 'Approve time off with coverage already checked'],
      ['Sourcing Assistant', 'Shortlists profiles that match the brief.', 'list', 'Build strong shortlists from a short brief'],
      ['Exit Survey Analyst', 'Finds patterns in leaver feedback.', 'bars', 'Learn why people leave before more follow'],
    ],
  },
  {
    fn: 'support', label: 'Support',
    slug: 'support-queue-sorter', name: 'Support Queue Sorter', desc: 'Triages, tags and routes every new ticket.', kind: 'tags',
    apps: ['Helpharbor', 'Logpine', 'Knowcove', 'Pingmoss'],
    h1: 'Tickets triaged, tagged and routed within minutes',
    body: 'Support Queue Sorter reads each new ticket, checks the knowledge base and known issues, sets priority and hands it to the right team with a clear summary.',
    tabs: ['Bug report from customer', 'Billing question received', 'Outage reported by many'],
    runs: [
      { trigger: 'New ticket created in Helpharbor queue', steps: [
        ['n', 'A customer says exported reports show the wrong dates. I will check whether this matches anything we already know about.'],
        ['t', 'Searching known issues for date export errors', '01'], ['t', 'Reading the customer’s plan and region settings', '02'],
        ['n', 'There is an open issue for exports in time zones ahead of UTC, and this customer is based in Auckland.'],
        ['t', 'Linking the ticket to the existing issue', '03'], ['t', 'Setting priority and routing to the reporting team', '04'],
        ['n', 'I replied with the workaround from the issue and promised an update as soon as the fix ships.'] ],
        result: ['Matched to a known bug.', 'The ticket matches the open export time zone issue, which now has 14 linked reports. Priority is high because the customer is on an annual plan with a renewal next month. The reporting team has the summary, and the customer received a workaround that shifts the export zone until the fix is released.'] },
      { trigger: 'Billing question received through chat widget', steps: [
        ['n', 'A customer was charged twice this month. Before escalating to finance, I will check the payment records myself.'],
        ['t', 'Looking up recent charges for this account', '01'], ['t', 'Checking the refund policy for duplicate charges', '02'],
        ['n', 'The second charge came from a retried payment that should have been voided, and policy lets support refund this directly.'],
        ['t', 'Preparing the refund for agent approval', '03'], ['t', 'Drafting an apology with the refund timeline', '04'],
        ['n', 'A support lead approved the refund in one click, and the customer received a clear note with dates.'] ],
        result: ['Refunded, with approval.', 'The duplicate charge of 240 came from a payment retry that was never voided. A support lead approved the refund in one click, and the customer was told to expect it within five business days. A note was added for finance so the retry bug can be reviewed. Total handling time was four minutes.'] },
      { trigger: 'Five similar tickets arrived in minutes', steps: [
        ['n', 'Five customers report that login links are not arriving. A cluster this fast usually points to a live incident.'],
        ['t', 'Grouping the new tickets by symptom and region', '01'], ['t', 'Checking the email delivery status page', '02'],
        ['n', 'All five are in Europe, and the mail provider shows delays there, so this looks like a delivery incident.'],
        ['t', 'Paging the on-call engineer in Pingmoss', '03'], ['t', 'Posting a holding reply to affected customers', '04'],
        ['n', 'I created a parent incident ticket so new reports attach automatically instead of flooding the queue.'] ],
        result: ['Incident opened early.', 'Five login-link tickets from Europe were grouped into one incident, and the on-call engineer was paged within three minutes of the first report. Affected customers received a holding reply with a one-time code workaround. Eleven more reports have since attached to the parent ticket, keeping the main queue clear.'] },
    ],
    triggers: ['New ticket in queue', 'Chat message received', 'Ticket cluster detected', 'Customer replies again'],
    actions: ['Set priority and tags', 'Route to the right team', 'Draft a first reply', 'Page on-call engineer'],
    features: [
      ['Knows what you already know', 'Known issues, help articles and past resolutions are checked first, so duplicates are linked and answered instead of investigated again.'],
      ['Prioritises with context', 'Plan, renewal date, sentiment and impact all shape priority, so urgent tickets rise to the top even when they arrive quietly.'],
      ['Spots incidents early', 'Bursts of similar tickets are grouped and escalated as one incident, protecting your team from a flood and customers from silence.'],
    ],
    compare: [
      ['Agents read every ticket from scratch before deciding where it goes.', 'Each ticket arrives tagged, prioritised and summarised, already sitting with the right team.'],
      ['Duplicate bug reports are investigated again by different people.', 'Duplicates are linked to known issues automatically, and customers get the workaround right away.'],
      ['Priority depends on who reads the ticket first that morning.', 'Priority follows clear rules using plan, impact and sentiment, applied the same way every time.'],
      ['Incidents are noticed only after the queue has already exploded.', 'Ticket clusters open an incident within minutes, and on-call engineers are paged with context.'],
      ['Simple refunds wait in a finance queue for days.', 'Policy-approved refunds are prepared instantly and released after a single human approval.'],
      ['Customers hear nothing until a person finally opens the ticket.', 'Customers receive a helpful first reply within minutes, with honest timelines for what happens next.'],
    ],
    evals: [['Correct team routing', 96], ['Priority matches policy', 92], ['Known issue matched', 89], ['First reply accuracy', 91]],
    siblings: [
      ['Help Article Updater', 'Rewrites articles when answers go stale.', 'list', 'Keep help articles accurate as products change'],
      ['Refund Checker', 'Validates refunds against your written policy.', 'tags', 'Handle routine refunds safely in minutes'],
      ['Satisfaction Follow-up', 'Checks in after tricky tickets close.', 'timeline', 'Win back unhappy customers after tough tickets'],
      ['Saved Reply Suggester', 'Proposes saved replies for common questions.', 'stack', 'Turn repeated answers into reusable replies'],
      ['Escalation Watcher', 'Flags tickets close to breaching targets.', 'bars', 'Never miss a response target again'],
      ['Language Helper', 'Translates replies while keeping your tone.', 'tags', 'Support customers fluently in many languages'],
      ['Weekly Queue Reporter', 'Summarises trends for the support lead.', 'bars', 'See support trends without building reports'],
    ],
  },
  {
    fn: 'operations', label: 'Operations',
    slug: 'invoice-match-checker', name: 'Invoice Match Checker', desc: 'Matches invoices to orders and receipts.', kind: 'bars',
    apps: ['Ledgerly', 'Invoicewren', 'Filegrove', 'Orderloft'],
    h1: 'Match every invoice to its order automatically',
    body: 'Invoice Match Checker reads incoming invoices, compares them with purchase orders and receipts, flags any mismatch and prepares approved invoices for payment without manual keying.',
    tabs: ['Supplier invoice arrives', 'Quantity does not match', 'Month-end close checklist'],
    runs: [
      { trigger: 'Invoice email arrived in finance inbox', steps: [
        ['n', 'Westbrook Packaging sent invoice 4471 for corrugated boxes. I will read it and look for the matching purchase order.'],
        ['t', 'Extracting line items and totals from the PDF', '01'], ['t', 'Finding purchase order 2208 in Orderloft', '02'],
        ['n', 'Quantities, unit prices and tax all match the order, and the warehouse logged the delivery as received in full on Monday.'],
        ['t', 'Recording the invoice in Ledgerly for payment', '03'], ['t', 'Filing the PDF in the supplier folder', '04'],
        ['n', 'Payment is scheduled on the supplier’s standard thirty-day terms, so no one needs to touch it.'] ],
        result: ['Three-way match passed.', 'Invoice 4471 from Westbrook Packaging matches purchase order 2208 and Monday’s goods receipt on all six lines. It is recorded in Ledgerly for 3,860 with payment scheduled on standard terms. The PDF is filed in the supplier folder, and the match report is attached to the ledger entry for audit.'] },
      { trigger: 'Received quantity differs from billed amount', steps: [
        ['n', 'Halden Fresh billed 120 crates of produce, but the warehouse only received 108. I will check for a partial delivery note.'],
        ['t', 'Comparing the invoice with the goods receipt', '01'], ['t', 'Searching email for a matching delivery note', '02'],
        ['n', 'No note explains the gap, so I will hold payment on the missing crates and ask the supplier for a credit.'],
        ['t', 'Drafting a credit request to the supplier', '03'], ['t', 'Placing a partial hold in Ledgerly', '04'],
        ['n', 'The 108 delivered crates are approved for payment so the supplier relationship is not disrupted.'] ],
        result: ['Partial hold applied.', 'Halden Fresh’s invoice is approved for the 108 crates received and held for the 12 missing. A polite credit request with the goods receipt attached went to their accounts team, with the buyer copied. A reminder will check for a reply in three days, so nothing is paid twice or paid for nothing.'] },
      { trigger: 'Month-end close task list opened today', steps: [
        ['n', 'It is the last working day of the month. I will check for unmatched invoices and anything still waiting on approval.'],
        ['t', 'Listing invoices still waiting for a match', '01'], ['t', 'Checking approvals older than five days', '02'],
        ['n', 'Four invoices are unmatched and two approvals are stuck with a manager who is on leave this week.'],
        ['t', 'Reassigning approvals to the backup approver', '03'], ['t', 'Writing a close summary for the controller', '04'],
        ['n', 'The summary lists each open item, its owner and what is needed to close it today.'] ],
        result: ['Close is on track.', 'Of 312 invoices this month, 306 are matched and recorded. The four unmatched items each have an owner and a next step, and two stuck approvals were moved to the backup approver. The controller has a one-page summary showing accruals needed for the remaining items, so the books can close on schedule.'] },
    ],
    triggers: ['Invoice email received', 'Goods receipt posted', 'Approval overdue', 'Month-end date reached'],
    actions: ['Three-way match check', 'Record in the ledger', 'Request supplier credit', 'Send close summary'],
    features: [
      ['Reads any invoice format', 'PDFs, scans and emailed tables are all read line by line, so suppliers never need to change how they send invoices to you.'],
      ['Matches three ways, always', 'Each invoice is compared with its purchase order and goods receipt, catching wrong quantities, prices and duplicate bills before money leaves.'],
      ['Keeps close on schedule', 'Open items, stuck approvals and accruals are tracked through the month, so the last day is a calm review rather than a scramble.'],
    ],
    compare: [
      ['Finance staff key invoice lines into the ledger by hand.', 'Invoice lines are read and recorded automatically, with every value traced back to its source.'],
      ['Mismatches are discovered weeks later, after payment has gone out.', 'Quantities and prices are checked before approval, so overpayments are stopped at the door.'],
      ['Duplicate invoices slip through when suppliers resend them.', 'Duplicates are recognised by number, amount and supplier, and quietly set aside for review.'],
      ['Approvals stall when a manager is out of the office.', 'Stuck approvals are rerouted to backup approvers following your delegation rules.'],
      ['Month-end close means long nights chasing missing paperwork.', 'Open items are tracked all month, so close day starts with a short, clear list of what remains.'],
      ['Auditors ask for evidence that takes days to assemble.', 'Every match report is attached to its ledger entry, ready the moment an auditor asks for it.'],
    ],
    evals: [['Line extraction accuracy', 97], ['Correct match decision', 94], ['Duplicate detection', 90], ['Approval routing', 93]],
    siblings: [
      ['Vendor Onboarder', 'Collects documents from new suppliers.', 'list', 'Onboard new vendors without chasing paperwork'],
      ['Stock Reorder Planner', 'Suggests reorders before shelves run empty.', 'bars', 'Reorder stock before anyone notices it is low'],
      ['Contract Renewal Tracker', 'Warns before vendor contracts auto-renew.', 'calendar', 'Never get surprised by an auto-renewal again'],
      ['Expense Auditor', 'Checks expense claims against policy.', 'tags', 'Review expense claims consistently and fairly'],
      ['Shipment Status Updater', 'Keeps customers informed about deliveries.', 'timeline', 'Keep every customer updated on deliveries'],
      ['Data Entry Clerk', 'Moves form data into the right systems.', 'stack', 'Retire repetitive data entry for good'],
      ['Spend Report Builder', 'Summarises spending by team each month.', 'bars', 'Understand team spending without spreadsheet wrangling'],
    ],
  },
  {
    fn: 'research', label: 'Research',
    slug: 'market-signal-digest', name: 'Market Signal Digest', desc: 'Writes a cited briefing on market changes.', kind: 'timeline',
    apps: ['Wikifold', 'Trendquay', 'Notewhale', 'Echoquay'],
    h1: 'A clear market briefing waiting every morning',
    body: 'Market Signal Digest scans news, filings, reviews and your own notes each night, then writes a short, cited briefing on what changed and why it matters.',
    tabs: ['Competitor pricing changed', 'Weekly market news roundup', 'Industry report published'],
    runs: [
      { trigger: 'Tracked competitor pricing page changed overnight', steps: [
        ['n', 'A competitor updated its pricing page last night. I will compare it with the saved version from last week.'],
        ['t', 'Comparing the page with last week’s snapshot', '01'], ['t', 'Searching their changelog and announcements', '02'],
        ['n', 'They removed their free tier and added a usage-based plan, announced quietly in a support article rather than a press release.'],
        ['t', 'Checking which of our open deals mention them', '03'], ['t', 'Writing a short brief for the sales team', '04'],
        ['n', 'Seven open deals list them as an alternative, so I tagged those owners directly in the brief.'] ],
        result: ['Pricing shift summarised.', 'The competitor dropped its free tier and launched usage-based pricing starting at 49 per month. Seven open deals mention them, and their owners now have a one-page brief with talking points and source links. The change is logged in Wikifold under competitor history, with last week’s snapshot kept for comparison.'] },
      { trigger: 'Scheduled Friday morning market digest started', steps: [
        ['n', 'Time for the weekly roundup. I will scan around 400 sources and keep only items relevant to our three focus themes.'],
        ['t', 'Collecting articles published in the last week', '01'], ['t', 'Scoring relevance against the three focus themes', '02'],
        ['n', 'Twelve items cleared the bar. Two are about new data rules in our largest region, which deserve a closer look.'],
        ['t', 'Summarising each item with its source link', '03'], ['t', 'Posting the digest to the announcements channel', '04'],
        ['n', 'I put the regulation items first and suggested legal review them before Tuesday’s planning meeting.'] ],
        result: ['Digest published.', 'This week’s digest covers twelve items in under five minutes of reading. The lead story is a proposed data residency rule in our largest region, with a recommendation for legal review. Each summary links its source, and three items were added to the trends board in Trendquay for longer-term tracking.'] },
      { trigger: 'New analyst report uploaded to Notewhale', steps: [
        ['n', 'Someone uploaded a 60-page industry report. I will extract the findings that touch our segments and compare them with our data.'],
        ['t', 'Reading the report and extracting key findings', '01'], ['t', 'Comparing forecasts with our internal growth data', '02'],
        ['n', 'The report predicts slower growth in retail, but our retail pipeline grew faster than any other segment this quarter.'],
        ['t', 'Drafting a summary with agreements and gaps', '03'], ['t', 'Linking the summary to the strategy page', '04'],
        ['n', 'I highlighted the retail disagreement as worth discussing, with both data sources side by side.'] ],
        result: ['Report distilled.', 'The 60-page report is condensed into one page of findings relevant to our five segments. Four forecasts align with our data. One, slower retail growth, conflicts with our fastest-growing pipeline, and the summary shows both views side by side. It is linked from the strategy page for next month’s planning review.'] },
    ],
    triggers: ['Tracked page changes', 'Weekly schedule reached', 'Report uploaded', 'Keyword appears in news'],
    actions: ['Compare with history', 'Write cited summary', 'Tag relevant owners', 'Post team digest'],
    features: [
      ['Cites every single claim', 'Each line in a briefing links to its source, so readers can check the evidence in a click and trust what they are reading every morning.'],
      ['Filters for your themes', 'Tell the agent what matters to your strategy. It discards the noise and keeps only items that touch your markets, products or customers.'],
      ['Connects outside and inside', 'External findings are compared with your own pipeline and product data, turning generic news into insight specific to your business.'],
    ],
    compare: [
      ['Analysts skim dozens of sites every morning and still miss things.', 'Hundreds of sources are scanned nightly and only relevant items reach your team’s inbox.'],
      ['Competitor changes are noticed weeks later, usually from a customer.', 'Tracked pages are compared daily, and meaningful changes reach owners the next morning.'],
      ['Summaries arrive without sources, so nobody fully trusts them.', 'Every summary links to its sources, so readers can verify each claim in a few seconds.'],
      ['Long reports sit unread in shared folders for months.', 'Reports are distilled into one page of relevant findings within an hour of being uploaded.'],
      ['Outside research is never compared with internal numbers.', 'External findings are set beside your own data, highlighting where they agree or conflict.'],
      ['Knowledge lives in people’s heads and leaves when they do.', 'Findings are logged in your wiki with history, building a lasting record of your market.'],
    ],
    evals: [['Source citation coverage', 98], ['Relevance to focus themes', 88], ['Summary factual accuracy', 95], ['Owner tagging correct', 91]],
    siblings: [
      ['Competitor Tracker', 'Watches rival sites for meaningful changes.', 'tags', 'Know when competitors move, the morning after'],
      ['Interview Synthesizer', 'Finds themes across customer interview notes.', 'list', 'Turn interview notes into clear, shared themes'],
      ['Filing Watcher', 'Flags new public filings in your field.', 'stack', 'Stay ahead of new filings in your field'],
      ['Survey Analyst', 'Codes open answers into tidy themes.', 'bars', 'Make sense of open survey answers quickly'],
      ['Paper Reviewer', 'Summarises papers with their key takeaways.', 'list', 'Review new research without reading every paper'],
      ['Pricing Benchmarker', 'Compares public pricing across the market.', 'bars', 'Benchmark your pricing against the whole market'],
      ['Trend Spotter', 'Notices rising topics before they peak.', 'timeline', 'Catch rising trends before everyone else does'],
    ],
  },
]

const appSeed = name => (integrations.find(x => x.name === name) || { seed: name.length }).seed

// Flatten: every agent (flagship + siblings) gets a routable page. Siblings reuse their
// function's run, pipeline, comparison and evals content with their own name/hero copy.
export const useCaseList = fnData.flatMap(f => {
  const base = { fn: f.fn, fnLabel: f.label, apps: f.apps.map(n => ({ name: n, seed: appSeed(n), slug: slugify(n) })), tabs: f.tabs, runs: f.runs, triggers: f.triggers, actions: f.actions, features: f.features, compare: f.compare, evals: f.evals }
  const flagship = { ...base, slug: f.slug, name: f.name, desc: f.desc, kind: f.kind, h1: f.h1, body: f.body }
  const sibs = f.siblings.map(([name, desc, kind, h1]) => ({
    ...base, slug: slugify(name), name, desc, kind, h1,
    body: `${name} takes the repetitive parts of ${f.label.toLowerCase()} work off your plate, follows your playbook step by step and hands back anything that needs a human decision.`,
  }))
  return [flagship, ...sibs]
})

export const useCaseShared = {
  primary: 'Deploy this agent',
  secondary: 'Watch it run',
  howTitle: 'How it works',
  compareHead: ['Manual process', 'With Lumenfold'],
  evals: {
    title: 'Measured on every run, not just at launch',
    body: 'Each agent is scored against test cases your team approves. Results update with every run, and anything below its threshold is flagged for review.',
    caption: ['Pass rate, last 30 days', 'Thresholds set by your team'],
    thresholds: [90, 90, 85, 90],
  },
  deploy: {
    title: 'Three flexible ways to deploy agents',
    body: 'Run it on its own, pair it with teammates, or call it from any connected tool.',
    items: [
      { label: 'Agent teams', title: 'Hand work between specialists without losing context', body: 'Group agents into a team with a shared goal. Each one owns its step, passes clean context to the next and leaves room for one more when the work grows.' },
      { label: 'Scheduled runs', title: 'Run on a timetable your team can rely on', body: 'Set an agent to run hourly, nightly or at month end. Every run follows the same checks, and missed or failed runs alert the owner straight away.' },
      { label: 'On demand', title: 'Call it from chat, email or any connected app', body: 'Mention the agent in a channel, forward it an email or trigger it from a form. Requests queue neatly and each one gets its own readable timeline.', pills: ['Asked in chat', 'Forwarded email', 'Form submitted', 'Button in app', 'Webhook received'] },
    ],
  },
  related: label => `More ${label.toLowerCase()} agents ready to join your team`,
  stack: {
    title: 'Every agent runs on one shared stack',
    body: 'Models, memory, tools and guardrails are managed once and shared by every agent, so new agents start strong and improvements reach all of them at once.',
    items: [['Model routing', 'Per task'], ['Long-term memory', 'Per agent'], ['Knowledge sources', 'Always fresh'], ['Tool library', '120+ apps'], ['Approval rules', 'Human review'], ['Evaluations', 'Every run'], ['Run history', 'Fully searchable'], ['Access controls', 'Role based'], ['Usage limits', 'Team budgets']],
  },
  finalCta: {
    title: 'Put this agent on your team starting this week',
    body: 'Start from this template, connect the tools it needs and run it on real work with approvals switched on until you feel fully comfortable with it.',
    primary: 'Deploy this agent',
  },
}

/* ------------------------------------------------------------------ */
/* T4: /agents landing                                                 */
/* ------------------------------------------------------------------ */
export const agentsPage = {
  hero: {
    h1: ['Hire AI agents that ', 'work together', ' and report back to you'],
    body: 'Give each agent one job it does well, connect them into a team, and review every handoff in a single, readable timeline from your own desk.',
    primary: 'Start building free',
    secondary: 'Book a demo',
    prompt: 'Plan next week’s launch and brief the team',
    nodes: [['Launch Planner', 4, [3, 18]], ['Copy Writer', 9, [27, 64]], ['Ops Runner', 14, [41, 86]]],
  },
  comparison: {
    title: 'One overloaded generalist, or a team of focused specialists',
    body: 'Specialist agents share context, hand off cleanly and stay easy to test, even as the work keeps growing.',
    tabs: ['Single agent', 'Agent team'],
    single: { name: 'Do-everything bot', sub: 'One long prompt', tools: ['search.web', 'crm.update', 'mail.send', 'doc.write', 'task.create', 'chat.post'],
      card: { title: 'Context window', lines: [['Prompt length', '9,400 tokens'], ['Tools attached', '6 of 6'], ['Last eval', '71% pass']] } },
    team: { lead: ['Launch Lead', 'Orchestrator'], specialists: [
      ['Research', 21, ['search.web', 'notes.read'], [['Status', 'Gathering sources'], ['Handoff', 'To Copy'], ['Last eval', '96% pass']]],
      ['Copy', 33, ['draft.write', 'brand.check'], [['Status', 'Drafting headlines'], ['Handoff', 'To Ops'], ['Last eval', '93% pass']]],
      ['Ops', 45, ['task.create', 'chat.post'], [['Status', 'Scheduling tasks'], ['Handoff', 'To Launch Lead'], ['Last eval', '95% pass']]],
    ] },
    mobile: [
      { title: 'Single agent', items: ['One long prompt to maintain', 'Tools pile up quickly', 'Hard to test changes', 'Errors spread everywhere'] },
      { title: 'Agent team', items: ['Each agent owns one job', 'Clean, logged handoffs', 'Test every role separately', 'Failures stay contained'] },
    ],
  },
  evals: {
    title: 'See exactly how every agent performs over time',
    body: 'Evaluations run against your own test cases after every change, so you can ship improvements with confidence and catch regressions before customers do.',
    agent: 'Launch Planner Agent',
    rows: [['Plan covers every channel', 95], ['Dates fit team capacity', 92], ['Brief matches brand voice', 87], ['Tasks assigned to owners', 84]],
  },
  competitor: {
    title: ['Teams pick Lumenfold ', 'over the alternatives'],
    body: 'Scripts, custom code and chat assistants each solve part of the problem. Here is how they compare when real work has to get done.',
    options: ['Script-based bots', 'DIY agent code', 'Chat-only assistants'],
    rows: [
      ['Time to first agent', 'Most teams launch a first working agent in an afternoon using templates, guided setup and connectors that sign in with one click.', [
        'Each flow is scripted step by step, so even a simple process can take weeks of mapping before anything runs.',
        'Engineers build orchestration, hosting and connectors from scratch, which usually means a month or more before a pilot.',
        'Setup is quick, but the assistant only answers questions and cannot take action inside the tools your team uses.']],
      ['Handles messy real work', 'Agents reason through unexpected inputs, ask for help when unsure and adapt to new cases without anyone rewriting a single rule.', [
        'Scripts break as soon as a form, layout or field changes, and someone has to repair them by hand.',
        'Flexible in theory, but every edge case needs new code, a review and a deployment before it is handled.',
        'Handles open questions well, yet stops at advice and leaves the actual work for a person to finish.']],
      ['Quality you can measure', 'Built-in evaluations score every run against your own test cases, flag regressions and show trends over time on one dashboard.', [
        'Success means the script finished, not that the outcome was actually correct for the customer.',
        'Teams must design, build and maintain their own testing harness alongside the agents themselves.',
        'There is little visibility into answer quality beyond a thumbs up or down from users.']],
      ['Approval where it matters', 'Approval steps can be added anywhere, so sensitive actions wait for a person while routine work keeps moving on its own.', [
        'Approvals are usually all or nothing, pausing whole processes rather than single risky steps.',
        'Approval flows must be designed and built separately, often as yet another internal tool.',
        'Since nothing is executed, approval is implicit: a person always copies the answer by hand.']],
      ['Works across your tools', 'More than a hundred connectors plus custom tools let agents act directly in the apps your team already uses every day.', [
        'Connections rely on screen positions and break whenever an app updates its interface.',
        'Each connector is written and maintained in-house, adding to a growing backlog of upkeep.',
        'Integrations are limited to reading a few sources, with no way to update any records.']],
      ['Clear record of everything', 'Every step, tool call and decision is logged in a readable timeline that auditors and teammates can follow without any help.', [
        'Logs show which step ran but rarely why, so failures are slow to diagnose and fix.',
        'Logging exists only if engineers add it, and formats vary from one agent to the next.',
        'Conversation history is kept, but there is no record of actions or their outcomes.']],
      ['Costs stay predictable', 'Usage limits, model routing and per-team budgets keep spending visible and steady, with alerts long before anything runs over.', [
        'Licences are priced per bot or per seat, which grows quickly as more processes are added.',
        'Infrastructure and model costs are spread across many accounts and are hard to forecast.',
        'Flat per-seat pricing is simple, but value is capped because nothing is automated.']],
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    lead: 'Want to dig a little deeper?',
    link: 'Contact our support team',
    items: [
      ['What exactly is a Lumenfold agent?', 'An agent is a worker you describe in plain language. It has a job, a set of tools it may use and rules for when to ask a person for help.'],
      ['How is an agent team different from one agent?', 'A team splits work across specialists that each own one step. Handoffs are logged, every role can be tested on its own, and a failure in one step does not derail the rest.'],
      ['Do agents act without my approval?', { p: 'Only where you allow it. For each tool you choose one of three modes:', ul: ['Run freely', 'Ask before acting', 'Never use this tool'] }],
      ['How do I know an agent is doing good work?', 'Every agent can have evaluations made from your own examples. Scores update after each change and the run history shows every step it took.'],
      ['Which models do agents use?', 'Lumenfold routes each task to a suitable model based on cost, speed and quality, and you can pin a specific model for any agent.'],
      ['Can agents use our internal systems?', 'Yes. Connect internal APIs as private tools and they become available to the agents you choose, with the same permission controls.'],
      ['How long does it take to launch a first agent?', 'Most teams start from a template and have an agent running on real work within an afternoon, with approvals switched on while trust builds.'],
    ],
  },
  tasks: {
    first: 'Every team has a long list of work nobody loves',
    final: 'Hand that list to agents and reclaim your week',
    cta: 'Start building free',
    items: ['Update the CRM after calls', 'Chase missing timesheets', 'Tag new support tickets', 'Summarise weekly metrics', 'Book interview panels', 'Match invoices to orders', 'Draft meeting follow-ups', 'Clean duplicate contacts', 'Collect survey feedback', 'Write release notes', 'Reconcile card payments', 'Refresh lead scores', 'File signed contracts', 'Remind overdue approvers', 'Translate help articles', 'Post daily standup notes', 'Check expense receipts', 'Prepare renewal quotes', 'Track competitor pages', 'Archive closed projects', 'Sort the shared inbox', 'Schedule social posts', 'Answer policy questions', 'Monitor stock levels'],
  },
}

/* ------------------------------------------------------------------ */
/* W1 / W2: workflows                                                  */
/* ------------------------------------------------------------------ */
const wf = [
  ['Meeting notes to tasks', 'Productivity', 'Paste a transcript or connect your recorder and get a clean list of decisions, owners and due dates pushed straight into your project board.', 'From talk to tasks', 'Turn every meeting into action', 'Upload a recording or transcript and this workflow pulls out decisions, owners and deadlines, then files each task in your project tool with a link back to the moment it was agreed.'],
  ['Inbound lead enrichment', 'Sales', 'Add company size, industry, location and recent news to every new lead so reps can prioritise without opening a dozen browser tabs.', 'Better leads in seconds', 'Know every lead before calling', 'Each new lead is enriched with firmographics, recent news and a short fit summary, so reps open a record that already explains who the buyer is and why they might care.'],
  ['Invoice data extraction', 'Finance', 'Read supplier invoices in any layout and return clean line items, totals and tax fields ready for your ledger.', 'No more manual keying', 'Invoices read, checked and filed', 'Drop in invoices as PDFs, scans or email attachments. The workflow extracts every line, checks totals and tax, and hands structured data to your ledger with a confidence score per field.'],
  ['Support ticket summaries', 'Support', 'Condense long ticket threads into a three-line summary with the problem, what has been tried and the next best step.', 'Long threads, short summaries', 'Understand any ticket at once', 'When a ticket changes hands, this workflow writes a short summary of the problem, steps already tried and the customer’s mood, so the next person never has to scroll through forty replies.'],
  ['Weekly metrics digest', 'Analytics', 'Pull the numbers that matter from your dashboards every Monday and explain the biggest movements in plain language for the whole team.', 'Numbers with the story', 'Monday metrics, explained clearly', 'Every Monday the workflow gathers your key metrics, compares them with last week and last quarter, and writes a short note on what moved, why it probably moved and what to watch.'],
  ['Contract clause review', 'Legal', 'Compare incoming contracts with your standard terms and highlight clauses that differ, with a suggested fallback position for each one.', 'Redlines without the wait', 'Spot risky clauses before signing', 'Upload a contract and the workflow compares each clause with your playbook, highlights anything unusual and suggests fallback wording, so legal review starts from a marked-up draft instead of page one.'],
  ['Job description drafting', 'People', 'Turn a hiring manager’s rough notes into an inclusive, well-structured job description that matches your company’s tone.', 'Clear roles, written fast', 'Write better job descriptions faster', 'Share a few notes about the role and the workflow drafts a structured, inclusive job description in your company voice, with a balanced requirements list and a salary band pulled from your policy.'],
  ['Product review sentiment', 'Research', 'Group public product reviews by theme and sentiment, and surface the quotes that best explain what customers love and dislike.', 'Hear every customer at once', 'See what reviews really say', 'The workflow collects reviews from your listed sources, groups them by theme and tone, and picks representative quotes, giving product teams a clear picture without reading thousands of comments by hand.'],
  ['Call transcript highlights', 'Sales', 'Find objections, competitor mentions and next steps in sales call transcripts and log them on the right deal automatically.', 'Every call, fully captured', 'Never lose a call insight', 'After each recorded call the workflow pulls out objections, questions, competitor mentions and agreed next steps, then logs them on the deal so managers and reps share the same picture.'],
  ['Release notes writer', 'Product', 'Turn merged changes and ticket titles into friendly release notes grouped by feature, with internal jargon translated for customers.', 'Ship notes people read', 'Release notes customers actually enjoy', 'Point the workflow at a release and it groups merged changes by feature, rewrites technical titles in plain language and drafts notes for customers, sales and support in matching tones.'],
  ['Survey answer coding', 'Research', 'Assign open-ended survey answers to a consistent set of themes and count how often each theme appears across segments.', 'Open answers, neatly coded', 'Code survey answers in minutes', 'Upload survey results and the workflow proposes a theme list, codes every open answer against it and counts themes by segment, with uncertain answers flagged for a quick human check.'],
  ['Translation with glossary', 'Content', 'Translate help articles and product copy while respecting your glossary, brand terms and tone for each language you support.', 'Every language, one voice', 'Translate content in your voice', 'The workflow translates articles and interface copy while following your glossary and style notes, keeping product names untouched and marking any sentence where meaning might shift for review.'],
]

export const workflows = wf.map(([name, category, desc, tag, h1, body], i) => ({ name, slug: slugify(name), category, desc, tag, h1, body, i }))

export const workflowsIndex = { srTitle: 'Lumenfold workflows' }

export const workflowShared = {
  primary: 'Try this workflow',
  secondary: 'Book a demo',
  logosLabel: 'Teams of every size use Lumenfold workflows to save hours weekly',
  values: {
    title: 'Built for the work that keeps piling up',
    body: 'Workflows run the same careful steps every time, report what they did and ask a person whenever something looks unusual.',
    centre: 'Less copying, more deciding',
    cards: [
      'Runs the moment new work arrives, so nothing waits in a queue overnight or over the weekend.',
      'Checks its own output against your rules before handing anything back, and flags what it is unsure about.',
      'Keeps a readable record of every run, so you can see exactly what happened and improve it over time.',
    ],
  },
  compare: {
    title: 'What changes when this runs for you',
    without: ['Without Lumenfold', [
      'Someone copies information between tools by hand, often late in the day when attention is lowest and mistakes slip through.',
      'Work waits until a person has time, so simple requests sit for hours and urgent ones are noticed too late.',
      'Every person does the task slightly differently, which makes results hard to compare, audit or improve over time.',
    ]],
    with: ['With Lumenfold', [
      'Information moves between tools automatically within seconds, checked against your rules on every single run.',
      'New work is picked up the moment it arrives, and anything unusual is passed to a person with a clear explanation.',
      'The same steps run every time and are logged, so you can measure quality, spot patterns and refine the workflow safely.',
    ]],
  },
  tabs: {
    title: 'How the workflow runs',
    items: [
      ['Connect your sources', 'Sign in to the tools the workflow needs. Access is scoped to exactly what it reads and writes, and you can revoke it whenever you like.'],
      ['Set your rules', 'Describe what good output looks like and when a person should step in. The workflow follows those rules on every run.'],
      ['Review the first runs', 'Watch a few runs in the timeline, approve the results and adjust any step that does not match how your team works.'],
      ['Let it run on its own', 'Switch the workflow on for everyone. It runs on new work automatically and sends a short weekly report on what it handled.'],
    ],
  },
  form: { title: 'Get this workflow in your inbox', placeholder: 'Work email', button: 'Send it', success: 'Thanks! The setup guide is on its way to your inbox.', fail: 'That email does not look quite right. Please check and try again.' },
}

export const footerCta = {
  title: ['Ready to put ', 'your first agent', ' to work?'],
  body: 'Start free, connect the tools you already use and watch an agent finish real work today.',
  primary: 'Start building',
  secondary: 'Book a demo',
  fine: 'Free plan available, no card required',
}

/* ------------------------------------------------------------------ */
/* W3: SEO articles. Lines: "## h2", "### h3", "- li", "1. li", "> quote", else paragraph. **bold** inline. */
/* ------------------------------------------------------------------ */
const llm = [
  ['model-a-long-context', 'Model A — long-context', 'How long-context models change the way agents read your documents', `
## What a long-context model is
A long-context model can hold a very large amount of text in view at once. Instead of reading a contract, a policy manual or a quarter of support tickets in small slices, it can consider the whole collection together. For agents, that means fewer gaps between what the model sees and what the task actually requires.
Model A is our generic label for this class of model. It trades some speed and cost for the ability to keep hundreds of pages in working memory during a single step.
## Why context length matters for agents
Most agent mistakes are not reasoning failures. They are visibility failures: the answer was in a document the agent never saw. When the window is small, an agent must decide in advance which pieces of text to load, and a wrong guess quietly removes the evidence it needed.
- **Fewer retrieval misses.** The agent can read whole documents instead of the top five matching passages.
- **Better cross-references.** Clauses that refer to other clauses, or tickets that mention earlier tickets, stay connected.
- **Simpler pipelines.** You spend less effort tuning chunk sizes and ranking rules.
## Where Model A shines
### Contract and policy review
Comparing a fifty-page agreement with your standard terms works best when both documents are visible together. The agent can point to the exact clause that differs and explain how it interacts with definitions earlier in the text.
### Account history summaries
Before a renewal call, an agent can read every ticket, note and email for an account and produce a short, accurate history. Nothing important is lost because it happened two years ago.
### Codebase and changelog questions
Questions like what changed in billing over the last ten releases are easier when all ten sets of notes fit in one view.
## Costs and trade-offs
Long context is not free. Every token in the window is processed on every call, so a careless agent that always loads everything will be slow and expensive.
> Use long context when the task needs the whole picture, not simply because the window is available.
A practical pattern is to route only document-heavy steps to Model A and keep quick classification or drafting steps on a lighter model. Lumenfold model routing makes this a per-step setting rather than a code change.
## Keeping answers grounded
A large window can make an agent overconfident. It has read a great deal, so it may answer from a vague overall impression instead of the specific passage. Two habits help:
1. Ask the agent to quote the passage that supports each claim.
2. Add an evaluation that checks every quote really appears in the source.
With citations in place, reviewers can verify an answer in seconds, and evaluation scores show quickly if a prompt change makes grounding worse.
## Setting it up in Lumenfold
Choose Model A on the steps that read long material, attach the relevant knowledge sources and set a token budget for each run. Budgets stop a runaway step from reading far more than it needs to, and the run history shows exactly how much context each step used.
## Summary
Long-context models let agents read the way a careful colleague would: the whole file, not a handful of snippets. Use them for review, history and comparison tasks, keep lighter steps on faster models, and insist on citations so every answer can be traced back to the page it came from.
`],
  ['model-b-fast-reasoning', 'Model B — fast reasoning', 'Choosing a fast reasoning model for agents that answer instantly', `
## Speed is a feature
Some agent steps run while a person waits: a chat reply, a form validation, a routing decision on a live ticket. In those moments a fast answer that is nearly as good beats a perfect answer that arrives ten seconds later. Model B is our generic name for a model tuned for quick, structured reasoning at low latency.
## What fast reasoning models do well
Fast models are strong at short, well-defined decisions. They read a modest amount of input, apply clear rules and return a compact result.
- Classifying a message into one of a dozen categories
- Extracting a handful of fields from a short email
- Choosing which specialist agent should handle a request next
- Checking whether a draft follows a simple style rule
They are less suited to long documents, open-ended research or anything that needs many careful steps of planning.
## Designing steps for a fast model
### Keep inputs small
Pass only what the decision needs. A routing step rarely needs the full ticket history; the latest message and the customer’s plan are usually enough.
### Ask for structured output
Request a fixed format such as a category name and a confidence score. Structured answers are faster to produce and easier to check automatically.
### Give the model a way out
Include an explicit unsure option. A fast model that can say it is not confident is far safer than one forced to guess.
## Where speed pays off most
The biggest gains appear in the front of a workflow. When the first step of a support process routes a ticket in under a second, every later step starts sooner and customers notice the difference.
> A slow first step delays everything behind it. Make the doorway fast.
Fast models also reduce cost for high-volume tasks. Tagging a hundred thousand messages a month on a heavier model can be many times more expensive with little gain in accuracy.
## Measuring the trade-off
Before switching a step to Model B, run your evaluation set on both models and compare three numbers:
1. Accuracy on your own examples
2. Median and slowest response times
3. Cost per thousand runs
If accuracy drops only slightly while latency and cost fall sharply, the switch is usually worth it. If accuracy drops on the cases that matter most, keep the heavier model for that step or add a fallback.
## Fallbacks and escalation
A common pattern is a two-tier step. Model B answers first, and if its confidence is low the same input is passed to a stronger model. Most requests finish quickly, and only the hard ones pay for extra thinking.
## Setting it up in Lumenfold
Select Model B for the step, set a confidence threshold and choose the fallback model. Run history shows which tier answered each request, so you can see how often the fallback is used and tune the threshold over time.
## Summary
Fast reasoning models make agents feel responsive. Use them for small, structured decisions near the start of a workflow, measure them against your own examples, and keep a stronger model ready for the cases that need it.
`],
  ['model-c-compact', 'Model C — compact on-device', 'When a compact model is the smarter choice for agents', `
## Small can be strong
Compact models are light enough to run on modest hardware, sometimes inside your own network or even on a laptop. Model C is our generic label for this group. They will not write a long strategy memo as well as a large model, but for narrow, repeated tasks they can be surprisingly capable.
## Reasons teams choose compact models
- **Data stays close.** Sensitive text can be processed without leaving your environment.
- **Predictable cost.** Running a small model on your own hardware turns per-call fees into a fixed expense.
- **Low latency.** With no network round trip, responses can be nearly instant.
- **Offline work.** Field teams with poor connectivity can still use agent features.
## Tasks that suit Model C
### Redaction and masking
Finding and masking names, account numbers and addresses before text is sent anywhere else is a classic compact-model job. It is repetitive, well defined and privacy sensitive.
### First-pass classification
Sorting documents into broad types, or flagging messages that need a human, works well when the categories are clear.
### Short extraction
Pulling a date, an amount or an order number from a short message is often within reach of a small model, especially with a few good examples.
## Where compact models struggle
Compact models have less general knowledge and a smaller working memory. They can lose track in long instructions, mix up similar categories and produce weaker writing. Treat them as specialists, not generalists.
> Give a compact model one clear job and a handful of examples. Do not ask it to be clever.
## Combining small and large
The most effective setups use compact models as filters and guards around larger ones. A small model masks private details, a larger model reasons over the masked text, and the small model checks the output before it leaves. Each model does what it is best at.
1. Compact model redacts sensitive fields
2. Larger model performs the main task
3. Compact model verifies nothing private slipped back in
## Testing before you commit
Build an evaluation set from real examples, including awkward ones: misspellings, mixed languages, unusual layouts. Compare Model C with your current model on accuracy and on how it fails. A model that fails safely by saying it is unsure is far more useful than one that fails confidently.
## Running Model C with Lumenfold
Register your self-hosted endpoint as a model, assign it to the steps that should stay local and keep other steps on hosted models. Lumenfold records which model handled each step, so audits can confirm that sensitive data never left the approved environment.
## Summary
Compact models are the right tool when privacy, cost or latency matter more than broad capability. Give them narrow, well-tested jobs, pair them with larger models where needed, and let your evaluations decide where the line between small and large should sit.
`],
  ['model-d-multilingual', 'Model D — multilingual', 'Building agents that speak every customer’s language with one model', `
## One model, many languages
Multilingual models are trained to read and write across dozens of languages with similar quality. Model D is our generic name for this kind of model. For global teams it removes the need to maintain separate agents, prompts and evaluations for every market.
## Why multilingual matters for agents
Customers rarely adjust to you. They write in their own language, mix languages mid-sentence and use local terms for your products. An agent that only works well in one language either fails these customers or forces them through a translation step that loses nuance.
- Support agents can reply in the customer’s language without a separate translation pass
- Research agents can read sources from every market you operate in
- Internal agents can serve employees across all your offices
## Common patterns
### Answer in the language you were asked
The simplest rule is also the most effective: detect the incoming language and reply in it. Ask the agent to keep product names and legal terms exactly as written in your glossary.
### Reason in one language, write in another
Some teams let the agent reason in a single working language and translate only the final answer. This can make internal notes easier for a central team to review, while customers still receive natural replies.
### Mixed-language input
Messages that switch languages are common in many regions. Test them explicitly; they are where weaker models often stumble.
## Keeping your voice consistent
Tone does not translate word for word. A friendly phrase in one language can sound casual or even rude in another.
> Write tone guidance per language, not just a glossary of terms.
Short notes such as use the formal form of address or avoid exclamation marks make a large difference to how replies feel.
## Evaluating across languages
Quality can vary by language even within one model. Build a small evaluation set for each major language you support and track scores separately.
1. Collect real messages from each market
2. Have a fluent reviewer write ideal answers
3. Score the agent on accuracy and tone per language
4. Watch for any language that lags behind the rest
If one language consistently scores lower, consider adding examples in that language to the prompt or routing it to a model that performs better there.
## Handling glossary terms
Product names, plan names and feature labels should usually stay untranslated. Store them in a glossary that the agent reads on every run, and add an evaluation that checks the terms appear exactly as written.
## Setting it up in Lumenfold
Choose Model D for customer-facing steps, attach your glossary and tone notes as knowledge sources and add per-language evaluation sets. Run history can be filtered by detected language, making it easy to review a sample from each market every week.
## Summary
Multilingual models let one agent serve every market well. Reply in the customer’s language, protect your glossary, write tone notes per language and measure each language separately so no market is quietly left behind.
`],
  ['model-e-code-specialist', 'Model E — code specialist', 'What code specialist models bring to agents that build tools', `
## A model that thinks in code
Code specialist models are trained heavily on programming languages, configuration files and technical documentation. Model E is our generic label for this category. For agents, their value goes beyond writing software: they are excellent at producing precise, structured output of any kind.
## Where agents need code skills
- **Calling APIs.** Building a correct request body from loose instructions is a code task.
- **Writing queries.** Turning a question about the data into a database query needs exact syntax.
- **Transforming data.** Reshaping a spreadsheet export into the format another tool expects is small-scale programming.
- **Creating tools.** Agents can draft new tool definitions from an API description.
## Strengths to rely on
### Precision
Code models are trained to care about brackets, types and field names. That discipline carries over to any task where a single wrong character breaks the result.
### Reading technical documents
API references, error logs and configuration files are native territory. An agent using Model E can read a stack trace and explain what failed in plain language.
### Following schemas
When asked to return a strict format, code models tend to comply more reliably than general models.
## Risks to manage
Code that looks right can still be wrong. A query might run successfully and return the wrong rows; a script might work on the test file and fail on real data.
> Never let generated code touch production data without a check in between.
Sensible guards include running generated queries in read-only mode first, limiting the rows any query may change, and asking a person to approve anything destructive.
## A safe pattern for data questions
1. The agent writes a query from the user’s question
2. The query runs against a read-only copy
3. A second step checks the result makes sense
4. The agent explains the answer and shows the query
Showing the query builds trust. Analysts can read it, spot mistakes and learn how the answer was produced.
## Building tools with Model E
Given a description of an internal API, Model E can draft a tool definition with inputs, outputs and validation rules. A developer reviews and publishes it, and from then on every agent in the workspace can use it. This turns weeks of integration work into an afternoon of review.
## Evaluating code steps
Evaluations for code are refreshingly concrete. Does the query run? Does it return the expected rows on a known dataset? Does the request match the schema? Automated checks like these catch regressions immediately when a prompt or model changes.
## Setting it up in Lumenfold
Assign Model E to steps that write queries, transform data or draft tools. Turn on sandboxed execution for generated code, require approval for any write operation and add evaluations that run against a fixed test dataset.
## Summary
Code specialist models give agents precision. Use them wherever exact structure matters, guard every write with checks and approvals, and show your work so the people relying on the answers can verify them.
`],
  ['model-f-vision-language', 'Model F — vision-language', 'Teaching agents to read scans, screenshots and charts with vision', `
## Seeing as well as reading
Vision-language models accept images alongside text. Model F is our generic label for them. They can describe a screenshot, read a scanned form, interpret a chart or compare two photos, which opens up work that text-only agents simply cannot do.
## Everyday jobs that involve images
Much business information never exists as clean text. It arrives as photos, scans and screenshots.
- Scanned invoices and delivery notes from suppliers
- Screenshots attached to support tickets
- Photos of damaged goods for returns or claims
- Charts pasted into slide decks and reports
- Handwritten forms from field teams
## What Model F does well
### Reading documents with layout
Tables, stamps, signatures and handwritten notes carry meaning through their position on the page. Vision models read that layout directly instead of relying on a separate text extraction step that can scramble columns.
### Understanding screenshots
A customer’s screenshot often shows the exact error message, settings and page they are on. An agent can read it, find the relevant help article and reply with specific steps.
### Describing charts
Asked what a chart shows, Model F can describe trends, outliers and labels, making visual reports accessible to agents that summarise them.
## Limits to keep in mind
Vision models can misread small text, faint scans and dense tables. They can also describe what they expect to see rather than what is really there.
> For any number that drives a payment or decision, ask the agent to quote it and show where on the image it appears.
## A reliable pattern for scanned documents
1. Model F reads the image and returns structured fields
2. Each field includes a confidence score
3. Low-confidence fields go to a person for a quick check
4. Confirmed values flow into the next system
This keeps people involved only where they add value, instead of reviewing every page by hand.
## Privacy and images
Images often contain more than intended: faces, addresses, other open windows on a screen. Set clear rules about which images agents may process and how long they are stored, and mask sensitive areas where possible before analysis.
## Evaluating vision steps
Create a test set of real images with known correct answers, including poor-quality examples. Track field-level accuracy rather than a single overall score, because a model may read totals perfectly but struggle with dates.
## Setting it up in Lumenfold
Choose Model F for steps that receive attachments, enable confidence scores on extracted fields and route anything below your threshold to a review queue. The run history stores a thumbnail beside each result so reviewers can compare the image and the output side by side.
## Summary
Vision-language models let agents work with the documents and screenshots that real processes depend on. Use them for layout-heavy reading, keep people in the loop for low-confidence values and measure accuracy field by field.
`],
]

const ind = [
  ['retail-banking', 'Retail banking', 'How retail banks use AI agents to serve customers faster', `
## The pressure on retail banks
Customers expect answers in minutes, regulators expect perfect records and margins leave little room for growing teams. Retail banks sit between these demands every day. AI agents help by taking on the repetitive, rules-heavy work that slows service down, while people keep the judgement calls.
## Where agents help first
- **Service requests.** Address changes, card replacements and statement requests follow clear rules and high volumes.
- **Document collection.** Chasing missing payslips or proof of address for applications is time consuming and easy to automate politely.
- **Complaint triage.** Sorting complaints by type, urgency and regulatory deadline keeps nothing from slipping past a response target.
- **Internal questions.** Branch staff can ask a policy agent instead of searching a long intranet.
## Account servicing
A servicing agent can verify a request against the customer’s profile, complete the change in the core system and confirm it back, all with a full audit trail. Anything unusual, such as a change requested from a new device and a new country at once, is held for a person to review.
> Automate the routine, escalate the unusual and record everything.
## Lending applications
### Gathering documents
Agents send tailored checklists, read uploaded documents and confirm what is still missing. Applicants get clear, specific requests instead of generic reminders.
### Preparing the file
Once documents are in, an agent assembles a summary for the underwriter: income figures, existing commitments and anything that conflicts. The underwriter still makes the decision, with far less preparation.
## Complaints and regulation
Complaints carry strict response deadlines. An agent can classify each one, calculate its deadline, draft an acknowledgement and alert the right team as time runs short. Because every step is logged, preparing evidence for a regulator takes hours instead of weeks.
## Controls banks should insist on
1. Clear permissions for every tool an agent can use
2. Human approval for any movement of money
3. Evaluations based on real, anonymised cases
4. Full run histories retained for your required period
5. Regular reviews of escalation rates and outcomes
These controls are not obstacles. They are what makes it possible to expand agent work with confidence.
## Measuring success
Useful measures include time to resolve service requests, share of applications completed without follow-up, complaint deadlines met and staff hours returned to advice and relationship work. Tracking these before and after launch makes the value visible to leadership and to regulators.
## Getting started
Most banks begin with one high-volume, low-risk process such as statement requests or document chasing. They run it with approvals switched on, review results weekly and extend to more processes once quality is proven.
## Summary
AI agents give retail banks faster service and cleaner records without compromising control. Start small, keep approvals on money movement, measure carefully and let the results guide where agents go next.
`],
  ['logistics', 'Logistics', 'How logistics teams use AI agents to keep freight moving', `
## A business of exceptions
Logistics runs on plans, but the real work is handling what goes wrong: a late truck, a missing document, a customs hold, a damaged pallet. Each exception triggers calls, emails and system updates. AI agents help by handling the routine parts of every exception so coordinators can focus on the hard ones.
## High-value starting points
- **Shipment status updates.** Agents answer where is my order questions using live tracking data.
- **Document checks.** Bills of lading, packing lists and certificates are compared for consistency before departure.
- **Delay notifications.** Customers and warehouses are told about delays with new estimates as soon as they are known.
- **Carrier invoices.** Invoices are matched against agreed rates and actual services delivered.
## Proactive delay management
Instead of waiting for customers to ask, a monitoring agent watches tracking events and flags shipments likely to miss their window. It calculates a new estimate, notifies affected parties and suggests alternatives such as a different carrier or a split delivery.
> The best delay message is the one that arrives before the customer notices.
## Paperwork without the paper chase
### Pre-departure checks
Mismatched weights, missing signatures and wrong product codes cause costly holds. An agent compares every document in a shipment file and highlights inconsistencies while there is still time to fix them.
### Customs preparation
Agents can assemble declarations from commercial invoices and product data, leaving brokers to review and submit rather than type.
## Freight audit
Carrier invoices often include accessorial charges that were never agreed. An agent checks each line against the contract and the proof of delivery, approves clean invoices and disputes the rest with evidence attached. Savings from caught overcharges often pay for the whole program.
## Working with warehouses
Warehouse teams receive a steady stream of questions about stock, appointments and inbound loads. A scheduling agent can book dock appointments, confirm arrivals and adjust labour plans when volumes change.
1. Receive the booking request
2. Check dock capacity and labour plan
3. Offer available slots
4. Confirm and update the warehouse system
## Keeping control
Logistics data comes from many partners with varying quality. Set clear rules for when an agent may act alone and when a coordinator must confirm, and review a sample of runs each week. Evaluations built from past exceptions help ensure agents handle tricky cases the way your best coordinators would.
## Measuring the impact
Track on-time notification rates, document errors caught before departure, invoice discrepancies recovered and coordinator time per shipment. These numbers show both service improvements and cost savings clearly.
## Summary
AI agents turn logistics exceptions from frantic phone calls into managed, documented processes. Start with status updates or document checks, expand to audit and scheduling, and keep coordinators in charge of the decisions that need experience.
`],
  ['healthcare-clinics', 'Healthcare clinics', 'How healthcare clinics use AI agents to reduce admin load', `
## Admin is crowding out care
Clinic staff spend a large share of their day on scheduling, forms, reminders and insurance paperwork. Every hour spent there is an hour not spent with patients. AI agents can take on much of this administrative load while clinical decisions stay firmly with clinicians.
## Good first uses
- **Appointment scheduling and reminders.** Agents book, confirm and reschedule visits based on clinician availability.
- **Intake forms.** Patients complete forms before arrival and agents check for missing information.
- **Referral coordination.** Referral letters are tracked, and follow-ups are sent when appointments are not booked.
- **Billing questions.** Common questions about invoices and payment plans are answered quickly and politely.
## Scheduling that respects the day
A scheduling agent knows which appointment types need which rooms, clinicians and lengths. It can fill cancellations from a waitlist, send reminders at the right times and offer rescheduling options when a patient cannot attend. Fewer no-shows means more patients seen without longer days.
> Agents should handle logistics. Clinicians should handle care.
## Intake without the clipboard
### Before the visit
Patients receive a short, friendly link to complete forms at home. The agent checks answers for completeness and flags anything that needs attention, such as a missing allergy field.
### At the front desk
Reception staff see a ready summary instead of retyping paper forms, and waiting times shrink as a result.
## Insurance and billing
Agents can prepare claim forms from visit records, check for common errors before submission and track claims that have not been paid. When a claim is rejected, the agent identifies the likely reason and prepares a corrected version for staff to review.
## Safety and privacy
Healthcare data deserves the strictest care. Set firm boundaries around what agents can do.
1. No clinical advice or diagnosis from administrative agents
2. Access limited to the data each task needs
3. Escalation to staff for any medical question
4. Full logs retained under your privacy policy
5. Regular review of messages sent to patients
These rules keep agents useful and safe, and they make audits straightforward.
## Supporting clinicians directly
Beyond the front office, agents can prepare visit summaries from notes for clinicians to review, draft referral letters and gather relevant history before an appointment. The clinician remains the author; the agent simply removes the blank page.
## Measuring the difference
Useful measures include no-show rates, time spent on intake per patient, claim rejection rates and staff overtime. Patient satisfaction with communication is worth tracking too, since timely reminders and clear answers are often noticed immediately.
## Summary
AI agents can return hours of admin time to clinic teams every week. Start with scheduling and intake, keep clinical decisions with clinicians, protect patient data carefully and measure the time and satisfaction gains.
`],
  ['insurance-claims', 'Insurance claims', 'How insurers use AI agents to settle claims with care', `
## Claims are moments of truth
A customer filing a claim is often stressed and waiting for help. How quickly and clearly the insurer responds shapes their view of the company for years. AI agents help claims teams respond faster and more consistently, while adjusters keep authority over decisions.
## Where agents fit in the claims journey
- **First notice of loss.** Agents collect the details, photos and documents needed to open a claim.
- **Coverage checks.** The policy is reviewed against the reported event and any obvious gaps are flagged.
- **Document chasing.** Missing estimates, receipts or reports are requested with clear, specific instructions.
- **Status updates.** Customers are told what is happening and what comes next without having to call.
## A smoother first notice
Instead of a long phone call, customers describe what happened in their own words, upload photos and answer a few follow-up questions. The agent structures this information into a complete claim file and confirms receipt immediately.
> The first hour of a claim sets the tone for everything after it.
## Supporting adjusters
### Preparing the file
Before an adjuster opens a claim, an agent has summarised the event, checked the policy, listed relevant clauses and highlighted anything unusual. The adjuster starts with understanding rather than searching.
### Spotting inconsistencies
Agents compare dates, locations and amounts across documents. When something does not match, it is flagged for the adjuster with the evidence side by side. Agents do not accuse; they point out what needs a closer look.
## Simple claims, settled quickly
For low-value claims with clear coverage and complete documents, an agent can prepare a settlement recommendation for one-click approval. Customers are paid in days instead of weeks, and adjusters spend their time on complex cases.
1. Confirm coverage applies
2. Verify documents are complete and consistent
3. Calculate the settlement under policy rules
4. Send to an adjuster for approval
5. Notify the customer and arrange payment
## Fairness and oversight
Insurance decisions affect people’s lives, so oversight matters. Keep humans responsible for every denial, review samples of agent recommendations regularly and test evaluations for consistent treatment across customer groups. Clear logs make it possible to explain any outcome to a customer or a regulator.
## Communication that feels human
Status messages should be plain, specific and kind. Agents can tailor updates to each claim, explain delays honestly and tell customers exactly what they need to provide next.
## Measuring progress
Track time from first notice to settlement, share of claims needing follow-up requests, customer satisfaction after settlement and adjuster caseload. Improvements in these numbers usually appear within the first few months.
## Summary
AI agents help insurers handle claims with speed and care. Use them to gather information, prepare files and settle simple claims for approval, keep adjusters in charge of judgement and communicate clearly at every step.
`],
  ['higher-education', 'Higher education', 'How universities use AI agents to support students and staff', `
## Many questions, small teams
Universities answer an enormous number of questions every term: admissions, fees, timetables, accommodation, course changes and more. Support teams are stretched, especially at the start of each semester. AI agents can answer routine questions instantly and route complex ones to the right office.
## Common starting points
- **Admissions enquiries.** Agents answer questions about entry requirements, deadlines and documents.
- **Student services.** Questions about fees, enrolment and timetables are handled around the clock.
- **Application processing.** Documents are checked for completeness before staff review.
- **Staff help desks.** Faculty can ask about policies, systems and procedures without waiting for a reply.
## Answering students at peak times
Enrolment week brings a surge of similar questions. An agent connected to official policy pages and student records can answer most of them in seconds, in the student’s preferred language, at any hour. When a question involves a personal circumstance or an exception, it is passed to an adviser with a summary attached.
> Students should never wait three days for an answer that already exists on a web page.
## Admissions and applications
### Checking documents
Agents review uploaded transcripts, references and statements for completeness and flag anything missing or unreadable. Applicants get specific, timely requests rather than a vague rejection later.
### Keeping applicants informed
Regular, personalised updates reduce anxious follow-up emails and help applicants plan ahead.
## Supporting academic staff
Agents can help with module administration: compiling reading lists, scheduling office hours, answering repeated questions about assessment formats and summarising feedback from course surveys. Academics keep control of teaching and assessment decisions.
## Wellbeing and boundaries
Some student questions touch on wellbeing, hardship or safety. Agents should recognise these moments and connect students to people immediately.
1. Detect signs of distress or urgency
2. Respond with care and share support contacts
3. Alert the appropriate team straight away
4. Never attempt counselling or crisis support
Clear rules like these protect students and give staff confidence that agents behave responsibly.
## Data and privacy
Student records are sensitive. Limit agent access to what each task requires, keep detailed logs and align retention with your institution’s policies. Regular reviews of conversations help maintain quality and trust.
## Measuring impact
Useful measures include response times during peak periods, share of questions resolved without escalation, application completeness on first submission and staff time spent on repeated questions. Student satisfaction surveys often reflect the improvements quickly.
## Summary
AI agents help universities give students fast, accurate answers and free staff for the conversations that matter. Start with high-volume questions, set clear wellbeing boundaries and expand as quality is proven term after term.
`],
  ['property-management', 'Property management', 'How property managers use AI agents to keep tenants happy', `
## Small teams, many buildings
Property managers juggle tenants, owners, contractors and regulations across many properties. Much of the day goes to messages: repair requests, rent questions, viewing bookings and lease renewals. AI agents can handle the routine communication so managers can focus on relationships and decisions.
## Where agents help most
- **Maintenance requests.** Agents gather details and photos, assess urgency and book the right contractor.
- **Tenant questions.** Common questions about rent, bins, parking and policies are answered instantly.
- **Viewings.** Prospective tenants can book, reschedule and receive reminders without phone tag.
- **Lease renewals.** Renewal notices, reminders and paperwork are prepared on schedule.
## Maintenance without the back-and-forth
A tenant reports a leaking tap through chat. The agent asks for a photo, checks whether it is urgent, finds an approved plumber with availability and offers the tenant a time window. The manager sees a tidy work order instead of a string of messages.
> Tenants care most about two things: being heard quickly and knowing what happens next.
## Emergencies come first
### Recognising urgency
Gas smells, flooding and security problems need immediate human attention. Agents should recognise these instantly, give safety instructions and alert the on-call manager.
### Clear escalation rules
Write down what counts as an emergency and test the agent against real examples so it never treats an urgent issue as routine.
## Rent and finance questions
Agents can explain balances, send payment links and set up reminders. For tenants in difficulty, they can share the options your policy allows and hand the conversation to a manager for anything beyond that. Respectful, consistent communication protects both tenants and owners.
## Keeping owners informed
Owners want regular, clear updates. An agent can compile monthly reports covering rent collected, maintenance completed, open issues and upcoming renewals for each property, ready for the manager to review and send.
1. Collect rent and maintenance data
2. Summarise open issues and costs
3. Highlight upcoming lease events
4. Prepare the report for manager approval
## Compliance and records
Property regulations often require safety checks, notices and records kept for years. Agents can track inspection dates, send reminders to contractors and file certificates in the right place, making audits far less stressful.
## Measuring the results
Track response times to tenant messages, time to complete repairs, renewal rates and manager hours spent on routine messages. Tenant reviews and retention often improve as communication becomes faster and more reliable.
## Summary
AI agents help property managers respond faster, keep records straight and spend more time on the people side of the job. Start with maintenance and tenant questions, set firm emergency rules and expand into renewals and owner reporting.
`],
]

// One more section per article, inserted before its summary.
const extra = {
  'model-a-long-context': `## Common mistakes to avoid
The most frequent mistake is treating the window as a dumping ground. Teams load every document they can find, then wonder why answers become vague and runs become slow. A long window rewards curation just as much as a short one does; it simply raises the ceiling.
- **Loading stale versions.** If three drafts of a policy are in view, the agent may quote the wrong one. Keep only the current version in the source.
- **Hiding the question.** Put the task instructions at the start and repeat the key question at the end, so it is not buried under pages of material.
- **Skipping evaluation.** A step that reads more text can change behaviour in subtle ways. Re-run your test cases whenever you change what the step loads.
Teams that avoid these mistakes usually find that long-context steps become the most trusted part of their workflows, because reviewers can see exactly what the agent read and why it reached its conclusion.`,
  'model-b-fast-reasoning': `## A worked example
Consider a support team that receives around four thousand messages a day. Their first step decides whether each message is a billing question, a bug report, a feature request or something else, and how urgent it is.
On a heavy general model this step took a few seconds per message and cost more than the rest of the workflow combined. After building an evaluation set of five hundred labelled messages, the team tested Model B on the same set. Accuracy dropped by under one point, while median response time fell to well under a second.
They kept a fallback for messages where Model B reported low confidence, roughly one in twelve. Those went to the heavier model, which handled the ambiguous cases well. The result was a faster queue, a much smaller bill and no measurable change in routing quality. The lesson is simple: let your own examples decide, not the size of the model.`,
  'model-c-compact': `## Maintaining a compact model over time
Compact models need a little more care than hosted ones, because your team is responsible for running them. Plan for that from the start rather than discovering it during an incident.
- **Version everything.** Record which model version handled each run so you can compare results after an upgrade.
- **Watch resource use.** Small models are efficient, but a sudden spike in volume can still saturate your hardware. Set alerts on queue length and response time.
- **Refresh examples.** The few-shot examples in your prompt are part of the model’s behaviour. Review them each quarter and replace any that no longer reflect real inputs.
- **Keep a fallback.** If the local model is unavailable, decide in advance whether work should pause or move to an approved hosted model.
With these habits in place, compact models become a dependable, low-cost part of your stack rather than an experiment that only one engineer understands.`,
  'model-d-multilingual': `## Supporting reviewers who do not speak every language
Central teams often need to review agent replies in languages they cannot read. This is a real operational challenge, and it is worth solving deliberately.
One approach is to store a short working-language summary alongside every reply. Reviewers read the summary to understand what the agent said and why, and only escalate to a fluent colleague when something looks wrong. Another is to sample replies per language every week and send them to local staff for a quick quality check.
Both approaches depend on good tagging. Make sure every run records the detected language, the reply language and any glossary terms used. With that metadata, quality reviews become a routine task rather than an occasional scramble, and gaps in a particular market are spotted long before customers start to complain about them.`,
  'model-e-code-specialist': `## Helping non-developers benefit
Code specialist models are not only for engineering teams. Operations, finance and marketing teams constantly need small transformations: split a column, merge two exports, reformat dates, or build a quick report from a database. Traditionally these requests wait in a queue for a developer with spare time.
An agent backed by Model E can handle many of them directly. The person describes what they need in plain language, the agent writes and runs the transformation in a sandbox, and the result comes back with a short explanation of what was done. If the request is ambiguous, the agent asks a clarifying question before writing anything.
Because the generated code is always shown, curious team members gradually learn how their data is structured. Over time this builds data confidence across the company, and developers are freed from a long tail of small, repetitive requests that rarely needed their full expertise.`,
  'model-f-vision-language': `## Choosing image quality settings
Image quality has a direct effect on accuracy and cost. Larger, sharper images are easier to read but take longer to process and cost more per call. Smaller images are cheap but may lose the fine print that matters.
A sensible approach is to pick a default resolution that works for most documents, then let the agent request a higher-resolution crop when it reports low confidence on a specific region. This mirrors how a person might squint at one corner of a page rather than rescanning the whole thing.
- Use the default resolution for screenshots and clean scans
- Request a zoomed crop for small print, stamps and handwriting
- Reject images that are too blurred to read and ask for a new upload
Asking the sender for a clearer image is often faster than guessing. Customers generally prefer a quick, specific request to a delayed or incorrect answer.`,
  'retail-banking': `## Bringing staff along
Introducing agents changes daily work for service teams, and success depends on their trust. Involve experienced staff from the start: ask them which tasks feel repetitive, which mistakes are most common and which cases always need a human eye.
Their answers shape the first agents and the escalation rules. Staff who helped design an agent are far more likely to rely on it, and to report problems early when something looks wrong. Many banks name a small group of champions in each team who review runs, suggest improvements and explain changes to colleagues.
Training matters too. Short sessions on reading run histories, approving actions and giving feedback help staff see agents as a tool they control. When people understand what the agent did and why, they spend less time double-checking routine work and more time on conversations where their experience genuinely makes a difference to customers.`,
  'logistics': `## Connecting many partners
Logistics data is spread across carriers, brokers, warehouses and customers, each with their own systems and formats. Some send structured feeds, others send emails with spreadsheets attached, and a few still rely on phone calls.
Agents are well suited to this mixed environment. They can read emails and attachments, extract the key details and update your systems, even when a partner will never offer a modern integration. Where structured feeds exist, agents use them directly and fall back to email only when needed.
Start by listing your partners and how each one shares information today. Prioritise the ones that cause the most manual work or the most errors. Connecting even a handful of difficult partners often removes a large share of coordinator effort, because the hardest-to-handle partners tend to generate a disproportionate number of exceptions and follow-up calls.`,
  'healthcare-clinics': `## Communicating with patients well
Patients notice tone. Reminders and replies should be warm, clear and short, and they should never feel automated in a cold way. Write message templates with care and review them with front-desk staff, who know how patients react.
A few principles help. Use the patient’s preferred name and language. Explain what to bring, where to go and how to reschedule in every reminder. Avoid medical jargon in administrative messages. When something changes, such as a clinician running late, tell patients promptly and offer a choice where possible.
Accessibility matters as well. Offer messages by text, email or phone call according to the patient’s preference, and make sure links and forms work on older phones and with screen readers. Small details like these determine whether patients actually use the service, and they make the clinic feel attentive rather than automated.`,
  'insurance-claims': `## Handling peaks after major events
Storms, floods and other large events can multiply claim volumes overnight. These are precisely the moments when customers most need fast, clear help, and when claims teams are most stretched.
Agents scale with demand. They can take first notice of loss from thousands of customers at once, prioritise vulnerable policyholders, share safety guidance and give realistic timelines. Adjusters can then focus their field visits on the most serious damage first.
Preparation makes a big difference. Before peak season, prepare event-specific question sets, document checklists and message templates so the agent can switch into event mode quickly. Agree escalation rules for vulnerable customers in advance. After each event, review runs together with adjusters to learn what worked, what confused customers and what should change before the next one arrives.`,
  'higher-education': `## Working across departments
Universities are made up of many offices with their own systems, rules and priorities. A student question about a fee waiver might involve finance, admissions and a faculty office. Without coordination, students are passed from one inbox to another.
Agents can act as a front door that understands the whole institution. They answer what they can from official sources and route the rest to the right office with a clear summary, so students do not need to repeat themselves. Each office keeps control of its own decisions, while the student experiences one joined-up service.
Making this work requires agreement on ownership. Map common question types to responsible offices, set expected response times and keep the routing rules in one shared place. Review misrouted questions regularly; they often reveal unclear policies or gaps between departments that are worth fixing regardless of any agent. A short monthly meeting between office leads to review these cases keeps the routing accurate and builds shared ownership of the student experience across the whole university.`,
  'property-management': `## Working with contractors
Contractors are a big part of tenant satisfaction. Late arrivals, missed appointments and unclear job details frustrate everyone involved. Agents can help keep contractor work on track without adding to the manager’s load.
When a job is booked, the agent sends the contractor the address, access instructions, photos and the tenant’s availability. It confirms the appointment the day before, reminds the tenant and checks in afterwards to confirm the work is done. If a contractor declines or does not respond, the agent moves to the next approved option.
Over time the agent builds a useful record: which contractors respond quickly, which jobs get repeated and which buildings need more frequent attention. Managers can use this information when negotiating rates, choosing preferred suppliers and planning preventive maintenance that stops small problems from becoming expensive repairs. Sharing a short summary of this record with owners each quarter also shows them the value of the work being done on their behalf, which strengthens the relationship.`,
}
const withExtra = (slug, body) => body.replace('\n## Summary', `\n${extra[slug]}\n## Summary`)

export const articles = [
  ...llm.map(([slug, name, heading, body]) => ({ kind: 'llm', slug, name, heading, body: withExtra(slug, body) })),
  ...ind.map(([slug, name, heading, body]) => ({ kind: 'industry', slug, name, heading, body: withExtra(slug, body) })),
]

export const articleShared = {
  cta: 'Start building free',
  label: ['Free plan', 'No card needed'],
  tocTitle: 'Table of contents',
}
