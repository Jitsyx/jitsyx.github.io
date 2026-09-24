import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Send, RotateCcw } from 'lucide-react'
import { QUESTIONS, SECTIONS, computeRisk, serializeAnswers } from '../data/questions'
import { insertRow } from '../lib/supabase'
import { openLegal } from '../lib/legal'
import { SITE } from '../config'
import RiskAssessment from './RiskAssessment'

const STEPS = [...SECTIONS, { id: 'datos', label: 'Tus datos' }]
const EMPTY = { nombre: '', empresa: '', rubro: '', email: '', telefono: '', website: '' }

export default function Assessment() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState('quiz') // quiz | datos | enviado
  const [form, setForm] = useState(EMPTY)
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const risk = useMemo(() => computeRisk(answers), [answers])
  const q = QUESTIONS[index]
  const stepIndex =
    phase === 'quiz' ? SECTIONS.findIndex((s) => s.id === q.section) : phase === 'datos' ? SECTIONS.length : STEPS.length

  const next = () => (index < QUESTIONS.length - 1 ? setIndex(index + 1) : setPhase('datos'))
  const back = () => (phase === 'datos' ? setPhase('quiz') : setIndex(Math.max(0, index - 1)))
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  function restart() {
    setIndex(0)
    setAnswers({})
    setForm(EMPTY)
    setConsent(false)
    setError('')
    setPhase('quiz')
  }

  async function submit(e) {
    e.preventDefault()
    if (form.website) return setPhase('enviado') // honeypot: si un bot lo completó, no se guarda
    setSending(true)
    setError('')
    try {
      await insertRow('assessments', {
        nombre: form.nombre.trim(),
        empresa: form.empresa.trim(),
        rubro: form.rubro.trim() || null,
        email: form.email.trim().toLowerCase(),
        telefono: form.telefono.trim() || null,
        respuestas: serializeAnswers(answers),
        riesgo: risk?.riesgo ?? 0,
        nivel: risk?.nivel ?? 'BAJO',
        consentimiento: true,
      })
      setPhase('enviado')
    } catch (err) {
      console.error(err)
      setError(`No se pudieron enviar tus respuestas. Revisa tu conexión e inténtalo de nuevo, o escríbenos a ${SITE.email}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div id="diagnostico" className="panel">
      <h2 className="section-title">Autoevaluación gratuita</h2>
      <p className="section-sub">Responde unas preguntas y obtén un estimado de tu nivel de riesgo.</p>

      <div className="assess">
        <div className="quiz">
          <ol className="stepper" aria-label="Progreso de la autoevaluación">
            {STEPS.map((s, i) => (
              <li
                key={s.id}
                data-state={i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'todo'}
                aria-current={i === stepIndex ? 'step' : undefined}
              >
                <span className="stepper__dot">{i + 1}</span>
                <span className="stepper__label">{s.label}</span>
              </li>
            ))}
          </ol>

          {phase === 'quiz' && (
            <>
              <p className="quiz__progress">
                Pregunta {index + 1} de {QUESTIONS.length}
              </p>
              <fieldset className="question" key={q.id}>
                <legend>{q.text}</legend>
                {q.options.map((o, i) => (
                  <label key={o.label} className="option">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === i}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                    />
                    {o.label}
                  </label>
                ))}
              </fieldset>
              <div className="quiz__nav">
                <button type="button" className="btn btn--ghost btn--sm" onClick={back} disabled={index === 0}>
                  <ArrowLeft size={16} aria-hidden="true" /> Anterior
                </button>
                <button type="button" className="btn btn--primary btn--sm" onClick={next} disabled={answers[q.id] === undefined}>
                  Siguiente <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </>
          )}

          {phase === 'datos' && (
            <form className="stack" onSubmit={submit}>
              <p className="quiz__intro">¿A dónde te enviamos el informe detallado?</p>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="a-nombre">Nombre completo</label>
                  <input id="a-nombre" className="input" name="nombre" autoComplete="name" required minLength={2} maxLength={120} value={form.nombre} onChange={onChange} />
                </div>
                <div className="field">
                  <label htmlFor="a-empresa">Empresa</label>
                  <input id="a-empresa" className="input" name="empresa" autoComplete="organization" required minLength={2} maxLength={120} value={form.empresa} onChange={onChange} />
                </div>
                <div className="field">
                  <label htmlFor="a-email">Correo electrónico</label>
                  <input id="a-email" className="input" type="email" name="email" autoComplete="email" required maxLength={160} value={form.email} onChange={onChange} />
                </div>
                <div className="field">
                  <label htmlFor="a-tel">Teléfono (opcional)</label>
                  <input id="a-tel" className="input" type="tel" name="telefono" autoComplete="tel" maxLength={40} value={form.telefono} onChange={onChange} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="a-rubro">Rubro (opcional)</label>
                <input id="a-rubro" className="input" name="rubro" maxLength={80} placeholder="Ej.: comercio, estudio contable, salud" value={form.rubro} onChange={onChange} />
              </div>

              <div className="honeypot" aria-hidden="true">
                <label>
                  Sitio web
                  <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
                </label>
              </div>

              <label className="check">
                <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>
                  Acepto que se usen estos datos para elaborar mi informe y contactarme, según la{' '}
                  <button type="button" className="link-btn" onClick={() => openLegal('privacidad')}>
                    política de privacidad
                  </button>
                  .
                </span>
              </label>

              {error && (
                <p className="alert alert--error" role="alert">
                  {error}
                </p>
              )}

              <div className="quiz__nav">
                <button type="button" className="btn btn--ghost btn--sm" onClick={back}>
                  <ArrowLeft size={16} aria-hidden="true" /> Anterior
                </button>
                <button type="submit" className="btn btn--primary btn--sm" disabled={sending}>
                  {sending ? 'Enviando…' : 'Enviar autoevaluación'} <Send size={16} aria-hidden="true" />
                </button>
              </div>
            </form>
          )}

          {phase === 'enviado' && (
            <div className="done" role="status">
              <h3>Autoevaluación enviada</h3>
              <p>
                Vamos a revisar tus respuestas y te enviaremos un informe detallado a <strong>{form.email || 'tu correo'}</strong> en
                un plazo de 48 horas hábiles.
              </p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={restart}>
                <RotateCcw size={16} aria-hidden="true" /> Hacer otra evaluación
              </button>
            </div>
          )}
        </div>

        <RiskAssessment risk={risk} />
      </div>
    </div>
  )
}
