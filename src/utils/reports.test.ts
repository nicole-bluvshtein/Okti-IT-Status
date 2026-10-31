import { describe, it, expect } from 'vitest'
import { STORAGE_KEY, loadReports, saveReports, validateReport, type ReportStorage } from './reports'
import type { ProblemReport } from '../types'

// A fake localStorage that keeps the data in a plain object, so the tests don't need a browser.
function fakeStorage(initial: Record<string, string> = {}): ReportStorage {
  const data = { ...initial }
  return {
    getItem: (key) => data[key] ?? null,
    setItem: (key, value) => {
      data[key] = value
    },
  }
}

const report: ProblemReport = { id: '1', serviceId: 'jira', description: 'Pages do not load', createdAt: '2026-10-31T09:00:00Z' }

describe('validateReport', () => {
  it('asks to choose a service when none is chosen', () => {
    expect(validateReport('', 'Pages do not load')).toBe('Please choose a service.')
  })

  it('rejects a description that is too short, even if it is only spaces', () => {
    expect(validateReport('jira', '       ')).not.toBeNull()
  })

  it('accepts a valid report', () => {
    expect(validateReport('jira', 'Pages do not load')).toBeNull()
  })
})

describe('loadReports and saveReports', () => {
  it('returns an empty list when nothing was saved yet', () => {
    expect(loadReports(fakeStorage())).toEqual([])
  })

  it('loads exactly what was saved', () => {
    const storage = fakeStorage()
    saveReports(storage, [report])
    expect(loadReports(storage)).toEqual([report])
  })

  it('returns an empty list instead of crashing when the saved text is broken', () => {
    expect(loadReports(fakeStorage({ [STORAGE_KEY]: '{not json' }))).toEqual([])
  })

  it('returns an empty list when the saved value is not a list', () => {
    expect(loadReports(fakeStorage({ [STORAGE_KEY]: '"hello"' }))).toEqual([])
  })
})
