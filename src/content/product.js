// Product / solution page copy for the fictional brand "Lumenfold". All text is original.

export const ctaPair = [{ label: 'Try it free', to: '/pricing' }, { label: 'Book a demo', to: '/book-a-demo' }]

export const closing = {
  title: 'Put your first agent to work before Friday lunch',
  body: 'Start with a template or a blank canvas, connect the tools you already use, and watch Lumenfold take routine work off your plate.',
  primary: { label: 'Start for free', to: '/pricing' },
  secondary: { label: 'Book a demo', to: '/book-a-demo' },
}

export const faqIntro = { title: 'Questions', intro: 'Still curious about something else?', link: { label: 'Talk to our team', to: '/contact-support' } }

const moreCards = {
  knowledge: { to: '/knowledge', icon: 'layers', title: 'Live sources', body: 'Ground every answer in documents that stay in sync.' },
  approvals: { to: '/approvals-escalations', icon: 'shield', title: 'Human checks', body: 'Pause risky steps until the right person signs off.' },
  version: { to: '/version-control', icon: 'branch', title: 'Safe rollout', body: 'Test, publish and roll back agent changes with one click.' },
  collaboration: { to: '/collaboration', icon: 'users', title: 'Team spaces', body: 'Build agents together with shared projects and roles.' },
}
export const moreFeatures = keys => ({
  title: 'More ways Lumenfold keeps your agents on track',
  body: 'Pair this with the rest of the platform toolkit.',
  items: keys.map(k => moreCards[k]),
})

