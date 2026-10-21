import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Avatar } from '../../components/ui'
import Autonomy from '../../components/Autonomy'
import LogoWall from '../../components/LogoWall'
import AutonomyTimeline from '../../components/content/AutonomyTimeline'
import EventForm from '../../components/content/EventForm'
import { CompanyLogo, NotFound } from '../../components/content/parts'
import { events, isPast, eventDate } from '../../content/editorial'
import '../../components/content/content.css'

const Calendar = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" fill="none" stroke="#6056ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4.5" width="18" height="16.5" rx="2" /><path d="M16 3v3M8 3v3M3 10h18" />
  </svg>
)

// Speaker photo slot (3:4 inside a 2.5px gradient ring). Illustrated avatar scaled to cover the frame.
function Speaker({ s }) {
  return (
    <div className="speaker-card">
      <div className="speaker-photo"><div><Avatar seed={s.seed} size={200} rounded="rounded-none" className="!absolute left-1/2 top-0 -translate-x-1/2 !w-auto !h-full aspect-square [&_svg]:w-full [&_svg]:h-full" /></div></div>
      <div className="speaker-name text-ink">{s.name}</div>
      <div className="speaker-title">{s.title}</div>
      <div className="mt-auto h-5 flex items-center"><CompanyLogo name={s.company} className="!text-[13px]" /></div>
    </div>
  )
}

export default function EventDetail() {
  const { slug } = useParams()
  const e = events.find(x => x.slug === slug)
  const [past, setPast] = useState(() => (e ? isPast(e) : false))
  useEffect(() => { if (e) setPast(isPast(e)) }, [e])
  if (!e) return <NotFound back="/events" label="Back to events" />
  const [date, time] = [eventDate(e), e.time]
  return (
    <>
      <Row>
        <div className="ev-grid">
          <div className="ev-col ev-col-left">
            <div className="col-left-sticky flex flex-col gap-7 lg:gap-8">
              <div className="left-hero">
                <div className="ev-eyebrow mb-[22px]">{e.eyebrow}</div>
                <h1 className="ev-h1 text-ink">{e.h1[0]} <span className="text-indigo-brand">{e.h1[1]}</span></h1>
                <p className="ev-lead">{e.lead}</p>
              </div>
              <div className="event-bar text-ink">
                <Calendar /><span>{past ? 'Recording' : e.kind}</span><span className="text-line">·</span>
                <span className="flex flex-col">
                  <span>{date}</span>
                  <span className="text-[13.5px] text-muted">{time}</span>
                </span>
              </div>
              <EventForm past={past} />
            </div>
          </div>
          <div className="ev-col ev-col-right">
            <div className="speakers-grid">{e.speakers.map(s => <Speaker key={s.name} s={s} />)}</div>
            <div className="takeaways">
              <h2 className="text-ink">What you will take away</h2>
              <ul>
                {e.takeaways.map(([b, rest]) => (
                  <li key={b}><span className="font-display font-semibold text-indigo-brand">–</span><p><b>{b}</b> {rest}</p></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Row>
      <Autonomy />
      <AutonomyTimeline />
      <LogoWall />
    </>
  )
}
