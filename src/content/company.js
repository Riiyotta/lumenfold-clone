// Company / conversion page copy. All original placeholder content for the fictional brand "Lumenfold".
// Lengths follow the slot counts in specs/PAGES_COMPANY.md.

/* ---------- Customers (shared by logo grid, showcase, story cards and story pages) ---------- */
export const stories = [
  {
    slug: 'northwind', company: 'Northwind', short: 'Northwind', photo: '/assets/photos/co-story-1.webp',
    industry: 'Logistics', team: 'Customer support', site: 'northwind.example',
    title: 'How Northwind cleared a two-week support backlog in four days with agents',
    card: 'Northwind cleared a two-week support backlog in four days and kept it at zero',
    headline: 'How Northwind cleared its support backlog in four days',
    author: 'Mara Lind', date: 'Mar 2026 · 6 min',
    stats: [['4 days', 'to clear backlog'], ['62%', 'tickets auto-resolved'], ['9 hrs', 'saved per rep weekly']],
    agent: 'Triage', pain: 'a support queue that grew faster than the team could hire',
    person: { name: 'Priya Nandakumar', role: 'VP Customer Experience', seed: 4 },
    quote: 'We stopped firefighting. The agents take the repeat questions and my team finally has time for the tricky, human ones.',
    lede: [
      'Northwind moves freight for more than two thousand mid-sized retailers. When peak season arrived early last year, its support inbox doubled in a month and response times slipped from hours to days.',
      'Rather than hire a temporary team it could not train in time, Northwind piloted a Lumenfold triage agent. Four days later the backlog was gone, and it has stayed close to zero ever since.',
    ],
  },
  {
    slug: 'tidewater', company: 'Tidewater', short: 'Tidewater', photo: '/assets/photos/co-story-2.webp',
    industry: 'Financial services', team: 'Account management', site: 'tidewater.example',
    title: 'Tidewater gave every account manager a research assistant that never tires',
    card: 'Tidewater gave every account manager a tireless research assistant before each call',
    headline: 'Tidewater hands every account manager a research partner',
    author: 'Jonas Erikson', date: 'Feb 2026 · 7 min',
    stats: [['3x', 'more accounts covered'], ['40 min', 'prep time cut'], ['$1.2M', 'new pipeline added']],
    agent: 'Briefing', pain: 'account managers spending their mornings on research instead of clients',
    person: { name: 'Leo Brandt', role: 'Head of Account Management', seed: 9 },
    quote: 'Every call now starts with a brief that would have taken an hour to write. Our managers walk in prepared, every single time.',
    lede: [
      'Tidewater looks after the treasury needs of four hundred growing companies. Each account manager covers dozens of clients, and preparing for a single review used to eat most of a morning.',
      'Today a Lumenfold briefing agent reads the account history, the latest filings and recent news, then drops a one-page brief into the calendar invite an hour before each meeting.',
    ],
  },
  {
    slug: 'brightpath', company: 'Brightpath', short: 'Brightpath', photo: '/assets/photos/co-story-3.webp',
    industry: 'Education', team: 'Revenue', site: 'brightpath.example',
    title: 'Brightpath now answers every inbound lead in under a minute, day or night',
    card: 'Brightpath answers every inbound lead in under a minute, at any hour',
    headline: 'Brightpath answers every new lead in under a minute',
    author: 'Mara Lind', date: 'Jan 2026 · 5 min',
    stats: [['48 sec', 'median first reply'], ['27%', 'lift in meetings'], ['24/7', 'coverage']],
    agent: 'Inbound', pain: 'good leads going cold overnight and across time zones',
    person: { name: 'Ines Carvalho', role: 'Director of Revenue', seed: 2 },
    quote: 'A parent in Singapore asks a question at 3am and gets a thoughtful answer before they put the kettle on. That changed our pipeline.',
    lede: [
      'Brightpath sells learning programmes to schools and families across eleven countries. Most enquiries arrive outside office hours, and a lead that waits until morning is often a lead that is gone.',
      'Its inbound agent now replies to every new enquiry within a minute, answers the common questions, qualifies the fit and books a call with the right advisor while interest is still warm.',
    ],
  },
  {
    slug: 'quillstone', company: 'Quillstone', short: 'Quillstone', photo: '/assets/photos/co-story-4.webp',
    industry: 'Software', team: 'Revenue operations', site: 'quillstone.example',
    title: 'Quillstone keeps eighteen thousand CRM records clean without a single spreadsheet',
    card: 'Quillstone keeps eighteen thousand CRM records clean, tidy and current',
    headline: 'Quillstone retires the CRM clean-up spreadsheet for good',
    author: 'Ade Mensah', date: 'Dec 2025 · 6 min',
    stats: [['18k', 'records kept clean'], ['11 hrs', 'saved each week'], ['99%', 'field accuracy']],
    agent: 'Hygiene', pain: 'a CRM full of duplicates, stale titles and missing fields',
    person: { name: 'Dana Whitlock', role: 'Head of Revenue Operations', seed: 7 },
    quote: 'Our agents handle the busywork now, so the team spends its days with customers instead of spreadsheets.',
    lede: [
      'Quillstone builds scheduling software for clinics. Its sales team relies on the CRM for everything, yet a quarter of its records had duplicates, outdated job titles or missing contact details.',
      'A Lumenfold hygiene agent now checks every new and changed record overnight, merges obvious duplicates, fills gaps from trusted sources and leaves a short note for anything it is unsure about.',
    ],
  },
  {
    slug: 'maplewood', company: 'Maplewood', short: 'Maplewood', photo: '/assets/photos/co-story-5.webp',
    industry: 'Healthcare', team: 'Customer success', site: 'maplewood.example',
    title: 'Maplewood runs half of its customer onboarding checklist on autopilot',
    card: 'Maplewood put half of its onboarding checklist on autopilot in three months',
    headline: 'Maplewood puts half of its onboarding on autopilot',
    author: 'Jonas Erikson', date: 'Nov 2025 · 8 min',
    stats: [['50%', 'of checklist automated'], ['6 days', 'faster go-live'], ['4.9', 'onboarding rating']],
    agent: 'Onboarding', pain: 'a forty-step onboarding checklist tracked by hand',
    person: { name: 'Sam Okafor', role: 'Director of Customer Success', seed: 11 },
    quote: 'We launched our first agent in an afternoon. Three months later it quietly runs half of our onboarding checklist for us.',
    lede: [
      'Maplewood provides patient intake software to community practices. Every new customer meant a forty-step checklist spread across email threads, shared documents and a very patient success team.',
      'Its onboarding agent now sends the welcome pack, collects the data files, checks them for problems and nudges the right people when a step stalls, so go-live arrives almost a week sooner.',
    ],
  },
  {
    slug: 'lumora', company: 'Lumora', short: 'Lumora', photo: '/assets/photos/co-story-6.webp',
    industry: 'Retail', team: 'Finance', site: 'lumora.example',
    title: 'Lumora matches every supplier invoice the day it arrives',
    card: 'Lumora matches every supplier invoice on the day it arrives',
    headline: 'Lumora matches every supplier invoice on arrival',
    author: 'Ade Mensah', date: 'Oct 2025 · 5 min',
    stats: [['<1 day', 'to match each invoice'], ['94%', 'matched without help'], ['0', 'late payment fees']],
    agent: 'Ledger', pain: 'thousands of supplier invoices matched by hand each month',
    person: { name: 'Hana Moreau', role: 'Finance Operations Lead', seed: 14 },
    quote: 'Month end used to mean late nights. Now the agent has matched everything before we even open the report.',
    lede: [
      'Lumora runs forty homeware stores and a busy online shop. Its finance team received around six thousand supplier invoices a month and matched each one to a purchase order by hand.',
      'A Lumenfold ledger agent now reads each invoice as it lands, matches it to the order and delivery note, and routes only the genuine mismatches to a person with the context already attached.',
    ],
  },
]

