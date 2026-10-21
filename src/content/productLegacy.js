// Legacy "system B" product pages + one-offs. All original placeholder copy for the fictional brand "Lumenfold".
// Slot lengths/counts follow specs/PAGES_PRODUCT.md (B1–B6, §D). '#word' = indigo span, '~word' = gradient span, { br } = line break.

const P = id => `/assets/photos/pl-${id}.webp`
export const photo = P

/* ---------- Shared ---------- */
export const brands = ['Halcyon', 'Brightwell', 'Corvane', 'Fernpath', 'Gildmark', 'Hollow Oak', 'Ironleaf', 'Juniper Labs', 'Kestrel', 'Lattice', 'Meridian Row', 'Novaline', 'Orchard', 'Pallisade', 'Quillon', 'Redfern', 'Saltmarsh', 'Tessellate', 'Umberline', 'Vantor', 'Wexley', 'Yarrow']

export const footerCta = {
  title: ['Hand off busywork', { br: true }, ' to ', '#a team of agents', ' today'],
  body: 'Start with one agent on one task, watch it work alongside your team for a week, then hand it the rest of the queue when you trust it.',
  primary: 'Start for free', secondary: 'Book a demo', fine: ['No card', 'Free plan included'],
}

export const testimonialGrid = {
  pill: 'Customer love',
  title: ['Hear it from the teams who ', '~hired an agent', ' this past year'],
  items: [
    { quote: 'We switched on the agent for chat on a Tuesday. By Friday it was closing more conversations than our whole night shift used to.', name: 'Rosa Delgado', role: 'Head of Support', company: 'Halcyon', seed: 3, metric: '61% tickets auto-closed' },
    { quote: 'It drafts briefs that my writers actually want to work from. The research is sourced, the structure is sensible and nothing feels generic.', name: 'Kofi Mensah', role: 'Content Lead', company: 'Fernpath', seed: 8 },
    { quote: 'Our reps stopped spending mornings on research. Every account now gets a proper brief before the call, and it shows in the meetings.', name: 'Hannah Okafor', role: 'VP Sales', company: 'Kestrel', seed: 12, metric: '2.4x meetings per rep' },
    { quote: 'Setup took an afternoon. The hardest part was deciding which of our old macros were still worth keeping around.', name: 'Lucas Brandt', role: 'Support Operations', company: 'Novaline', seed: 5 },
    { quote: 'We run forty scheduled agents every night. I open my laptop to finished reports instead of a list of things to chase.', name: 'Aiko Tanaka', role: 'Director of RevOps', company: 'Tessellate', seed: 10 },
    { quote: 'The escalations arrive with a written summary and the customer history attached, so my senior agents never start from zero.', name: 'Marcus Webb', role: 'CX Manager', company: 'Quillon', seed: 15, metric: '9 hrs saved per rep weekly' },
    { quote: 'Our organic traffic climbed for the first time in a year once the agent started refreshing old posts every week.', name: 'Priya Raman', role: 'Growth Marketer', company: 'Saltmarsh', seed: 1 },
  ],
}

/* ---------- B1: LegacyAgentLanding ---------- */
const b1Shared = {
  logoLabel: 'Backing service teams worldwide',
}
export const supportAgent = {
  ...b1Shared,
  hero: { pill: 'Support agent', title: ['Resolve tickets ', '#before they queue'], body: 'A support teammate that answers, routes and closes tickets on every channel.', cta: 'Hire your agent', video: P(0), videoTitle: 'Support agent tour' },
  features: {
    pill: 'How it helps', title: 'Support coverage that never sleeps', body: 'It reads every ticket, drafts replies and escalates edge cases.',
    icons: ['Instant first replies', 'Smart ticket routing', 'Refunds and returns', 'Multilingual answers', 'Sentiment escalation'],
    compare: {
      small: { title: 'Without an agent', rows: ['Tickets wait hours for a first reply', 'Reps copy answers between browser tabs', 'Weekend queues pile up untouched', 'Escalations arrive without any context'] },
      large: { title: 'With Lumenfold', rows: [['Replies in seconds', ' on chat, email and voice'], ['Answers pulled', ' from your live help centre'], ['Queues cleared', ' overnight, every single night'], ['Escalations arrive', ' with a written summary']] },
      mockSmall: 'tickets', mockLarge: 'chat',
    },
  },
  bento: {
    pill: 'Inside the agent', title: 'Built on your knowledge, tuned to your tone of voice', body: 'Connect your tools once and the agent learns how you work.',
    cards: [
      { title: 'Learns your help centre', body: 'Syncs articles, macros and past tickets so every answer stays grounded.', mock: 'kb' },
      { title: 'Speaks like your team', body: 'Set tone, sign-offs and banned phrases, then preview replies before launch.', mock: 'tone', top: true, tone: 'pink' },
      { title: 'Works where you already work', body: 'Plugs into your help desk, CRM and chat tools without a migration project.', mock: 'integrations', wide: true, tone: 'blue', logos: ['Deskly', 'Ticketry', 'Chatwell', 'Ordero', 'Mailroom', 'Voxa'], link: 'See all integrations' },
    ],
  },
  what: {
    title: ['Fewer queues, ', '#happier customers', { br: true }, ' and a team ', '#free to think'], cta: 'Start for free',
    cards: [
      { title: 'Faster first responses', body: 'Customers hear back in seconds rather than hours.', mock: 'chat', tone: 'violet' },
      { title: 'Lower cost per ticket', body: 'Automate the repetitive half of your support queue.', mock: 'chart', tone: 'pink' },
      { title: 'Happier support reps', body: 'Your team spends its time on conversations that matter.', mock: 'tickets', tone: 'blue' },
      { title: 'Insights from every conversation', body: 'Weekly digests spot trends before they turn into fires.' },
    ],
  },
}

