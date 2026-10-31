import { describe, it, expect } from 'vitest'
import { filterServices, type ServiceFilters } from './filter'
import type { ServiceWithStatus } from '../types'

// A small, fixed list just for the tests, so the results never depend on the internet.
const sampleServices: ServiceWithStatus[] = [
  { id: 'github', name: 'GitHub', category: 'Dev Tools', statusPageUrl: '', apiType: 'statuspage', domain: '', wikipediaTitle: '', status: 'operational' },
  { id: 'jira', name: 'Jira', category: 'Dev Tools', statusPageUrl: '', apiType: 'statuspage', domain: '', wikipediaTitle: '', status: 'degraded' },
  { id: 'openai', name: 'OpenAI', category: 'AI', statusPageUrl: '', apiType: 'statuspage', domain: '', wikipediaTitle: '', status: 'down' },
  { id: 'claude', name: 'Claude', category: 'AI', statusPageUrl: '', apiType: 'statuspage', domain: '', wikipediaTitle: '', status: 'operational' },
]

const noFilters: ServiceFilters = { search: '', category: 'all', status: 'all' }

// Helper: run the filter and return only the names, so the checks are short to read.
function names(filters: ServiceFilters): string[] {
  return filterServices(sampleServices, filters).map((service) => service.name)
}

describe('filterServices', () => {
  it('returns every service when no filter is chosen', () => {
    expect(names(noFilters)).toEqual(['GitHub', 'Jira', 'OpenAI', 'Claude'])
  })

  it('finds services by name, ignoring upper/lower case and spaces', () => {
    expect(names({ ...noFilters, search: '  GIT ' })).toEqual(['GitHub'])
  })

  it('shows only the chosen category', () => {
    expect(names({ ...noFilters, category: 'AI' })).toEqual(['OpenAI', 'Claude'])
  })

  it('shows only the chosen status', () => {
    expect(names({ ...noFilters, status: 'operational' })).toEqual(['GitHub', 'Claude'])
  })

  it('combines search, category and status together', () => {
    expect(names({ search: 'o', category: 'AI', status: 'down' })).toEqual(['OpenAI'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(names({ ...noFilters, search: 'salesforce' })).toEqual([])
  })
})
