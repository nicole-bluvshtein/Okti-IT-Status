// The groups we sort services into.
export type Category = 'CRM' | 'Dev Tools' | 'Network' | 'AI'

// Our own simple status. Every API's status gets converted into one of these.
export type ServiceStatus = 'operational' | 'degraded' | 'down'

// One external service we monitor. This comes from our config file, not from an API.
export type Service = {
  id: string // used as the React key and in the address: /services/:id
  name: string
  category: Category
  statusPageUrl: string // the official public status page
}

// A service together with its current status, ready to show on screen.
export type ServiceWithStatus = Service & {
  status: ServiceStatus
}
