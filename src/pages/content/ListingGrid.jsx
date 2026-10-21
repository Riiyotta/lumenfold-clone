import { useState } from 'react'
import { Row } from '../../components/ui'
import { BlogCard, TextCard } from '../../components/content/parts'
import ClosingCTA from '../../components/content/ClosingCTA'
import { blogIndex, blogCategories, posts, learnIndex, topicsIndex, guides, hubCta } from '../../content/editorial'
import '../../components/content/content.css'

// T1 title band: h1 Sora 36 600, p 18/28.
function TitleBand({ title, body }) {
  return (
    <Row>
      <div className="py-12 px-6 md:px-12 border-b border-line">
        <h1 className="text-[36px] leading-10 md:leading-tight font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-3 text-lg leading-7 text-muted max-w-2xl">{body}</p>
      </div>
    </Row>
  )
}

// /blog: category pills filter client-side by toggling display on non-matching cards (no animation, no URL state).
export function BlogIndex() {
  const [cat, setCat] = useState('All')
  return (
    <>
      <TitleBand {...blogIndex} />
      <Row>
        <div className="px-6 md:px-12 py-12 md:py-16">
          <div className="blog-category-tabs flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
            {['All', ...blogCategories].map(c => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="blog-card-grid">
            {posts.map(p => <BlogCard key={p.slug} post={p} hidden={cat !== 'All' && p.category !== cat} />)}
          </div>
        </div>
      </Row>
    </>
  )
}

// T8 mapped to the T1 "text-only" variant: /learn (2 columns) and /topics (3 columns), then ClosingCTA.
export function TextIndex({ kind }) {
  const learn = kind === 'learn'
  const items = guides.filter(g => (learn ? g.section !== 'topics' : g.section === 'topics'))
  return (
    <>
      <TitleBand {...(learn ? learnIndex : topicsIndex)} />
      <Row>
        <div className="px-6 md:px-12 py-12 md:py-16">
          <div className={`blog-card-grid ${learn ? 'text-only-2' : 'text-only-3'}`}>
            {items.map(g => <TextCard key={g.slug} to={`/${g.section}/${g.slug}`} title={g.title} description={g.description} />)}
          </div>
        </div>
      </Row>
      <ClosingCTA {...hubCta.resources} secondaryTo="/events" />
    </>
  )
}
