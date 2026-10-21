import { useEffect, useRef, useState } from 'react'

// Scroll-spy: the heading crossing the top band (rootMargin -80px 0 -70% 0) becomes the single active link.
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(entries => {
      const hit = entries.find(e => e.isIntersecting)
      if (hit) setActive(hit.target.id)
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return active
}

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" /></svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
)
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" /></svg>
)
const InIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" /></svg>
)

// Copy link (check for 2000ms), X intent, LinkedIn share.
export function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false)
  const t = useRef()
  useEffect(() => () => clearTimeout(t.current), [])
  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href) } catch { /* clipboard blocked: still show feedback */ }
    setCopied(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setCopied(false), 2000)
  }
  const url = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
  return (
    <div className="flex gap-2">
      <button type="button" onClick={copy} className="blog-share-btn" aria-label={copied ? 'Link copied' : 'Copy link'} title={copied ? 'Copied' : 'Copy link'}>
        {copied ? <CheckIcon /> : <LinkIcon />}
      </button>
      <a className="blog-share-btn" aria-label="Share on X" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`}><XIcon /></a>
      <a className="blog-share-btn" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}><InIcon /></a>
    </div>
  )
}

// Sticky sidebar (top 96): "Contents" + optional "Share".
export function ArticleAside({ headings, title, share = true }) {
  const active = useScrollSpy(headings.map(h => h.id))
  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(history.state, '', '#' + id)
  }
  return (
    <aside className="w-48 shrink-0 hidden lg:block">
      <div className="blog-toc">
        {headings.length > 0 && (
          <nav className="mb-8" aria-label="Contents">
            <div className="blog-toc-title">Contents</div>
            {headings.map(h => (
              <a key={h.id} href={'#' + h.id} onClick={e => go(e, h.id)} className={`${h.tag === 'h3' ? 'is-h3' : ''} ${active === h.id ? 'active' : ''}`}>{h.text}</a>
            ))}
          </nav>
        )}
        {share && <><div className="blog-toc-title">Share</div><ShareButtons title={title} /></>}
      </div>
    </aside>
  )
}
