import { Link } from 'react-router-dom'
import { footer } from '../content'
import { linkFor } from '../linkMap'
import { Row, Logo } from './ui'

const socials = [
  'M4 4h3.5l3 4.3L14 4h2l-4.6 5.6L17 16h-3.5l-3.3-4.7L6.2 16h-2l5-6z',
  'M5 3h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm1.5 5v6h2V8zm1-3a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2zM10 8v6h2v-3.2c0-1 .6-1.3 1.1-1.3.6 0 .9.4.9 1.3V14h2v-3.6c0-1.8-1-2.6-2.3-2.6-.8 0-1.4.4-1.7.8V8z',
  'M10 2a8 8 0 00-2.5 15.6c.4 0 .5-.2.5-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7 0-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 014 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.6 3.9.3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0010 2z',
  'M17.5 6.2a2 2 0 00-1.4-1.4C14.9 4.5 10 4.5 10 4.5s-4.9 0-6.1.3a2 2 0 00-1.4 1.4C2.2 7.4 2.2 10 2.2 10s0 2.6.3 3.8a2 2 0 001.4 1.4c1.2.3 6.1.3 6.1.3s4.9 0 6.1-.3a2 2 0 001.4-1.4c.3-1.2.3-3.8.3-3.8s0-2.6-.3-3.8zM8.5 12.4V7.6l4.1 2.4z',
]

const Seal = ({ t }) => (
  <svg viewBox="0 0 56 56" className="w-14 h-14">
    <circle cx="28" cy="28" r="27" fill="#f8fafc" stroke="#e6e7ea" />
    <circle cx="28" cy="28" r="20" fill="none" stroke="#6056ff" strokeOpacity=".3" strokeDasharray="2 2" />
    <text x="28" y="31" textAnchor="middle" fontFamily="Inter" fontWeight="600" fontSize="9" fill="#5b6070">{t}</text>
  </svg>
)

export default function Footer() {
  return (
    <Row as="footer">
      <div className="p-6 md:p-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex flex-col gap-4 lg:max-w-[280px]">
          <Logo />
          <p className="text-base text-muted">{footer.tagline}</p>
          <div className="flex gap-3">
            {socials.map((d, i) => <a key={i} href="#" className="opacity-60 hover:opacity-100 transition-opacity duration-150 text-ink"><svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor"><path d={d} /></svg></a>)}
          </div>
          <p className="text-sm text-muted">{footer.legal}</p>
          <div className="flex flex-wrap gap-2.5">{['SOC', 'ISO', 'GDPR', 'HIPAA'].map(t => <Seal key={t} t={t} />)}</div>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-10">
          {footer.groups.map(g => (
            <div key={g.title} className="flex flex-col gap-2">
              <h4 className="text-base font-semibold text-ink mb-2">{g.title}</h4>
              {g.links.map(l => <Link key={l} to={linkFor(l)} className="text-sm text-muted hover:text-ink transition-colors duration-150">{l}</Link>)}
            </div>
          ))}
        </div>
      </div>
    </Row>
  )
}
