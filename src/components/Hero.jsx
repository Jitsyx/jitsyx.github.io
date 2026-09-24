import { ArrowRight, Clock, Search, ShieldCheck } from "lucide-react";

const heroImg = Object.values(
  import.meta.glob("../assets/hero-banner.*", { eager: true, import: "default" })
)[0];

const FEATURES = [
  { icon: Search, text: "Análisis técnico" },
  { icon: ShieldCheck, text: "Recomendaciones claras" },
  { icon: Clock, text: "Resultados en 48 horas" },
];

const VERBS = ["Prevenir", "Detectar", "Proteger", "Avanzar"];

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      {heroImg && <img className="hero__img" src={heroImg} alt="" />}
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Protegemos <em>tu negocio</em> antes de que ocurra un incidente.
          </h1>
          <p className="hero__lead">
            Auditorías de ciberseguridad, evaluación de riesgos y consultoría técnica para empresas,
            profesionales y organizaciones.
          </p>
          <a href="#diagnostico" className="btn btn--primary hero__cta">
            Solicitar diagnóstico <ArrowRight size={18} aria-hidden="true" />
          </a>
          <ul className="hero__features">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={22} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__aside">
          <ul className="hero__verbs">
            {VERBS.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <blockquote className="hero__quote">
            <p>“La seguridad no es un producto, es un proceso continuo.”</p>
            Bruce Schneier
          </blockquote>
        </div>
      </div>
    </section>
  );
}