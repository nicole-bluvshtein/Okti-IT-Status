import type { StatuspageComponent, StatuspageIncident } from '../types'

// Statuses that mean an incident is over.
const finishedStatuses = ['resolved', 'postmortem']

// Only top-level components. Inner ones (like each Cloudflare data center) have a group_id.
export function getTopLevelComponents(components: StatuspageComponent[]): StatuspageComponent[] {
  return components.filter((component) => !component.group_id)
}

// Incidents that are still happening.
export function getOpenIncidents(incidents: StatuspageIncident[]): StatuspageIncident[] {
  return incidents.filter((incident) => !finishedStatuses.includes(incident.status))
}

// Finished incidents, newest first, at most `limit` of them.
export function getRecentHistory(incidents: StatuspageIncident[], limit = 10): StatuspageIncident[] {
  return incidents
    .filter((incident) => finishedStatuses.includes(incident.status))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
}
