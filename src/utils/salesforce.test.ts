import { describe, it, expect } from 'vitest'
import { getSeverity, toStatuspageComponent, toStatuspageIncident, toStatuspageSummary } from './salesforce'
import type { SalesforceIncident, SalesforceProduct } from '../types'

// Helper: a test incident. "changes" overrides only the fields a test cares about.
function sfIncident(changes: Partial<SalesforceIncident> = {}): SalesforceIncident {
  return {
    id: 123,
    status: 'Resolved',
    type: 'Degradation',
    createdAt: '2026-10-27T18:07:55Z',
    instanceKeys: ['NA123'],
    IncidentImpacts: [{ severity: 'minor' }],
    ...changes,
  }
}

function product(key: string, isActive: boolean, incidentCount: number): SalesforceProduct {
  return { key, name: key, isActive, incidentCount }
}

describe('getSeverity', () => {
  it('returns major when any impact is major', () => {
    expect(getSeverity(sfIncident({ IncidentImpacts: [{ severity: 'minor' }, { severity: 'major' }] }))).toBe('major')
  })

  it('returns none when there are no impacts', () => {
    expect(getSeverity(sfIncident({ IncidentImpacts: [] }))).toBe('none')
  })
})

describe('toStatuspageIncident', () => {
  it('converts a resolved Salesforce incident into our format', () => {
    expect(toStatuspageIncident(sfIncident())).toEqual({
      id: '123',
      name: 'Degradation on NA123',
      status: 'resolved',
      impact: 'minor',
      created_at: '2026-10-27T18:07:55Z',
      shortlink: 'https://status.salesforce.com/incidents/123',
    })
  })

  it('marks an incident that is not resolved as open', () => {
    expect(toStatuspageIncident(sfIncident({ status: 'Active' })).status).toBe('investigating')
  })

  it('counts the instances in the title when there are more than 3', () => {
    const incident = sfIncident({ type: 'Disruption', instanceKeys: ['NA1', 'NA2', 'NA3', 'NA4', 'NA5'] })
    expect(toStatuspageIncident(incident).name).toBe('Disruption on 5 instances')
  })
})

describe('toStatuspageSummary', () => {
  it('is operational with no active incidents, and skips inactive products', () => {
    const summary = toStatuspageSummary([product('Heroku', true, 0), product('Quip', false, 0)], [])
    expect(summary.status.indicator).toBe('none')
    expect(summary.components.map((component) => component.id)).toEqual(['Heroku'])
  })

  it('is major when an active incident is major', () => {
    const active = [sfIncident({ status: 'Active', IncidentImpacts: [{ severity: 'major' }] })]
    expect(toStatuspageSummary([], active).status.indicator).toBe('major')
  })

  it('marks a product with incidents as degraded', () => {
    expect(toStatuspageComponent(product('Tableau', true, 2)).status).toBe('degraded_performance')
  })
})
