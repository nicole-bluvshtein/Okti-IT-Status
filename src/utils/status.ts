import type { ServiceStatus } from '../types'

// Converts a Statuspage "indicator" into our own 3 statuses.
export function toServiceStatus(indicator: string): ServiceStatus {
  switch (indicator) {
    case 'none':
      return 'operational'
    case 'minor':
    case 'maintenance':
      return 'degraded'
    case 'major':
    case 'critical':
      return 'down'
    default:
      // An unknown value: better to warn than to show green by mistake.
      return 'degraded'
  }
}
