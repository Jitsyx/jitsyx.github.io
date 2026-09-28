import { useState } from 'react'
import { Lock, ShieldCheck, Send, CheckCircle2 } from 'lucide-react'
import { SERVICES } from '../data/services'
import { insertRow } from '../lib/supabase'
import { openLegal } from '../lib/legal'
import { SITE } from '../config'

const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', servicio: SERVICES[0].title, mensaje: '', website: '' }
const EMAIL_PATTERN = '[^@\\s]+@[^@\\s]+\\.[^@\\s]+'

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (form.website) return setStatus('ok') // honeypot anti-bots
    setStatus('sending')
    try {
      await insertRow('contact_requests', {
        nombre: form.nombre.trim(),
        empresa: form.empresa.trim(),
        email: form.email.trim().toLowerCase(),
        telefono: form.telefono.trim() || null,
        mensaje: `Servicio de interés: ${form.servicio}\n\n${form.mensaje.trim()}`,
      })
      setForm(EMPTY)
      setStatus('ok')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="section section--light">
      <div className="container contact">
        <div>
          <span className="eyebrow eyebrow--light">Contacto directo</span>
          <h2>Inicie una consulta de auditoría confidencial</h2>
          <p className="contact__lead">
            Nos pondremos en contacto para definir el alcance y los términos de confidencialidad (NDA) antes de iniciar el
            análisis.
          </p>
          <ul className="contact__points">
            <li>
              <span className="ic" aria-hidden="true"><Lock size={16} /></span>
              Acuerdo de confidencialidad (NDA) disponible antes de la primera sesión.
            </li>
            <li>
              <span className="ic" aria-hidden="true"><ShieldCheck size={16} /></span>
              Respuesta en menos de 48 horas hábiles.
            </li>
          </ul>
        </div>

        <div className="form-card chrome-card theme-light">
          {status === 'ok' ? (
            <div className="done" role="status">
              <span className="done__icon" aria-hidden="true">
                <CheckCircle2 size={40} />
              </span>
              <h3>¡Solicitud recibida!</h3>
              <p>Nos comunicaremos a la brevedad para coordinar la evaluación inicial.</p>
              <button type="button" className="btn btn--light btn--sm" onClick={() => setStatus('idle')}>
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="form__row">
                <div>
                  <label className="label" htmlFor="c-nombre">Nombre completo</label>
                  <input id="c-nombre" className="input" name="nombre" autoComplete="name" required minLength={2} maxLength={120} placeholder="Ej.: Carlos Mendoza" value={form.nombre} onChange={onChange} />
                </div>
                <div>
                  <label className="label" htmlFor="c-email">Correo corporativo</label>
                  <input
                    id="c-email"
                    className="input"
                    type="email"
                    pattern={EMAIL_PATTERN}
                    title="Ingrese un correo válido, por ejemplo nombre@empresa.com"
                    name="email"
                    autoComplete="email"
                    required
                    maxLength={160}
                    placeholder="c.mendoza@empresa.com"
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form__row">
                <div>
                  <label className="label" htmlFor="c-empresa">Empresa u organización</label>
                  <input id="c-empresa" className="input" name="empresa" autoComplete="organization" required minLength={2} maxLength={120} placeholder="Nombre de la empresa" value={form.empresa} onChange={onChange} />
                </div>
                <div>
                  <label className="label" htmlFor="c-servicio">Servicio de interés</label>
                  <select id="c-servicio" className="input" name="servicio" value={form.servicio} onChange={onChange}>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="label" htmlFor="c-tel">Teléfono (opcional)</label>
                <input id="c-tel" className="input" type="tel" name="telefono" autoComplete="tel" maxLength={40} value={form.telefono} onChange={onChange} />
              </div>
              <div>
                <label className="label" htmlFor="c-msg">Detalles del requerimiento</label>
                <textarea
                  id="c-msg"
                  className="input"
                  name="mensaje"
                  required
                  minLength={10}
                  maxLength={1800}
                  placeholder="Describa brevemente la cantidad de equipos, su infraestructura o necesidades específicas…"
                  value={form.mensaje}
                  onChange={onChange}
                />
              </div>

              <div className="honeypot" aria-hidden="true">
                <label>
                  Sitio web
                  <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
                </label>
              </div>

              {status === 'error' && (
                <p className="alert alert--error" role="alert">
                  No se pudo enviar la solicitud. Intente nuevamente o escríbanos a {SITE.email}.
                </p>
              )}

              <button type="submit" className="btn btn--red btn--block btn--caps" disabled={status === 'sending'}>
                <Send size={16} aria-hidden="true" />
                {status === 'sending' ? 'Enviando…' : 'Enviar solicitud de auditoría'}
              </button>
              <p className="fineprint">
                Al enviar acepta la{' '}
                <button type="button" className="link-btn" onClick={() => openLegal('privacidad')}>
                  política de privacidad
                </button>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
