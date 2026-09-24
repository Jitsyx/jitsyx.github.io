import { Mail, X } from 'lucide-react'
import Benefits from './Benefits'
import { openLegal } from '../lib/legal'
import { SITE } from '../config'

function LinkedinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  )
}

function LegalDialog({ id, title, children }) {
  return (
    <dialog
      id={`legal-${id}`}
      className="legal"
      aria-labelledby={`legal-${id}-title`}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="legal__head">
        <h2 id={`legal-${id}-title`}>{title}</h2>
        <form method="dialog">
          <button className="icon-btn" aria-label="Cerrar">
            <X size={20} />
          </button>
        </form>
      </div>
      <div className="legal__body">{children}</div>
    </dialog>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <span className="brand">
            <span className="brand__name">
              JITSYX <span className="brand__accent">CSA</span>
            </span>
            <span className="brand__tag">Control · Seguridad · Auditoría</span>
          </span>
          <span className="rule" />
          <p>Consultoría independiente en ciberseguridad y evaluación técnica.</p>
        </div>

        <Benefits />

        <div className="social">
          <h3>Conéctate con nosotros</h3>
          <ul>
            <li><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a></li>
            <li><a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a></li>
            <li><a href={`mailto:${SITE.email}`} aria-label="Correo electrónico"><Mail size={22} /></a></li>
          </ul>
        </div>

        <p className="footer__motto">
          Un mundo más seguro
          <br />
          comienza con una decisión.
        </p>
      </div>

      <div className="container footer__bottom">
        <span>© {year} JITSYX CSA. Todos los derechos reservados.</span>
        <nav className="footer__links" aria-label="Legal">
          <button type="button" className="link-plain" onClick={() => openLegal('privacidad')}>Privacidad</button>
          <button type="button" className="link-plain" onClick={() => openLegal('terminos')}>Términos</button>
          <a className="link-plain" href="#contacto">Contacto</a>
        </nav>
        <span>{SITE.localidad}</span>
      </div>

      <LegalDialog id="privacidad" title="Política de privacidad">
        <p><strong>Responsable:</strong> {SITE.responsable} (JITSYX CSA), {SITE.localidad}. Contacto: {SITE.email}.</p>
        <p><strong>Qué datos recopilamos:</strong> nombre, empresa, rubro, correo, teléfono, las respuestas de la autoevaluación y los mensajes que nos envías. No pedimos contraseñas, direcciones IP ni datos técnicos sensibles de tu infraestructura.</p>
        <p><strong>Para qué los usamos:</strong> únicamente para elaborar tu informe, responder tu consulta y contactarte. No los vendemos ni los cedemos a terceros.</p>
        <p><strong>Dónde se guardan:</strong> en una base de datos con acceso restringido, a la que solo accede el responsable.</p>
        <p><strong>Tus derechos:</strong> puedes pedir acceso, rectificación o eliminación de tus datos escribiendo a {SITE.email}, conforme a la Ley 25.326 de Protección de Datos Personales. La Agencia de Acceso a la Información Pública es el órgano de control de esta ley.</p>
      </LegalDialog>

      <LegalDialog id="terminos" title="Términos de uso">
        <p>La autoevaluación es orientativa: el nivel de riesgo se calcula a partir de tus respuestas y no reemplaza una auditoría técnica profesional.</p>
        <p>Los servicios de diagnóstico, auditoría y consultoría se acuerdan mediante un presupuesto previo, con alcance y plazos definidos por escrito.</p>
        <p>Cualquier análisis técnico sobre tus sistemas se realiza solo con autorización expresa y por escrito del responsable de la empresa.</p>
      </LegalDialog>
    </footer>
  )
}
