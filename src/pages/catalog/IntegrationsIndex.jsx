import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { EASE, Row } from '../../components/ui'
import Testimonials from '../../components/Testimonials'
import { categories, integrations, catalogIndex as copy, integrationsPower, catalogFaq, catalogCta } from '../../content/catalog'
import { PGrain, GlassCoin, Glyph, SearchInput, SelectField, LogoTile, PAD } from '../../components/catalog/primitives'
import { ExpandTiles, NodeDiagram, PillStack3, Faq, ClosingCTA } from '../../components/catalog/sections'

const rot = [-7, 5, 4, -5, 6, -4, -6, 7, -5, 4]
const auroraGlyphs = ['mail', 'calendar', 'chart', 'database', 'chat', 'doc', 'users', 'inbox', 'globe', 'link']
const fmt = n => n.toLocaleString('en-US')

function Hero() {
  return (
    <Row>
      <div className="pt-10 md:pt-16 pb-16 md:pb-20 overflow-hidden px-6 md:px-12 lg:px-20">
        <motion.div className="flex flex-col items-center text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
          <h1 className="max-w-4xl text-[36px] md:text-[48px] leading-[1.15] tracking-[-0.05em] text-ink">{copy.title}</h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.6] text-muted">{copy.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary font-sans text-base px-6 py-3">{copy.primary}</Link>
            <Link to="/" className="btn-secondary font-sans text-base px-6 py-3">{copy.secondary}</Link>
          </div>
        </motion.div>
        <motion.div className="relative mt-12 md:mt-16 overflow-hidden" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.1 }}>
          <PGrain palette="sales" />
          <motion.div className="relative py-12 md:py-16 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-6"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
            {rot.map((r, i) => (
              <GlassCoin key={i} style={{ transform: `rotate(${r}deg) translateY(${i % 2 ? 8 : -8}px)` }}>
                <Glyph name={auroraGlyphs[i]} className="w-5 h-5" color="#4b40d6" />
              </GlassCoin>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Row>
  )
}

function Card({ it }) {
  return (
    <Link to={`/integrations/${it.slug}`} data-category={it.category} className="flex flex-col p-6 border border-line bg-white hover:bg-[#f9f9f9] transition-colors duration-200">
      <LogoTile seed={it.seed} size={48} inset={6} className="mb-4" />
      <span className="text-xs text-muted mb-1">{it.category}</span>
      <h3 className="text-lg leading-7 font-medium text-ink mb-2 truncate">{it.name}</h3>
      <p className="text-sm text-muted line-clamp-3">{it.desc}</p>
    </Link>
  )
}

function Catalog() {
  const [params] = useSearchParams()
  const urlCat = params.get('category') || ''
  const [query, setQuery] = useState('')
  const [q, setQ] = useState('') // debounced
  const [cat, setCat] = useState(categories.includes(urlCat) ? urlCat : '')
  const [limit, setLimit] = useState(copy.pageSize)

  // ?category= deep link preselects (also when the URL changes while mounted).
  useEffect(() => { setCat(categories.includes(urlCat) ? urlCat : ''); setLimit(copy.pageSize) }, [urlCat])
  // 80ms debounce on the search input; any change resets the visible limit.
  useEffect(() => { const t = setTimeout(() => { setQ(query.trim().toLowerCase()); setLimit(copy.pageSize) }, 80); return () => clearTimeout(t) }, [query])

  const results = useMemo(() => integrations.filter(it =>
    (!cat || it.category === cat) && (!q || `${it.category} ${it.name} ${it.desc}`.toLowerCase().includes(q))
  ), [q, cat])
  const N = results.length
  const shown = Math.min(limit, N)

  return (
    <Row>
      <div className={`relative ${PAD}`}>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput value={query} onChange={setQuery} placeholder={copy.search} />
          <SelectField value={cat} onChange={v => { setCat(v); setLimit(copy.pageSize) }} label="Category"
            options={[{ value: '', label: copy.all }, ...categories.map(c => ({ value: c, label: c }))]} />
          {(query || cat) && (
            <button onClick={() => { setQuery(''); setQ(''); setCat(''); setLimit(copy.pageSize) }}
              className="font-sans px-4 py-2.5 text-sm font-medium text-muted hover:text-ink transition-colors">{copy.reset}</button>
          )}
        </div>
        <p className="text-sm text-muted mb-6" aria-live="polite">
          {N > shown ? `Showing ${fmt(shown)} of ${fmt(N)} integrations` : `${fmt(N)} integration${N === 1 ? '' : 's'}`}
        </p>
        {N > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.slice(0, shown).map(it => <Card key={it.slug} it={it} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted">{copy.empty[0]}</p>
            <p className="mt-2 text-sm text-muted">{copy.empty[1]}</p>
          </div>
        )}
        {N > shown && (
          <div className="mt-8 flex justify-center">
            <button className="group" onClick={() => setLimit(l => l + copy.pageSize)}>
              <span className="btn-secondary font-sans text-base px-6 py-3">{copy.loadMore}</span>
            </button>
          </div>
        )}
      </div>
    </Row>
  )
}

export default function IntegrationsIndex() {
  useEffect(() => { document.title = 'Integrations | Lumenfold' }, [])
  const p = integrationsPower
  const items = [
    { ...p.items[0], illus: <NodeDiagram chips={p.items[0].chips} /> },
    { ...p.items[1], illus: <PillStack3 pills={p.items[1].pills} icons={['clock', 'shield', 'check']} /> },
    { ...p.items[2], illus: <PillStack3 pills={p.items[2].pills} icons={['doc', 'search', 'send']} /> },
  ]
  return (
    <>
      <Hero />
      <Catalog />
      <ExpandTiles title={p.title} body={p.body} items={items} headingClass="!mb-12 md:!mb-14" />
      <Testimonials />
      <Faq {...catalogFaq} />
      <ClosingCTA palette="sales" {...catalogCta} />
    </>
  )
}
