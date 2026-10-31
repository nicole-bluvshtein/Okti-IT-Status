import type { Category, ServiceStatus, ServiceWithStatus } from '../types'

// What the user chose on screen. 'all' means "don't filter by this".
export type ServiceFilters = {
  search: string
  category: Category | 'all'
  status: ServiceStatus | 'all'
}

// Returns only the services that match all three filters.
export function filterServices(
  services: ServiceWithStatus[],
  filters: ServiceFilters,
): ServiceWithStatus[] {
  const search = filters.search.trim().toLowerCase()

  return services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search)
    const matchesCategory = filters.category === 'all' || service.category === filters.category
    const matchesStatus = filters.status === 'all' || service.status === filters.status
    return matchesSearch && matchesCategory && matchesStatus
  })
}
