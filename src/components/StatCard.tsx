import { Link } from 'react-router'
import type { ServiceStatus } from '../types'

type StatCardProps = {
  label: string
  value: number
  to: string // where clicking the card goes
  status?: ServiceStatus
}

// A label with its status shape, then one big number, like "◆ Degraded 1". Clicking it opens the matching page.
function StatCard({ label, value, to, status }: StatCardProps) {
  return (
    <Link to={to} className={status ? `stat-card stat-${status}` : 'stat-card'}>
      <span className="stat-label">
        {status && <span className={`status-dot status-${status}`} aria-hidden="true" />}
        {label}
      </span>
      <span className="stat-value">{value}</span>
    </Link>
  )
}

export default StatCard
