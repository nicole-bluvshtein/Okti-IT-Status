import type { ServiceWithStatus } from '../types'
import ServiceCard from './ServiceCard'

type ServiceListProps = {
  services: ServiceWithStatus[]
}

function ServiceList({ services }: ServiceListProps) {
  return (
    <ul className="service-list">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  )
}

export default ServiceList
