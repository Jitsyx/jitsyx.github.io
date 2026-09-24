import { LEVELS } from '../data/questions'

// Arco de 270° (de abajo a la izquierda hasta abajo a la derecha), radio 80, centro (100,100)
const ARC = 'M 43.43 156.57 A 80 80 0 1 1 156.57 156.57'

export default function RiskAssessment({ risk }) {
  const level = risk ? LEVELS[risk.nivel] : null
  const pct = risk ? Math.max(risk.riesgo, 3) : 0

  return (
    <aside className="gauge" aria-live="polite">
      <h3>Nivel de riesgo estimado</h3>
      <svg
        viewBox="0 0 200 175"
        role="img"
        aria-label={risk ? `Riesgo ${level.label.toLowerCase()}: ${risk.riesgo} de 100` : 'Todavía sin estimado'}
      >
        <path d={ARC} className="gauge__track" fill="none" strokeWidth="14" strokeLinecap="round" />
        <path
          d={ARC}
          className="gauge__value"
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - pct}
          style={{ stroke: level ? level.color : 'transparent' }}
        />
        <text x="100" y="106" textAnchor="middle" className="gauge__level" style={{ fill: level ? level.color : 'var(--faint)' }}>
          {risk ? risk.nivel : '—'}
        </text>
        {risk && (
          <text x="100" y="130" textAnchor="middle" className="gauge__score">
            {risk.riesgo} / 100
          </text>
        )}
      </svg>
      <p>{level ? level.msg : 'Tu estimado aparece a medida que respondes.'}</p>
    </aside>
  )
}
