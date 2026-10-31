# Oktopost IT Status Board

When someone at Oktopost says "Jira isn't working", this app shows at a glance whether the vendor has an outage or the problem is on our side.
It brings the live status of the external services we depend on into one place, and lets employees report a problem.

Built with React, TypeScript, Vite and React Router. Front-end only: no server and no database.
Every status comes live from the vendors' public status APIs.

## Pages

| Page | Address | What it does |
|---|---|---|
| Dashboard | `/` | Overall banner, counts of working, degraded and down services, and the number of reported problems. Each count is a link. |
| Services | `/services` | All 8 services with a live status. Search by name, filter by category and status. Filters are kept in the address, for example `/services?status=down`. |
| Service details | `/services/:id` | Logo, description, every component's status, open incidents and the 10 most recent incidents. |
| Statistics | `/stats` | Incidents per company in the last 30 days, the company with the most incidents, and the number of components. |
| Report a problem | `/report` | A form for reporting a problem with a service. Reports are saved in this browser (`localStorage`). |
| Not found | any other address | A "page not found" message with a link back to the dashboard. |

## Running the app

You need Node.js 22.12 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To build for production: `npm run build`.

## Tests

56 unit tests with Vitest, covering the app's logic: converting API statuses, search and filters, incidents, statistics, saved reports and the Salesforce adapter.

```bash
npm test          # runs all the tests once in the terminal
npm run test:ui   # opens Vitest UI in the browser
```

## APIs

All free and with no key.

| What | API |
|---|---|
| Status, components and incidents for GitHub, Jira, Cloudflare, Twilio, OpenAI, Claude and Clari | Statuspage API: `<status page>/api/v2/summary.json` and `<status page>/api/v2/incidents.json` |
| Status, products and incidents for Salesforce | Salesforce Trust API: `https://api.status.salesforce.com/v1/products`, `/incidents/active`, `/incidents` |
| Company descriptions | Wikipedia REST API: `https://en.wikipedia.org/api/rest_v1/page/summary/<title>` |
| Logos | Google favicon service: `https://www.google.com/s2/favicons?domain=<domain>&sz=128` |

The list of monitored services (name, category, status-page address) lives in `src/data/services.ts`.
To monitor another service that uses Statuspage, add one line there.

## Project documents

- [PRD.md](PRD.md): what the app does and why, and the acceptance criteria
- [tasks.md](tasks.md): the build plan, one task at a time
- [docs/architecture.md](docs/architecture.md): how the code is organized and how data flows through it
- [PROMPTS.md](PROMPTS.md): every prompt sent to the AI agent while building the app, recorded automatically
