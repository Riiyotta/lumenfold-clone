import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { autonomy } from '../content'
import { Row, PillTabs } from './ui'

const ease = [0.25, 0.1, 0.25, 1]

// Original flow diagrams: each level adds more agent-owned nodes.
function Diagram({ level }) {
  const nodes = [
    [['You', 20, 30, 'p'], ['Draft', 110, 30, 'a'], ['Send', 20, 100, 'p']],
    [['Agent', 20, 30, 'a'], ['Suggest', 110, 30, 'a'], ['Approve', 65, 100, 'p'], ['Act', 110, 160, 'a']],
    [['Agent', 20, 30, 'a'], ['Act', 110, 30, 'a'], ['Log', 110, 100, 'a'], ['Spot-check', 20, 160, 'p']],
    [['Trigger', 20, 30, 'a'], ['Plan', 110, 30, 'a'], ['Act', 20, 100, 'a'], ['Verify', 110, 100, 'a'], ['Escalate', 65, 160, 'p']],
  ][level]
  return (
    <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] max-w-full">
      {nodes.slice(1).map((n, k) => {
        const p = nodes[k]
        return <path key={'l' + k} d={`M${p[1] + 35} ${p[2] + 26} C ${p[1] + 35} ${(p[2] + n[2]) / 2 + 20}, ${n[1] + 35} ${(p[2] + n[2]) / 2}, ${n[1] + 35} ${n[2]}`}
          stroke="#6056ff" strokeOpacity=".35" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      })}
      {nodes.map(([label, x, y, who], k) => (
        <g key={label + k}>
          <rect x={x} y={y} width="70" height="26" rx="6" fill={who === 'a' ? '#eef2ff' : '#fff'} stroke={who === 'a' ? '#6056ff' : '#cfd0d5'} strokeOpacity={who === 'a' ? 0.5 : 1} />
          <circle cx={x + 11} cy={y + 13} r="3" fill={who === 'a' ? '#6056ff' : '#868a97'} />
          <text x={x + 19} y={y + 16.5} fontFamily="Inter" fontSize="10.5" fill="#0d162f">{label}</text>
          <text x={x + 62} y={y - 3} fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#9ca3af" textAnchor="end">{String(k + 1).padStart(2, '0')}</text>
        </g>
      ))}
    </svg>
  )
}

export default function Autonomy() {
  const [tab, setTab] = useState(0)
  const [reached, setReached] = useState(-1)
  const section = useRef(null)
  // Original: one IntersectionObserver on the whole section (threshold 0.1, ratio > 0.1) fires once,
  // then levels 0-3 activate with setTimeout(i * 400). Tabs only swap the diagrams; they never change the level state.
  useEffect(() => {
    const el = section.current
    if (!el) return
    let fired = false
    const ts = []
    const io = new IntersectionObserver(([e]) => {
      if (fired || !e.isIntersecting || e.intersectionRatio <= 0.1) return
      fired = true
      io.disconnect()
      ;[0, 1, 2, 3].forEach(i => ts.push(setTimeout(() => setReached(i), i * 400)))
    }, { threshold: 0.1 })
    io.observe(el)
    return () => { io.disconnect(); ts.forEach(clearTimeout) }
  }, [])

  return (
    <Row>
      <div ref={section}>
      <div className="pt-20 md:pt-32 pb-10 md:pb-14 px-6 md:px-20 border-b border-line">
        <div>
          <h2 className="max-w-lg text-[30px] leading-9 md:text-[36px] md:leading-[49.5px] tracking-[-0.025em] text-ink">{autonomy.title}</h2>
          <p className="mt-3 max-w-lg text-base leading-[26px] text-muted">{autonomy.body}</p>
        </div>
        <PillTabs tabs={autonomy.tabs} active={tab} onChange={setTab} className="mt-6 hidden sm:inline-flex" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {autonomy.levels.map((l, i) => {
          const on = i <= reached
          const destination = i >= 2 // L3/L4 are the "destination" group on the original
          return (
            <motion.div key={l.name} className="relative bg-white border-r border-b md:border-b-0 last:border-b-0 border-line flex flex-col h-full"
              initial={{ opacity: 0.4 }} animate={{ opacity: on ? 1 : 0.4 }} transition={{ duration: 0.4, ease }}>
              <div className="p-5 pb-4 border-b border-line text-lg leading-7 font-medium">
                <motion.span initial={false} animate={{ color: on ? (destination ? '#6056ff' : 'rgb(17, 24, 39)') : 'rgb(209, 213, 219)' }} transition={{ duration: 0.3 }}>
                  <span className={destination ? '' : 'text-gray-400'}>L{i + 1}. </span>{l.name}
                </motion.span>
              </div>
              <motion.div key={tab} className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease }}>
                <div className="h-[261px] flex items-center justify-center sm:border-b border-line"><Diagram level={i} /></div>
                <p className="p-5 pt-4 text-sm leading-[22.75px] text-muted">{l.body}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
      </div>
    </Row>
  )
}
