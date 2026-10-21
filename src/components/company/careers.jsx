import { motion } from 'framer-motion'
import { careers } from '../../content/company'
import { EASE, Row, Chevron } from '../ui'
import { PageHeading, Rich, MountIn, heroH1, pad, stacked, lg } from './shared'

/* ---------- §3.1 CareersHero ---------- */
export function CareersHero() {
  return (
    <Row className="overflow-hidden">
      <div className={`relative pt-10 md:pt-16 pb-16 md:pb-20 ${pad}`}>
        <MountIn className="flex flex-col items-center text-center">
          <h1 className={`${heroH1} max-w-3xl`}>{careers.title} <span className="text-indigo-brand">{careers.highlight}</span></h1>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-[1.6] text-muted">{careers.body}</p>
          <div className="mt-8 flex gap-4"><a href="#jobs" className={`btn-primary ${lg}`}>{careers.cta}</a></div>
        </MountIn>
        <MountIn delay={0.1} y={18} className="mt-12">
          <img src="/assets/photos/co-team-wide.webp" alt="The Lumenfold team around a shared table" loading="eager" className="w-full border border-line aspect-[2.4/1] object-cover" />
        </MountIn>
      </div>
    </Row>
  )
}

/* ---------- §3.2 CareersAbout: per-word scroll reveal ---------- */
export function CareersAbout() {
  // Split the copy into words while keeping '#accent' phrases indigo.
  const words = careers.about.flatMap(part => {
    const accent = part.startsWith('#')
    return (accent ? part.slice(1) : part).split(/(\s+)/).filter(Boolean).map(w => ({ w, accent }))
  })
  let i = 0
  return (
    <Row>
      <div className={stacked}>
        <h2 className="max-w-4xl text-2xl md:text-[2rem] tracking-tight leading-[1.5] font-normal text-ink">
          {words.map((t, k) => /^\s+$/.test(t.w) ? t.w : (
            <motion.span key={k} className={t.accent ? 'text-indigo-brand' : ''} initial={{ opacity: 0.18 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.9 }} transition={{ ...EASE, duration: 0.35, delay: i++ * 0.018 }}>{t.w}</motion.span>
          ))}
        </h2>
      </div>
    </Row>
  )
}

/* ---------- §3.3 CareersValues: hairline-gap grid ---------- */
const valueIcons = [
  'M24 6c9.9 0 18 8.1 18 18s-8.1 18-18 18S6 33.9 6 24 14.1 6 24 6zm-8 21c2 3 5 4.5 8 4.5s6-1.5 8-4.5',
  'M8 14h32v20H22l-8 7v-7H8z',
  'M12 8h18l8 8v26H12zM30 8v8h8M18 24h14M18 31h10',
  'M16 20a5 5 0 110-10 5 5 0 010 10zm16 0a5 5 0 110-10 5 5 0 010 10zM6 38c0-6 4.5-10 10-10s10 4 10 10M22 38c0-6 4.5-10 10-10s10 4 10 10',
  'M24 41s-15-8.5-15-20a8.5 8.5 0 0115-5.5A8.5 8.5 0 0139 21c0 11.5-15 20-15 20z',
  'M10 38l18-18M26 12l10 10M30 8l10 10-4 4-10-10zM8 40l4-1-3-3z',
]

export function CareersValues() {
  return (
    <Row>
      <div className={stacked}>
        <PageHeading title={careers.valuesTitle} />
        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
          {careers.values.map((v, i) => (
            <motion.div key={v.title} className="bg-surface-light p-6 md:p-8" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ ...EASE, delay: (i % 2) * 0.08 }}>
              <svg viewBox="0 0 48 49" className="block h-8 w-8 text-indigo-brand" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d={valueIcons[i]} /></svg>
              <h3 className="mt-5 text-lg leading-[1.3] font-normal text-ink">{v.title}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Row>
  )
}

/* ---------- §3.4 CareersRoles: native list (Ashby embed is not inspectable) ---------- */
export function CareersRoles() {
  return (
    <Row as="section">
      <div id="jobs" className={`${stacked} scroll-mt-16`}>
        <PageHeading title={careers.rolesTitle} body={careers.rolesBody} />
        <ul className="min-h-[400px] border border-line divide-y divide-line">
          {careers.roles.map(r => (
            <li key={r.title}>
              <a href="#jobs" onClick={e => e.preventDefault()} className="group flex items-center gap-4 px-5 md:px-6 py-5 hover:bg-gray-50/50 transition-colors duration-150">
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium text-ink">{r.title}</div>
                  <div className="mt-1 text-sm text-muted">{r.team} · {r.place}</div>
                </div>
                <Chevron dir="right" className="w-4 h-4 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 border border-line bg-white p-6 md:p-7">
          <h3 className="font-display text-[15px] font-semibold text-ink">{careers.noticeTitle}</h3>
          <p className="mt-2.5 text-[15px] leading-[1.6] text-muted"><Rich parts={careers.notice} linkClass="text-indigo-brand underline underline-offset-2" /></p>
        </div>
      </div>
    </Row>
  )
}
