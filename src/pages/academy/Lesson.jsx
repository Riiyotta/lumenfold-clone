import { useParams } from 'react-router-dom'
import Prose from '../../components/content/Prose'
import { NotFound } from '../../components/content/parts'
import { DarkRow, LessonHeader, LessonSidebar, LessonVideo, LessonList, PrevNext, useCompleted } from '../../components/academy/lesson'
import { academy, lessons, lessonIndex } from '../../content/academy'
import '../../components/content/content.css'

/* ---------- T11 Academy Lesson: /relevance-academy/:slug (dark page body inside the normal site chrome) ---------- */
export default function Lesson() {
  const { slug } = useParams()
  const [done, markDone] = useCompleted()
  const index = lessonIndex(slug)
  if (index < 0) return <NotFound back={academy.base} label="Back to the academy" />
  const lesson = lessons[index]
  const onNext = () => markDone(lesson.slug)
  return (
    <div className="bg-surface-dark text-[#f9f9f9]">
      <LessonHeader lesson={lesson} index={index} onNext={onNext} />
      <DarkRow>
        <div className="px-6 md:px-12 py-8 md:py-12">
          <div className="grid min-[992px]:grid-cols-[21rem_1fr] gap-x-16 gap-y-8 min-[992px]:pb-80">
            <LessonSidebar current={lesson.slug} done={done} />
            <div className="w-full min-w-0">
              <LessonVideo key={lesson.slug} lesson={lesson} />
              <Prose body={lesson.body} className="ac-prose" />
              <PrevNext index={index} onNext={onNext} className="hidden min-[992px]:flex mt-12" />
              <LessonList current={lesson.slug} done={done} />
            </div>
          </div>
        </div>
      </DarkRow>
    </div>
  )
}
