import { contact } from '../../content/company'
import { Row, Avatar, LogoMark } from '../../components/ui'
import { NativeForm, LogoGrid, GrainCTA, lg } from '../../components/company/shared'

// Original product illustration: a support thread being handled by an agent (12px radius card).
function SupportIllustration() {
  const msgs = [
    { who: 'user', text: 'Our weekly digest agent skipped Monday. Can you take a look?' },
    { who: 'agent', text: 'Found it. The calendar connection expired on Sunday night. I have flagged it for your admin.' },
    { who: 'user', text: 'Thanks, reconnected. Can you rerun it?' },
  ]
  return (
    <div className="w-full max-w-[494px] rounded-xl bg-white border border-line shadow-glass overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <LogoMark size={16} /><span className="text-[13px] font-medium text-ink">Support thread</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] text-status-green"><span className="w-1.5 h-1.5 rounded-full bg-status-green" />Replied in 4 min</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 ${m.who === 'user' ? 'flex-row-reverse' : ''}`}>
            {m.who === 'user' ? <Avatar seed={6} size={24} /> : <span className="w-6 h-6 rounded-full bg-indigo-ghost flex items-center justify-center"><LogoMark size={14} /></span>}
            <p className={`max-w-[78%] rounded-xl px-3 py-2 text-[13px] leading-[1.5] ${m.who === 'user' ? 'bg-indigo-brand text-white' : 'bg-tile-base text-ink'}`}>{m.text}</p>
          </div>
        ))}
        <div className="running-row relative flex items-center gap-2 rounded-md px-3 py-2 text-[12px] text-muted">
          <span className="spinner" />Rerunning weekly digest
        </div>
      </div>
    </div>
  )
}

function ContactHero() {
  return (
    <Row>
      <div className="border-b border-line grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center lg:border-r border-line">
          <h1 className="text-4xl md:text-5xl md:leading-tight font-medium mb-4 text-ink">{contact.title}</h1>
          <p className="text-lg mb-8 max-w-md text-muted">{contact.body}</p>
          <div className="max-w-md relative">
            <NativeForm fields={contact.fields} submit={contact.submit} success={contact.success} error={contact.error} buttonClass={`btn-primary w-full ${lg}`} />
          </div>
        </div>
        {/* Legacy layout puts the image above the form below 992px, so it is shown first on small screens. */}
        <div className="order-first lg:order-none flex items-center justify-center p-6 md:p-12 border-b lg:border-b-0 border-line bg-gradient-to-br from-surface-secondary-light to-transparent">
          <SupportIllustration />
        </div>
      </div>
    </Row>
  )
}

export default function ContactSupport() {
  return (
    <>
      <ContactHero />
      <LogoGrid />
      <GrainCTA title={contact.cta.title} highlight={contact.cta.highlight} body={contact.cta.body} />
    </>
  )
}