/* ---------- A1 FeatureDetail pages ---------- */
export const featurePages = {
  knowledge: {
    path: '/knowledge',
    h1: 'Give every agent the context your best people carry',
    body: 'Connect docs, wikis and drives once, and Lumenfold keeps every answer grounded in what is current.',
    mock: { kind: 'knowledge', docs: ['Pricing playbook', 'Returns policy', 'Onboarding guide', 'Q3 product notes', 'Security answers'], coins: [2, 5, 9, 12] },
    showcase: [
      { title: 'One library for every source you trust', screen: 'sources', screenTitle: 'Knowledge · Sources',
        body: 'Point Lumenfold at help centres, shared drives, wikis and past tickets. Files are chunked, indexed and re-synced on a schedule you choose, so agents always read the latest version instead of last quarter’s copy.' },
      { title: 'Answers that show their working', screen: 'answer', screenTitle: 'Knowledge · Ask',
        body: 'Every reply carries the passages it was built from. Reviewers can click through to the exact paragraph, flag a stale page and watch the fix flow to every agent that relies on it, all in a few seconds.' },
    ],
    grid: { title: 'Built so agents cite sources, not guesses', items: [
      { icon: 'search', title: 'Hybrid search across every file', body: 'Keyword and meaning-based search blended into one ranked list.' },
      { icon: 'clock', title: 'Scheduled re-syncs', body: 'Pick hourly, daily or on-change updates for each source.' },
      { icon: 'lock', title: 'Permission-aware retrieval', body: 'Agents only read what the asking user is allowed to see.' },
      { icon: 'eye', title: 'Citations on every answer', body: 'Each reply links back to the passages it used.' },
    ] },
    faq: [
      { q: 'Which file types can I upload?', a: 'PDFs, slides, spreadsheets, plain text, web pages and most office formats. Images inside documents are read with OCR.' },
      { q: 'How often does knowledge refresh?', a: 'Each source has its own schedule. You can choose hourly, daily, weekly or refresh whenever the source reports a change.' },
      { q: 'Can different agents use different sources?', a: 'Yes. Attach any mix of sources to each agent, and narrow them further with folder or tag filters.' },
      { q: 'Is my data used to train models?', a: 'No. Your content is stored in your workspace region and is never used to train shared models.' },
      { q: 'What happens when two documents disagree?', a: 'Lumenfold prefers the most recently updated source and surfaces the conflict to reviewers so it can be resolved at the root.' },
    ],
    more: ['approvals', 'version', 'collaboration'],
  },
  approvals: {
    path: '/approvals-escalations',
    h1: 'Keep a human in the loop exactly where it matters',
    body: 'Set the rules once, and agents pause for sign-off on anything costly, sensitive or unusual.',
    mock: { kind: 'approvals', head: ['Request', 'Action'], rows: [
      { seed: 3, task: 'Issue a $640 refund to Halden Co.' },
      { seed: 7, task: 'Send renewal quote with 12% discount' },
      { seed: 10, task: 'Update shipping address for order 4471', mode: 'Auto-approved' },
    ] },
    showcase: [
      { title: 'A single queue for every decision', screen: 'queue', screenTitle: 'Approvals · Queue',
        body: 'Requests from every agent land in one inbox, with the context a reviewer needs to decide quickly. Approve or decline from the web, from chat or by email, and the paused run picks up the moment someone responds.' },
      { title: 'Escalation rules in plain language', screen: 'rules', screenTitle: 'Approvals · Rules',
        body: 'Describe when a step needs a person: an amount above a limit, a VIP account, low model confidence. Route it to a named owner or a rota, set a reply window, and choose what happens if nobody answers in time.' },
    ],
    grid: { title: 'Guardrails that never slow the easy work down', items: [
      { icon: 'flag', title: 'Thresholds per action type', body: 'Different limits for refunds, discounts and outbound sends.' },
      { icon: 'route', title: 'Routing to owners or rotas', body: 'Send each request to the person on duty right now.' },
      { icon: 'bell', title: 'Reminders and fallbacks', body: 'Nudge reviewers, then escalate if a window passes.' },
      { icon: 'history', title: 'A full decision trail', body: 'Who approved what, when and with which context.' },
    ] },
    faq: [
      { q: 'Where do reviewers approve requests?', a: 'In the Lumenfold queue, in your team chat app, or straight from an email notification.' },
      { q: 'Does the agent stop while it waits?', a: 'Only that run pauses. Other runs keep going, and the paused one resumes as soon as a decision arrives.' },
      { q: 'Can I edit a request before approving?', a: 'Yes. Reviewers can adjust the drafted values, add a note for the agent, and then approve.' },
      { q: 'What if nobody responds?', a: 'Each rule has a reply window. When it lapses you can escalate, auto-decline or hand the task to a person.' },
      { q: 'Can approvals depend on confidence?', a: 'Yes. Ask for review whenever the agent’s self-reported confidence drops below a level you set.' },
      { q: 'Is there an audit export?', a: 'Every decision is logged with the reviewer, timestamp and context, and can be exported as CSV.' },
    ],
    more: ['knowledge', 'version', 'collaboration'],
  },
  version: {
    path: '/version-control',
    h1: 'Ship agent changes with the confidence of a release',
    body: 'Draft, compare and publish new agent versions, and roll back in one click if scores dip.',
    mock: { kind: 'version', rows: [
      { v: 'v14', who: 'AP', note: 'Tighter refund wording', score: '95%' },
      { v: 'v13', who: 'JK', note: 'Added order lookup tool', score: '88%' },
      { v: 'v12', who: 'AP', note: 'New greeting and sign-off', score: '91%' },
      { v: 'v11', who: 'ML', note: 'First published draft', score: '84%' },
    ] },
    showcase: [
      { title: 'See exactly what changed and why', screen: 'diff', screenTitle: 'Versions · Compare',
        body: 'Side-by-side diffs cover instructions, tools, knowledge and model settings. Each version runs against your eval suite before it goes live, so you can see whether a change helped or hurt before customers ever notice.' },
      { title: 'A history you can rewind anytime', screen: 'timeline', screenTitle: 'Versions · History',
        body: 'Every publish is kept with its author, notes and scores. If a change misbehaves in production, restore any earlier version in one click and every running workflow switches over without a redeploy.' },
    ],
    grid: { title: 'Release discipline without the release meetings', items: [
      { icon: 'branch', title: 'Drafts that never touch live', body: 'Edit freely while the published version keeps working.' },
      { icon: 'gauge', title: 'Eval gates before publish', body: 'Block a release if its score falls below your bar.' },
      { icon: 'history', title: 'One-click restore', body: 'Roll back to any earlier version instantly.' },
      { icon: 'comment', title: 'Change notes and authors', body: 'Know who changed what, and the reason behind it.' },
    ] },
    faq: [
      { q: 'What is included in a version?', a: 'Instructions, tools, knowledge attachments, model choice and every setting that affects behaviour.' },
      { q: 'Do running tasks switch versions mid-run?', a: 'No. A run finishes on the version it started with. New runs pick up the latest published version.' },
      { q: 'Can I require a review before publishing?', a: 'Yes. Turn on publish approvals and a second editor must sign off on every release.' },
      { q: 'How long is history kept?', a: 'Versions are retained for the life of the agent, with no limit on how many you keep.' },
    ],
    more: ['knowledge', 'approvals', 'collaboration'],
  },
  collaboration: {
    path: '/collaboration',
    h1: 'Build agents together, without stepping on each other',
    body: 'Shared projects, clear roles and in-context comments let whole teams design agents side by side.',
    mock: { kind: 'collab', projectsLabel: 'Projects', projects: [
      { name: 'Support triage', meta: '6 agents' }, { name: 'Renewals desk', meta: '4 agents' },
      { name: 'Vendor onboarding', meta: '3 agents' }, { name: 'Weekly reporting', meta: '2 agents' },
    ], peopleLabel: 'People', people: [
      { initials: 'AP', name: 'Ana Park', role: 'Owner', scope: 'All projects' },
      { initials: 'JK', name: 'Jon Kim', role: 'Editor', scope: '2 projects' },
      { initials: 'ML', name: 'Mia Lund', role: 'Reviewer', scope: 'Support triage' },
    ] },
    showcase: [
      { title: 'Comment right where the work happens', screen: 'comments', screenTitle: 'Support triage · Canvas',
        body: 'Leave notes on any step of an agent or workflow, mention a teammate and resolve threads once the fix is in. Discussions stay attached to the version they were about, so context never gets lost in chat.' },
      { title: 'Roles that match how you work', screen: 'roles', screenTitle: 'Project · Members',
        body: 'Give people view, edit or publish rights per project. Invite outside reviewers with read-only access, keep sensitive agents private to a small group, and see at a glance who can change what across the workspace.' },
    ],
    grid: { title: 'Everything a team needs to build agents as one', items: [
      { icon: 'folder', title: 'Projects that group related agents', body: 'Keep agents, tools and knowledge for one team together.' },
      { icon: 'key', title: 'Per-project roles', body: 'View, edit and publish rights scoped to each project.' },
      { icon: 'comment', title: 'Threaded comments on any step', body: 'Discuss changes in context and resolve them in place.' },
      { icon: 'eye', title: 'Live presence on the canvas', body: 'See who is editing so two people never collide.' },
      { icon: 'users', title: 'Guest reviewer seats', body: 'Bring in outside experts with read-only access.' },
      { icon: 'history', title: 'Activity feed per project', body: 'A running log of edits, publishes and comments.' },
    ] },
    faq: [
      { q: 'Can two people edit at once?', a: 'Yes. Presence indicators show who is working where, and edits merge in real time.' },
      { q: 'Do guests count as paid seats?', a: 'Read-only guest reviewers are free on every plan.' },
      { q: 'Can I move an agent between projects?', a: 'Yes. Its history, comments and permissions move with it.' },
      { q: 'Who can publish changes?', a: 'Only members with publish rights on that project. You can also require a second approver.' },
      { q: 'Is there single sign-on?', a: 'Enterprise workspaces can enforce SSO and map identity groups straight to project roles.' },
    ],
    more: ['knowledge', 'approvals', 'version'],
  },
}

