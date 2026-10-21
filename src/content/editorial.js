// Editorial data for the Lumenfold content pages. All copy, names and figures are original and fictional.
// Article bodies are arrays of blocks: ['p', text] ['h2', text] ['h3', text] ['ul'|'ol', items] ['quote', text]
// ['code', text] ['table', head, rows] ['hr'] ['img', src, caption]. Inline: **bold**, `code`, [label](href).

export const authors = {
  mara: { name: 'Mara Ellison', role: 'Head of Product', seed: 1 },
  tomasz: { name: 'Tomasz Reyes', role: 'Solutions engineer', seed: 4 },
  priya: { name: 'Priya Nandakumar', role: 'Staff engineer', seed: 2 },
  jonah: { name: 'Jonah Whitfield', role: 'Content lead', seed: 9 },
  elif: { name: 'Elif Sandoval', role: 'Customer success lead', seed: 5 },
  daniel: { name: 'Daniel Okafor', role: 'Research lead', seed: 12 },
}

/* ---------- Blog (T1 / T2) ---------- */
export const blogIndex = {
  title: 'Blog',
  body: 'Notes on building, running and measuring agents with real teams.',
}
export const blogCategories = ['Agent design', 'Operations', 'Customer stories', 'Product notes']

export const articleCta = {
  title: 'Put your first agent to work',
  body: 'Start with one repetitive task, connect the tools your team already uses, and watch every step your agent takes before you hand over more.',
  primary: 'Start for free',
  secondary: 'Talk to our team',
}

