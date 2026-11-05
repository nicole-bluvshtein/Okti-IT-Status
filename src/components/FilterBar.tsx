import type { Category, ServiceStatus } from '../types'
import { categoryOptions, statusOptions } from '../utils/filter'

type FilterBarProps = {
  category: Category | 'all'
  status: ServiceStatus | 'all'
  onCategoryChange: (category: Category | 'all') => void
  onStatusChange: (status: ServiceStatus | 'all') => void
}

function FilterBar({ category, status, onCategoryChange, onStatusChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <select
        aria-label="Filter by category"
        value={category}
        onChange={(event) =>
          onCategoryChange(categoryOptions.find((option) => option === event.target.value) ?? 'all')
        }
      >
        <option value="all">All categories</option>
        {categoryOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by status"
        value={status}
        onChange={(event) =>
          onStatusChange(statusOptions.find((option) => option === event.target.value) ?? 'all')
        }
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
