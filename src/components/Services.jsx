import { CheckCircle2, ChevronRight } from 'lucide-react'
import { SERVICES } from '../data/services'

export default function Services() {
  return (
    <section id="servicios" className="section section--light">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--light">Nuestras soluciones</span>
          <h2>Servicios de ciberseguridad para su organización</h2>
          <p>Soluciones estructuradas para identificar vulnerabilidades antes de que se conviertan en incidentes.</p>
        </div>

        <div className="services">
          {SERVICES.map(({ id, title, badge, desc, icon: Icon, highlights }) => (
            <article key={id} className="service chrome-card">
              <div>
                <div className="service__top">
                  <span className="service__icon red-chrome-gradient" aria-hidden="true">
                    <Icon size={28} />
                  </span>
                  <span className="service__badge">{badge}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <ul className="checklist">
                  {highlights.map((h) => (
                    <li key={h}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contacto" className="service__link" aria-label={`Consultar alcance de ${title.toLowerCase()}`}>
                Consultar alcance <ChevronRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