export const seoAgent = {
  ...b1Shared,
  logoLabel: 'Backing content teams worldwide',
  hero: { pill: 'Search agent', title: ['Rank higher ', '#while you sleep'], body: 'An agent that researches, writes and refreshes content your buyers search for.', cta: 'Hire your agent', video: P(2), videoTitle: 'Search agent tour' },
  features: {
    pill: 'How it works', title: 'From keyword gap to published page', body: 'Six steps your content team no longer has to babysit.',
    steps: [
      { n: '01', title: ['Find the ', '#gaps', ' your rivals missed'], bullets: ['Scans rival sitemaps and search results each week', 'Ranks gaps by volume, difficulty and buying intent'], tools: ['Crawler', 'Rankr'], mock: 'keywords', cta: 'See keyword research' },
      { n: '02', title: ['Write briefs ', '#worth reading'], bullets: ['Outlines headings, questions and sources in minutes', 'Matches the intent behind every search query'], tools: ['Docsy', 'Notefold'], mock: 'brief', cta: 'Preview a brief' },
      { n: '03', title: ['Draft in ', '#your voice'], bullets: ['Learns tone from your best performing posts', 'Leaves inline notes wherever a human should check'], tools: ['Docsy', 'Pagecraft'], mock: 'draft', cta: 'Read a sample draft' },
      { n: '04', title: ['Optimise ', '#every page'], bullets: ['Checks titles, schema, alt text and reading level', 'Scores each page before it is ever published'], tools: ['Rankr', 'Schemo'], mock: 'score', cta: 'See the checklist' },
      { n: '05', title: ['Link pages ', '#together'], bullets: ['Suggests internal links across your whole library', 'Flags orphaned pages and broken links weekly'], tools: ['Crawler', 'Pagecraft'], mock: 'brief', cta: 'Explore link maps' },
      { n: '06', title: ['Refresh what ', '#slips'], bullets: ['Spots pages losing rank and drafts the update', 'Reports wins to your team every Friday morning'], tools: ['Rankr', 'Mailroom'], mock: 'report', cta: 'View a sample report' },
    ],
    icons: ['Keyword research', 'Content briefs', 'On-brand drafts', 'Technical audits', 'Internal linking', 'Content refreshes'],
    compare: {
      small: { title: 'Without an agent', rows: ['Briefs take writers half a day each', 'Old posts quietly lose their rankings', 'Keyword research lives in spreadsheets', 'Audits happen once a year, if at all'] },
      large: { title: 'With Lumenfold', rows: [['Briefs in minutes', ' with sources and structure'], ['Refreshes drafted', ' the week a page slips'], ['Gaps ranked', ' by intent and difficulty'], ['Audits run weekly', ' across your whole site']] },
      mockSmall: 'keywords', mockLarge: 'report',
    },
  },
  bento: {
    pill: 'Inside the agent', title: 'Grounded in your data, shaped by your brand style guide', body: 'Connect analytics and your CMS once, then review its work.',
    cards: [
      { title: 'Reads your analytics', body: 'Pulls rankings, clicks and conversions so priorities follow real results.', mock: 'report' },
      { title: 'Follows your style guide', body: 'Upload voice rules and banned phrases, then preview every draft first.', mock: 'draft', top: true, tone: 'pink' },
      { title: 'Publishes to your CMS', body: 'Pushes drafts to review queues in the tools your team already uses daily.', mock: 'integrations', wide: true, tone: 'blue', logos: ['Pagecraft', 'Rankr', 'Docsy', 'Schemo', 'Notefold', 'Crawler'], link: 'See all integrations' },
    ],
  },
  what: {
    title: ['More traffic, ', '#better pages', { br: true }, ' and writers ', '#free to create'], cta: 'Start for free',
    cards: [
      { title: 'More pages ranking', body: 'Cover every gap your buyers are searching for.', mock: 'keywords', tone: 'violet' },
      { title: 'Briefs in minutes', body: 'Writers start from structure rather than a blank page.', mock: 'brief', tone: 'pink' },
      { title: 'Content that stays fresh', body: 'Slipping pages get an update the week they drop.', mock: 'report', tone: 'blue' },
      { title: 'Reports your team reads', body: 'A Friday summary of wins, losses and next moves.' },
    ],
  },
}

/* ---------- B2: LegacySDRLanding ---------- */
const sdrShared = {
  marqueeLabel: '',
  roi: {
    title: ['Your next rep ', '#works', ' every hour of every single day'],
    body: 'Averages from the first ninety days of live customer pilots',
    stats: [['3.4x', 'more meetings booked'], ['92%', 'leads answered in minutes'], ['11', 'hours saved per rep'], ['48%', 'higher reply rates'], ['$1.8M', 'pipeline added per quarter']],
  },
  beforeAfter: [
    ['Leads wait until Monday for a reply', 'Every lead answered in minutes'],
    ['Reps research accounts for hours each morning', 'Briefs ready before every call'],
    ['Follow-ups slip when the week gets busy', 'Sequences that never miss a beat'],
  ],
  caseStudy: { title: ['Kestrel grew its outbound pipeline by a third ', '#without adding a rep', ' ', '#again'], cta: 'Read the full story', img: P(180) },
  features: {
    pill: 'What it does', title: ['Prospecting, ', '#handled'], body: 'Research, outreach and follow-up run in the background while your reps sell.',
    items: [
      { title: 'Account research', body: 'Builds a one-page brief on every account from public signals.' },
      { title: 'Personal outreach', body: 'Writes first lines that reference something real about each buyer.' },
      { title: 'Smart follow-ups', body: 'Times each nudge around opens, replies and calendar gaps.' },
      { title: 'Meeting booking', body: 'Offers slots, handles reschedules and logs everything to your CRM.' },
    ],
  },
  how: {
    pill: 'How it works', title: 'Four steps, zero babysitting', body: 'Set it up once and review results.',
    steps: [
      { label: 'Lead captured', body: 'A form fill, a reply or a new account in your list wakes the agent up.' },
      { label: 'Account researched', body: 'It reads the company site, recent news and your CRM history, then writes a short brief.' },
      { label: 'Outreach sent', body: 'A personal email goes out within minutes, followed by timed nudges if nobody replies.' },
      { label: 'Meeting booked', body: 'Interested buyers pick a slot, and the rep gets the brief, the thread and the calendar invite.' },
    ],
  },
  team: {
    title: 'A teammate, not a tool', body: 'It slots into the way your sales team already works, from CRM to calendar.',
    cards: [
      { title: 'Works inside the tools you already use', points: ['Logs every touch to your CRM', 'Books straight into rep calendars', 'Posts daily summaries to team chat', 'Respects your existing territories'], mock: 'pipeline' },
      { title: 'Stays on brand and on message', points: ['Learns from your best performing emails', 'Follows your rules on tone and claims', 'Hands sensitive replies to a human', 'Never emails the same person twice'], mock: 'email' },
    ],
  },
  timeline: {
    pill: 'Getting started', title: ['Live in a week, ', '#not a quarter'], body: 'Most teams go from first call to first booked meeting in five working days.',
    rows: [['Connect tools', 'CRM, inbox and calendar in an afternoon'], ['Set guardrails', 'Tone, territories and hand-off rules'], ['Shadow mode', 'Review every draft before it sends'], ['Go live', 'Turn on sending and watch meetings land']],
  },
}
export const inbound = {
  ...sdrShared,
  hero: { pill: 'Inbound agent', title: ['Inbound, ', '#answered instantly'], body: 'Every demo request, chat and form fill gets a personal reply within minutes.', cta: 'Hire your agent', video: P(3), videoTitle: 'Inbound agent walkthrough' },
}
export const outbound = {
  ...sdrShared,
  hero: { pill: 'Outbound agent', title: ['Outbound, ', '#without the grind'], body: 'Research, personal outreach and follow-ups that run while your reps are selling.', cta: 'Hire your agent', video: P(4), videoTitle: 'Outbound agent walkthrough' },
}

