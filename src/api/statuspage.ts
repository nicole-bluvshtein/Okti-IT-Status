import type { Service, ServiceStatus, StatuspageSummary } from '../types'
import { toServiceStatus } from '../utils/status'

// Fetches one service's current status from its public Statuspage API.
export async function fetchServiceStatus(service: Service): Promise<ServiceStatus> {
  const response = await fetch(`${service.statusPageUrl}/api/v2/summary.json`)

  // fetch only fails by itself on network errors, so we check the HTTP status too.
  if (!response.ok) {
    throw new Error(`${service.name}: HTTP ${response.status}`)
  }

  const data: StatuspageSummary = await response.json()
  return toServiceStatus(data.status.indicator)
}
