import { useState, type FormEvent } from 'react'
import { services } from '../data/services'
import { validateReport } from '../utils/reports'

type ReportFormProps = {
  onSubmit: (serviceId: string, description: string) => void
}

function ReportForm({ onSubmit }: ReportFormProps) {
  const [serviceId, setServiceId] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stops the browser from reloading the page, which is what a form does by default.
    event.preventDefault()

    const problem = validateReport(serviceId, description)
    if (problem) {
      setError(problem)
      setSaved(false)
      return
    }

    onSubmit(serviceId, description)
    setServiceId('')
    setDescription('')
    setError(null)
    setSaved(true)
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <label>
        Service
        <select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
          <option value="">Choose a service…</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        What's the problem?
        <textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="For example: Jira pages don't load since 10:00"
        />
      </label>

      {error && <p className="error-text">{error}</p>}
      {saved && <p className="success-text">Report saved ✓</p>}

      <button type="submit">Send report</button>
    </form>
  )
}

export default ReportForm