/* ---------- B3: /schedule-work ---------- */
export const scheduleWork = {
  hero: { pill: 'Scheduled runs', title: 'Put recurring work on a schedule and stop chasing it', body: 'Choose a time, pick an agent and get finished work delivered to your inbox, channel or CRM on repeat.', primary: 'Start for free', secondary: 'Book a demo' },
  row1: { pill: 'How it works', title: 'Pick a time, pick an agent, done', body: 'Daily, weekly or on a custom rule. Each run uses fresh data, follows the same steps and posts results wherever your team already looks for them.', img: P(5) },
  row2: { title: 'Every run is logged so nothing slips quietly', body: 'See what ran, what it found and what it changed. Failed runs retry automatically and alert the owner, so silent breakages stop being a thing.', img: P(6) },
  bento: {
    pill: 'Features', title: ['Everything you need to ', '#run work on repeat'],
    tiles: [
      { title: 'Flexible timing', body: 'Run hourly, daily, weekly or on a custom rule, in any time zone, with blackout windows for weekends and holidays.', mock: 'calendar' },
      { title: 'Fresh inputs', body: 'Each run pulls the latest records from your tools, so reports never go stale and nothing is copied by hand.', mock: 'kb' },
      { title: 'Smart retries', body: 'Failed steps retry with backoff, then notify the owner with the error and a suggested fix if they still fail.', mock: 'tickets' },
      { title: 'Run history', body: 'Every run keeps its inputs, outputs and steps, so you can audit or replay any of them in a single click.', mock: 'chart' },
      { title: 'Delivery anywhere', body: 'Send results to email, team chat, a spreadsheet or straight into the record that triggered the work in the first place.', mock: 'email' },
      { title: 'Cost controls', body: 'Set a budget per schedule and get a heads-up before any run would push the month past its limit.', mock: 'report' },
    ],
  },
  faq: {
    title: 'Questions', body: 'Still curious about scheduled runs?', link: 'Read the full FAQ',
    items: [
      { q: 'How often can a scheduled agent run?', a: 'As often as every fifteen minutes, or as rarely as once a quarter. You can combine rules, for example weekdays at nine plus the last Friday of each month, and pause any schedule without losing its history.' },
      { q: 'What happens if a scheduled run fails?', a: 'Failed steps retry with increasing delays. If a run still fails, the owner gets a message with the error, the step that broke and a link to replay it once the issue is fixed.' },
      { q: 'Can scheduled runs use live data from my tools?', a: 'Yes. Each run fetches fresh records from your connected tools at the moment it starts, so the output always reflects the current state rather than a stale copy from setup day.' },
      { q: 'Do schedules respect time zones and holidays?', a: 'Every schedule has its own time zone and optional blackout dates. Runs that land in a blackout window either skip or move to the next working slot, whichever you prefer.' },
    ],
  },
  products: {
    pill: 'Explore', title: ['Build ', '#with Lumenfold', ' in the way that suits you'], body: 'Three ways to put agents to work across your team.',
    items: [
      { title: 'Workforce', tint: ['#3eddbe', '#00ff4c'], to: '/workforce' },
      { title: 'Agent teams', tint: ['#fee17b', '#00f0ff'], to: '/multi-agents' },
      { title: 'Single agents', tint: ['#3eddbe', '#00f0ff'], to: '/agents' },
    ],
  },
  next: {
    title: 'Ready to put your first schedule live?',
    items: [{ title: 'Read the scheduling guide', cta: 'Open docs', to: '/learn' }, { title: 'Browse ready-made templates', cta: 'See templates', to: '/workflows' }, { title: 'Talk to our team', cta: 'Book a call', to: '/book-a-demo' }],
  },
  customers: {
    pill: 'Customers', title: 'Real results',
    items: [
      { company: 'Tessellate', title: 'Tessellate runs forty nightly reports without a single analyst on call', cta: 'Read story', img: P(7) },
      { company: 'Wexley', title: 'Wexley refreshes every account brief before the Monday pipeline review', cta: 'Read story', img: P(8) },
      { company: 'Orchard', title: 'Orchard turned a weekly spreadsheet chore into a two-minute read', cta: 'Read story', img: P(9) },
    ],
  },
  logoLabel: 'Running on schedule for teams at',
}

