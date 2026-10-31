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

// Counts how many services are in each state. Services that aren't connected yet are skipped.
export function countStatuses(services: ServiceWithStatus[]): StatusCounts {
  const counts: StatusCounts = { operational: 0, degraded: 0, down: 0, error: 0, loading: 0 }
  for (const service of services) {
    if (service.status === 'not-connected') continue
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
