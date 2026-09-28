import { Shield } from 'lucide-react'

export default function Logo({ small = false }) {
  return (
    <span className={`logo${small ? ' logo--small' : ''}`}>
      {!small && (
        <span className="logo__badge red-chrome-gradient" aria-hidden="true">
          <span>
            <Shield size={20} />
          </span>
        </span>
      )}
      <span className="logo__text">
        <span className="logo__name">
          JITSYX<span className="red-chrome-text">CSA</span>
        </span>
        {!small && <span className="logo__tag">Cybersecurity &amp; Audit</span>}
      </span>
    </span>
  )
}
