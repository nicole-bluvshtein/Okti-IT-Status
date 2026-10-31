import ServiceList from '../components/ServiceList'
import StatCard from '../components/StatCard'
import { useServiceStatuses } from '../hooks/useServiceStatuses'
import { useReports } from '../hooks/useReports'
import { countStatuses, getBannerMessage, getOverallStatus } from '../utils/dashboard'

function DashboardPage() {
  const servicesWithStatus = useServiceStatuses()
  const { reports } = useReports()
  const counts = countStatuses(servicesWithStatus)
  const overall = getOverallStatus(counts)

  // The services worth looking at: degraded or down.
  const problemServices = servicesWithStatus.filter(
    (service) => service.status === 'degraded' || service.status === 'down',
  )

  return (
    <>
      <h1>Dashboard</h1>

      <div className={`banner banner-${overall}`}>{getBannerMessage(counts)}</div>

      <div className="stat-grid">
        <StatCard label="Operational" value={counts.operational} status="operational" />
        <StatCard label="Degraded" value={counts.degraded} status="degraded" />
        <StatCard label="Down" value={counts.down} status="down" />
        <StatCard label="Reported problems" value={reports.length} />
      </div>

      {counts.error > 0 && (
        <p className="error-text">{counts.error} service(s) couldn't be checked.</p>
      )}

      {problemServices.length > 0 && (
        <>
          <h2>Services with issues</h2>
          <ServiceList services={problemServices} />
        </>
      )}
    </>
  )
}

export default DashboardPage
