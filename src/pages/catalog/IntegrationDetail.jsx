import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EASE, Row, Reveal } from '../../components/ui'
import { integrations, integrationDetail } from '../../content/catalog'
import { Breadcrumb, LogoTile, PAD } from '../../components/catalog/primitives'
import { ClosingCTA } from '../../components/catalog/sections'

const MAX = 12

function Heading({ title, body }) {
  return (
    <Reveal className="max-w-2xl mb-12 md:mb-14">
      <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{title}</h2>
      <p className="mt-5 text-base md:text-lg leading-[1.6] text-muted">{body}</p>
    </Reveal>
  )
}

function Group({ label, rows }) {
  if (!rows.length) return null
  return (
    <div className="mb-10 last:mb-0">
      <p className="font-display text-sm font-medium text-ink mb-2">{label} <span className="text-muted font-normal">({rows.length})</span></p>
      {rows.slice(0, MAX).map(([t, d]) => (
        <div key={t} className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-1 md:gap-6 py-4 border-t border-line">
          <h3 className="text-base font-medium text-ink">{t}</h3>
          <p className="text-sm text-muted">{d}</p>
        </div>
      ))}
      {rows.length > MAX && <p className="text-sm text-muted pt-4 border-t border-line">And {rows.length - MAX} more {label.toLowerCase()} available once you connect.</p>}
    </div>
  )
}

export default function IntegrationDetail() {
  const { slug } = useParams()
  const item = integrations.find(i => i.slug === slug)
  useEffect(() => { if (item) document.title = `${item.name} integration | Lumenfold` }, [item])
  if (!item) return <Navigate to="/integrations" replace />
  const c = integrationDetail(item)
  const hasSteps = item.actions.length + item.triggers.length > 0
  const coins = [{ app: item.seed }, { avatar: 3 }, { glyph: 'bolt' }, { avatar: 11 }, { glyph: 'shield' }, { glyph: 'link' }]
  return (
    <>
      <Row>
        <div className="pt-8 md:pt-10 pb-12 md:pb-16 px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
            <Breadcrumb items={[{ label: c.crumbs[0], to: '/' }, { label: c.crumbs[1], to: '/integrations' }, { label: c.crumbs[2] }]} />
            <div className="flex items-center gap-4">
              <LogoTile seed={item.seed} size={56} inset={8} />
              <h1 className="text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.05em] text-ink">{c.title}</h1>
            </div>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-[1.6] text-muted">{c.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/" className="btn-primary font-sans text-base px-6 py-3">{c.primary}</Link>
              <a href="#setup" className="btn-secondary font-sans text-base px-6 py-3">{c.secondary}</a>
              <Link to={`/integrations?category=${encodeURIComponent(item.category)}`} className="font-sans text-sm text-muted hover:text-ink transition-colors duration-150">{c.more}</Link>
            </div>
          </motion.div>
        </div>
      </Row>
      {hasSteps && (
        <Row>
          <div className={PAD}>
            <Heading title={c.stepsTitle} body={c.stepsBody} />
            <Group label="Actions" rows={item.actions} />
            <Group label="Triggers" rows={item.triggers} />
          </div>
        </Row>
      )}
      <Row>
        <div id="setup" className={`${PAD} scroll-mt-16`}>
          <Heading title={c.setupTitle} body={c.setupBody} />
          <div className="max-w-3xl">
            {c.setup.map(([h, p], i) => (
              <div key={h} className={`flex gap-5 py-6 border-t border-line ${i === 0 ? 'border-t-0 pt-0' : ''}`}>
                <span className="h-7 w-7 rounded-full bg-slate-50 border border-line text-sm text-muted flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <h3 className="text-base font-medium text-ink mb-2">{h}</h3>
                  <p className="text-sm leading-[1.6] text-muted">{p}</p>
                </div>
              </div>
            ))}
            <div className="pt-2"><Link to="/" className="btn-primary font-sans text-base px-6 py-3">{c.setupCta}</Link></div>
          </div>
        </div>
      </Row>
      <ClosingCTA palette="sales" coins={coins} {...c.cta} />
    </>
  )
}