/* ---------- A1v /phone-agent ---------- */
export const phonePage = {
  h1: 'A phone agent that sounds like your best receptionist',
  body: 'Lumenfold answers every call in seconds, books appointments, checks orders and hands tricky conversations to a person with the transcript attached, so nobody waits on hold.',
  ctas: [{ label: 'Hear a call', to: '/book-a-demo' }, { label: 'See pricing', to: '/pricing' }],
  mock: { kind: 'video', poster: '/assets/photos/pr-poster-phone.webp', title: 'Lumenfold phone agent: a two-minute call' },
  showcase: { title: 'Calls handled end to end, day or night', screen: 'call', screenTitle: 'Phone agent · Live call',
    body: 'The agent listens, looks things up and acts while it talks: moving bookings, checking delivery dates and texting confirmations. When a caller needs a person it transfers with a summary, and every call lands in your CRM with the transcript attached.',
    ctas: [{ label: 'Book a demo', to: '/book-a-demo' }, { label: 'Try it free', to: '/pricing' }] },
  grid: { title: 'Always answering', items: [
    { icon: 'clock', title: 'Always on', body: 'Answers on the first ring at any hour, including weekends, holidays and the rush after a campaign goes out.' },
    { icon: 'calendar', title: 'Real bookings', body: 'Reads live calendars and books, moves or cancels appointments without double-booking a single slot.' },
    { icon: 'translate', title: 'Many languages', body: 'Detects the caller’s language and replies naturally, switching mid-call if the person changes language.' },
    { icon: 'route', title: 'Warm handoffs', body: 'Transfers to the right person with a short summary, so callers never have to explain themselves twice.' },
    { icon: 'crm', title: 'CRM logging', body: 'Writes the outcome, transcript and next steps to the right record the moment the caller hangs up.' },
    { icon: 'shield', title: 'Safe by default', body: 'Redacts card numbers, follows your scripts for sensitive topics and asks for approval before refunds.' },
  ] },
  coins: [{ avatar: 4 }, { icon: 'calendar' }, { avatar: 9 }, { icon: 'chat' }, { avatar: 1 }, { icon: 'crm' }],
}

/* ---------- Stubs ---------- */
export const bulkRunCTA = {
  title: 'Run one agent across ten thousand rows tonight',
  body: 'Upload a sheet or pick a saved list, choose the agent, and Lumenfold works through every row in parallel with results you can review.',
  primary: { label: 'Start for free', to: '/pricing' },
  secondary: { label: 'Book a demo', to: '/book-a-demo' },
}

export const toolsPage = {
  h1: 'Tools',
  intro: 'Building blocks your agents can call on demand.',
  items: [
    { title: 'Knowledge search', to: '/knowledge', body: 'Let an agent search across every connected source and return ranked passages with citations. Use it to answer policy questions, pull product details into a draft or check a claim before a reply goes out, all without copying documents into prompts by hand.' },
    { title: 'Approval request', to: '/approvals-escalations', body: 'Pause any run and ask a named person or rota to approve, edit or decline the next step. The tool sends the context a reviewer needs, waits for a decision through chat or email, and resumes the run automatically once someone responds in time.' },
    { title: 'Phone call', to: '/phone-agent', body: 'Place or answer a voice call, follow a script you define and act on what the caller says. It can book appointments, read back order details and take messages, then writes a transcript and outcome to the record so your team can follow up quickly.' },
    { title: 'Bulk run over a spreadsheet', to: '/bulk-run', body: 'Run the same agent over every row of a sheet or saved list, in parallel, with a cap on concurrency so you stay within rate limits. Results stream back into new columns, and any row that fails is flagged for a retry or a quick manual check.' },
    { title: 'Web page reader', to: '/features', body: 'Fetch a public page, strip navigation and adverts, and hand the agent clean text and tables. Useful for researching accounts, checking a competitor’s pricing page or summarising a long article, with the source address kept alongside every extracted fact for review.' },
    { title: 'Send a chat message to a channel or person', to: '/slack', body: 'Post updates, summaries or questions into a team channel or a direct message, and optionally wait for a reply before continuing. Agents can thread their messages under an existing conversation so updates stay tidy and everyone can see the history in one place.' },
    { title: 'Version snapshot', to: '/version-control', body: 'Capture the current state of an agent, including instructions, tools and knowledge, as a named snapshot. Snapshots can be compared with each other, evaluated against your test suite, published to production or restored later if a change does not work as expected.' },
  ],
}

/* ---------- A2 /workforce ---------- */
export const workforce = {
  h1: 'Your entire agent workforce on one canvas',
  body: 'Chain agents into a workforce that picks up triggers, shares context, hands work to each other and asks a person when a decision really needs one.',
  ctas: [{ label: 'Start for free', to: '/pricing' }, { label: 'Book a demo', to: '/book-a-demo' }],
  status: 'Workforce live',
  chip: { seed: 7, label: 'Synced with Ledgerly' },
  graph: {
    nodes: [
      { id: 't1', type: 'trigger', x: 0, y: 40, badge: 'Trigger', label: 'New support ticket', sub: 'Any inbox, any channel' },
      { id: 't2', type: 'trigger', x: 0, y: 210, badge: 'Schedule', label: 'Weekdays at 8:00', sub: 'Morning digest' },
      { id: 'a1', type: 'agent', x: 250, y: 0, label: 'Triage', avatar: 2, tools: [1, 6] },
      { id: 'a2', type: 'agent', x: 250, y: 104, label: 'Account lookup', avatar: 5, tools: [3, 8] },
      { id: 'a3', type: 'agent', x: 250, y: 218, label: 'Digest writer', avatar: 9, tools: [11] },
      { id: 'a4', type: 'agent', x: 510, y: 52, label: 'Reply drafter', avatar: 7, tools: [4, 13] },
      { id: 'a5', type: 'agent', x: 510, y: 176, label: 'Escalation desk', avatar: 11, tools: [2, 9] },
      { id: 'a6', type: 'agent', x: 770, y: 114, label: 'Quality check', avatar: 3, tools: [14] },
      { id: 'add', type: 'add', x: 800, y: 214, label: 'Add agent' },
    ],
    edges: [['t1', 'a1'], ['t1', 'a2'], ['t2', 'a3'], ['a1', 'a4'], ['a2', 'a4'], ['a2', 'a5'], ['a3', 'a5'], ['a4', 'a6'], ['a5', 'a6'], ['a5', 'add']],
    seq: ['t1', 'a1', 'a2', 'a4', 't2', 'a3', 'a5', 'a6'],
  },
  how: {
    title: 'How a Lumenfold workforce gets real work done',
    body: 'Describe the outcome you want, connect the tools your team already relies on, and let the agents divide the work between them. You stay in charge of every decision that matters, with a clear trail of what happened and why it happened.',
    items: [
      { label: 'Describe', title: 'Say what done looks like', palette: 'sales', illus: 'pills', pills: ['Read every new ticket', 'Tag urgency and topic', 'Draft a first reply'],
        body: 'Write the goal in plain words. Lumenfold proposes the agents, steps and hand-offs needed to reach it.' },
      { label: 'Connect', title: 'Plug in the tools you use', palette: 'marketing', illus: 'hub',
        body: 'Link inboxes, CRMs, drives and chat in a few clicks so every agent reads and writes where your team already works.' },
      { label: 'Supervise', title: 'Stay in the loop on calls', palette: 'operations', illus: 'review', pills: ['Refund for order 3318', 'Discount on renewal', 'Contract redline'],
        body: 'Agents pause for approval on anything sensitive, and every run leaves a readable trail you can audit later.' },
    ],
  },
  deploy: {
    title: 'Three ways to put a workforce to work',
    body: 'Start from a blank canvas, describe it in a sentence or bring the models you already trust. Every path ends in the same supervised workforce.',
    items: [
      { label: 'Canvas', title: 'Drag agents into place', palette: 'sales', illus: 'placeholder',
        body: 'Lay out agents and hand-offs visually, then drop new specialists into any open slot as the work grows.' },
      { label: 'Prompt', title: 'Describe it in a sentence', palette: 'cs', illus: 'typing', pills: ['Chase unpaid invoices every Monday'],
        body: 'Type the job you need done and Lumenfold drafts the full workforce for you to review, tweak and switch on.' },
      { label: 'Models', title: 'Bring your preferred models', palette: 'marketing', illus: 'models', pills: ['Fast reasoning model', 'Long-context reader', 'Private hosted model', 'Speech model'],
        body: 'Mix and match models per agent, including privately hosted ones, without rebuilding a single workflow.' },
    ],
  },
  faq: [
    { q: 'What is a workforce?', a: 'A group of agents that share triggers, context and hand-offs, so a multi-step job runs end to end without someone stitching the steps together.' },
    { q: 'Do I need to write code?', a: 'No. Everything is built on the canvas or from a written description. Developers can still call any workforce through the API.' },
    { q: 'How do agents pass work to each other?', a: 'Each hand-off carries the task, the context gathered so far and any files, so the next agent starts with everything it needs.' },
    { q: 'Can a person step in mid-run?', a: 'Yes. Add approval steps anywhere, or take over a run from the live view and hand it back when you are done.' },
    { q: 'How is usage billed?', a: 'Workforces use the same credits as single agents. You only pay for the steps that actually run.' },
    { q: 'Which tools can a workforce use?', a: 'Any connected integration, your own APIs, knowledge sources and the built-in tools such as search, email and phone.' },
  ],
}