export const storyBySlug = Object.fromEntries(stories.map(s => [s.slug, s]))

// Article body template, filled from each story's fields. Six numbered sections, as in the sampled story shape.
export function storyBody(s) {
  return [
    { id: 'where-it-was-stuck', title: `1. Where ${s.short} was getting stuck`, paras: [
      `Like many growing teams, ${s.short} was dealing with ${s.pain}. Nobody was doing anything wrong. There was simply more routine work arriving each week than people to do it well.`,
      'The team had tried the usual fixes: shared templates, a few macros and a weekly clean-up session. Each one helped for a while, then the volume caught up again.',
      `"We knew the work was repeatable," says ${s.person.name}, ${s.person.role}. "We just could not find the hours to make it repeat on its own."`,
    ] },
    { id: 'choosing-a-pilot', title: '2. Choosing a first agent to pilot', paras: [
      `${s.short} started small. Working with a Lumenfold solutions lead, the ${s.team.toLowerCase()} team listed every recurring task and scored each one for volume, risk and how clearly the steps could be written down.`,
      `One task stood out on all three counts, and it became the job for the first agent, which the team named ${s.agent}.`,
      { list: ['High volume, every single day', 'Clear rules the team already followed', 'Easy to check and easy to undo'] },
    ] },
    { id: 'teaching-the-playbook', title: `3. Teaching ${s.agent} the playbook`, paras: [
      `Instead of writing code, the team described the process in plain language, attached the documents a new hire would read, and connected the two tools ${s.agent} needed to do the job.`,
      'They then replayed a month of past work through the agent and compared its choices with what the team had actually done. Where the two disagreed, they tightened the instructions.',
      'After two rounds the agent agreed with the team on almost every case, and the remaining differences were ones the team wanted to review anyway.',
    ] },
    { id: 'people-in-the-loop', title: '4. Keeping people in the loop', paras: [
      `${s.short} wanted speed without surprises. Every action ${s.agent} takes is logged with its reasoning, and anything outside the agreed rules is paused for a person to approve.`,
      { quote: s.quote },
      'In the first weeks the team reviewed every decision. As confidence grew, they moved to spot checks and a short weekly report.',
    ] },
    { id: 'after-ninety-days', title: '5. What changed after ninety days', paras: [
      `Three months in, the numbers speak for themselves: ${s.stats.map(([v, l]) => `${v} ${l}`).join(', ')}.`,
      'Just as important, the work people do has changed. The team spends less time on routine steps and more on the conversations and judgement calls that need a human.',
    ] },
    { id: 'whats-next', title: `6. What ${s.short} is building next`, paras: [
      `${s.short} is now designing two more agents that will hand work to ${s.agent}, forming a small crew that covers the whole process from first request to final follow-up.`,
      `"Start with one boring task and do it properly," says ${s.person.name.split(' ')[0]}. "Everything else follows from there."`,
    ] },
  ]
}

