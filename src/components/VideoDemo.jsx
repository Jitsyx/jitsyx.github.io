import { useEffect, useRef } from 'react'
import { ArrowRight, WifiOff, FileCheck2, ClipboardCheck } from 'lucide-react'
import './VideoDemo.css'

const BASE = import.meta.env.BASE_URL
const VIDEO = `${BASE}demo/jitsyx-demo.mp4`
const POSTER = `${BASE}demo/jitsyx-demo-poster.jpg`

const STEPS = [
  { title: 'Carga de datos de la auditoría', text: 'Se registran la organización, el alcance autorizado y el responsable.' },
  { title: 'Escaneo en vivo', text: 'Los hallazgos aparecen al instante, clasificados por severidad.' },
  { title: 'Informe firmado', text: 'Cada hallazgo se mapea a los controles de ISO 27001 y NIST CSF 2.0.' },
]

const FEATURES = [
  { icon: WifiOff, text: '100% offline' },
  { icon: FileCheck2, text: 'Informes firmados (Ed25519)' },
  { icon: ClipboardCheck, text: 'ISO 27001 · NIST CSF 2.0' },
]

export default function VideoDemo() {
  const videoRef = useRef(null)

  // Reproduce en silencio solo cuando el video está visible; se pausa al salir de pantalla.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="demo" className="section section--darker demo grid-bg">
      <div className="glow demo__glow" aria-hidden="true" />
      <div className="container demo__inner">
        <div className="demo__text">
          <span className="eyebrow eyebrow--dark">Herramienta propia</span>
          <h2>
            Nuestra herramienta <span className="red-chrome-text">en acción</span>
          </h2>
          <p className="demo__lead">
            Con <strong>JITSYX Scanner</strong> analizamos su red de forma local: la información nunca sale de su
            infraestructura.
          </p>

          <ol className="demo__steps" id="demo-pasos">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="demo__num red-chrome-gradient" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="demo__features">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={15} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <div className="demo__ctas">
            <a href="#evaluacion" className="btn btn--red btn--sm">
              Realizar mi evaluación <ArrowRight size={14} aria-hidden="true" />
            </a>
            <a href="#contacto" className="btn btn--outline btn--sm">
              Solicitar una demo
            </a>
          </div>
        </div>

        <figure className="demo__media">
          <div className="demo__frame metallic-border">
            <span className="demo__tag">Demo · datos ficticios</span>
            <video
              ref={videoRef}
              className="demo__video"
              src={VIDEO}
              poster={POSTER}
              muted
              loop
              playsInline
              controls
              preload="none"
              width="1280"
              height="720"
              aria-label="Demostración de JITSYX Scanner"
              aria-describedby="demo-pasos"
            />
          </div>
          <figcaption>Demostración de 20 segundos. Active el sonido desde los controles del video.</figcaption>
        </figure>
      </div>
    </section>
  )
}
