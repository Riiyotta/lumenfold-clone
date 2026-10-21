import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { costHero } from '../content'
import { EASE, Row, PillTabs, Avatar, AppIcon } from './ui'

const sparks = [
  'M2 32 L20 28 L38 30 L56 20 L74 22 L92 14 L110 12 L128 6',
  'M2 24 L20 26 L38 18 L56 20 L74 14 L92 16 L110 10 L128 8',
  'M2 8 L20 12 L38 10 L56 18 L74 20 L92 24 L110 26 L128 30',
  'M2 30 L20 24 L38 26 L56 18 L74 12 L92 14 L110 8 L128 4',
]

function Spark({ d, color, go }) {
  const end = d.split(' ').slice(-2)
  return (
    <svg viewBox="0 0 132 40" className="w-[132px] h-10 mt-3">
      <motion.path d={`${d} L128 40 L2 40 Z`} fill={color} fillOpacity=".08" initial={{ opacity: 0 }} animate={{ opacity: go ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.3 }} />
      <motion.path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: go ? 1 : 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }} />
      <motion.circle cx={end[0].replace('L', '')} cy={end[1]} r="2.75" fill={color} initial={{ scale: 0 }} animate={{ scale: go ? 1 : 0 }} transition={{ duration: 0.3, delay: 1 }} />
    </svg>
  )
}

let uid = 0
const makeRow = (r, running = false) => ({ id: ++uid, r, running })

export default function CostHero() {
  const [tab, setTab] = useState(0)
  const card = useRef(null)
  const inView = useInView(card, { amount: 0.2 })
  const [rows, setRows] = useState(() => costHero.rows.slice(0, 7).map(r => makeRow(r)))
  const cursor = useRef(7)

  useEffect(() => { setRows(costHero.rows.slice(0, 7).map(r => makeRow(r))); cursor.current = 7 }, [tab])

  useEffect(() => {
    if (!inView) return
    const iv = setInterval(() => {
      const r = costHero.rows[cursor.current % costHero.rows.length]; cursor.current++
      const row = makeRow(r, true)
      setRows(rs => [row, ...rs].slice(0, 8))
      setTimeout(() => setRows(rs => rs.map(x => x.id === row.id ? { ...x, running: false } : x)), 1600)
    }, 3400)
    return () => clearInterval(iv)
  }, [inView, tab])

  return (
    <Row>
      <div className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-0 overflow-hidden">
        {/* Original: this island animates on mount (animate, not whileInView): heading grid EASE, tabs delay .1, card delay .15. */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-8 lg:gap-x-10 items-center pb-10 md:pb-14" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <h2 className="lg:col-span-7 text-[48px] leading-[57.6px] tracking-[-2.4px] text-ink">{costHero.titleLines[0]}<br /> {costHero.titleLines[1]}</h2>
          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-base leading-[25.6px] text-muted max-w-xl">{costHero.body}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/book-a-demo" className="btn-primary font-sans !rounded-full">{costHero.primary}</Link>
              <Link to="/pricing" className="btn-secondary font-sans !rounded-full">{costHero.secondary}</Link>
            </div>
          </div>
        </motion.div>
        <motion.div className="hidden md:flex md:mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.1 }}>
          <PillTabs tabs={costHero.tabs} active={tab} onChange={setTab} />
        </motion.div>
        <motion.div ref={card} className="relative rounded-t-xl shadow-app-card-top h-[560px]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}>
          <div className="h-full bg-white border border-line border-b-0 rounded-t-xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,.9)]">
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-line">
              {costHero.kpis.map((k, i) => (
                <div key={k.label} className={`flex flex-col justify-between p-4 border-line ${i % 2 === 0 ? 'border-r' : ''} md:border-r md:last:border-r-0 ${i < 2 ? 'border-b md:border-b-0' : ''}`}>
                  <div className="text-[11.5px] leading-[17.25px] font-medium tracking-[0.23px] text-muted">{k.label}</div>
                  <div className="mt-1.5 text-2xl leading-6 font-medium tracking-[-0.48px] text-ink">{k.value}</div>
                  <div className={`mt-1 text-[11.5px] font-medium ${k.tone === 'teal' ? 'text-eval-teal' : 'text-indigo-brand'}`}>{k.delta}</div>
                  <Spark d={sparks[i]} color={k.tone === 'teal' ? '#0e9384' : '#6056ff'} go />
                </div>
              ))}
            </div>
            <div className="p-4">
              <div className="hidden sm:grid grid-cols-[1fr_160px_150px_80px_60px] wide:grid-cols-[1fr_150px_140px_60px_50px] gap-4 wide:gap-3 pb-2.5 text-[11px] text-muted">
                {costHero.columns.map(c => <span key={c}>{c}</span>)}
              </div>
              <AnimatePresence initial={false}>
                {rows.map(({ id, r, running }) => (
                  <motion.div key={id} layout initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }} style={{ overflow: 'hidden' }} className="relative">
                    <motion.span className="absolute -inset-x-5 inset-y-0 running-row" initial={{ opacity: 0 }} animate={{ opacity: running ? 1 : 0 }} transition={{ duration: 0.8 }} />
                    <div className="relative grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_160px_150px_80px_60px] wide:grid-cols-[1fr_150px_140px_60px_50px] gap-4 wide:gap-3 py-2.5 border-b border-line/60 items-center">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[12.5px] text-ink truncate">{r[0]}</span>
                        <span className="flex -space-x-1.5 shrink-0">
                          {[0, 1].map(k => <span key={k} className="w-[18px] h-[18px] rounded-full bg-white border border-line flex items-center justify-center"><AppIcon seed={id + k} className="w-2.5 h-2.5" /></span>)}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2"><Avatar seed={r[1].length} size={20} rounded="rounded-md" /><span className="text-xs text-ink">{r[1]}</span></div>
                      <div className="hidden sm:flex items-center gap-2"><AppIcon seed={r[2].charCodeAt(6)} className="w-4 h-4" /><span className="text-xs text-muted">{r[2]}</span></div>
                      <div className="text-xs">
                        {running ? <><span className="wide:hidden text-indigo-brand">Running…</span><span className="hidden wide:block spinner" /></> : <span className="text-eval-teal">{r[3]}</span>}
                      </div>
                      <div className="hidden sm:block text-xs text-ink">{r[4]}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </Row>
  )
}
