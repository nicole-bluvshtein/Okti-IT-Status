import type { SalesforceIncident, SalesforceProduct, StatuspageIncident, StatuspageSummary } from '../types'
import { toStatuspageIncident, toStatuspageSummary } from '../utils/salesforce'

const SALESFORCE_API = 'https://api.status.salesforce.com/v1'

// Fetches one Salesforce address and checks that it worked. <T> is the kind of data we expect back.
async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${SALESFORCE_API}${path}`)

  if (!response.ok) {
    throw new Error(`Salesforce ${path}: HTTP ${response.status}`)
  }

  const data: T = await response.json()
  return data
}

// The overall status and components, already converted into the Statuspage format.
export async function fetchSalesforceSummary(): Promise<StatuspageSummary> {
  // Two requests at the same time: the products, and the incidents happening right now.
  const [products, activeIncidents] = await Promise.all([
    getJson<SalesforceProduct[]>('/products'),
    getJson<SalesforceIncident[]>('/incidents/active'),
  ])
  return toStatuspageSummary(products, activeIncidents)
}

// The last 50 incidents, already converted into the Statuspage format.
export async function fetchSalesforceIncidents(): Promise<StatuspageIncident[]> {
  const incidents = await getJson<SalesforceIncident[]>('/incidents?limit=50')
  return incidents.map(toStatuspageIncident)
}
