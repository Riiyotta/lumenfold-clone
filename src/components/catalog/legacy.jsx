import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, LogoMark, Avatar } from '../ui'
import { Glyph } from './primitives'

/* ------------------------------------------------------------------ */
/* W.CTA footer card (W1, W3)                                          */
/* ------------------------------------------------------------------ */
function Stars() {
  const pts = [[8, 22], [18, 70], [30, 38], [44, 14], [58, 76], [70, 30], [84, 60], [92, 18], [12, 48], [76, 84]]
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {pts.map(([x, y], i) => (
        <svg key={i} viewBox="-5 -5 10 10" className="absolute" style={{ left: `${x}%`, top: `${y}%`, width: 8 + (i % 3) * 4, height: 8 + (i % 3) * 4 }}>
          <path d="M0-5l1.2 3.8L5 0 1.2 1.2 0 5-1.2 1.2-5 0-1.2-1.2z" fill="#6056ff" fillOpacity={i % 3 ? 0.18 : 0.3} />
        </svg>
      ))}
    </div>
  )
}

export function WCta({ copy }) {
  return (
    <Row>
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="relative bg-white border border-line rounded-2xl pt-20 px-5 pb-5 min-[480px]:pt-10 min-[480px]:pb-[60px] flex flex-col items-center text-center overflow-hidden">
          <Stars />
          <span className="hidden md:block absolute left-8 bottom-8 opacity-90 -rotate-6" aria-hidden="true"><span className="inline-flex p-2 rounded-full bg-white shadow-glass"><Avatar seed={4} size={48} /></span></span>
          <span className="hidden md:block absolute right-8 top-8 opacity-90 rotate-6" aria-hidden="true"><span className="inline-flex p-3 rounded-2xl bg-white shadow-glass"><LogoMark size={36} /></span></span>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-[100px] w-[90%] h-[200px] rounded-[50%] bg-[#943bff] opacity-[.08] blur-[15px] pointer-events-none" aria-hidden="true" />
          <h2 className="relative text-[30px] sm:text-[36px] lg:text-[44px] xl:text-[48px] leading-[1.2] tracking-[-0.025em] text-ink [text-wrap:balance] max-w-2xl">
            {copy.title[0]}<br /><span className="text-indigo-brand">{copy.title[1]}</span>{copy.title[2]}
          </h2>
          <p className="relative mt-4 text-lg leading-[1.5] text-muted max-w-xl">{copy.body}</p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary font-sans">{copy.primary}</Link>
            <Link to="/" className="btn-secondary font-sans bg-white">{copy.secondary}</Link>
          </div>
          <p className="relative mt-5 flex items-center gap-1.5 text-sm text-muted"><Glyph name="shield" className="w-4 h-4" />{copy.fine}</p>
        </div>
      </div>
    </Row>
  )
}

/* ------------------------------------------------------------------ */
/* W3 article body: tiny markdown-lite parser                          */
/* ------------------------------------------------------------------ */
export const headingId = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((s, i) => s.startsWith('**') ? <strong key={i}>{s.slice(2, -2)}</strong> : <Fragment key={i}>{s}</Fragment>)
}

export function parseArticle(body) {
  const lines = body.trim().split('\n').map(l => l.trim()).filter(Boolean)
  const blocks = []
  for (const l of lines) {
    const last = blocks[blocks.length - 1]
    if (l.startsWith('## ')) blocks.push({ t: 'h2', text: l.slice(3), id: headingId(l.slice(3)) })
    else if (l.startsWith('### ')) blocks.push({ t: 'h3', text: l.slice(4) })
    else if (l.startsWith('> ')) blocks.push({ t: 'quote', text: l.slice(2) })
    else if (l.startsWith('- ')) last?.t === 'ul' ? last.items.push(l.slice(2)) : blocks.push({ t: 'ul', items: [l.slice(2)] })
    else if (/^\d+\. /.test(l)) { const s = l.replace(/^\d+\. /, ''); last?.t === 'ol' ? last.items.push(s) : blocks.push({ t: 'ol', items: [s] }) }
    else blocks.push({ t: 'p', text: l })
  }
  return blocks
}

export function ArticleBody({ blocks }) {
  return (
    <div className="cat-prose">
      {blocks.map((b, i) => {
        if (b.t === 'h2') return <h2 key={i} id={b.id}>{b.text}</h2>
        if (b.t === 'h3') return <h3 key={i}>{b.text}</h3>
        if (b.t === 'quote') return <blockquote key={i}>{inline(b.text)}</blockquote>
        if (b.t === 'ul') return <ul key={i}>{b.items.map(x => <li key={x}>{inline(x)}</li>)}</ul>
        if (b.t === 'ol') return <ol key={i}>{b.items.map(x => <li key={x}>{inline(x)}</li>)}</ol>
        return <p key={i}>{inline(b.text)}</p>
      })}
    </div>
  )
}

/* Working TOC over the h2s (fixes the original's empty-selector bug); sticks at top 96px; scroll-spy highlights. */
export function Toc({ title, headings }) {
  const [active, setActive] = useState(headings[0]?.id)
  const ids = useMemo(() => headings.map(h => h.id), [headings])
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    const onScroll = () => {
      let cur = ids[0]
      for (const el of els) if (el.getBoundingClientRect().top <= 120) cur = el.id
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  const go = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', `#${id}`) }
  }
  return (
    <nav aria-label={title} className="md:sticky md:top-24">
      <p className="text-lg font-semibold text-ink pb-4">{title}</p>
      <div className="bg-white border border-line rounded-2xl p-4 flex flex-col">
        {headings.map(h => (
          <a key={h.id} href={`#${h.id}`} onClick={e => go(e, h.id)} className="toc-item" data-active={active === h.id} aria-current={active === h.id ? 'location' : undefined}>
            {h.text.length > 120 ? `${h.text.slice(0, 117)}…` : h.text}
          </a>
        ))}
      </div>
    </nav>
  )
}
