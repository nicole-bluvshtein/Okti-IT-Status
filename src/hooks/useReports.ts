import { useState } from 'react'
import type { ProblemReport } from '../types'
import { loadReports, saveReports } from '../utils/reports'

// The list of reported problems, kept in state and saved to localStorage on every change.
export function useReports() {
  // The arrow function means localStorage is read only once, on the first render.
  const [reports, setReports] = useState<ProblemReport[]>(() => loadReports(localStorage))

  function addReport(serviceId: string, description: string) {
    const report: ProblemReport = {
      id: crypto.randomUUID(),
      serviceId,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    }
    const next = [report, ...reports]
    setReports(next)
    saveReports(localStorage, next)
  }

  function removeReport(id: string) {
    const next = reports.filter((report) => report.id !== id)
    setReports(next)
    saveReports(localStorage, next)
  }

  return { reports, addReport, removeReport }
}
