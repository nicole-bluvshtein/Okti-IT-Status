import type { ServiceStatus, ServiceWithStatus } from '../types'

export type StatusCounts = {
  operational: number
  degraded: number
  down: number
  error: number
  loading: number
}

// What the banner shows: a real status, still checking, or couldn't check.
export type OverallStatus = ServiceStatus | 'loading' | 'error'

// Counts how many services are in each state.
export function countStatuses(services: ServiceWithStatus[]): StatusCounts {
  const counts: StatusCounts = { operational: 0, degraded: 0, down: 0, error: 0, loading: 0 }
  for (const service of services) {
    counts[service.status] += 1
  }
  return counts
}

// The worst state wins: down > degraded > couldn't check > operational.
export function getOverallStatus(counts: StatusCounts): OverallStatus {
  if (counts.loading > 0) return 'loading'
  if (counts.down > 0) return 'down'
  if (counts.degraded > 0) return 'degraded'
  if (counts.error > 0) return 'error'
  return 'operational'
}

// The sentence in the banner at the top of the dashboard.
export function getBannerMessage(counts: StatusCounts): string {
  const overall = getOverallStatus(counts)
  if (overall === 'loading') return 'Checking services…'
  if (overall === 'error') return "Some services couldn't be checked"
  if (overall === 'operational') return 'All systems operational'

  const problems = counts.degraded + counts.down
  return problems === 1 ? '1 service has issues' : `${problems} services have issues`
}

// The time of the last check, like "14:02" (24-hour, as used in Israel and the UK).
export function formatCheckedAt(date: Date): string {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
