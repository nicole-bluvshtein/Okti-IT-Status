import { Link } from 'react-router'
import type { ServiceStatus } from '../types'

type StatCardProps = {
  label: string
  value: number
  to: string // where clicking the card goes
  status?: ServiceStatus
}

// One big number with a label, like "3 Operational". Clicking it opens the matching page.
function StatCard({ label, value, to, status }: StatCardProps) {
  return (
    <Link to={to} className={status ? `stat-card stat-${status}` : 'stat-card'}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </Link>
  )
}

export default StatCard