/* ---------- B4: LegacyUseCase ---------- */
const ucShared = {
  logoLabel: 'Teams in retail, software and finance already run their busiest workflows on Lumenfold',
}
export const forCx = {
  ...ucShared,
  hero: { tag: 'For CX teams', title: 'Customer experience that scales itself', body: 'Give every customer a fast, accurate and friendly answer at any hour. Lumenfold agents handle the repeat questions, prepare the hard ones for your team and learn from every conversation along the way.', primary: 'Book a demo', secondary: 'Start free', mock: 'chat' },
  values: {
    title: ['Service that feels ', '#personal again'], body: 'Agents take the volume so your people can take the moments that build loyalty for years.',
    center: 'Three ways CX teams use Lumenfold every day',
    cards: [
      { title: 'Answer the repeat questions instantly', mock: 'chat', tone: 'violet' },
      { title: 'Prepare the hard cases for your team', mock: 'tickets', tone: 'pink' },
      { title: 'Spot trends across every single channel', mock: 'chart', tone: 'blue' },
    ],
  },
  tabs: {
    title: 'See it work',
    items: [
      { title: 'Triage every incoming ticket', body: 'The agent reads each ticket, tags the topic and urgency, then routes it to the right queue or answers it directly when the help centre already covers it.', checks: ['Tags topic, urgency and sentiment', 'Routes to the right queue in seconds'], mock: 'tickets' },
      { title: 'Draft replies your team approves', body: 'For trickier cases the agent drafts a reply with sources, so your reps review and send rather than write from scratch every time.', checks: ['Sources linked inside every draft', 'One click to edit, approve or reject'], mock: 'email' },
      { title: 'Close the loop with weekly insights', body: 'Every Friday the agent summarises what customers asked about, which articles failed them and where a product fix would remove tickets altogether.', checks: ['Top themes ranked by volume', 'Article gaps flagged for writers'], mock: 'report' },
    ],
  },
  testimonial: { quote: 'Our response times dropped from a day to a few minutes, and our CSAT went up the same month. The team finally has room to breathe and do the human work.', name: 'Elena Varga', role: 'VP Customer Experience, Brightwell', seed: 9 },
  all: {
    title: 'Everything your CX team needs', body: 'One platform for answering, routing, reporting and improving every customer conversation across channels and languages.',
    items: [['Omnichannel', 'Chat, email, voice and social from one agent.'], ['Routing', 'Send every ticket to the right person first time.'], ['Knowledge sync', 'Answers stay current as your articles change.'], ['Languages', 'Reply in more than forty languages without extra hires.'], ['Approvals', 'Keep a human in the loop for refunds and credits.'], ['Analytics', 'See resolution, CSAT and cost per ticket live.'], ['Escalation', 'Hand off with a full summary and history attached.'], ['Security', 'Role-based access, audit logs and data residency.']],
  },
  team: {
    title: ['Your team, ', '#with more room to do great work'],
    checks: ['Fewer repetitive tickets in every queue', 'More time for complex customer moments', 'Clear visibility into what agents handled'],
    plus: ['Shared inbox views', 'Custom handoff rules', 'Weekly digest emails', 'Per-channel tone settings', 'Holiday coverage plans'],
    img: P(20),
  },
}
export const forMr = {
  ...ucShared,
  hero: { tag: 'For research teams', title: 'Market research in hours, not weeks', body: 'Lumenfold agents gather sources, read the reports nobody has time for and turn them into briefs your team can act on. Every claim is cited, every source is saved and every brief is ready before the meeting starts.', primary: 'Book a demo', secondary: 'Start free', mock: 'research' },
  values: {
    title: ['Answers backed by ', '#real sources'], body: 'Agents read widely and cite everything, so your team can trust the brief and move faster.',
    center: 'Three ways research teams use Lumenfold every day',
    cards: [
      { title: 'Size a new market before lunch', mock: 'research', tone: 'violet' },
      { title: 'Track every rival launch and price change', mock: 'tickets', tone: 'pink' },
      { title: 'Turn customer interviews into clear themes', mock: 'chart', tone: 'blue' },
    ],
  },
  tabs: {
    title: 'See it work',
    items: [
      { title: 'Gather sources at scale', body: 'Point the agent at a question and it collects analyst notes, filings, surveys and forum threads, then ranks them by relevance and reliability.', checks: ['Hundreds of sources read per brief', 'Every source saved with a citation'], mock: 'research' },
      { title: 'Summarise into a clear brief', body: 'The agent writes a structured brief with key numbers, open questions and a short list of what to dig into next, so meetings start with the answers.', checks: ['Numbers pulled with their sources', 'Open questions listed for follow-up'], mock: 'brief' },
      { title: 'Watch rivals around the clock', body: 'Scheduled runs track competitor pages, pricing and job posts, and post a short digest to your channel whenever something important changes.', checks: ['Price and feature changes flagged', 'Digest posted to your team channel'], mock: 'calendar' },
    ],
  },
  caseStudy: { title: 'How Meridian Row moves faster', logos: ['Meridian Row', 'Lattice'], img: P(48), body: 'Meridian Row cut its competitive research cycle from three weeks to two days by giving each analyst a research agent.' },
  testimonial: { quote: 'We used to spend the first week of every project just collecting sources. Now the brief is waiting for us on day one, with citations we can actually check.', name: 'Tomas Lindqvist', role: 'Head of Insights, Meridian Row', seed: 14 },
  all: {
    title: 'Everything your insights team needs', body: 'One platform for gathering, reading, citing and sharing research, with every source kept and every claim traceable back.',
    items: [['Web research', 'Read thousands of pages and keep what matters.'], ['Citations', 'Every claim links back to its original source.'], ['Monitoring', 'Track rivals, prices and launches on a schedule.'], ['Interviews', 'Turn call transcripts into themes and quotes.'], ['Briefs', 'Structured summaries ready before the meeting.'], ['Datasets', 'Export tables to your sheets or warehouse.'], ['Sharing', 'Post findings to your team channel automatically.'], ['Security', 'Private workspaces with audit trails for every run.']],
  },
  team: {
    title: ['Your analysts, ', '#with more time for insight'],
    checks: ['Less time collecting and formatting sources', 'More time on interpretation and advice', 'A shared library of every brief produced'],
    plus: ['Source reliability scores', 'Custom brief templates', 'Scheduled competitor digests', 'Transcript tagging', 'Export to slides'],
    img: P(60),
  },
}

