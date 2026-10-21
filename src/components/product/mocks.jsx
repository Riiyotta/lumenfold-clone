// A.1 hero mock cards (4 variants) and original UI mockups used as A.2 "screenshots".
import { Avatar, AppIcon } from '../ui'
import { LineIcon, VideoPoster, ACCENT } from './lib'

const Initials = ({ t, size = 20, font = 8 }) => (
  <span className="rounded-full bg-[#f3f3f4] text-ink font-semibold flex items-center justify-center shrink-0" style={{ width: size, height: size, fontSize: font }}>{t}</span>
)

/* 1. Knowledge fan: 5 docs -> bezier fan -> 4 glass coins */
export function KnowledgeMock({ docs, coins }) {
  const ys = [19, 56, 94, 131]
  return (
    <div className="grid md:grid-cols-[1fr_auto_auto] items-center gap-4 md:gap-2 px-5 py-8 md:px-8 md:py-10">
      <ul className="divide-y divide-line">
        {docs.map(d => (
          <li key={d} className="flex items-center gap-3 py-3">
            <LineIcon name="doc" size={17} stroke={1.6} />
            <span className="text-[12.5px] text-ink">{d}</span>
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 72 150" width="72" height="150" className="hidden md:block" aria-hidden="true">
        <defs><linearGradient id="kfan" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c8cbd6" /><stop offset="1" stopColor={ACCENT} /></linearGradient></defs>
        {ys.map((y, i) => {
          const d = `M0 75 C 34 75, 38 ${y}, 72 ${y}`
          return (
            <g key={i}>
              <path d={d} stroke="url(#kfan)" strokeWidth="1.4" fill="none" />
              <circle r="2.2" fill={ACCENT} opacity="0">
                <animateMotion dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}
      </svg>
      <div className="flex flex-row md:flex-col gap-3">
        {coins.map(s => (
          <span key={s} className="w-11 h-11 rounded-full border border-line bg-white/55 shadow-glass-sm backdrop-blur-glass-lg flex items-center justify-center">
            <span className="rounded-[6px] bg-black/5 overflow-hidden"><Avatar seed={s} size={28} rounded="rounded-[6px]" /></span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* 2. Approvals table: 3 rows, approve/decline chips or a muted mode label */
export function ApprovalsMock({ head, rows }) {
  return (
    <div className="px-4 py-5 md:px-5 md:py-6">
      <div className="grid grid-cols-[minmax(0,1fr)_150px] gap-3 pb-2.5 text-[11px] text-muted"><span>{head[0]}</span><span>{head[1]}</span></div>
      {rows.map((r, i) => (
        <div key={r.task} className="grid grid-cols-[minmax(0,1fr)_150px] gap-3 items-center border-t border-line py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar seed={r.seed} size={22} />
            <span className="text-[12.5px] text-ink truncate">{r.task}</span>
          </div>
          {r.mode ? <span className="text-[11.5px] text-muted">{r.mode}</span> : (
            <div className="flex gap-1.5">
              <button type="button" className="rounded-md px-2.5 py-1 text-[11.5px] font-medium font-sans text-status-green bg-[#ecfdf3] border border-[rgba(2,122,72,.18)] hover:bg-[#d1fadf] transition-colors duration-150">Approve</button>
              <button type="button" className="rounded-md px-2.5 py-1 text-[11.5px] font-medium font-sans text-[#b42318] bg-white border border-[rgba(180,35,24,.18)] hover:bg-[#fef3f2] transition-colors duration-150">Decline</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* 3. Version table: 4 rows */
export function VersionMock({ rows }) {
  return (
    <div className="px-4 py-5 md:px-5 md:py-6">
      {rows.map((r, i) => (
        <div key={r.v} className={`grid grid-cols-[34px_minmax(0,1fr)_50px_76px] gap-3 items-center py-3 ${i ? 'border-t border-line' : ''}`}>
          <span className="text-xs text-muted">{r.v}</span>
          <div className="flex items-center gap-2 min-w-0"><Initials t={r.who} /><span className="text-[12.5px] text-ink truncate">{r.note}</span></div>
          <span className="text-xs font-semibold text-status-green text-right">{r.score}</span>
          {i === 0 ? <span className="text-[11px] text-muted text-right">current</span> : (
            <button type="button" className="justify-self-end inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11px] font-sans text-ink hover:bg-gray-50 transition-colors duration-150">
              <LineIcon name="history" size={11} stroke={1.8} className="text-ink" />Restore
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

/* 4. Collaboration lists: 4 projects + 3 people */
export function CollabMock({ projectsLabel, projects, peopleLabel, people }) {
  return (
    <div className="px-5 py-8 md:px-8 md:py-10">
      <p className="text-[11px] text-muted mb-3">{projectsLabel}</p>
      {projects.map(p => (
        <div key={p.name} className="flex items-center gap-2.5 py-2.5">
          <LineIcon name="folder" size={14} stroke={1.6} className="text-indigo-brand" />
          <span className="text-[12.5px] text-ink">{p.name}</span>
          <span className="ml-auto text-[10.5px] text-muted">{p.meta}</span>
        </div>
      ))}
      <div className="mt-6 border-t border-line pt-4">
        <p className="text-[11px] text-muted mb-3">{peopleLabel}</p>
        {people.map(p => (
          <div key={p.name} className="flex items-center gap-2.5 py-2">
            <Initials t={p.initials} size={24} font={9} />
            <span className="text-[12.5px] text-ink truncate min-w-0">{p.name}</span>
            <span className="ml-auto text-right leading-tight shrink-0">
              <span className="block text-[11px] text-ink">{p.role}</span>
              <span className="block text-[10.5px] text-muted">{p.scope}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 5. Phone: 16:9 poster, black/30 overlay, 64px glass play disc (opens modal placeholder) */
export function PhoneVideoMock({ poster, title }) {
  return <VideoPoster src={poster} title={title} className="aspect-video bg-[#0a0a0a]" />
}

export function HeroMock({ mock }) {
  if (mock.kind === 'knowledge') return <KnowledgeMock {...mock} />
  if (mock.kind === 'approvals') return <ApprovalsMock {...mock} />
  if (mock.kind === 'version') return <VersionMock {...mock} />
  if (mock.kind === 'collab') return <CollabMock {...mock} />
  return <PhoneVideoMock {...mock} />
}

/* ---------- A.2 screenshot mockups (~4:3, natural height) ---------- */
function Chrome({ title, children }) {
  return (
    <div className="font-sans text-ink">
      <div className="flex items-center gap-1.5 px-4 h-9 border-b border-line bg-surface-secondary-light">
        {[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-line-dark" />)}
        <span className="ml-3 text-[11px] text-muted truncate">{title}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">{children}</div>
    </div>
  )
}

export function Screen({ kind, title }) {
  if (kind === 'sources') return (
    <Chrome title={title}>
      <div className="absolute inset-0 grid grid-cols-[38%_1fr]">
        <div className="border-r border-line p-4 space-y-2.5 bg-white">
          <p className="text-[10px] text-muted">Sources</p>
          {['Help centre', 'Shared drive', 'Wiki space', 'Product notes', 'Ticket history'].map((s, i) => (
            <div key={s} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${i === 1 ? 'bg-indigo-brand/10 text-indigo-brand' : ''}`}><AppIcon seed={i * 2 + 1} className="w-4 h-4" />{s}</div>
          ))}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between"><p className="text-[12px] font-medium">Shared drive</p><span className="text-[10px] text-status-green bg-[#ecfdf3] rounded-full px-2 py-0.5">Synced 2m ago</span></div>
          <div className="mt-3 divide-y divide-line border border-line rounded-md">
            {['Pricing tiers 2026', 'Refund rules', 'Partner terms', 'Holiday schedule', 'Brand voice', 'Escalation map'].map((f, i) => (
              <div key={f} className="flex items-center gap-2 px-3 py-2 text-[11px]"><LineIcon name="doc" size={13} /><span>{f}</span><span className="ml-auto text-[10px] text-muted">{i + 2} days</span></div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  )
  if (kind === 'answer') return (
    <Chrome title={title}>
      <div className="absolute inset-0 p-5 flex flex-col gap-3 bg-gradient-to-b from-white to-indigo-brand/[.03]">
        <div className="self-end max-w-[70%] rounded-2xl rounded-br-md bg-indigo-brand text-white text-[11.5px] px-3.5 py-2">Can a reseller offer the annual discount?</div>
        <div className="flex gap-2 max-w-[82%]"><Avatar seed={4} size={24} rounded="rounded-md" />
          <div className="rounded-2xl rounded-tl-md border border-line bg-white text-[11.5px] px-3.5 py-2.5 leading-relaxed">Yes, approved resellers can pass on up to 15% for annual plans, but only after the partner agreement is countersigned.
            <div className="mt-2 flex flex-wrap gap-1.5">{['Partner terms §4', 'Pricing tiers 2026'].map(c => <span key={c} className="rounded-full bg-indigo-brand/10 text-indigo-brand text-[10px] px-2 py-0.5">{c}</span>)}</div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[11px] text-muted">Ask about any policy…<span className="ml-auto w-6 h-6 rounded-full bg-indigo-brand flex items-center justify-center"><svg viewBox="0 0 12 12" className="w-3 h-3"><path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg></span></div>
      </div>
    </Chrome>
  )
  if (kind === 'queue') return (
    <Chrome title={title}>
      <div className="absolute inset-0 p-4">
        <div className="flex gap-2 mb-3">{['Waiting 4', 'Approved 18', 'Declined 2'].map((t, i) => <span key={t} className={`text-[10.5px] rounded-md px-2 py-1 border ${i === 0 ? 'border-indigo-brand/40 text-indigo-brand bg-indigo-brand/5' : 'border-line text-muted'}`}>{t}</span>)}</div>
        <div className="space-y-2">
          {[['Refund over $500', 'Billing agent', 3], ['Contract redline', 'Legal reviewer', 6], ['Bulk email to 2,400', 'Outreach agent', 1], ['New vendor record', 'Ops agent', 9]].map(([t, a, s], i) => (
            <div key={t} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(13,22,47,.04)]">
              <Avatar seed={s} size={22} />
              <div className="min-w-0"><p className="text-[11.5px] font-medium truncate">{t}</p><p className="text-[10px] text-muted">{a} · {i * 7 + 4} min ago</p></div>
              <span className="ml-auto flex gap-1"><span className="text-[10px] rounded px-2 py-0.5 bg-[#ecfdf3] text-status-green border border-[rgba(2,122,72,.18)]">Approve</span><span className="text-[10px] rounded px-2 py-0.5 text-[#b42318] border border-[rgba(180,35,24,.18)]">Decline</span></span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
  if (kind === 'rules') return (
    <Chrome title={title}>
      <div className="absolute inset-0 p-5">
        <p className="text-[12px] font-medium mb-3">Escalate when…</p>
        {[['Amount', 'is above', '$500'], ['Customer tier', 'equals', 'Enterprise'], ['Confidence', 'is below', '80%']].map((r, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-muted w-8">{i ? 'or' : 'if'}</span>
            {r.map((c, k) => <span key={k} className={`text-[11px] rounded-md border border-line px-2.5 py-1.5 ${k === 2 ? 'text-indigo-brand bg-indigo-brand/5' : 'bg-white'}`}>{c}</span>)}
          </div>
        ))}
        <p className="text-[12px] font-medium mt-5 mb-3">Then route to</p>
        <div className="flex items-center gap-2">{[2, 6, 10].map(s => <Avatar key={s} seed={s} size={26} className="ring-2 ring-white -ml-1 first:ml-0" />)}<span className="text-[11px] text-muted ml-1">Finance leads · reply within 2h</span></div>
        <div className="absolute bottom-5 right-5 left-5 rounded-lg bg-indigo-brand/5 border border-indigo-brand/20 px-3 py-2 text-[10.5px] text-accent-text">Paused runs resume automatically once a reviewer decides.</div>
      </div>
    </Chrome>
  )
  if (kind === 'diff') return (
    <Chrome title={title}>
      <div className="absolute inset-0 p-5 font-mono text-[10.5px] leading-[1.9]">
        <p className="font-sans text-[12px] font-medium mb-2">v13 → v14 · Instructions</p>
        <div className="rounded-md border border-line overflow-hidden">
          <div className="px-3 bg-white text-muted">  Greet the customer by first name.</div>
          <div className="px-3" style={{ background: 'rgba(254,243,242,.7)', color: 'rgba(180,35,24,.75)' }}>- Offer a refund for any late order.</div>
          <div className="px-3 bg-[rgba(236,253,243,.9)] text-status-green">+ Offer a refund if the order is 3+ days late.</div>
          <div className="px-3 bg-[rgba(236,253,243,.9)] text-status-green">+ Otherwise offer free shipping next time.</div>
          <div className="px-3 bg-white text-muted">  Close with a link to the order page.</div>
        </div>
        <div className="font-sans mt-4 flex items-center gap-3">
          {[['v13', '88%', '#c7d2fe'], ['v14', '95%', ACCENT]].map(([v, s, c]) => (
            <div key={v} className="flex-1 rounded-md border border-line p-3"><p className="text-[10px] text-muted">{v} eval score</p><p className="text-[18px] font-semibold" style={{ color: c === ACCENT ? '#027a48' : '#0d162f' }}>{s}</p><span className="mt-1.5 block h-1.5 rounded-full" style={{ background: c, width: s }} /></div>
          ))}
        </div>
      </div>
    </Chrome>
  )
  if (kind === 'timeline') return (
    <Chrome title={title}>
      <div className="absolute inset-0 p-5">
        {['v14 published', 'Eval suite passed', 'v13 rolled back', 'v12 published', 'Draft created'].map((t, i) => (
          <div key={t} className="relative flex gap-3 pb-4">
            <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${i === 0 ? 'bg-indigo-brand' : 'bg-line-dark'}`} />
            {i < 4 && <span className="absolute left-[4.5px] top-4 bottom-0 w-px bg-line" />}
            <div className="min-w-0 flex-1"><p className="text-[11.5px] font-medium">{t}</p><p className="text-[10px] text-muted">{['Today 09:12', 'Today 09:05', 'Mon 16:40', 'Mon 11:02', 'Fri 14:30'][i]} · {['Ana P.', 'Eval bot', 'Jon K.', 'Ana P.', 'Mia L.'][i]}</p></div>
            {i === 2 && <span className="self-start text-[10px] rounded px-2 py-0.5 border border-line">Restore</span>}
          </div>
        ))}
      </div>
    </Chrome>
  )
  if (kind === 'comments') return (
    <Chrome title={title}>
      <div className="absolute inset-0 grid grid-cols-[1fr_44%]">
        <div className="p-4 space-y-2 bg-[radial-gradient(#e6e7ea_1px,transparent_1px)] [background-size:14px_14px]">
          {['Read inbox', 'Classify intent', 'Draft reply', 'Send for review'].map((n, i) => (
            <div key={n} className={`rounded-lg border bg-white px-3 py-2 text-[11px] flex items-center gap-2 ${i === 2 ? 'border-indigo-brand' : 'border-line'}`} style={{ marginLeft: i * 10 }}>
              <AppIcon seed={i + 4} className="w-4 h-4" />{n}{i === 2 && <span className="ml-auto w-4 h-4 rounded-full bg-indigo-brand text-white text-[9px] flex items-center justify-center">2</span>}
            </div>
          ))}
        </div>
        <div className="border-l border-line p-3 space-y-3 bg-white">
          {[['Mia', 'Can we soften the tone here?', 3], ['Jon', 'Done, and added the order link.', 7]].map(([n, t, s]) => (
            <div key={n} className="flex gap-2"><Avatar seed={s} size={20} /><div><p className="text-[10.5px] font-medium">{n} <span className="text-muted font-normal">· 4m</span></p><p className="text-[10.5px] text-muted leading-snug">{t}</p></div></div>
          ))}
          <div className="rounded-md border border-line px-2 py-1.5 text-[10px] text-muted">Reply, or @mention someone</div>
        </div>
      </div>
    </Chrome>
  )
  if (kind === 'roles') return (
    <Chrome title={title}>
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] text-[10.5px] text-muted pb-2 border-b border-line"><span>Member</span><span>View</span><span>Edit</span><span>Publish</span></div>
        {[['Ana Park', 7, [1, 1, 1]], ['Jon Kim', 2, [1, 1, 0]], ['Mia Lund', 9, [1, 1, 0]], ['Ravi Shah', 5, [1, 0, 0]], ['Guest reviewer', 11, [1, 0, 0]]].map(([n, s, p]) => (
          <div key={n} className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-center py-2 border-b border-line text-[11px]">
            <span className="flex items-center gap-2 min-w-0"><Avatar seed={s} size={20} /><span className="truncate">{n}</span></span>
            {p.map((on, k) => <span key={k} className={`w-4 h-4 rounded flex items-center justify-center ${on ? 'bg-indigo-brand' : 'border border-line-dark'}`}>{on ? <svg viewBox="0 0 10 10" className="w-2.5 h-2.5"><path d="M2 5.2l2 2L8 3" stroke="#fff" strokeWidth="1.5" fill="none" /></svg> : null}</span>)}
          </div>
        ))}
      </div>
    </Chrome>
  )
  // 'call': phone call transcript
  return (
    <Chrome title={title}>
      <div className="absolute inset-0 grid grid-cols-[1fr_40%]">
        <div className="p-4 space-y-2.5">
          {[['in', 'Hi, I need to move my appointment to Thursday.'], ['out', 'Of course. I have 10:30 or 2:15 on Thursday. Which suits you?'], ['in', '2:15 please.'], ['out', 'Done. You will get a text confirmation in a moment.']].map(([d, t], i) => (
            <div key={i} className={`max-w-[85%] text-[11px] leading-snug rounded-2xl px-3 py-2 ${d === 'out' ? 'ml-auto bg-indigo-brand text-white rounded-br-md' : 'bg-[#f3f3f4] rounded-bl-md'}`}>{t}</div>
          ))}
        </div>
        <div className="border-l border-line p-4 bg-surface-secondary-light">
          <p className="text-[10px] text-muted">Live call · 01:42</p>
          <div className="mt-2 flex items-end gap-[3px] h-8">{[6, 14, 22, 10, 26, 16, 8, 20, 12, 24, 9, 15].map((h, i) => <span key={i} className="w-[4px] rounded-full bg-indigo-brand/70" style={{ height: h }} />)}</div>
          <p className="mt-4 text-[10px] text-muted">Actions</p>
          {['Found booking', 'Rescheduled slot', 'Sent SMS'].map((a, i) => <p key={a} className="mt-1.5 flex items-center gap-1.5 text-[11px]"><span className="w-3.5 h-3.5 rounded-full bg-[#ecfdf3] flex items-center justify-center"><svg viewBox="0 0 10 10" className="w-2 h-2"><path d="M2 5.2l2 2L8 3" stroke="#027a48" strokeWidth="1.6" fill="none" /></svg></span>{a}</p>)}
        </div>
      </div>
    </Chrome>
  )
}
