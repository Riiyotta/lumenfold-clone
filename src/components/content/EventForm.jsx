import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Native stand-in for the third-party form embed. Visual only: validates, then shows an inline success state.
const fields = [
  [['first', 'First name', 'text', 'given-name'], ['last', 'Last name', 'text', 'family-name']],
  [['email', 'Work email', 'email', 'email']],
  [['company', 'Company', 'text', 'organization']],
  [['role', 'Job title', 'text', 'organization-title']],
]
const empty = { first: '', last: '', email: '', company: '', role: '' }

export default function EventForm({ past }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const validate = v => {
    const e = {}
    for (const k of ['first', 'last', 'email', 'company']) if (!v[k].trim()) e[k] = 'Please complete this required field.'
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.'
    return e
  }
  const submit = e => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (!Object.keys(errs).length) setDone(true)
  }
  const set = k => e => { setValues(v => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors(x => ({ ...x, [k]: undefined })) }

  return (
    <div className="form-wrap">
      <div className="ev-eyebrow mb-4">{past ? 'Get the recording' : 'Save your seat'}</div>
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} role="status" className="py-6 flex flex-col items-start gap-3">
            <span className="w-10 h-10 rounded-full bg-indigo-brand/10 text-indigo-brand flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <p className="font-display text-lg font-semibold text-ink">{past ? 'The recording is on its way' : 'You’re registered'}</p>
            <p className="text-[15px] leading-[23px] text-muted">
              Thanks, {values.first}. We’ve sent {past ? 'the link' : 'a calendar invite and joining details'} to <span className="text-ink font-medium">{values.email}</span>.
            </p>
            <button type="button" onClick={() => { setValues(empty); setDone(false) }} className="mt-1 font-sans text-sm font-medium text-indigo-brand hover:underline">Register someone else</button>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onSubmit={submit} noValidate className="ev-form">
            {fields.map((row, r) => (
              <div key={r} className={row.length > 1 ? 'row2' : ''}>
                {row.map(([k, label, type, ac]) => (
                  <div key={k} className="field">
                    <label htmlFor={`ev-${k}`}>{label}{k !== 'role' && ' *'}</label>
                    <input id={`ev-${k}`} type={type} autoComplete={ac} value={values[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `ev-${k}-err` : undefined} />
                    {errors[k] && <div id={`ev-${k}-err`} className="err">{errors[k]}</div>}
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" className="ev-submit mt-1">{past ? 'Watch the recording' : 'Register now'}</button>
            <p className="mt-3 text-xs leading-[16.8px] text-muted text-center">We’ll only email you about this event and its recording.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
