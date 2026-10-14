# PRD — Oktopost IT Status Board

## 1. Pitch
Oktopost IT Status Board shows, in one place, whether the external services Oktopost depends on (GitHub, Atlassian, Cloudflare, OpenAI and more) are working right now. Employees can also report a problem.

## 2. Who it's for
- **The IT manager:** when an employee says "X isn't working", they can see at a glance whether the vendor has an outage or the problem is on our side.
- **Employees:** they can check a service's status themselves before opening a request, and report a problem in one click.

## 3. Pages

| Page | Address | What the user sees and does |
|---|---|---|
| Dashboard | `/` | An overall banner ("All systems operational" or "2 services have issues"). Counts of services that are working, degraded and down. The number of problems reported. |
| Services | `/services` | A card for each service with its name, category and a 🟢/🟡/🔴 marker. Search by name, plus filters by category and by status. Clicking a card opens its details page. |
| Service details | `/services/:id` | The company logo and description (from Wikipedia), its category, each component with its own status (for example GitHub → Actions, Pages…), open incidents, recent incident history, and a link to the official status page. |
| Statistics | `/stats` | A comparison between the companies: incidents per company, which company had the most incidents, and how many components each one has. |
| Report a problem | `/report` | A form where you choose a service and write a description. The report is saved in `localStorage` and appears in a list of reports on the same page. |
| Not found | any other address | A "page not found" message with a link back to the dashboard. |

A navigation menu at the top (`NavLink`) links to Dashboard, Services, Statistics and Report a problem.

## 4. Must-have features
1. Live status for each service, fetched from its public status page, with loading and error states on screen.
2. Search by name and filter by category and by status on the Services page.
3. A details page for each service at its own address, with its components and incidents plus a Wikipedia description.
4. A dashboard and a statistics page, both calculated from the live data.
5. A "report a problem" form, saved in `localStorage`.

## 5. Acceptance criteria
- When I open `/services`, I see a "Loading…" message, then a card for each of the 8 services with a colored status marker.
- When I type "git" in the search box, I see only GitHub. When I choose the "AI" category, I see only OpenAI, Claude and Clari.
- When I click the GitHub card, the address changes to `/services/github` and I see GitHub's logo, description, components and recent incidents.
- When a status page can't be reached, I see an error message for that service instead of a crash.
- When I submit a report on `/report`, it appears in the reports list, the dashboard's report count goes up by 1, and the report is still there after I refresh the page.
- When I go to an address that doesn't exist, I see the "page not found" page.

## 6. Not now

| Idea | Why not |
|---|---|
| Shared tickets, task and project management | Needs a server and a database. Reports are only saved in this browser (`localStorage`). |
| Partner / HOT internet providers | No free public API. Downdetector's API is paid and its site blocks scraping. |
| Office network monitoring (Omada) | No public status page, and it needs access to the internal network. |
| AWS | Its status page blocks requests from the browser (CORS). |

## 7. Data
- **Service list:** a config file in our code (`id`, name, category, status-page address). This is like the course's "weather in my cities" idea. **Statuses always come live from the APIs.**
- **Status pages (Statuspage format):** `https://<status-page>/api/v2/summary.json` for the overall status, components and open incidents, and `/api/v2/incidents.json` for incident history.
- **Salesforce:** `https://api.status.salesforce.com/v1/…` uses a different format, so an adapter converts it into ours.
- **Wikipedia:** `https://en.wikipedia.org/api/rest_v1/page/summary/<name>` for the description and logo.
- **Status mapping:** `none` → 🟢 Operational · `minor` → 🟡 Degraded · `major` / `critical` → 🔴 Down.
- **Fields on the list:** name, category, status marker.
- **Fields on the details page:** logo, description, components with their status, open incidents, incident history (title, impact, date), and a link to the official status page.

## 8. More docs
- [`docs/architecture.md`](docs/architecture.md): the component and page structure and how data flows between them. We'll write it once we have code.
