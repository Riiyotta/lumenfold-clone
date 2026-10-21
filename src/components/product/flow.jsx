// Node-graph canvas in the react-flow vocabulary of A.8 / A.12, drawn with plain HTML + SVG.
// fitView-like scaling (padding .15). The activation script is our own design: the spec notes
// 300 ms / 1 s setTimeout steps and randomised 1-5 task counts but no exact sequence.
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Avatar, AppIcon } from '../ui'
import { useWidth } from './lib'

const SIZE = { trigger: [184, 60], agent: [204, 46], add: [112, 32] }

function edgePath(a, b) {
  const [aw, ah] = SIZE[a.type], [, bh] = SIZE[b.type]
  const sx = a.x + aw, sy = a.y + ah / 2, tx = b.x, ty = b.y + bh / 2
  if (Math.abs(sy - ty) < 1) return `M${sx} ${sy}H${tx}`
  const mx = (sx + tx) / 2, r = Math.min(8, Math.abs(ty - sy) / 2), d = ty > sy ? 1 : -1
  return `M${sx} ${sy}H${mx - r}Q${mx} ${sy} ${mx} ${sy + r * d}V${ty - r * d}Q${mx} ${ty} ${mx + r} ${ty}H${tx}`
}

function Node({ n, state, count }) {
  const active = state === 'active'
  if (n.type === 'add') return (
    <div className="absolute border border-dashed border-gray-300 rounded-lg px-3 py-1.5 text-xs text-[#6b7280] bg-white flex items-center justify-center" style={{ left: n.x, top: n.y, width: SIZE.add[0], height: SIZE.add[1] }}>+ {n.label}</div>
  )
  if (n.type === 'trigger') return (
    <div className="absolute" style={{ left: n.x, top: n.y, width: SIZE.trigger[0], height: SIZE.trigger[1] }}>
      <div className={`relative h-full bg-white rounded-xl border shadow-sm px-4 py-3 min-w-[180px] transition-colors duration-300 ${active ? 'border-indigo-500 trigger-wobble' : 'border-gray-200'}`}>
        <span className="absolute -top-3 left-3 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium px-2 py-0.5">{n.badge}</span>
        <p className="text-sm font-medium text-ink leading-5 truncate">{n.label}</p>
        <p className="text-xs text-muted truncate">{n.sub}</p>
      </div>
    </div>
  )
  return (
    <div className="absolute" style={{ left: n.x, top: n.y, width: SIZE.agent[0], height: SIZE.agent[1] }}>
      <div className={`relative h-full flex items-center gap-2.5 rounded-xl border bg-white px-2.5 pr-3.5 py-2.5 transition-all duration-300 ${active ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,.12)]' : 'border-gray-200'}`}>
        <span className="relative shrink-0">
          <Avatar seed={n.avatar} size={24} rounded="rounded-[6px]" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-white" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-ink leading-5 truncate">{n.label}</span>
        </span>
        <span className="flex gap-0.5 shrink-0">{n.tools.map(t => <AppIcon key={t} seed={t} className="w-3.5 h-3.5" />)}</span>
        {count > 0 && <span className="absolute -top-2 -right-2 rounded-full bg-indigo-500 text-white text-[10px] font-medium px-1.5 py-px shadow-sm">{count} {count === 1 ? 'task' : 'tasks'}</span>}
        {active && <span className="absolute -top-2 -right-2 workforce-spin-12 bg-white" />}
      </div>
    </div>
  )
}

export function FlowCanvas({ graph, height = 460, onStep, className = '', children }) {
  const wrap = useRef(null)
  const w = useWidth(wrap)
  const inView = useInView(wrap, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(-1)
  const [counts, setCounts] = useState({})
  const byId = useMemo(() => Object.fromEntries(graph.nodes.map(n => [n.id, n])), [graph])

  const bounds = useMemo(() => {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity
    graph.nodes.forEach(n => { const [nw, nh] = SIZE[n.type]; x1 = Math.min(x1, n.x); y1 = Math.min(y1, n.y - 12); x2 = Math.max(x2, n.x + nw); y2 = Math.max(y2, n.y + nh) })
    return { x1, y1, w: x2 - x1, h: y2 - y1 }
  }, [graph])
  const s = w ? Math.min(1, w / (bounds.w * 1.15), height / (bounds.h * 1.3)) : 0.6
  const ox = (w - bounds.w * s) / 2 - bounds.x1 * s, oy = (height - bounds.h * s) / 2 - bounds.y1 * s

  // Reset when the graph changes (tabs).
  useEffect(() => { setStep(-1); setCounts({}) }, [graph])
  useEffect(() => {
    if (reduce) { setStep(graph.seq.length); return }
    if (!inView) return
    const seq = graph.seq
    const t = setTimeout(() => {
      if (step >= seq.length) { setStep(-1); setCounts({}); return }
      if (step >= 0 && byId[seq[step]].type === 'agent') setCounts(c => ({ ...c, [seq[step]]: 1 + Math.floor(Math.random() * 5) }))
      setStep(step + 1)
    }, step < 0 ? 300 : step >= seq.length ? 2400 : 1000)
    return () => clearTimeout(t)
  }, [step, inView, graph, reduce, byId])

  useEffect(() => { onStep && onStep(step, graph.seq.length) }, [step])

  const current = graph.seq[step]
  const done = new Set(graph.seq.slice(0, Math.max(0, step)))
  const stateOf = id => (id === current ? 'active' : done.has(id) ? 'done' : 'idle')

  return (
    <div ref={wrap} className={`relative w-full overflow-hidden bg-white ${className}`} style={{ height }}>
      <div className="absolute inset-0 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
      <div className="absolute left-0 top-0" style={{ transform: `translate(${ox}px, ${oy}px) scale(${s})`, transformOrigin: '0 0', opacity: w ? 1 : 0 }}>
        <svg className="absolute overflow-visible left-0 top-0" width="1" height="1" aria-hidden="true">
          {graph.edges.map(([a, b]) => {
            const on = b === current && done.has(a) || (done.has(a) && done.has(b))
            const live = b === current && done.has(a)
            return <path key={a + b} d={edgePath(byId[a], byId[b])} fill="none" stroke={live ? '#6366f1' : on ? '#a5b4fc' : '#d1d5db'} strokeWidth={live ? 2 : 1.5}
              strokeDasharray={byId[b].type === 'add' ? '4 4' : live ? '6 4' : undefined} style={{ transition: 'stroke .3s' }}>
              {live && <animate attributeName="stroke-dashoffset" from="20" to="0" dur=".6s" repeatCount="indefinite" />}
            </path>
          })}
        </svg>
        {graph.nodes.map(n => <Node key={n.id} n={n} state={stateOf(n.id)} count={counts[n.id] || 0} />)}
      </div>
      {children}
    </div>
  )
}
