import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EASE, Row, Reveal, Wordmark, Play } from '../../components/ui'
import { logos } from '../../content'
import { workflows, workflowShared as copy } from '../../content/catalog'
import { Glyph, PAD } from '../../components/catalog/primitives'

const h2 = 'text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink'

function Hero({ w }) {
  return (
    <Row>
      <div className="px-6 md:px-12 lg:px-20 pt-10 min-[480px]:pt-[60px] lg:pt-20 pb-5">
        <div className="grid grid-cols-1 xl:grid-cols-[490px_minmax(0,1fr)] desktop:grid-cols-1 gap-10 items-center">
          <motion.div className="text-center min-[480px]:text-left" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
            <div className="h-10 flex items-center justify-center min-[480px]:justify-start text-base font-medium text-ink">{w.tag}</div>
            <h1 className="mb-8 text-[40px] leading-[1.12] md:text-[48px] md:leading-[52.8px] tracking-[-2.4px] text-ink">{w.h1}</h1>
            <p className="mb-8 text-base min-[480px]:text-lg leading-[1.6] text-ink/80">{w.body}</p>
            <div className="mt-5 flex flex-wrap justify-center min-[480px]:justify-start gap-4">
              <Link to="/" className="btn-primary font-sans !rounded-full text-base px-6 py-3 gap-2">{copy.primary}<Glyph name="send" className="w-4 h-4" color="#fff" /></Link>
              <Link to="/" className="btn-secondary font-sans !rounded-full text-base px-6 py-3">{copy.secondary}</Link>
            </div>
          </motion.div>
          <motion.button className="group relative block w-full aspect-[1/0.779] overflow-hidden" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }} aria-label="Play workflow walkthrough">
            <img src="/assets/photos/cat-wf-poster.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-br from-indigo-brand/30 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-white/25"><Play /></span>
            </span>
          </motion.button>
        </div>
      </div>
    </Row>
  )
}

function LogoRow() {
  return (
    <Row>
      <div className="px-6 md:px-12 lg:px-20 py-10 lg:py-16">
        <p className="text-center text-base text-muted mb-10">{copy.logosLabel}</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8 md:gap-y-[52px] justify-items-center">
          {logos.map(l => <span key={l.name} className="grayscale opacity-80"><Wordmark name={l.name} size="sm" /></span>)}
        </div>
      </div>
    </Row>
  )
}

function Values() {
  const v = copy.values
  return (
    <Row>
      <div className={PAD}>
        <Reveal className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 md:gap-12 items-end">
          <h2 className={h2}>{v.title}</h2>
          <p className="text-base leading-[25.6px] text-muted">{v.body}</p>
        </Reveal>
        <motion.h2 className={`${h2} text-center mt-16 md:mt-20 mb-10 md:mb-12`} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>{v.centre}</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {v.cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.06} amount={0.3} className="flex flex-col border border-line bg-white">
              <div className="aspect-[4/3] overflow-hidden"><img src={`/assets/photos/cat-wf-card-${i + 1}.webp`} alt="" loading="lazy" className="w-full h-full object-cover" /></div>
              <h3 className="font-sans p-6 text-base leading-[1.5] font-medium text-ink">{c}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </Row>
  )
}

