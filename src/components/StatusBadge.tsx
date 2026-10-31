import type { StatusResult } from '../types'

// The text shown for each status. Kept here, in one place, for the whole app.
const statusLabels: Record<StatusResult, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
  loading: 'Loading…',
  error: "Couldn't load status",
}

type StatusBadgeProps = {
  status: StatusResult
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="status-badge">
      <span className={`status-dot status-${status}`} aria-hidden="true" />
      {statusLabels[status]}
    </span>
  )
}

export default StatusBadge
