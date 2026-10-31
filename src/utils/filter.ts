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

// All the possible values. Used by the dropdowns and to check values coming from the address.
export const categoryOptions: Category[] = ['CRM', 'Dev Tools', 'Network', 'AI']
export const statusOptions: ServiceStatus[] = ['operational', 'degraded', 'down']

// Reads the filters from the address, for example /services?status=operational&q=git
// Unknown values (like ?status=banana) fall back to 'all'.
export function filtersFromParams(params: URLSearchParams): ServiceFilters {
  return {
    search: params.get('q') ?? '',
    category: categoryOptions.find((option) => option === params.get('category')) ?? 'all',
    status: statusOptions.find((option) => option === params.get('status')) ?? 'all',
  }
}

// Writes the filters into the address. Filters left on 'all' or empty are skipped, to keep it short.
export function filtersToParams(filters: ServiceFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.search !== '') params.set('q', filters.search)
  if (filters.category !== 'all') params.set('category', filters.category)
  if (filters.status !== 'all') params.set('status', filters.status)
  return params
}
