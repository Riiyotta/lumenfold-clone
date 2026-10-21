import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { EASE, Row } from '../../components/ui'
import { articles, articleShared as copy, footerCta } from '../../content/catalog'
import { WCta, ArticleBody, Toc, parseArticle } from '../../components/catalog/legacy'

/* Five abstract decorative shapes (Lumenfold placeholders) at the spec's banner positions. */
function Decor() {
  const Ring = ({ c = '#6056ff' }) => <svg viewBox="0 0 120 120" className="w-full h-auto" fill="none"><circle cx="60" cy="60" r="44" stroke={c} strokeOpacity=".25" strokeWidth="10" /><circle cx="60" cy="60" r="18" fill={c} fillOpacity=".12" /></svg>
  const Hex = () => <svg viewBox="0 0 24 24" className="w-full h-auto"><path d="M12 1.5l9.5 6v9L12 22.5l-9.5-6v-9z" fill="#7281ff" fillOpacity=".18" stroke="#6056ff" strokeOpacity=".3" strokeWidth=".6" /></svg>
  const Blob = () => <svg viewBox="0 0 200 140" className="w-full h-auto"><path d="M30 70c0-34 40-56 80-50s70 26 64 58-40 50-82 44S30 104 30 70z" fill="#c7cfff" fillOpacity=".45" /></svg>
  const Spark = () => <svg viewBox="0 0 40 40" className="w-full h-auto"><path d="M20 2l4 14 14 4-14 4-4 14-4-14L2 20l14-4z" fill="#6056ff" fillOpacity=".25" /></svg>
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute bottom-[6%] -right-[9%] w-[240px] hidden min-[480px]:block"><Blob /></div>
      <div className="absolute top-[5%] -right-[5%] w-[120px]"><Ring /></div>
      <div className="absolute -bottom-[4%] -left-[3%] w-[140px]"><Ring c="#f472b6" /></div>
      <div className="absolute -bottom-[133px] right-[10%] w-[340px] z-[1] hidden lg:block"><Hex /></div>
      <div className="absolute top-[19%] left-[2%] w-[48px] z-[1]"><Spark /></div>
    </div>
  )
}

export default function Article({ kind }) {
  const { slug } = useParams()
  const a = articles.find(x => x.kind === kind && x.slug === slug)
  const blocks = useMemo(() => (a ? parseArticle(a.body) : []), [a])
  const headings = blocks.filter(b => b.t === 'h2')
  useEffect(() => { if (a) document.title = `${a.name} | Lumenfold` }, [a])
  if (!a) return <Navigate to="/agents" replace />
  return (
    <div key={a.slug}>
      <Row>
        <section className="relative overflow-hidden py-20 md:py-40 px-5" style={{ background: 'linear-gradient(#fff0, #f8f6ff)' }}>
          <Decor />
          <motion.div className="relative z-[2] max-w-[1268px] mx-auto flex flex-col items-center text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
            <div role="heading" aria-level={1} className="font-display text-[40px] md:text-[52px] lg:text-[64px] leading-[1.2] tracking-[-0.05em] text-ink max-w-4xl">{a.heading}</div>
            <div className="mt-[2.2rem] flex flex-col items-center gap-4 w-full min-[480px]:w-auto">
              <Link to="/" className="btn-primary font-sans text-base px-6 py-3 w-full min-[480px]:w-auto">{copy.cta}</Link>
              <p className="text-sm leading-[1.4] text-muted flex items-center">{copy.label[0]}<svg viewBox="0 0 10 10" className="w-2.5 h-2.5 mx-2"><path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="#6056ff" /></svg>{copy.label[1]}</p>
            </div>
          </motion.div>
        </section>
      </Row>
      <Row>
        <div style={{ background: 'radial-gradient(circle closest-corner at 50% 0, #fbf8ff, #fff)' }}>
          <div className="relative max-w-[1080px] mx-auto px-5 min-[480px]:px-6 md:px-10 md:pl-[240px] lg:pl-[322px] py-10 md:py-16">
            <aside className="mb-8 md:mb-0 md:absolute md:top-0 md:bottom-0 md:left-10 md:w-[200px] lg:w-[230px] md:pt-[84px]">
              <Toc title={copy.tocTitle} headings={headings} />
            </aside>
            <article className="max-w-[880px] py-5">
              <ArticleBody blocks={blocks} />
            </article>
          </div>
        </div>
      </Row>
      <WCta copy={footerCta} />
    </div>
  )
}
