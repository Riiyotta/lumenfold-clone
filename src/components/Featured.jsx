import { featured } from '../content'
import { Row, Wordmark, Laurel } from './ui'

const Stars = () => (
  <svg viewBox="0 0 80 16" className="w-20 h-4">
    {[0, 1, 2, 3, 4].map(k => <path key={k} transform={`translate(${k * 16 + 8} 8) scale(.7)`} d="M0-10l2.9 6 6.6.9-4.8 4.6 1.2 6.5L0 4.9-5.9 8l1.2-6.5L-9.5-3.1-2.9-4z" fill={k < 4 ? '#f59e0b' : '#fcd34d'} />)}
  </svg>
)

export default function Featured() {
  return (
    <Row>
      <div className="py-8 px-6 md:px-12 text-sm font-medium text-muted">{featured.label}</div>
      <div className="border-t border-line grid grid-cols-2 md:grid-cols-4">
        {featured.press.map((p, i) => (
          <a key={p} href="#" className={`group relative flex items-center justify-center py-12 md:py-16 border-line border-b md:border-b-0 ${i % 2 === 0 ? 'border-r' : ''} md:border-r md:last:border-r-0`}>
            <span className="h-6 md:h-8 flex items-center grayscale opacity-60 group-hover:blur-sm group-hover:opacity-20 transition-all duration-300"><Wordmark name={p} size="lg" className="font-serif" /></span>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-indigo-brand opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Read article →</span>
          </a>
        ))}
      </div>
      <div className="border-t border-line grid grid-cols-2 md:grid-cols-4">
        {featured.awards.map((a, i) => (
          <div key={a.name} className={`flex flex-col items-center justify-center py-10 md:py-14 px-4 border-line border-b md:border-b-0 ${i % 2 === 0 ? 'border-r' : ''} md:border-r md:last:border-r-0`}>
            <span className="h-6 md:h-7 mb-4 flex items-center grayscale opacity-70"><Wordmark name={a.name} /></span>
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted text-center">{a.stars ? <Stars /> : <Laurel />}{a.caption}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-line" />
    </Row>
  )
}
