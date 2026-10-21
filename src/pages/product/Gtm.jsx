// A2 /gtm: GTMHero, StatementBand, PlatformFraming, CaseStudies, LogoGrid, 4x (ValueProp + UseCasePair),
// Playbook canvas, Evals demo, Testimonials, TasksCTA.
import { Fragment } from 'react'
import CaseStudies from '../../components/CaseStudies'
import LogoWall from '../../components/LogoWall'
import Testimonials from '../../components/Testimonials'
import { GTMHero, StatementBand, PlatformFraming, ValuePropHeading, UseCasePair, PlaybookDemo, EvalsDemo, TasksCTA } from '../../components/product/gtm'
import { gtm as d } from '../../content/product'

export default function Gtm() {
  return (
    <>
      <GTMHero eyebrow={d.eyebrow} words={d.words} h1={d.h1} cards={d.cards} />
      <StatementBand text={d.statement} />
      <PlatformFraming {...d.framing} />
      <CaseStudies />
      <LogoWall />
      {d.pairs.map(p => (
        <Fragment key={p.heading}>
          <ValuePropHeading text={p.heading} />
          <UseCasePair cells={p.cells} />
        </Fragment>
      ))}
      <PlaybookDemo {...d.playbook} />
      <EvalsDemo {...d.evals} />
      <Testimonials />
      <TasksCTA first={d.tasks.first} final={d.tasks.final} button={d.tasks.button} tasks={d.tasks.items} />
    </>
  )
}
