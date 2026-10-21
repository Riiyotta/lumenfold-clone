import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Chevron, Arrow, Play } from '../ui'
import { VideoModal } from '../company/shared'
import { academy, course, lessons, lessonPath } from '../../content/academy'
import './academy.css'

// T11 dark palette (measured): bg #0d162f, text #f9f9f9, grid-line-dark #3d4559, row line #1e253a,
// link #868a97 → hover #cfd0d5, body / icon #9fa4b4.
const focus = 'outline-none focus-visible:ring-2 focus-visible:ring-indigo-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark'

// DS rail row in the dark surface variant.
export function DarkRow({ children, className = '', innerClassName = '' }) {
  return <Row className={`ac-row bg-surface-dark text-[#f9f9f9] ${className}`} innerClassName={innerClassName}>{children}</Row>
}

/* ---------- Completed state: lessons are marked done when the learner moves on with Next ---------- */
const KEY = 'lf-academy-completed'
const read = () => { try { return new Set(JSON.parse(localStorage.getItem(KEY)) || []) } catch { return new Set() } }
export function useCompleted() {
  const [done, setDone] = useState(read)
  const mark = useCallback(slug => setDone(prev => {
    const next = new Set(prev).add(slug)
    try { localStorage.setItem(KEY, JSON.stringify([...next])) } catch {}
    return next
  }), [])
  return [done, mark]
}

/* ---------- Icons (16px leading icons in the sidebar, 20px in the lesson list) ---------- */
const PlayCircle = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true"><circle cx="8" cy="8" r="7.2" stroke="currentColor" strokeWidth="1.2" /><path d="M6.5 5.4v5.2a.3.3 0 00.45.26l4.2-2.6a.3.3 0 000-.52l-4.2-2.6a.3.3 0 00-.45.26z" fill="currentColor" /></svg>
)
const CheckCircle = ({ className }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true"><circle cx="8" cy="8" r="7.2" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="1.2" /><path d="M5 8.2l2 2 4-4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ChevronLeft = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/* ---------- Prev / Next buttons. Next is filled indigo (hover #7281ff), Prev is outline (hover: transparent, #fff border). ---------- */
export function PrevNext({ index, onNext, className = '' }) {
  const prev = lessons[index - 1], next = lessons[index + 1]
  const prevCls = `btn font-sans gap-1.5 border border-[#3d4559] bg-transparent text-[#f9f9f9] hover:bg-transparent hover:border-white ${focus}`
  const nextCls = `btn-primary font-sans gap-1.5 ${focus}`
  const off = 'opacity-40 cursor-not-allowed pointer-events-none'
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {prev
        ? <Link to={lessonPath(prev)} className={prevCls}><ChevronLeft />{academy.prev}</Link>
        : <span aria-disabled="true" className={`${prevCls} ${off}`}><ChevronLeft />{academy.prev}</span>}
      {next
        ? <Link to={lessonPath(next)} onClick={onNext} className={nextCls}>{academy.next}<Chevron dir="right" className="w-4 h-4" /></Link>
        : <span aria-disabled="true" className={`${nextCls} ${off}`}>{academy.next}<Chevron dir="right" className="w-4 h-4" /></span>}
    </div>
  )
}