/* ---------- Logo grid (13 cells, story links where a story exists) ---------- */
export const logoGrid = [
  { name: 'Northwind', slug: 'northwind' }, { name: 'Halcyon' }, { name: 'Brightpath', slug: 'brightpath' },
  { name: 'Quillstone', slug: 'quillstone' }, { name: 'Orbital' }, { name: 'Tidewater', slug: 'tidewater' },
  { name: 'Ferrocene' }, { name: 'Maplewood', slug: 'maplewood' }, { name: 'Vantage&Co' },
  { name: 'Kestrel' }, { name: 'Lumora', slug: 'lumora' }, { name: 'Pinecrest' }, { name: 'Saltmarsh' },
]
export const logoLink = 'Read story'

/* ---------- Shared CTA defaults ---------- */
export const cta = {
  title: 'Put your first agent to work',
  body: 'Bring one repetitive task to a thirty-minute call. We will map it with you, build a working agent together and show you exactly what it would take to run it in production.',
  primary: { label: 'Book a demo', to: '/book-a-demo' },
  secondary: { label: 'See pricing', to: '/pricing' },
}

/* ---------- /pricing ---------- */
export const pricing = {
  title: ['One plan for every agent team', 'priced fairly'],
  plan: {
    name: 'Foundation',
    body: 'Everything your company needs to design, run and govern agents at full scale.',
    features: [
      ['Unlimited agent builders', 'Custom agent crews', 'Workflow canvas', 'Shared knowledge base', 'Scheduled and live runs', 'Human approval steps'],
      ['Single sign-on and roles', 'Full audit trail', 'Regional data hosting', 'Bring your own model keys', 'Usage and cost controls', 'Named success partner'],
    ],
    cta: 'Talk to sales',
  },
  faqTitle: 'Questions, quickly answered',
  faqBody: 'Still unsure? Our team can help.',
  faq: [
    { q: 'How is the Foundation plan billed?', a: ['We agree a yearly platform fee based on the number of teams and the run volume you expect. There are no per-seat surprises, and you can ', { label: 'talk to sales', to: '/book-a-demo' }, ' for a tailored quote.'] },
    { q: 'Can we try Lumenfold first?', a: ['Yes. Every new workspace starts with a guided two-week pilot so you can build and test a real agent on your own data before you commit.'] },
    { q: 'Where is our data stored?', a: ['You choose the hosting region when the workspace is created, and your data never leaves it. Read our ', { label: 'data security policy', to: '/data-security-policy' }, ' for the details.'] },
  ],
}

/* ---------- /enterprise ---------- */
export const enterpriseHero = {
  title: 'Enterprise agents, governed from day one',
  body: 'Lumenfold gives large organisations one place to build, approve and monitor agents, with the controls your security team asks for first.',
  primary: { label: 'Book a demo', to: '/book-a-demo' },
  secondary: { label: 'Explore plans', to: '/pricing' },
  rows: [
    ['@1', 'Ticket triage', 'Lead research', '@5', 'Invoice checks', 'CRM clean-up', '@8', 'Weekly digest'],
    ['Contract review', '@3', 'Meeting notes', 'Renewal nudges', '@12', 'Policy answers', 'Onboarding'],
  ],
}

export const governance = {
  title: 'Govern every agent the way you govern people',
  body: 'Give each agent a role, a manager and clear limits, then watch every decision it makes in one shared view.',
  items: [
    { label: 'Access', title: 'Give every agent a clear role', body: 'Agents inherit permissions from the team that owns them, so they only ever see the systems and records that team is allowed to touch.', pills: ['Reads the CRM', 'Drafts, never sends', 'Finance data hidden'] },
    { label: 'Approval', title: 'Keep people in charge of risky steps', body: 'Mark any action as needing sign-off. The agent pauses, explains its reasoning and waits for a named approver before it carries on.', pills: ['Refund over $500', 'Awaiting Ana'] },
    { label: 'Oversight', title: 'See every run, every decision and every cost in one place', body: 'Live dashboards show what each agent did, why it did it and what it cost, with exports ready for your next audit review.', pills: ['1,284 runs today', '3 flagged for review'] },
  ],
}

export const stackCollapse = {
  title: 'Swap a pile of tools for one',
  body: 'Most teams stitch agents together from a chat tool, a workflow app, a vector store and a dozen scripts. Lumenfold folds them into one.',
  layers: [
    ['Prompt library', 'Docs and notes'], ['Workflow builder', 'Automation app'], ['Vector store', 'Search service'],
    ['Model gateway', 'API proxy'], ['Evaluation suite', 'Test harness'], ['Approval inbox', 'Shared mailbox'],
    ['Run monitor', 'Logging tool'], ['Access control', 'Identity admin'], ['Cost reporting', 'Billing exports'],
  ],
  marqueeTitle: 'Teams that switched kept the parts they liked',
  cards: [
    { title: 'Support crew replaced four scripts', meta: ['Triage', '+', 'Routing'] },
    { title: 'Finance agents now share one audit log', meta: ['Ledger', '·', 'Approvals'] },
    { title: 'Sales research moved off a patchwork', meta: ['Briefing', '+', 'Enrichment'] },
    { title: 'Ops team retired its home-built gateway', meta: ['Gateway', '·', 'Costs'] },
    { title: 'People team unified intake and answers', meta: ['Intake', '+', 'Policy'] },
  ],
  closingTitle: 'One platform, one bill and one place to look when it matters',
  closingBody: 'Fewer vendors to review, fewer keys to rotate and a single trail for every run.',
}