const rawPosts = [
  {
    slug: 'writing-agent-instructions-your-team-can-review',
    title: 'Writing agent instructions your whole team can review',
    description: 'Plain-language instructions are easier to audit, easier to hand over and, it turns out, easier for agents to follow.',
    category: 'Agent design', date: '2026-10-14', author: 'mara', cover: 1,
    body: [
      ['p', "Most agent instructions start life as a private note. Someone on the operations team writes a paragraph, tweaks it until the first few runs look right, and moves on. Six weeks later nobody remembers why the agent refuses to touch invoices over a certain amount, or why it always copies the account owner on renewal emails."],
      ['p', "Instructions are the closest thing an agent has to a job description. If the people who share the work cannot read them, they cannot trust them. This post covers the format we recommend to every new Lumenfold workspace, and the habits that keep it readable as the agent grows."],
      ['h2', 'Start with the outcome, not the steps'],
      ['p', "The first line of every instruction set should say what a good day looks like. “Every new lead has a fit score and a drafted first reply within ten minutes” is a better opening than a list of tools to call. It gives reviewers a yardstick, and it gives the agent a way to judge its own work."],
      ['h3', 'Name the audience'],
      ['p', "Say who reads the agent's output. A reply drafted for a customer needs a different tone from a summary posted to an internal channel. One sentence is enough: **Readers are busy account managers who skim on their phones.**"],
      ['h3', 'Define the boundaries'],
      ['p', 'Boundaries are the part reviewers care about most, so give them their own short list. Keep each item to one line and make it testable.'],
      ['ul', [
        'Never send an external email without a human approving the draft.',
        'Do not change deal stages; suggest the change in the summary instead.',
        'Escalate any message that mentions legal action, refunds or data deletion.',
        'Stop and ask when a field you need is empty, rather than guessing.',
      ]],
      ['h2', 'Write for the reviewer first'],
      ['p', "The person reviewing a run is usually not the person who wrote the instructions. They open a run, see an odd decision, and want to find the line that caused it in under a minute. Short numbered sections make that possible, and they make diffs readable when the instructions change."],
      ['quote', 'If a new teammate cannot explain what the agent does after reading its instructions once, the agent cannot either.'],
      ['p', 'We keep instructions in a simple block format inside the studio. The labels are not magic; they are there so humans can scan.'],
      ['code', `## Outcome
Every inbound lead has a fit score and a draft reply within 10 minutes.

## Audience
Account managers reading on mobile. Keep summaries under 80 words.

## Boundaries
1. Drafts only. A human sends.
2. Escalate refunds, legal or deletion requests to #ops-review.`],
      ['h2', 'Keep a change log next to the instructions'],
      ['p', 'Every edit should come with a one-line reason. Lumenfold records the diff automatically, but the reason is what saves you later. A small table at the bottom of the instruction set works well for teams that review changes weekly.'],
      ['table', ['Date', 'Change', 'Reason'], [
        ['Sep 30', 'Added refund escalation', 'Two refund threads were answered without review'],
        ['Oct 7', 'Shortened summaries to 80 words', 'Managers said they stopped reading past the fold'],
        ['Oct 12', 'Removed tone examples', 'They made replies sound copied'],
      ]],
      ['h2', 'A review routine that sticks'],
      ['p', 'Instructions drift when nobody owns them. The teams that keep their agents sharp tend to follow the same short routine, usually on a Friday afternoon.'],
      ['ol', [
        'Open five random runs from the week and read them end to end.',
        'Mark any decision you would not have made yourself.',
        'Find the instruction line behind it, or note that one is missing.',
        'Make one edit, write the reason, and re-run the same five inputs.',
      ]],
      ['p', "One edit a week sounds slow. In practice it is the pace that keeps instructions short, because every addition has to earn its place, and it gives the whole team a shared picture of what the agent is for."],
      ['h2', 'Where to go next'],
      ['p', 'If you are starting from a blank page, the [field guide to first agents](/learn/what-is-an-ai-agent) walks through a full example. For teams with several agents already running, our post on [small agent crews](/blog/why-small-agent-crews-beat-one-giant-prompt) covers how to split instructions across roles.'],
    ],
  },
  {
    slug: 'why-small-agent-crews-beat-one-giant-prompt',
    title: 'Why small agent crews beat one giant prompt',
    description: 'Splitting a process across three focused agents made our runs cheaper, easier to debug and far more predictable.',
    category: 'Agent design', date: '2026-09-23', author: 'priya', cover: 2,
    body: [
      ['p', 'There is a moment in every agent project when the instructions pass two pages. The agent still works, mostly, but every new edge case adds another paragraph, and fixing one behaviour quietly breaks another. That is usually the point to stop growing one agent and start building a crew.'],
      ['p', 'A crew is a handful of agents that each own one part of a process and hand work to each other through a clear contract. Below is how we think about the split, and the trade-offs we have measured on our own internal workflows.'],
      ['h2', 'What a crew looks like'],
      ['p', 'Most processes break naturally into three roles. One agent gathers context, one decides what should happen, and one carries the decision out. The names change from team to team, but the shape holds up surprisingly well.'],
      ['ul', [
        '**Gatherer:** reads the request, pulls records from connected tools, and writes a short brief.',
        '**Decider:** reads only the brief and picks an action from a fixed list.',
        '**Doer:** performs the action, logs the result and reports back.',
      ]],
      ['h3', 'Why the brief matters'],
      ['p', "The brief is the contract between agents. Because the decider only sees the brief, you can read exactly what it knew when it made a call. That single change turned most of our debugging sessions from guesswork into reading a paragraph."],
      ['h3', 'Fixed action lists'],
      ['p', 'Giving the decider a closed list of actions sounds limiting. In practice it is the opposite: the list becomes the place where the team agrees on what the process is allowed to do, and anything outside it routes to a person.'],
      ['h2', 'What changed when we split'],
      ['p', 'We rebuilt our own inbound routing workflow both ways and ran each version on the same four weeks of requests. The numbers below are from that comparison, not a benchmark, so treat them as a direction rather than a promise.'],
      ['table', ['Measure', 'Single agent', 'Three-agent crew'], [
        ['Median cost per request', '$0.041', '$0.026'],
        ['Runs needing a human fix', '9.8%', '4.1%'],
        ['Time to find a bad decision', '14 min', '3 min'],
        ['Instruction length (words)', '1,860', '3 × 410'],
      ]],
      ['p', 'Cost fell mostly because the decider works from a short brief instead of every raw record. The drop in fixes came from the action list, which removed a whole class of creative but wrong answers.'],
      ['quote', 'The best thing about a crew is that every hand-off is a place you can stop and look.'],
      ['h2', 'Wiring the hand-offs'],
      ['p', 'In the studio each hand-off is a typed output. The gatherer must return a brief with the fields the decider expects, and the run fails loudly if it does not. A minimal contract looks like this:'],
      ['code', `brief:
  requester: string
  account_tier: "free" | "team" | "enterprise"
  summary: string   # max 60 words
  open_tickets: number
actions: [route_to_sales, route_to_support, ask_for_details, escalate]`],
      ['h2', 'When not to split'],
      ['p', 'Crews add moving parts. For short, single-step tasks, such as tagging a document or rewriting a paragraph, one agent is simpler and just as reliable. We use a rough rule before reaching for a crew:'],
      ['ol', [
        'The process has at least two distinct decisions.',
        'Different people would review different parts of it.',
        'You have already seen one fix break another behaviour.',
      ]],
      ['p', 'If two of the three are true, a crew is worth the extra setup. If not, keep the single agent and keep its instructions short.'],
      ['h2', 'Try it on one workflow'],
      ['p', 'Pick the workflow with the longest instructions and split off the gatherer first. It is the lowest-risk change, it makes the remaining agent easier to read, and it gives you a brief you can start reviewing straight away.'],
    ],
  },
  {
    slug: 'a-practical-checklist-for-escalating-to-a-human',
    title: 'A practical checklist for escalating to a human',
    description: 'Good escalation rules are specific, testable and boring. Here is the checklist we use when reviewing new agents.',
    category: 'Agent design', date: '2026-08-19', author: 'elif', cover: 3,
    body: [
      ['p', "Every agent needs a way to say “this one is not for me.” Without it, the agent either guesses or stalls, and both outcomes erode trust faster than any wrong answer. Escalation is not a failure mode; it is part of the job description."],
      ['p', 'We review every new customer agent against the same short checklist before it goes live. None of the items are clever. They are the ones that, when missing, show up in a support ticket a week later.'],
      ['h2', 'The five questions'],
      ['ol', [
        'Can the agent name the exact conditions that trigger an escalation?',
        'Does each escalation land with a named person or channel, not “the team”?',
        'Does the hand-off include everything the human needs to act without re-reading the thread?',
        'Is there a time limit after which an unanswered escalation is chased?',
        'Is every escalation counted, so the team can see the trend?',
      ]],
      ['h2', 'Writing triggers that are testable'],
      ['p', "A trigger like “escalate anything sensitive” cannot be tested, because nobody agrees on what sensitive means. A trigger like “escalate any message that mentions a refund over $500” can be tested with a handful of example messages."],
      ['h3', 'Use topics, amounts and confidence'],
      ['p', 'Most useful triggers fall into three groups. Topic triggers catch subjects the agent should never handle alone. Amount triggers catch anything over a money or quantity threshold. Confidence triggers catch cases where the agent itself is unsure.'],
      ['ul', [
        'Topic: legal threats, data deletion requests, security reports.',
        'Amount: refunds, discounts or credits above an agreed limit.',
        'Confidence: the agent scores its own certainty below a set level.',
      ]],
      ['h3', 'Test with real examples'],
      ['p', 'Collect ten past messages that should have escalated and ten that should not. Run them through the agent before launch and again after every instruction change. The studio keeps them as a saved test set so this takes a single click.'],
      ['h2', 'The hand-off message'],
      ['p', 'An escalation that just says “please review” moves the work without moving the context. We ask agents to send a short, structured note instead.'],
      ['code', `Escalation: refund over limit
Customer: Halden Outfitters (team plan, 3 yrs)
Asked for: $1,240 credit for a failed sync on Oct 2
What I checked: sync logs show 6h outage, 212 records delayed
Suggested next step: approve $620 credit, offer call
Waiting since: 09:14`],
      ['quote', 'The person picking up an escalation should be able to act within one minute of reading it.'],
      ['h2', 'Tracking escalation rates'],
      ['p', 'Escalation rate is one of the clearest health signals an agent has. A sudden rise often means an upstream change, such as a new product line or a pricing update, that the instructions do not cover yet.'],
      ['table', ['Escalation rate', 'What it usually means', 'What to do'], [
        ['Under 2%', 'Triggers may be too loose', 'Spot-check twenty runs for missed cases'],
        ['2% to 8%', 'Healthy for most support work', 'Review weekly'],
        ['Over 8%', 'Instructions are missing a case', 'Read the last ten escalations together'],
      ]],
      ['h2', 'Make escalation feel normal'],
      ['p', "Teams sometimes treat each escalation as a sign the agent is not good enough. It helps to say out loud that escalations are expected and useful. They are the clearest map you have of where the agent's job ends, and over time they tell you which parts of the job are ready to hand over next."],
      ['p', 'If you want a template to start from, our guide to [ticket triage](/topics/ticket-triage) includes a full escalation section you can copy.'],
    ],
  },
  {
    slug: 'measuring-agent-quality-without-a-data-science-team',
    title: 'Measuring agent quality without a data science team',
    description: 'You do not need a lab to know whether an agent is improving. A saved test set and three numbers go a long way.',
    category: 'Operations', date: '2026-10-07', author: 'daniel', cover: 4,
    body: [
      ['p', "When teams ask how to evaluate an agent, they often expect an answer involving statistics. The truth is that most operational agents can be measured well with a spreadsheet's worth of discipline. What matters is measuring the same way every time."],
      ['p', 'This post lays out the approach we recommend to teams without dedicated analysts. It takes about an afternoon to set up and a few minutes a week to maintain.'],
      ['h2', 'Build a saved test set'],
      ['p', 'A test set is a fixed list of real inputs with the answer a careful person would give. Twenty to fifty items is enough to start. The trick is to keep the list stable so that this week can be compared with last week.'],
      ['h3', 'What to include'],
      ['ul', [
        'Ten everyday cases that make up most of the volume.',
        'Ten awkward cases that have caused trouble before.',
        'Five cases that should always escalate.',
        'A handful of inputs with missing or messy data.',
      ]],
      ['h3', 'Who writes the answers'],
      ['p', 'The expected answers should come from the people who do the work today. If two of them disagree on an item, that is useful information: the instructions probably need a rule for it.'],
      ['h2', 'Three numbers worth tracking'],
      ['p', 'You can measure dozens of things. These three tell you most of what you need to know, and they are easy to explain in a team meeting.'],
      ['table', ['Number', 'How to measure', 'Good starting target'], [
        ['Pass rate', 'Share of test items the agent gets right', '85% or higher'],
        ['Escalation accuracy', 'Escalate items caught, divided by escalate items', '100%'],
        ['Cost per item', 'Total run cost divided by items processed', 'Stable week to week'],
      ]],
      ['quote', 'An evaluation you run every week beats a perfect one you run once.'],
      ['h2', 'Grading without arguments'],
      ['p', "Pass or fail sounds simple until two reviewers grade the same answer differently. Write a short rubric for each item type and keep it next to the test set. In Lumenfold you can attach the rubric to the evaluation so graders see it while they work."],
      ['code', `rubric: lead_reply
pass_if:
  - mentions the product the lead asked about
  - proposes a specific next step
  - under 120 words
fail_if:
  - promises pricing not on the public page`],
      ['h2', 'A weekly routine'],
      ['ol', [
        'Run the test set against the current agent version.',
        'Compare the three numbers with last week.',
        'Read every failed item, not just the count.',
        'Add one new item from this week’s real traffic.',
      ]],
      ['p', 'Adding one real item a week keeps the set honest. Over a quarter it grows into a record of every surprise the agent has met, which is exactly what you want to test against.'],
      ['h2', 'When to bring in more rigour'],
      ['p', 'Once an agent handles thousands of items a day, or makes decisions with financial impact, it is worth sampling live traffic as well as the test set. The studio can pull a random sample of live runs into a review queue each morning. Until then, the saved set and three numbers will carry you a long way.'],
      ['p', 'For a deeper look at building rubrics, see [structured outputs](/prompt-engineering/structured-outputs), which covers the same idea from the instruction side.'],
    ],
  },
  {
    slug: 'keeping-run-costs-predictable-as-usage-grows',
    title: 'Keeping run costs predictable as usage grows',
    description: 'Budgets, model routing and a few habits that keep the monthly bill boring even when volume doubles.',
    category: 'Operations', date: '2026-09-09', author: 'tomasz', cover: 5,
    body: [
      ['p', 'The first month of an agent rollout is cheap. Volume is low, the team is watching every run, and the bill barely registers. The surprise usually comes in month three, when a second team adopts the agent and nobody adjusted the settings that made sense for a pilot.'],
      ['p', 'Predictable costs are less about squeezing every cent and more about removing surprises. Here are the controls we set up with every customer before they scale.'],
      ['h2', 'Set budgets at three levels'],
      ['p', 'Lumenfold supports budgets per workspace, per agent and per run. Each one catches a different kind of problem, so it is worth setting all three even if the limits are generous at first.'],
      ['ul', [
        '**Workspace budget:** a monthly ceiling that finance can see and approve.',
        '**Agent budget:** a daily cap so one busy agent cannot starve the rest.',
        '**Run budget:** a hard stop for any single run that loops or stalls.',
      ]],
      ['h3', 'What happens at the limit'],
      ['p', 'When a budget is reached the agent pauses and posts a note to its owner. Runs already in progress finish their current step. Nothing is dropped; queued work waits until the budget resets or someone raises it.'],
      ['h2', 'Route models by task'],
      ['p', "Not every step needs the most capable model. Reading a form and pulling out five fields is a different job from drafting a delicate reply. Routing each step to a suitable model is the single biggest lever on cost."],
      ['table', ['Step type', 'Typical model tier', 'Share of steps'], [
        ['Extract and classify', 'Small, fast', '55%'],
        ['Summarise and compare', 'Medium', '30%'],
        ['Draft customer-facing text', 'Large', '15%'],
      ]],
      ['p', 'In our own workflows this mix costs about a third of running every step on the largest tier, with no measurable change in pass rate on the test set.'],
      ['h3', 'Configuring routing'],
      ['code', `routing:
  default: medium
  rules:
    - when: step.kind == "extract"
      use: small
    - when: step.output.audience == "customer"
      use: large`],
      ['h2', 'Watch cost per outcome, not cost per run'],
      ['quote', 'A run that costs twice as much but saves a human ten minutes is a bargain. A cheap run that needs fixing is not.'],
      ['p', 'Cost per run is easy to measure and easy to misread. Cost per useful outcome, such as a qualified lead or a resolved ticket, tells you whether the agent is worth what it costs. The cost explorer can group runs by outcome tag for exactly this reason.'],
      ['h2', 'A monthly cost review'],
      ['ol', [
        'Sort agents by total spend and look at the top three.',
        'Check which steps account for most of their cost.',
        'Ask whether any of those steps could use a smaller model.',
        'Compare cost per outcome with the previous month.',
      ]],
      ['p', 'Twenty minutes a month is usually enough. The goal is not to cut the bill to the bone; it is to make sure every line on it is there on purpose.'],
      ['h2', 'Plan for the second team'],
      ['p', "Before a second team starts using an agent, copy it rather than sharing it. Separate copies get separate budgets and separate reports, and the original team's numbers stay clean. When both versions settle, you can merge them back with a clear picture of what each team needs."],
    ],
  },
  {
    slug: 'rolling-out-your-first-agent-in-thirty-days',
    title: 'Rolling out your first agent in thirty days',
    description: 'A week-by-week plan for moving one workflow from a whiteboard sketch to a supervised agent in production.',
    category: 'Operations', date: '2026-07-29', author: 'elif', cover: 6,
    body: [
      ['p', 'Thirty days is enough time to put one agent into real, supervised production. It is not enough time to automate a department, and trying to do both at once is the most common reason rollouts stall. This plan keeps the scope narrow on purpose.'],
      ['p', 'We use the same four-week shape with most new customers. Adjust the pace to your team, but try to keep the order.'],
      ['h2', 'Week one: pick and map'],
      ['p', 'Choose a workflow that is repetitive, well understood and low risk if something goes wrong. Then sit with the people who do it today and write down every step, including the ones they do without thinking.'],
      ['ul', [
        'List the tools touched at each step.',
        'Note every decision and who makes it.',
        'Collect twenty real examples to use as a test set.',
      ]],
      ['h3', 'Good first workflows'],
      ['p', 'Lead enrichment, ticket tagging, meeting note summaries and invoice matching all make strong first projects. They have clear inputs, clear outputs and a person who can check the result in seconds.'],
      ['h2', 'Week two: build in draft mode'],
      ['p', 'Build the agent so that every output is a draft for a human to approve. Draft mode lets the team see real results without any risk, and it produces the review data you need for week three.'],
      ['code', `agent: lead_enricher
mode: draft          # outputs wait for approval
reviewers: [ana, ravi]
test_set: leads_sept_20
budget:
  per_run: 0.05
  per_day: 15.00`],
      ['h3', 'Daily check-ins'],
      ['p', 'A ten-minute check-in each day of week two keeps momentum. Review a few drafts together, note what felt off, and make one change to the instructions.'],
      ['h2', 'Week three: measure and tighten'],
      ['p', 'By now the agent has produced a few hundred drafts. Use them to decide whether it is ready to act on its own for some cases.'],
      ['table', ['Signal', 'Ready to go live', 'Keep in draft'], [
        ['Approval rate without edits', 'Above 90%', 'Below 80%'],
        ['Escalations caught', 'All of them', 'Any missed'],
        ['Reviewer confidence', '“I skim these now”', '“I still read every one”'],
      ]],
      ['quote', 'Go live with the easy cases first. Let the hard ones stay in draft for as long as they need to.'],
      ['h2', 'Week four: go live, narrowly'],
      ['ol', [
        'Switch the agent to act on its own for the most common case only.',
        'Keep everything else in draft mode.',
        'Sample ten live runs a day for the first week.',
        'Agree on the next case to move out of draft.',
      ]],
      ['p', 'By the end of the month you have one agent doing real work, a test set, a review habit and a clear list of what to hand over next. That foundation is worth more than a wider launch that nobody trusts.'],
      ['h2', 'After day thirty'],
      ['p', 'Most teams add one new case per fortnight after launch. The second agent usually takes half as long as the first, because the habits are already in place. Our [events page](/events) lists upcoming workshops if you would like to walk through a rollout plan with us.'],
    ],
  },
  {
    slug: 'how-a-freight-broker-cleared-its-quote-backlog',
    title: 'How a regional freight broker cleared its quote backlog',
    description: 'Tidewater Freight went from a two-day quote queue to same-hour replies by pairing its desk team with two agents.',
    category: 'Customer stories', date: '2026-10-02', author: 'jonah', cover: 7,
    body: [
      ['p', 'Tidewater Freight moves palletised goods across a dozen states with a quoting desk of six people. Each morning the desk opened an inbox of eighty to a hundred quote requests, and by Friday the queue regularly stretched back two days. Customers who waited that long had usually booked elsewhere.'],
      ['p', 'The team did not want to replace the desk. They wanted the desk to spend its time on the conversations that win business, not on copying addresses between systems. Here is how they set it up.'],
      ['h2', 'The problem in numbers'],
      ['table', ['Measure', 'Before', 'After eight weeks'], [
        ['Median time to first quote', '19 hours', '42 minutes'],
        ['Quotes sent per desk member per day', '14', '31'],
        ['Requests missing key details', '38%', '11%'],
        ['Win rate on quoted lanes', '22%', '29%'],
      ]],
      ['p', 'The biggest change was not speed alone. Because the agents asked for missing details straight away, far fewer quotes went out on guesses that later had to be revised.'],
      ['h2', 'Two agents, one desk'],
      ['p', 'Tidewater split the work between two agents with very different jobs.'],
      ['h3', 'The intake agent'],
      ['p', 'The intake agent reads every incoming request, whether it arrives by email, web form or a forwarded spreadsheet. It pulls out origin, destination, pallet count, weight and pickup window, and checks each against the rate tables.'],
      ['ul', [
        'If anything is missing, it replies to the customer within minutes asking for it.',
        'If the lane is unusual, it flags the request for a senior broker.',
        'Otherwise it writes a structured brief for the pricing agent.',
      ]],
      ['h3', 'The pricing agent'],
      ['p', "The pricing agent reads the brief, applies the current lane rates and fuel surcharge, and drafts a quote in Tidewater's usual format. A desk member approves or edits each draft before it is sent, which takes most of them under a minute."],
      ['quote', 'We stopped being a data-entry team that occasionally talked to customers. Now it is the other way round.'],
      ['h2', 'What they configured'],
      ['p', 'The desk lead kept the configuration deliberately small. The key setting was a margin floor that the pricing agent could never go below, no matter what the rate tables said.'],
      ['code', `pricing:
  margin_floor: 0.12
  surcharge_source: weekly_fuel_index
  approval: required
  escalate_if:
    - lane.history_count < 3
    - weight_kg > 18000`],
      ['h2', 'Lessons from the rollout'],
      ['ol', [
        'Start with the most common lanes and leave the rest in manual mode.',
        'Let the desk rewrite the quote template before the agent uses it.',
        'Review every edited draft for the first two weeks and update the rules.',
        'Share the weekly numbers with the whole desk, not just managers.',
      ]],
      ['p', 'The desk lead credits the last point with most of the adoption. Once the team could see their own quote counts climbing, they started suggesting new rules themselves.'],
      ['h2', 'What comes next'],
      ['p', 'Tidewater is now piloting a third agent that follows up on quotes that have not been accepted after forty-eight hours. Early results suggest it recovers around one in ten of those lanes, mostly from customers who simply forgot to reply.'],
    ],
  },
  {
    slug: 'a-support-team-that-answers-overnight-tickets-by-sunrise',
    title: 'Inside a support team that answers overnight tickets by sunrise',
    description: 'Brightpath Learning serves teachers in three time zones. Agents now draft every overnight reply before the morning shift logs in.',
    category: 'Customer stories', date: '2026-08-27', author: 'jonah', cover: 8,
    body: [
      ['p', "Brightpath Learning makes classroom planning software used by schools across three time zones. Its support team of nine works a single day shift, which meant that teachers who wrote in after school often waited until the next afternoon for a reply. During term start, that wait could double."],
      ['p', 'Hiring a night shift was on the table. Instead, the team tried something smaller first: an agent that prepares every overnight ticket so the morning shift starts with answers, not a queue.'],
      ['h2', 'How the overnight agent works'],
      ['p', 'Between six in the evening and seven in the morning, every new ticket passes through the agent. It does three things in order.'],
      ['ol', [
        'Reads the ticket and finds the teacher’s school, plan and recent activity.',
        'Searches the help centre and past resolved tickets for a matching answer.',
        'Drafts a reply and sorts the ticket into one of four morning queues.',
      ]],
      ['h3', 'The four queues'],
      ['ul', [
        '**Send as is:** the draft fully answers a common question.',
        '**Check and send:** the draft is likely right but touches account details.',
        '**Needs a person:** the issue is new, emotional or complex.',
        '**Urgent:** anything blocking a lesson today goes to the top.',
      ]],
      ['h2', 'The first morning'],
      ['p', 'On the first live morning the team found 61 overnight tickets waiting, 38 of them with drafts in the “send as is” queue. Two people cleared that queue in twenty minutes and joined the rest of the team on the harder tickets.'],
      ['quote', 'It felt like someone had worked the night shift and left really good notes.'],
      ['h2', 'Results after one term'],
      ['table', ['Measure', 'Previous term', 'This term'], [
        ['Median first reply, overnight tickets', '16.5 hours', '2.1 hours'],
        ['Tickets resolved in one reply', '41%', '63%'],
        ['Satisfaction score', '4.2 / 5', '4.6 / 5'],
        ['Overtime hours at term start', '112', '18'],
      ]],
      ['h2', 'Keeping the tone right'],
      ['p', 'Teachers are a warm, busy audience, and the team cared a lot about replies sounding like Brightpath. They gave the agent a short style note rather than long examples, which they found made replies sound copied.'],
      ['code', `style:
  greeting: first name if known
  length: under 120 words unless steps are needed
  steps: numbered, one action each
  sign_off: "Brightpath support"
  avoid: ["unfortunately", "as per", "kindly"]`],
      ['h3', 'Reviewing drafts together'],
      ['p', 'Every Monday the team reviews ten drafts that were edited before sending. Each edit becomes either a help centre fix, an instruction change or a note that the case should stay with a person.'],
      ['h2', 'What they would do differently'],
      ['p', 'The team lead says the one thing she would change is starting with fewer queues. Four was right in the end, but two would have been easier to learn in the first week. She also recommends tagging every overnight ticket so you can compare it with the day shift fairly.'],
      ['p', 'Brightpath is now testing the same setup for weekend tickets, with the same rule: the agent drafts, a person decides.'],
    ],
  },
  {
    slug: 'what-finance-teams-learned-from-automating-invoice-checks',
    title: 'What finance teams learned from automating invoice checks',
    description: 'Three finance leads share what surprised them after handing first-pass invoice matching to an agent.',
    category: 'Customer stories', date: '2026-07-15', author: 'daniel', cover: 9,
    body: [
      ['p', 'Invoice matching is one of the most requested first projects we see. It is repetitive, rules-based and painful at month end. We spoke with finance leads at three Lumenfold customers, a manufacturer, a retail group and a software company, about what actually changed once an agent took the first pass.'],
      ['p', 'Their answers overlapped more than we expected, and the surprises were rarely about the technology.'],
      ['h2', 'Surprise one: the rules were never written down'],
      ['p', 'Each team believed it had a clear matching policy. Each discovered, while writing instructions, that a lot of the real policy lived in people’s heads.'],
      ['ul', [
        'Which suppliers are allowed a small price variance, and how small.',
        'When a partial delivery should hold the whole invoice.',
        'Which cost centres need a second approver above a threshold.',
      ]],
      ['p', 'Writing these down took longer than building the agent. All three leads said it was the most valuable part of the project.'],
      ['h2', 'Surprise two: exceptions got better attention'],
      ['p', "With routine matches handled, the team's time shifted to the exceptions. Disputes were raised sooner and suppliers got clearer explanations, because someone finally had time to write them."],
      ['quote', 'We used to fight fires for the last four days of every month. Now we mostly have conversations.'],
      ['h2', 'How the matching works'],
      ['p', 'The agent compares each invoice line with the purchase order and the goods receipt. A line passes when all three agree within the tolerance for that supplier.'],
      ['table', ['Check', 'Tolerance', 'If it fails'], [
        ['Quantity', 'Exact', 'Hold and ask the warehouse'],
        ['Unit price', 'Up to 1.5% for listed suppliers', 'Route to buyer'],
        ['Tax code', 'Exact', 'Route to tax reviewer'],
        ['Total', 'Within $2 rounding', 'Auto-pass'],
      ]],
      ['h3', 'A sample rule'],
      ['code', `match:
  require: [po_number, receipt_id]
  price_variance:
    default: 0
    suppliers:
      listed_partners: 0.015
  on_fail: route_to_owner`],
      ['h2', 'Surprise three: auditors liked it'],
      ['p', 'All three teams were nervous about their first audit after the change. In each case the auditors were pleased to find a complete, readable log of every decision, including the rule that applied and the person who approved any exception.'],
      ['h2', 'Advice for teams starting out'],
      ['ol', [
        'Write your matching policy down before you build anything.',
        'Start with your ten largest suppliers, which usually cover most volume.',
        'Keep humans approving every payment for the first two cycles.',
        'Show the decision log to your auditors early.',
      ]],
      ['p', 'Our [invoice matching guide](/topics/invoice-matching) covers the setup in more detail, including a starter policy template.'],
    ],
  },
  {
    slug: 'introducing-run-replays-for-every-agent-step',
    title: 'Introducing run replays for every agent step',
    description: 'Step through any past run exactly as the agent saw it, including the context it read and the tools it called.',
    category: 'Product notes', date: '2026-10-09', author: 'mara', cover: 10,
    body: [
      ['p', 'When an agent makes a decision you did not expect, the first question is always the same: what did it know at the time? Until now, answering that meant piecing together logs from several places. Today we are releasing run replays, which let you step through any past run exactly as it happened.'],
      ['p', 'Replays are available on every plan, for every run in the last ninety days.'],
      ['h2', 'What a replay shows'],
      ['p', 'Open any run and choose Replay. You will see a timeline of every step, and for each one:'],
      ['ul', [
        'The exact context the agent read, including retrieved documents.',
        'Every tool call, with its inputs and the response it received.',
        'The model used and the cost of the step.',
        'The agent’s own short note on why it chose that action.',
      ]],
      ['h3', 'Comparing two runs'],
      ['p', 'You can pin two replays side by side. This is especially useful after an instruction change: run the same input before and after, and see exactly where the paths diverge.'],
      ['h3', 'Sharing a replay'],
      ['p', 'Each replay has a link you can share with anyone in your workspace. Sensitive fields stay masked according to your workspace data rules, so you can share freely with reviewers who do not need full access.'],
      ['h2', 'Why we built it'],
      ['quote', 'Trust in an agent comes from being able to check its work, not from being told it is right.'],
      ['p', 'In customer interviews, the most common reason teams hesitated to give agents more responsibility was not accuracy. It was the effort involved in understanding mistakes. Replays are designed to cut that effort from minutes to seconds.'],
      ['h2', 'Using replays from the API'],
      ['p', 'Replays are also available through the API, so you can pull them into your own review tools or attach them to tickets automatically.'],
      ['code', `GET /v1/runs/{run_id}/replay

{
  "run_id": "run_8f2c",
  "steps": [
    { "index": 0, "kind": "read", "tokens": 1840 },
    { "index": 1, "kind": "tool", "name": "crm.lookup" }
  ]
}`],
      ['h2', 'Limits and retention'],
      ['table', ['Plan', 'Replay retention', 'Side-by-side compare'], [
        ['Free', '14 days', 'Two runs'],
        ['Team', '90 days', 'Two runs'],
        ['Enterprise', 'Configurable', 'Up to four runs'],
      ]],
      ['h2', 'Getting started'],
      ['ol', [
        'Open the run history for any agent.',
        'Pick a run and choose Replay in the top bar.',
        'Use the arrow keys to move between steps.',
      ]],
      ['p', 'We would love to hear how you use replays. Reply to the in-app announcement or drop a note in the community forum, and see the [changelog](/changelog) for the full list of smaller improvements that shipped alongside it.'],
    ],
  },
  {
    slug: 'shared-knowledge-folders-now-sync-every-fifteen-minutes',
    title: 'Shared knowledge folders now sync every fifteen minutes',
    description: 'Knowledge folders connected to your document tools now refresh four times an hour, with a clear record of what changed.',
    category: 'Product notes', date: '2026-08-12', author: 'priya', cover: 11,
    body: [
      ['p', 'Agents are only as current as the documents they read. Until this week, shared knowledge folders refreshed once an hour, which was fine for policy documents but frustrating for teams whose price lists or schedules change during the day. Folders now sync every fifteen minutes by default.'],
      ['h2', 'What changed'],
      ['ul', [
        'Default sync interval reduced from sixty minutes to fifteen.',
        'Each sync records which documents were added, edited or removed.',
        'Agents can cite the version of a document they read.',
        'Owners can trigger a manual sync from the folder page.',
      ]],
      ['h3', 'Version-aware citations'],
      ['p', 'When an agent quotes a document, the citation now includes the sync time. If a reviewer sees an outdated answer, they can tell at a glance whether the document or the agent was at fault.'],
      ['h3', 'Change summaries'],
      ['p', 'Every sync produces a short summary of what changed. You can subscribe to these summaries in a team channel, which several beta teams used to catch accidental edits to important documents.'],
      ['h2', 'How sync works under the hood'],
      ['p', "Rather than re-reading every file, we now ask each connected source for changes since the last sync. Only changed documents are re-processed. For most folders this makes each sync faster than the old hourly one, even though it runs four times as often."],
      ['table', ['Folder size', 'Old hourly sync', 'New 15-minute sync'], [
        ['Under 500 documents', '40 s', '6 s'],
        ['500 to 5,000 documents', '4 min', '22 s'],
        ['Over 5,000 documents', '18 min', '1 min 40 s'],
      ]],
      ['quote', 'The best sync is the one nobody has to think about.'],
      ['h2', 'Choosing a different interval'],
      ['p', 'Some folders rarely change, and some teams prefer to control exactly when agents see new content. You can set the interval per folder.'],
      ['code', `knowledge_folder: pricing_sheets
sync:
  interval: 15m     # options: 5m, 15m, 1h, 1d, manual
  notify: "#pricing-updates"
  on_delete: keep_last_version`],
      ['p', 'The five-minute option is available on Enterprise plans for folders under two thousand documents.'],
      ['h2', 'What it means for your agents'],
      ['ol', [
        'No action is needed; existing folders switch automatically this week.',
        'Agents that cache documents within a run are unaffected.',
        'Long-running agents will pick up changes on their next step.',
      ]],
      ['p', 'If you notice anything unexpected, the folder activity log will show every sync and its summary. As always, let us know in the forum what you would like to see next.'],
    ],
  },
  {
    slug: 'a-new-home-for-evaluations-inside-the-studio',
    title: 'A new home for evaluations inside the studio',
    description: 'Test sets, rubrics and results now live next to the agent they measure, so checking quality becomes part of editing.',
    category: 'Product notes', date: '2026-06-24', author: 'daniel', cover: 12,
    body: [
      ['p', 'Evaluations used to live on their own page, a few clicks away from the agent they measured. That distance mattered more than we expected: teams edited instructions in one place and checked results in another, and the second step was often skipped. Starting today, evaluations sit in a panel right beside the agent editor.'],
      ['h2', 'What is in the panel'],
      ['ul', [
        'The saved test set for the agent, with expected answers.',
        'Rubrics attached to each item type.',
        'A results history showing pass rate over time.',
        'A one-click run against the draft version you are editing.',
      ]],
      ['h3', 'Run before you publish'],
      ['p', 'When you edit an agent, the publish button now shows the last evaluation result for the draft. If you have not run one, it tells you. You can still publish without running it; we simply make the choice visible.'],
      ['h3', 'Compare drafts'],
      ['p', 'Results from the current published version and your draft appear side by side, with any item that changed outcome highlighted. Most teams told us this was the view they had been building in spreadsheets.'],
      ['h2', 'Designed with customers'],
      ['p', 'We worked with fourteen teams over two months on the panel design. A few patterns came up again and again.'],
      ['table', ['What teams asked for', 'What we built'], [
        ['“Show me only what changed”', 'Changed items are pinned to the top'],
        ['“Let reviewers grade without edit access”', 'A grader role with read-only agent access'],
        ['“Keep old results”', 'Full results history per agent version'],
      ]],
      ['quote', 'The fastest way to make a habit stick is to put it where the work already happens.'],
      ['h2', 'Defining an evaluation'],
      ['p', 'If you prefer to manage evaluations as code, the same definitions can be stored alongside your agent configuration.'],
      ['code', `evaluation: lead_reply_quality
test_set: leads_core_40
rubric: lead_reply
schedule: on_publish
alert_if:
  pass_rate_below: 0.85`],
      ['h2', 'Moving existing evaluations'],
      ['ol', [
        'Existing test sets move into the panel automatically.',
        'Rubrics attach to the agents that used them most recently.',
        'Results history is preserved back to the first run.',
      ]],
      ['p', 'The old evaluations page will stay available until the end of next quarter as a read-only archive. For a broader look at measuring quality, see our post on [measuring agents without a data science team](/blog/measuring-agent-quality-without-a-data-science-team).'],
    ],
  },
]

