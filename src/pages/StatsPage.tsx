import { useEffect, useState } from 'react'
import { services } from '../data/services'
import { fetchIncidents, fetchSummary } from '../api/statuspage'
import { buildCompanyStats, getMostIncidents, sortByIncidents, type CompanyStats } from '../utils/stats'
import StatsList from '../components/StatsList'
import type { RequestState } from '../types'

// How many days back the statistics look.
const DAYS = 30

function initialResults(): Record<string, RequestState<CompanyStats>> {
  const result: Record<string, RequestState<CompanyStats>> = {}
  for (const service of services) {
    result[service.id] = { state: 'loading' }
  }
  return result
}

function StatsPage() {
  const [results, setResults] = useState<Record<string, RequestState<CompanyStats>>>(initialResults)

  useEffect(() => {
    let ignore = false
    const now = new Date()

    for (const service of services) {
      // Both requests for one company run together, and we continue when both have arrived.
      Promise.all([fetchSummary(service), fetchIncidents(service)])
        .then(([summary, incidents]) => {
          const stats = buildCompanyStats(service, summary.components, incidents, DAYS, now)
          if (!ignore) setResults((prev) => ({ ...prev, [service.id]: { state: 'success', data: stats } }))
        })
        .catch(() => {
          if (!ignore) setResults((prev) => ({ ...prev, [service.id]: { state: 'error' } }))
        })
    }

    return () => {
      ignore = true
    }
  }, [])

  // Split the results into the three states.
  const loaded: CompanyStats[] = []
  const failed: string[] = []
  for (const service of services) {
    const result = results[service.id]
    if (result.state === 'success') loaded.push(result.data)
    if (result.state === 'error') failed.push(service.name)
  }
  const isLoading = loaded.length + failed.length < services.length

  const sorted = sortByIncidents(loaded)
  const top = getMostIncidents(loaded)

  return (
    <>
      <h1>Statistics</h1>
      <p className="muted">Incidents reported on each company's status page in the last {DAYS} days.</p>

      {isLoading && (
        <p className="muted">
          Loading statistics… ({loaded.length + failed.length} of {services.length})
        </p>
      )}

      {!isLoading && top && (
        <div className="highlight-card">
          Most incidents in the last {DAYS} days: <strong>{top.service.name}</strong> ({top.count}
          {top.isPartial ? '+' : ''})
        </div>
      )}

      {sorted.length > 0 && <StatsList stats={sorted} />}

      {failed.length > 0 && <p className="error-text">Couldn't load statistics for: {failed.join(', ')}</p>}

      {sorted.some((item) => item.isPartial) && (
        <p className="muted">"+" means the status page only shares its latest incidents, so the real number may be higher.</p>
      )}
    </>
  )
}

export default StatsPage
