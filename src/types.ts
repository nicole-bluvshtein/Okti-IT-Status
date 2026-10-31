// The groups we sort services into.
export type Category = 'CRM' | 'Dev Tools' | 'Network' | 'AI'

// Our own simple status. Every API's status gets converted into one of these.
export type ServiceStatus = 'operational' | 'degraded' | 'down'

// Which kind of API a service's status page uses.
export type ApiType = 'statuspage' | 'salesforce'

// One external service we monitor. This comes from our config file, not from an API.
export type Service = {
  id: string // used as the React key and in the address: /services/:id
  name: string
  category: Category
  statusPageUrl: string // the official public status page
  apiType: ApiType
  domain: string // the company website, used to get its logo
  wikipediaTitle: string // the Wikipedia article we take the description from
}

// What a card shows: a real status, or one of the states before we have one.
export type StatusResult = ServiceStatus | 'loading' | 'error' | 'not-connected'

// A service together with its current status, ready to show on screen.
export type ServiceWithStatus = Service & {
  status: StatusResult
}

// One part of a service, for example "Git Operations" or "Actions" in GitHub.
export type StatuspageComponent = {
  id: string
  name: string
  status: string // "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "under_maintenance"
  group_id?: string | null // only components inside a group have this
}

// The part of a Statuspage summary.json response that we use.
// Example: https://www.githubstatus.com/api/v2/summary.json
export type StatuspageSummary = {
  status: {
    indicator: string // "none" | "minor" | "major" | "critical" | "maintenance"
    description: string
  }
  components: StatuspageComponent[]
}

// One incident from /api/v2/incidents.json
export type StatuspageIncident = {
  id: string
  name: string
  status: string // "investigating" | "identified" | "monitoring" | "resolved" | "postmortem"
  impact: string // "none" | "minor" | "major" | "critical"
  created_at: string // a date like "2026-10-30T20:59:14.225Z"
  shortlink: string // a link to the incident on the official page
}

export type StatuspageIncidents = {
  incidents: StatuspageIncident[]
}

// The part of a Wikipedia summary response that we use.
export type WikipediaSummary = {
  title: string
  extract: string // the first paragraph of the article
}

// The 3 states of any request on screen: still loading, failed, or here is the data.
// <T> is a placeholder for the kind of data, for example WikipediaSummary.
export type RequestState<T> =
  | { state: 'loading' }
  | { state: 'error' }
  | { state: 'success'; data: T }

// One problem an employee reported. Saved in the browser's localStorage.
export type ProblemReport = {
  id: string
  serviceId: string // which service, for example "jira"
  description: string
  createdAt: string // a date like "2026-10-31T09:15:00.000Z"
}