// Extra sections spliced in before each post's closing h2, so every body lands in the 600–900 word range.
const extras = {
  'introducing-run-replays-for-every-agent-step': [
    ['h2', 'Three ways teams already use replays'],
    ['p', 'During the beta, forty workspaces used replays on real agents. Three habits came up in almost every interview, and they are a good place to start if you are not sure where replays fit into your week.'],
    ['h3', 'Explaining a decision to a customer'],
    ['p', 'Support leads open the replay for a disputed reply, find the help article the agent relied on, and quote it back in their response. One lead told us this turned a twenty-minute investigation into a two-minute one, and made the conversation with the customer noticeably calmer.'],
    ['h3', 'Reviewing an instruction change'],
    ['p', 'Before publishing an edit, owners replay the same five inputs on the old and new versions. Side by side, it is obvious whether the change did what was intended, and whether it touched anything it should not have. Several teams now attach those paired replays to every change request.'],
    ['h3', 'Onboarding a new reviewer'],
    ['p', 'New reviewers learn faster from a handful of annotated replays than from reading instructions alone. A replay shows the instructions in action, including the moments where the agent hesitated and the escalations it chose to raise. Some teams keep a short playlist of replays for exactly this purpose.'],
    ['p', 'None of these habits need extra setup. If your team already reviews runs, replays simply make each review faster and easier to share.'],
  ],
  'measuring-agent-quality-without-a-data-science-team': [
    ['h2', 'Reading the trend, not the number'],
    ['p', 'A single pass rate tells you very little on its own. Eighty-seven percent might be excellent for a new triage agent and worrying for a mature one. What matters is the direction over several weeks, and the reason behind any sudden change.'],
    ['p', 'When the pass rate drops, look first at what changed outside the agent. A new product launch, a pricing update or a reorganised help centre often explains the dip before you touch a single instruction. When it rises sharply, check that the test set has not quietly become easier.'],
    ['p', 'Keep a short note beside each weekly result. Six months later, those notes are the best record you have of how the agent and the business changed together.'],
  ],
  'how-a-freight-broker-cleared-its-quote-backlog': [
    ['h2', 'How the desk changed its day'],
    ['p', 'Before the agents, the desk started each morning by sorting the inbox. Now the first hour goes on calls with customers whose lanes are unusual or whose volumes are growing, which is where the brokers say they add the most value.'],
    ['p', 'The desk lead also changed how she measures the team. Quotes sent per person still matters, but she now tracks how many conversations each broker has with a customer before the quote goes out. That number has roughly doubled.'],
    ['quote', 'The agents took the copying. We kept the conversations, and those are what win the freight.'],
    ['p', 'Tidewater kept one rule from the start: any quote above a set value is reviewed by a senior broker, whatever the agent recommends. Nobody has suggested removing it.'],
  ],
  'why-small-agent-crews-beat-one-giant-prompt': [
    ['h2', 'Reviewing a crew'],
    ['p', 'Crews change how reviews feel. Instead of reading one long run, reviewers read three short ones, each with a clear job. Most teams find that the decider is where they spend their time, because that is where judgement lives. The gatherer and doer tend to settle quickly and need only occasional spot checks.'],
  ],
  'keeping-run-costs-predictable-as-usage-grows': [
    ['h2', 'Explaining the bill to finance'],
    ['p', 'Finance teams rarely object to agent costs. They object to costs they cannot explain. A short monthly note that lists each agent, what it produced and what it cost per outcome is usually enough to turn a difficult conversation into a routine one.'],
    ['p', 'The cost explorer can export exactly this view. Several customers send it to their finance partner on the first working day of each month, alongside a sentence on anything unusual, such as a seasonal spike in ticket volume.'],
    ['p', 'It also helps to agree in advance what counts as an outcome for each agent, so the numbers mean the same thing to everyone who reads them.'],
  ],
  'a-support-team-that-answers-overnight-tickets-by-sunrise': [
    ['h2', 'What the team did with the time'],
    ['p', 'The hours saved at the start of each day did not disappear. The team lead set aside two of them each week for help centre improvements, focusing on the articles the agent relied on most. Better articles made better drafts, which saved more time, and the loop has kept going all term.'],
    ['p', 'The team also started a short weekly note to the product group, listing the issues that came up most often overnight. Two of those issues have since been fixed in the product itself, which removed them from the queue entirely.'],
    ['quote', 'The best ticket is the one that never needs to be written.'],
    ['p', 'Morale improved too. The morning shift no longer starts behind, and the team says the first hour of the day now feels like a head start rather than a catch-up.'],
  ],
  'a-practical-checklist-for-escalating-to-a-human': [
    ['h2', 'Chasing escalations that stall'],
    ['p', 'An escalation nobody picks up is worse than none at all, because the customer believes someone is looking. Set a time limit for each trigger type and let the agent chase the named owner once, then a backup, before raising it in a team channel. The studio can do this automatically.'],
  ],
  'shared-knowledge-folders-now-sync-every-fifteen-minutes': [
    ['h2', 'Notes from the beta'],
    ['p', 'Twenty-two teams tried fifteen-minute sync for a month before release. The most common use was price lists: sales operations teams update them several times a day during promotions, and agents quoting from an hour-old sheet was the complaint we heard most often.'],
    ['p', 'Scheduling teams were the second group. Delivery windows, shift rotas and room bookings change constantly, and agents that answer questions about them need to see the latest version. For these teams the change summaries turned out to be as useful as the faster sync itself.'],
    ['h3', 'An unexpected benefit'],
    ['p', 'Several beta teams used the change summaries to spot mistakes in their own documents. When a summary reported that an entire section had been removed from a policy page, someone noticed within minutes rather than days. One team now treats the summary channel as a light review step for every important document.'],
    ['p', 'We also heard that version-aware citations made reviewers more comfortable approving drafts. Knowing exactly which version of a document an answer came from removed a whole category of uncertainty.'],
    ['p', 'Support teams were the third group, mostly for release notes and known-issue pages that change during an incident.'],
    ['p', 'A few teams asked for the opposite: slower sync for folders that hold approved policy text, so that edits only reach agents after a weekly review. Manual sync covers that case, and a scheduled daily option is on the roadmap for teams that want something in between.'],
  ],
  'rolling-out-your-first-agent-in-thirty-days': [
    ['h2', 'Common reasons rollouts slip'],
    ['p', 'Most delays come from the same few places. The workflow chosen in week one turns out to depend on a tool nobody has access to. The test set is assembled from ideal examples rather than real ones. Or the team waits for a perfect pass rate before going live on any case at all.'],
    ['ul', [
      'Check tool access on day one, before mapping anything.',
      'Pull test examples from last month’s real traffic.',
      'Go live on one case when it is good enough, not perfect.',
    ]],
    ['p', 'None of these are technical problems. They are planning habits, and they are easy to fix once you know to look for them.'],
    ['p', 'If a slip does happen, shorten the scope rather than the review. A narrower launch on time teaches the team more than a wide one a month late.'],
  ],
  'what-finance-teams-learned-from-automating-invoice-checks': [
    ['h2', 'What changed for suppliers'],
    ['p', 'Suppliers noticed the difference before anyone told them. Payments that used to arrive in a batch at the end of the month now arrive steadily, because routine invoices pass as soon as the goods receipt is logged. Two of the three teams said supplier queries about payment status fell by more than half within a quarter.'],
    ['p', 'Exceptions also became easier for suppliers to resolve. Instead of a generic “invoice on hold” message, they now receive a short note naming the line, the expected value and the value on the invoice. Most disputes are settled in a single reply.'],
    ['h3', 'A note on headcount'],
    ['p', 'None of the three teams reduced headcount. Each used the time to take on work that had been waiting, from supplier reviews to better cash forecasting. One lead put it simply: the team finally has time to do the parts of finance that need a person.'],
    ['quote', 'Nobody joined finance to retype invoice numbers.'],
    ['p', 'The next step for two of the teams is credit notes, which follow similar rules but arrive far less predictably. Both plan to start in draft mode again, exactly as they did with invoices.'],
    ['p', 'All three leads also mentioned morale. Month-end used to mean late nights and short tempers. With the routine work handled, the close is now a planned, predictable week, and one team has stopped scheduling overtime for it altogether.'],
  ],
  'a-new-home-for-evaluations-inside-the-studio': [
    ['p', 'This release is the result of a simple observation: the teams with the most reliable agents were the ones who tested most often, and they tested most often when testing was easy.'],
    ['h2', 'What changed for beta teams'],
    ['p', 'The clearest result from the beta was frequency. Teams that previously ran evaluations once or twice a month ran them on almost every publish once the panel sat beside the editor. Nobody asked them to; the button was simply there.'],
    ['p', 'More frequent runs caught problems earlier. Several teams found that a small wording change had shifted how an agent handled an edge case, and fixed it before it reached a single customer. Previously, those changes surfaced as support tickets a week or two later.'],
    ['h3', 'Graders without edit access'],
    ['p', 'The new grader role was the second most used feature. Subject experts, such as senior support staff or finance reviewers, can now grade results without being able to change the agent. Teams told us this made it far easier to involve the people who actually know what a good answer looks like.'],
    ['ul', [
      'Graders see the rubric beside each item while they work.',
      'Grades are recorded with the grader’s name and a timestamp.',
      'Disagreements between graders are flagged for the owner.',
    ]],
    ['p', 'If you already have test sets, they are waiting for you in the new panel.'],
    ['p', 'We also learned that graders want context. Each item now shows the input, the expected answer, the agent output and the rubric on a single card, with the previous grade for the same item if there is one. Grading a batch of forty items takes most reviewers around fifteen minutes.'],
  ],
}
const withExtras = p => {
  const x = extras[p.slug]
  if (!x) return p.body
  const last = p.body.map(b => b[0]).lastIndexOf('h2')
  return [...p.body.slice(0, last), ...x, ...p.body.slice(last)]
}