/* ---------- B5: /ai-ops ---------- */
export const aiOps = {
  hero: { pill: 'Lumenfold for ops', title: ['Ops, ', '#minus toil'], body: 'Agents that take the repetitive operations work off your plate, quietly and reliably.', cta: 'Start for free', secondary: 'Book a demo', video: P(201), videoTitle: 'Operations agents overview' },
  customers: {
    pill: 'Customers', title: 'Ops teams that let go',
    items: [
      { company: 'Ironleaf', title: 'Ironleaf reconciles twelve thousand invoices a month with two people', cta: 'Read story', img: P(370) },
      { company: 'Vantor', title: 'Vantor onboards new suppliers in a day instead of a fortnight', cta: 'Read story', img: P(445) },
      { company: 'Redfern', title: 'Redfern closes its books four days faster every single month', cta: 'Read story', img: P(5) },
    ],
  },
  stack: {
    title: 'Three ways ops teams hand off work',
    items: [
      { n: '01', title: ['Clear the ', '#inbox'], bullets: ['Reads, sorts and answers routine requests', 'Escalates anything unusual with a summary'], tools: ['Mailroom', 'Ticketry'], mock: 'tickets', cta: 'See inbox agents' },
      { n: '02', title: ['Reconcile the ', '#numbers'], bullets: ['Matches invoices, orders and payments daily', 'Flags mismatches for a human to approve'], tools: ['Ledgerly', 'Sheetwise'], mock: 'chart', cta: 'See finance agents' },
      { n: '03', title: ['Report on ', '#autopilot'], bullets: ['Builds the weekly ops pack from live data', 'Posts it to your channel every Monday'], tools: ['Sheetwise', 'Chatwell'], mock: 'report', cta: 'See reporting agents' },
    ],
  },
  slider: {
    title: 'Start from a template',
    slides: [
      { title: 'Invoice matcher', body: 'Matches invoices to purchase orders and flags anything that does not add up.', bg: '#cec1ff' },
      { title: 'Vendor onboarding', body: 'Collects documents, checks details and sets new suppliers up in your systems.', bg: '#ffe4c5' },
      { title: 'Weekly ops pack', body: 'Pulls live numbers into a clean summary and posts it before Monday stand-up.', bg: '#dbe5ff' },
      { title: 'Request triage', body: 'Sorts every internal request, answers the routine ones and routes the rest.', bg: '#ecdcff' },
    ],
  },
  keyFeatures: [
    { title: 'Any trigger', body: 'Start runs from email, forms, schedules, webhooks or a message in team chat.', mock: 'calendar' },
    { title: 'Human approvals', body: 'Pause for sign-off on payments, credits or anything above a threshold you set.', mock: 'tickets' },
    { title: 'Full audit trail', body: 'Every step, input and output is logged and searchable for as long as you need.', mock: 'kb' },
    { title: 'Works with your stack', body: 'Connect spreadsheets, finance tools, help desks and databases in minutes.', mock: 'flow' },
  ],
  scale: {
    a: 'Scale up', b: 'Give every ops lead a team of agents for', rotate: ['invoices', 'onboarding', 'reporting', 'requests'],
    img: P(9),
    items: ['Reconcile payments daily', 'Onboard suppliers faster', 'Answer internal requests', 'Build the weekly pack', 'Chase missing documents', 'Audit every change made'],
  },
  press: [
    { title: 'Why ops teams are first to adopt agents', outlet: 'Halcyon Weekly', img: P(0) },
    { title: 'The quiet automation boom in back offices', outlet: 'Novaline Review', img: P(2) },
    { title: 'Agents that close the books faster', outlet: 'Kestrel Business', img: P(3) },
    { title: 'Five companies running ops on agents', outlet: 'Gildmark Daily', img: P(4) },
    { title: 'From spreadsheets to scheduled agents', outlet: 'Tessellate Tech', img: P(6) },
    { title: 'What a two-person finance team can do', outlet: 'Wexley Journal', img: P(7) },
    { title: 'Inside an always-on operations desk', outlet: 'Quillon Times', img: P(8) },
    { title: 'The new shape of the ops function', outlet: 'Yarrow Insider', img: P(20) },
  ],
  faq: {
    title: 'Questions', body: 'Wondering how ops agents work?', link: 'Read the full FAQ',
    items: [
      { q: 'Which operations tasks suit agents best?', a: 'Anything repetitive with clear rules: matching invoices, answering routine requests, chasing documents and building recurring reports. Judgement calls stay with your team through approvals.' },
      { q: 'Can agents approve payments on their own?', a: 'Only if you let them. Most teams set a threshold so agents prepare everything and a human approves anything above it with a single click.' },
      { q: 'How do agents connect to our finance tools?', a: 'Through built-in integrations, secure API keys or a database connection. Each agent only sees the data its role needs, and every access is logged.' },
      { q: 'What happens when an agent is unsure?', a: 'It stops and asks. The request lands in the owner’s queue with the context, the options it considered and a recommendation, so a decision takes seconds.' },
    ],
  },
  awards: {
    title: 'Recognised by operators and analysts',
    items: [['Halcyon', 'Leader in ops automation'], ['Gildmark', 'Top fifty AI tools'], ['Juniper Labs', 'Best new platform 2026'], ['Umberline', 'High performer, spring']],
  },
  statement: { pill: 'Our promise', title: 'Less toil. More ops.' },
}

/* ---------- B6 ---------- */
export const apiPage = {
  hero: { pill: 'Developer API', title: ['Agents, ', '#one call away'], body: 'Trigger any agent, stream its steps and read the results from your own product.', cta: 'Get an API key', ctaTo: '/pricing', secondary: 'Read the docs', secondaryTo: '/learn' },
  bento: {
    pill: 'Build with us', title: ['Ship agents ', '#in your product'],
    cards: [
      { title: 'One endpoint to run any agent', body: 'Send an input, get a run ID back and wait or poll for the result.', mock: 'code', tone: 'violet' },
      { title: 'Stream every step', body: 'Watch tool calls and drafts arrive live over server-sent events.', mock: 'flow', tone: 'pink' },
      { title: 'Webhooks for finished runs', body: 'Get notified the moment a run completes, fails or needs a human approval.', mock: 'tickets', tone: 'blue' },
      { title: 'Usage and cost per key', body: 'Track runs, latency and spend for every key and every environment.', mock: 'chart', tone: 'violet' },
    ],
  },
}

export const multiAgents = {
  hero: { pill: 'Agent teams', title: ['Agent teams ', '#that work together'], body: 'Give a lead agent a goal and it hands each part to a specialist, checks their work and reports back to you.', primary: 'Build a team', secondary: 'Book a demo', video: P(445), videoTitle: 'Agent teams in action' },
  templates: {
    tabs: ['Sales', 'Support', 'Marketing', 'Operations'],
    sets: {
      Sales: [['Account research team', 'Researches each account, finds the buyer and drafts a first email for the rep to send.', 'Outbound'], ['Deal desk crew', 'Prepares quotes, checks discount rules and routes approvals to the right manager quickly.', 'Pricing'], ['Renewal watch team', 'Monitors usage signals, flags at-risk accounts and drafts a save plan for each one.', 'Retention'], ['Meeting prep pair', 'Builds a one-page brief and agenda before every scheduled call on the calendar.', 'Prep'], ['Lead scoring squad', 'Scores new leads on fit and intent, then routes the best ones to reps within minutes.', 'Inbound'], ['CRM hygiene team', 'Merges duplicates, fills missing fields and fixes stale stages across your CRM weekly.', 'Data']],
      Support: [['Ticket triage team', 'Tags, prioritises and routes every incoming ticket, answering the simple ones on sight.', 'Triage'], ['Refund review pair', 'Checks refund requests against policy and prepares approvals for a human to confirm.', 'Billing'], ['Help centre crew', 'Finds article gaps from recent tickets and drafts new pages for your writers to review.', 'Content'], ['Escalation squad', 'Summarises complex cases with full history so senior reps can act straight away.', 'Escalation'], ['Voice of customer team', 'Turns a week of conversations into themes, quotes and suggested product fixes.', 'Insights'], ['Language desk', 'Replies in the customer’s language and keeps tone consistent across every channel.', 'Global']],
      Marketing: [['Content engine', 'Researches, briefs, drafts and optimises posts, then queues them for editor review.', 'Content'], ['Launch crew', 'Prepares launch copy, social posts and emails from a single product brief document.', 'Launch'], ['Search refresh team', 'Finds slipping pages and drafts updates the same week rankings begin to drop.', 'SEO'], ['Event follow-up pair', 'Sends personal follow-ups to every attendee within an hour of the event ending.', 'Events'], ['Competitor watch', 'Tracks rival pages, pricing and launches, then posts a short digest every Monday.', 'Intel'], ['Campaign reporter', 'Pulls campaign numbers from every channel into one clean weekly summary report.', 'Reporting']],
      Operations: [['Invoice matching team', 'Matches invoices to orders, flags mismatches and prepares approvals for finance.', 'Finance'], ['Vendor onboarding crew', 'Collects documents, checks details and sets up new suppliers across your systems.', 'Procurement'], ['Request desk', 'Answers routine internal requests and routes the rest to the right owner fast.', 'Internal'], ['Weekly ops pack', 'Builds the Monday operations summary from live data and posts it to your channel.', 'Reporting'], ['Access review pair', 'Checks who has access to what each quarter and drafts removals for approval.', 'Security'], ['Inventory watch', 'Monitors stock levels and drafts purchase orders before anything runs out.', 'Supply']],
    },
  },
  patterns: {
    tabs: ['Lead and specialists', 'Review loop', 'Parallel research'],
  },
  bento: {
    pill: 'Why teams', title: 'Better together',
    body: 'Split big goals into small jobs that specialists do well.',
    cards: [
      { title: 'A lead that plans', body: 'Breaks a goal into steps and assigns each one to the right specialist agent.', mock: 'team' },
      { title: 'Specialists that focus', body: 'Each agent has its own tools, knowledge and instructions for one kind of job.', mock: 'flow', tone: 'pink' },
      { title: 'Reviews built in', body: 'A reviewer agent checks work against your rules before anything reaches a customer.', mock: 'score', tone: 'blue' },
      { title: 'Shared memory between agents', body: 'Agents pass notes, sources and drafts along so nothing gets lost between steps.', mock: 'kb', top: true },
      { title: 'You stay in charge', body: 'Approve plans, pause runs and see every hand-off between agents in one clear timeline.', mock: 'integrations', wide: true, tone: 'blue', logos: ['Chatwell', 'Deskly', 'Ledgerly', 'Docsy', 'Rankr', 'Mailroom'], link: 'See all integrations' },
    ],
  },
}

