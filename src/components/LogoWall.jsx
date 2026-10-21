import { Link } from 'react-router-dom'
import { logos } from '../content'

// Logos with a customer story link to it; the rest go to the customers index.
const STORIES = new Set(['northwind', 'tidewater', 'brightpath', 'quillstone', 'maplewood', 'lumora'])
const storyPath = name => STORIES.has(name.toLowerCase()) ? `/customers/${name.toLowerCase()}` : '/customers'
import { Row, Wordmark, Arrow } from './ui'

export default function LogoWall() {
  return (
    <Row innerClassName="border-b border-line">
      <div className="py-6 sm:py-12 sm:pt-14 lg:py-12 w-full">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-5 sm:gap-8 px-6 md:px-20 desktop:px-14">
        {logos.map(l => (
          <div key={l.name} className="flex flex-col items-center">
            {/* Original: hover on the logo itself (grayscale 1 -> 0, all 300ms); the arrow belongs to the link's own group. */}
            <div className="group/logo h-10 flex items-center grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100">
              <Wordmark name={l.name} size="sm" className="group-hover/logo:text-indigo-brand transition-colors duration-300" />
            </div>
            <div className="hidden sm:block h-4">
              {l.link && (
                <Link to={storyPath(l.name)} className="group relative text-xs font-medium text-indigo-brand/85 hover:text-indigo-brand hover:underline inline-flex items-center">
                  {l.link}
                  <Arrow className="absolute -right-4 w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </Row>
  )
}
