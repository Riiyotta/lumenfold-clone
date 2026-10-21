import { useEffect, useMemo, useState } from 'react'
import { ContentCard, ContentRow, HubSectionHeading, PageSection } from '../../components/content/parts'
import HubHero from '../../components/content/HubHero'
import ClosingCTA from '../../components/content/ClosingCTA'
import { events, resources, eventsHero, resourcesHero, hubCta, isPast, eventDate, eventShortDate } from '../../content/editorial'
import '../../components/content/content.css'

const listPad = 'relative flex flex-col gap-8 py-20'
const recorded = e => e.kind === 'Webinar' || e.kind === 'Fireside chat'

// Upcoming ascending, past newest first; re-evaluated on mount.
function useEventLists() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => setNow(Date.now()), [])
  return useMemo(() => ({
    upcoming: events.filter(e => !isPast(e, now)).sort((a, b) => a.start.localeCompare(b.start)),
    past: events.filter(e => isPast(e, now)).sort((a, b) => b.start.localeCompare(a.start)),
  }), [now])
}

export function EventsHub() {
  const { upcoming, past } = useEventLists()
  const slides = upcoming.map(e => ({ partner: e.partner, kind: e.kind, title: e.title, description: e.description, cta: 'Save your seat', to: `/events/${e.slug}` }))
  return (
    <>
      <HubHero {...eventsHero} carousel={{ label: eventsHero.pill, count: `upcoming ${eventsHero.noun}`, empty: eventsHero.empty, slides }} />
      <PageSection padClass={listPad}>
        <HubSectionHeading>Upcoming</HubSectionHeading>
        {upcoming.length ? (
          <div className="flex flex-col gap-5">
            {upcoming.map(e => (
              <ContentRow key={e.slug} to={`/events/${e.slug}`} title={e.title} description={e.description} cta="Save your seat"
                event={{ partner: e.partner, kind: e.kind, date: eventDate(e), time: e.time }} />
            ))}
          </div>
        ) : <p className="text-base leading-6 text-tertiary">No upcoming sessions right now. Check back again soon.</p>}
      </PageSection>
      <PageSection padClass={listPad} className="bg-surface-secondary-light" innerClassName="bg-surface-secondary-light">
        <HubSectionHeading>Past events</HubSectionHeading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {past.map(e => (
            <ContentCard key={e.slug} to={`/events/${e.slug}`} partner={e.partner} kind={e.kind} date={eventShortDate(e)} title={e.title} description={e.description}
              cta={recorded(e) ? 'Watch the recording' : 'See the event'} />
          ))}
        </div>
      </PageSection>
      <ClosingCTA {...hubCta.events} />
    </>
  )
}

export function ResourcesHub() {
  const f = resources.featured
  const slides = [{ partner: 'Lumenfold', kind: f.kind, title: f.title, description: f.description, cta: f.cta, to: f.to }, ...resources.items.map(r => ({ ...r }))]
  return (
    <>
      <HubHero {...resourcesHero} carousel={{ label: resourcesHero.pill, count: resourcesHero.noun, empty: resourcesHero.empty, slides }} />
      <PageSection padClass={listPad}>
        <HubSectionHeading>Featured</HubSectionHeading>
        <div className="flex flex-col gap-5">
          <ContentRow to={f.to} cover={f.cover} kind={f.kind} title={f.title} description={f.description} cta={f.cta} />
        </div>
      </PageSection>
      <PageSection padClass={listPad} className="bg-surface-secondary-light" innerClassName="bg-surface-secondary-light">
        <HubSectionHeading>Library</HubSectionHeading>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
          {resources.items.map(r => <ContentCard key={r.title} {...r} />)}
        </div>
      </PageSection>
      <ClosingCTA {...hubCta.resources} secondaryTo="/events" />
    </>
  )
}
