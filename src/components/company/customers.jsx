import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { stories, storyBody, customersHero, tasksCta } from '../../content/company'
import { Row, Wordmark, Arrow } from '../ui'
import { MediaTile, PillTag } from './shared'

/* ---------- /customers §4.2: CustomerShowcase (home Testimonials, caseStudy variant) ---------- */
const ReadStory = ({ slug, small }) => (
  <Link to={`/customers/${slug}`} className={`btn-secondary self-start gap-2 ${small ? 'text-sm' : ''}`}>
    {customersHero.readStory}<Arrow className={small ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
  </Link>
)

export function CustomerShowcase({ items = stories.slice(0, 3) }) {
  const [tab, setTab] = useState(0)
  const s = items[tab]
  return (
    <Row innerClassName="border-b border-line">
      {/* lg and up */}
      <div className="hidden lg:grid grid-cols-7">
        <div className="col-span-3 p-16 lg:pl-20 border-r border-line min-h-[490px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <h3 className="font-sans text-2xl leading-snug font-medium text-ink mb-8">{s.title}</h3>
              <div className="flex flex-col divide-y divide-line border-y border-line mb-10">
                {s.stats.map(([v, l]) => (
                  <div key={l} className="flex items-baseline gap-4 py-3">
                    <span className="w-20 shrink-0 font-display text-2xl leading-[1.1] font-semibold text-ink">{v}</span>
                    <span className="text-sm text-muted">{l}</span>
                  </div>
                ))}
              </div>
              <ReadStory slug={s.slug} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="col-span-4 flex flex-col">
          <div role="tablist" className="grid grid-cols-3 border-b border-line">
            {items.map((x, i) => (
              <button key={x.slug} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}
                className="relative py-6 flex items-center justify-center border-r last:border-r-0 border-line hover:bg-black/5 transition-all duration-150">
                <span className={`h-8 max-w-[140px] flex items-center grayscale transition-opacity duration-150 ${tab === i ? 'opacity-100' : 'opacity-50'}`}><Wordmark name={x.company} size="lg" /></span>
                {tab === i && <motion.span layoutId="cs-ind" className="absolute -bottom-px inset-x-0 h-1 bg-indigo-brand" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <MediaTile src={s.photo} className="h-[420px]" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* below lg */}
      <div className="lg:hidden divide-y divide-line">
        {items.map(x => (
          <div key={x.slug} className="p-6 md:p-8">
            <div className="h-6 max-w-[120px] mb-4 flex items-center"><Wordmark name={x.company} /></div>
            <div className="h-[200px] sm:h-[280px] mb-5"><MediaTile src={x.photo} className="h-full" /></div>
            <h3 className="font-sans text-lg leading-snug font-medium text-ink mb-4">{x.title}</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-4 mb-5">
              {x.stats.map(([v, l]) => <div key={l}><div className="font-display text-xl font-semibold text-ink">{v}</div><div className="text-xs text-muted">{l}</div></div>)}
            </div>
            <ReadStory slug={x.slug} small />
          </div>
        ))}
      </div>
    </Row>
  )
}

/* ---------- /customers §4.3: story card grid ---------- */
export function StoryGrid({ items = stories }) {
  return (
    <Row innerClassName="!border-t-0">
      <div className="stories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map(s => (
          <Link key={s.slug} to={`/customers/${s.slug}`} className="group block p-6 md:p-8 hover:bg-gray-50/50 transition-colors">
            <div className="mb-6 h-8 flex items-center"><span className="h-6 max-w-[140px] flex items-center"><Wordmark name={s.company} /></span></div>
            <h3 className="font-sans text-xl leading-snug font-medium text-ink mb-4 transition-colors group-hover:text-indigo-brand">{s.card}</h3>
            <div className="flex flex-wrap gap-2 mb-6"><PillTag>{s.industry}</PillTag><PillTag>{s.team}</PillTag></div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted transition-colors group-hover:text-indigo-brand">{customersHero.cardCta}</span>
              <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center transition-all group-hover:border-indigo-brand group-hover:bg-indigo-brand/5">
                <Arrow className="w-4 h-4 text-ink transition-all group-hover:text-indigo-brand group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Row>
  )
}

/* ---------- /customers/:slug §5.1: photo banner ---------- */
export function StoryHero({ s }) {
  return (
    <Row>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={s.photo} alt="" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-indigo-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-indigo-950/0" />
        </div>
        <div className="relative z-10 py-12 sm:py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 mb-6 text-sm">
              <Link to="/customers" className="text-white/90 hover:text-white transition-colors duration-150">{tasksCta.crumb}</Link>
              <span className="text-white/60">/</span>
              <span className="text-white/80">{s.short}</span>
            </nav>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,.4)' }}>{s.headline}</h1>
            <div className="flex gap-3 text-white text-sm"><span>{s.author}</span><span className="opacity-60">·</span><span>{s.date}</span></div>
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- §5.2 meta bar + article, §5.3 share row ---------- */
const shareIcons = [
  ['Copy link', 'M8.5 11.5a3.5 3.5 0 005 0l2.5-2.5a3.5 3.5 0 00-5-5l-1 1M11.5 9.5a3.5 3.5 0 00-5 0L4 12a3.5 3.5 0 005 5l1-1'],
  ['Share on X', 'M4 4h3.5l3 4.3L14 4h2l-4.6 5.6L17 16.5h-3.5l-3.3-4.7-3.9 4.7h-2l5-6z'],
  ['Share on LinkedIn', 'M5 3h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm1.5 5v6h2V8zm1-3a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2zM10 8v6h2v-3.2c0-1 .6-1.3 1.1-1.3.6 0 .9.4.9 1.3V14h2v-3.6c0-1.8-1-2.6-2.3-2.6-.8 0-1.4.4-1.7.8V8z'],
]

export function StoryArticle({ s }) {
  const body = storyBody(s)
  return (
    <Row>
      <div className="py-12 pb-10 lg:py-20 lg:pb-10 px-6 md:px-12">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-line">
            <span className="h-6 flex items-center"><Wordmark name={s.company} /></span>
            <div className="flex flex-wrap gap-3">
              <PillTag size="lg">{s.industry}</PillTag>
              <PillTag size="lg">{s.team}</PillTag>
              <PillTag size="lg" href={`https://${s.site}`}>{s.site}</PillTag>
            </div>
          </div>
          <article className="story-content">
            {s.lede.map(p => <p key={p}>{p}</p>)}
            <div className="story-video"><div className="absolute inset-0"><MediaTile src={s.photo} className="h-full" /></div></div>
            {body.map(sec => (
              <section key={sec.id}>
                <h2 id={sec.id}>{sec.title}</h2>
                {sec.paras.map((p, i) => typeof p === 'string' ? <p key={i}>{p}</p>
                  : p.list ? <ul key={i}>{p.list.map(li => <li key={li}>{li}</li>)}</ul>
                  : <blockquote key={i}><p>“{p.quote}”</p><p className="!mt-2 !text-sm not-italic">{s.person.name}, {s.person.role}</p></blockquote>)}
              </section>
            ))}
          </article>
          <div className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-6">
            <span className="text-sm text-muted">{tasksCta.share}</span>
            <div className="flex gap-3">
              {shareIcons.map(([label, d], i) => (
                <button key={label} aria-label={label} onClick={() => i === 0 && navigator.clipboard?.writeText(location.href)}
                  className="p-2 rounded-lg border border-line text-muted hover:text-indigo-brand hover:border-indigo-brand transition-colors">
                  <svg viewBox="0 0 20 21" className="w-5 h-[21px]" fill={i ? 'currentColor' : 'none'} stroke={i ? 'none' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round"><path d={d} /></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

/* ---------- §5.4 TasksCTA: headline → task grid → checking → final ---------- */
const T_TASKS = 2000, T_CHECK = 3500, STEP = 40
const h2cls = 'text-3xl md:text-4xl lg:text-5xl lg:leading-normal max-w-3xl text-center px-10 font-normal text-ink'

export function TasksCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const n = tasksCta.tasks.length
  const [phase, setPhase] = useState('initial')
  const [checked, setChecked] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setChecked(n); setPhase('final'); return }
    const ts = [setTimeout(() => setPhase('tasks'), T_TASKS), setTimeout(() => setPhase('checking'), T_CHECK)]
    for (let i = 1; i <= n; i++) ts.push(setTimeout(() => setChecked(i), T_CHECK + i * STEP))
    ts.push(setTimeout(() => setPhase('final'), T_CHECK + n * STEP + 500))
    return () => ts.forEach(clearTimeout)
  }, [inView, reduce])

  const gridOn = phase !== 'initial'
  return (
    <Row>
      <div ref={ref} className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 p-8 flex items-center justify-center" aria-hidden="true"
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={phase === 'final' ? { opacity: 0.3, filter: 'blur(12px)' } : gridOn ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.8 }}>
          {gridOn && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 max-w-4xl">
              {tasksCta.tasks.map((t, i) => {
                const on = i < checked
                return (
                  <motion.div key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                    className={`${i >= 16 ? 'hidden lg:flex' : i >= 8 ? 'hidden sm:flex' : 'flex'} items-center gap-2 text-sm text-muted whitespace-nowrap`}>
                    <motion.span animate={on ? { scale: [1, 1.2, 1] } : { scale: 1 }} transition={{ duration: 0.2 }}
                      className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors duration-200 ${on ? 'bg-indigo-brand border-indigo-brand' : 'border-muted/40'}`}>
                      {on && <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none"><motion.path d="M2.5 6.2l2.3 2.3L9.5 3.8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }} /></svg>}
                    </motion.span>
                    <span className={on ? 'line-through text-muted/50' : ''}>{t}</span>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
        <AnimatePresence>
          {phase === 'initial' && (
            <motion.h2 key="h" className={`relative ${h2cls}`} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.6 }}>{tasksCta.title}</motion.h2>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase === 'final' && (
            <motion.div key="f" className="relative z-10 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h2 className={`${h2cls} mb-8`}>{tasksCta.final}</h2>
              <Link to={tasksCta.button.to} className="btn-primary !text-lg !px-8 !py-4">{tasksCta.button.label}</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Row>
  )
}
