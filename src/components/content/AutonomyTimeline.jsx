import { motion } from 'framer-motion'
import { Row } from '../ui'
import { timeline } from '../../content/editorial'

// Placeholder mini-diagrams: who owns each node shifts from person (grey) to agent (indigo).
function Mini({ n }) {
  const node = (x, y, label, agent, dashed) => (
    <g key={label + x}>
      <rect x={x} y={y} width="72" height="26" rx="6" fill={agent ? '#eef2ff' : '#fff'} stroke={agent ? '#6056ff' : '#cfd0d5'} strokeOpacity={agent ? 0.5 : 1} strokeDasharray={dashed ? '3 3' : undefined} />
      <circle cx={x + 11} cy={y + 13} r="3" fill={agent ? '#6056ff' : '#868a97'} />
      <text x={x + 19} y={y + 16.5} fontFamily="Inter" fontSize="10.5" fill="#0d162f">{label}</text>
    </g>
  )
  const line = (d, on) => <path d={d} stroke={on ? '#6056ff' : '#cfd0d5'} strokeOpacity={on ? 0.45 : 1} strokeDasharray="3 3" fill="none" />
  const sets = [
    [node(8, 10, 'You act', false), node(100, 10, 'Agent', true, true), node(8, 74, 'Result', false), line('M44 36v38', false), line('M80 23h20', true)],
    [node(8, 10, 'Agent', true), node(100, 10, 'Draft', true), node(54, 74, 'You review', false), line('M136 36c0 20-46 18-46 38', true)],
    [node(8, 10, 'Agent', true), node(100, 10, 'Acts', true), node(100, 74, 'Report', true), node(8, 74, 'Spot-check', false), line('M136 36v38', true), line('M100 87H80', false)],
    [node(8, 10, 'Trigger', true), node(100, 10, 'Plan + act', true), node(100, 74, 'Verify', true), node(8, 74, 'Exception', false, true), line('M80 23h20M136 36v38', true), line('M100 87H80', false)],
  ]
  return <svg viewBox="0 0 180 110" className="w-full max-w-[180px] h-auto mx-auto" aria-hidden="true">{sets[n - 1]}</svg>
}

export default function AutonomyTimeline() {
  return (
    <Row className="overflow-hidden">
      <div className="py-16 md:py-24 md:pb-32 pl-6 md:pl-20 desktop:pl-14 pr-0 desktop:pr-14">
        <p className="text-xs text-gray-400 tracking-[.03em] text-center mb-12">{timeline.caption}</p>
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[960px] max-w-[1060px] mx-auto">
            <div className="relative h-9 grid grid-cols-4">
              <span className="tl-rail" />
              {timeline.steps.map(s => (
                <div key={s.n} className="relative flex justify-center items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] tracking-[.02em] ${s.n > 2 ? 'bg-indigo-brand text-white shadow-[0_0_0_4px_rgba(96,86,255,.08)]' : 'bg-gray-100 text-gray-500 shadow-[0_0_0_4px_#fff]'}`}>{s.n}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 mt-4 mb-5">
              {timeline.steps.map(s => <p key={s.n} className="text-sm leading-[22.4px] text-ink text-center px-4">{s.hook}</p>)}
            </div>
            <div className="grid grid-cols-4">
              {timeline.steps.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`h-full border px-5 py-5 ${i < 3 ? 'border-r-0' : ''} ${s.n > 2 ? 'border-indigo-brand/20' : 'bg-gray-50/80 border-gray-200'}`}>
                  <Mini n={s.n} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}
