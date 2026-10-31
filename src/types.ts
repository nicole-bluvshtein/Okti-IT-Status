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
}

// What a card shows: a real status, or one of the states before we have one.
export type StatusResult = ServiceStatus | 'loading' | 'error' | 'not-connected'

// A service together with its current status, ready to show on screen.
export type ServiceWithStatus = Service & {
  status: StatusResult
}

// The part of a Statuspage summary.json response that we use.
// Example: https://www.githubstatus.com/api/v2/summary.json
export type StatuspageSummary = {
  status: {
    indicator: string // "none" | "minor" | "major" | "critical" | "maintenance"
    description: string
  }
}
