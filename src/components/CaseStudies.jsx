import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cases } from '../content'
import { Row, Play, Plus } from './ui'

function SquareLogo({ name, className = '' }) {
  return (
    <span className={`w-10 h-10 shrink-0 flex items-center justify-center bg-surface-dark text-white font-display font-semibold text-lg ${className}`}>{name[0]}</span>
  )
}

function Media({ i }) {
  return (
    <button className="group relative w-full h-[300px] md:h-[400px] overflow-hidden">
      <img src={`/assets/photos/case-${i + 1}.webp`} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-br from-indigo-brand/30 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-14 h-14 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-white/25"><Play /></span>
      </span>
    </button>
  )
}

function Stats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 pt-6 pb-2 md:pb-8">
      {stats.map(([v, l]) => (
        <div key={l}><span className="font-display text-base font-semibold text-ink">{v}</span> <span className="text-sm text-muted">{l}</span></div>
      ))}
    </div>
  )
}

export default function CaseStudies() {
  const [open, setOpen] = useState(0)
  return (
    <Row>
      <div className="pt-10 pb-12 px-6 md:px-12 lg:px-20 border-b border-line">
        {/* Desktop accordion */}
        <div className="hidden lg:block">
          {cases.map((c, i) => (
            <div key={c.company} className={i > 0 ? 'border-t border-line' : ''}>
              {open !== i && (
                <button onClick={() => setOpen(i)} className="group w-full flex items-center gap-4 py-4 text-left font-sans transition-colors duration-150">
                  <SquareLogo name={c.company} className="opacity-60 group-hover:opacity-100 transition-opacity duration-150" />
                  <span className="flex-1 text-xl font-medium text-muted group-hover:text-ink transition-colors duration-150">{c.title}</span>
                  <span className="w-8 h-8 rounded-full bg-white border border-line flex items-center justify-center text-tertiary group-hover:text-ink group-hover:bg-[#f9f9fa] transition-all duration-150"><Plus /></span>
                </button>
              )}
              {/* Original: every panel stays mounted (initial=false) and animates height/opacity; the header row is inside it. */}
              <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                <div className="flex items-center gap-4 pt-4 pb-6">
                  <SquareLogo name={c.company} />
                  <p className="flex-1 text-xl font-medium text-ink">{c.title}</p>
                  <Link to={`/customers/${c.company.toLowerCase()}`} className="btn-secondary font-sans">{c.cta}</Link>
                </div>
                <Media i={i} />
                <Stats stats={c.stats} />
              </motion.div>
            </div>
          ))}
        </div>
        {/* Mobile / tablet: all expanded */}
        <div className="lg:hidden divide-y divide-line">
          {cases.map((c, i) => (
            <div key={c.company}>
              <div className="flex flex-col items-start md:flex-row md:items-center gap-3 md:gap-4 pt-4 pb-6">
                <SquareLogo name={c.company} />
                <p className="flex-1 text-base leading-[22.4px] md:text-xl md:leading-7 font-medium text-ink">{c.title}</p>
                <Link to={`/customers/${c.company.toLowerCase()}`} className="btn-secondary font-sans hidden md:inline-flex">{c.cta}</Link>
              </div>
              <Media i={i} />
              <Stats stats={c.stats} />
              <div className="md:hidden pt-4 pb-6"><Link to={`/customers/${c.company.toLowerCase()}`} className="btn-secondary font-sans">{c.cta}</Link></div>
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}
