import { ShieldCheck, Network, FileText, Server, Laptop, Users } from 'lucide-react'

const ITEMS = [
  { icon: ShieldCheck, text: 'Auditoría completa' },
  { icon: Network, text: 'Análisis técnico' },
  { icon: FileText, text: 'Reportes ejecutivos' },
  { icon: Server, text: 'Redes seguras' },
  { icon: Laptop, text: 'Sistemas protegidos' },
  { icon: Users, text: 'Asesoría experta' },
]

export default function WhyUs() {
  return (
    <div id="por-que" className="panel">
      <h2 className="section-title">¿Por qué confiar en JITSYX CSA?</h2>
      <p className="section-sub">Experiencia técnica, enfoque práctico y compromiso real con tu seguridad.</p>
      <ul className="tiles">
        {ITEMS.map(({ icon: Icon, text }) => (
          <li key={text} className="tile">
            <Icon size={34} strokeWidth={1.6} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}
