// Cuestionario basado en los CIS Controls v8 (Grupo de Implementación 1, pensado para pymes).
// "risk": 0 = buena práctica ... 3 = riesgo alto. Las preguntas con scored:false dan contexto y no suman.

export const SECTIONS = [
  { id: 'equipos', label: 'Equipos' },
  { id: 'backups', label: 'Copias de seguridad' },
  { id: 'incidentes', label: 'Incidentes' },
  { id: 'politicas', label: 'Políticas' },
]

export const QUESTIONS = [
  // Equipos (CIS 1, 2, 7, 10)
  {
    id: 'equipos_cantidad',
    section: 'equipos',
    scored: false,
    text: '¿Cuántos equipos administra?',
    options: [
      { label: '1 a 5', risk: 0 },
      { label: '6 a 20', risk: 0 },
      { label: '21 a 50', risk: 0 },
      { label: 'Más de 50', risk: 0 },
    ],
  },
  {
    id: 'equipos_actualizaciones',
    section: 'equipos',
    text: '¿Los equipos instalan las actualizaciones del sistema de forma regular?',
    options: [
      { label: 'Sí, todos se actualizan automáticamente', risk: 0 },
      { label: 'Algunos sí, otros no', risk: 2 },
      { label: 'No, o no lo sé', risk: 3 },
    ],
  },
  {
    id: 'equipos_antivirus',
    section: 'equipos',
    text: '¿Todos los equipos tienen antivirus o protección de endpoints activa?',
    options: [
      { label: 'Sí, en todos', risk: 0 },
      { label: 'Solo en algunos', risk: 2 },
      { label: 'No', risk: 3 },
    ],
  },

  // Copias de seguridad (CIS 11)
  {
    id: 'backup_frecuencia',
    section: 'backups',
    text: '¿Con qué frecuencia hacen copias de seguridad de la información importante?',
    options: [
      { label: 'Todos los días', risk: 0 },
      { label: 'Una vez por semana', risk: 1 },
      { label: 'Una vez por mes o menos', risk: 2 },
      { label: 'No hacemos copias', risk: 3 },
    ],
  },
  {
    id: 'backup_fuera',
    section: 'backups',
    text: '¿Guardan al menos una copia fuera de la oficina o desconectada de la red?',
    options: [
      { label: 'Sí', risk: 0 },
      { label: 'No', risk: 3 },
      { label: 'No lo sé', risk: 3 },
    ],
  },
  {
    id: 'backup_prueba',
    section: 'backups',
    text: '¿Probaron restaurar una copia de seguridad en el último año?',
    options: [
      { label: 'Sí, y funcionó', risk: 0 },
      { label: 'Sí, pero tuvimos problemas', risk: 2 },
      { label: 'Nunca lo probamos', risk: 2 },
    ],
  },

  // Incidentes (CIS 17)
  {
    id: 'incidente_previo',
    section: 'incidentes',
    text: 'En los últimos 12 meses, ¿sufrieron algún incidente (virus, ransomware, cuenta robada, estafa por correo)?',
    options: [
      { label: 'No', risk: 0 },
      { label: 'Sí, uno', risk: 2 },
      { label: 'Sí, más de uno', risk: 3 },
      { label: 'No lo sé', risk: 2 },
    ],
  },
  {
    id: 'incidente_plan',
    section: 'incidentes',
    text: 'Si mañana ocurre un incidente, ¿saben qué hacer y a quién llamar?',
    options: [
      { label: 'Sí, tenemos un plan escrito', risk: 0 },
      { label: 'Más o menos', risk: 1 },
      { label: 'No', risk: 3 },
    ],
  },

  // Políticas (CIS 5, 6, 14)
  {
    id: 'politica_mfa',
    section: 'politicas',
    text: '¿Usan verificación en dos pasos en el correo y las cuentas importantes?',
    options: [
      { label: 'Sí, en todas', risk: 0 },
      { label: 'En algunas', risk: 2 },
      { label: 'No', risk: 3 },
    ],
  },
  {
    id: 'politica_admin',
    section: 'politicas',
    text: '¿Los empleados usan cuentas con permisos de administrador en su día a día?',
    options: [
      { label: 'No, solo quien administra los sistemas', risk: 0 },
      { label: 'Algunos sí', risk: 2 },
      { label: 'Sí, todos', risk: 3 },
    ],
  },
  {
    id: 'politica_capacitacion',
    section: 'politicas',
    text: '¿El personal recibe capacitación para reconocer correos falsos y estafas?',
    options: [
      { label: 'Sí, periódicamente', risk: 0 },
      { label: 'Alguna vez', risk: 1 },
      { label: 'Nunca', risk: 3 },
    ],
  },
]

export const LEVELS = {
  BAJO: {
    label: 'Bajo',
    color: 'var(--low)',
    msg: 'Tienes una buena base. Una revisión profesional puede confirmar que no queden puntos ciegos.',
  },
  MEDIO: {
    label: 'Medio',
    color: 'var(--mid)',
    msg: 'Recomendamos realizar una evaluación profesional para identificar y mitigar posibles vulnerabilidades.',
  },
  ALTO: {
    label: 'Alto',
    color: 'var(--high)',
    msg: 'Hay riesgos importantes. Te conviene una evaluación profesional cuanto antes.',
  },
}

// Devuelve { riesgo: 0-100, nivel } con las respuestas dadas hasta ahora, o null si no hay datos.
export function computeRisk(answers) {
  let got = 0
  let max = 0
  for (const q of QUESTIONS) {
    if (q.scored === false) continue
    const i = answers[q.id]
    if (i === undefined) continue
    got += q.options[i].risk
    max += Math.max(...q.options.map((o) => o.risk))
  }
  if (max === 0) return null
  const riesgo = Math.round((got / max) * 100)
  const nivel = riesgo < 34 ? 'BAJO' : riesgo < 67 ? 'MEDIO' : 'ALTO'
  return { riesgo, nivel }
}

// Formato legible para guardar en la base y armar el informe.
export function serializeAnswers(answers) {
  return QUESTIONS.filter((q) => answers[q.id] !== undefined).map((q) => {
    const opt = q.options[answers[q.id]]
    return { id: q.id, seccion: q.section, pregunta: q.text, respuesta: opt.label, riesgo: opt.risk }
  })
}
