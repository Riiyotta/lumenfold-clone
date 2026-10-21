import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wordmark, Arrow } from '../../components/ui'
import '../../components/product-legacy/product-legacy.css'
import { sdg as d, brands } from '../../content/productLegacy'

// D1: own stylesheet tokens (.sdg), square radius everywhere, single breakpoint 860px.
const BP2 = 'min-[861px]:grid-cols-2'

function Trust({ label }) {
  return (
    <div className="mt-14 text-center">
      <div className="mono-label">{label}</div>
      <div className="trust mt-5 flex flex-wrap justify-center gap-x-10 gap-y-5">
        {brands.slice(0, 12).map(n => <span key={n} className="wm inline-flex items-center h-[22px] min-[861px]:h-7"><Wordmark name={n} size="sm" /></span>)}
      </div>
    </div>
  )
}

/* Road hero: SVG road with clickable level markers (halo #6056ff26 when active; fill .2s). */
const MARKERS = [[110, 250], [340, 170], [570, 210], [800, 90]]
function Road({ level, setLevel }) {
  return (
    <svg viewBox="0 0 900 320" className="w-full max-w-[900px] mx-auto block">
      <path d="M0 290 C120 280 180 240 260 200 S420 150 520 200 S700 160 900 70" stroke="#0D162F" strokeOpacity=".08" strokeWidth="64" fill="none" strokeLinecap="round" />
      <path d="M0 290 C120 280 180 240 260 200 S420 150 520 200 S700 160 900 70" stroke="#fff" strokeWidth="2" strokeDasharray="14 12" fill="none" />
      {MARKERS.map(([x, y], i) => {
        const on = level === i
        return (
          <g key={i} className="road-marker cursor-pointer" onClick={() => setLevel(i)} role="button" tabIndex={0} aria-label={`Level ${i + 1}`} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setLevel(i)}>
            <circle className="halo" cx={x} cy={y} r={on ? 26 : 20} fill={on ? '#6056ff26' : 'transparent'} />
            <circle className="core" cx={x} cy={y} r="11" fill={on ? '#6056FF' : '#fff'} stroke={on ? '#3B32F9' : '#D7D8DC'} strokeWidth="1.5" />
            <text x={x} y={y - 34} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="12" fill={on ? '#6056FF' : '#868A97'}>{d.levels[i].n} · {d.levels[i].name}</text>
          </g>
        )
      })}
    </svg>
  )
}

function Hero({ level, setLevel }) {
  const [uc, setUc] = useState(0)
  const L = d.levels[level]
  return (
    <section className="pt-20 pb-24 max-[860px]:pt-14 max-[860px]:pb-16">
      <div className="sdg-wrap text-center">
        <h1 className="h1 mx-auto">{d.hero.title}</h1>
        <p className="lead mx-auto mt-6 !text-[20px]">{d.hero.lead}</p>
        <div className="mt-[60px] pt-[60px] px-[30px] pb-10 border border-[var(--bd)]" style={{ background: 'linear-gradient(var(--s1), var(--s2))' }}>
          <Road level={level} setLevel={setLevel} />
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {d.useCases.map((u, i) => (
              <button key={u} onClick={() => setUc(i)} className={`mono text-[11px] uppercase tracking-[.12em] rounded-full px-3 py-1.5 border border-[var(--ind-line)] transition-colors duration-200 ${uc === i ? 'bg-[var(--ind)] text-white' : 'text-[var(--ind)] hover:bg-[var(--ind-soft)]'}`}>{u}</button>
            ))}
          </div>
          <div className="mt-6 mx-auto max-w-[540px] text-left border border-[var(--ind-line)] bg-white px-6 py-5">
            <span className="mono text-[11px] rounded-full bg-[var(--ind)] text-white px-2.5 py-1">{L.n} · {L.where}</span>
            <h4 className="mt-3 font-display text-2xl text-[var(--t1)]">{L.name} {d.useCases[uc].toLowerCase()}</h4>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--t2)]">{L.body}</p>
            <p className="mt-4 pt-3 border-t border-dashed border-[var(--bd-s)] italic text-[12.5px] text-[var(--t2)]">{L.note}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/book-a-demo" className="sbtn sbtn-primary">Map your motion</Link>
          <a href="#framework" className="sbtn">See the four levels</a>
        </div>
        <Trust label={d.trustLabel} />
      </div>
    </section>
  )
}

