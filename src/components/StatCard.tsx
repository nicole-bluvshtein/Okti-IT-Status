import type { ServiceStatus } from '../types'

type StatCardProps = {
  label: string
  value: number
  status?: ServiceStatus
}

// One big number with a label, like "3 Operational".
function StatCard({ label, value, status }: StatCardProps) {
  return (
    <div className={status ? `stat-card stat-${status}` : 'stat-card'}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default StatCard
