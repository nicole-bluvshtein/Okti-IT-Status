import type { SalesforceIncident, SalesforceProduct, StatuspageComponent, StatuspageIncident, StatuspageSummary } from '../types'

// The adapter: Salesforce uses its own format, so we convert it into the Statuspage format
// the rest of the app already understands. After this, no page needs to know Salesforce is different.

// The worst severity among an incident's impacts: "major", "minor", or "none".
export function getSeverity(incident: SalesforceIncident): string {
  const severities = incident.IncidentImpacts.map((impact) => impact.severity)
  if (severities.includes('major')) return 'major'
  if (severities.includes('minor')) return 'minor'
  return 'none'
}

// Salesforce incidents have no title, so we build one. For example "Degradation on NA123".
function incidentTitle(incident: SalesforceIncident): string {
  if (incident.instanceKeys.length === 0) return incident.type
  if (incident.instanceKeys.length > 3) return `${incident.type} on ${incident.instanceKeys.length} instances`
  return `${incident.type} on ${incident.instanceKeys.join(', ')}`
}

// One Salesforce incident → one Statuspage incident.
export function toStatuspageIncident(incident: SalesforceIncident): StatuspageIncident {
  return {
    id: String(incident.id),
    name: incidentTitle(incident),
    status: incident.status === 'Resolved' ? 'resolved' : 'investigating',
    impact: getSeverity(incident),
    created_at: incident.createdAt,
    shortlink: `https://status.salesforce.com/incidents/${incident.id}`,
  }
}

// One Salesforce product → one component. We don't know how serious a product's incident is, so it's yellow.
export function toStatuspageComponent(product: SalesforceProduct): StatuspageComponent {
  return {
    id: product.key,
    name: product.name,
    status: product.incidentCount > 0 ? 'degraded_performance' : 'operational',
    group_id: null,
  }
}

// The products and the incidents happening right now → a Statuspage-style summary.
export function toStatuspageSummary(products: SalesforceProduct[], activeIncidents: SalesforceIncident[]): StatuspageSummary {
  let indicator = 'none'
  if (activeIncidents.some((incident) => getSeverity(incident) === 'major')) {
    indicator = 'major'
  } else if (activeIncidents.length > 0) {
    indicator = 'minor'
  }

  return {
    status: { indicator, description: '' },
    components: products.filter((product) => product.isActive).map(toStatuspageComponent),
  }
}
