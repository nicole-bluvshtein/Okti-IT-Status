import { Link, useParams } from 'react-router'
import { services } from '../data/services'

function ServiceDetailsPage() {
  // The ":id" part of the address, for example "github" in /services/github
  const { id } = useParams()
  const service = services.find((item) => item.id === id)

  if (!service) {
    return (
      <>
        <h1>Service not found</h1>
        <Link to="/services">Back to services</Link>
      </>
    )
  }

  return (
    <>
      <Link to="/services">← Back to services</Link>
      <h1>{service.name}</h1>
      <p className="service-category">{service.category}</p>
    </>
  )
}

export default ServiceDetailsPage
