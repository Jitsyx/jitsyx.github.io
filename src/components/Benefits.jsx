import { Lock, Server, FileText, Zap } from 'lucide-react'

const ITEMS = [
  {
    icon: Lock,
    title: 'Enfoque Zero Trust',
    desc: 'Recomendaciones basadas en verificación continua de identidades, cifrado y mínimo privilegio.',
  },
  {
    icon: Server,
    title: 'Experiencia en infraestructura real',
    desc: 'Soporte y administración de infraestructura para el sector bancario, redes y sistemas empresariales.',
  },
  {
    icon: FileText,
    title: 'Informes ejecutivos y técnicos',
    desc: 'Doble entregable: visión clara del riesgo para la dirección y guía técnica paso a paso para su equipo.',
  },
  {
    icon: Zap,
    title: 'Protección ante ransomware',
    desc: 'Estrategias de respaldo aislado y recuperación comprobada para que un ataque no detenga su operación.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="section section--darker">
      <div className="container">
        <div className="section-head section-head--dark">
          <span className="eyebrow eyebrow--plain">Diferenciales</span>
          <h2>
            Por qué elegir <span className="chrome-text">JITSYX CSA</span>
          </h2>
          <p>Rigor metodológico, independencia técnica y confidencialidad absoluta en cada intervención.</p>
        </div>

        <div className="benefits">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="benefit">
              <span className="benefit__icon" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
