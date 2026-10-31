import { describe, it, expect } from 'vitest'
import { countStatuses, getBannerMessage, getOverallStatus, type StatusCounts } from './dashboard'
import type { ServiceWithStatus, StatusResult } from '../types'

// Helper: builds a test service with only the status that matters.
function service(status: StatusResult): ServiceWithStatus {
  return { id: status, name: status, category: 'AI', statusPageUrl: '', apiType: 'statuspage', domain: '', wikipediaTitle: '', status }
}

const zero: StatusCounts = { operational: 0, degraded: 0, down: 0, error: 0, loading: 0 }

describe('countStatuses', () => {
  it('counts each status and skips services that are not connected', () => {
    const list = [service('operational'), service('operational'), service('down'), service('not-connected')]
    expect(countStatuses(list)).toEqual({ ...zero, operational: 2, down: 1 })
  })
})

describe('getOverallStatus', () => {
  it('is loading while any service is still loading', () => {
    expect(getOverallStatus({ ...zero, loading: 1, down: 2 })).toBe('loading')
  })

  it('is down when one service is down, even if others are only degraded', () => {
    expect(getOverallStatus({ ...zero, operational: 5, degraded: 2, down: 1 })).toBe('down')
  })

  it('is error, never operational, when services could not be checked (for example, no internet)', () => {
    expect(getOverallStatus({ ...zero, error: 7 })).toBe('error')
  })
})

describe('getBannerMessage', () => {
  it('says all systems operational when everything is fine', () => {
    expect(getBannerMessage({ ...zero, operational: 7 })).toBe('All systems operational')
  })

  it('uses the singular for one problem', () => {
    expect(getBannerMessage({ ...zero, operational: 6, down: 1 })).toBe('1 service has issues')
  })

  it('adds degraded and down services together', () => {
    expect(getBannerMessage({ ...zero, operational: 4, degraded: 2, down: 1 })).toBe('3 services have issues')
  })
})