/* ---------- D1 /self-driving-gtm ---------- */
export const sdg = {
  hero: { title: 'Your go-to-market should drive itself, one level at a time', lead: 'A practical map for moving revenue work from manual to fully autonomous, with clear checkpoints and no leap of faith required.' },
  levels: [
    { n: 'L1', name: 'Assisted', where: 'Copilot', sub: 'You drive, agents suggest', body: 'Agents draft emails, briefs and notes on request. Every action is still taken by a person.', unlock: 'Trust in the drafts', example: 'A rep asks for an account brief before a call and edits it.', note: 'Most teams start here within a day.' },
    { n: 'L2', name: 'Delegated', where: 'Task', sub: 'Agents own single tasks', body: 'Agents complete whole tasks such as research or follow-ups, and a person approves the result.', unlock: 'Clear approval rules', example: 'Follow-ups are drafted overnight and approved with one click.', note: 'Approval rates above ninety percent signal readiness.' },
    { n: 'L3', name: 'Supervised', where: 'Workflow', sub: 'Agents run workflows', body: 'Agents run multi-step workflows end to end. People review samples and handle exceptions.', unlock: 'Evals and exception routing', example: 'Inbound leads are researched, scored and booked without a human.', note: 'Exceptions should fall below five percent first.' },
    { n: 'L4', name: 'Autonomous', where: 'Function', sub: 'Agents run the motion', body: 'Agent teams run a whole motion against goals. People set strategy and review outcomes weekly.', unlock: 'Goal metrics and guardrails', example: 'A pipeline team works every account in territory against a quarterly target.', note: 'Few teams are here yet. The map shows the way.' },
  ],
  useCases: ['Inbound', 'Outbound', 'Renewals', 'Expansion'],
  trustLabel: 'Mapped with revenue teams at',
  framework: { title: 'The four levels', lead: 'Each level hands a little more of the work to agents, and each one has a clear signal that you are ready for the next.' },
  timeline: [
    { t: 'Week 1', d: 'Turn on assisted drafting for one team' },
    { t: 'Month 1', d: 'Delegate research and follow-ups with approvals' },
    { t: 'Quarter 1', d: 'Run inbound end to end with sampled review' },
    { t: 'Year 1', d: 'Give an agent team a pipeline target' },
  ],
  dims: {
    title: 'What changes at each level', lead: 'Six dimensions move together as autonomy grows. Skipping one is where most rollouts stall.',
    items: [
      { title: 'Speed to lead', sub: 'How fast a new lead hears back', l1: 'Next business day', l4: 'Under two minutes', cost: 'Slow replies lose deals' },
      { title: 'Research depth', sub: 'What a rep knows before a call', l1: 'A quick search', l4: 'A sourced one-page brief', cost: 'Generic calls stall early' },
      { title: 'Follow-up rate', sub: 'Share of leads with a timely nudge', l1: 'About half', l4: 'Every single lead', cost: 'Silent leads go cold' },
      { title: 'Data quality', sub: 'How clean the CRM stays over time', l1: 'Cleaned each quarter', l4: 'Fixed every night', cost: 'Bad data skews forecasts' },
      { title: 'Rep focus', sub: 'Time spent actually selling', l1: 'About a third', l4: 'Most of the week', cost: 'Admin eats selling time' },
      { title: 'Learning loop', sub: 'How fast the playbook improves', l1: 'Annual review', l4: 'Weekly evals', cost: 'Playbooks drift unseen' },
    ],
  },
  industry: {
    title: 'Where the industry is', lead: 'Across the revenue teams we studied, most sit between assisted and delegated. A small group already runs supervised workflows.',
    caption: 'Half of the teams surveyed operate between L1 and L2',
    stats: [['62%', 'of teams use agents for drafting but approve every action', 'Lumenfold field survey, 2026'], ['4.1x', 'faster speed to lead once inbound runs supervised', 'Customer pilot data, n=38'], ['9%', 'of teams have given an agent team a pipeline target', 'Lumenfold field survey, 2026']],
  },
  customer: {
    title: 'From L1 to L3 in one quarter', body: 'Juniper Labs started with assisted drafting for six reps. Twelve weeks later its inbound motion runs end to end, with a person reviewing a daily sample and handling the rare exception.',
    quote: 'We did not flip a switch. We climbed one level at a time, and each step paid for the next.', cite: 'Noor Haddad, CRO at Juniper Labs', link: 'Read the full story',
    radar: ['Speed', 'Research', 'Follow-up', 'Data', 'Focus', 'Learning'], before: [0.3, 0.35, 0.45, 0.4, 0.3, 0.25], after: [0.9, 0.8, 0.95, 0.75, 0.7, 0.8],
  },
  final: { title: 'Find your level, then climb', label: 'In a 30-minute session we will', rows: ['Place each of your motions on the map', 'Pick the one ready to move up a level', 'Set the signal that proves it worked', 'Leave with a plan for the next quarter'], cta: 'Book a mapping session', clarifier: 'Free for revenue teams of any size.' },
}

