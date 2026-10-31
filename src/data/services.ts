import type { Service } from '../types'

// The list of services we monitor. Their statuses always come from the APIs.
export const services: Service[] = [
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', statusPageUrl: 'https://status.salesforce.com', apiType: 'salesforce' },
  { id: 'github', name: 'GitHub', category: 'Dev Tools', statusPageUrl: 'https://www.githubstatus.com', apiType: 'statuspage' },
  { id: 'jira', name: 'Jira', category: 'Dev Tools', statusPageUrl: 'https://jira-software.status.atlassian.com', apiType: 'statuspage' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'Network', statusPageUrl: 'https://www.cloudflarestatus.com', apiType: 'statuspage' },
  { id: 'twilio', name: 'Twilio', category: 'Network', statusPageUrl: 'https://status.twilio.com', apiType: 'statuspage' },
  { id: 'openai', name: 'OpenAI', category: 'AI', statusPageUrl: 'https://status.openai.com', apiType: 'statuspage' },
  { id: 'claude', name: 'Claude', category: 'AI', statusPageUrl: 'https://status.claude.com', apiType: 'statuspage' },
  { id: 'clari', name: 'Clari', category: 'AI', statusPageUrl: 'https://clari.statuspage.io', apiType: 'statuspage' },
]
