import { Target, TrendingDown, Users } from 'lucide-react'

const ITEMS = [
  { icon: Target, text: 'Detectamos vulnerabilidades' },
  { icon: TrendingDown, text: 'Reducimos riesgos' },
  { icon: Users, text: 'Protegemos tu futuro' },
]

export default function Benefits() {
  return (
    <ul className="benefits">
      {ITEMS.map(({ icon: Icon, text }) => (
        <li key={text}>
          <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  )
}
