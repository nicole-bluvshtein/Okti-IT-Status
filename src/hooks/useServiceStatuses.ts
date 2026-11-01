import { useEffect, useState } from 'react'
import { services } from '../data/services'
import { fetchServiceStatus } from '../api/statuspage'
import type { ServiceWithStatus, StatusResult } from '../types'

// Before any response arrives, every service is loading.
function initialStatuses(): Record<string, StatusResult> {
  const result: Record<string, StatusResult> = {}
  for (const service of services) {
    result[service.id] = 'loading'
  }
  return result
}

// Fetches the live status of every service. Used by the Services page and the Dashboard.
// checkedAt is the time the last answer arrived (null while still loading).
export function useServiceStatuses(): { services: ServiceWithStatus[]; checkedAt: Date | null } {
  // One status per service id, for example { github: 'operational', jira: 'loading' }
  const [statuses, setStatuses] = useState<Record<string, StatusResult>>(initialStatuses)
  const [checkedAt, setCheckedAt] = useState<Date | null>(null)

  // Runs once, when the page opens: start one fetch for each service.
  useEffect(() => {
    // If the page closes before an answer arrives, we ignore that answer.
    let ignore = false

    const requests = services.map((service) =>
      fetchServiceStatus(service)
        .then((status) => {
          // Update only this service. "prev" is the latest state, so answers don't overwrite each other.
          if (!ignore) setStatuses((prev) => ({ ...prev, [service.id]: status }))
        })
        .catch(() => {
          if (!ignore) setStatuses((prev) => ({ ...prev, [service.id]: 'error' }))
        }),
    )

    // When every service has answered (or failed), remember the time of the check.
    Promise.all(requests).then(() => {
      if (!ignore) setCheckedAt(new Date())
    })

    return () => {
      ignore = true
    }
  }, [])

  return {
    services: services.map((service) => ({ ...service, status: statuses[service.id] })),
    checkedAt,
  }
}