// Reading time is derived from the body (prose, lists, tables, code) at 200 words a minute.
const flat = x => (Array.isArray(x) ? x.map(flat).join(' ') : String(x ?? ''))
export const wordCount = body => (body.map(b => flat(b.slice(1))).join(' ').match(/\S+/g) || []).length
export const readingTime = body => Math.max(1, Math.round(wordCount(body) / 200))

export const posts = rawPosts
  .map(p => ({ ...p, body: withExtras(p) }))
  .map(p => ({ ...p, author: authors[p.author], cover: `/assets/photos/ed-blog-${p.cover}.webp`, minutes: readingTime(p.body) }))
  .sort((a, b) => b.date.localeCompare(a.date))

export const formatDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
export const formatShortDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/* ---------- Learn, prompt engineering, topics (T8 / T9 mapped to T1 text-only + T2 variants) ---------- */
export const learnIndex = { title: 'Learn', body: 'Plain-language guides to the ideas behind agents, written for the people who run them.' }
export const topicsIndex = { title: 'Topics', body: 'Short explainers on the everyday workflows teams hand to agents first.' }

export const guideCta = { label: 'Start building free', notes: ['Free to start', 'No card needed'] }

export const guides = [
  {
    section: 'learn', slug: 'what-is-an-ai-agent',
    title: 'What is an AI agent, really?',
    description: 'A grounded explanation of what separates an agent from a chatbot or a script, with a worked example from a real workflow.',
    body: [
      ['h2', 'A working definition'],
      ['p', 'An AI agent is software that is given a goal, a set of tools and some rules, and then decides which steps to take to reach the goal. The important word is **decides**. A script follows the same path every time. An agent chooses its path based on what it finds along the way.'],
      ['p', 'That choice is what makes agents useful for messy, real-world work, and it is also why they need clear boundaries and a way to show their reasoning.'],
      ['h2', 'Agents, chatbots and scripts'],
      ['table', ['', 'Script', 'Chatbot', 'Agent'], [
        ['Follows a fixed path', 'Yes', 'No', 'No'],
        ['Takes actions in other tools', 'Yes', 'Rarely', 'Yes'],
        ['Adapts to what it finds', 'No', 'In conversation', 'Yes'],
        ['Works without a person present', 'Yes', 'No', 'Yes'],
      ]],
      ['h2', 'The four parts of an agent'],
      ['ol', [
        '**Goal:** what a finished job looks like.',
        '**Tools:** the systems it may read from and write to.',
        '**Instructions:** the rules, tone and boundaries it follows.',
        '**Memory:** what it remembers between steps and between runs.',
      ]],
      ['h2', 'A worked example'],
      ['p', 'Imagine an agent that prepares account managers for renewal calls. Its goal is a one-page brief in the manager’s inbox two days before each call. Its tools are the CRM, the support desk and the billing system. Its instructions say what goes in the brief and what it must never include.'],
      ['code', `goal: renewal brief, 2 days before call
tools: [crm.read, support.read, billing.read, email.draft]
never: [discount offers, internal margin data]`],
      ['p', 'Each run, the agent looks up the account, decides which support tickets are worth mentioning, notices if usage has dropped, and writes the brief. Two accounts rarely produce the same steps.'],
      ['h2', 'Where agents fit best'],
      ['ul', [
        'Work that follows a pattern but varies in the details.',
        'Tasks that touch several tools in a row.',
        'Jobs where a person can check the result quickly.',
      ]],
      ['quote', 'Start with work you could explain to a new hire in an afternoon.'],
      ['h2', 'Next steps'],
      ['p', 'If you want to see the idea in practice, read our guide to [agent memory](/learn/agent-memory-explained) or browse the [blog](/blog) for stories from teams running agents today.'],
    ],
  },
  {
    section: 'learn', slug: 'agent-memory-explained',
    title: 'Agent memory, explained without jargon',
    description: 'How agents remember within a run, across runs and across a whole team, and how to decide what they should forget.',
    body: [
      ['h2', 'Why memory matters'],
      ['p', 'A person doing the same job every day builds up context: which customers prefer phone calls, which supplier always sends invoices late. Agents need a version of that context to do good work, and the team needs control over what is kept.'],
      ['h2', 'Three kinds of memory'],
      ['ul', [
        '**Working memory:** what the agent holds during a single run.',
        '**Run memory:** short notes the agent saves for its next run.',
        '**Shared knowledge:** documents and records the whole team maintains.',
      ]],
      ['h2', 'Working memory'],
      ['p', 'Working memory is everything the agent has read so far in a run. It is cleared when the run ends. Keeping it focused matters: an agent that reads every record it can find will be slower, costlier and more easily confused.'],
      ['h2', 'Run memory'],
      ['p', 'Run memory lets an agent leave itself a note, such as “this customer asked not to be contacted before ten.” Notes are visible to the team and can be edited or deleted at any time.'],
      ['code', `memory:
  scope: per_customer
  max_notes: 20
  expires_after: 180d
  editable_by: [owners, reviewers]`],
      ['h2', 'Shared knowledge'],
      ['p', 'Shared knowledge is the team’s source of truth: policies, price lists, help articles. Agents read it but should rarely write to it. Changes go through the same review your team already uses for documents.'],
      ['h2', 'Deciding what to forget'],
      ['table', ['Kind of detail', 'Keep?', 'Why'], [
        ['Contact preferences', 'Yes', 'Improves every future interaction'],
        ['One-off complaints', 'For 90 days', 'Useful context, not a permanent label'],
        ['Payment details', 'Never', 'Belongs in the billing system only'],
      ]],
      ['quote', 'Good memory is less about remembering everything and more about forgetting on purpose.'],
      ['h2', 'Putting it together'],
      ['p', 'Start with shared knowledge only. Add run memory when you notice the agent rediscovering the same fact every time. Keep notes short, set an expiry, and review them with the same care you give instructions.'],
    ],
  },
  {
    section: 'prompt-engineering', slug: 'few-shot-examples-that-actually-help',
    title: 'Few-shot examples that actually help',
    description: 'When showing an agent examples improves its work, when it backfires, and how to choose examples that teach the right lesson.',
    body: [
      ['h2', 'What few-shot means'],
      ['p', 'A few-shot prompt includes a small number of worked examples alongside the instructions. The model uses them to infer the pattern you want. Done well, examples teach format and judgement faster than any amount of description.'],
      ['h2', 'When examples help'],
      ['ul', [
        'The output has a precise format, such as a table or a fixed template.',
        'The judgement is hard to describe but easy to show.',
        'You need consistent labels across thousands of items.',
      ]],
      ['h2', 'When they backfire'],
      ['p', 'Examples are powerful, which means they can also mislead. Agents tend to copy surface details: if every example reply opens with the same phrase, so will every real reply. If all examples are short, long cases get squeezed.'],
      ['quote', 'An example teaches everything it contains, including the parts you did not mean to teach.'],
      ['h2', 'Choosing good examples'],
      ['ol', [
        'Pick examples that differ from each other in length and tone.',
        'Include at least one edge case and its correct handling.',
        'Remove details that should not be copied, such as names.',
        'Keep the set small; three to five is usually plenty.',
      ]],
      ['h2', 'A labelled example set'],
      ['code', `example:
  input: "Can I move my plan to annual billing?"
  label: billing_change
example:
  input: "The export button does nothing on Safari"
  label: bug_report`],
      ['h2', 'Testing whether they work'],
      ['table', ['Test', 'With examples', 'Without'], [
        ['Correct label', '94%', '86%'],
        ['Format errors', '0.5%', '4%'],
        ['Copied phrasing', 'Check manually', 'Rare'],
      ]],
      ['p', 'Run your saved test set with and without the examples. Keep them only if they improve the numbers you care about, and re-check whenever you change them.'],
    ],
  },
  {
    section: 'prompt-engineering', slug: 'structured-outputs',
    title: 'Getting structured output every time',
    description: 'Practical ways to make agents return clean, predictable data that the next step, or the next agent, can rely on.',
    body: [
      ['h2', 'Why structure matters'],
      ['p', 'When an agent’s output feeds another system, a missing field or a stray sentence can break the whole chain. Structured output means the agent returns data in an agreed shape, every time, so the next step can trust it.'],
      ['h2', 'Define the shape first'],
      ['p', 'Write the shape before you write the instructions. List each field, its type and whether it may be empty. In Lumenfold this becomes the output contract that the run checks automatically.'],
      ['code', `output:
  company: string
  fit_score: integer 0..100
  reasons: list of string, max 3
  next_step: one of [book_call, send_guide, disqualify]`],
      ['h2', 'Keep choices closed'],
      ['ul', [
        'Use fixed lists for anything a later step will branch on.',
        'Give numbers a clear range.',
        'Limit free text to fields that a person will read.',
      ]],
      ['h2', 'Validate and retry'],
      ['p', 'Even with a clear contract, an output will occasionally miss. The run should check every output against the contract and retry once with the error message attached. Most misses are fixed on the first retry.'],
      ['table', ['Strategy', 'Valid on first try', 'Valid after one retry'], [
        ['Instructions only', '91%', '97%'],
        ['Contract and validation', '98%', '99.8%'],
      ]],
      ['quote', 'If a person would need to tidy the output before using it, the contract is not finished.'],
      ['h2', 'Common pitfalls'],
      ['ol', [
        'Asking for both a summary and a data object in one field.',
        'Leaving optional fields undefined instead of explicitly empty.',
        'Changing the shape without updating every downstream step.',
      ]],
      ['p', 'Treat the contract like an API. Version it, review changes, and keep a test set that exercises every field.'],
    ],
  },
  {
    section: 'topics', slug: 'lead-qualification',
    title: 'How agents qualify inbound leads in minutes',
    description: 'What an inbound qualification agent checks, how it scores fit and when it should pass a lead straight to a person.',
    body: [
      ['p', 'Inbound leads lose value by the hour. A qualification agent reads each new lead as it arrives, gathers context, scores fit and drafts a first reply, so your team can respond while the lead is still paying attention.'],
      ['h2', 'What the agent checks'],
      ['ul', [
        'Company size, industry and region from public sources.',
        'Whether the company is already a customer or in an open deal.',
        'What the lead asked about and which page they came from.',
      ]],
      ['h2', 'Scoring fit'],
      ['p', 'Most teams use a simple points system they already understand. The agent applies it consistently and shows its working, which makes the score easy to challenge.'],
      ['table', ['Signal', 'Points'], [['Target industry', '+30'], ['Team of 50 or more', '+25'], ['Asked for pricing', '+20'], ['Personal email address', '-15']]],
      ['h2', 'When to hand straight to a person'],
      ['ol', ['The lead is from a named target account.', 'They mention a deadline or a competitor evaluation.', 'The score is close to your threshold.']],
      ['quote', 'Speed matters, but a fast wrong reply is worse than a thoughtful one an hour later.'],
      ['h2', 'Getting started'],
      ['p', 'Begin in draft mode with your existing scoring sheet. After two weeks, compare the agent’s scores with your team’s and adjust the points where they disagree.'],
      ['code', `threshold: 60
above: draft_reply + notify_owner
below: add_to_nurture`],
    ],
  },
  {
    section: 'topics', slug: 'ticket-triage',
    title: 'A plain guide to automated ticket triage',
    description: 'How a triage agent tags, prioritises and routes support tickets, and the escalation rules that keep it safe.',
    body: [
      ['p', 'Triage is the first decision on every support ticket: what is it about, how urgent is it and who should handle it. An agent can make that decision in seconds, consistently, around the clock.'],
      ['h2', 'Tag, prioritise, route'],
      ['ol', ['Tag the ticket with a product area and an issue type.', 'Set a priority from a fixed scale.', 'Route it to the right queue, with a short summary.']],
      ['h2', 'A priority scale that works'],
      ['table', ['Priority', 'Meaning', 'Target first reply'], [['P1', 'Customer is blocked right now', '30 minutes'], ['P2', 'Something is broken but there is a workaround', '4 hours'], ['P3', 'Question or request', '1 business day']]],
      ['h2', 'Escalation rules'],
      ['ul', ['Any mention of a security issue goes to the on-call engineer.', 'Refund requests above your limit go to a team lead.', 'Angry or distressed messages go to a senior agent.']],
      ['quote', 'Triage should make the queue calmer, not just faster.'],
      ['h2', 'Measuring triage'],
      ['p', 'Track how often a person changes the agent’s tag or priority. Below five percent is a good sign. Review every change weekly for the first month.'],
      ['code', `triage:
  tags: product_areas.yaml
  priority: [P1, P2, P3]
  escalate: escalation_rules.yaml`],
    ],
  },
  {
    section: 'topics', slug: 'invoice-matching',
    title: 'Matching invoices to orders without manual checks',
    description: 'A starter policy for three-way invoice matching with an agent, including tolerances, exceptions and audit logging.',
    body: [
      ['p', 'Three-way matching compares an invoice with its purchase order and goods receipt. It is precise, repetitive work that agents handle well, as long as the policy behind it is written down clearly.'],
      ['h2', 'A starter policy'],
      ['table', ['Field', 'Rule'], [['Quantity', 'Must match the receipt exactly'], ['Unit price', 'Within the supplier tolerance'], ['Tax', 'Must match the expected code'], ['Total', 'Within rounding']]],
      ['h2', 'Handling exceptions'],
      ['ul', ['Missing receipt: hold and notify the warehouse.', 'Price over tolerance: route to the buyer.', 'Unknown supplier: route to finance for setup.']],
      ['h2', 'Keeping auditors happy'],
      ['p', 'Every decision should log the rule that applied, the values compared and anyone who approved an exception. A readable log turns audits from a scramble into a review.'],
      ['quote', 'Write the policy first. The agent is the easy part.'],
      ['h2', 'Rolling it out'],
      ['ol', ['Start with your largest suppliers.', 'Keep payment approval with people for two cycles.', 'Widen the scope one supplier group at a time.']],
      ['code', `on_match: mark_ready_for_payment
on_fail: route_to_owner
log: full`],
    ],
  },
]

