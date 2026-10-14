import type { Service } from '../types'

// The list of services we monitor. Their statuses always come from the APIs.
export const services: Service[] = [
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', statusPageUrl: 'https://status.salesforce.com' },
  { id: 'github', name: 'GitHub', category: 'Dev Tools', statusPageUrl: 'https://www.githubstatus.com' },
  { id: 'atlassian', name: 'Atlassian', category: 'Dev Tools', statusPageUrl: 'https://status.atlassian.com' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'Network', statusPageUrl: 'https://www.cloudflarestatus.com' },
  { id: 'twilio', name: 'Twilio', category: 'Network', statusPageUrl: 'https://status.twilio.com' },
  { id: 'openai', name: 'OpenAI', category: 'AI', statusPageUrl: 'https://status.openai.com' },
  { id: 'claude', name: 'Claude', category: 'AI', statusPageUrl: 'https://status.claude.com' },
  { id: 'clari', name: 'Clari', category: 'AI', statusPageUrl: 'https://clari.statuspage.io' },
]
