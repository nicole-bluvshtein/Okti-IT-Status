import { Link } from 'react-router'
import type { CompanyStats } from '../utils/stats'
import ServiceLogo from './ServiceLogo'

type StatsListProps = {
  stats: CompanyStats[]
}

function StatsList({ stats }: StatsListProps) {
  // The longest bar belongs to the company with the most incidents. "1" avoids dividing by zero.
  const maxCount = Math.max(1, ...stats.map((item) => item.count))

  return (
    <ul className="stats-list">
      {stats.map((item) => (
        <li key={item.service.id} className="stats-row">
          <Link to={`/services/${item.service.id}`} className="stats-name">
            <ServiceLogo domain={item.service.domain} name={item.service.name} size={24} />
            {item.service.name}
          </Link>
          <div className="stats-bar-track">
            <div className="stats-bar" style={{ width: `${(item.count / maxCount) * 100}%` }} />
          </div>
          <span className="stats-numbers">
            <strong>
              {item.count}
              {item.isPartial ? '+' : ''}
            </strong>{' '}
            incidents · {item.seriousCount} major/critical · {item.componentCount} components
          </span>
        </li>
      ))}
    </ul>
  )
}

export default StatsList