// Minimal /posts entries (raw announcement fragments in the original; rendered as T2 "minimal").
export const notes = [
  {
    slug: 'studio-tour', date: '2026-09-30',
    title: 'A short tour of the redesigned studio',
    body: [
      ['p', 'The studio has a new layout this month. The agent editor, evaluations and run history now share one screen, so you can move between writing, testing and reviewing without losing your place.'],
      ['h2', 'What moved'],
      ['ul', ['Evaluations now sit in a panel beside the editor.', 'Run history opens in a drawer instead of a new page.', 'Settings are grouped into three tabs instead of seven.']],
      ['h2', 'What stayed the same'],
      ['p', 'Your agents, test sets and permissions are untouched. Keyboard shortcuts work as before, and the old layout is available from the view menu until the end of the year.'],
    ],
  },
  {
    slug: 'office-hours', date: '2026-08-04',
    title: 'Office hours are now open every Thursday',
    body: [
      ['p', 'Every Thursday our solutions team hosts an open call for anyone building with Lumenfold. Bring a workflow you are stuck on, a run that surprised you or a question about pricing.'],
      ['h2', 'How it works'],
      ['ul', ['Sessions run for forty-five minutes.', 'Drop in for as long as you like.', 'Recordings are shared with attendees only.']],
      ['p', 'Find the next session on the [events page](/events).'],
    ],
  },
]

