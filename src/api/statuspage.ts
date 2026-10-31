import type { Service, ServiceStatus, StatuspageIncident, StatuspageIncidents, StatuspageSummary } from '../types'
import { toServiceStatus } from '../utils/status'

// Fetches a service's summary: its overall status and its components.
export async function fetchSummary(service: Service): Promise<StatuspageSummary> {
  const response = await fetch(`${service.statusPageUrl}/api/v2/summary.json`)

  // fetch only fails by itself on network errors, so we check the HTTP status too.
  if (!response.ok) {
    throw new Error(`${service.name}: HTTP ${response.status}`)
  }

  const data: StatuspageSummary = await response.json()
  return data
}

// Fetches one service's current status (used by the Services page).
export async function fetchServiceStatus(service: Service): Promise<ServiceStatus> {
  const summary = await fetchSummary(service)
  return toServiceStatus(summary.status.indicator)
}

// Fetches a service's incidents: both open ones and past ones.
export async function fetchIncidents(service: Service): Promise<StatuspageIncident[]> {
  const response = await fetch(`${service.statusPageUrl}/api/v2/incidents.json`)

  if (!response.ok) {
    throw new Error(`${service.name} incidents: HTTP ${response.status}`)
  }

  const data: StatuspageIncidents = await response.json()
  return data.incidents
}
