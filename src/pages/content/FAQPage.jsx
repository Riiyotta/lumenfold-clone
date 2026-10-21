import { Link } from 'react-router-dom'
import { PageSection } from '../../components/content/parts'
import FAQSection from '../../components/content/FAQSection'
import ClosingCTA from '../../components/content/ClosingCTA'
import { faqPage, faqs } from '../../content/editorial'
import '../../components/content/content.css'

// T10 rebuilt in the DS: CS hero-type h1 (one word indigo), FAQSection multi-open at .3s, ClosingCTA.
export default function FAQPage() {
  return (
    <>
      <PageSection>
        <h1 className="text-center text-[48px] leading-[52.8px] tracking-[-0.15rem] text-ink">
          {faqPage.title[0]} <span className="text-indigo-brand">{faqPage.title[1]}</span>
        </h1>
      </PageSection>
      <FAQSection title={faqPage.sectionTitle} items={faqs} multi duration={0.3}
        body={<>{faqPage.sectionBody} <Link to={faqPage.sectionTo} className="text-indigo-brand hover:underline">{faqPage.sectionLink}</Link>.</>} />
      <ClosingCTA {...faqPage.cta} secondaryTo="/events" />
    </>
  )
}
