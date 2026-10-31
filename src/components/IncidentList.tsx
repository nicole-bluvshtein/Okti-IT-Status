import type { StatuspageIncident } from '../types'

type IncidentListProps = {
  incidents: StatuspageIncident[]
  emptyMessage: string
}

function IncidentList({ incidents, emptyMessage }: IncidentListProps) {
  if (incidents.length === 0) {
    return <p className="muted">{emptyMessage}</p>
  }

  return (
    <ul className="incident-list">
      {incidents.map((incident) => (
        <li key={incident.id} className="incident-row">
          <a href={incident.shortlink} target="_blank" rel="noreferrer">
            {incident.name}
          </a>
          <span className="muted">
            {new Date(incident.created_at).toLocaleDateString('en-GB')} · Impact: {incident.impact}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default IncidentList