/* ---------- Events and resources (T3 / T4) ---------- */
export const eventsHero = {
  title: 'Learn alongside the teams', accent: 'putting agents to work',
  body: 'Live sessions, workshops and recordings with the operators, engineers and partners shipping agents every week.',
  pill: 'Live', noun: 'sessions', empty: 'No sessions scheduled yet',
}
export const resourcesHero = {
  title: 'Guides and research for teams', accent: 'building with AI agents',
  body: 'Field guides, datasheets and checklists to help you plan, launch and measure your first agents with confidence.',
  pill: 'New', noun: 'guides', empty: 'More guides coming soon',
}
export const hubCta = {
  events: { title: 'Bring your team along', body: 'Invite colleagues to the next session and build your first agent together.', primary: 'Start for free', secondary: 'Talk to our team' },
  resources: { title: 'Ready to try it yourself?', body: 'Turn a guide into a working agent in an afternoon, free to start.', primary: 'Start for free', secondary: 'Browse events' },
}

const speakerPool = [
  { name: 'Ana Moreau', title: 'Director of Revenue Operations', company: 'Northwind', seed: 3 },
  { name: 'Ravi Castell', title: 'Principal Solutions Engineer, Lumenfold', company: 'Lumenfold', seed: 8 },
  { name: 'Hana Lindqvist', title: 'Head of Support Operations', company: 'Quillstone', seed: 13 },
  { name: 'Marcus Bell', title: 'VP Finance', company: 'Kestrel', seed: 6 },
  { name: 'Sofia Varga', title: 'Product Manager, Agent Studio', company: 'Lumenfold', seed: 10 },
  { name: 'Theo Amari', title: 'Automation Lead', company: 'Orbital', seed: 15 },
  { name: 'June Park', title: 'Customer Experience Manager', company: 'Pinecrest', seed: 7 },
  { name: 'Leon Fischer', title: 'Platform Engineering Manager', company: 'Ferrocene', seed: 11 },
]
const sp = (...i) => i.map(k => speakerPool[k])

export const events = [
  {
    slug: 'revenue-ops-agents-live', kind: 'Webinar', partner: 'Northwind',
    start: '2026-11-12T17:00:00Z', time: '9:00 – 10:00 AM PT · Online',
    title: 'Hand off lead routing to an agent crew',
    description: 'See how the Northwind revenue team built a three-agent crew that enriches, scores and routes every inbound lead in under five minutes, with humans approving each hand-off.',
    eyebrow: 'Live webinar with the Northwind team',
    h1: ['Hand off the busywork', 'to agents'],
    lead: 'Join Northwind and Lumenfold for a practical walkthrough of a lead routing crew in production: how it was scoped, how it is reviewed, and the numbers after its first quarter running.',
    speakers: sp(0, 1, 4),
    takeaways: [
      ['How to split one process into roles.', 'We show the gatherer, decider and doer pattern on a real routing workflow, and why each role has its own short instructions.'],
      ['The brief that connects the crew.', 'See the exact fields Northwind passes between agents and how that single contract made bad decisions easy to trace.'],
      ['Where humans stay in the loop.', 'Every hand-off to a rep is approved by a person. Learn how that review stays fast instead of becoming a bottleneck.'],
      ['A scoring model the team trusts.', 'Northwind kept its existing points system and let the agent apply it consistently, showing its working on every lead.'],
      ['What the first quarter cost.', 'A frank breakdown of run costs, model routing choices and the budget limits that kept spending predictable as volume grew.'],
      ['Mistakes to skip on day one.', 'The three configuration choices the team would change if they started again, and the settings we now recommend instead.'],
    ],
  },
  {
    slug: 'support-agents-workshop', kind: 'Workshop', partner: 'Quillstone',
    start: '2026-12-03T16:00:00Z', time: '8:00 – 9:30 AM PT · Online',
    title: 'Build an overnight support triage agent together',
    description: 'A hands-on workshop where you build a triage agent that tags, prioritises and drafts replies for overnight tickets, using a sample help centre and a shared test set.',
    eyebrow: 'Hands-on workshop for support teams',
    h1: ['Wake up to a', 'calmer queue'],
    lead: 'Bring a laptop. In ninety minutes you will build, test and review a triage agent on sample tickets, then leave with a template and test set you can adapt for your own help desk.',
    speakers: sp(2, 4, 6),
    takeaways: [
      ['A priority scale in five minutes.', 'We start by writing a three-level priority scale and the escalation rules that sit on top of it.'],
      ['Drafts that sound like your team.', 'Learn why a short style note beats long examples, and how to check tone across a batch of replies.'],
      ['Four queues for the morning shift.', 'Sort tickets into send, check, needs a person and urgent, so the first hour of the day is spent on the right work.'],
      ['Testing before trusting.', 'Use a saved test set of past tickets to measure pass rate before a single real ticket goes through the agent.'],
      ['Escalations that carry context.', 'Write hand-off notes that let a person act within a minute, without re-reading the whole thread.'],
      ['A template to take home.', 'Every attendee leaves with the workshop agent, the test set and a one-page rollout checklist.'],
    ],
  },
  {
    slug: 'finance-close-fireside', kind: 'Fireside chat', partner: 'Kestrel',
    start: '2026-09-17T15:00:00Z', time: '8:00 – 8:45 AM PT · Online',
    title: 'A calmer month-end close with invoice agents',
    description: 'Kestrel’s finance lead talks through moving first-pass invoice matching to an agent, what the auditors said, and why writing the policy down was the hardest part.',
    eyebrow: 'Fireside chat with the Kestrel finance team',
    h1: ['Close the books', 'without overtime'],
    lead: 'An honest conversation about automating three-way matching at a growing manufacturer: the policy work, the exceptions that surfaced, and the audit log that turned a nervous review into a short one.',
    speakers: sp(3, 1, 5),
    takeaways: [
      ['The policy lived in people’s heads.', 'Writing down tolerances and exceptions took longer than building the agent, and paid for itself in the first close.'],
      ['Exceptions got real attention.', 'With routine matches handled, the team spent its time resolving disputes sooner and explaining them better to suppliers.'],
      ['Tolerances per supplier group.', 'A single variance rule did not fit. See how Kestrel grouped suppliers and set a tolerance for each.'],
      ['Approvals stayed with people.', 'Payments still need a human sign-off. The agent prepares, the team decides, and the log records both.'],
      ['What the auditors asked.', 'The questions that came up in the first audit after the change, and the log fields that answered them.'],
      ['Scaling to the next entity.', 'How the team is rolling the same setup out to a second business unit with different suppliers.'],
    ],
  },
  {
    slug: 'agent-evaluations-deep-dive', kind: 'Webinar', partner: 'Orbital',
    start: '2026-08-06T17:00:00Z', time: '10:00 – 11:00 AM PT · Online',
    title: 'Evaluations for teams without data scientists',
    description: 'A practical session on building saved test sets, writing rubrics and tracking three quality numbers every week, with examples from Orbital’s automation team.',
    eyebrow: 'Webinar on measuring agent quality',
    h1: ['Know your agents are', 'getting better'],
    lead: 'Learn the lightweight evaluation routine Orbital uses across twelve agents: a saved test set, a short rubric per item type and a fifteen-minute weekly review that the whole team attends.',
    speakers: sp(5, 4, 7),
    takeaways: [
      ['Start with twenty real items.', 'A small, stable test set beats a large one that changes every week. We show how Orbital chose theirs.'],
      ['Three numbers to watch.', 'Pass rate, escalation accuracy and cost per item tell you most of what you need to know.'],
      ['Rubrics that end arguments.', 'Write pass and fail conditions per item type so two reviewers grade the same answer the same way.'],
      ['Add one item a week.', 'Growing the set from real traffic keeps it honest and builds a record of every surprise.'],
      ['Run before you publish.', 'See how evaluation results sit beside the editor so checking quality becomes part of every change.'],
      ['When to sample live traffic.', 'Signs that an agent has outgrown its test set, and how to set up a daily review sample.'],
    ],
  },
  {
    slug: 'platform-teams-meetup', kind: 'Meetup', partner: 'Ferrocene',
    start: '2026-06-25T00:00:00Z', time: '5:30 – 8:00 PM ET · Boston',
    title: 'Platform teams on running agents at scale',
    description: 'An evening meetup with platform engineers comparing notes on budgets, model routing, access controls and the review habits that keep dozens of agents healthy.',
    eyebrow: 'In-person meetup for platform engineers',
    h1: ['Run dozens of agents', 'with confidence'],
    lead: 'Short talks and open discussion with engineers responsible for agent platforms at mid-sized companies, covering cost controls, permissions and how they decide which agents get more autonomy.',
    speakers: sp(7, 1, 5),
    takeaways: [
      ['Budgets at three levels.', 'Workspace, agent and run budgets each catch a different failure. Hear how teams set the first limits.'],
      ['Routing models by step.', 'Most steps do not need the largest model. See the routing rules that cut costs by two thirds.'],
      ['Access that matches roles.', 'Grader, reviewer and owner roles let more people help without widening edit access.'],
      ['Copy, do not share.', 'Why separate copies for each team keep reports clean and make later merges easier.'],
      ['Deciding on autonomy.', 'The signals teams use before letting an agent act without approval on a new case.'],
      ['Keeping the fleet tidy.', 'Monthly reviews that retire unused agents and consolidate near-duplicates.'],
    ],
  },
  {
    slug: 'first-agent-bootcamp', kind: 'Workshop', partner: 'Pinecrest',
    start: '2026-04-30T16:00:00Z', time: '9:00 – 11:00 AM PT · Online',
    title: 'Your first agent, from sketch to supervised launch',
    description: 'A two-hour bootcamp following the thirty-day rollout plan, with Pinecrest’s customer experience team sharing how they launched their first agent in four weeks.',
    eyebrow: 'Bootcamp for teams launching their first agent',
    h1: ['Launch your first agent', 'in thirty days'],
    lead: 'Follow the four-week rollout plan step by step, from mapping a workflow to going live on the easy cases, with real examples and the checklists Pinecrest used along the way.',
    speakers: sp(6, 4, 1),
    takeaways: [
      ['Pick a workflow you can check.', 'Good first projects have clear inputs, clear outputs and a person who can verify a result in seconds.'],
      ['Map every step first.', 'Sit with the people doing the work and write down the steps they do without thinking.'],
      ['Build everything in draft.', 'Draft mode lets the team see real output with no risk and creates the data you need for week three.'],
      ['Go live on one case.', 'Switch the most common case to autonomous and keep the rest in draft until they earn it.'],
      ['A daily ten-minute check-in.', 'Short daily reviews in week two keep momentum and produce one improvement a day.'],
      ['Plan the second agent.', 'The second agent usually takes half the time. Decide which workflow comes next before the first launch.'],
    ],
  },
]

