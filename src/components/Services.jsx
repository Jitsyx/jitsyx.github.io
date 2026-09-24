import { Search, Settings, User, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Search,
    title: 'Diagnóstico de seguridad',
    text: 'Evaluación rápida para identificar riesgos y vulnerabilidades.',
  },
  {
    icon: Settings,
    title: 'Auditoría técnica',
    text: 'Análisis de redes, equipos, configuraciones y exposición.',
  },
  {
    icon: User,
    title: 'Consultoría especializada',
    text: 'Asistencia personalizada para mejorar la postura de seguridad.',
  },
]

export default function Services() {
  return (
    <div id="servicios" className="panel">
      <h2 className="section-title">Nuestros servicios</h2>
      <p className="section-sub">Soluciones adaptadas a tus necesidades.</p>
      <div className="cards">
        {SERVICES.map(({ icon: Icon, title, text }) => (
          <article key={title} className="card">
            <Icon size={34} strokeWidth={1.6} className="card__icon" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#contacto" className="card__link" aria-label={`Consultar por ${title.toLowerCase()}`}>
              Consultar <ArrowRight size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
