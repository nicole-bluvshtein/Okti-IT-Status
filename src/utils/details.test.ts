import { describe, it, expect } from 'vitest'
import { getTopLevelComponents, getOpenIncidents, getRecentHistory } from './details'
import type { StatuspageComponent, StatuspageIncident } from '../types'

// Helper: builds a test incident, so each test only writes the fields it cares about.
function incident(id: string, status: string, createdAt: string): StatuspageIncident {
  return { id, name: `Incident ${id}`, status, impact: 'minor', created_at: createdAt, shortlink: '' }
}

const sampleIncidents: StatuspageIncident[] = [
  incident('old', 'resolved', '2026-01-01T10:00:00Z'),
  incident('now', 'investigating', '2026-10-30T10:00:00Z'),
  incident('new', 'postmortem', '2026-10-20T10:00:00Z'),
  incident('mid', 'resolved', '2026-05-01T10:00:00Z'),
]

describe('getTopLevelComponents', () => {
  it('keeps components without a group_id, whether it is null or missing', () => {
    const components: StatuspageComponent[] = [
      { id: 'a', name: 'API', status: 'operational', group_id: null },
      { id: 'b', name: 'Tel Aviv data center', status: 'operational', group_id: 'g1' },
      { id: 'c', name: 'Chat', status: 'operational' },
    ]
    expect(getTopLevelComponents(components).map((c) => c.id)).toEqual(['a', 'c'])
  })
})

describe('getOpenIncidents', () => {
  it('returns only incidents that are not resolved or postmortem', () => {
    expect(getOpenIncidents(sampleIncidents).map((i) => i.id)).toEqual(['now'])
  })

  it('returns an empty list when everything is resolved', () => {
    expect(getOpenIncidents([incident('x', 'resolved', '2026-01-01T10:00:00Z')])).toEqual([])
  })
})

describe('getRecentHistory', () => {
  it('returns finished incidents sorted newest first', () => {
    expect(getRecentHistory(sampleIncidents).map((i) => i.id)).toEqual(['new', 'mid', 'old'])
  })

  it('returns at most the given limit', () => {
    expect(getRecentHistory(sampleIncidents, 2).map((i) => i.id)).toEqual(['new', 'mid'])
  })

  it('does not include open incidents', () => {
    expect(getRecentHistory(sampleIncidents).map((i) => i.id)).not.toContain('now')
  })
})
