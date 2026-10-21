import { Link } from 'react-router-dom'
import { Grain, Avatar, Reveal } from '../ui'
import { PageSection } from './parts'

// Six floating glass coins (lg+): top / side / rotate.
const coins = [
  ['16%', 'left', '4%', -8], ['48%', 'left', '10%', 6], ['76%', 'left', '5%', -4],
  ['14%', 'right', '4%', 7], ['50%', 'right', '10%', -6], ['74%', 'right', '5%', 5],
]

// Internal destinations use <Link>; anything else (sign-up lives outside this clone) stays an anchor.
const Btn = ({ to, className, children }) => to.startsWith('/') || to.startsWith('?')
  ? <Link to={to} className={className}>{children}</Link>
  : <a href={to} className={className}>{children}</a>

export default function ClosingCTA({ title, body, primary, primaryTo = '#', secondary, secondaryTo = '#' }) {
  return (
    <PageSection>
      <div className="relative overflow-hidden rounded-2xl">
        <Grain tone="violet" />
        <div className="hidden lg:block" aria-hidden="true">
          {coins.map(([top, side, off, rot], i) => (
            <span key={i} className="absolute w-11 h-11 rounded-full border border-white/60 bg-white/70 backdrop-blur-glass shadow-glass flex items-center justify-center"
              style={{ top, [side]: off, transform: `rotate(${rot}deg)` }}>
              <Avatar seed={i * 3 + 2} size={28} />
            </span>
          ))}
        </div>
        <div className="relative px-6 py-16 md:py-24">
          <Reveal className="max-w-xl mx-auto text-center">
            <h2 className="text-[30px] leading-[40.5px] md:text-[36px] md:leading-[48.6px] tracking-tight text-ink">{title}</h2>
            <p className="mt-5 max-w-lg mx-auto text-base leading-[25.6px] text-ink/80">{body}</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Btn to={primaryTo} className="btn-primary !rounded-full">{primary}</Btn>
            {secondary && <Btn to={secondaryTo} className="btn-secondary font-sans !rounded-full !bg-white hover:!bg-[#f9f9fa]">{secondary}</Btn>}
          </div>
        </div>
      </div>
    </PageSection>
  )
}