// Past = (end ?? start) + 24h is before now. Evaluated on mount by the pages.
export const isPast = (e, now = Date.now()) => new Date(e.end || e.start).getTime() + 864e5 < now
export const eventDate = e => new Date(e.start).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' })
export const eventShortDate = e => new Date(e.start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' })

export const resources = {
  featured: {
    kind: 'Field guide', title: 'The agent rollout field guide',
    description: 'A step-by-step plan for choosing, building and supervising your first agents, with templates, review checklists and the metrics that matter most.',
    cover: '/assets/photos/report.webp', cta: 'Read the guide', to: '/learn/what-is-an-ai-agent',
  },
  items: [
    { kind: 'Datasheet', partner: 'Lumenfold', date: 'Updated October 2026', title: 'Lumenfold security and data handling overview', description: 'How workspaces isolate data, where models run, how long run history is kept and which controls administrators can configure for their teams.', cta: 'Read the datasheet', to: '/frequently-asked-questions' },
    { kind: 'Checklist', partner: 'Lumenfold', date: 'Published August 2026', title: 'Escalation rules checklist for new agents', description: 'Five questions to answer before any agent goes live, with example triggers, hand-off templates and a simple way to track escalation rates.', cta: 'Open the checklist', to: '/blog/a-practical-checklist-for-escalating-to-a-human' },
    { kind: 'Guide', partner: 'Lumenfold', date: 'Published July 2026', title: 'Structured outputs for multi-agent crews', description: 'Define contracts between agents, validate every hand-off and retry gracefully, so each step in a crew can rely on the one before it.', cta: 'Read the guide', to: '/prompt-engineering/structured-outputs' },
    { kind: 'Report', partner: 'Lumenfold', date: 'Published June 2026', title: 'What finance teams learned from invoice agents', description: 'Interviews with three finance leads on policy writing, exception handling and the audit trail that came with automating first-pass matching.', cta: 'Read the report', to: '/blog/what-finance-teams-learned-from-automating-invoice-checks' },
  ],
}

export const timeline = {
  caption: 'Four steps forward',
  steps: [
    { n: 1, hook: 'You do the work, the agent watches and learns' },
    { n: 2, hook: 'The agent drafts, you review every single output' },
    { n: 3, hook: 'The agent acts on easy cases and reports back' },
    { n: 4, hook: 'The agent runs the workflow and escalates exceptions' },
  ],
}

/* ---------- Comparisons (T5 / T6). Competitors are generic categories, never real products. ---------- */
export const vsIndex = {
  title: 'How Lumenfold compares',
  body: 'Honest, side-by-side notes on how agents built in Lumenfold differ from the other ways teams automate work today, and when each approach is the better fit.',
}

export const usFit = {
  def: 'Lumenfold is a platform for building supervised AI agents that decide, act across your tools and explain every step.',
  items: [
    'Agents adapt to messy inputs instead of breaking on them',
    'Every run has a replay your whole team can read',
    'Human approval is built in wherever you want it',
    'Budgets and model routing keep costs predictable as volume grows',
  ],
}

const tableQs = ['Handles changing inputs', 'Who maintains the logic', 'Explains each decision', 'Works across many tools', 'Human review built in', 'Cost as volume grows', 'Time to first workflow']
const usCells = [
  'Agents read each input fresh and choose their steps, so new layouts, wording or missing fields are handled or escalated rather than failing silently.',
  'Operations teams edit plain-language instructions in the studio, with every change versioned, reviewed and tested against a saved set before it ships.',
  'Every run has a step-by-step replay showing what the agent read, which tools it called and a short note on why it chose each action.',
  'Connect CRMs, help desks, finance systems and documents once, then let any agent use them with permissions scoped per agent and per team.',
  'Draft mode, approval steps and escalation rules are part of every agent, so you can decide exactly where a person signs off before anything is sent.',
  'Budgets per workspace, agent and run, plus routing each step to a suitable model, keep the monthly bill steady even when volume doubles.',
  'Most teams run a supervised agent on real work within a week, then widen its scope one case at a time over the first month.',
]
const rows = them => tableQs.map((q, i) => ({ q, us: ['check', usCells[i]], them: them[i] }))

const steps = ref => [
  { label: 'Step 1', title: `Map everything your current ${ref} setup handles`, body: 'We sit with your team, list every step the current setup performs, and mark the decisions that a person still makes by hand.', pills: ['Reads the current flow', 'Lists every decision', 'Flags the brittle steps'] },
  { label: 'Step 2', title: 'Rebuild one workflow as a supervised agent', body: 'Start with the workflow that breaks most often. Build it in draft mode so the team reviews real output side by side with the old process before anything changes.' },
  { label: 'Step 3', title: 'Switch over one case at a time', body: 'Move the most common case first, keep the rest running as they are, and switch off the old setup once it has gone a full cycle untouched.', pills: ['Ana moved intake', 'Ravi retired the old flow'] },
]

const faq = (ref, extra) => [
  { q: `Can Lumenfold run alongside our ${ref}?`, a: `Yes. Most teams keep their ${ref} running while they rebuild one workflow at a time, then switch each over once the agent version has proved itself in draft mode.` },
  { q: 'How long does a typical migration take?', a: 'A single workflow usually moves in one to two weeks, including a week in draft mode. Larger estates are migrated in waves, starting with the workflows that break most often.' },
  ...extra,
  { q: 'Who on our team should own the agents?', a: 'Usually the team that owns the process today, with support from an engineer for new tool connections. Instructions are plain language, so day-to-day changes rarely need a developer.' },
  { q: 'Is there a free way to try this?', a: 'Yes. The free plan includes enough runs to build and test a first agent on real work, and our team can help you scope a pilot on a call.' },
]

export const comparisons = [
  {
    slug: 'legacy-rpa', ref: 'legacy RPA bots', name: 'Legacy RPA', glyph: 2,
    rowTitle: 'Lumenfold vs Legacy RPA',
    title: 'Lumenfold vs Legacy RPA',
    body: 'Screen-recording bots are great at repeating clicks. Agents are built for work that changes from one case to the next. Here is how the two approaches compare in practice.',
    fit: {
      def: 'Legacy RPA records fixed sequences of clicks and keystrokes and replays them against the same screens each time.',
      items: ['Reliable when screens and inputs never change', 'Strong for high-volume, identical data entry', 'Maintained by a specialist team or vendor', 'Breaks quietly when a layout or field moves'],
    },
    differences: [
      ['Decisions instead of recordings', 'RPA bots replay a path someone recorded. Agents read each case and choose their steps, so a new invoice layout or a missing field is handled or escalated instead of stopping the run.'],
      ['Readable by the whole team', 'Bot scripts usually live with a specialist. Agent instructions are written in plain language and every run has a replay, so the people who own the process can review and improve it themselves.'],
      ['Supervision is part of the design', 'Draft mode, approvals and escalation rules come with every agent. You decide which steps a person signs off, and you can widen the agent’s scope one case at a time.'],
    ],
    run: {
      trigger: 'New supplier invoice arrives by email', agent: 'Invoice Checker', seed: 4,
      steps: [
        ['tool', 'Read the attached invoice PDF', '1 file'],
        ['thought', 'The layout differs from last month’s invoices from this supplier, so I will read the fields by label rather than position.'],
        ['tool', 'Looked up purchase order PO-20417', '6 lines'],
        ['tool', 'Fetched goods receipt from the warehouse', '1 record'],
        ['thought', 'Five lines match exactly. Line four is priced 1.2% higher, which is inside this supplier’s agreed tolerance of 1.5%.'],
        ['tool', 'Checked tax code against supplier profile', 'match'],
        ['tool', 'Marked invoice ready for payment approval', '1 update'],
        ['thought', 'Logging the variance on line four so the buyer can see it in the weekly summary, even though it passed.'],
        ['tool', 'Posted summary to the finance channel', '1 message'],
      ],
    },
    table: rows([
      ['no', 'Recorded paths assume the same screens every time; a moved field or new format usually stops the bot until someone re-records it.'],
      ['partial', 'Typically a specialist team or vendor edits scripts, so small process changes wait in a queue.'],
      ['partial', 'Logs show which clicks ran, but not why a path was taken or what the bot saw.'],
      ['check', 'Can drive almost any desktop or web screen, though each new screen needs its own recording.'],
      ['partial', 'Approvals are possible but usually added as separate workflow steps outside the bot.'],
      ['partial', 'Licences are often per bot, so cost rises in steps as more processes are added.'],
      ['no', 'Projects commonly take weeks of discovery and recording before the first bot runs.'],
    ]),
    steps: steps('legacy RPA bots'),
    faqs: faq('legacy RPA bots', [{ q: 'Do we have to rebuild every bot?', a: 'No. Keep bots that handle stable, identical screens. Move the ones that break often or need judgement, which is usually a small share of the total.' }]),
  },
  {
    slug: 'diy-scripts', ref: 'DIY scripts', name: 'DIY scripts', glyph: 1,
    rowTitle: 'Lumenfold vs DIY scripts',
    title: 'Lumenfold vs DIY scripts',
    body: 'Home-grown scripts are fast to start and easy to own until the person who wrote them moves on. Here is where agents in Lumenfold change that picture, and where scripts still win.',
    fit: {
      def: 'DIY scripts are custom code your engineers write to connect tools and automate a process end to end.',
      items: ['Fully flexible and cheap to start', 'Great for precise, well-defined transformations', 'Owned by whoever wrote them, often one person', 'Monitoring, retries and reviews must be built by hand'],
    },
    differences: [
      ['Judgement without new code', 'Scripts handle what their author anticipated. Agents decide how to handle the case in front of them, and anything outside their rules is escalated with context instead of throwing an error.'],
      ['Owned by the process team', 'When a script needs a change, it waits for an engineer. Agent instructions are plain language and versioned, so the team that owns the process can make and test changes itself.'],
      ['Monitoring comes built in', 'Run history, replays, budgets and alerts are part of the platform, so nobody has to build dashboards or retry logic before an automation can be trusted.'],
    ],
    run: {
      trigger: 'Weekly pipeline report is due Monday', agent: 'Pipeline Analyst', seed: 8,
      steps: [
        ['tool', 'Pulled open deals from the CRM', '148 deals'],
        ['tool', 'Read last week’s report from shared docs', '1 doc'],
        ['thought', 'Twelve deals changed stage since last week. Three moved backwards, which the team asked me to call out at the top.'],
        ['tool', 'Compared stage changes with last week', '12 changes'],
        ['tool', 'Looked up notes on the three regressed deals', '3 deals'],
        ['thought', 'Two regressions mention budget freezes. I will group them and suggest the owners compare notes before Thursday.'],
        ['tool', 'Drafted report in the team template', '1 draft'],
        ['tool', 'Requested approval from the sales lead', '1 request'],
      ],
    },
    table: rows([
      ['partial', 'Handles exactly the cases the author coded for; anything new raises an error or, worse, passes through unnoticed.'],
      ['no', 'Changes need an engineer, and knowledge often sits with the original author.'],
      ['partial', 'Only as much logging as someone chose to write, usually without the reasoning.'],
      ['check', 'Can connect to anything with an API, given enough engineering time.'],
      ['no', 'Approval steps and review queues must be built and maintained separately.'],
      ['check', 'Compute is cheap, though engineering time to maintain scripts adds up.'],
      ['partial', 'Quick for a simple task; slower once error handling and monitoring are added.'],
    ]),
    steps: steps('DIY scripts'),
    faqs: faq('DIY scripts', [{ q: 'Can agents call our existing scripts?', a: 'Yes. Wrap a script as a custom tool and any agent can call it with scoped permissions. Many teams keep precise transformations in code and let agents handle the judgement around them.' }]),
  },
  {
    slug: 'generic-chatbot', ref: 'chat assistant', name: 'Generic chatbot', glyph: 4,
    rowTitle: 'Lumenfold vs a generic chatbot',
    title: 'Lumenfold vs a generic chatbot',
    body: 'A chat assistant answers questions when someone asks. An agent does the work in your tools, on a schedule or a trigger, and shows its steps. Here is how they differ for operations teams.',
    fit: {
      def: 'A generic chatbot is a conversational assistant that answers questions and drafts text inside a chat window.',
      items: ['Excellent for one-off questions and quick drafts', 'Needs a person to start every conversation', 'Rarely takes actions inside your business tools', 'Hard to audit across a whole team'],
    },
    differences: [
      ['Work that starts on its own', 'Chat waits for a prompt. Agents start from a trigger, such as a new ticket or a Monday deadline, and finish the job without anyone opening a window.'],
      ['Actions, not just answers', 'Agents read from and write to your CRM, help desk and finance tools with scoped permissions, and every action is logged in a replay the team can review.'],
      ['Consistent across the team', 'Shared instructions, test sets and evaluations mean every run follows the same rules, instead of each person prompting a chat window in their own way.'],
    ],
    run: {
      trigger: 'New ticket tagged urgent overnight', agent: 'Night Triage', seed: 13,
      steps: [
        ['tool', 'Read ticket and attached screenshot', '1 ticket'],
        ['tool', 'Looked up the school account and plan', '1 account'],
        ['thought', 'The teacher cannot open today’s lesson plan, and their class starts in under two hours. This qualifies as urgent.'],
        ['tool', 'Searched help centre for matching issues', '4 articles'],
        ['tool', 'Checked status page for open incidents', 'none'],
        ['thought', 'A known browser setting causes this. The fix takes two steps, so I will draft a numbered reply and keep it short.'],
        ['tool', 'Drafted reply in the support style', '1 draft'],
        ['tool', 'Moved ticket to the urgent morning queue', '1 update'],
      ],
    },
    table: rows([
      ['partial', 'Handles varied questions well inside a conversation, but only when someone pastes the input in.'],
      ['partial', 'Each person writes their own prompts, so behaviour varies from one teammate to the next.'],
      ['no', 'Conversations are private to each user, with no shared record of what was decided.'],
      ['partial', 'Some connections exist, but most work still means copying results into other tools.'],
      ['partial', 'A person is always present, which is safe but means nothing runs unattended.'],
      ['check', 'Per-seat pricing is predictable, though it scales with headcount rather than work done.'],
      ['check', 'Instant for personal use; there is little to set up.'],
    ]),
    steps: steps('chat assistant'),
    faqs: faq('chat assistant', [{ q: 'Should we stop using chat assistants?', a: 'Not at all. Chat is great for personal, one-off tasks. Agents suit the repeatable work that should happen the same way every time, without someone starting it.' }]),
  },
  {
    slug: 'spreadsheet-macros', ref: 'spreadsheet macros', name: 'Spreadsheet macros', glyph: 3,
    rowTitle: 'Lumenfold vs spreadsheet macros',
    title: 'Lumenfold vs spreadsheet macros',
    body: 'Macros quietly run a surprising share of operations work. They are also fragile, personal and hard to audit. Here is how agents compare when a spreadsheet process starts to strain.',
    fit: {
      def: 'Spreadsheet macros automate steps inside a workbook, usually built by the person who uses it most.',
      items: ['Close to the data and familiar to finance teams', 'Fine for small, contained calculations', 'Tied to one file and often one person', 'Little history of who changed what and why'],
    },
    differences: [
      ['Beyond a single workbook', 'Macros live in one file. Agents work across your CRM, finance system and documents, so the process no longer depends on someone exporting and re-importing data.'],
      ['A history you can audit', 'Every agent run keeps a replay and every instruction change is versioned with a reason, which turns month-end questions into a quick search.'],
      ['Handles the awkward rows', 'When a row does not fit the pattern, a macro either errors or carries on. An agent applies your rules, and anything outside them is escalated with an explanation.'],
    ],
    run: {
      trigger: 'Month-end accruals sheet is ready', agent: 'Close Assistant', seed: 6,
      steps: [
        ['tool', 'Opened the accruals workbook', '214 rows'],
        ['tool', 'Pulled matching entries from the ledger', '209 entries'],
        ['thought', 'Five rows have no ledger match. Three are new vendors set up this week, and two look like duplicated lines.'],
        ['tool', 'Checked vendor records for the new suppliers', '3 vendors'],
        ['tool', 'Compared the suspected duplicate lines', '2 rows'],
        ['thought', 'The duplicates share amount, date and reference. I will flag them for the controller rather than removing them myself.'],
        ['tool', 'Prepared journal draft for matched rows', '209 lines'],
        ['tool', 'Sent exceptions to the controller for review', '5 rows'],
      ],
    },
    table: rows([
      ['no', 'Assumes columns and formats stay put; a renamed header or new tab often breaks the macro.'],
      ['no', 'Usually one person understands each macro, and it leaves with them.'],
      ['no', 'Changes are rarely recorded, and there is no log of what the macro did on each run.'],
      ['partial', 'Limited to the workbook unless someone exports and imports data by hand.'],
      ['partial', 'Review happens by eye, outside the macro, with no record of sign-off.'],
      ['check', 'Effectively free to run, though the hidden cost is time spent fixing breakages.'],
      ['check', 'Quick to write for someone who already knows the workbook.'],
    ]),
    steps: steps('spreadsheet macros'),
    faqs: faq('spreadsheet macros', [{ q: 'Can agents read and update our spreadsheets?', a: 'Yes. Spreadsheets connect like any other tool. Many teams keep the workbook as the place people look, while the agent fills and checks it.' }]),
  },
]

export const vsCta = { title: 'See it on your own work', body: 'Bring one workflow and we will rebuild it as a supervised agent together.', primary: 'Start for free', secondary: 'Talk to our team' }
export const faqIntro = { title: 'Questions teams ask us', body: 'Short answers to the questions we hear most during evaluations.', link: 'Read every FAQ', to: '/frequently-asked-questions' }

/* ---------- Changelog (T7) ---------- */
export const changelogIntro = { title: 'Changelog', body: 'New features, improvements and fixes shipped to Lumenfold every week.' }

export const changelog = [
  { id: 'october-14-2026', date: '2026-10-14', summary: 'Replays and faster search', title: 'Run replays are now available on every plan', image: 1,
    body: [
      'You can now step through any past run exactly as the agent saw it. Each step shows the context the agent read, the tools it called with their inputs and responses, the model used and a short note on why it chose that action. Replays are kept for ninety days on Team plans.',
      'Pin two replays side by side to compare a run before and after an instruction change. Paths are aligned step by step, and the first point where they diverge is highlighted so you can jump straight to it.',
      ['h3', 'Also in this release'],
      'Run history search now returns results in under a second for workspaces with up to a million runs, and filters for agent, outcome tag and date range can be combined. Saved searches can be shared with teammates by link.',
    ], post: 'introducing-run-replays-for-every-agent-step' },
  { id: 'october-7-2026', date: '2026-10-07', summary: 'Grader role and alerts', title: 'A grader role for evaluation reviewers', image: 2,
    body: [
      'Workspaces now include a grader role. Graders can open test sets, read rubrics and grade results, but cannot edit agents or change instructions. This makes it easy to involve subject experts in evaluations without widening edit access across the team.',
      'Evaluation alerts can now post to any connected chat channel. Set a pass-rate threshold per evaluation and the owner is notified when a scheduled run falls below it, with a link to the items that changed outcome.',
      'Fixed an issue where rubric attachments were occasionally missing from exported evaluation reports.',
    ] },
  { id: 'september-30-2026', date: '2026-09-30', summary: 'Redesigned studio layout', title: 'The studio has a new single-screen layout', image: 3,
    body: [
      'The agent editor, evaluations panel and run history now share one screen. Run history opens in a drawer beside the editor, so you can check a past run without losing your place in the instructions you are editing.',
      'Settings have been regrouped into three tabs: Behaviour, Tools and Limits. Every option is still available, and a search box at the top of the settings drawer finds any setting by name.',
      'The previous layout remains available from the view menu until the end of the year. Your agents, permissions and shortcuts are unchanged.',
    ], post: 'studio-tour' },
  { id: 'september-23-2026', date: '2026-09-23', summary: 'Typed hand-offs', title: 'Typed hand-offs between agents in a crew', image: 4,
    body: [
      'Agents in a crew can now declare the exact shape of the brief they pass to the next agent. The run checks every hand-off against that contract and retries once with the validation error attached before failing loudly.',
      'Contracts support strings, integers with ranges, fixed lists and short lists of values. The studio shows each contract as a small form, and the same definition can be edited as configuration if you prefer.',
      ['h3', 'Why it matters'],
      'Most crew failures we see start with a missing or malformed field in a hand-off. Catching them at the boundary makes them much easier to read in a replay, and stops them from turning into wrong actions further down the chain.',
    ] },
  { id: 'september-16-2026', date: '2026-09-16', summary: 'Per-step model routing', title: 'Route each step to a different model tier', image: 5,
    body: [
      'You can now choose a model tier for each step type in an agent. Extraction and classification steps can use a small, fast model while drafting steps that customers will read use a larger one. Routing rules can match on step kind or output audience.',
      'The cost explorer now breaks spend down by step type, so you can see which parts of an agent account for most of its cost and try a different tier on just those steps.',
      'Routing changes are versioned like instructions and can be evaluated against your saved test set before publishing.',
    ] },
  { id: 'september-9-2026', date: '2026-09-09', summary: 'Three-level budgets', title: 'Budgets for workspaces, agents and runs', image: 6,
    body: [
      'Budgets can now be set at three levels. Workspace budgets give finance a monthly ceiling, agent budgets cap daily spend so one busy agent cannot starve the rest, and run budgets stop any single run that loops or stalls.',
      'When a budget is reached, the agent pauses and notifies its owner. Steps already in progress finish, queued work waits, and nothing is dropped. Owners can raise the limit from the notification in one click.',
      'Budget usage appears on each agent’s overview page with a simple bar for today and this month.',
    ] },
  { id: 'august-26-2026', date: '2026-08-26', summary: 'Escalation templates', title: 'Structured escalation notes', image: 7,
    body: [
      'Escalations can now use a structured note template. Each note lists what the customer asked for, what the agent checked, a suggested next step and how long the item has been waiting, so the person picking it up can act within a minute.',
      'Escalation rates now appear on the agent overview, with a weekly trend line. A sudden rise usually means an upstream change the instructions do not cover yet, and the chart links straight to the last ten escalations.',
      'Fixed a delay in delivering escalation notifications to channels with more than five hundred members.',
    ] },
  { id: 'august-12-2026', date: '2026-08-12', summary: 'Faster knowledge sync', title: 'Knowledge folders now sync every fifteen minutes', image: 8,
    body: [
      'Shared knowledge folders now refresh every fifteen minutes by default, down from once an hour. Only changed documents are re-processed, so each sync is faster than the old hourly one for most folders.',
      'Every sync records which documents were added, edited or removed, and agents can cite the version of a document they read. Subscribe to change summaries in a team channel to catch accidental edits early.',
      'Intervals can be set per folder, from five minutes on Enterprise plans to manual only.',
    ], post: 'office-hours' },
  { id: 'july-29-2026', date: '2026-07-29', summary: 'Draft mode controls', title: 'Draft mode now works per case', image: 9,
    body: [
      'Draft mode can now be set per case instead of per agent. Let an agent act on its own for the most common case while every other case still waits for approval, and move cases out of draft one at a time as confidence grows.',
      'Approval queues show which case each draft belongs to, and reviewers can filter by case to work through similar drafts together.',
      ['h3', 'Migration'],
      'Existing agents in draft mode keep their current behaviour, with every case set to draft. Nothing changes until an owner chooses to switch a case.',
    ] },
  { id: 'july-15-2026', date: '2026-07-15', summary: 'Spreadsheet connections', title: 'Read and update spreadsheets from any agent', image: 10,
    body: [
      'Spreadsheets now connect like any other tool. Agents can read ranges, append rows and update cells, with permissions scoped to specific files and tabs. Header names are used rather than column letters, so moving a column no longer breaks a workflow.',
      'Every write is recorded in the run replay with the before and after values, which makes month-end reviews of spreadsheet-driven processes much quicker.',
      'Fixed an issue where very wide tabs were truncated when previewed in the tool picker.',
    ] },
  { id: 'june-24-2026', date: '2026-06-24', summary: 'Evaluations in the editor', title: 'Evaluations move next to the agent editor', image: 11,
    body: [
      'Test sets, rubrics and results now live in a panel beside the agent editor. The publish button shows the last evaluation result for your draft, and results from the published version and the draft appear side by side.',
      'Items that changed outcome are pinned to the top of the comparison, and the full results history is kept for every agent version.',
      'The old evaluations page remains available as a read-only archive until the end of next quarter.',
    ] },
  { id: 'june-10-2026', date: '2026-06-10', summary: 'Masked fields in sharing', title: 'Field masking for shared runs and replays', image: 12,
    body: [
      'Workspace administrators can now mark fields as sensitive. Masked fields are hidden in shared run links, exports and replays for anyone without the matching permission, while agents continue to read them as normal.',
      'Masking rules can match on field name, connected tool or a pattern such as card numbers. A preview shows exactly what a reviewer without access will see before you save the rule.',
      'Masking events are recorded in the audit trail with the rule that applied.',
    ] },
].map(e => ({ ...e, image: `/assets/photos/ed-log-${e.image}.webp` }))

/* ---------- FAQ page (T10) ---------- */
export const faqPage = {
  title: ['Frequently asked', 'questions'],
  sectionTitle: 'Answers in one place',
  sectionBody: 'Can’t find what you need? Bring your question to our weekly',
  sectionLink: 'office hours', sectionTo: '/posts/office-hours',
  cta: { title: 'Still deciding? Try it free', body: 'Build a supervised agent on real work before you commit to anything.', primary: 'Start for free', secondary: 'Browse events' },
}
export const faqs = [
  { q: 'What exactly is a Lumenfold agent?', a: 'An agent is a piece of software with a goal, a set of connected tools and plain-language instructions. On each run it decides which steps to take, takes them in your tools, and records a replay of everything it did and why.' },
  { q: 'Do I need to know how to code to build one?', a: 'No. Instructions are written in plain language in the studio, and tools connect with a few clicks. Engineers can work with configuration files and the API if they prefer, but most agents are built and maintained by the teams that own the process.' },
  { q: 'Which tools can agents connect to?', a: 'Agents connect to common CRMs, help desks, finance systems, document stores, spreadsheets and chat tools, plus any system with an API through custom tools. Permissions are scoped per agent, so each one only touches what it needs.' },
  { q: 'How do I stop an agent from doing something it should not?', a: 'Every agent has boundaries in its instructions, escalation rules for sensitive cases and an optional draft mode where a person approves each output. Budgets at workspace, agent and run level stop runaway costs, and any agent can be paused instantly.' },
  { q: 'Can I see why an agent made a decision?', a: 'Yes. Every run has a step-by-step replay showing the context the agent read, each tool call with its inputs and outputs, the model used and a short note explaining the choice at each step.' },
  { q: 'How is pricing calculated?', a: 'Plans include a monthly allowance of runs, and usage above that is billed per step at the rate for the model tier used. Budgets let you cap spend at any level, so the bill never surprises finance.' },
  { q: 'Where is our data stored and who can see it?', a: 'Data stays in the region you choose for your workspace. Run history is visible only to members with access to that agent, sensitive fields can be masked in shared links, and we never use customer data to train models.' },
  { q: 'What does a typical first month look like?', a: ['Week one: pick a workflow and map every step', 'Week two: build the agent in draft mode', 'Week three: review drafts and measure pass rate', 'Week four: go live on the most common case', 'Ongoing: move one new case out of draft each fortnight', 'Throughout: run the saved test set before every change'] },
  { q: 'Can several agents work together on one process?', a: 'Yes. Agents can be linked into a crew where each owns one part of a process and passes a typed brief to the next. Every hand-off is checked and appears in the replay, so it is easy to see where a decision came from.' },
  { q: 'What support do you offer during rollout?', a: 'Every plan includes the community forum and weekly office hours. Team and Enterprise plans add onboarding sessions with a solutions engineer, and Enterprise customers get a named contact and an agreed response time.' },
]