export const productionGap = {
  title: 'Why most agent pilots never reach production',
  body: 'A demo agent can be built in an afternoon. Running it safely for thousands of customers needs testing, approvals, monitoring and cost control. That gap is where most projects stall, and it is where Lumenfold helps most.',
  top: { title: 'The demo', sub: 'Works on a happy path' },
  bands: [
    { title: 'Testing against real past cases', sub: 'Replay a month of work before launch' },
    { title: 'Approvals for risky actions', sub: 'Named people sign off when it matters' },
    { title: 'Live monitoring and alerting', sub: 'Spot drift before customers do' },
    { title: 'Cost limits and access controls that scale with you', sub: null },
  ],
}

export const comparison = {
  titleA: 'Side by side,', titleB: 'with the field',
  body: 'See how Lumenfold compares with the tools teams most often try first. Pick a category to switch the right-hand column.',
  competitors: [
    { id: 'diy', label: 'DIY agent frameworks', seed: 1 },
    { id: 'rpa', label: 'Classic RPA suites', seed: 2 },
    { id: 'chat', label: 'Chatbot builders', seed: 3 },
  ],
  rows: [
    { label: 'Build without writing code', us: 'Describe the process in plain language and attach your documents. Agents are ready to test in minutes.', them: { diy: ['no', 'Every agent is hand-written and maintained by engineers, so business teams wait in a queue.'], rpa: ['partial', 'Visual builders exist, but they record clicks rather than understand the task, and break when screens change.'], chat: ['partial', 'Simple flows are easy to draw, but anything beyond a scripted conversation needs custom code.'] } },
    { label: 'Agents that work as a team', us: 'Link agents into crews with clear hand-offs, shared memory and a single log of who did what.', them: { diy: ['partial', 'Possible with enough engineering effort, but each hand-off is custom glue code that someone has to own.'], rpa: ['no', 'Bots run one recorded script at a time, with no notion of passing judgement-based work between them.'], chat: ['no', 'Each bot handles its own conversation, with no structured way to hand work to another bot.'] } },
    { label: 'Human approval steps', us: 'Mark any action as needing sign-off. The agent pauses, explains itself and resumes once approved.', them: { diy: ['partial', 'You can build approval queues yourself, along with the notifications, permissions and audit trail.'], rpa: ['partial', 'Basic attended runs are supported, but approvals live outside the bot and lack the reasoning behind them.'], chat: ['no', 'Hand-off to a person usually means ending the bot conversation entirely and starting again.'] } },
    { label: 'Testing on real past work', us: 'Replay weeks of historical cases through an agent and compare its choices with what your team did.', them: { diy: ['partial', 'Evaluation tooling is available as separate libraries that need wiring up, hosting and maintenance.'], rpa: ['no', 'Testing is limited to recorded happy paths, so edge cases tend to surface in production instead.'], chat: ['no', 'Testing means chatting with the bot by hand, one scenario at a time, before each release.'] } },
    { label: 'Audit trail for every decision', us: 'Every run records its inputs, reasoning, actions and cost, searchable and exportable for audits.', them: { diy: ['partial', 'Logs exist wherever engineers chose to add them, which rarely matches what auditors ask for.'], rpa: ['partial', 'Step logs are recorded, but they show clicks and keystrokes rather than why a decision was made.'], chat: ['partial', 'Transcripts are stored, but actions taken in other systems are not tied back to the conversation.'] } },
    { label: 'Regional data hosting', us: 'Choose where your workspace lives and keep every record, log and model call inside that region.', them: { diy: ['partial', 'Fully under your control, which also means your team owns every hosting and compliance decision.'], rpa: ['partial', 'Available on some on-premise editions, often at a significant extra licence and maintenance cost.'], chat: ['no', 'Most builders run in a single shared region, with limited options for data residency.'] } },
    { label: 'Predictable cost controls', us: 'Set limits per agent, team or workspace and see spend in real time, with alerts before any limit is reached.', them: { diy: ['no', 'Model usage is billed directly by each provider, so totals only appear when the invoices arrive.'], rpa: ['partial', 'Licences are predictable, but each new bot or runner usually means another seat to buy.'], chat: ['partial', 'Message-based pricing is simple to read but climbs quickly as conversations get longer.'] } },
  ],
}