/* ---------- A2 /gtm ---------- */
const sq = n => `/assets/photos/pr-sq-${n}.webp`
const agent = (id, x, y, label, avatar, tools) => ({ id, type: 'agent', x, y, label, avatar, tools })
const trig = (id, x, y, badge, label, sub) => ({ id, type: 'trigger', x, y, badge, label, sub })
export const gtm = {
  eyebrow: 'Agents that quietly handle',
  words: ['prospecting', 'enrichment', 'follow-ups', 'inbound triage', 'renewals', 'forecasting', 'meeting prep', 'CRM hygiene', 'outreach', 'lead routing', 'account research'],
  h1: 'Agents that move every deal forward',
  cards: [
    { seed: 1, name: 'Pipewise', sub: 'CRM' }, { seed: 4, name: 'Mailkite', sub: 'Email' }, { seed: 7, name: 'Callnest', sub: 'Dialer' },
    { seed: 10, name: 'Datafern', sub: 'Enrichment' }, { seed: 13, name: 'Notably', sub: 'Docs' }, { seed: 16, name: 'Slatebox', sub: 'Team chat' },
    { seed: 2, name: 'Quillin', sub: 'Proposals' }, { seed: 5, name: 'Metricly', sub: 'Analytics' }, { seed: 8, name: 'Formwell', sub: 'Forms' },
    { seed: 11, name: 'Bookwise', sub: 'Calendar' }, { seed: 14, name: 'Signet', sub: 'E-signature' }, { seed: 17, name: 'Ledgerly', sub: 'Billing' },
  ],
  statement: 'Every revenue team has more good leads than hours to work them properly.',
  framing: {
    title: ['A single platform where revenue agents share one ', '#playbook'],
    labels: ['Signals', 'Agents', 'Evals', 'Hand-offs'],
    bubbles: [
      { name: 'Pipewise', stat: '2.4k syncs', seed: 1, s: 56, x: 7, y: 34, delay: 0, float: 4.2 },
      { name: 'Mailkite', stat: '38% replies', seed: 4, s: 48, x: 16, y: 82, delay: 0.1, float: 5 },
      { name: 'Datafern', stat: '9k records', seed: 10, s: 44, x: 28, y: 12, delay: 0.2, float: 4.6 },
      { name: 'Bookwise', stat: '312 meetings', seed: 11, s: 52, x: 72, y: 12, delay: 0.15, float: 5.4 },
      { name: 'Callnest', stat: '1.1k calls', seed: 7, s: 44, x: 86, y: 80, delay: 0.25, float: 4.4 },
      { name: 'Slatebox', stat: '64 alerts', seed: 16, s: 48, x: 93, y: 36, delay: 0.05, float: 5.2 },
      { name: 'Quillin', stat: '87 proposals', seed: 2, s: 40, x: 36, y: 90, delay: 0.3, float: 4.8 },
      { name: 'Metricly', stat: '14 reports', seed: 5, s: 44, x: 63, y: 90, delay: 0.35, float: 5.6 },
    ],
  },
  pairs: [
    { heading: 'Pipeline starts with knowing who to call. Agents research every account overnight and hand reps a short list worth their time.',
      cells: [
        { title: 'Account research', images: [sq(1), sq(2)], sticker: 0, body: 'A briefing for every target account, refreshed each week.', checks: ['Company news and hiring signals', 'Buying committee mapped', 'Fit score with reasons'] },
        { title: 'Lead enrichment', images: [sq(3), sq(4)], sticker: 1, body: 'Every new lead arrives complete, checked and deduplicated.', checks: ['Missing fields filled in', 'Duplicates merged safely', 'Owner assigned by territory'] },
      ] },
    { heading: 'Speed wins inbound. Agents qualify, route and reply to new interest in minutes, at any hour, in your own voice.',
      cells: [
        { title: 'Inbound triage', images: [sq(5), sq(6)], sticker: 2, body: 'Form fills and chats sorted and answered while they are warm.', checks: ['Qualified against your criteria', 'Booked straight onto calendars', 'Spam and students filtered out'] },
        { title: 'Smart routing', images: [sq(7), sq(8)], sticker: 3, body: 'The right rep gets the right lead, every time, with context.', checks: ['Territory and round-robin rules', 'Existing owner respected', 'Instant alert in team chat'] },
      ] },
    { heading: 'Outbound that feels personal at scale. Agents write first touches grounded in real research, then follow up until someone answers.',
      cells: [
        { title: 'First touches', images: [sq(9), sq(10)], sticker: 1, body: 'Openers that reference something true and relevant to them.', checks: ['Drafts tuned to each persona', 'Sent from rep mailboxes', 'Approval before anything goes out'] },
        { title: 'Patient follow-up', images: [sq(11), sq(12)], sticker: 0, body: 'Sequences that adapt to replies instead of blindly repeating.', checks: ['Stops the moment someone replies', 'Handles out-of-office returns', 'Logs every touch to the CRM'] },
      ] },
    { heading: 'Revenue does not end at the signature. Agents prepare meetings, watch renewals and keep the CRM honest so forecasts hold up.',
      cells: [
        { title: 'Meeting prep', images: [sq(13), sq(14)], sticker: 3, body: 'A one-page brief in every rep’s inbox before each call.', checks: ['Attendees and their history', 'Open tickets and usage trends', 'Suggested questions to ask'] },
        { title: 'Renewal watch', images: [sq(15), sq(16)], sticker: 2, body: 'Early warnings on accounts drifting away, months ahead.', checks: ['Usage and sentiment tracked', 'Risk flagged to the owner', 'Save plays drafted for review'] },
      ] },
  ],
  playbook: {
    title: ['Turn the playbook you already have into ', '#working agents'],
    body: 'Pick a motion and watch the agents pass work between them.',
    tabs: [
      { label: 'Inbound triage', score: 96, doneText: 'Lead qualified, booked and logged to the CRM',
        status: ['Form submitted by a new visitor', 'Checking company size and region', 'Scoring against the qualification rules', 'Booking a slot on the owner’s calendar', 'Writing the summary to the CRM'],
        graph: { nodes: [trig('t', 0, 90, 'Trigger', 'Demo form submitted', 'Website'), agent('a', 250, 30, 'Enricher', 2, [10]), agent('b', 250, 160, 'Qualifier', 5, [1]), agent('c', 510, 96, 'Scheduler', 8, [11]), agent('d', 770, 96, 'CRM writer', 3, [1, 16])],
          edges: [['t', 'a'], ['t', 'b'], ['a', 'c'], ['b', 'c'], ['c', 'd']], seq: ['t', 'a', 'b', 'c', 'd'] } },
      { label: 'Outbound research', score: 92, doneText: '18 accounts researched, 12 drafts waiting for approval',
        status: ['Weekly list refreshed', 'Researching each account', 'Finding the right contacts', 'Drafting first touches', 'Sending drafts for approval'],
        graph: { nodes: [trig('t', 0, 100, 'Schedule', 'Mondays at 7:00', 'Target list'), agent('a', 250, 100, 'Researcher', 9, [10, 13]), agent('b', 510, 30, 'Contact finder', 4, [10]), agent('c', 510, 170, 'Copywriter', 7, [4]), agent('d', 770, 100, 'Reviewer', 11, [16])],
          edges: [['t', 'a'], ['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']], seq: ['t', 'a', 'b', 'c', 'd'] } },
      { label: 'Meeting prep', score: 89, doneText: 'Brief sent to the account owner 30 minutes before the call',
        status: ['Meeting found on the calendar', 'Pulling account history', 'Reading open support tickets', 'Writing the one-page brief'],
        graph: { nodes: [trig('t', 0, 90, 'Calendar', 'Call in 60 minutes', 'External attendees'), agent('a', 250, 20, 'History reader', 6, [1]), agent('b', 250, 160, 'Ticket reader', 10, [13]), agent('c', 510, 90, 'Brief writer', 2, [4, 16])],
          edges: [['t', 'a'], ['t', 'b'], ['a', 'c'], ['b', 'c']], seq: ['t', 'a', 'b', 'c'] } },
      { label: 'Renewal watch', score: 94, doneText: '3 accounts flagged with save plays drafted',
        status: ['Nightly usage check started', 'Comparing usage with last quarter', 'Reading recent sentiment', 'Scoring renewal risk', 'Drafting save plays for owners'],
        graph: { nodes: [trig('t', 0, 100, 'Schedule', 'Nightly at 2:00', 'All customers'), agent('a', 250, 30, 'Usage analyst', 5, [5]), agent('b', 250, 170, 'Sentiment reader', 12, [16, 4]), agent('c', 510, 100, 'Risk scorer', 8, [5]), agent('d', 770, 100, 'Save planner', 1, [13, 1])],
          edges: [['t', 'a'], ['t', 'b'], ['a', 'c'], ['b', 'c'], ['c', 'd']], seq: ['t', 'a', 'b', 'c', 'd'] } },
    ],
  },
  evals: {
    title: ['Know every agent is ', '#ready to ship'],
    body: 'Each change runs against real scenarios before it reaches a prospect.',
    suite: {
      title: 'Outbound copywriter', meta: 'Run 48 · 7 scenarios · threshold 85', delta: '+3.2 vs last run', threshold: 85,
      history: [78, 82, 80, 86, 84, 88, 87, 89], firstRun: 40, runLabel: 'R', seed: 4, listTitle: 'Scenarios',
      tests: [
        { name: 'Mentions a real company signal', score: 96 }, { name: 'Stays under 90 words', score: 99 },
        { name: 'Matches the persona tone', score: 91 }, { name: 'No invented customer names', score: 100 },
        { name: 'Clear single call to action', score: 88 }, { name: 'Handles a missing first name', score: 82 },
        { name: 'Respects opt-out language', score: 97 },
      ],
    },
  },
  tasks: {
    first: 'Every rep starts the week with a never ending list',
    final: 'Hand the busywork to agents and get selling again',
    button: { label: 'Get started', to: '/pricing' },
    items: ['Update deal stages', 'Log yesterday’s calls', 'Research new accounts', 'Find the economic buyer', 'Chase unsigned contracts', 'Write follow-up emails', 'Book discovery calls', 'Clean duplicate contacts',
      'Prep the QBR deck', 'Score inbound leads', 'Route demo requests', 'Summarise call notes', 'Draft renewal quotes', 'Check usage drops', 'Send meeting recaps', 'Fill missing job titles',
      'Tag lost reasons', 'Refresh the forecast', 'Answer pricing questions', 'Build target lists', 'Share win stories', 'Review proposal drafts', 'Nudge stalled deals', 'Reply to new chats'],
  },
}

