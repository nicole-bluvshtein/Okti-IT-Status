import type { ProblemReport } from '../types'

// The name the reports are saved under in localStorage.
export const STORAGE_KEY = 'oktopost-it-status:reports'

// Only the two localStorage functions we use. This lets the tests pass in a fake storage.
export type ReportStorage = Pick<Storage, 'getItem' | 'setItem'>

// Returns an error message, or null if the report is OK to save.
export function validateReport(serviceId: string, description: string): string | null {
  if (serviceId === '') return 'Please choose a service.'
  if (description.trim().length < 5) return 'Please describe the problem (at least 5 characters).'
  return null
}

// Reads the saved reports. If nothing is saved, or the saved text is broken, returns an empty list.
export function loadReports(storage: ReportStorage): ProblemReport[] {
  const saved = storage.getItem(STORAGE_KEY)
  if (saved === null) return []

  try {
    const parsed: ProblemReport[] = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Saves the reports. localStorage can only hold text, so we turn the list into JSON text first.
export function saveReports(storage: ReportStorage, reports: ProblemReport[]): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(reports))
}