/* ---------- Header: breadcrumb + h1 on the left, Prev / Next on the right ---------- */
export function LessonHeader({ lesson, index, onNext }) {
  return (
    <DarkRow>
      <header className="px-6 md:px-12 py-12 md:py-16 min-[992px]:py-20 flex flex-wrap items-end justify-between gap-x-8 gap-y-8">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[20px] leading-7 font-semibold text-[#f9f9f9] max-[479px]:text-sm max-[479px]:leading-5">
            <Link to={academy.base} className={`rounded-sm ${focus}`}>{academy.parent}</Link>
            <Chevron dir="right" className="w-4 h-4 shrink-0" />
            <span aria-current="page">{lesson.crumb}</span>
          </nav>
          <h1 className="mt-4 text-[36px] leading-[1.1] md:text-[48px] md:leading-[52.8px] tracking-[-0.15rem] text-[#f9f9f9]">{lesson.title}</h1>
        </div>
        <PrevNext index={index} onNext={onNext} />
      </header>
    </DarkRow>
  )
}

/* ---------- Sticky sidebar (hidden at 991 and below) ---------- */
export function LessonSidebar({ current, done }) {
  return (
    <aside className="hidden min-[992px]:block">
      <nav aria-label={academy.sidebarHeading} className="sticky top-24 border border-[#3d4559] rounded-2xl py-4">
        <h6 className="px-6 pb-2 font-display text-[20px] leading-7 font-semibold text-[#f9f9f9]">{academy.sidebarHeading}</h6>
        <ul>
          {lessons.map(l => {
            const on = l.slug === current, complete = done.has(l.slug)
            const Icon = complete ? CheckCircle : PlayCircle
            return (
              <li key={l.slug}>
                <Link to={lessonPath(l)} aria-current={on ? 'page' : undefined}
                  className={`flex justify-between items-center gap-4 px-6 py-3 text-base leading-6 transition-colors duration-200 ${focus} focus-visible:ring-inset focus-visible:ring-offset-0 ${on ? 'bg-[#1e253a] text-[#f9f9f9]' : 'text-[#868a97] hover:text-[#cfd0d5]'}`}>
                  <span className="flex items-center gap-[10px] min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${complete ? 'text-indigo-light' : 'text-[#9fa4b4]'}`} />
                    <span className="truncate">{l.title}</span>
                    {complete && <span className="sr-only">({academy.completed})</span>}
                  </span>
                  <span className="shrink-0 text-sm">{l.duration}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

/* ---------- 16:9 lesson video: poster + play button opening the shared VideoModal placeholder ---------- */
export function LessonVideo({ lesson }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label={`${academy.play}: ${lesson.title}`}
        className={`group relative block w-full pt-[56.25%] mb-12 overflow-hidden bg-[#1e253a] ${focus}`}>
        <motion.img src={lesson.poster} alt="" aria-hidden="true" className="ac-swatch absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
        <img src={lesson.poster} alt="" onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-16 h-16 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-white/25"><Play /></span>
        </span>
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} poster={lesson.poster} label={`${lesson.title} video`} />
    </>
  )
}

/* ---------- Lessons list: intro block, then rows ---------- */
const totalMinutes = lessons.reduce((n, l) => n + parseInt(l.duration, 10), 0)

export function LessonList({ current, done }) {
  return (
    <section aria-labelledby="ac-lessons">
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 pt-8 pb-16 border-b border-[#3d4559]">
        <div>
          <p className="text-sm leading-5 text-[#868a97]">{course.listHeading}</p>
          <h2 id="ac-lessons" className="mt-2 text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-[#f9f9f9]">{course.title}</h2>
        </div>
        <div>
          <p className="text-base leading-6 text-[#9fa4b4]">{course.body}</p>
          <p className="mt-4 text-sm leading-5 text-[#868a97]">{lessons.length} lessons · {totalMinutes} min · {done.size} {academy.completed.toLowerCase()}</p>
        </div>
      </div>
      <ul>
        {lessons.map(l => {
          const on = l.slug === current, complete = done.has(l.slug)
          const Icon = complete ? CheckCircle : PlayCircle
          return (
            <li key={l.slug} className="flex border-b border-[#1e253a] px-4 transition-colors duration-200 hover:border-[#868a97]">
              <Link to={lessonPath(l)} aria-current={on ? 'page' : undefined}
                className={`group flex-1 min-w-0 flex justify-between items-center gap-4 py-8 max-[767px]:py-5 max-[479px]:py-4 ${focus}`}>
                <span className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-5 h-5 shrink-0 ${complete || on ? 'text-indigo-light' : 'text-[#9fa4b4]'}`} />
                  <h6 className="min-w-0 max-w-[29rem] truncate font-display text-[20px] leading-7 font-semibold text-[#f9f9f9]">{l.title}</h6>
                  {complete && <span className="sr-only">({academy.completed})</span>}
                  <span className="shrink-0 px-2 py-0.5 rounded-full border border-[#3d4559] text-xs leading-4 text-[#9fa4b4]">{l.duration}</span>
                </span>
                <Arrow className="w-4 h-4 shrink-0 text-[#868a97] transition-colors duration-200 group-hover:text-[#cfd0d5]" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
