import { useEffect, useState } from 'react'
import { services } from '../data/services'
import { fetchServiceStatus } from '../api/statuspage'
import type { ServiceWithStatus, StatusResult } from '../types'

// Before any response arrives: every service is loading, except the ones we can't fetch yet.
function initialStatuses(): Record<string, StatusResult> {
  const result: Record<string, StatusResult> = {}
  for (const service of services) {
    result[service.id] = service.apiType === 'statuspage' ? 'loading' : 'not-connected'
  }
  return result
}

// Fetches the live status of every service. Used by the Services page and the Dashboard.
export function useServiceStatuses(): ServiceWithStatus[] {
  // One status per service id, for example { github: 'operational', jira: 'loading' }
  const [statuses, setStatuses] = useState<Record<string, StatusResult>>(initialStatuses)

  // Runs once, when the page opens: start one fetch for each service.
  useEffect(() => {
    // If the page closes before an answer arrives, we ignore that answer.
    let ignore = false

    for (const service of services) {
      if (service.apiType !== 'statuspage') continue

      fetchServiceStatus(service)
        .then((status) => {
          // Update only this service. "prev" is the latest state, so answers don't overwrite each other.
          if (!ignore) setStatuses((prev) => ({ ...prev, [service.id]: status }))
        })
        .catch(() => {
          if (!ignore) setStatuses((prev) => ({ ...prev, [service.id]: 'error' }))
        })
    }

    return () => {
      ignore = true
    }
  }, [])

  return services.map((service) => ({ ...service, status: statuses[service.id] }))
}