function Compare() {
  const c = copy.compare
  const Col = ({ data, good }) => (
    <div className={`p-6 md:p-8 border border-line ${good ? 'bg-[#fafafe]' : 'bg-white'}`}>
      <div className="flex items-center gap-2.5 mb-6">
        <span className={`w-5 h-5 rounded-full flex items-center justify-center ${good ? 'bg-[#ecfdf3]' : 'bg-[#f3f3f4]'}`}><Glyph name={good ? 'check' : 'warn'} className="w-3 h-3" color={good ? '#0e9384' : '#868a97'} stroke={2} /></span>
        <h4 className="text-lg font-medium text-ink">{data[0]}</h4>
      </div>
      <ul className="flex flex-col gap-5">
        {data[1].map(t => (
          <li key={t} className="flex gap-3">
            <span className="mt-1 shrink-0"><Glyph name={good ? 'check' : 'clock'} className="w-5 h-5" color={good ? '#6056ff' : '#868a97'} /></span>
            <span className="text-base md:text-lg leading-[1.6] text-ink">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <Row>
      <div className={PAD}>
        <Reveal><h3 className={`${h2} mb-10 md:mb-12`}>{c.title}</h3></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 md:[&>*+*]:border-l-0">
          <Col data={c.without} />
          <Col data={c.with} good />
        </div>
      </div>
    </Row>
  )
}

function VerticalTabs() {
  const [tab, setTab] = useState(0)
  const t = copy.tabs
  return (
    <Row>
      <div className={PAD}>
        <Reveal><h2 className={`${h2} mb-10 md:mb-12`}>{t.title}</h2></Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div className="relative aspect-[4/3] overflow-hidden bg-tile-base order-2 lg:order-1">
            <AnimatePresence initial={false}>
              <motion.img key={tab} src={`/assets/photos/cat-wf-tab-${tab + 1}.webp`} alt="" className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
            </AnimatePresence>
          </div>
          <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-3 order-1 lg:order-2">
            {t.items.map(([title, body], i) => {
              const on = i === tab
              return (
                <div key={title} className={`border transition-colors duration-150 ${on ? 'border-indigo-brand/30 bg-[#6056ff0a]' : 'border-line bg-white hover:bg-[#f9f9fa]'}`}>
                  <button role="tab" aria-selected={on} onClick={() => setTab(i)} className="w-full flex items-center gap-3 px-5 py-4 text-left font-sans">
                    <span className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 ${on ? 'bg-indigo-brand text-white' : 'bg-slate-50 border border-line text-muted'}`}>{i + 1}</span>
                    <span className="text-base font-medium text-ink">{title}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                        <motion.p className="px-5 pb-5 pl-14 text-sm leading-[1.6] text-muted" initial={{ y: 20, scale: 0.96 }} animate={{ y: 0, scale: 1 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} style={{ transformOrigin: 'top left' }}>{body}</motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Row>
  )
}

function EmailCta() {
  const f = copy.form
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const submit = e => { e.preventDefault(); setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'success' : 'fail') }
  return (
    <Row innerClassName="border-b border-line">
      <div className={`${PAD} flex flex-col items-center text-center`}>
        <Reveal><h3 className={h2}>{f.title}</h3></Reveal>
        {state === 'success' ? (
          <motion.p role="status" className="mt-8 px-5 py-4 bg-[#ecfdf3] text-[#027a48] text-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>{f.success}</motion.p>
        ) : (
          <form onSubmit={submit} noValidate className="mt-8 w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); if (state === 'fail') setState('idle') }} placeholder={f.placeholder} aria-label={f.placeholder} aria-invalid={state === 'fail'}
              className="flex-1 h-[42px] px-4 py-2.5 text-sm text-ink bg-white border border-line rounded-button outline-none transition-all duration-150 placeholder:text-muted focus:border-indigo-brand focus:ring-2 focus:ring-indigo-brand/20" />
            <button type="submit" className="btn-primary gap-2">{f.button}<Glyph name="send" className="w-4 h-4" color="#fff" /></button>
          </form>
        )}
        {state === 'fail' && <p role="alert" className="mt-3 text-sm text-[#b42318]">{f.fail}</p>}
      </div>
    </Row>
  )
}

export default function WorkflowDetail() {
  const { slug } = useParams()
  const w = workflows.find(x => x.slug === slug)
  useEffect(() => { if (w) document.title = `${w.name} | Lumenfold workflows` }, [w])
  if (!w) return <Navigate to="/workflows" replace />
  return (
    <div key={w.slug}>
      <Hero w={w} />
      <LogoRow />
      <Values />
      <Compare />
      <VerticalTabs />
      <EmailCta />
    </div>
  )
}