/* ---------- D2 /specialist-agents ---------- */
export const specialist = {
  title: 'Why narrow agents beat one generalist at work',
  lede: 'Teams that split work across small, focused agents get more reliable results than teams that ask one large agent to do everything. This piece explains why, with the patterns we see across thousands of production runs.',
  quotes: [
    ['A focused agent with three tools fails less often than a general agent with thirty, and its failures are far easier to spot.', 'Lumenfold reliability notes', '#'],
    ['Breaking one long instruction into four short ones made our reviews faster and our outputs noticeably more consistent.', 'Ops lead, Ironleaf', '#'],
    ['Specialists let us change one step without retesting everything else, which made shipping improvements weekly possible.', 'Platform team, Vantor', '#'],
    ['The handoff note between agents turned out to be the most important artefact in the whole system.', 'Lumenfold field guide', '#'],
  ],
  stats: [['3.2x', 'fewer failed runs when work is split across specialist agents', 'Internal run data, 2026'], ['41%', 'shorter review time per output for focused agents', 'Customer survey, n=212'], ['6 of 10', 'teams add a reviewer agent within their first month', 'Workspace analytics']],
}

/* ---------- D3 /bdr-agent-waiting-list ---------- */
export const bdrWaitlist = {
  title: 'Join the waitlist for our new prospecting agent',
  body: 'Be first to try an agent that researches accounts, writes outreach and books meetings for your team.',
  bullets: ['Early access before the public launch', 'A guided setup session with our team', 'Founding pricing locked in for your first full year', 'A direct line to the product team for feedback'],
  fields: [['First name', 'text', 'first'], ['Last name', 'text', 'last'], ['Work email', 'email', 'email'], ['Company', 'text', 'company'], ['Job title', 'text', 'role'], ['Sales team size', 'select', 'size']],
  sizes: ['1–5', '6–20', '21–50', '51–200', '200+'],
  consent: 'I agree to receive product updates and launch news from Lumenfold.',
  submit: 'Join the waitlist',
  success: 'You are on the list. Watch your inbox.',
  error: 'Please fill in every field before you submit.',
  logoLabel: 'Sales teams at these companies are already on the early access list',
}

/* ---------- D4 /agent-drop ---------- */
export const agentDrop = {
  hero: { title: 'Agent Drop', body: 'Four launches in four days. New agents, new tools and a few surprises along the way.', cta: 'See the launches' },
  launches: {
    pill: 'This season', title: 'Everything we shipped for teams who run on agents', body: 'A week of launches built around one idea: agents should be easy to start, safe to trust and simple to scale. Here is what landed, day by day, with demos you can try right now.',
    cards: [
      { day: 'Day 1', title: 'Build an agent by describing the job in plain words', body: 'Tell Lumenfold what the job is and who it is for. It drafts the instructions, picks the tools and runs a test so you can see it work before you ship anything at all.', link: 'Try the builder', tone: 'violet', mock: 'flow' },
      { day: 'Day 2', title: 'Approvals that fit the way your team works', body: 'Set rules for what agents can do alone and what needs a person. Approvals land in your inbox or team chat with the context needed to decide in seconds rather than minutes.', link: 'See approvals', tone: 'pink', mock: 'tickets' },
      { day: 'Day 3', title: 'Evals that tell you when an agent is ready', body: 'Write a few test cases, run them on every change and watch the score. Ship when it passes, roll back when it slips, and keep a record of every version you ever tried out.', link: 'Explore evals', tone: 'blue', mock: 'score' },
      { day: 'Day 4', title: 'Agent teams that split the work for you', body: 'Give a lead agent a goal and it plans the work, hands each part to a specialist and checks the results before anything reaches your customers or your team channel at all.', link: 'Meet agent teams', tone: 'violet', mock: 'team' },
    ],
  },
  teaser: { title: 'A look behind the drop', body: 'How a small team planned, built and shipped four launches in a single week, and what we learned about our own agents along the way.', img: P(370) },
  videos: [
    { title: 'Keynote: the season in twelve minutes', img: P(0) },
    { title: 'Building an agent from one sentence', img: P(2) },
    { title: 'Approvals in practice', img: P(3) },
    { title: 'Writing your first eval', img: P(4) },
    { title: 'A lead agent and its specialists', img: P(5) },
  ],
  demo: { title: 'Ask for an agent', chips: ['Research every new lead', 'Summarise support tickets weekly', 'Draft renewal reminders', 'Match invoices to orders'] },
  testimonial: { quote: 'We built three agents during the launch week livestream and two of them are still running in production today.', name: 'Ines Carvalho', role: 'Ops Lead, Corvane', seed: 6 },
}

