import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../content'
import { Row, Wordmark, Play, Chevron } from './ui'

function Media({ i, className }) {
  return (
    <button className={`group relative block w-full overflow-hidden ${className}`}>
      <img src={`/assets/photos/story-${i + 1}.webp`} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-br from-indigo-brand/40 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full border-2 border-white bg-white/10 flex items-center justify-center text-white transition-all duration-150 group-hover:bg-white/25 group-hover:border-white"><Play /></span>
      </span>
    </button>
  )
}

const ReadMore = ({ small }) => <Link to="/customers" className="btn-secondary font-sans gap-2 self-start">Read more <Chevron dir="right" className={small ? 'w-3.5 h-3.5' : 'w-4 h-4'} /></Link>

export default function Testimonials() {
  const [tab, setTab] = useState(0)
  const t = testimonials[tab]
  return (
    <Row innerClassName="border-b border-line">
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-7">
        <div className="col-span-3 p-16 lg:pl-20 flex flex-col justify-center border-r border-line min-h-[490px]">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="flex flex-col">
              <blockquote className="text-2xl leading-[39px] text-ink pr-6">“{t.quote}”</blockquote>
              <div className="mt-8 text-base font-medium text-ink">{t.name}</div>
              <div className="text-base text-muted">{t.role}</div>
              <div className="mt-10"><ReadMore /></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="col-span-4 flex flex-col">
          <div className="grid grid-cols-2 border-b border-line">
            {testimonials.map((x, i) => (
              <button key={x.company} onClick={() => setTab(i)} className="relative py-6 flex items-center justify-center border-r last:border-r-0 border-line hover:bg-black/5 transition-all duration-150 h-20">
                <span className={`grayscale transition-opacity duration-150 ${tab === i ? 'opacity-100' : 'opacity-50'}`}><Wordmark name={x.company} size="lg" /></span>
                {tab === i && <motion.span layoutId="tst-ind" className="absolute -bottom-px inset-x-0 h-1 bg-indigo-brand" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
              </button>
            ))}
          </div>
          {/* Original swaps the media instantly (no presence animation). */}
          <div><Media i={tab} className="h-[420px]" /></div>
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden divide-y divide-line">
        {testimonials.map((x, i) => (
          <div key={x.company} className="p-6 md:p-8">
            <div className="h-6 mb-4 flex items-center gap-3"><Wordmark name={x.company} /></div>
            <div className="h-[200px] sm:h-[280px] mb-5 overflow-hidden"><Media i={i} className="h-full" /></div>
            <blockquote className="text-lg leading-[29.25px] text-ink mb-4">“{x.quote}”</blockquote>
            <div className="mb-5"><div className="text-sm font-medium text-ink">{x.name}</div><div className="text-sm text-muted">{x.role}</div></div>
            <ReadMore small />
          </div>
        ))}
      </div>
    </Row>
  )
}
