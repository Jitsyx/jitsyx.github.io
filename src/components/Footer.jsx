import { X } from 'lucide-react'
import Logo from './Logo'
import { openLegal } from '../lib/legal'
import { SITE } from '../config'

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
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo small />
          <p>© {new Date().getFullYear()} JITSYX CSA. Consultoría y auditoría en ciberseguridad.</p>
        </div>

        <nav className="footer__links" aria-label="Pie de página">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#evaluacion">Test de riesgo</a>
          <a href="#beneficios">Ventajas</a>
          <a href="#contacto">Contacto</a>
          <button type="button" onClick={() => openLegal('privacidad')}>Privacidad</button>
          <button type="button" onClick={() => openLegal('terminos')}>Términos</button>
        </nav>
      </div>

      <LegalDialog id="privacidad" title="Política de privacidad">
        <p><strong>Responsable:</strong> {SITE.responsable} (JITSYX CSA), {SITE.localidad}. Contacto: {SITE.email}.</p>
        <p><strong>Datos que recopilamos:</strong> nombre, empresa, rubro, correo, teléfono, las respuestas de la evaluación y los mensajes enviados. No solicitamos contraseñas, direcciones IP ni datos técnicos sensibles de su infraestructura.</p>
        <p><strong>Finalidad:</strong> únicamente elaborar su informe, responder su consulta y contactarlo. No vendemos ni cedemos sus datos a terceros.</p>
        <p><strong>Almacenamiento:</strong> en una base de datos con acceso restringido, a la que solo accede el responsable.</p>
        <p><strong>Sus derechos:</strong> puede solicitar el acceso, la rectificación o la supresión de sus datos escribiendo a {SITE.email}, conforme a la Ley 25.326 de Protección de Datos Personales. La Agencia de Acceso a la Información Pública es el órgano de control de esta ley.</p>
      </LegalDialog>

      <LegalDialog id="terminos" title="Términos de uso">
        <p>La evaluación express es orientativa: el nivel de riesgo se calcula a partir de sus respuestas y no reemplaza una auditoría técnica profesional.</p>
        <p>Los servicios se acuerdan mediante un presupuesto previo, con alcance y plazos definidos por escrito.</p>
        <p>Todo análisis técnico sobre sus sistemas se realiza únicamente con autorización expresa y por escrito del responsable de la organización.</p>
      </LegalDialog>
    </footer>
  )
}
