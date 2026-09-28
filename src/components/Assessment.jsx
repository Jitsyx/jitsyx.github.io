import { useMemo, useState } from 'react'
import { ChevronRight, ChevronLeft, ShieldAlert, ShieldCheck, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react'
import { QUESTIONS, LEVELS, computeRisk, serializeAnswers } from '../data/questions'
import { insertRow } from '../lib/supabase'
import { openLegal } from '../lib/legal'
import { SITE } from '../config'

const EMPTY = { nombre: '', empresa: '', rubro: '', email: '', telefono: '', website: '' }
const EMAIL_PATTERN = '[^@\\s]+@[^@\\s]+\\.[^@\\s]+'

export default function Assessment() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState('quiz') // quiz | result | sent
  const [form, setForm] = useState(EMPTY)
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const risk = useMemo(() => computeRisk(answers), [answers])
  const level = risk ? LEVELS[risk.nivel] : null
  const criticos = useMemo(() => serializeAnswers(answers).filter((a) => a.riesgo >= 2).length, [answers])
  const q = QUESTIONS[index]
  const progress = Math.round(((index + 1) / QUESTIONS.length) * 100)
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  function choose(i) {
    setAnswers((a) => ({ ...a, [q.id]: i }))
    if (index < QUESTIONS.length - 1) setIndex(index + 1)
    else setPhase('result')
  }

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
    if (form.website) return setPhase('sent') // honeypot anti-bots
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
      setPhase('sent')
    } catch (err) {
      console.error(err)
      setError(`No se pudo enviar la evaluación. Revise su conexión e intente nuevamente, o escríbanos a ${SITE.email}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="evaluacion" className="section section--dark">
      <div className="glow glow--corner" aria-hidden="true" />
      <div className="container--narrow">
        <div className="section-head section-head--dark">
          <span className="eyebrow eyebrow--dark">Herramienta interactiva</span>
          <h2>Evaluación express de postura de seguridad</h2>
          <p>
            Responda {QUESTIONS.length} preguntas clave basadas en los CIS Controls v8 y obtenga un diagnóstico
            preliminar de su organización.
          </p>
        </div>

        <div className="assess-card metallic-border theme-dark">
          {phase === 'quiz' && (
            <div>
              <div className="progress__meta">
                <span>
                  Pregunta {index + 1} de {QUESTIONS.length}
                </span>
                <span>{progress}% completado</span>
              </div>
              <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="red-chrome-gradient" style={{ width: `${progress}%` }} />
              </div>

              <h3 className="question" id={`q-${q.id}`}>
                {q.text}
              </h3>
              <div className="options" role="group" aria-labelledby={`q-${q.id}`}>
                {q.options.map((o, i) => (
                  <button
                    key={o.label}
                    type="button"
                    className="option"
                    aria-pressed={answers[q.id] === i}
                    onClick={() => choose(i)}
                  >
                    <span>{o.label}</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>

              {index > 0 && (
                <button type="button" className="back-link" onClick={() => setIndex(index - 1)}>
                  <ChevronLeft size={16} aria-hidden="true" /> Pregunta anterior
                </button>
              )}
            </div>
          )}

          {phase === 'result' && level && (
            <div className="result">
              <span className="result__icon" aria-hidden="true">
                {risk.nivel === 'BAJO' ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
              </span>
              <h3>
                Nivel de riesgo estimado: <span style={{ color: level.color }}>{risk.nivel}</span>
              </h3>
              <p className="result__msg">{level.msg}</p>

              <div className="score">
                <div className="score__label">Índice de riesgo</div>
                <div className="score__value">{risk.riesgo} / 100</div>
                <div className="meter" aria-hidden="true">
                  <div style={{ width: `${Math.max(risk.riesgo, 3)}%`, background: level.color }} />
                </div>
                {criticos > 0 && (
                  <p className="score__note">
                    Detectamos {criticos} {criticos === 1 ? 'punto a revisar' : 'puntos a revisar'} en sus respuestas.
                  </p>
                )}
              </div>

              <form className="form lead-form" onSubmit={submit}>
                <div>
                  <h4>Reciba el informe completo</h4>
                  <p className="lead-form__sub">
                    Revisaremos sus respuestas y le enviaremos un informe detallado con recomendaciones en 48 horas hábiles.
                  </p>
                </div>
                <div className="form__row">
                  <div>
                    <label className="label" htmlFor="a-nombre">Nombre completo</label>
                    <input id="a-nombre" className="input" name="nombre" autoComplete="name" required minLength={2} maxLength={120} value={form.nombre} onChange={onChange} />
                  </div>
                  <div>
                    <label className="label" htmlFor="a-empresa">Empresa</label>
                    <input id="a-empresa" className="input" name="empresa" autoComplete="organization" required minLength={2} maxLength={120} value={form.empresa} onChange={onChange} />
                  </div>
                </div>
                <div className="form__row">
                  <div>
                    <label className="label" htmlFor="a-email">Correo electrónico</label>
                    <input
                      id="a-email"
                      className="input"
                      type="email"
                      pattern={EMAIL_PATTERN}
                      title="Ingrese un correo válido, por ejemplo nombre@empresa.com"
                      name="email"
                      autoComplete="email"
                      required
                      maxLength={160}
                      value={form.email}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="a-tel">Teléfono (opcional)</label>
                    <input id="a-tel" className="input" type="tel" name="telefono" autoComplete="tel" maxLength={40} value={form.telefono} onChange={onChange} />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="a-rubro">Rubro (opcional)</label>
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

                <div className="result__actions">
                  <button type="button" className="btn btn--outline btn--sm" onClick={restart}>
                    <RotateCcw size={14} aria-hidden="true" /> Repetir evaluación
                  </button>
                  <button type="submit" className="btn btn--red btn--sm" disabled={sending}>
                    {sending ? 'Enviando…' : 'Solicitar informe completo'} <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {phase === 'sent' && (
            <div className="done" role="status">
              <span className="done__icon" aria-hidden="true">
                <CheckCircle2 size={40} />
              </span>
              <h3>Evaluación recibida</h3>
              <p>
                Le enviaremos el informe detallado a <strong>{form.email || 'su correo'}</strong> en un plazo de 48 horas
                hábiles.
              </p>
              <button type="button" className="btn btn--outline btn--sm" onClick={restart}>
                <RotateCcw size={14} aria-hidden="true" /> Hacer otra evaluación
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
