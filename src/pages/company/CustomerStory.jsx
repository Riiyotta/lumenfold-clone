import { Link, useParams } from 'react-router-dom'
import { storyBySlug } from '../../content/company'
import { Row } from '../../components/ui'
import { heroH1, stacked } from '../../components/company/shared'
import { StoryHero, StoryArticle, TasksCTA } from '../../components/company/customers'

export default function CustomerStory() {
  const s = storyBySlug[useParams().slug]
  if (!s) return (
    <Row>
      <div className={`${stacked} text-center`}>
        <h1 className={heroH1}>Story not found</h1>
        <p className="mt-5 text-muted">That customer story does not exist or has moved.</p>
        <Link to="/customers" className="btn-secondary mt-8">Back to customer stories</Link>
      </div>
    </Row>
  )
  return (
    <>
      <StoryHero s={s} />
      <StoryArticle s={s} />
      <TasksCTA key={s.slug} />
    </>
  )
}
