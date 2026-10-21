import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Row, Check, EASE } from '../../components/ui'
import LogoWall from '../../components/LogoWall'
import { FooterCTA, LFade, pad } from '../../components/product-legacy/shared'
import { bdrWaitlist as d } from '../../content/productLegacy'

// CS text field: 42px, 1px #e6e7ea, rounded-button, focus ring 2px indigo/20 + indigo border (150ms).
const FIELD = 'w-full h-[42px] px-4 py-2.5 text-sm font-medium text-ink bg-white border border-line rounded-button placeholder:text-muted placeholder:font-normal outline-none transition-all duration-150 focus:ring-2 focus:ring-indigo-brand/20 focus:border-indigo-brand'

function WaitlistForm() {
  const [vals, setVals] = useState({})
  const [consent, setConsent] = useState(false)
  const [state, setState] = useState('idle') // idle | error | success
  const set = k => e => { setVals(v => ({ ...v, [k]: e.target.value })); if (state === 'error') setState('idle') }
  const submit = e => {
    e.preventDefault()
    const ok = d.fields.every(([, , k]) => (vals[k] || '').trim()) && consent
    setState(ok ? 'success' : 'error')
  }
  return (
    <div className="bg-white border border-line p-6 md:p-8 shadow-[0_12px_32px_-16px_rgba(13,22,47,.18)]">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'success' ? (
          <motion.div key="ok" role="status" className="py-16 flex flex-col items-center text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={EASE}>
            <span className="w-12 h-12 rounded-full bg-[#ecfdf3] flex items-center justify-center"><svg viewBox="0 0 20 20" className="w-6 h-6" fill="none" stroke="#027a48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10.5l3.2 3.2L15 7" /></svg></span>
            <p className="mt-5 font-display text-xl text-ink">{d.success}</p>
            <p className="mt-2 text-sm text-muted">We will email {vals.email} when your spot opens.</p>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {d.fields.map(([label, type, k]) => (
                <label key={k} className="block">
                  <span className="block mb-1.5 text-sm text-muted">{label}</span>
                  {type === 'select'
                    ? <select value={vals[k] || ''} onChange={set(k)} className={`${FIELD} appearance-none cursor-pointer`}><option value="" disabled>Select…</option>{d.sizes.map(s => <option key={s}>{s}</option>)}</select>
                    : <input type={type} value={vals[k] || ''} onChange={set(k)} className={FIELD} autoComplete={k === 'email' ? 'email' : 'on'} />}
                </label>
              ))}
            </div>
            <label className="mt-5 flex items-start gap-2.5 text-sm text-muted cursor-pointer">
              <input type="checkbox" checked={consent} onChange={e => { setConsent(e.target.checked); if (state === 'error') setState('idle') }} className="mt-0.5 w-4 h-4 accent-[#6056ff] rounded" />
              {d.consent}
            </label>
            <button type="submit" className="btn-primary w-full mt-6 !py-3 !text-base">{d.submit}</button>
            <AnimatePresence>
              {state === 'error' && <motion.p role="alert" className="mt-3 text-sm text-[#b42318]" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>{d.error}</motion.p>}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BdrWaitlist() {
  return (
    <>
      <Row>
        <div className={`${pad} pt-20 pb-16 lg:pb-[60px]`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div className="max-w-[592px]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={EASE}>
              <h1 className="text-[36px] md:text-[44px] leading-[1.2] tracking-[-0.05em] text-ink [text-wrap:balance]">{d.title}</h1>
              <p className="pt-2.5 mt-3 text-base leading-[1.6] text-muted">{d.body}</p>
              <ul className="pt-1 mt-6 grid gap-3">{d.bullets.map(b => <li key={b} className="flex items-start gap-2.5 text-base text-ink"><Check className="w-[18px] h-[18px] mt-[3px] shrink-0" />{b}</li>)}</ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...EASE, delay: 0.15 }}><WaitlistForm /></motion.div>
          </div>
        </div>
      </Row>
      <Row><LFade as="p" className="px-6 md:px-20 pt-12 pb-6 text-center text-base md:text-lg text-muted max-w-[760px] mx-auto">{d.logoLabel}</LFade></Row>
      <LogoWall />
      <FooterCTA />
    </>
  )
}
