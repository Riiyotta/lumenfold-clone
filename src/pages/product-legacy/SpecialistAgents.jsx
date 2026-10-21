import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../components/product-legacy/product-legacy.css'
import { specialist as d } from '../../content/productLegacy'

// D2: 860px long-form article. Diagram vocabulary: stroke 1.6, indigo / ink #1c2336 / alert #b42318,
// white node boxes (#d7d8de stroke 1.5), dashed boxes 6 5, bars up #6056ff1f / down #b4231814.
const IND = '#6056ff', INK = '#1c2336', ALERT = '#b42318'
const Box = ({ x, y, w = 120, h = 40, label, accent, dashed, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill="#fff" stroke={accent ? IND : '#d7d8de'} strokeWidth="1.5" strokeDasharray={dashed ? '6 5' : undefined} />
    <text x={x + w / 2} y={y + h / 2 + (sub ? -3 : 4)} textAnchor="middle" fontSize="12" fontFamily="Inter, sans-serif" fill={accent ? IND : INK}>{label}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="9.5" fontFamily="ui-monospace, Menlo, monospace" fill="#868a97">{sub}</text>}
  </g>
)
const Ln = ({ d: p, c = IND, dash, head = true }) => (
  <path d={p} stroke={c} strokeWidth="1.6" fill="none" strokeDasharray={dash} markerEnd={head ? `url(#sa-ah-${c === ALERT ? 'r' : c === INK ? 'k' : 'i'})` : undefined} />
)
const Defs = () => (
  <defs>
    {[['i', IND], ['k', INK], ['r', ALERT]].map(([k, c]) => <marker key={k} id={`sa-ah-${k}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0l8 4-8 4z" fill={c} /></marker>)}
  </defs>
)
const Bars = ({ vals, max, up = true, labels, x0 = 60, w = 46, gap = 34, base = 180, h = 130 }) => (
  <g>
    <path d={`M${x0 - 20} ${base}H${x0 + vals.length * (w + gap)}`} stroke={INK} strokeOpacity=".3" />
    {vals.map((v, i) => {
      const bh = (v / max) * h, x = x0 + i * (w + gap)
      return <g key={i}><rect x={x} y={base - bh} width={w} height={bh} fill={up ? '#6056ff1f' : '#b4231814'} stroke={up ? IND : ALERT} strokeWidth="1.6" />
        <text x={x + w / 2} y={base - bh - 8} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, Menlo, monospace" fill={up ? IND : ALERT}>{v}</text>
        <text x={x + w / 2} y={base + 16} textAnchor="middle" fontSize="10.5" fontFamily="Inter, sans-serif" fill="#868a97">{labels[i]}</text></g>
    })}
  </g>
)

const FIGS = {
  generalist: () => <>
    {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2, x = 320 + Math.cos(a) * 190, y = 105 + Math.sin(a) * 80; return <g key={i}><Ln d={`M320 105L${x} ${y}`} c={i % 4 === 3 ? ALERT : INK} head={false} dash={i % 4 === 3 ? '4 3' : undefined} /><circle cx={x} cy={y} r="9" fill="#fff" stroke="#d7d8de" strokeWidth="1.5" /></g> })}
    <Box x={250} y={80} w={140} h={50} label="Do-everything agent" accent />
  </>,
  specialists: () => <>
    {['Triage', 'Research', 'Draft', 'Update CRM'].map((l, i) => <g key={l}><Box x={20 + i * 160} y={50} w={130} label={l} accent={i === 1} />{[0, 1, 2].slice(0, 2 + (i % 2)).map(k => <g key={k}><Ln d={`M${85 + i * 160} 90V${120 + k * 0}`} c={INK} head={false} /><circle cx={60 + i * 160 + k * 25} cy={140} r="9" fill="#fff" stroke="#d7d8de" strokeWidth="1.5" /></g>)}</g>)}
  </>,
  compound: () => <>
    <Bars vals={[90, 81, 73, 66, 59, 35]} max={100} up={false} labels={['1', '2', '3', '4', '5', '10']} x0={50} w={34} gap={18} />
    <Bars vals={[90, 89, 88, 88, 87, 86]} max={100} labels={['1', '2', '3', '4', '5', '10']} x0={370} w={34} gap={18} />
    <text x="180" y="210" textAnchor="middle" fontSize="11" fill="#868a97" fontFamily="Inter">No checks</text><text x="500" y="210" textAnchor="middle" fontSize="11" fill="#868a97" fontFamily="Inter">Check after each step</text>
  </>,
  handoff: () => <>
    <Box x={30} y={80} w={130} label="Research agent" />
    <rect x="240" y="50" width="160" height="100" fill="#fff" stroke={IND} strokeWidth="1.5" strokeDasharray="6 5" />
    {['Asked', 'Found', 'Decided', 'Open'].map((t, i) => <text key={t} x="256" y={75 + i * 22} fontSize="11" fontFamily="ui-monospace, Menlo, monospace" fill={i === 3 ? ALERT : INK}>{t}: ····</text>)}
    <Box x={480} y={80} w={130} label="Writer agent" accent />
    <Ln d="M160 100H236" /><Ln d="M400 100H476" />
  </>,
  reviewer: () => <>
    <Box x={40} y={80} w={120} label="Writer" />
    <Box x={260} y={80} w={120} label="Reviewer" accent />
    <Box x={480} y={30} w={120} label="Approved" sub="sent" />
    <Box x={480} y={130} w={120} label="Person" sub="escalated" dashed />
    <Ln d="M160 100H256" /><Ln d="M380 92L476 54" /><Ln d="M380 108L476 146" c={INK} />
    <Ln d="M320 120C320 175 100 175 100 124" c={ALERT} dash="4 3" />
    <text x="210" y="178" textAnchor="middle" fontSize="10.5" fill={ALERT} fontFamily="Inter">returned with reason</text>
  </>,
  'bars-review': () => <Bars vals={[14, 11, 6]} max={16} up={false} labels={['No reviewer', 'Rules only', 'Reviewer agent']} x0={150} w={70} gap={70} />,
  lead: () => <>
    <Box x={260} y={20} w={130} label="Lead agent" accent />
    {['Researcher', 'Writer', 'Checker'].map((l, i) => <g key={l}><Box x={60 + i * 200} y={140} w={130} label={l} /><Ln d={`M325 60C325 100 ${125 + i * 200} 100 ${125 + i * 200} 136`} /></g>)}
  </>,
  parallel: () => <>
    <Box x={20} y={80} w={100} label="Plan" accent />
    {[0, 1, 2].map(i => <g key={i}><Box x={210} y={20 + i * 60} w={120} label={`Step ${String.fromCharCode(65 + i)}`} /><Ln d={`M120 100C165 100 165 ${40 + i * 60} 206 ${40 + i * 60}`} /><Ln d={`M330 ${40 + i * 60}C375 ${40 + i * 60} 375 100 416 100`} c={INK} /></g>)}
    <Box x={420} y={80} w={100} label="Merge" /><Box x={560} y={80} w={90} label="Review" accent /><Ln d="M520 100H556" />
  </>,
  context: () => <>
    {[['Generalist', 0.94, ALERT], ['Specialist', 0.28, IND]].map(([l, v, c], i) => <g key={l}>
      <text x="40" y={70 + i * 70} fontSize="12" fontFamily="Inter" fill={INK}>{l}</text>
      <rect x="150" y={52 + i * 70} width="460" height="28" fill="#fff" stroke="#d7d8de" strokeWidth="1.5" />
      <rect x="150" y={52 + i * 70} width={460 * v} height="28" fill={c === ALERT ? '#b4231814' : '#6056ff1f'} stroke={c} strokeWidth="1.6" />
      <text x={150 + 460 * v + 8} y={71 + i * 70} fontSize="11" fontFamily="ui-monospace, Menlo, monospace" fill={c}>{Math.round(v * 100)}%</text>
    </g>)}
  </>,
  evals: () => <>
    <Box x={30} y={80} w={130} label="Draft agent" accent />
    {Array.from({ length: 8 }).map((_, i) => { const ok = i !== 5; const x = 230 + (i % 4) * 100, y = 50 + Math.floor(i / 4) * 70; return <g key={i}><rect x={x} y={y} width="80" height="44" fill="#fff" stroke={ok ? '#d7d8de' : ALERT} strokeWidth="1.5" /><text x={x + 10} y={y + 26} fontSize="10.5" fontFamily="ui-monospace, Menlo, monospace" fill={INK}>case {i + 1}</text><path d={ok ? `M${x + 60} ${y + 22}l4 4 7-8` : `M${x + 60} ${y + 16}l9 9m0-9l-9 9`} stroke={ok ? IND : ALERT} strokeWidth="1.6" fill="none" /></g> })}
    <Ln d="M160 100H222" />
  </>,
  'bars-reliability': () => <Bars vals={[38, 12]} max={42} up={false} labels={['One generalist', 'Four specialists']} x0={210} w={80} gap={120} />,
  versions: () => <>
    {['Triage', 'Draft', 'Review'].map((l, r) => <g key={l}>
      <text x="30" y={54 + r * 60} fontSize="12" fontFamily="Inter" fill={INK}>{l}</text>
      <path d={`M110 ${50 + r * 60}H630`} stroke="#d7d8de" strokeWidth="1.5" />
      {[1, 2, 3, 4].slice(0, [4, 2, 3][r]).map((v, k) => { const x = 140 + k * [120, 260, 170][r]; return <g key={v}><circle cx={x} cy={50 + r * 60} r="11" fill="#fff" stroke={k === [4, 2, 3][r] - 1 ? IND : '#d7d8de'} strokeWidth="1.6" /><text x={x} y={54 + r * 60} textAnchor="middle" fontSize="9.5" fontFamily="ui-monospace, Menlo, monospace" fill={INK}>v{v}</text></g> })}
    </g>)}
  </>,
  harness: () => <>
    <rect x="180" y="30" width="280" height="140" fill="none" stroke={IND} strokeWidth="1.6" className="sa-harness" />
    <Box x={260} y={80} w={120} label="Specialist" accent />
    <Box x={20} y={80} w={110} label="Input" /><Box x={510} y={80} w={110} label="Output" />
    <Ln d="M130 100H256" c={INK} /><Ln d="M380 100H506" c={INK} />
    {['log', 'check', 'cost'].map((t, i) => <text key={t} x={200 + i * 95} y="160" fontSize="10" fontFamily="ui-monospace, Menlo, monospace" fill={IND}>{t}</text>)}
  </>,
  rollout: () => <>
    {[0, 1, 2, 3].map(i => <g key={i}><rect x={60 + i * 140} y={160 - (i + 1) * 32} width="120" height={(i + 1) * 32} fill={i === 3 ? '#fff' : '#6056ff1f'} stroke={i === 3 ? '#d7d8de' : IND} strokeWidth="1.6" strokeDasharray={i === 3 ? '6 5' : undefined} />
      <text x={120 + i * 140} y={150 - (i + 1) * 32} textAnchor="middle" fontSize="11" fontFamily="Inter" fill={INK}>{['Triage', '+ Draft', '+ Review', 'Next'][i]}</text></g>)}
    <path d="M40 160H620" stroke={INK} strokeOpacity=".3" />
  </>,
}
function Fig({ id, cap }) {
  const F = FIGS[id]
  return (
    <figure className="sa-fig">
      <svg viewBox="0 0 660 220" className="w-full h-auto"><Defs /><F /></svg>
      <figcaption>{cap}</figcaption>
    </figure>
  )
}

// Hero mark: boxes, a drifting dashed "harness" and spec lines that settle in.
function HeroMark() {
  return (
    <svg viewBox="0 0 520 200" className="w-full max-w-[520px] mb-8">
      <path d="M60 40h400a20 20 0 0120 20v80a20 20 0 01-20 20H60a20 20 0 01-20-20V60a20 20 0 0120-20z" fill="none" stroke={IND} strokeWidth="1.6" className="sa-harness" />
      {[0, 1, 2].map(i => <g key={i}>
        <rect x={80 + i * 130} y="70" width="100" height="60" rx="4" fill="#fff" stroke={i === 1 ? IND : '#d7d8de'} strokeWidth="1.5" />
        {[0, 1, 2].map(k => <rect key={k} className="sa-settle" style={{ animationDelay: `${0.15 + i * 0.12 + k * 0.06}s` }} x={92 + i * 130} y={84 + k * 12} width={[70, 54, 62][k]} height="5" rx="2.5" fill={i === 1 && k === 0 ? IND : '#e6e7ea'} />)}
        {i < 2 && <path d={`M${180 + i * 130} 100h28`} stroke={INK} strokeWidth="1.6" />}
      </g>)}
    </svg>
  )
}

// Inline [text](to) links inside paragraphs.
function P({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/)
  return <p className="mb-[18px] text-[17px] md:text-[18px] leading-[1.65] text-[#2b3140]">{parts.map((s, i) => {
    const m = s.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    return m ? <Link key={i} to={m[2]}>{m[1]}</Link> : <Fragment key={i}>{s}</Fragment>
  })}</p>
}

function Quotes() {
  return (
    <div className="mt-7 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {d.quotes.map(([q, src]) => (
        <figure key={q} className="py-5 px-[22px] border border-line bg-white">
          <blockquote className="text-base leading-[1.5] font-medium text-ink">“{q}”</blockquote>
          <figcaption className="mt-3 text-[13px] text-muted">Source: <Link to="/resources">{src}</Link></figcaption>
        </figure>
      ))}
    </div>
  )
}
function Stats() {
  return (
    <div className="py-7 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {d.stats.map(([n, l, s]) => (
        <div key={n}>
          <div className="font-display font-medium text-[40px] leading-none tracking-[-0.02em] text-indigo-brand">{n}</div>
          <p className="mt-3 text-[14px] leading-[1.45] text-[#2b3140]">{l}</p>
          <Link to="/resources" className="mt-2 inline-block text-[12px] !text-muted !font-normal">{s}</Link>
        </div>
      ))}
    </div>
  )
}

export default function SpecialistAgents() {
  return (
    <article className="sa-prose max-w-[860px] mx-4 md:mx-auto mt-[76px] md:mt-[120px] mb-10 md:mb-20 px-2 md:px-[88px] bg-white text-ink">
      <header className="mb-14">
        <HeroMark />
        <h1 className="font-display font-medium text-[32px] md:text-[44px] leading-[1.25] tracking-[-0.01em] mb-6">{d.title}</h1>
        <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#4a4f5c]">{d.lede}</p>
      </header>
      {d.sections.map(s => (
        <section key={s.h} className="mb-14">
          <h2 className="font-display font-medium text-[24px] md:text-[28px] leading-[1.25] tracking-[-0.01em] mb-5">{s.h}</h2>
          {s.blocks.map((b, i) => b.p ? <P key={i} text={b.p} />
            : b.fig ? <Fig key={i} id={b.fig} cap={b.cap} />
            : b.quotes ? <Quotes key={i} />
            : b.stats ? <Stats key={i} />
            : <ul key={i} className="list-none mb-[18px] p-0 grid gap-2">{b.list.map(li => <li key={li} className="flex gap-3 text-[17px] md:text-[18px] leading-[1.65] text-[#2b3140]"><span className="mt-[13px] w-3 h-px bg-indigo-brand shrink-0" />{li}</li>)}</ul>)}
        </section>
      ))}
    </article>
  )
}
