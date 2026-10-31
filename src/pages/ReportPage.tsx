import ReportForm from '../components/ReportForm'
import ReportList from '../components/ReportList'
import { useReports } from '../hooks/useReports'

function ReportPage() {
  const { reports, addReport, removeReport } = useReports()

  return (
    <>
      <h1>Report a problem</h1>
      <p className="muted">Reports are saved in this browser only.</p>

      <ReportForm onSubmit={addReport} />

      <h2>Reported problems ({reports.length})</h2>
      <ReportList reports={reports} onRemove={removeReport} />
    </>
  )
}

export default ReportPage
