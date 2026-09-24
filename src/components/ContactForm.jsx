import { useState } from 'react'
import { Lock, Check, Send } from 'lucide-react'
import { insertRow } from '../lib/supabase'
import { openLegal } from '../lib/legal'
import { SITE } from '../config'

const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', mensaje: '', website: '' }

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (form.website) return setStatus('ok') // honeypot
    setStatus('sending')
    try {
      await insertRow('contact_requests', {
        nombre: form.nombre.trim(),
        empresa: form.empresa.trim(),
        email: form.email.trim().toLowerCase(),
        telefono: form.telefono.trim() || null,
        mensaje: form.mensaje.trim(),
      })
      setForm(EMPTY)
      setStatus('ok')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div id="contacto" className="panel">
      <h2 className="section-title">Solicita tu consultoría</h2>
      <p className="section-sub">Completa el formulario y nos pondremos en contacto contigo.</p>

      <div className="contact">
        <form className="stack" onSubmit={submit}>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="c-nombre">Nombre completo</label>
              <input id="c-nombre" className="input" name="nombre" autoComplete="name" required minLength={2} maxLength={120} value={form.nombre} onChange={onChange} />
            </div>
            <div className="field">
              <label htmlFor="c-empresa">Empresa</label>
              <input id="c-empresa" className="input" name="empresa" autoComplete="organization" required minLength={2} maxLength={120} value={form.empresa} onChange={onChange} />
            </div>
            <div className="field">
              <label htmlFor="c-email">Correo electrónico</label>
              <input id="c-email" className="input" type="email" name="email" autoComplete="email" required maxLength={160} value={form.email} onChange={onChange} />
            </div>
            <div className="field">
              <label htmlFor="c-tel">Teléfono (opcional)</label>
              <input id="c-tel" className="input" type="tel" name="telefono" autoComplete="tel" maxLength={40} value={form.telefono} onChange={onChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-msg">Describe brevemente tu situación o necesidad</label>
            <textarea id="c-msg" className="input" name="mensaje" required minLength={10} maxLength={2000} value={form.mensaje} onChange={onChange} />
          </div>

          <div className="honeypot" aria-hidden="true">
            <label>
              Sitio web
              <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
            </label>
          </div>

          {status === 'ok' && (
            <p className="alert alert--ok" role="status">
              Solicitud enviada. Te responderemos dentro de las próximas 48 horas hábiles.
            </p>
          )}
          {status === 'error' && (
            <p className="alert alert--error" role="alert">
              No se pudo enviar la solicitud. Inténtalo de nuevo o escríbenos a {SITE.email}.
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
            <Send size={18} aria-hidden="true" /> {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
          </button>
          <p className="fineprint">
            Al enviar aceptas la{' '}
            <button type="button" className="link-btn" onClick={() => openLegal('privacidad')}>
              política de privacidad
            </button>
            .
          </p>
        </form>

        <aside className="trust">
          <Lock size={40} strokeWidth={1.6} className="trust__lock" aria-hidden="true" />
          <p className="trust__title">Tu información está segura con nosotros.</p>
          <ul>
            <li><Check size={16} aria-hidden="true" /> Uso exclusivo para contacto</li>
            <li><Check size={16} aria-hidden="true" /> Sin spam</li>
            <li><Check size={16} aria-hidden="true" /> Confidencialidad garantizada</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
