import { services } from '../data/services'
import type { ProblemReport } from '../types'

type ReportListProps = {
  reports: ProblemReport[]
  onRemove: (id: string) => void
}

function ReportList({ reports, onRemove }: ReportListProps) {
  if (reports.length === 0) {
    return <p className="muted">No problems reported yet.</p>
  }

  return (
    <ul className="report-list">
      {reports.map((report) => {
        // Find the service's name from its id in the config.
        const service = services.find((item) => item.id === report.serviceId)

        return (
          <li key={report.id} className="report-row">
            <div>
              <strong>{service ? service.name : 'Unknown service'}</strong>
              <p className="report-description">{report.description}</p>
              <span className="muted">{new Date(report.createdAt).toLocaleString('en-GB')}</span>
            </div>
            <button type="button" className="button-secondary" onClick={() => onRemove(report.id)}>
              Resolved
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ReportList
