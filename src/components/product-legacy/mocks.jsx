import { Grain, Avatar, AppIcon, LogoMark } from '../ui'

// Original JSX product mockups for every legacy image slot. Inter, #e6e7ea hairlines, indigo accents.
const chip = {
  green: 'bg-[#ecfdf3] text-[#027a48] border-[rgba(2,122,72,.18)]',
  amber: 'bg-[#fffaeb] text-[#b54708] border-[rgba(181,71,8,.18)]',
  indigo: 'bg-[#eef2ff] text-[#4b40d6] border-[rgba(96,86,255,.2)]',
  red: 'bg-white text-[#b42318] border-[rgba(180,35,24,.18)]',
  gray: 'bg-[#f3f3f4] text-[#5b6070] border-line',
}
export const Chip = ({ tone = 'gray', children }) => <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10.5px] font-medium whitespace-nowrap ${chip[tone]}`}>{children}</span>

export function Window({ title, children, className = '' }) {
  return (
    <div className={`relative w-full bg-white border border-line rounded-xl overflow-hidden shadow-[0_12px_32px_-12px_rgba(13,22,47,.18)] font-sans text-left ${className}`}>
      <div className="flex items-center gap-2 px-3.5 h-9 border-b border-line bg-[#fcfcfd]">
        <span className="flex gap-1.5">{['#e6e7ea', '#e6e7ea', '#e6e7ea'].map((c, i) => <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}</span>
        <span className="ml-1 text-[11.5px] text-muted truncate">{title}</span>
        <span className="ml-auto"><LogoMark size={14} /></span>
      </div>
      {children}
    </div>
  )
}

const Row = ({ children, className = '' }) => <div className={`flex items-center gap-2.5 px-3.5 py-2.5 border-b border-line/70 last:border-b-0 ${className}`}>{children}</div>
const T = ({ children, className = '' }) => <span className={`text-[12.5px] text-ink truncate ${className}`}>{children}</span>
const M = ({ children, className = '' }) => <span className={`text-[11px] text-muted whitespace-nowrap ${className}`}>{children}</span>
const Bar = ({ w, tone = '#6056ff', className = '' }) => <span className={`block h-1.5 rounded-full bg-[#f3f3f4] overflow-hidden ${className}`}><span className="block h-full rounded-full" style={{ width: `${w}%`, background: tone }} /></span>
const Line = ({ w = 100, className = '' }) => <span className={`block h-2 rounded bg-[#eef0f3] ${className}`} style={{ width: `${w}%` }} />

const views = {
  tickets: () => (
    <Window title="Support queue · Today">
      {[['Refund for order 4471', 'Resolved', 'green', 2], ['Can I change my plan?', 'Resolved', 'green', 5], ['Delivery stuck in transit', 'Drafting', 'indigo', 9], ['Charged twice this month', 'Escalated', 'amber', 13], ['Reset two-factor login', 'Resolved', 'green', 4]].map(([t, s, c, seed]) => (
        <Row key={t}><Avatar seed={seed} size={22} /><T className="flex-1">{t}</T><Chip tone={c}>{s}</Chip></Row>
      ))}
    </Window>
  ),
  chat: () => (
    <Window title="Live chat · Mira">
      <div className="p-4 flex flex-col gap-2.5">
        <div className="self-start max-w-[80%] rounded-2xl rounded-bl-md bg-[#f3f3f4] px-3 py-2 text-[12.5px] text-ink">My parcel says delivered but it never arrived.</div>
        <div className="self-end max-w-[80%] rounded-2xl rounded-br-md bg-indigo-brand px-3 py-2 text-[12.5px] text-white">Sorry about that. I have opened a trace with the courier and sent a replacement today.</div>
        <div className="self-end"><Chip tone="green">Replacement order created</Chip></div>
        <div className="self-start flex gap-1 rounded-2xl bg-[#f3f3f4] px-3 py-2.5">{[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted pl-caret" style={{ animationDelay: `${i * 0.2}s` }} />)}</div>
      </div>
    </Window>
  ),
  kb: () => (
    <Window title="Knowledge · 214 sources">
      {[['Returns policy (2026)', 'Synced 2m ago'], ['Shipping zones and rates', 'Synced 1h ago'], ['Billing FAQ', 'Synced today'], ['Macro: damaged item', 'Synced today']].map(([t, m]) => (
        <Row key={t}><svg viewBox="0 0 16 16" className="w-4 h-4 shrink-0" fill="none" stroke="#868a97" strokeWidth="1.4"><path d="M4 1.5h5l3 3v10H4z" /><path d="M9 1.5v3h3" /></svg><T className="flex-1">{t}</T><M>{m}</M></Row>
      ))}
      <div className="px-3.5 py-3 bg-[#fcfcfd]"><div className="flex justify-between mb-1.5"><M>Coverage of last 30 days of tickets</M><M className="!text-[#027a48] font-medium">87%</M></div><Bar w={87} tone="#0e9384" /></div>
    </Window>
  ),
  tone: () => (
    <Window title="Voice and tone">
      <div className="p-4 grid gap-3.5">
        {[['Warmth', 72], ['Brevity', 58], ['Formality', 30]].map(([l, v]) => (
          <div key={l}><div className="flex justify-between mb-1.5"><M className="!text-ink">{l}</M><M>{v}</M></div><Bar w={v} /></div>
        ))}
        <div className="rounded-lg border border-line p-3 text-[12px] leading-[1.5] text-ink bg-[#fcfcfd]">“Thanks for flagging this, Sam. I have sorted the refund and you will see it within two days.”</div>
      </div>
    </Window>
  ),
  integrations: () => (
    <div className="relative w-full max-w-[420px] aspect-[4/3] mx-auto">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">{[[60, 60], [200, 30], [340, 60], [60, 240], [200, 270], [340, 240]].map(([x, y], i) => <path key={i} d={`M200 150 L${x} ${y}`} stroke="#6056ff" strokeOpacity=".3" strokeDasharray="4 4" />)}</svg>
      {[[15, 20], [50, 10], [85, 20], [15, 80], [50, 90], [85, 80]].map(([x, y], i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-line shadow-glass flex items-center justify-center" style={{ left: `${x}%`, top: `${y}%` }}><AppIcon seed={i * 2 + 1} className="w-7 h-7" /></span>
      ))}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-white border border-line shadow-glass flex items-center justify-center"><LogoMark size={32} /></span>
    </div>
  ),
  keywords: () => (
    <Window title="Keyword gaps · 1,284 found">
      <div className="grid grid-cols-[1fr_56px_70px] gap-3 px-3.5 py-2 text-[10.5px] text-muted border-b border-line"><span>Keyword</span><span className="text-right">Volume</span><span>Difficulty</span></div>
      {[['ai support playbook', '8.1k', 32], ['ticket deflection rate', '5.4k', 48], ['help centre templates', '3.9k', 21], ['csat benchmark 2026', '2.7k', 64]].map(([k, v, d]) => (
        <div key={k} className="grid grid-cols-[1fr_56px_70px] gap-3 items-center px-3.5 py-2.5 border-b border-line/70 last:border-0"><T>{k}</T><M className="text-right !text-ink">{v}</M><Bar w={d} tone={d > 50 ? '#f59e0b' : '#0e9384'} /></div>
      ))}
    </Window>
  ),
  brief: () => (
    <Window title="Brief · ticket deflection guide">
      <div className="p-4 grid gap-2.5">
        <div className="flex gap-2"><Chip tone="indigo">H1</Chip><T>What is a good deflection rate?</T></div>
        {['Benchmarks by industry', 'How agents raise it', 'Five quick wins'].map(h => <div key={h} className="flex gap-2 pl-4"><Chip>H2</Chip><T>{h}</T></div>)}
        <div className="mt-1 flex flex-wrap gap-1.5">{['2,100 words', '6 sources', 'Intent: learn'].map(t => <Chip key={t}>{t}</Chip>)}</div>
      </div>
    </Window>
  ),
  draft: () => (
    <Window title="Draft · v3">
      <div className="p-4 grid gap-2">
        <span className="font-display text-[15px] text-ink">Five quick wins for deflection</span>
        <Line w={96} /><Line w={88} /><span className="block h-2 rounded bg-[#6056ff]/20 w-[72%]" /><Line w={92} /><Line w={64} />
        <div className="mt-2 flex items-center gap-2 rounded-md border border-[rgba(96,86,255,.2)] bg-[#eef2ff] px-2.5 py-1.5 text-[11px] text-[#4b40d6]">Suggest: add an internal link to the returns guide</div>
      </div>
    </Window>
  ),
  score: () => (
    <Window title="Page score">
      <div className="p-4 flex items-center gap-5">
        <svg viewBox="0 0 80 80" className="w-20 h-20 shrink-0"><circle cx="40" cy="40" r="32" stroke="#f3f3f4" strokeWidth="8" fill="none" /><circle cx="40" cy="40" r="32" stroke="#6056ff" strokeWidth="8" fill="none" strokeDasharray={`${0.91 * 201} 201`} strokeLinecap="round" transform="rotate(-90 40 40)" /><text x="40" y="45" textAnchor="middle" fontSize="18" fontWeight="600" fill="#0d162f" fontFamily="Inter">91</text></svg>
        <div className="grid gap-1.5 min-w-0">{['Title under 60 characters', 'Answers search intent', 'Schema markup added', 'Two images missing alt text'].map((t, i) => <div key={t} className="flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${i === 3 ? 'bg-[#f59e0b]' : 'bg-[#0e9384]'}`} /><T className="!text-[12px]">{t}</T></div>)}</div>
      </div>
    </Window>
  ),
  report: () => (
    <Window title="Organic traffic · 90 days">
      <div className="p-4">
        <div className="flex items-end gap-3 mb-2"><span className="text-[24px] font-medium tracking-[-0.48px] text-ink">48.2k</span><span className="text-[11.5px] font-medium text-eval-teal mb-1">+38% vs last quarter</span></div>
        <svg viewBox="0 0 300 90" className="w-full h-[90px]"><defs><linearGradient id="mkrp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6056ff" stopOpacity=".2" /><stop offset="1" stopColor="#6056ff" stopOpacity="0" /></linearGradient></defs><path d="M0 75 C30 70 50 72 75 62 S120 58 150 44 S210 36 240 22 S280 14 300 8 V90 H0z" fill="url(#mkrp)" /><path d="M0 75 C30 70 50 72 75 62 S120 58 150 44 S210 36 240 22 S280 14 300 8" stroke="#6056ff" strokeWidth="1.75" fill="none" /></svg>
      </div>
    </Window>
  ),
  calendar: () => (
    <Window title="Schedules · this week">
      <div className="grid grid-cols-5 gap-1.5 p-3.5">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => <M key={d} className="text-center">{d}</M>)}
        {Array.from({ length: 15 }).map((_, i) => {
          const on = [1, 3, 7, 9, 12].includes(i)
          return <span key={i} className={`h-9 rounded-md text-[10px] flex items-center justify-center ${on ? 'bg-indigo-brand text-white font-semibold shadow-calendar-active' : 'bg-[#f6f5f9] text-chip-muted'}`}>{on ? ['08:00', '09:30', '07:00', '17:00', '06:00'][[1, 3, 7, 9, 12].indexOf(i)] : ''}</span>
        })}
      </div>
      <Row className="border-t border-line"><span className="spinner" /><T className="flex-1">Weekly pipeline digest</T><M>Runs Fri 06:00</M></Row>
    </Window>
  ),
  flow: () => (
    <div className="relative w-full max-w-[460px] mx-auto font-sans">
      <svg viewBox="0 0 460 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none"><path d="M120 60 C170 60 170 110 220 110 M120 160 C170 160 170 110 220 110 M340 110 L400 110" stroke="#c8cbd6" strokeWidth="1.4" fill="none" /></svg>
      <div className="relative grid grid-cols-[1fr_1fr_auto] items-center gap-6 h-[220px]">
        <div className="grid gap-12">{['New lead form', 'Every Monday 8am'].map((t, i) => <span key={t} className="relative bg-white border border-line rounded-xl px-3 py-2 text-[11.5px] text-ink shadow-sm"><span className="absolute -top-2.5 left-2 rounded-full bg-amber-100 text-amber-700 text-[9.5px] font-medium px-1.5">Trigger</span>{t}</span>)}</div>
        <span className="bg-white border border-indigo-brand rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-sm"><Avatar seed={6} size={24} rounded="rounded-md" /><span className="text-[12.5px] font-medium text-ink">Research agent</span></span>
        <span className="flex flex-col gap-2">{[1, 4, 7].map(s => <span key={s} className="w-9 h-9 rounded-full bg-white border border-line flex items-center justify-center"><AppIcon seed={s} className="w-5 h-5" /></span>)}</span>
      </div>
    </div>
  ),
  email: () => (
    <Window title="Draft reply · inbound demo request">
      <div className="p-4 grid gap-2.5">
        <div className="flex items-center gap-2"><M>To</M><Chip>dana@yarrow.example</Chip></div>
        <div className="flex items-center gap-2"><M>Subject</M><T>Your pricing question, plus a 15-minute slot</T></div>
        <div className="rounded-lg border border-line p-3 grid gap-1.5"><Line w={94} /><Line w={86} /><Line w={60} /></div>
        <div className="flex gap-2"><Chip tone="green">Personalised from CRM</Chip><Chip tone="indigo">Calendar link added</Chip></div>
      </div>
    </Window>
  ),
  pipeline: () => (
    <Window title="Pipeline · this month">
      <div className="grid grid-cols-3 gap-2 p-3">
        {[['New', 4], ['Contacted', 3], ['Meeting', 2]].map(([c, n], ci) => (
          <div key={c} className="rounded-lg bg-[#f6f5f9] p-2 grid gap-1.5 content-start">
            <M className="!text-ink font-medium">{c} · {n}</M>
            {Array.from({ length: n }).map((_, i) => <span key={i} className="flex items-center gap-1.5 rounded-md bg-white border border-line px-1.5 py-1.5"><Avatar seed={ci * 4 + i} size={16} /><span className="block h-1.5 flex-1 rounded bg-[#eef0f3]" /></span>)}
          </div>
        ))}
      </div>
    </Window>
  ),
  code: () => (
    <div className="w-full rounded-xl overflow-hidden border border-[#2a3350] bg-[#0d162f] font-mono text-[11.5px] leading-[1.7] text-[#c8cbd6] shadow-[0_12px_32px_-12px_rgba(13,22,47,.4)] text-left">
      <div className="flex items-center gap-2 px-3.5 h-9 border-b border-white/10 text-white/50"><span className="text-[#a5b4fc]">POST</span> /v1/agents/triage/runs</div>
      <pre className="p-4 whitespace-pre-wrap">{`{
  "input": { "ticket_id": "T-4471" },
  "wait": true
}`}<span className="text-white/40">{`\n// 200 OK · 1.8s`}</span>{`\n{ "status": "resolved", "reply_sent": true }`}</pre>
    </div>
  ),
  chart: () => (
    <Window title="Runs by agent">
      <div className="p-4 flex items-end gap-3 h-[150px]">
        {[38, 62, 44, 90, 70, 52, 80].map((h, i) => <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 3 ? '#6056ff' : 'rgba(13,22,47,.12)' }} />)}
      </div>
    </Window>
  ),
  research: () => (
    <Window title="Research brief · market sizing">
      {[['Analyst note, Q2 outlook', 'Cited 4x'], ['Survey of 1,200 buyers', 'Cited 3x'], ['Public filings, three rivals', 'Cited 2x'], ['Forum threads, 90 days', 'Cited 1x']].map(([t, m], i) => (
        <Row key={t}><span className="w-5 h-5 rounded bg-[#eef2ff] text-[10px] font-semibold text-[#4b40d6] flex items-center justify-center">{i + 1}</span><T className="flex-1">{t}</T><M>{m}</M></Row>
      ))}
      <div className="px-3.5 py-3 bg-[#fcfcfd] text-[12px] leading-[1.5] text-ink">Summary: demand grows fastest in mid-market retail, led by self-serve buyers.</div>
    </Window>
  ),
  team: () => (
    <div className="relative w-full max-w-[440px] mx-auto h-[230px] font-sans">
      <svg viewBox="0 0 440 230" className="absolute inset-0 w-full h-full"><path d="M220 62 V100 M220 100 H80 V150 M220 100 V150 M220 100 H360 V150" stroke="#c8cbd6" strokeWidth="1.4" fill="none" /></svg>
      <span className="absolute left-1/2 top-4 -translate-x-1/2 bg-white border border-indigo-brand rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm"><Avatar seed={2} size={24} rounded="rounded-md" /><span className="text-[12.5px] font-medium text-ink">Lead agent</span></span>
      {[['Researcher', 5, 18], ['Writer', 8, 50], ['Reviewer', 12, 82]].map(([n, s, x]) => (
        <span key={n} className="absolute top-[150px] -translate-x-1/2 bg-white border border-line rounded-xl px-2.5 py-2 flex items-center gap-2 shadow-sm" style={{ left: `${x}%` }}><Avatar seed={s} size={20} rounded="rounded-md" /><span className="text-[12px] font-medium text-ink">{n}</span></span>
      ))}
    </div>
  ),
}

// Stage: grain / tile backdrop centring a mock. `bleed` lets a wide mock bleed off the right edge.
export function Mock({ kind, tone = 'violet', className = '', plain = false, pad = 'p-6 md:p-10' }) {
  const V = views[kind] || views.tickets
  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center ${pad} ${className}`}>
      {!plain && <Grain tone={tone} />}
      <div className="relative w-full max-w-[460px]"><V /></div>
    </div>
  )
}
export const mockKinds = Object.keys(views)
