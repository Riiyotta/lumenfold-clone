import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { demo, stories } from '../../content/company'
import { Row, Wordmark, Avatar, Play } from '../../components/ui'
import { NativeForm, VideoModal, LogoGrid } from '../../components/company/shared'

/* §6 right column: testimonial carousel, 6 slides, 6000ms autoplay that stops on interaction */
function Carousel() {
  const slides = demo.slides.map(i => stories[i])
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const [video, setVideo] = useState(false)
  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setI(k => (k + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [auto])
  const s = slides[i]
  return (
    <div className="hidden lg:flex p-12 bg-gradient-to-br from-surface-secondary-light to-transparent">
      <div className="flex flex-col h-full w-full">
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <button onClick={() => { setAuto(false); setVideo(true) }} aria-label={`Play ${s.company} video`} className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 group">
                <img src={s.photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full border-2 border-white bg-black/30 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-indigo-brand group-hover:border-indigo-brand"><Play /></span>
                </span>
                <span className="absolute bottom-3 left-3 h-5 max-w-[100px] flex items-center drop-shadow-lg"><Wordmark name={s.company} size="sm" className="!text-white !text-[15px]" /></span>
              </button>
              <blockquote className="relative my-6">
                <span aria-hidden="true" className="absolute -top-3 -left-1 text-5xl text-gray-300 font-serif leading-none">“</span>
                <p className="font-display text-lg lg:text-xl leading-relaxed pl-6 text-ink">{s.quote}</p>
              </blockquote>
              <div className="flex items-center gap-3 pl-4">
                <span className="rounded-full border-2 border-line"><Avatar seed={s.person.seed} size={36} /></span>
                <div>
                  <div className="text-sm font-medium text-ink">{s.person.name}</div>
                  <div className="text-xs text-muted">{s.person.role} · {s.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 justify-center mt-6">
          {slides.map((x, k) => (
            <button key={x.slug} aria-label={`Show testimonial ${k + 1} of ${slides.length}`} aria-current={k === i}
              onClick={() => { setAuto(false); setI(k) }}
              className={`h-2 rounded-full transition-all duration-150 ${k === i ? 'bg-indigo-brand w-6' : 'w-2 bg-line hover:bg-muted'}`} />
          ))}
        </div>
      </div>
      <VideoModal open={video} onClose={() => setVideo(false)} poster={s.photo} />
    </div>
  )
}

function DemoHero() {
  return (
    <Row>
      <div className="border-b border-line grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center lg:border-r border-line">
          <h1 className="text-4xl md:text-5xl md:leading-tight font-medium mb-4 text-ink">{demo.title[0]}<br />{demo.title[1]}</h1>
          <p className="text-lg mb-8 max-w-md text-muted">{demo.body}</p>
          <div className="max-w-md relative">
            <NativeForm fields={demo.fields} submit={demo.submit} success={demo.success} />
          </div>
        </div>
        <Carousel />
      </div>
    </Row>
  )
}

export default function BookDemo() {
  return (
    <>
      <DemoHero />
      <LogoGrid />
    </>
  )
}
