// T11 Academy Lesson data: one original Lumenfold course of 8 lessons.
// Lesson bodies use the shared Prose block format: ['p', text] | ['h3', text] | ['ol', [items]].

export const academy = {
  parent: 'Lumenfold Academy',
  base: '/relevance-academy',
  sidebarHeading: 'Lessons',
  prev: 'Previous',
  next: 'Next lesson',
  play: 'Play lesson video',
  completed: 'Completed',
}

export const course = {
  title: 'Building your first agent',
  body: 'Eight short lessons that take you from a blank workspace to a reviewed, monitored agent your team can trust. Each one pairs a video walkthrough with notes you can come back to.',
  listHeading: 'Course lessons',
}

export const lessons = [
  {
    slug: 'meet-your-workspace',
    crumb: 'Workspace',
    title: 'Meet your workspace',
    duration: '6 min',
    poster: '/assets/photos/ac-1.webp',
    body: [
      ['p', 'Before you build anything, it helps to know where things live. A Lumenfold workspace is the shared home for your agents, the tools they can call, the knowledge they can read and the people who review their work. Everything you create in this course will sit inside one workspace.'],
      ['p', 'The left rail groups the workspace into four areas. **Agents** holds the workers you build. **Tools** lists the actions an agent may take, such as sending an email or updating a record. **Knowledge** stores the documents and tables an agent can search. **Activity** shows every run, step by step, so you can see what happened and why.'],
      ['h3', 'Set up before lesson two'],
      ['ol', [
        'Create a workspace and give it the name of your team.',
        'Invite one colleague who can act as a reviewer.',
        'Open Activity and leave it pinned; you will use it often.',
        'Pick one repetitive task from your week to automate in this course.',
      ]],
      ['p', 'Keep that task small. A good first agent saves someone twenty minutes a day, not a whole department. You can always grow it once it has earned some trust.'],
    ],
  },
  {
    slug: 'define-the-job',
    crumb: 'Brief',
    title: 'Define the job',
    duration: '8 min',
    poster: '/assets/photos/ac-2.webp',
    body: [
      ['p', 'An agent is only as clear as the brief you give it. Most early problems come from instructions that make sense to the author but leave the agent guessing. In this lesson you will write a brief that a new teammate could follow on their first day.'],
      ['p', 'Start with the outcome, not the steps. "Every inbound demo request gets a researched reply within an hour" is a goal the agent can check itself against. "Read emails and reply" is not. Then describe who the work is for, what good looks like and what the agent must never do.'],
      ['h3', 'A brief in four parts'],
      ['ol', [
        'Goal: one sentence describing the finished result.',
        'Context: who the agent serves and what it should know about them.',
        'Rules: hard limits, written plainly, such as "never quote a price".',
        'Hand-off: when the agent should stop and ask a person.',
      ]],
      ['p', 'Paste your brief into the agent and run it against three real examples. Read every answer. Where it went wrong, change the brief rather than the example. You are teaching a habit, not fixing a single reply.'],
    ],
  },
  {
    slug: 'connect-your-tools',
    crumb: 'Tools',
    title: 'Connect your tools',
    duration: '9 min',
    poster: '/assets/photos/ac-3.webp',
    body: [
      ['p', 'Tools turn an agent from something that talks into something that works. Each tool is a single action with clear inputs and outputs: look up an account, draft a calendar invite, add a row to a sheet. The agent decides when to use them, so how you describe each tool matters as much as what it does.'],
      ['p', 'Give every tool a plain name and a one-line description written for the agent. "Find company by website domain" will be chosen at the right moment far more often than "lookup_v2". List the inputs the tool needs and say what it returns when nothing is found.'],
      ['h3', 'Connecting safely'],
      ['ol', [
        'Connect the app with a service account, not your personal login.',
        'Grant the narrowest permission that still completes the task.',
        'Mark any tool that sends, pays or deletes as needing approval.',
        'Run each tool once by hand to confirm the output shape.',
      ]],
      ['p', 'Three or four well-described tools beat twenty vague ones. Add more only when a run in Activity shows the agent stuck without them.'],
    ],
  },
  {
    slug: 'give-it-knowledge',
    crumb: 'Knowledge',
    title: 'Give it knowledge',
    duration: '7 min',
    poster: '/assets/photos/ac-4.webp',
    body: [
      ['p', 'Your agent already knows a lot about the world, but it knows nothing about your product, your customers or the way your team likes things done. Knowledge sources close that gap. They are the documents, help articles and tables the agent can search before it answers.'],
      ['p', 'Quality beats volume. Upload the five documents your best teammate would hand to a new hire, not the whole shared drive. Old pricing sheets and draft policies will be found and quoted just as confidently as current ones, so remove anything out of date first.'],
      ['h3', 'Preparing a source'],
      ['ol', [
        'Split long documents so each section covers one topic.',
        'Give every file a title that says what question it answers.',
        'Add an owner and a review date to each source.',
        'Ask the agent five questions and check which source it cites.',
      ]],
      ['p', 'Turn on citations in the agent settings. When every answer points back to its source, reviewers can check facts in seconds and you can see which documents are doing the real work.'],
    ],
  },
  {
    slug: 'add-a-trigger',
    crumb: 'Triggers',
    title: 'Add a trigger',
    duration: '6 min',
    poster: '/assets/photos/ac-5.webp',
    body: [
      ['p', 'So far you have started every run yourself. A trigger lets the agent start on its own when something happens: a form is submitted, a message lands in a shared inbox, a record changes stage or a scheduled time arrives. This is the moment your agent starts saving real time.'],
      ['p', 'Choose the narrowest trigger that matches the job. "Any new email" will wake the agent for newsletters and receipts. "New email to demos@ with a company domain" keeps it focused and keeps your run history readable.'],
      ['h3', 'Before you switch it on'],
      ['ol', [
        'Add a filter so only relevant events start a run.',
        'Set a daily run limit while you are still testing.',
        'Send yourself a test event and watch it in Activity.',
        'Decide who is notified if a run fails.',
      ]],
      ['p', 'Leave the trigger running for a day with approvals switched on for every outbound action. You will learn more from twenty real events than from any amount of planning.'],
    ],
  },
  {
    slug: 'review-and-approve',
    crumb: 'Approvals',
    title: 'Review and approve',
    duration: '8 min',
    poster: '/assets/photos/ac-6.webp',
    body: [
      ['p', 'Approvals are how an agent earns autonomy. While a step needs approval, the agent prepares the work and pauses, and a person reads it, edits it if needed and sends it on. Every decision is recorded, so you build a clear picture of where the agent is reliable and where it is not.'],
      ['p', 'Route approvals to the people who own the outcome. A sales reply should be checked by someone in sales, not by whoever built the agent. Reviewers can approve from email or chat, so the pause costs minutes, not hours.'],
      ['h3', 'Running a good review'],
      ['ol', [
        'Read the full step history, not only the final draft.',
        'Edit the draft rather than rejecting it when it is close.',
        'Leave a short note explaining any change you make.',
        'Look for repeated edits and fold them back into the brief.',
      ]],
      ['p', 'After a week, open the approval report. Steps that were approved without changes nine times out of ten are good candidates to run on their own.'],
    ],
  },
  {
    slug: 'measure-what-matters',
    crumb: 'Evaluation',
    title: 'Measure what matters',
    duration: '10 min',
    poster: '/assets/photos/ac-7.webp',
    body: [
      ['p', 'A feeling that the agent "seems good" will not survive the first awkward mistake. Evaluations give you something firmer: a fixed set of example inputs, each with a description of a good result, that you run every time you change the agent.'],
      ['p', 'Build your first evaluation set from real runs. Pick ten that went well, five that needed heavy edits and five edge cases that worried you. For each one, write two or three checks in plain language, such as "mentions the customer\'s industry" or "does not promise a delivery date".'],
      ['h3', 'Your evaluation routine'],
      ['ol', [
        'Save twenty representative runs as test cases.',
        'Write pass or fail checks for each case.',
        'Run the full set before publishing any change to the brief.',
        'Track the pass rate over time on the agent dashboard.',
        'Add every new failure you find as a fresh test case.',
      ]],
      ['p', 'A rising pass rate is the evidence you need when a manager asks whether the agent can take on more.'],
    ],
  },
  {
    slug: 'launch-with-confidence',
    crumb: 'Launch',
    title: 'Launch with confidence',
    duration: '7 min',
    poster: '/assets/photos/ac-8.webp',
    body: [
      ['p', 'Launching an agent is less a single moment than a gradual handover. You have a clear brief, a small set of tools, curated knowledge, a focused trigger, approvals and an evaluation set. Now you decide which steps the agent runs on its own and how you will keep an eye on it.'],
      ['p', 'Remove approvals one step at a time, starting with the ones your reviewers have approved without change for at least a week. Keep approvals on anything that sends money, deletes data or speaks for the company in a new way.'],
      ['h3', 'Launch checklist'],
      ['ol', [
        'Publish the agent and note the version in your team channel.',
        'Set alerts for failed runs and for unusual run volume.',
        'Book a fifteen-minute review with the owner every two weeks.',
        'Write down the next task this agent could take on.',
      ]],
      ['p', 'That last step matters. The teams that get the most from Lumenfold treat their first agent as the start of a habit, not the end of a project. Pick your next task and begin again from lesson two.'],
    ],
  },
]

export const lessonIndex = slug => lessons.findIndex(l => l.slug === slug)
export const lessonPath = l => `${academy.base}/${l.slug}`