/* ---------- /careers ---------- */
export const careers = {
  title: 'Build agents that give every team back', highlight: 'its best hours',
  body: 'We are a small, curious team making AI teammates that feel calm and useful.',
  cta: 'See roles',
  about: [
    'Lumenfold started in a shared kitchen in ', '#Lisbon', ' with a simple idea: the busywork that fills a working day should be handled by software that understands it. Today our team spans ', '#Lisbon', ', ', '#Toronto', ' and a dozen time zones in between, and every week thousands of teams hand real work to a ', '#Lumenfold agent', '. We are still early, and there is a great deal left to build together.',
  ],
  valuesTitle: 'What we value',
  values: [
    { title: 'Calm over chaos', body: 'We plan carefully so we rarely need to rush. Fewer fire drills mean more thoughtful work, better products and evenings that belong to you. When things do go wrong, we fix them steadily and share what we learned.' },
    { title: 'Customers in the room', body: 'Every engineer, designer and writer talks to customers. We watch real teams use what we build, and we let what we see change our plans, even when it means letting go of an idea we loved.' },
    { title: 'Write it down', body: 'We are spread across many time zones, so clear writing is how we think together. Decisions, trade-offs and reasoning live in shared documents that anyone can read, question and build on later.' },
    { title: 'Small teams, real ownership', body: 'Teams of three to five own a problem from first sketch to production. You will ship meaningful work early, hear directly from the people who use it, and have the trust to make the call.' },
    { title: 'Kind and direct', body: 'We say what we think, clearly and with care. Feedback is a gift we give often and receive gracefully, because it is the quickest way for all of us to grow, and it keeps small problems small.' },
    { title: 'Leave it better than you found it', body: 'Whether it is a line of code, a help article or an onboarding guide, we tidy as we go. Small improvements compound, and the next person to arrive should find things a little easier than we did.' },
  ],
  rolesTitle: 'Open positions',
  rolesBody: 'We hire for curiosity and care. If a role below sounds close, we would love to hear from you soon.',
  roles: [
    { title: 'Senior Product Engineer, Agent Runtime', team: 'Engineering', place: 'Lisbon or remote' },
    { title: 'Product Designer, Builder Experience', team: 'Design', place: 'Toronto or remote' },
    { title: 'Machine Learning Engineer, Evaluations', team: 'Engineering', place: 'Remote, Europe' },
    { title: 'Solutions Lead, Enterprise', team: 'Customer', place: 'Toronto' },
    { title: 'Customer Success Manager', team: 'Customer', place: 'Lisbon' },
    { title: 'Technical Writer, Documentation', team: 'Product', place: 'Remote' },
  ],
  noticeTitle: 'A note on recruiting messages',
  notice: ['We only contact candidates from an address ending in lumenfold.example, and we will never ask for payment, banking details or equipment purchases during hiring. If something feels off about a message that claims to come from us, please forward it to ', { label: 'our people team', to: '/contact-support' }, ' before replying.'],
}

/* ---------- /customers ---------- */
export const customersHero = {
  title: 'Teams everywhere are handing busywork to agents',
  body: 'See how support, sales and finance teams use Lumenfold to win back their week and do more of the work they love.',
  primary: { label: 'Book a demo', to: '/book-a-demo' },
  secondary: { label: 'See pricing', to: '/pricing' },
  readStory: 'Read the story',
  cardCta: 'Read customer story',
}

export const tasksCta = {
  title: 'Imagine what your team could do without the busywork',
  final: 'Let agents take the list, and keep the good parts',
  button: { label: 'Book a demo', to: '/book-a-demo' },
  tasks: [
    'Update the CRM after every call', 'Chase unpaid supplier invoices', 'Summarise the weekly standup', 'Tag new support tickets',
    'Enrich inbound leads', 'Book follow-up meetings', 'Draft renewal reminders', 'Reconcile expense reports',
    'Merge duplicate contacts', 'Translate help centre articles', 'Screen new job applicants', 'Prepare account briefs',
    'Log notes from every meeting', 'Route urgent tickets to on-call', 'Check quotes against policy', 'Refresh the pipeline report',
    'Reply to common questions', 'Sort the shared inbox', 'Flag accounts at risk of churn', 'Collect customer feedback',
    'Match purchase orders', 'Write release notes', 'Schedule social media posts', 'Archive closed projects',
  ],
  share: 'Share:',
  crumb: 'Customer stories',
}

/* ---------- /book-a-demo ---------- */
export const demo = {
  title: ['See your agents', 'working live'],
  body: 'Tell us a little about your team and we will build a working agent with you on the call, using your own process.',
  submit: 'Book my demo',
  success: 'Thanks, we will be in touch within one working day.',
  fields: [
    { name: 'first', label: 'First name', placeholder: 'Ana', required: true, half: true },
    { name: 'last', label: 'Last name', placeholder: 'Silva', required: true, half: true },
    { name: 'email', label: 'Work email', type: 'email', placeholder: 'ana@company.com', required: true },
    { name: 'company', label: 'Company', placeholder: 'Company name', required: true },
  ],
  slides: [0, 1, 2, 3, 4, 5],
}

