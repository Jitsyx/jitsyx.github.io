import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#evaluacion', label: 'Riesgo express', free: true },
  { href: '#beneficios', label: 'Ventajas' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="logo-link" aria-label="JITSYX CSA, ir al inicio" onClick={close}>
          <Logo />
        </a>

        <nav id="menu" className={`nav${open ? ' nav--open' : ''}`} aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
              {l.free && <span className="pill-free">Gratis</span>}
            </a>
          ))}
          <a href="#contacto" className="btn btn--red btn--sm nav__cta" onClick={close}>
            Solicitar auditoría <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}
