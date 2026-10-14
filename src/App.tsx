import ServiceList from './components/ServiceList'
import { services } from './data/services'
import sampleStatuses from './data/sample-statuses.json'
import type { ServiceStatus, ServiceWithStatus } from './types'
import './App.css'

// Temporary: until Task 3, statuses come from a local sample file instead of the APIs.
const statuses = sampleStatuses as { id: string; status: ServiceStatus }[]

// Join each service from the config with its status.
const servicesWithStatus: ServiceWithStatus[] = services.map((service) => {
  const found = statuses.find((item) => item.id === service.id)
  return { ...service, status: found ? found.status : 'down' }
})

function App() {
  return (
    <main className="app">
      <h1>Oktopost IT Status</h1>
      <ServiceList services={servicesWithStatus} />
    </main>
  )
}

export default App
