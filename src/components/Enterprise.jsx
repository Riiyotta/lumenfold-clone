import { motion } from 'framer-motion'
import { enterprise } from '../content'
import { EASE, Row, Check } from './ui'

// Original certification-style seal.
function Seal({ label, sub }) {
  return (
    <svg viewBox="0 0 104 104" className="w-[104px] h-[104px]">
      <circle cx="52" cy="52" r="50" fill="#fff" stroke="#e6e7ea" />
      <circle cx="52" cy="52" r="40" fill="#eef2ff" stroke="#6056ff" strokeOpacity=".35" strokeDasharray="2 3" />
      {Array.from({ length: 12 }).map((_, k) => {
        const a = (k / 12) * Math.PI * 2
        return <path key={k} transform={`translate(${52 + Math.cos(a) * 45} ${52 + Math.sin(a) * 45}) scale(.22)`} d="M0-10l2.9 6 6.6.9-4.8 4.6 1.2 6.5L0 4.9-5.9 8l1.2-6.5L-9.5-3.1-2.9-4z" fill="#6056ff" fillOpacity=".5" />
      })}
      <text x="52" y="50" textAnchor="middle" fontFamily="Inter" fontWeight="600" fontSize="13" fill="#0d162f">{label}</text>
      <text x="52" y="64" textAnchor="middle" fontFamily="Inter" fontSize="8.5" fill="#868a97">{sub}</text>
    </svg>
  )
}

function ColIcon({ i }) {
  const d = ['M10 2a4 4 0 014 4v2h1a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1h1V6a4 4 0 014-4z', 'M10 2l7 3v5c0 4.5-3 7.5-7 8-4-.5-7-3.5-7-8V5z', 'M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6zm8 3a3 3 0 100-6 3 3 0 000 6z'][i]
  return <svg viewBox="0 0 20 20" className="w-5 h-5"><path d={d} fill="#6056ff" fillOpacity=".15" stroke="#6056ff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
}

const view = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } }

export default function Enterprise() {
  return (
    <Row>
      <div className="py-12 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mb-10 md:mb-12">
          <motion.h2 {...view} viewport={{ once: true, amount: 0.4 }} transition={EASE} className="text-[30px] leading-[37.5px] md:text-[36px] md:leading-[45px] tracking-[-0.025em] text-ink [text-wrap:balance]">{enterprise.title}</motion.h2>
          <motion.p {...view} viewport={{ once: true, amount: 0.4 }} transition={{ ...EASE, delay: 0.08 }} className="mt-5 max-w-xl text-base leading-[24.8px] md:text-lg md:leading-[27.9px] text-muted">{enterprise.body}</motion.p>
        </div>
        <motion.div {...view} viewport={{ once: true, amount: 0.3 }} transition={EASE} className="rounded-xl bg-slate-50 px-6 py-16 md:py-20 flex items-start justify-center gap-12 md:gap-20">
          {enterprise.badges.map((b, i) => (
            <div key={b} className="flex flex-col items-center gap-4">
              <Seal label={i ? 'PRIVACY' : 'AUDIT'} sub={i ? 'Data ready' : 'Type II'} />
              <div className="flex items-center gap-2 text-base font-medium text-ink">{b}<Check /></div>
            </div>
          ))}
        </motion.div>
        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-10 md:gap-12">
          {enterprise.columns.map((c, ci) => (
            <motion.div key={c.title} {...view} viewport={{ once: true, amount: 0.2 }} transition={{ ...EASE, delay: ci * 0.06 }}>
              <div className="flex items-center gap-2.5 mb-5"><ColIcon i={ci} /><h3 className="font-sans text-[15px] leading-[22.5px] text-muted">{c.title}</h3></div>
              <ul className="flex flex-col gap-3">
                {c.items.map(it => <li key={it} className="flex items-center gap-2.5 text-sm leading-5 md:text-base md:leading-6 text-ink"><Check />{it}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Row>
  )
}
