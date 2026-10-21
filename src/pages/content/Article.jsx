import { Link, useParams } from 'react-router-dom'
import { Row, Avatar } from '../../components/ui'
import Prose, { getHeadings } from '../../components/content/Prose'
import { ArticleAside, ShareButtons } from '../../components/content/ArticleAside'
import { BlogCard, ChevronLeft, NotFound } from '../../components/content/parts'
import ClosingCTA from '../../components/content/ClosingCTA'
import { posts, guides, notes, articleCta, guideCta, hubCta, formatDate, readingTime } from '../../content/editorial'
import '../../components/content/content.css'

const h1Class = 'text-[30px] leading-9 md:text-[36px] md:leading-[45px] font-semibold tracking-tight text-ink'

// T2 post header (max-w-4xl): back link, reading-time pill + date, h1, optional author and cover.
function PostHeader({ back, backLabel, minutes, date, title, author, cover }) {
  return (
    <header className="max-w-4xl mx-auto">
      <Link to={back} className="inline-flex items-center gap-1.5 mb-8 text-sm text-muted hover:text-indigo-brand transition-colors duration-150"><ChevronLeft />{backLabel}</Link>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-0.5 rounded-full bg-indigo-brand/10 text-sm font-medium text-indigo-brand">{minutes} min read</span>
        <time dateTime={date} className="text-sm text-muted">{formatDate(date)}</time>
      </div>
      <h1 className={`${h1Class} mb-8`}>{title}</h1>
      {author && (
        <div className="flex items-center gap-3 mb-8">
          <Avatar seed={author.seed} size={40} />
          <div><div className="text-sm font-semibold text-ink">{author.name}</div><div className="text-xs text-muted">{author.role}</div></div>
        </div>
      )}
      {cover && <img src={cover} alt="" loading="eager" className="w-full rounded-xl mb-12" />}
    </header>
  )
}

const Star = () => <svg viewBox="0 0 10 10" className="legacy-star" fill="currentColor"><path d="M5 0l1.2 3.8H10L6.9 6.1 8.1 10 5 7.6 1.9 10l1.2-3.9L0 3.8h3.8z" /></svg>

/* ---------- /blog/:slug ---------- */
export function BlogArticle() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)
  if (!post) return <NotFound />
  const headings = getHeadings(post.body)
  const related = [...posts.filter(p => p.slug !== slug && p.category === post.category), ...posts.filter(p => p.slug !== slug && p.category !== post.category)].slice(0, 3)
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.date, image: post.cover, author: { '@type': 'Person', name: post.author.name }, publisher: { '@type': 'Organization', name: 'Lumenfold' } }
  return (
    <Row>
      <article className="px-6 md:px-12 py-12 md:py-16">
        <PostHeader back="/blog" backLabel="Blog" minutes={post.minutes} date={post.date} title={post.title} author={post.author} cover={post.cover} />
        <div className="blog-post-layout max-w-[56rem] mx-auto flex gap-12">
          <ArticleAside headings={headings} title={post.title} />
          <div className="flex-1 min-w-0">
            <Prose body={post.body} />
            <div className="lg:hidden mt-10 pt-6 border-t border-line flex items-center gap-3">
              <span className="text-sm font-medium text-muted">Share</span><ShareButtons title={post.title} />
            </div>
            <section className="mt-16 pt-10 border-t border-line">
              <h2 className="text-xl leading-7 font-semibold text-ink mb-6">Related posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">{related.map(p => <BlogCard key={p.slug} post={p} />)}</div>
            </section>
            <div className="blog-footer-cta">
              <h2 className="font-medium text-2xl leading-8 md:text-[30px] md:leading-9 tracking-tight text-ink mb-3">{articleCta.title}</h2>
              <p className="text-base leading-6 text-muted max-w-lg mx-auto mb-6">{articleCta.body}</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <Link to="/book-a-demo" className="blog-cta-btn-primary">{articleCta.primary}</Link>
                <Link to="/pricing" className="blog-cta-btn-secondary">{articleCta.secondary}</Link>
              </div>
            </div>
          </div>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Row>
  )
}

/* ---------- /learn/:slug and /prompt-engineering/:slug: "toc-boxed" ---------- */
export function GuideArticle({ section }) {
  const { slug } = useParams()
  const g = guides.find(x => x.slug === slug && x.section === section)
  if (!g) return <NotFound back="/learn" label="Back to Learn" />
  return (
    <>
      <Row className="guide-hero">
        <div className="py-12 md:py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
          <h1 className="max-w-3xl text-[36px] leading-[1.1] md:text-[48px] md:leading-[52.8px] tracking-[-0.15rem] text-ink">{g.title}</h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link to="/book-a-demo" className="btn-primary">{guideCta.label}</Link>
            <span className="inline-flex items-center text-sm leading-[19.6px] text-muted">{guideCta.notes[0]}<Star />{guideCta.notes[1]}</span>
          </div>
        </div>
      </Row>
      <Row>
        <article className="px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-[56rem] mx-auto flex gap-12">
            <ArticleAside headings={getHeadings(g.body, ['h2'])} title={g.title} share={false} />
            <div className="flex-1 min-w-0"><Prose body={g.body} /></div>
          </div>
        </article>
      </Row>
      <ClosingCTA {...hubCta.resources} secondaryTo="/events" />
    </>
  )
}

/* ---------- /topics/:slug: "bare" (h1 + prose only) ---------- */
export function TopicArticle() {
  const { slug } = useParams()
  const g = guides.find(x => x.slug === slug && x.section === 'topics')
  if (!g) return <NotFound back="/topics" label="Back to Topics" />
  return (
    <Row>
      <article className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-[56rem] mx-auto">
          <h1 className={`${h1Class} mb-8`}>{g.title}</h1>
          <Prose body={g.body} />
        </div>
      </article>
    </Row>
  )
}

/* ---------- /posts/:slug: "minimal" (T2 header without author or cover, then prose) ---------- */
export function NoteArticle() {
  const { slug } = useParams()
  const n = notes.find(x => x.slug === slug)
  if (!n) return <NotFound back="/changelog" label="Back to the changelog" />
  return (
    <Row>
      <article className="px-6 md:px-12 py-12 md:py-16">
        <PostHeader back="/changelog" backLabel="Changelog" minutes={readingTime(n.body)} date={n.date} title={n.title} />
        <div className="max-w-[56rem] mx-auto"><Prose body={n.body} /></div>
      </article>
    </Row>
  )
}
