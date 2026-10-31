import { describe, it, expect } from 'vitest'
import { buildCompanyStats, countRecentIncidents, getMostIncidents, sortByIncidents, type CompanyStats } from './stats'
import type { Service, StatuspageIncident } from '../types'

// A fixed "now", so the tests give the same result on any day.
const now = new Date('2026-10-31T00:00:00Z')

function incident(createdAt: string, impact = 'minor'): StatuspageIncident {
  return { id: createdAt, name: 'Test incident', status: 'resolved', impact, created_at: createdAt, shortlink: '' }
}

const service: Service = { id: 'github', name: 'GitHub', category: 'Dev Tools', statusPageUrl: '', apiType: 'statuspage', domain: '', wikipediaTitle: '' }

function stats(id: string, count: number): CompanyStats {
  return { service: { ...service, id, name: id }, count, seriousCount: 0, isPartial: false, componentCount: 0 }
}

describe('countRecentIncidents', () => {
  it('counts only incidents inside the window', () => {
    const incidents = [incident('2026-10-30T10:00:00Z'), incident('2026-10-05T10:00:00Z'), incident('2026-08-01T10:00:00Z')]
    expect(countRecentIncidents(incidents, 30, now).count).toBe(2)
  })

  it('counts major and critical incidents as serious', () => {
    const incidents = [incident('2026-10-30T10:00:00Z', 'major'), incident('2026-10-29T10:00:00Z', 'critical'), incident('2026-10-28T10:00:00Z', 'minor')]
    expect(countRecentIncidents(incidents, 30, now).seriousCount).toBe(2)
  })

  it('marks the count as partial when even the oldest incident is inside the window', () => {
    const incidents = [incident('2026-10-30T10:00:00Z'), incident('2026-10-20T10:00:00Z')]
    expect(countRecentIncidents(incidents, 30, now).isPartial).toBe(true)
  })

  it('does not mark it partial when the history reaches back before the window', () => {
    const incidents = [incident('2026-10-30T10:00:00Z'), incident('2026-06-01T10:00:00Z')]
    expect(countRecentIncidents(incidents, 30, now).isPartial).toBe(false)
  })

  it('returns zero and not partial when there are no incidents', () => {
    expect(countRecentIncidents([], 30, now)).toEqual({ count: 0, seriousCount: 0, isPartial: false })
  })
})

describe('buildCompanyStats', () => {
  it('counts only top-level components', () => {
    const components = [
      { id: 'a', name: 'API', status: 'operational', group_id: null },
      { id: 'b', name: 'Data center', status: 'operational', group_id: 'a' },
    ]
    expect(buildCompanyStats(service, components, [], 30, now).componentCount).toBe(1)
  })
})

describe('sortByIncidents and getMostIncidents', () => {
  it('sorts companies from most to fewest incidents', () => {
    const list = [stats('jira', 2), stats('cloudflare', 49), stats('github', 25)]
    expect(sortByIncidents(list).map((item) => item.service.id)).toEqual(['cloudflare', 'github', 'jira'])
  })

  it('finds the company with the most incidents', () => {
    expect(getMostIncidents([stats('jira', 2), stats('cloudflare', 49)])?.service.id).toBe('cloudflare')
  })

  it('returns null when there are no companies', () => {
    expect(getMostIncidents([])).toBeNull()
  })
})
