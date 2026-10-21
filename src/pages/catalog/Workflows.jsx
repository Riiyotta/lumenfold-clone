import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row } from '../../components/ui'
import { workflows, workflowsIndex, footerCta } from '../../content/catalog'
import { PGrain, GlassCoin, Glyph } from '../../components/catalog/primitives'
import { WCta } from '../../components/catalog/legacy'

const tones = ['sales', 'cs', 'marketing', 'hr', 'support', 'operations', 'research']
const glyphs = ['doc', 'users', 'inbox', 'chat', 'chart', 'shield', 'flag', 'search', 'mail', 'layers', 'spark', 'globe']

// W1: no hero in the original; main starts with the 2-column card list.
export default function Workflows() {
  useEffect(() => { document.title = 'Workflows | Lumenfold' }, [])
  return (
    <>
      <Row>
        <div className="px-6 md:px-12 lg:px-20 pt-10 md:pt-[30px] lg:pt-[60px] pb-10 md:pb-16">
          <h1 className="sr-only">{workflowsIndex.srTitle}</h1>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {workflows.map((w, i) => (
              <Link key={w.slug} to={`/workflows/${w.slug}`} className="group flex flex-col pt-6">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <PGrain palette={tones[i % tones.length]} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GlassCoin size={56}><Glyph name={glyphs[i]} className="w-6 h-6" color="#4b40d6" /></GlassCoin>
                  </div>
                </div>
                <span className="font-sans text-sm leading-[1.5] font-medium text-muted mb-2">{w.category}</span>
                <h3 className="font-sans text-lg md:text-xl leading-[1.5] font-semibold text-ink mb-4 transition-colors duration-150 group-hover:text-indigo-brand">{w.name}</h3>
                <p className="text-sm leading-[1.5] font-medium text-muted">{w.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </Row>
      <WCta copy={footerCta} />
    </>
  )
}
