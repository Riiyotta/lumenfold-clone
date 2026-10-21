import { Link, useParams } from 'react-router-dom'
import { PageSection, NotFound } from '../../components/content/parts'
import { CompareHero, CompetitorGlyph, FitCards, Differences, ExemplarRun, CompareTable, SwitchSteps } from '../../components/content/comparison'
import FAQSection from '../../components/content/FAQSection'
import ClosingCTA from '../../components/content/ClosingCTA'
import LogoWall from '../../components/LogoWall'
import Enterprise from '../../components/Enterprise'
import Testimonials from '../../components/Testimonials'
import { comparisons, usFit, vsIndex, vsCta, faqIntro } from '../../content/editorial'
import '../../components/content/content.css'

/* ---------- T5 /vs ---------- */
export function ComparisonIndex() {
  return (
    <PageSection>
      <h1 className="text-[36px] md:text-[48px] leading-[1.12] tracking-tighter text-ink">{vsIndex.title}</h1>
      <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.6] text-muted">{vsIndex.body}</p>
      <ul className="mt-10 border-t border-line">
        {comparisons.map(c => (
          <li key={c.slug}>
            <Link to={`/vs/${c.slug}`} className="group flex items-center gap-4 py-4 border-b border-line">
              <span className="w-9 h-9 shrink-0 rounded-lg border border-line bg-white shadow-[0_1px_2px_rgba(13,22,47,.05)] flex items-center justify-center"><CompetitorGlyph seed={c.glyph} size={18} /></span>
              <span className="text-base md:text-lg font-medium tracking-tight text-ink group-hover:text-indigo-brand transition-colors duration-150">{c.rowTitle}</span>
              <span className="ml-auto text-muted group-hover:text-indigo-brand transition-colors duration-150" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  )
}

/* ---------- T6 /vs/:slug ---------- */
export function ComparisonPage() {
  const { slug } = useParams()
  const i = comparisons.findIndex(x => x.slug === slug)
  if (i < 0) return <NotFound back="/vs" label="All comparisons" />
  const c = comparisons[i]
  return (
    <>
      <CompareHero c={c} />
      <LogoWall />
      <FitCards c={c} us={usFit} />
      <Differences c={c} alt={i % 2 === 1} />
      <ExemplarRun key={c.slug} run={c.run} />
      <CompareTable c={c} />
      <SwitchSteps steps={c.steps} />
      <Enterprise />
      <Testimonials />
      <FAQSection key={c.slug} title={faqIntro.title} items={c.faqs}
        body={<>{faqIntro.body} <Link to={faqIntro.to} className="text-indigo-brand hover:underline">{faqIntro.link}</Link></>} />
      <ClosingCTA {...vsCta} primaryTo={`?vs=${c.slug}`} />
    </>
  )
}
