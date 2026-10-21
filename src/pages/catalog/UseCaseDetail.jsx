import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import LogoWall from '../../components/LogoWall'
import Enterprise from '../../components/Enterprise'
import Testimonials from '../../components/Testimonials'
import { useCaseList, useCaseShared as copy } from '../../content/catalog'
import { UseCaseHero, HowItWorks, RelatedRail, StackCollapse } from '../../components/catalog/usecase'
import { EvalsPanel, DeployPaths } from '../../components/catalog/sections'

export default function UseCaseDetail() {
  const { slug } = useParams()
  const uc = useCaseList.find(u => u.slug === slug)
  useEffect(() => { if (uc) document.title = `${uc.name} | Lumenfold` }, [uc])
  if (!uc) return <Navigate to="/agents" replace />
  const siblings = useCaseList.filter(u => u.fn === uc.fn && u.slug !== uc.slug)
  // Final CTA coins: the hero's 4 integrations, then 2 of them again rotated differently.
  const coins = [...uc.apps, uc.apps[0], uc.apps[2]].map(a => ({ app: a.seed }))
  const tones = [uc.fn, uc.fn, uc.fn]
  return (
    <div key={uc.slug}>
      <UseCaseHero uc={uc} copy={copy} />
      <LogoWall />
      <HowItWorks uc={uc} copy={copy} />
      <EvalsPanel palette={uc.fn} title={copy.evals.title} body={copy.evals.body} agent={uc.name} rows={uc.evals} thresholds={copy.evals.thresholds} caption={copy.evals.caption} />
      <DeployPaths copy={copy.deploy} tones={tones} />
      <Enterprise />
      <Testimonials />
      <RelatedRail title={copy.related(uc.fnLabel)} items={siblings} fn={uc.fn} />
      <StackCollapse fn={uc.fn} copy={copy.stack} coins={coins} cta={copy.finalCta} />
    </div>
  )
}
