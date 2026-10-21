import { useState } from 'react'
import { tiles } from '../content'
import { Row, SectionHeading, Avatar } from './ui'

const tones = ['violet', 'pink', 'blue']
const ease = 'cubic-bezier(.23,1,.32,1)'

function CheckDot() {
  return (
    <span className="w-4 h-4 rounded-full bg-indigo-brand flex items-center justify-center shrink-0">
      <svg viewBox="0 0 8 8" className="w-2 h-2"><path d="M1.5 4.2l1.6 1.6L6.5 2.4" stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round" /></svg>
    </span>
  )
}

function Illustration({ i, item }) {
  if (i === 0) return (
    <div className="flex flex-col items-start gap-2.5">
      {item.pills.map((p, k) => <span key={p} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`} style={k === 2 ? { opacity: 0.55 } : undefined}>{k < 2 && <CheckDot />}{p}</span>)}
    </div>
  )
  if (i === 1) {
    const pts = [[0, 24], [118, 0], [118, 84], [236, 42]]
    return (
      <div className="relative w-[320px] h-[140px]">
        <svg viewBox="0 0 320 140" className="absolute inset-0 w-full h-full" fill="none">
          <path d="M44 46C80 46 90 22 118 22M44 46C80 46 90 106 118 106M162 22C200 22 210 64 236 64M162 106C200 106 210 64 236 64" stroke="#6056ff" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
        {pts.map(([x, y], k) => (
          <span key={k} className="absolute w-11 h-11 rounded-full bg-white/80 backdrop-blur-glass shadow-glass flex items-center justify-center" style={{ left: x, top: y, opacity: k === 3 ? 0.6 : 1 }}>
            <Avatar seed={k + 2} size={28} />
            <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-status-green ring-2 ring-white" />
          </span>
        ))}
      </div>
    )
  }
  return (
    <div className="flex flex-col items-start gap-2.5">
      {item.pills.map((p, k) => (
        <span key={p} className={`glass-pill ${k === 1 ? 'ml-6' : ''}`}><Avatar seed={k + 7} size={18} />{p}<span className="text-muted font-normal">Wk {k + 3}</span></span>
      ))}
    </div>
  )
}

export default function Tiles() {
  const [active, setActive] = useState(0)
  return (
    <Row>
      <div className="py-12 md:py-28 px-6 md:px-12 lg:px-20">
        <SectionHeading title={tiles.title} body={tiles.body} />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          {tiles.items.map((t, i) => {
            const on = active === i
            return (
              <div key={i} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                className="tile relative overflow-hidden bg-tile-base lg:h-[400px] lg:basis-0 min-w-0 outline-none"
                style={{ flexGrow: on ? 2.4 : 1, transition: `flex-grow .65s ${ease}` }} data-on={on}>
                <div className={`absolute inset-0 grain-${tones[i]} tile-fade`} style={{ transition: `opacity .65s ${ease}` }} />
                <div className="grain-noise" />
                <div className="tile-illus absolute left-6 top-6 hidden lg:block pointer-events-none" aria-hidden="true" style={{ transition: `opacity .45s ${ease} ${on ? '.2s' : '0s'}` }}>
                  <Illustration i={i} item={t} />
                </div>
                <div className="relative h-full hidden lg:flex flex-col justify-end p-6" style={{ transition: `padding .65s ${ease}` }}>
                  <div className="w-[180px]">
                    <span className="text-sm tile-label" style={{ transition: `color .65s ${ease}` }}>{t.label}</span>
                    <h4 className="mt-1.5 text-xl font-medium tracking-tight text-ink">{t.title}</h4>
                  </div>
                  <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: `grid-template-rows .65s ${ease}` }}>
                    <div className="overflow-hidden">
                      <p className="tile-body pt-2 w-[370px] max-w-full text-sm leading-[1.6] text-ink/75" style={{ transition: `opacity .5s ${ease} ${on ? '.15s' : '0s'}` }}>{t.body}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:hidden relative p-6">
                  <div className="mb-8 mt-2 pointer-events-none" aria-hidden="true"><Illustration i={i} item={t} /></div>
                  <span className="text-sm text-ink/50">{t.label}</span>
                  <h4 className="mt-1.5 text-lg font-medium text-ink">{t.title}</h4>
                  <p className="pt-2 text-sm leading-[1.6] text-ink/75">{t.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Row>
  )
}
