import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '../ui'
import { PageSection } from './parts'

const flatAnswer = a => (Array.isArray(a) ? a.join('. ') : a)

function Icon({ open }) {
  return (
    <span className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-150 ${open ? 'bg-indigo-brand border-indigo-brand text-white' : 'border-line group-hover:border-gray-400 text-muted'}`}>
      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M2 6h8" />{!open && <path d="M6 2v8" />}
      </svg>
    </span>
  )
}

// 1.5 FAQSection. Default is single-open with a .2s height; the FAQ page passes multi + .3s.
export default function FAQSection({ title, body, items, multi = false, duration = 0.2 }) {
  const [open, setOpen] = useState([])
  const toggle = i => setOpen(o => o.includes(i) ? o.filter(x => x !== i) : multi ? [...o, i] : [i])
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: flatAnswer(f.a) } })) }
  return (
    <PageSection>
      <SectionHeading title={title} body={body} className="mb-12 md:mb-14" bodyClass="max-w-xl md:text-lg md:leading-[28.8px]" />
      <div className="border border-line divide-y divide-line">
        {items.map((f, i) => {
          const on = open.includes(i)
          return (
            <div key={f.q}>
              <button type="button" onClick={() => toggle(i)} aria-expanded={on}
                className="group font-sans w-full flex items-center gap-4 py-5 px-4 md:px-6 text-left hover:bg-gray-50/50 transition-colors">
                <Icon open={on} />
                <span className="text-base leading-[26px] md:text-lg md:leading-[29.25px] font-medium text-ink">{f.q}</span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration }} className="overflow-hidden">
                    <div className="pb-5 pl-[52px] md:pl-[56px] pr-6 text-base leading-[26px] text-muted">
                      {Array.isArray(f.a)
                        ? <ul className="flex flex-col gap-1">{f.a.map(l => <li key={l}><em>{l}</em></li>)}</ul>
                        : f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </PageSection>
  )
}
