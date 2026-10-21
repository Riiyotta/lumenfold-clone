// /features: A.7 FeaturesHero (text-only) + FeatureCatalog (sticky headings).
import { motion } from 'framer-motion'
import { EASE, Row, AppIcon } from '../ui'
import { BareRow, Btn, LineIcon, pad } from './lib'

export function FeaturesHero({ h1, body, ctas }) {
  const t = d => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { ...EASE, delay: d } })
  return (
    <BareRow>
      <div className={`${pad} pt-20 md:pt-28 pb-14 md:pb-20`}>
        <div className="max-w-3xl">
          <motion.h1 {...t(0)} className="text-[36px] md:text-[48px] leading-[1.3] tracking-[-0.05em] [text-wrap:balance] text-ink">{h1}</motion.h1>
          <motion.p {...t(0.06)} className="mt-5 text-lg md:text-xl leading-[1.5] text-muted [text-wrap:balance]">{body}</motion.p>
          <motion.div {...t(0.12)} className="mt-8 flex flex-wrap gap-4">
            <Btn to={ctas[0].to} round={false} className="!text-base !px-6 !py-3">{ctas[0].label}</Btn>
            <Btn to={ctas[1].to} kind="secondary" round={false} className="!text-base !px-6 !py-3">{ctas[1].label}</Btn>
          </motion.div>
        </div>
      </div>
    </BareRow>
  )
}

const fans = { 3: [-8, 0, 8], 4: [-12, -4, 4, 12] }
function LogoCluster({ seeds }) {
  const rot = fans[seeds.length] || seeds.map(() => 0)
  return (
    <motion.div className="flex" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={EASE}>
      {seeds.map((s, i) => (
        <span key={s} className="relative w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center shadow-[0_2px_10px_#0f1a2f0f]"
          style={{ marginLeft: i ? -8.4 : 0, transform: `rotate(${rot[i]}deg)`, zIndex: 2 + (i % 3) }}>
          <AppIcon seed={s} className="w-5 h-5" />
        </span>
      ))}
    </motion.div>
  )
}

export function FeatureCatalog({ categories }) {
  return (
    <Row>
      {categories.map((c, i) => (
        <motion.section key={c.title} className={`${pad} py-14 md:py-20 ${i ? 'border-t border-line' : ''}`}
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ ...EASE, delay: Math.min(i, 3) * 0.05 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-5">{c.logos ? <LogoCluster seeds={c.logos} /> : <LineIcon name={c.icon} size={28} className="text-ink" />}</div>
              <h2 className="text-2xl md:text-[30px] leading-[1.5] tracking-[-0.025em] text-ink">{c.title}</h2>
            </div>
            <ul>
              {c.rows.map(([lead, tail], k) => (
                <li key={lead} className={`py-3.5 text-base leading-[1.5] ${k ? 'border-t border-line' : ''}`}>
                  <span className="font-medium text-ink">{lead}</span><span className="text-muted">{tail}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      ))}
    </Row>
  )
}
