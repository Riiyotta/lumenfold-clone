import { Link } from 'react-router-dom'
import { customersHero as h } from '../../content/company'
import { Row } from '../../components/ui'
import { heroH1, pad, lg } from '../../components/company/shared'
import { CustomerShowcase, StoryGrid } from '../../components/company/customers'

// §4.1: static hero, no entrance animation.
function CustomersHero() {
  return (
    <Row>
      <div className={`pt-10 md:pt-16 pb-16 md:pb-20 ${pad} flex flex-col items-center text-center border-b border-line`}>
        <h1 className={`${heroH1} max-w-4xl`}>{h.title}</h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.6] text-muted">{h.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to={h.primary.to} className={`btn-primary ${lg}`}>{h.primary.label}</Link>
          <Link to={h.secondary.to} className={`btn-secondary ${lg}`}>{h.secondary.label}</Link>
        </div>
      </div>
    </Row>
  )
}

export default function Customers() {
  return (
    <>
      <CustomersHero />
      <CustomerShowcase />
      <StoryGrid />
    </>
  )
}
