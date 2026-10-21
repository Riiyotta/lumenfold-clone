import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { Row } from '../../components/ui'
import { changelog, changelogIntro, formatDate } from '../../content/editorial'
import '../../components/content/content.css'

const Hash = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6.5 2.5L5 13.5M11 2.5l-1.5 11M2.5 6h11M2 10h11" /></svg>
)

// T7 rendered in the marketing chrome: one rail row, entries with a sticky date column and a timeline at lg+.
export default function Changelog() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
  }, [hash])

  return (
    <Row>
      <div className="rl px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <h1 className="font-sans text-[28px] font-semibold">{changelogIntro.title}</h1>
        <p className="mt-2 mb-4 text-lg leading-7" style={{ color: 'var(--rl-muted)' }}>{changelogIntro.body}</p>
        <div>
          {changelog.map(e => (
            <article key={e.id} className="rl-update">
              <div className="rl-meta">
                <time dateTime={e.date} className="rl-date">{formatDate(e.date)}</time>
                <p className="rl-summary">{e.summary}</p>
              </div>
              <div className="rl-update-body">
                <h2 id={e.id} className="flex items-center gap-2">
                  {e.title}
                  <a href={`#${e.id}`} className="rl-anchor p-1 rounded-md hover:bg-[var(--rl-surface)]" aria-label="Link to this entry" style={{ color: 'var(--rl-faint)' }}><Hash /></a>
                </h2>
                <p><img src={e.image} alt="" loading="lazy" width="1400" height="788" className="h-auto" /></p>
                {e.body.map((b, i) => Array.isArray(b) ? <h3 key={i}>{b[1]}</h3> : <p key={i}>{b}</p>)}
                {e.post && <p><Link to={`/posts/${e.post}`} className="font-medium">Read the full announcement →</Link></p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Row>
  )
}

// /changelog/:entry has no page of its own; it redirects to the anchored entry in the feed.
export function ChangelogEntryRedirect() {
  const { entry } = useParams()
  return <Navigate to={`/changelog#${entry}`} replace />
}
