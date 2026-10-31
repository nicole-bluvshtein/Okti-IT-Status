import type { WikipediaSummary } from '../types'

// Fetches the first paragraph of a Wikipedia article.
export async function fetchWikipediaSummary(title: string): Promise<WikipediaSummary> {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)

  if (!response.ok) {
    throw new Error(`Wikipedia "${title}": HTTP ${response.status}`)
  }

  const data: WikipediaSummary = await response.json()
  return data
}
