import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { integrations } from '../content'
import { EASE, Row, AppIcon, Chevron } from './ui'

export default function Integrations() {
  return (
    <Row>
      <div className="py-12 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-[30px] leading-[37.5px] md:text-[36px] md:leading-[45px] tracking-[-0.025em] text-ink">
            {integrations.titleStart} <span className="text-indigo-brand">{integrations.highlight}</span>
          </h2>
          <Link to="/integrations" className="group font-sans inline-flex items-center gap-1 text-sm leading-[21px] text-muted hover:text-indigo-brand transition-colors duration-150">
            {integrations.link}<Chevron dir="right" className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-px bg-line border border-line">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div key={i} className="bg-white flex items-center justify-center aspect-square"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ ...EASE, delay: (i % 10) * 0.03 }}>
              <AppIcon seed={i * 3 + 1} className="w-7 h-7 md:w-8 md:h-8" />
            </motion.div>
          ))}
        </div>
      </div>
    </Row>
  )
}
