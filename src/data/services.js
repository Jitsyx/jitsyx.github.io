import { ShieldCheck, Terminal, Server, Activity } from 'lucide-react'

export const SERVICES = [
  {
    id: 'auditoria',
    title: 'Auditoría y cumplimiento',
    badge: 'ISO 27001 / CIS',
    desc: 'Evaluación de controles de seguridad, gestión de accesos y respaldo de datos, alineada con estándares internacionales para reducir los riesgos de su organización.',
    icon: ShieldCheck,
    highlights: ['Análisis de madurez de seguridad', 'Revisión de políticas y cumplimiento', 'Informe ejecutivo y plan de remediación'],
  },
  {
    id: 'vulnerabilidades',
    title: 'Análisis de vulnerabilidades y pentesting',
    badge: 'Con autorización escrita',
    desc: 'Identificación de puntos débiles en servidores, redes y aplicaciones web mediante pruebas controladas, antes de que los encuentre un atacante.',
    icon: Terminal,
    highlights: ['Escaneo de vulnerabilidades', 'Pruebas de penetración acotadas', 'Evidencias y prioridades de corrección'],
  },
  {
    id: 'hardening',
    title: 'Hardening de servidores, redes y nube',
    badge: 'Linux / Windows / Cloud',
    desc: 'Configuración segura de equipos, servidores y servicios en la nube, aplicando mínimo privilegio y buenas prácticas de administración.',
    icon: Server,
    highlights: ['Revisión de permisos y accesos', 'Endurecimiento de sistemas y redes', 'Configuración segura de servicios cloud'],
  },
  {
    id: 'incidentes',
    title: 'Respuesta a incidentes y continuidad',
    badge: 'Backups y recuperación',
    desc: 'Preparación ante ransomware y otros incidentes: respaldos aislados, planes de respuesta y acompañamiento en la recuperación.',
    icon: Activity,
    highlights: ['Plan de respuesta a incidentes', 'Estrategia de backups aislados', 'Pruebas de recuperación'],
  },
]
