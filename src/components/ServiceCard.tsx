import { Link } from 'react-router'
import type { ServiceStatus, ServiceWithStatus } from '../types'

type ServiceCardProps = {
  service: ServiceWithStatus
}

const statusLabels: Record<ServiceStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link to={`/services/${service.id}`} className="service-card">
      <span className={`status-dot status-${service.status}`} aria-hidden="true" />
      <div>
        <h2 className="service-name">{service.name}</h2>
        <p className="service-category">{service.category}</p>
      </div>
      <p className="service-status">{statusLabels[service.status]}</p>
    </Link>
  )
}

export default ServiceCard