/* ---------- /contact-support ---------- */
export const contact = {
  title: 'Contact support',
  body: 'Stuck on a build, curious about a feature or seeing something odd in a run? Send us a note and a real person will reply within a day.',
  submit: 'Send message',
  success: 'Thanks for writing. We will reply within a day.',
  error: 'Something is missing. Please check the fields above again.',
  fields: [
    { name: 'name', label: 'Name', placeholder: 'Your full name', required: true },
    { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@yourcompany.example', required: true },
    { name: 'details', label: 'Enquiry details', type: 'textarea', rows: 4, placeholder: 'Tell us what you are working on and where things are not quite right', required: true },
  ],
  cta: {
    title: 'Prefer to talk it through?', highlight: 'talk',
    body: 'Book a short call with a solutions lead. Bring the agent you are building, the task you want to hand over, or simply the questions you have not found answers to yet.',
  },
}

/* ---------- /partners ---------- */
export const partners = {
  pill: 'Partner programme',
  titleA: 'Partner', titleB: ' with Lumenfold',
  body: 'Help your clients hand their busywork to agents, and grow your practice as you go.',
  cta: 'Apply to the programme',
  featureA: 'Become a', featureB: 'Lumenfold certified pro',
  featureBody: 'Earn the badge, join the directory and meet clients who need you.',
  featureCta: 'Learn more',
  benefitsPill: 'Partner benefits',
  benefitsA: 'Grow your', benefitsB: 'practice',
  benefitsBody: 'Partners get early access to new features, a direct line to our product team, co-marketing support and referrals from customers looking for expert help.',
  bento: [
    [{ kind: 'small', title: 'Early feature access', body: 'Try new capabilities before launch and shape them with your feedback.' }, { kind: 'large', title: 'A directory listing that brings work', body: 'Customers find you by industry, region and skill set.', img: '/assets/photos/co-bento-1.webp' }],
    [{ kind: 'large', title: 'Co-marketing with our team', body: 'Joint webinars, case studies and launch posts that feature your work.', img: '/assets/photos/co-bento-2.webp' }, { kind: 'small', title: 'A direct line to product', body: 'A private channel with the engineers and designers building Lumenfold, plus a monthly roadmap call.' }],
    [{ kind: 'small', title: 'Training and certification', body: 'Free courses and a certification path for your whole team.' }, { kind: 'large', title: 'Partner pricing for client workspaces', body: 'Discounted workspaces so you can pilot with every client.', img: '/assets/photos/co-bento-3.webp' }],
  ],
  faqA: 'Questions about ', faqB: 'partnering',
  faq: [
    { q: 'Who can become a partner?', a: ['Agencies, consultancies and independent builders who help businesses improve their operations. You do not need to have used Lumenfold before applying.'] },
    { q: 'Is there a fee to join?', a: ['No. The programme is free to join, and certification courses are free for every member of a partner team.'] },
    { q: 'How do client referrals work?', a: ['When a customer asks for help, we suggest partners that match their industry, region and needs. You agree the scope and terms with the client directly.'] },
    { q: 'How long does certification take?', a: ['Most people finish the coursework in about a week of part-time study, followed by a short practical review of an agent you have built.'] },
    { q: 'Can we resell Lumenfold?', a: ['Yes, approved partners can bundle Lumenfold workspaces into their own services at partner pricing. Mention it in your application and we will walk you through it.'] },
  ],
  certA: 'Get the', certB: 'certified partner badge',
  certBody: 'Show clients you know how to design, test and run agents well.',
  certCta: 'Apply now',
  applyTitle: 'Apply to become a partner',
  applyBody: 'Tell us about your practice and the clients you help.',
  submit: 'Send application',
  success: 'Thanks for applying. We will be in touch within a week.',
  fields: [
    { name: 'name', label: 'Full name', placeholder: 'Ana Silva', required: true, half: true },
    { name: 'email', label: 'Work email', type: 'email', placeholder: 'ana@agency.example', required: true, half: true },
    { name: 'company', label: 'Company', placeholder: 'Agency name', required: true, half: true },
    { name: 'website', label: 'Website', placeholder: 'agency.example', half: true },
    { name: 'type', label: 'Partner type', type: 'select', required: true, options: ['Agency', 'Consultancy', 'Independent builder', 'Technology partner'] },
    { name: 'message', label: 'Tell us about your work', type: 'textarea', rows: 4, placeholder: 'The kinds of clients you help and the problems you solve' },
  ],
}

/* ---------- /about-us ---------- */
export const about = {
  pill: 'About us',
  titleA: 'We build calm, capable teammates ', titleB: 'powered', titleC: ' by thoughtful agents',
  storyPill: 'Our story',
  storyTitle: 'Lumenfold exists so that people can spend their working days on the work only people can do well.',
  paras: [
    'We started Lumenfold after years of watching brilliant teams lose their afternoons to copying, checking and chasing.',
    'Software had automated plenty of tasks, but most of it was brittle, hard to change and owned by a single engineer.',
    'We wanted something different: agents that understand a process, explain their choices and grow with the team.',
  ],
  list: ['Plain language instead of code', 'People approve anything that carries real risk', 'Every decision is visible and reviewable later'],
  closing: ['We are backed by ', 'Harbour Lane', ', ', 'Northlight Ventures', ', ', 'Copperfield Capital', ', ', 'Ninth Wave', ' and ', 'Atlas Seed', ', alongside founders and operators who have built teams like yours.'],
}

/* ---------- Legal documents ---------- */
const b = (lead, text) => [lead, text]

export const legal = {
  privacy: {
    title: 'Privacy Policy',
    intro: [
      'This Privacy Policy explains how Lumenfold Labs ("Lumenfold", "we", "us") collects, uses and protects personal information when you visit our websites, use the Lumenfold platform or otherwise interact with us. Lumenfold is a fictional company and this document is placeholder text for demonstration purposes only.',
      'We have tried to write this policy in plain language. Where we use a defined term, we explain it the first time it appears. If anything is unclear, please get in touch using the details in the final section and we will be happy to help.',
      'By using our services you acknowledge that you have read this policy. If you do not agree with the way we handle personal information, please do not use the services.',
    ],
    sections: [
      { id: 'who-we-are', title: 'Who we are', blocks: [
        { p: 'Lumenfold Labs provides a platform that lets businesses design, run and supervise AI agents. For most of the information described here we act as the controller, meaning we decide why and how it is processed.' },
        { p: 'When our customers use the platform to process information about their own customers or staff, we act as their processor and follow their instructions under a separate data processing agreement.' },
      ] },
      { id: 'information-we-collect', title: 'Information we collect', blocks: [
        { p: 'We collect information in three main ways: directly from you, automatically when you use our services, and from trusted third parties.' },
        { ul: [
          b('Account information.', 'When you create a workspace we collect your name, work email address, company name, job title and a password or single sign-on identifier. We use this to set up and secure your account.'),
          b('Contact and enquiry details.', 'When you book a demo, contact support or apply to a programme, we collect the details you enter in the form, along with any messages or attachments you choose to send.'),
          b('Usage information.', 'We record how the platform is used, including pages visited, features used, agent runs started and settings changed. This helps us keep the service reliable and improve it over time.'),
          b('Device and log information.', 'Our servers automatically record your IP address, browser type, operating system, referring page and timestamps for each request.'),
          b('Billing information.', 'If you purchase a paid plan, our payment provider collects your card or bank details. We receive only a token, the last four digits and the expiry date.'),
        ] },
      ] },
      { id: 'customer-content', title: 'Customer content processed by agents', blocks: [
        { p: 'Customer content means the documents, records, prompts and outputs that our customers connect to or generate with their agents. We process customer content only to provide the services and as instructed by the customer.' },
        { ul: [
          b('No model training.', 'We do not use customer content to train our own or third-party foundation models.'),
          b('Region of storage.', 'Customer content is stored in the hosting region the customer selects when creating a workspace.'),
          b('Retention controls.', 'Customers can configure how long run logs and outputs are kept, from seven days to the full contract term.'),
        ] },
      ] },
      { id: 'how-we-use-information', title: 'How we use information', blocks: [
        { p: 'We use personal information for the purposes listed below and only where we have a lawful basis to do so.' },
        { ol: [
          'To provide, maintain and secure the Lumenfold platform and our websites.',
          'To respond to enquiries, demo requests and support conversations.',
          'To send service announcements, security notices and, where permitted, product news you can opt out of at any time.',
          'To understand how the services are used so that we can fix problems and build better features.',
          'To comply with our legal obligations and enforce our terms.',
        ] },
      ] },
      { id: 'legal-bases', title: 'Legal bases for processing', blocks: [
        { p: 'Where data protection law requires a legal basis, we rely on the following.' },
        { table: { head: ['Purpose', 'Legal basis', 'Example'], rows: [
          ['Providing the services', 'Performance of a contract', 'Creating your workspace, running agents you configure and providing support when you ask for it.'],
          ['Improving and securing the services', 'Legitimate interests', 'Analysing aggregated usage to find slow pages, and monitoring logs to detect abuse or intrusion.'],
          ['Marketing communications', 'Consent or legitimate interests', 'Sending a monthly product newsletter that you can unsubscribe from with a single click.'],
        ] } },
      ] },
      { id: 'sharing', title: 'How we share information', blocks: [
        { p: 'We do not sell personal information. We share it only in the limited situations described below.' },
        { ul: [
          b('Service providers.', 'We use carefully selected vendors for hosting, email delivery, analytics, payments and customer support. They may only use the information to provide services to us.'),
          b('Model providers.', 'When an agent calls a language model, the relevant prompt and context are sent to the model provider the customer has chosen, under terms that prohibit training on that data.'),
          b('Professional advisers.', 'We may share information with lawyers, auditors and insurers where reasonably necessary.'),
          b('Legal requirements.', 'We may disclose information if required by law, or to protect the rights, safety and property of Lumenfold, our customers or others.'),
          b('Business transfers.', 'If Lumenfold is involved in a merger, acquisition or sale of assets, personal information may be transferred as part of that transaction, subject to this policy.'),
        ] },
      ] },
      { id: 'international-transfers', title: 'International transfers', blocks: [
        { p: 'Some of our service providers are located outside the country where you live. When we transfer personal information internationally, we use appropriate safeguards such as standard contractual clauses and conduct transfer risk assessments where required.' },
      ] },
      { id: 'retention', title: 'Data retention', blocks: [
        { p: 'We keep personal information only for as long as we need it for the purposes described in this policy, or as required by law.' },
        { ul: [
          b('Account information.', 'Kept for the life of your account and deleted within ninety days of closure, unless we must keep it longer for legal reasons.'),
          b('Enquiry details.', 'Kept for up to two years after our last interaction, so that we can follow up on your request.'),
          b('Logs.', 'Server logs are kept for up to thirteen months for security and troubleshooting.'),
        ] },
      ] },
      { id: 'security', title: 'How we protect information', blocks: [
        { p: 'We use administrative, technical and physical safeguards designed to protect personal information, including encryption in transit and at rest, role-based access, regular penetration testing and continuous monitoring.' },
        { ul: [
          b('Access on a need-to-know basis.', 'Staff access to production systems is limited, logged and reviewed every quarter.'),
          b('Independent audits.', 'Our controls are reviewed by an independent auditor each year. Reports are available to customers under a confidentiality agreement.'),
        ] },
      ] },
      { id: 'your-rights', title: 'Your rights and choices', blocks: [
        { p: 'Depending on where you live, you may have the right to access, correct, delete or export your personal information, and to object to or restrict certain processing.' },
        { ul: [
          b('Access and portability.', 'You can ask for a copy of the personal information we hold about you in a commonly used format.'),
          b('Correction.', 'You can update most account details yourself from the workspace settings page, or ask us to correct anything that is wrong.'),
          b('Deletion.', 'You can ask us to delete your personal information. We will do so unless we need to keep it to meet a legal obligation.'),
          b('Marketing preferences.', 'Every marketing email includes an unsubscribe link, and you can change your preferences at any time.'),
        ] },
        { p: 'We will respond to verified requests within the time required by applicable law, usually thirty days.' },
      ] },
      { id: 'cookies', title: 'Cookies and similar technologies', blocks: [
        { p: 'We use cookies to keep you signed in, remember your preferences and understand how our websites are used. You can control non-essential cookies through the banner shown on your first visit or through your browser settings.' },
        { ol: [
          'Strictly necessary cookies keep the site and platform working and cannot be switched off.',
          'Preference cookies remember choices such as your language and region.',
          'Analytics cookies help us understand which pages are useful, using aggregated data.',
        ] },
      ] },
      { id: 'children', title: 'Children', blocks: [
        { p: 'Our services are intended for businesses and are not directed to children under sixteen. We do not knowingly collect personal information from children.' },
      ] },
      { id: 'changes', title: 'Changes to this policy', blocks: [
        { p: 'We may update this policy from time to time. When we make material changes, we will notify workspace owners by email and update the date at the top of this page at least fourteen days before the change takes effect.' },
      ] },
      { id: 'contact-us', title: 'Contact us', blocks: [
        { p: 'If you have questions about this policy or wish to exercise your rights, please contact our privacy team through the contact support page. Lumenfold is fictional, so no real requests will be received or processed.' },
        { ol: [
          'Use the contact support form and choose "Privacy" in your message.',
          'Include the email address linked to your account so we can verify your request.',
          'We will confirm receipt within two working days.',
        ] },
      ] },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    intro: [
      'These Terms and Conditions govern your access to and use of the Lumenfold platform and websites. Lumenfold is a fictional company and this document is placeholder text for demonstration purposes only.',
      'By creating a workspace or using the services, you agree to these terms on behalf of yourself and the organisation you represent.',
    ],
    sections: [
      { id: 'the-services', title: 'The services', blocks: [{ p: 'Lumenfold provides tools to design, run and supervise AI agents. We may add, change or remove features over time, and we will give reasonable notice of any change that materially reduces the services.' }] },
      { id: 'accounts', title: 'Accounts and workspaces', blocks: [{ ul: [b('Accurate details.', 'You agree to provide accurate account information and keep it up to date.'), b('Security.', 'You are responsible for keeping credentials safe and for activity that happens under your account.'), b('Administrators.', 'Workspace owners can manage members, roles and settings for their organisation.')] }] },
      { id: 'acceptable-use', title: 'Acceptable use', blocks: [{ p: 'You must not use the services to break the law, infringe the rights of others, send unsolicited messages at scale, or attempt to disrupt or reverse engineer the platform.' }] },
      { id: 'customer-content', title: 'Your content', blocks: [{ p: 'You keep all rights in the content you bring to Lumenfold and the outputs your agents produce. You grant us a limited licence to process that content only to provide the services.' }] },
      { id: 'fees', title: 'Fees and payment', blocks: [{ ol: ['Fees are set out in your order form or plan page.', 'Invoices are due within thirty days unless agreed otherwise.', 'Fees are exclusive of taxes, which you are responsible for.'] }] },
      { id: 'term', title: 'Term and termination', blocks: [{ p: 'These terms continue until your subscription ends. Either party may end them for material breach that is not fixed within thirty days of written notice.' }] },
      { id: 'liability', title: 'Limitation of liability', blocks: [{ p: 'To the extent permitted by law, neither party is liable for indirect or consequential losses, and each party\'s total liability is limited to the fees paid in the twelve months before the claim.' }] },
      { id: 'general', title: 'General', blocks: [{ p: 'These terms are the entire agreement between us about the services. If any part is found unenforceable, the rest remains in effect.' }] },
    ],
  },
  security: {
    title: 'Data Security Policy',
    intro: [
      'This policy describes the measures Lumenfold uses to protect customer data. Lumenfold is a fictional company and this document is placeholder text for demonstration purposes only.',
    ],
    sections: [
      { id: 'principles', title: 'Our security principles', blocks: [{ p: 'We design for least privilege, defence in depth and clear accountability. Every control below has a named owner and is reviewed at least once a year.' }] },
      { id: 'encryption', title: 'Encryption', blocks: [{ ul: [b('In transit.', 'All traffic uses TLS 1.2 or higher, with modern cipher suites only.'), b('At rest.', 'Customer data is encrypted at rest with keys managed in a dedicated key service and rotated regularly.')] }] },
      { id: 'hosting', title: 'Hosting and data residency', blocks: [{ p: 'Workspaces are hosted in the region chosen at creation. Customer content, logs and backups stay within that region.' }] },
      { id: 'access', title: 'Access control', blocks: [{ ul: [b('Single sign-on.', 'Customers can require SSO and enforce multi-factor authentication for every member.'), b('Roles.', 'Granular roles control who can build, approve, run and view agents.'), b('Staff access.', 'Production access is time-limited, approved and logged.')] }] },
      { id: 'monitoring', title: 'Monitoring and incident response', blocks: [{ ol: ['Security events are monitored around the clock.', 'Confirmed incidents are triaged within one hour.', 'Affected customers are notified without undue delay.'] }] },
      { id: 'testing', title: 'Testing and audits', blocks: [{ p: 'Independent penetration tests run at least twice a year, and our controls are audited annually by an external firm.' }] },
      { id: 'vendors', title: 'Vendor management', blocks: [{ p: 'Every sub-processor is reviewed before onboarding and re-assessed each year. A current list is available to customers on request.' }] },
    ],
  },
}
