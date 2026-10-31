import { useState } from 'react'
import ServiceList from '../components/ServiceList'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { useServiceStatuses } from '../hooks/useServiceStatuses'
import { filterServices, type ServiceFilters } from '../utils/filter'

function ServicesPage() {
  const servicesWithStatus = useServiceStatuses()
  const [filters, setFilters] = useState<ServiceFilters>({ search: '', category: 'all', status: 'all' })

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
