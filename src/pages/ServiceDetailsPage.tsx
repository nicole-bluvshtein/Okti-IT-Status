import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { services } from '../data/services'
import { fetchIncidents, fetchSummary } from '../api/statuspage'
import { fetchWikipediaSummary } from '../api/wikipedia'
import { toServiceStatus } from '../utils/status'
import { getOpenIncidents, getRecentHistory, getTopLevelComponents } from '../utils/details'
import ServiceLogo from '../components/ServiceLogo'
import StatusBadge from '../components/StatusBadge'
import ComponentList from '../components/ComponentList'
import IncidentList from '../components/IncidentList'
import type { RequestState, StatusResult, StatuspageIncident, StatuspageSummary, WikipediaSummary } from '../types'

function ServiceDetailsPage() {
  // The ":id" part of the address, for example "github" in /services/github
  const { id } = useParams()
  const service = services.find((item) => item.id === id)

  // Three separate requests, each with its own state.
  const [summary, setSummary] = useState<RequestState<StatuspageSummary>>({ state: 'loading' })
  const [incidents, setIncidents] = useState<RequestState<StatuspageIncident[]>>({ state: 'loading' })
  const [wiki, setWiki] = useState<RequestState<WikipediaSummary>>({ state: 'loading' })

  useEffect(() => {
    if (!service) return

    // If the page closes before an answer arrives, we ignore that answer.
    let ignore = false

    if (service.apiType === 'statuspage') {
      fetchSummary(service)
        .then((data) => { if (!ignore) setSummary({ state: 'success', data }) })
        .catch(() => { if (!ignore) setSummary({ state: 'error' }) })

      fetchIncidents(service)
        .then((data) => { if (!ignore) setIncidents({ state: 'success', data }) })
        .catch(() => { if (!ignore) setIncidents({ state: 'error' }) })
    }

    fetchWikipediaSummary(service.wikipediaTitle)
      .then((data) => { if (!ignore) setWiki({ state: 'success', data }) })
      .catch(() => { if (!ignore) setWiki({ state: 'error' }) })

    // Cleanup: React runs this when the page closes.
    return () => {
      ignore = true
    }
  }, [service])

  if (!service) {
    return (
      <>
        <h1>Service not found</h1>
        <Link to="/services">Back to services</Link>
      </>
    )
  }

  const isConnected = service.apiType === 'statuspage'

  // The status shown at the top, next to the name.
  let overallStatus: StatusResult = 'not-connected'
  if (isConnected) {
    overallStatus = summary.state === 'success' ? toServiceStatus(summary.data.status.indicator) : summary.state
  }

  return (
    <>
      <Link to="/services">← Back to services</Link>

      <header className="details-header">
        <ServiceLogo domain={service.domain} name={service.name} />
        <div>
          <h1>{service.name}</h1>
          <p className="service-category">{service.category}</p>
        </div>
        <StatusBadge status={overallStatus} />
      </header>

      <section className="details-section">
        <h2>About</h2>
        {wiki.state === 'loading' && <p className="muted">Loading description…</p>}
        {wiki.state === 'error' && <p className="muted">No description available.</p>}
        {wiki.state === 'success' && (
          <>
            <p>{wiki.data.extract}</p>
            <p className="muted">Source: Wikipedia – {wiki.data.title}</p>
          </>
        )}
      </section>

      {isConnected ? (
        <>
          <section className="details-section">
            <h2>Components</h2>
            {summary.state === 'loading' && <p className="muted">Loading components…</p>}
            {summary.state === 'error' && <p className="error-text">Couldn't load components.</p>}
            {summary.state === 'success' && (
              <ComponentList components={getTopLevelComponents(summary.data.components)} />
            )}
          </section>

          <section className="details-section">
            <h2>Open incidents</h2>
            {incidents.state === 'loading' && <p className="muted">Loading incidents…</p>}
            {incidents.state === 'error' && <p className="error-text">Couldn't load incidents.</p>}
            {incidents.state === 'success' && (
              <IncidentList incidents={getOpenIncidents(incidents.data)} emptyMessage="No open incidents right now 🎉" />
            )}
          </section>

          <section className="details-section">
            <h2>Recent incidents</h2>
            {incidents.state === 'loading' && <p className="muted">Loading incidents…</p>}
            {incidents.state === 'error' && <p className="error-text">Couldn't load incidents.</p>}
            {incidents.state === 'success' && (
              <IncidentList incidents={getRecentHistory(incidents.data)} emptyMessage="No past incidents." />
            )}
          </section>
        </>
      ) : (
        <p className="muted">Live status for {service.name} is not connected yet.</p>
      )}

      <a href={service.statusPageUrl} target="_blank" rel="noreferrer">
        Official status page ↗
      </a>
    </>
  )
}

export default ServiceDetailsPage
