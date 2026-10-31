import type { Category, ServiceStatus } from '../types'

type FilterBarProps = {
  category: Category | 'all'
  status: ServiceStatus | 'all'
  onCategoryChange: (category: Category | 'all') => void
  onStatusChange: (status: ServiceStatus | 'all') => void
}

const categories: Category[] = ['CRM', 'Dev Tools', 'Network', 'AI']

function FilterBar({ category, status, onCategoryChange, onStatusChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value as Category | 'all')}
      >
        <option value="all">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value as ServiceStatus | 'all')}
      >
        <option value="all">All statuses</option>
        <option value="operational">Operational</option>
        <option value="degraded">Degraded</option>
        <option value="down">Down</option>
      </select>
    </div>
  )
}

export default FilterBar
