import { Link } from 'react-router-dom'
import { learnMore } from '../content'
import { Row, Reveal, Grain, Wordmark, Avatar, Play, Arrow, LogoMark } from './ui'

function Visual({ kind }) {
  if (kind === 'report') return (
    <div className="relative h-full flex items-center justify-center">
      <div className="relative h-[210px] w-[296px] shadow-glass overflow-hidden">
        <img src="/assets/photos/report.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-surface-dark/30 to-transparent" />
        <div className="absolute left-4 bottom-4 right-4 text-white">
          <div className="flex items-center gap-1.5 text-[10px] opacity-80"><LogoMark size={12} />Lumenfold field guide</div>
          <div className="mt-1 font-display text-lg leading-tight">Rolling out agents, one team at a time</div>
        </div>
      </div>
    </div>
  )
  return (
    <div className="relative h-full flex flex-col items-center justify-center gap-5">
      <span className="glass-pill !px-4"><LogoMark size={16} /><span className="text-[13px] text-muted">×</span><Wordmark name="Orbital" size="sm" className="!text-[13px]" /></span>
      <div className="flex items-center">
        {[3, 8, 13].map((s, k) => <span key={s} className={`rounded-full border-[3px] border-white shadow-glass ${k ? '-ml-3.5' : ''}`}><Avatar seed={s} size={64} /></span>)}
        <span className="ml-3 w-14 h-14 rounded-full bg-white/70 backdrop-blur-glass shadow-glass flex items-center justify-center text-indigo-brand"><Play className="w-5 h-5" /></span>
      </div>
    </div>
  )
}

export default function LearnMore() {
  return (
    <Row>
      <div className="py-12 md:py-28 px-6 md:px-12 lg:px-20">
        <Reveal className="mb-12 md:mb-14"><h2 className="max-w-2xl text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-[-0.025em] text-ink">{learnMore.title}</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learnMore.cards.map((c, i) => (
            <Link key={c.title} to={i ? '/events' : '/resources'} className="group flex flex-col bg-white border border-line transition-all duration-300 ease-[ease] hover:-translate-y-[5px] hover:bg-[rgba(96,86,255,0.06)] hover:border-[rgba(96,86,255,0.2)]">
              <div className="relative h-[260px] w-full overflow-hidden"><Grain tone={i ? 'pink' : 'violet'} /><Visual kind={c.visual} /></div>
              <div className="flex-1 flex flex-col gap-3 p-7">
                <h3 className="font-sans text-xl leading-[25px] font-medium tracking-[-0.2px] text-ink">{c.title}</h3>
                <p className="text-[15px] leading-[22.5px] font-medium text-tertiary">{c.body}</p>
                <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-brand">{c.cta}<Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Row>
  )
}