/* ---------- A2 /invent ---------- */
export const invent = {
  h1: 'Invention unlocked',
  lines: ['Tell Lumenfold what you need in a sentence.', 'It plans the steps, connects the tools and tests the result,', 'then hands you a working agent to review and switch on.'],
  ctas: [{ label: 'Start inventing', to: '/pricing' }, { label: 'Book a demo', to: '/book-a-demo' }],
  bubbles: ['Draft a weekly churn report for me', 'Find leads who just raised a round', 'Answer refund emails in our tone'],
  steps: [
    { kind: 'chat', h: 120, status: 'Listening', caption: 'You describe the job in your own words', items: [{ me: true, t: 'Every Monday, find accounts whose usage dropped and draft a check-in.' }, { t: 'Got it. Should drafts go to the account owner for approval first?' }] },
    { kind: 'chat', h: 80, status: 'Clarifying', caption: 'It asks only the questions that matter', items: [{ me: true, t: 'Yes, and skip anyone already in a renewal call this week.' }] },
    { kind: 'form', h: 140, status: 'Planning', caption: 'A plan you can read and adjust', items: [['Trigger', 'Mondays at 7:00'], ['Data source', 'Usage warehouse'], ['Threshold', 'Down 20% or more'], ['Exclude', 'Open renewal meetings'], ['Output', 'Draft email per owner'], ['Review', 'Owner approves']] },
    { kind: 'integrations', h: 150, status: 'Connecting', caption: 'The right tools linked in place', items: [[5, 'Metricly', 'Connected'], [1, 'Pipewise', 'Connected'], [4, 'Mailkite', 'Connected']] },
    { kind: 'diff', h: 120, status: 'Writing', caption: 'Instructions drafted and refined', items: [['-', 'Email every account with lower usage.'], ['+', 'Email accounts down 20% or more in 30 days.'], ['+', 'Mention the feature they used most last month.']] },
    { kind: 'tags', h: 80, status: 'Staffing', caption: 'Specialists assigned to each step', items: ['Usage analyst', 'Calendar checker', 'Email drafter'] },
    { kind: 'form', h: 100, status: 'Testing', caption: 'Real scenarios run before launch', items: [['Scenarios', '12 of 12 run'], ['Passing', '11 scenarios'], ['Average score', '93 / 100'], ['Flagged', '1 for review']] },
    { kind: 'chat', h: 80, status: 'Reviewing', caption: 'You approve the first batch', items: [{ t: 'Here are 6 drafts for this week. Want me to send them to owners now?' }] },
    { kind: 'integrations', h: 100, status: 'Live', caption: 'A working agent, running every week', items: [[9, 'Usage check-in agent', 'Running'], [16, 'Owner alerts in Slatebox', 'On']] },
  ],
  video: { title: 'See Invent in action', poster: '/assets/photos/pr-poster-invent.webp',
    body: 'Watch a single sentence turn into a tested, supervised agent in under four minutes, from the first prompt to the first approved run.' },
  signals: {
    title: 'Agents that notice before you do',
    body: 'Signals from every connected tool are routed to the specialist best placed to act on them.',
    agents: [{ name: 'Account watcher', role: 'Revenue', avatar: 2 }, { name: 'Support lead', role: 'Customer care', avatar: 7 }, { name: 'Ops planner', role: 'Operations', avatar: 11 }],
    signals: [
      { seed: 5, text: 'Usage down 32% at Halden Co.', to: 0 }, { seed: 13, text: 'Three tickets mention late delivery', to: 1 },
      { seed: 11, text: 'Warehouse slot cancelled for Friday', to: 2 }, { seed: 1, text: 'Champion left Brightpath', to: 0 },
      { seed: 16, text: 'Angry reply in the VIP channel', to: 1 }, { seed: 17, text: 'Invoice overdue by 14 days', to: 2 },
    ],
  },
  evalsFloor: {
    title: 'Every agent is tested like a product',
    body: 'Dozens of realistic scenarios run on each change, so quality is measured rather than hoped for.',
    scenarios: ['Polite refusal', 'Missing order id', 'Angry customer', 'Two questions at once', 'Wrong language', 'Refund over limit', 'VIP account', 'Vague request', 'Duplicate ticket', 'Out of hours', 'Policy edge case', 'Typo in email',
      'Partial refund', 'Cancelled order', 'Gift purchase', 'Address change', 'Bulk order', 'Price match ask', 'Damaged item', 'Lost parcel', 'Account locked', 'Invoice copy', 'Tax question', 'Thank-you note']
      .map((name, i) => ({ name, ok: ![5, 13, 20].includes(i) })),
  },
  embed: {
    title: 'Put your agent wherever customers are',
    body: 'Link a channel to go live there in seconds. Unlink it just as quickly.',
    channels: [{ seed: 0, name: 'Website', linked: true }, { seed: 13, name: 'Help centre', linked: true }, { seed: 3, name: 'Mobile app', linked: false }, { seed: 16, name: 'Team chat', linked: true }, { seed: 4, name: 'Email', linked: false }],
    pool: [{ seed: 7, name: 'Phone line' }, { seed: 8, name: 'Partner portal' }, { seed: 12, name: 'Checkout page' }],
  },
  stack: {
    title: 'Everything underneath, already wired together',
    body: 'Invent builds on the same layers every Lumenfold agent uses, so what you make is secure, observable and ready for real work from day one.',
    rows: [
      { icon: 'sparkle', label: 'Agents and workforces', meta: 'What you build' },
      { icon: 'gauge', label: 'Evals and approvals', meta: 'Quality gates' },
      { icon: 'plug', label: 'Tools and integrations', meta: 'Actions' },
      { icon: 'layers', label: 'Knowledge and memory', meta: 'Context' },
      { icon: 'lock', label: 'Security, roles and audit', meta: 'Foundation' },
    ],
  },
  getStarted: {
    title: 'Your next teammate is one sentence away',
    body: 'Describe a task you would happily never do again. Invent will have a tested agent ready before your coffee cools down.',
    cta: { label: 'Start building for free', to: '/pricing' },
  },
}

