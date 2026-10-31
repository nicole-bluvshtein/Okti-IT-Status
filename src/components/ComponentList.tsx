import type { StatuspageComponent } from '../types'
import { toComponentStatus } from '../utils/status'
import StatusBadge from './StatusBadge'

type ComponentListProps = {
  components: StatuspageComponent[]
}

function ComponentList({ components }: ComponentListProps) {
  if (components.length === 0) {
    return <p className="muted">No components listed.</p>
  }

  return (
    <ul className="component-list">
      {components.map((component) => (
        <li key={component.id} className="component-row">
          <span>{component.name}</span>
          <StatusBadge status={toComponentStatus(component.status)} />
        </li>
      ))}
    </ul>
  )
}

export default ComponentList
