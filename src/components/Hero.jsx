import { ChevronRight, Activity } from 'lucide-react'

const STATS = [
  { value: '100%', label: 'Confidencialidad garantizada' },
  { value: 'CIS v8', label: 'Marco de evaluación' },
  { value: '48 h', label: 'Respuesta inicial' },
  { value: '2 informes', label: 'Ejecutivo y técnico' },
]

export default function Hero() {
  return (
    <section id="inicio" className="hero grid-bg">
      <div className="glow glow--red" aria-hidden="true" />
      <div className="glow glow--silver" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="badge-pill">
          <span className="dot" aria-hidden="true" />
          <span>Consultoría y auditoría en ciberseguridad</span>
          <span className="sep" aria-hidden="true">|</span>
          <span className="red">Basado en CIS Controls v8</span>
        </p>

        <h1>Protegemos la infraestructura digital de su organización</h1>

        <p className="hero__lead">
          Auditorías de ciberseguridad, análisis de vulnerabilidades y cumplimiento normativo para empresas y
          organizaciones, con experiencia en infraestructura del sector bancario.
        </p>

        <div className="hero__ctas">
          <a href="#contacto" className="btn btn--red btn--lg">
            Solicitar diagnóstico <ChevronRight size={20} aria-hidden="true" />
          </a>
          <a href="#evaluacion" className="btn btn--dark btn--lg">
            <Activity size={20} aria-hidden="true" /> Test de riesgo gratuito
          </a>
        </div>

        <ul className="stats">
          {STATS.map((s) => (
            <li key={s.label} className="stat metallic-border">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
