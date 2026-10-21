// A2 /invent: InventHero + steps, InlineVideo, UseCases, Signals, Evals, Embed, StackCollapse, LearnMore, GetStarted.
import UseCases from '../../components/UseCases'
import LearnMore from '../../components/LearnMore'
import { InventHero, InlineVideo, SignalsDemo, EvalsFloor, EmbedDemo, StackCollapse, GetStarted } from '../../components/product/invent'
import { invent as d } from '../../content/product'

export default function Invent() {
  return (
    <>
      <InventHero h1={d.h1} lines={d.lines} ctas={d.ctas} bubbles={d.bubbles} steps={d.steps} />
      <InlineVideo {...d.video} />
      <UseCases />
      <SignalsDemo {...d.signals} />
      <EvalsFloor {...d.evalsFloor} />
      <EmbedDemo {...d.embed} />
      <StackCollapse {...d.stack} />
      <LearnMore />
      <GetStarted {...d.getStarted} />
    </>
  )
}