/* ---------- A2 /slack (team-chat integration; the chat app is the fictional "Slatebox") ---------- */
export const slack = {
  label: 'Lumenfold for Slatebox',
  h1: 'Agents that live in your chat',
  body: 'Mention an agent in any channel, approve its work with one click and get updates where your team already talks.',
  ctas: [{ label: 'Add to Slatebox', to: '/pricing' }, { label: 'Book a demo', to: '/book-a-demo' }],
  tabs: [
    { label: 'deal-desk', messages: [
      { who: 'Ravi Shah', seed: 5, time: '9:41', body: '@Lumenfold can you pull the latest on Brightpath before my 10:00?' },
      { who: 'Lumenfold', app: true, time: '9:41', body: 'Here is the short version:\n• Usage up 18% this month\n• Two open tickets, both minor\n• Their champion was promoted last week', actions: ['Read 14 CRM notes', 'Checked usage dashboard', 'Scanned support inbox'], reply: { seed: 5, text: 'Perfect, thanks. Adding this to the call notes.' } },
    ] },
    { label: 'support-escalations', messages: [
      { who: 'Lumenfold', app: true, time: '14:02', body: 'A refund of $640 for Halden Co. is above the auto-approve limit. Approve or decline?', actions: ['Order 4471 verified', 'Delivery was 5 days late'] },
      { who: 'Ana Park', seed: 7, time: '14:03', body: 'Approved. Please add a note about the courier delay.', reply: { seed: 1, text: 'Done. Refund issued and note added to the ticket.' } },
    ] },
    { label: 'launch-room', messages: [
      { who: 'Mia Lund', seed: 9, time: '11:15', body: '@Lumenfold summarise yesterday’s launch feedback for the team.' },
      { who: 'Lumenfold', app: true, time: '11:16', body: '62 mentions so far. Most love the new export. Five people hit a login bug on mobile, already logged as a ticket.', actions: ['Read 3 channels', 'Grouped 62 mentions', 'Opened ticket #2291'], reply: { seed: 9, text: 'Great, I will flag the mobile bug in stand-up.' } },
    ] },
  ],
  twoUp: {
    title: 'Work with agents like any teammate',
    body: 'No new tabs to learn. Ask, review and approve from the conversation itself.',
    items: [
      { title: 'Just mention', body: 'Type @Lumenfold in any channel or direct message and describe what you need. The right agent picks it up, asks a follow-up question if something is unclear and replies in the thread.' },
      { title: 'Approve inline', body: 'When an agent needs a decision it posts a short card with the context and two buttons. One click from anyone with permission resumes the run, and the choice is logged for audit later.' },
    ],
  },
  useCases: {
    title: 'What teams hand over in chat',
    body: 'A few of the jobs agents handle without anyone leaving the channel.',
    items: [
      { title: 'Account briefings on demand', body: 'Ask for a quick read on any customer before a call and get usage, open tickets, recent emails and the people involved, summarised in a few lines with links back to every source.' },
      { title: 'Refund and discount approvals', body: 'Agents post requests above your limits to a review channel. Reviewers approve or decline with one click and the agent completes the work straight away, logging who decided.' },
      { title: 'Daily stand-up digests', body: 'Each morning an agent collects updates from tickets, deals and docs, then posts a tidy digest to the team channel so stand-up starts with facts instead of status questions.' },
      { title: 'Incident first response', body: 'When an alert fires, an agent opens a channel, pulls recent changes and error logs, invites the on-call engineer and keeps a running timeline that becomes the post-incident write-up.' },
      { title: 'Launch feedback roundups', body: 'Agents read every mention of a release across channels, group them by theme, flag bugs as tickets and post a summary that product teams can act on the same afternoon.' },
      { title: 'New hire questions', body: 'Newcomers ask about holidays, expenses or tools in a help channel. The agent answers from your handbook with citations, and routes anything it cannot answer to the right person.' },
      { title: 'Lead alerts with context', body: 'When a high-fit lead arrives, the owner gets a message with the company summary, the pages they viewed and a suggested first reply, ready to send or adjust in a click.' },
      { title: 'Meeting follow-ups', body: 'After a call, an agent posts the summary, decisions and owners to the account channel, drafts the recap email and creates tasks so nothing discussed gets quietly forgotten.' },
      { title: 'Weekly metric check-ins', body: 'Every Friday an agent posts the numbers that matter for each team, explains what moved and why, and answers follow-up questions in the thread without anyone opening a dashboard.' },
      { title: 'Policy lookups mid-thread', body: 'Anyone can ask what the rule is for travel, returns or data retention, and get the current answer from your docs with a link, instead of waiting for someone to remember.' },
    ],
  },
  explainer: {
    title: 'Built for busy channels, not demos',
    paras: [
      'Agents only speak when asked or when a rule says they should, so channels stay readable. Every message links to the full run if someone wants the detail.',
      'Permissions follow your workspace. An agent can only read the channels it was invited to, can only act through the tools you connected, and every approval is tied to a named person. Admins can see each agent’s activity across the workspace from one view and switch any agent off instantly.',
    ],
    stats: [{ value: '4s', label: 'Average time to first reply' }, { value: '1 click', label: 'To approve a paused run' }, { value: '0', label: 'New apps for your team to learn' }],
  },
  programmatic: { title: ['Want agents to post from your own systems? Use the ', '#Lumenfold API', ' to trigger them from anywhere.'], chip: { label: 'Read the developer guide', to: '/tools' } },
  final: { title: 'Bring your first agent into chat today', body: 'Install in two minutes and invite an agent to any channel you like.', ctas: [{ label: 'Add to Slatebox', to: '/pricing' }, { label: 'Book a demo', to: '/book-a-demo' }] },
}

