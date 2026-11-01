import { useSearchParams } from 'react-router'
import ServiceList from '../components/ServiceList'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { useServiceStatuses } from '../hooks/useServiceStatuses'
import { filterServices, filtersFromParams, filtersToParams, type ServiceFilters } from '../utils/filter'

function ServicesPage() {
  const { services: servicesWithStatus } = useServiceStatuses()

  // The filters live in the address (for example ?status=operational), so links can open a filtered list.
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = filtersFromParams(searchParams)

  function updateFilters(next: ServiceFilters) {
    // replace: true updates the address without adding a Back-button step for every letter typed.
    setSearchParams(filtersToParams(next), { replace: true })
  }

  const visibleServices = filterServices(servicesWithStatus, filters)

  return (
    <>
      <h1>Services</h1>
      <div className="filters">
        <SearchBar
          value={filters.search}
          onChange={(search) => updateFilters({ ...filters, search })}
        />
        <FilterBar
          category={filters.category}
          status={filters.status}
          onCategoryChange={(category) => updateFilters({ ...filters, category })}
          onStatusChange={(status) => updateFilters({ ...filters, status })}
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
