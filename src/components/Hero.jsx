import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls, useInView, useReducedMotion, useSpring } from 'framer-motion'
import { hero } from '../content'
import { EASE, Row, Play, Close } from './ui'

// Original mascot: a folded paper lantern with two eyes.
// Motion mirrors the original buddy: idle loop on the outer wrapper only while it intersects the viewport,
// squash via animation controls (no remount), blink on the eye group, smile = opacity tween + scale spring.
const EYE_SPRING = { stiffness: 120, damping: 16, mass: 0.4 }
const LANTERN = 'M38 4c6 0 9 3 13 6l12 9c4 3 7 6 7 12v14c0 6-3 9-7 12l-12 9c-4 3-7 6-13 6s-9-3-13-6l-12-9c-4-3-7-6-7-12V31c0-6 3-9 7-12l12-9c4-3 7-6 13-6z'

function Mascot({ size, track, smile: smileProp = false }) {
  const uid = useRef('m' + Math.random().toString(36).slice(2, 7)).current
  const ex = useSpring(0, EYE_SPRING)
  const ey = useSpring(0, EYE_SPRING)
  const [hoverSmile, setHoverSmile] = useState(false)
  const smiling = hoverSmile || smileProp
  const smileT = useRef()
  const doSmile = () => { clearTimeout(smileT.current); setHoverSmile(true); smileT.current = setTimeout(() => setHoverSmile(false), 2600) }
  useEffect(() => () => clearTimeout(smileT.current), [])
  const squash = useAnimationControls()
  const onDown = () => { doSmile(); squash.start({ scale: [1, 0.86, 1.08, 1], transition: { duration: 0.48, times: [0, 0.24, 0.62, 1], ease: 'easeOut' } }) }

  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!track) return
    const f = e => {
      ex.set(Math.max(-2.4, Math.min(2.4, (e.clientX / innerWidth - 0.5) * 6)))
      ey.set(Math.max(-1.8, Math.min(1.8, (e.clientY / innerHeight - 0.5) * 5)))
    }
    addEventListener('pointermove', f)
    return () => removeEventListener('pointermove', f)
  }, [track])

  return (
    <div ref={ref} className="relative inline-block align-baseline" style={{ width: size, height: size }}>
      <motion.div className="relative block cursor-pointer" onPointerEnter={doSmile} onPointerDown={onDown}
        initial={{ scale: 1, rotate: 0 }}
        animate={vis ? { scale: [1, 1.035, 1], rotate: [-1.5, 1.5, -1.5] } : { scale: 1, rotate: 0 }}
        transition={vis ? { scale: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' } } : { duration: 0.3, ease: 'easeOut' }}>
        <motion.div className="relative block" initial={false} animate={squash}>
          <svg viewBox="0 0 76 76" width={size} height={size} className="relative block">
            <defs>
              <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6355F5" /><stop offset="1" stopColor="#4D40EC" /></linearGradient>
              <radialGradient id={`${uid}c`} cx="0.2" cy="0.15" r="0.6"><stop offset="0" stopColor="#43E3F5" stopOpacity=".5" /><stop offset="1" stopColor="#43E3F5" stopOpacity="0" /></radialGradient>
              <radialGradient id={`${uid}p`} cx="0.85" cy="0.9" r="0.6"><stop offset="0" stopColor="#F06BD8" stopOpacity=".45" /><stop offset="1" stopColor="#F06BD8" stopOpacity="0" /></radialGradient>
              <linearGradient id={`${uid}s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".2" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /></linearGradient>
            </defs>
            <g>
              <path d={LANTERN} fill={`url(#${uid}b)`} />
              <path d={LANTERN} fill={`url(#${uid}c)`} />
              <path d={LANTERN} fill={`url(#${uid}p)`} />
              <path d={LANTERN} fill={`url(#${uid}s)`} />
              <path d="M38 6v64" stroke="#fff" strokeOpacity=".14" strokeWidth="1.2" />
              <path d="M10 26c9 4 19 6 28 6s19-2 28-6" stroke="#fff" strokeOpacity=".14" strokeWidth="1.2" fill="none" />
            </g>
            <motion.g style={{ x: ex, y: ey }}>
              <motion.g initial={{ opacity: 1, scaleY: 1 }}
                animate={{ opacity: smiling ? 0 : 1, scaleY: smiling || !vis ? 1 : [1, 1, 0.12, 1] }}
                transition={{ opacity: { duration: 0.12 }, scaleY: { duration: 0.32, times: [0, 0.05, 0.55, 1], repeat: Infinity, repeatDelay: 3.8 } }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <rect x={26.04} y={30.4} width={8.1} height={18.3} rx={4.05} fill="#fff" />
                <rect x={41.87} y={30.4} width={8.1} height={18.3} rx={4.05} fill="#fff" />
              </motion.g>
              <motion.g initial={false} animate={{ opacity: smiling ? 1 : 0, scale: smiling ? 1 : 0.7 }}
                transition={{ opacity: { duration: 0.12 }, scale: { type: 'spring', stiffness: 320, damping: 18 } }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                <path d="M26 40c1.5-4 6.5-4 8 0M42 40c1.5-4 6.5-4 8 0" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" fill="none" />
              </motion.g>
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Bubble cycle: same state machine as the original (first after 900ms; visible max(4000, 2200+chars*60)+rand(700);
// hidden 1400+rand(2600); pauses while the hero is <30% in view and resumes in the same phase).
const visibleFor = m => Math.max(4000, 2200 + m.length * 60) + Math.random() * 700
const hiddenFor = () => 1400 + Math.random() * 2600

function MascotVisual() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [msg, setMsg] = useState(0)
  const [show, setShow] = useState(false)
  const first = useRef(true)
  const lastSmile = show && msg === hero.bubbles.length - 1

  useEffect(() => {
    if (reduce) { setShow(true); return }
    if (!inView) return
    const delay = show ? visibleFor(hero.bubbles[msg]) : first.current ? 900 : hiddenFor()
    const t = setTimeout(() => {
      if (show) setShow(false)
      else {
        if (!first.current) setMsg(m => (m + 1) % hero.bubbles.length)
        first.current = false
        setShow(true)
      }
    }, delay)
    return () => clearTimeout(t)
  }, [show, msg, inView, reduce])

  return (
    <div ref={ref} className="relative flex justify-center mb-8 lg:mb-0">
      <motion.div className="relative" animate={{ y: show ? -26 : 0 }} transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}>
        <span className="pointer-events-none absolute -inset-[119px] md:-inset-[146px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,85,245,0.16) 0%, rgba(99,85,245,0.06) 42%, rgba(99,85,245,0) 68%)' }} />
        <div className="hidden md:block"><Mascot size={172} track smile={lastSmile} /></div>
        <div className="md:hidden"><Mascot size={140} smile={lastSmile} /></div>
        <div className="absolute inset-x-0 top-full mt-4 flex justify-center" aria-live="polite">
          <AnimatePresence>
            {show && (
              <motion.div key={msg} initial={{ opacity: 0, scale: 0.8, y: -6 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4, transition: { duration: 0.22, ease: 'easeIn' } }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }} style={{ transformOrigin: '50% 0%' }}
                className="relative w-max max-w-[260px] shrink-0 rounded-[18px] border border-line bg-white px-4 py-2.5 text-[15px] leading-[1.45] text-center text-ink">
                <span className="absolute -top-[6px] left-1/2 -ml-[5.5px] w-[11px] h-[11px] rotate-45 bg-white border-l border-t border-line rounded-tl-[3px]" />
                <span className="relative">{hero.bubbles[msg]}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const [video, setVideo] = useState(false)
  return (
    <Row>
      <div className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-10 items-center">
          <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
            <h1 className="text-[48px] leading-[1.1] tracking-[-0.15rem] text-ink">{hero.title}</h1>
            <p className="mt-5 text-[20px] leading-[27px] md:text-[24px] md:leading-[32.4px] text-ink/80">{hero.subtitle}</p>
            <p className="mt-5 max-w-xl text-base leading-[25.6px] text-muted">{hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn-primary" onClick={() => setVideo(true)}>{hero.primary}</button>
              <Link to="/book-a-demo" className="btn-secondary font-sans">{hero.secondary}</Link>
            </div>
          </motion.div>
          <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}>
            <MascotVisual />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {video && (
          <motion.div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideo(false)}>
            <motion.div className="relative w-full max-w-4xl aspect-video bg-surface-dark rounded-lg overflow-hidden flex items-center justify-center text-white/70"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <img src="/assets/photos/story-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <span className="relative flex items-center gap-3 font-display"><Play className="w-8 h-8" /> Product tour video placeholder</span>
              <button onClick={() => setVideo(false)} className="absolute top-3 right-3 p-2 rounded-md bg-white/10 hover:bg-white/20" aria-label="Close"><Close /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Row>
  )
}