/* ---------- A3 /features ---------- */
// Row format: [bold lead, muted tail]. Tail starts with ': ' or ' (' per spec.
export const features = {
  h1: 'Every capability your agents need, in one place',
  body: 'A complete tour of what Lumenfold can do, from building and testing agents to running them safely at scale.',
  ctas: [{ label: 'Start for free', to: '/pricing' }, { label: 'Book a demo', to: '/book-a-demo' }],
  categories: [
    { title: 'Agent building', icon: 'sparkle', rows: [
      ['Plain-language instructions', ': describe the job and the agent drafts its own steps'], ['Visual canvas', ': arrange steps, branches and hand-offs by dragging'],
      ['Templates', ' (over a hundred starting points by team)'], ['Variables and inputs', ': pass names, records or files into each run'],
      ['Output formats', ': ask for tables, JSON, emails or documents'], ['Reusable sub-agents', ': build once, call from any other agent'] ] },
    { title: 'Workforces', icon: 'users', rows: [
      ['Multi-agent hand-offs', ': pass tasks and context between specialists'], ['Shared triggers', ': one event can start several agents at once'],
      ['Supervisor agents', ': a lead agent assigns and checks the work'], ['Parallel branches', ' (run independent steps at the same time)'],
      ['Live run view', ': watch every agent’s progress as it happens'], ['Manual takeover', ': pause any run and finish a step yourself'] ] },
    { title: 'Knowledge', icon: 'layers', rows: [
      ['Connected sources', ': drives, wikis, help centres and ticket history'], ['Scheduled re-syncs', ' (hourly, daily or on change)'],
      ['Hybrid search', ': keyword and meaning-based ranking combined'], ['Citations', ': every answer links back to its passages'],
      ['Permission-aware reads', ': agents see only what the user may see'], ['Tables and spreadsheets', ': query structured data in plain words'],
      ['Conflict detection', ': flags documents that disagree with each other'] ] },
    { title: 'Tools and integrations', logos: [1, 4, 10, 13], rows: [
      ['Prebuilt integrations', ' (hundreds of apps across sales, support and ops)'], ['Custom API tools', ': describe an endpoint and use it right away'],
      ['Webhooks in and out', ': start runs from events or notify other systems'], ['Browser reader', ': fetch and clean any public web page'],
      ['Email send and read', ': work from shared or personal inboxes'], ['Phone calls', ': place and answer voice calls with scripts'],
      ['File handling', ': read, write and convert common document types'], ['Code step', ' (run a short script when logic gets fiddly)'],
      ['Tool approvals', ': require sign-off before specific actions'] ] },
    { title: 'Triggers and scheduling', icon: 'clock', rows: [
      ['Schedules', ': run on any cron-style timetable'], ['App events', ': start when a record, ticket or message changes'],
      ['Chat mentions', ': kick off a run from any team channel'], ['Email triggers', ' (a dedicated address per agent)'],
      ['Bulk runs', ': process every row of a sheet or list in parallel'] ] },
    { title: 'Human in the loop', icon: 'shield', rows: [
      ['Approval steps', ': pause before costly or sensitive actions'], ['Confidence thresholds', ': ask for review when the agent is unsure'],
      ['Routing to owners', ': send each request to the right person'], ['Rotas and on-call', ' (route to whoever is on duty now)'],
      ['Reply windows', ': escalate or decline when time runs out'], ['Edit before approve', ': reviewers can change the drafted values'],
      ['Approve from chat', ': one click from any team channel'], ['Approve from email', ': decide straight from the notification'],
      ['Comments to the agent', ': give feedback that shapes the next run'], ['Escalation chains', ': step up to a manager after a delay'],
      ['Decision log', ': every choice stored with context and author'] ] },
    { title: 'Quality and evaluation', icon: 'gauge', rows: [
      ['Scenario suites', ': realistic test cases for every agent'], ['Automatic scoring', ' (rubrics, exact match or model-graded)'],
      ['Pass thresholds', ': block releases that fall below your bar'], ['Run comparisons', ': see how a change moved each score'],
      ['Regression alerts', ': get told when quality drops in production'], ['Human ratings', ': collect thumbs up or down from reviewers'],
      ['Golden answers', ': lock in the responses you expect'] ] },
    { title: 'Versions and releases', icon: 'branch', rows: [
      ['Drafts', ': edit without touching the live agent'], ['Side-by-side diffs', ': compare instructions, tools and settings'],
      ['One-click restore', ': roll back to any earlier version'], ['Publish approvals', ' (a second editor signs off)'],
      ['Release notes', ': record the reason behind each change'] ] },
    { title: 'Collaboration', icon: 'comment', rows: [
      ['Projects', ': group related agents, tools and knowledge'], ['Roles per project', ': view, edit and publish rights'],
      ['Threaded comments', ': discuss any step in place'], ['Live presence', ': see who is editing right now'],
      ['Guest reviewers', ' (free read-only seats)'], ['Activity feed', ': a running log of edits and publishes'],
      ['Mentions and alerts', ': pull teammates into a thread'], ['Shared tool library', ': reuse connections across projects'],
      ['Ownership transfer', ': hand an agent to another team cleanly'] ] },
    { title: 'Channels', logos: [16, 0, 7], rows: [
      ['Website widget', ': a chat bubble that matches your brand'], ['Help centre embed', ': answers inside your support articles'],
      ['Team chat apps', ': agents that live in your channels'], ['Email replies', ': agents answer from shared inboxes'],
      ['Phone lines', ' (inbound and outbound voice)'], ['Mobile SDK', ': drop an agent into your own app'],
      ['Partner portals', ': give partners a scoped assistant'], ['API access', ': call any agent from your own systems'] ] },
    { title: 'Monitoring and analytics', icon: 'chart', rows: [
      ['Run history', ': every run with inputs, steps and outputs'], ['Step traces', ': see each tool call and its result'],
      ['Cost explorer', ': spend by agent, team and model'], ['Usage dashboards', ' (runs, tasks and time saved)'],
      ['Error grouping', ': similar failures clustered together'], ['Alerts', ': notify a channel when something breaks'],
      ['Outcome tracking', ': tie runs to deals, tickets or invoices'], ['Exports', ': send logs to your own warehouse'],
      ['Search across runs', ': find any run by customer or text'], ['Retention controls', ': choose how long logs are kept'] ] },
    { title: 'Models', icon: 'bolt', rows: [
      ['Model choice per agent', ': pick the best fit for each job'], ['Bring your own keys', ' (use your existing provider contracts)'],
      ['Private hosted models', ': run inside your own cloud'], ['Automatic fallbacks', ': switch providers if one is slow or down'] ] },
    { title: 'Security and compliance', icon: 'lock', rows: [
      ['Single sign-on', ': enforce your identity provider'], ['Role-based access', ': workspace, project and agent levels'],
      ['Data residency', ' (choose the region your data lives in)'], ['Audit log', ': every action recorded and exportable'],
      ['Redaction', ': strip card numbers and personal data'], ['No training on your data', ': content never trains shared models'] ] },
    { title: 'Developer platform', logos: [3, 9, 14, 6], rows: [
      ['REST API', ': create, run and inspect agents in code'], ['SDKs', ' (typed clients for popular languages)'],
      ['Webhook events', ': subscribe to run, approval and error events'] ] },
  ],
}
