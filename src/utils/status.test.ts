import { describe, it, expect } from 'vitest'
import { toServiceStatus } from './status'

describe('toServiceStatus', () => {
  it('returns operational when the indicator is "none"', () => {
    expect(toServiceStatus('none')).toBe('operational')
  })

  it('returns degraded when the indicator is "minor"', () => {
    expect(toServiceStatus('minor')).toBe('degraded')
  })

  it('returns degraded during maintenance', () => {
    expect(toServiceStatus('maintenance')).toBe('degraded')
  })

  it('returns down when the indicator is "major"', () => {
    expect(toServiceStatus('major')).toBe('down')
  })

  it('returns down when the indicator is "critical"', () => {
    expect(toServiceStatus('critical')).toBe('down')
  })

  it('returns degraded for an unknown indicator, never operational', () => {
    expect(toServiceStatus('something-new')).toBe('degraded')
  })
})
