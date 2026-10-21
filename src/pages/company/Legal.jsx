import { useEffect, useState } from 'react'
import { legal } from '../../content/company'
import { Row } from '../../components/ui'
import '../../components/company/company.css'

// §7 legal template: title, sticky TOC with IntersectionObserver scrollspy, prose body. No motion.
function Block({ b }) {
  if (b.p) return <p>{b.p}</p>
  if (b.ul) return <ul>{b.ul.map(([lead, text]) => <li key={lead}><strong>{lead}</strong> {text}</li>)}</ul>
  if (b.ol) return <ol>{b.ol.map(t => <li key={t}>{t}</li>)}</ol>
  if (b.table) return (
    <div className="overflow-x-auto">
      <table>
        <thead><tr>{b.table.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
  return null
}

export default function Legal({ doc = 'privacy' }) {
  const d = legal[doc]
  const [active, setActive] = useState(d.sections[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && setActive(e.target.id))
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 })
    d.sections.forEach(s => { const el = document.getElementById(s.id); el && io.observe(el) })
    return () => io.disconnect()
  }, [doc])

  return (
    <Row>
      <div className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight md:leading-tight mb-8 text-ink">{d.title}</h1>
        </div>
        <div className="co-post-layout">
          <aside className="co-post-sidebar hidden lg:block">
            <nav className="co-toc" aria-label="Table of contents">
              <div className="co-toc-title">Contents</div>
              <ul className="co-toc-list">
                {d.sections.map(s => <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'active' : ''}>{s.title}</a></li>)}
              </ul>
            </nav>
          </aside>
          <div className="co-post-content co-prose">
            {d.intro.map(t => <p key={t}>{t}</p>)}
            {d.sections.map(s => (
              <section key={s.id}>
                <h2 id={s.id}>{s.title}</h2>
                {s.blocks.map((b, i) => <Block key={i} b={b} />)}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Row>
  )
}
