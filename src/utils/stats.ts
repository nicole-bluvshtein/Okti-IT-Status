import type { Service, StatuspageComponent, StatuspageIncident } from '../types'
import { getTopLevelComponents } from './details'

const DAY_IN_MS = 24 * 60 * 60 * 1000

export type RecentIncidents = {
  count: number // incidents inside the window
  seriousCount: number // of them, how many were major or critical
  isPartial: boolean // true if the API's history doesn't reach the start of the window
}

// Everything the statistics page shows about one company.
export type CompanyStats = RecentIncidents & {
  service: Service
  componentCount: number
}

// Counts the incidents from the last `days` days, counted back from `now`.
export function countRecentIncidents(incidents: StatuspageIncident[], days: number, now: Date): RecentIncidents {
  const windowStart = now.getTime() - days * DAY_IN_MS
  const recent = incidents.filter((incident) => new Date(incident.created_at).getTime() >= windowStart)
  const seriousCount = recent.filter((incident) => incident.impact === 'major' || incident.impact === 'critical').length

  // The API only returns the latest incidents. If even the oldest one is inside the window,
  // older incidents from the window may be missing, so the count means "at least".
  const oldest = Math.min(...incidents.map((incident) => new Date(incident.created_at).getTime()))
  const isPartial = incidents.length > 0 && oldest >= windowStart

  return { count: recent.length, seriousCount, isPartial }
}

// Builds one company's statistics from its components and incidents.
export function buildCompanyStats(
  service: Service,
  components: StatuspageComponent[],
  incidents: StatuspageIncident[],
  days: number,
  now: Date,
): CompanyStats {
  return {
    service,
    ...countRecentIncidents(incidents, days, now),
    componentCount: getTopLevelComponents(components).length,
  }
}

// From most incidents to fewest. Copies the list first, because sort changes the array it runs on.
export function sortByIncidents(stats: CompanyStats[]): CompanyStats[] {
  return [...stats].sort((a, b) => b.count - a.count)
}

// The company with the most incidents, or null if there are none.
export function getMostIncidents(stats: CompanyStats[]): CompanyStats | null {
  if (stats.length === 0) return null
  return sortByIncidents(stats)[0]
}
