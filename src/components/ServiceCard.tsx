import { Link } from 'react-router'
import type { ServiceWithStatus } from '../types'
import ServiceLogo from './ServiceLogo'
import StatusBadge from './StatusBadge'

type ServiceCardProps = {
  service: ServiceWithStatus
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link to={`/services/${service.id}`} className="service-card">
      <ServiceLogo domain={service.domain} name={service.name} size={32} />
      <div>
        <h2 className="service-name">{service.name}</h2>
        <p className="service-category">{service.category}</p>
      </div>
      <StatusBadge status={service.status} />
    </Link>
  )
}

export default ServiceCard
