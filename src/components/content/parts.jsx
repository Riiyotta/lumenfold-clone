import { Link } from 'react-router-dom'
import { Row, Wordmark, Avatar, LogoMark } from '../ui'
import { formatShortDate } from '../../content/editorial'

// Standard StackedSection: rail row + py-12/28 and px 24/48/80.
export function PageSection({ children, className = '', innerClassName = '', padClass = 'py-12 md:py-28' }) {
  return (
    <Row className={className} innerClassName={innerClassName}>
      <div className={`${padClass} px-6 md:px-12 lg:px-20`}>{children}</div>
    </Row>
  )
}

// The only uppercase eyebrow in the DS: Sora 12/18 600, .08em.
export const KindLabel = ({ children, className = 'text-indigo-brand' }) => (
  <span className={`font-display text-xs leading-[18px] font-semibold uppercase tracking-[0.08em] ${className}`}>{children}</span>
)

// 16px arrow: line + polyline, stroke 2.
export const LineArrow = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

export const CtaText = ({ children, className = 'text-indigo-brand' }) => (
  <span className={`inline-flex items-center gap-1.5 font-display text-sm leading-[21px] font-semibold ${className}`}>{children}<LineArrow /></span>
)

// HubSectionHeading: Sora 36/43.2 600 at every breakpoint.
export const HubSectionHeading = ({ children }) => (
  <h2 className="text-[36px] leading-[43.2px] font-semibold tracking-[-0.02em] text-ink">{children}</h2>
)

// Partner / company logo. Lumenfold uses its own mark; others get a fictional wordmark.
export function CompanyLogo({ name, className = '' }) {
  if (name === 'Lumenfold') return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}><LogoMark size={16} /><span className="font-display text-[15px] font-semibold tracking-[-0.03em] text-ink leading-none">lumenfold</span></span>
  )
  return <Wordmark name={name} size="sm" className={className} />
}

const cardSurface = 'box-border bg-surface-light border border-line text-ink transition-all duration-300 ease-[ease] hover:-translate-y-[5px] hover:bg-indigo-brand/[0.06] hover:border-indigo-brand/20'

// 1.1 ContentCard (hub / event / resource).
export function ContentCard({ to, partner, kind, date, title, description, cta }) {
  return (
    <Link to={to} className={`flex flex-col gap-4 p-7 ${cardSurface}`}>
      <div className="h-7 flex items-center justify-between gap-3">
        <span className="grayscale opacity-[.65]"><CompanyLogo name={partner} /></span>
        <KindLabel>{kind}</KindLabel>
      </div>
      <div className="text-[13px] text-tertiary">{date}</div>
      <h3 className="text-xl leading-6 font-semibold tracking-[-0.01em] text-balance">{title}</h3>
      <p className="flex-1 text-[15px] leading-[22.5px] text-tertiary text-pretty">{description}</p>
      <CtaText>{cta}</CtaText>
    </Link>
  )
}

// 1.2 ContentRow (wide "upcoming" / "featured" row). Column 1 is either event meta or a cover.
export function ContentRow({ to, title, description, cta, event, cover, kind }) {
  return (
    <Link to={to} className={`content-row ${cardSurface}`}>
      <div className="flex flex-col gap-3 min-w-0">
        {event ? (
          <>
            <span className="h-7 flex items-center grayscale opacity-[.65]"><CompanyLogo name={event.partner} /></span>
            <KindLabel>{event.kind}</KindLabel>
            <div className="font-display text-xl leading-[26px] font-semibold">{event.date}</div>
            <div className="text-sm leading-[21px] text-tertiary">{event.time}</div>
          </>
        ) : (
          <img src={cover} alt="" className="w-full h-auto object-cover border border-line aspect-[1400/992]" />
        )}
      </div>
      <div className="flex flex-col gap-3 min-w-0">
        {kind && <KindLabel>{kind}</KindLabel>}
        <h3 className="text-2xl leading-[28.8px] font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="text-base leading-6 text-tertiary max-w-[640px]">{description}</p>
      </div>
      <div><CtaText>{cta}</CtaText></div>
    </Link>
  )
}

// T1 BlogCard: a bare anchor, square image, no lift.
export function BlogCard({ post, hidden = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card flex flex-col" data-category={post.category} style={hidden ? { display: 'none' } : undefined}>
      <img src={post.cover} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover mb-4" />
      <div className="text-[13px] leading-[19.5px] text-muted mb-1.5">{formatShortDate(post.date)}</div>
      <h3 className="blog-card-title font-display text-[17px] leading-[23.8px] font-semibold text-ink mb-1.5">{post.title}</h3>
      {post.description && <p className="flex-1 text-sm leading-[22.4px] text-muted"><span className="line-clamp-2">{post.description}</span></p>}
      <div className="flex items-center gap-2 mt-3">
        <Avatar seed={post.author.seed} size={20} />
        <span className="text-[13px] font-medium text-muted">{post.author.name}</span>
      </div>
    </Link>
  )
}

// T1 "text-only" card (T8 mapped into the DS): title link + description, padding 20px 0.
export function TextCard({ to, title, description }) {
  return (
    <Link to={to} className="blog-card block py-5">
      <h3 className="blog-card-title font-display text-[17px] leading-[23.8px] font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-base leading-6 text-muted">{description}</p>
    </Link>
  )
}

export const ChevronLeft = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className}><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

// Fallback for unknown slugs inside a content route.
export function NotFound({ back = '/blog', label = 'Back to the blog' }) {
  return (
    <PageSection>
      <h1 className="text-[30px] leading-9 md:text-[36px] md:leading-[45px] font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 text-lg leading-7 text-muted">This page has moved or never existed.</p>
      <Link to={back} className="mt-8 btn-secondary font-sans">{label}</Link>
    </PageSection>
  )
}