/* ---------- D5 /agents-at-work ---------- */
export const agentsAtWork = {
  hero: { title: 'A day of talks from teams putting agents to work', cta: 'Watch the sessions', poster: P(180), logos: ['Halcyon', 'Kestrel', 'Novaline', 'Wexley'] },
  watch: { title: 'Watch it on demand', featured: { title: 'Opening keynote', img: P(201) }, side: [{ title: 'Panel: agents in the back office', img: P(6) }, { title: 'Fireside: a year of agent teams', img: P(7) }] },
  speakers: [
    ['Amara Osei', 'Head of Support, Halcyon'], ['Ben Hartley', 'VP Sales, Kestrel'], ['Chloe Martin', 'RevOps Lead, Novaline'], ['Diego Alvarez', 'CTO, Wexley'],
    ['Esme Laurent', 'Content Director, Fernpath'], ['Farid Kazemi', 'Ops Manager, Ironleaf'], ['Grace Liu', 'Head of Insights, Meridian Row'], ['Henrik Sorensen', 'CX Director, Brightwell'],
    ['Isla Murray', 'Growth Lead, Saltmarsh'], ['Jamal Price', 'Finance Lead, Redfern'], ['Keiko Ito', 'Product Lead, Lumenfold'], ['Leon Fischer', 'Engineer, Lumenfold'],
    ['Maya Brooks', 'Founder, Yarrow'], ['Nikhil Rao', 'Platform Lead, Vantor'],
  ],
  sliders: [
    { title: 'Keynotes', slides: ['The state of agents at work', 'From copilots to colleagues', 'What we learned from a million runs', 'Designing for trust', 'The road to autonomy', 'Where agents go next'] },
    { title: 'Workshops', slides: ['Build your first agent', 'Writing evals that matter', 'Approvals without friction', 'Agent teams, hands on', 'Connecting your tools', 'Scheduling recurring work'] },
    { title: 'Customer panels', slides: ['Support teams at scale', 'Sales without the grind', 'Ops in the background', 'Research in hours', 'Marketing that stays fresh'] },
  ],
  sessions: [
    'How Halcyon cleared its support backlog', 'Inside Kestrel’s outbound agent team', 'Novaline’s nightly reporting stack', 'Shipping agents safely at Wexley',
    'Fernpath’s content engine, step by step', 'Ironleaf and the two-person finance desk', 'Meridian Row on research at speed', 'Brightwell’s CX playbook',
    'Saltmarsh grows organic traffic again', 'Redfern closes the books faster', 'Building evals with the Lumenfold team', 'Yarrow’s first year with agents',
  ],
  faq: {
    title: 'Questions', body: 'About the event and recordings?', link: 'Contact the events team',
    items: [
      { q: 'Are all the sessions free to watch?', a: 'Yes. Every keynote, panel and workshop is free to stream on demand. Some workshops ask for an email so we can send the follow-along materials.' },
      { q: 'Can I share recordings with my team?', a: 'Please do. Each session has its own link, and the workshops include templates you can copy straight into your own workspace.' },
      { q: 'Will there be another event this year?', a: 'We run a session day every season. Join the mailing list on this page and you will hear about the next one first.' },
      { q: 'Can my team speak at a future event?', a: 'We love hearing from teams running agents in production. Send a short note about what you built and the results you have seen.' },
      { q: 'Are slides available after each talk?', a: 'Most speakers share their slides. You will find them under each session once the recording is published, usually within a day.' },
    ],
  },
  next: {
    title: 'Keep going after the talks',
    items: [{ title: 'Start building for free', cta: 'Get started', to: '/pricing', big: true }, { title: 'Book a working session', cta: 'Book a call', to: '/book-a-demo' }, { title: 'Read the field guide', cta: 'Read it', to: '/resources' }, { title: 'Join the community', cta: 'Join now', to: '/resources', big: true }, { title: 'Browse agent templates', cta: 'See templates', to: '/workflows' }],
  },
}

// D2 article body: 10 sections. Blocks: { p } paragraph (may contain [text](to) links), { fig, cap }, { quotes }, { stats }, { list }.
specialist.sections = [
  { h: 'The generalist trap', blocks: [
    { p: 'Most teams begin with one capable agent and a long instruction. It reads the ticket, checks the account, drafts the reply, updates the CRM and decides whether to escalate. On a good day it works. On a busy day it forgets a step, and nobody can say which one.' },
    { fig: 'generalist', cap: 'One agent, many tools: every new tool widens the space of possible mistakes.' },
    { p: 'The problem is not intelligence. It is surface area. Each extra tool and each extra rule adds another way for a long run to drift, and the failures become harder to see because they hide inside a single, sprawling transcript.' },
  ] },
  { h: 'What a specialist looks like', blocks: [
    { p: 'A specialist agent has one job, a short instruction and a handful of tools. It knows what good output looks like for that job, and it has a test suite that checks exactly that. When it fails, it fails in a small, legible way.' },
    { fig: 'specialists', cap: 'Four specialists, each with two or three tools and a single responsibility.' },
    { list: ['One job, described in a sentence', 'Three tools or fewer', 'A clear definition of done', 'Its own evals and its own version history'] },
  ] },
  { h: 'Why errors compound', blocks: [
    { p: 'If each step of a ten-step run succeeds nine times in ten, the whole run succeeds about a third of the time. Long, monolithic runs multiply small error rates into big ones. Short runs with checks between them stop errors from travelling.' },
    { fig: 'compound', cap: 'Success rate across a chain of steps, with and without a check between each one.' },
    { stats: true },
  ] },
  { h: 'The handoff note', blocks: [
    { p: 'When work moves between specialists, it moves as a note: what was asked, what was found, what was decided and what is still open. Teams that standardise this note see fewer dropped details than teams that pass raw transcripts along.' },
    { fig: 'handoff', cap: 'A structured note travels between agents instead of the full conversation.' },
    { quotes: true },
  ] },
  { h: 'Add a reviewer early', blocks: [
    { p: 'A reviewer agent checks output against your rules before it leaves the system. It does not rewrite the work. It approves it, sends it back with a reason or escalates it to a person, which keeps quality visible and measurable.' },
    { fig: 'reviewer', cap: 'The reviewer loop: approve, return with a reason, or escalate.' },
    { fig: 'bars-review', cap: 'Median review time per output drops once a reviewer agent filters the obvious misses.' },
  ] },
  { h: 'Let a lead agent plan', blocks: [
    { p: 'For goals that need several specialists, a lead agent breaks the goal into steps, assigns each step and assembles the result. The lead never does the specialist work itself. Its only job is planning and checking.' },
    { fig: 'lead', cap: 'A lead agent fans work out to specialists and gathers it back.' },
    { fig: 'parallel', cap: 'Independent steps run side by side, then merge before review.' },
  ] },
  { h: 'Keep context small', blocks: [
    { p: 'A specialist only needs the context for its own job. Feeding it everything makes it slower, costlier and more likely to latch onto the wrong detail. Small context windows are a feature, not a limitation.' },
    { fig: 'context', cap: 'Context used per run: a generalist fills the window, a specialist stays lean.' },
  ] },
  { h: 'Test each piece on its own', blocks: [
    { p: 'Because each specialist does one thing, it can be tested on one thing. A dozen focused test cases catch more regressions than a hundred vague ones aimed at a do-everything agent. See our guide to [writing evals](/learn) for a starting set.' },
    { fig: 'evals', cap: 'Each specialist carries its own small suite of test cases.' },
    { fig: 'bars-reliability', cap: 'Failed runs per thousand, before and after splitting work into specialists.' },
  ] },
  { h: 'Version and ship independently', blocks: [
    { p: 'When one step improves, only that specialist needs a new version. The rest of the system keeps running unchanged, so teams can ship improvements weekly without retesting the whole workflow every time.' },
    { fig: 'versions', cap: 'Specialists move through versions independently of each other.' },
    { fig: 'harness', cap: 'A harness around each specialist logs inputs, outputs and checks on every run.' },
  ] },
  { h: 'A rollout that sticks', blocks: [
    { p: 'Start with the step that hurts most. Give it a specialist, a reviewer and a week of shadow mode. Once it passes its evals reliably, add the next step. Within a quarter most teams have a small team of agents they actually trust. [Book a session](/book-a-demo) if you want help picking the first one.' },
    { fig: 'rollout', cap: 'Add one specialist at a time, each only after the last one is stable.' },
  ] },
]
