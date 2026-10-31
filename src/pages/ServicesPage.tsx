import { useEffect, useState } from 'react'
import ServiceList from '../components/ServiceList'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { services } from '../data/services'
import { fetchServiceStatus } from '../api/statuspage'
import { filterServices, type ServiceFilters } from '../utils/filter'
import type { ServiceWithStatus, StatusResult } from '../types'

// Before any response arrives: every service is loading, except the ones we can't fetch yet.
function initialStatuses(): Record<string, StatusResult> {
  const result: Record<string, StatusResult> = {}
  for (const service of services) {
    result[service.id] = service.apiType === 'statuspage' ? 'loading' : 'not-connected'
  }
  return result
}

function ServicesPage() {
  // One status per service id, for example { github: 'operational', jira: 'loading' }
  const [statuses, setStatuses] = useState<Record<string, StatusResult>>(initialStatuses)
  const [filters, setFilters] = useState<ServiceFilters>({ search: '', category: 'all', status: 'all' })

  // Runs once, when the page opens: start one fetch for each service.
  useEffect(() => {
    for (const service of services) {
      if (service.apiType !== 'statuspage') continue

      fetchServiceStatus(service)
        .then((status) => {
          // Update only this service. "prev" is the latest state, so answers don't overwrite each other.
          setStatuses((prev) => ({ ...prev, [service.id]: status }))
        })
        .catch(() => {
          setStatuses((prev) => ({ ...prev, [service.id]: 'error' }))
        })
    }
  }, [])

  const servicesWithStatus: ServiceWithStatus[] = services.map((service) => ({
    ...service,
    status: statuses[service.id],
  }))

  const visibleServices = filterServices(servicesWithStatus, filters)

  return (
    <>
      <h1>Services</h1>
      <div className="filters">
        <SearchBar
          value={filters.search}
          onChange={(search) => setFilters({ ...filters, search })}
        />
        <FilterBar
          category={filters.category}
          status={filters.status}
          onCategoryChange={(category) => setFilters({ ...filters, category })}
          onStatusChange={(status) => setFilters({ ...filters, status })}
        />
      </div>
      {visibleServices.length > 0 ? (
        <ServiceList services={visibleServices} />
      ) : (
        <p>No services match your search.</p>
      )}
    </>
  )
}

export default ServicesPage
