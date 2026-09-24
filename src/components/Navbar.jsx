import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#inicio" className="brand" aria-label="JITSYX CSA, ir al inicio" onClick={close}>
          <span className="brand__name">
            JITSYX <span className="brand__accent">CSA</span>
          </span>
          <span className="brand__tag">Control · Seguridad · Auditoría</span>
        </a>

        <nav id="menu-principal" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#diagnostico" className="btn btn--primary btn--sm" onClick={close}>
            Solicitar diagnóstico
          </a>
        </nav>

        <p className="navbar__motto">
          Un entorno más seguro
          <br />
          es un futuro con más oportunidades.
        </p>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
