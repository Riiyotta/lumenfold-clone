import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pricing } from '../../content/company'
import { Row, Reveal } from '../../components/ui'
import { FAQ, CheckItem, LogoGrid } from '../../components/company/shared'

// Six original 32px mono glyphs; positions from §1 (hidden below lg).
const glyphs = [
  'M16 4l10 6v12l-10 6-10-6V10z',
  'M6 16a10 10 0 1020 0 10 10 0 00-20 0zm6-2h.01M20 14h.01M12 20c2 2 6 2 8 0',
  'M8 8h16v12H14l-6 5z',
  'M16 4v6M16 22v6M4 16h6M22 16h6M16 12a4 4 0 110 8 4 4 0 010-8z',
  'M6 24l6-8 5 5 9-13',
  'M10 6h12l4 6-10 14L6 12z',
]
const spots = [
  { top: '8%', right: '8%' }, { top: '18%', left: '12%' }, { top: '5%', left: '25%' },
  { top: '12%', right: '20%' }, { top: '22%', right: '5%' }, { top: '25%', left: '5%' },
]

function PricingHero() {
  const { plan } = pricing
  return (
    <Row className="bg-surface-light overflow-hidden">
      {glyphs.map((d, i) => (
        <svg key={i} viewBox="0 0 32 32" className="absolute w-8 h-8 opacity-50 pointer-events-none hidden lg:block text-ink" style={spots[i]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
      ))}
      <div className="relative px-6 md:px-12 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-[36px] leading-[45px] md:text-[48px] md:leading-[66px] font-medium text-ink mb-4">{pricing.title[0]}<br />{pricing.title[1]}</h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl mx-auto border border-line">
          <div className="flex flex-col p-8 md:p-10 bg-white">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-medium text-ink">{plan.name}</h3>
              <p className="text-sm text-muted mt-2">{plan.body}</p>
            </div>
            <div className="border-t border-line mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {plan.features.map((col, i) => <ul key={i} className="space-y-3">{col.map(f => <CheckItem key={f}>{f}</CheckItem>)}</ul>)}
            </div>
            <Link to="/book-a-demo" className="btn-primary w-full justify-center px-5 py-2.5 text-sm">{plan.cta}</Link>
          </div>
        </motion.div>
      </div>
    </Row>
  )
}

function PricingFAQ() {
  return (
    <Row>
      <div className="px-6 md:px-12 py-16 md:py-24">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-ink">{pricing.faqTitle}</h2>
          <p className="text-muted">{pricing.faqBody}</p>
        </Reveal>
        <FAQ items={pricing.faq} />
      </div>
    </Row>
  )
}

export default function Pricing() {
  return (
    <>
      <PricingHero />
      <LogoGrid />
      <PricingFAQ />
    </>
  )
}