function LevelArt({ i }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect x="40" y="40" width="120" height="120" fill="none" stroke="#6056FF" strokeOpacity=".2" />
      {[0, 1, 2, 3].map(k => <rect key={k} x={52 + k * 26} y={148 - (k + 1) * 24} width="18" height={(k + 1) * 24} fill={k <= i ? '#6056FF' : '#fff'} fillOpacity={k <= i ? 0.25 + k * 0.2 : 1} stroke="#6056FF" strokeOpacity=".4" />)}
      <circle cx={61 + i * 26} cy={148 - (i + 1) * 24 - 14} r="6" fill="#0D162F" />
    </svg>
  )
}

function Framework({ level, setLevel }) {
  return (
    <section id="framework" className="section">
      <div className="sdg-wrap">
        <div className={`grid grid-cols-1 ${BP2} gap-[60px] items-end`}>
          <h2 className="h2">{d.framework.title}</h2>
          <p className="lead">{d.framework.lead}</p>
        </div>
        <div className="mt-14 grid grid-cols-4 border border-[#0D162F] h-20">
          {d.levels.map((l, i) => (
            <button key={l.n} onClick={() => setLevel(i)} className={`relative flex items-center justify-center lane ${i ? 'border-l border-[#0D162F]' : ''}`}>
              <span className={`relative mono text-[13px] w-14 h-14 rounded-full flex items-center justify-center border transition-colors duration-200 ${level === i ? 'bg-[var(--sd)] text-white border-[var(--sd)] shadow-[0_6px_16px_rgba(13,22,47,.3)]' : 'bg-white text-[var(--t1)] border-[var(--bd-s)]'}`}>{l.n}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 min-[861px]:grid-cols-4 gap-4">
          {d.levels.map((l, i) => (
            <div key={l.n} onClick={() => setLevel(i)} className={`cursor-pointer border px-[22px] pb-[22px] transition-colors duration-200 hover:border-[var(--ind)] ${level === i ? 'border-[var(--sd)]' : 'border-[var(--bd)]'}`}>
              <div className="-mx-[22px] aspect-square border-b border-[var(--bd)]" style={{ background: 'linear-gradient(135deg, #6056ff0d, #6056ff03)' }}><LevelArt i={i} /></div>
              <div className="mt-4 flex items-center justify-between"><span className="mono text-[12px] text-[var(--t2)]">{l.n}</span><span className="mono text-[9.5px] uppercase tracking-[.12em] border border-[var(--bd)] px-1.5 py-0.5 text-[var(--t2)]">{l.where}</span></div>
              <h3 className="mt-2 font-display font-medium text-2xl">{l.name}</h3>
              <div className="mono-label mt-1">{l.sub}</div>
              <p className="mt-3 text-[14px] leading-[1.55] text-[#0d162fc7]">{l.body}</p>
              <div className="mt-4 pt-3 border-t border-[var(--bd)]"><span className="mono text-[10px] uppercase tracking-[.12em] text-[var(--ind)]">Unlock</span><div className="mt-1 italic text-[13px]">{l.unlock}</div></div>
              <div className="mt-3 bg-[var(--s2)] px-3.5 py-3 text-[13px] leading-[1.5] text-[#0d162fc7]">{l.example}</div>
            </div>
          ))}
        </div>
        <AutonomyTimeline level={level} />
      </div>
    </section>
  )
}

/* AutonomyTimeline island: reveal y 16, .4s, stagger .1, margin -40px. */
function AutonomyTimeline({ level }) {
  return (
    <div className="mt-16 overflow-x-auto">
      <div className="relative grid grid-cols-4 gap-6 min-w-[960px] max-w-[1060px] mx-auto">
        <div className="absolute left-[16px] right-[16px] top-[15px] h-px" style={{ background: 'linear-gradient(to right, #e5e7eb, #c7d2fe, #a5b4fc)' }} />
        {d.timeline.map((t, i) => {
          const accent = i === level
          return (
            <motion.div key={t.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <span className={`relative w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-medium border ${accent ? 'bg-[var(--ind)] text-white border-[var(--ind)]' : 'bg-white text-[var(--t2)] border-[#e5e7eb]'}`}>{i + 1}</span>
              <div className="mt-3 text-[14px] text-[var(--t2)]">{t.t}</div>
              <div className={`mt-3 p-5 border text-[14px] leading-[1.5] ${accent ? 'border-[#6056ff33] bg-white' : 'border-[#e5e7eb] bg-gray-50/80'}`}>{t.d}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function Dimensions() {
  return (
    <section className="section">
      <div className="sdg-wrap">
        <div className={`grid grid-cols-1 ${BP2} gap-[60px] items-end`}><h2 className="h2">{d.dims.title}</h2><p className="lead">{d.dims.lead}</p></div>
        <div className="mt-14 grid grid-cols-1 min-[861px]:grid-cols-3 border-l border-t border-[var(--bd)]">
          {d.dims.items.map((x, i) => (
            <div key={x.title} className="border-r border-b border-[var(--bd)] px-7 py-8 transition-colors duration-200 hover:bg-[var(--ind-soft)]">
              <span className="w-10 h-10 rounded-[6px] bg-[var(--ind-soft)] flex items-center justify-center">
                <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="#6056FF" strokeWidth="1.5" strokeLinecap="round"><path d={['M3 10h9l-3-3m3 3l-3 3M15 4v12', 'M4 4h12v12H4zM4 9h12M9 9v7', 'M4 15l4-5 3 3 5-7', 'M10 3v14M3 10h14', 'M10 4a6 6 0 100 12 6 6 0 000-12zm0 3v3l2 2', 'M5 15V9m5 6V5m5 10v-4'][i]} /></svg>
              </span>
              <h3 className="mt-5 font-display text-xl">{x.title}</h3>
              <p className="mt-1 text-[14.5px] text-[var(--t2)] max-w-[30ch]">{x.sub}</p>
              <div className="mt-5 grid grid-cols-2 border border-[var(--bd)]">
                {[['L1', x.l1], ['L4', x.l4]].map(([k, v], j) => <div key={k} className={`p-3 ${j ? 'border-l border-[var(--bd)]' : ''}`}><div className="mono text-[10px] text-[var(--t2)]">{k}</div><div className={`mt-1 text-[13.5px] ${j ? 'text-[var(--ind)]' : ''}`}>{v}</div></div>)}
              </div>
              <div className="mt-3 flex items-center gap-2 bg-[#fdf2f0] border border-[#FBE0DB] px-3 py-2"><span className="mono text-[10px] uppercase tracking-[.1em] text-[#b8453a] bg-[#fbe0db] px-1.5 py-0.5">Cost</span><span className="text-[13px] text-[#b8453a]">{x.cost}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Industry() {
  return (
    <section className="section">
      <div className="sdg-wrap">
        <div className={`grid grid-cols-1 ${BP2} gap-[60px] items-end`}><h2 className="h2">{d.industry.title}</h2><p className="lead">{d.industry.lead}</p></div>
        <div className="mt-14 relative grid grid-cols-4 h-20 border border-[var(--bd-s)]">
          {d.levels.map((l, i) => <div key={l.n} className={`relative flex items-end p-2 mono text-[11px] text-[var(--t2)] ${i ? 'border-l border-[var(--bd-s)]' : ''}`}>{l.n}</div>)}
          <div className="absolute inset-y-0 left-0 w-1/2 border-r-2 border-[var(--ind)]" style={{ background: 'linear-gradient(to right, #6056ff2e, #6056ff1a)' }} />
        </div>
        <div className="mt-3 flex items-center gap-2 text-[14px] text-[var(--t2)]"><span className="w-2 h-2 rounded-full bg-[var(--ind)]" />{d.industry.caption}</div>
        <div className="mt-12 grid grid-cols-1 min-[861px]:grid-cols-3 border-l border-t border-[#0D162F]">
          {d.industry.stats.map(([n, desc, src]) => (
            <div key={n} className="border-r border-b border-[#0D162F] pt-9 px-[30px] pb-7 min-h-[180px] min-[861px]:min-h-[240px] flex flex-col">
              <div className="font-display font-light text-[clamp(48px,6vw,88px)] leading-none tracking-[-0.04em]">{n}</div>
              <p className="mt-4 text-base max-w-[30ch] flex-1">{desc}</p>
              <a href="#" className="mt-4 text-[12px] underline text-[var(--t2)]">{src}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Radar() {
  const c = d.customer, N = c.radar.length, cx = 150, cy = 150, R = 110
  const pt = (v, i) => { const a = -Math.PI / 2 + (i / N) * Math.PI * 2; return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v] }
  const poly = vals => vals.map((v, i) => pt(v, i).join(',')).join(' ')
  return (
    <div className="border border-[var(--ind-line)] p-8" style={{ background: 'linear-gradient(135deg, rgba(96,86,255,.08), rgba(96,86,255,.02))' }}>
      <svg viewBox="0 0 300 300" className="w-full max-w-[360px] mx-auto block">
        {[0.25, 0.5, 0.75, 1].map(r => <polygon key={r} points={poly(Array(N).fill(r))} fill="none" stroke="#0D162F" strokeOpacity=".1" />)}
        {c.radar.map((l, i) => { const [x, y] = pt(1.18, i); return <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontFamily="ui-monospace, Menlo, monospace" fill="#868A97">{l}</text> })}
        <polygon points={poly(c.before)} fill="#868A97" fillOpacity=".12" stroke="#868A97" strokeWidth="1.5" />
        <polygon points={poly(c.after)} fill="#6056FF" fillOpacity=".15" stroke="#6056FF" strokeWidth="1.6" />
      </svg>
      <div className="mt-4 flex justify-center gap-6 text-[13px] text-[var(--t2)]">
        <span className="flex items-center gap-2"><span className="w-3.5 h-1 bg-[#868a97]" />Before</span>
        <span className="flex items-center gap-2"><span className="w-3.5 h-1 bg-[var(--ind)]" />After</span>
      </div>
    </div>
  )
}
function Customer() {
  const c = d.customer
  return (
    <section className="section">
      <div className={`sdg-wrap grid grid-cols-1 ${BP2} gap-[60px] items-center`}>
        <div>
          <h2 className="h2">{c.title}</h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-[#0d162fc7] max-w-[52ch]">{c.body}</p>
          <blockquote className="mt-8 border-l-4 border-[var(--ind)] pl-5">
            <p className="font-display italic text-2xl leading-[1.35]">“{c.quote}”</p>
            <cite className="mt-3 block not-italic text-[14px] font-medium text-[var(--t2)]">{c.cite}</cite>
          </blockquote>
          <Link to="/customers" className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ind)] underline underline-offset-4">{c.link}<Arrow className="w-4 h-4" /></Link>
        </div>
        <Radar />
      </div>
    </section>
  )
}

function Final() {
  const f = d.final
  return (
    <section className="border-t border-[var(--bd)] pt-[140px] pb-[120px] max-[860px]:pt-20 max-[860px]:pb-16">
      <div className="sdg-wrap text-center">
        <h2 className="font-display font-medium text-[clamp(36px,4.5vw,64px)] leading-[1.08] tracking-[-0.025em]">{f.title}</h2>
        <div className="mt-10 mx-auto max-w-[440px] text-left bg-[var(--s2)] border border-[var(--bd)] p-6">
          <div className="mono-label">{f.label}</div>
          <ul className="mt-3">{f.rows.map(r => <li key={r} className="flex items-start gap-3 py-2.5 border-t border-[var(--bd)] text-[15px] leading-[1.55]"><span className="mt-[11px] w-3 h-px bg-[var(--ind)] shrink-0" />{r}</li>)}</ul>
        </div>
        <div className="mt-12"><Link to="/book-a-demo" className="sbtn sbtn-primary sbtn-lg">{f.cta}</Link></div>
        <p className="mt-4 text-[14px] text-[var(--t2)]">{f.clarifier}</p>
        <Trust label={d.trustLabel} />
      </div>
    </section>
  )
}

export default function SelfDrivingGtm() {
  const [level, setLevel] = useState(1)
  return (
    <div className="sdg">
      <Hero level={level} setLevel={setLevel} />
      <Framework level={level} setLevel={setLevel} />
      <Dimensions />
      <Industry />
      <Customer />
      <Final />
    </div>
  )
}
