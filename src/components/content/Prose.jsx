import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const slugify = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Headings with unique slug ids, in body order. `levels` picks which go into a TOC.
export function getHeadings(body, levels = ['h2', 'h3']) {
  const seen = {}
  return body.filter(b => b[0] === 'h2' || b[0] === 'h3').map(([tag, text]) => {
    let id = slugify(text)
    seen[id] = (seen[id] || 0) + 1
    if (seen[id] > 1) id += '-' + seen[id]
    return { tag, text, id }
  }).filter(h => levels.includes(h.tag))
}

// Inline markup: **bold**, `code`, [label](href). Internal hrefs use <Link>.
export function Inline({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) return m[2].startsWith('/') ? <Link key={i} to={m[2]}>{m[1]}</Link> : <a key={i} href={m[2]}>{m[1]}</a>
    return <Fragment key={i}>{p}</Fragment>
  })
}

export default function Prose({ body, className = '' }) {
  const ids = getHeadings(body)
  let h = 0
  return (
    <div className={`blog-prose ${className}`}>
      {body.map((b, i) => {
        const [tag, a, c] = b
        switch (tag) {
          case 'h2': case 'h3': {
            const H = tag
            return <H key={i} id={ids[h++].id}>{a}</H>
          }
          case 'p': return <p key={i}><Inline text={a} /></p>
          case 'ul': case 'ol': {
            const L = tag
            return <L key={i}>{a.map((li, k) => <li key={k}><Inline text={li} /></li>)}</L>
          }
          case 'quote': return <blockquote key={i}><p>{a}</p></blockquote>
          case 'code': return <pre key={i}><code>{a}</code></pre>
          case 'table': return (
            <div key={i} className="table-wrap">
              <table>
                <thead><tr>{a.map((th, k) => <th key={k}>{th}</th>)}</tr></thead>
                <tbody>{c.map((row, r) => <tr key={r}>{row.map((td, k) => <td key={k}>{td}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )
          case 'hr': return <hr key={i} />
          case 'img': return <figure key={i}><img src={a} alt="" loading="lazy" />{c && <figcaption>{c}</figcaption>}</figure>
          default: return null
        }
      })}
    </div>
  )
}
