// Stub: /tools, a 1-word centred title and 7 text items in 2 columns (W1-style list on A tokens), then the CTA band.
import { Link } from 'react-router-dom'
import { Row, Reveal } from '../../components/ui'
import { ClosingCTA, pad } from '../../components/product/lib'
import { toolsPage as d, closing } from '../../content/product'

export default function Tools() {
  return (
    <>
      <Row>
        <div className={`pt-16 md:pt-24 pb-12 md:pb-20 ${pad}`}>
          <Reveal className="text-center max-w-[880px] mx-auto mb-8 md:mb-12">
            <h1 className="text-[36px] md:text-[48px] leading-[1.2] tracking-[-0.05em] text-ink">{d.h1}</h1>
            <p className="mt-4 text-base md:text-lg leading-[1.6] text-muted">{d.intro}</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 lg:gap-x-12">
            {d.items.map((t, i) => (
              <Reveal key={t.title} delay={Math.min(i, 3) * 0.05} amount={0.3} className="py-5 border-t border-line">
                <Link to={t.to} className="group block">
                  <h2 className="font-sans text-xl leading-[1.5] font-semibold text-ink group-hover:text-indigo-brand transition-colors duration-150">{t.title}</h2>
                  <p className="mt-2 text-sm leading-[1.6] text-muted">{t.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Row>
      <ClosingCTA copy={closing} palette="sales" />
    </>
  )
}
