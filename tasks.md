# Tasks — Oktopost IT Status Board

One task at a time, in this order. After each task: `npm test`, check in the browser, commit.
What each page should do is described in [PRD.md](PRD.md).

## 1. List from local data
A `Service` type, a config file with the 8 services, a local JSON file with sample statuses, and a `ServiceCard` component. The list is built with `map`.
**Done when:** the app shows 8 cards (name, category, colored marker) with no network calls.

## 2. Routing
Install React Router. A `NavBar` with `NavLink`s and placeholder pages: Dashboard, Services, Service details, Statistics, Report and 404.
**Done when:** the menu changes the address, clicking a card opens `/services/github` and shows its name (read with `useParams`), and an unknown address shows the 404 page.

## 3. Live statuses
`fetch` each service's `summary.json` inside `useEffect`, plus a function that maps `indicator` to our status. Loading and error states for each service.
**Done when:** I see "Loading…" and then live markers. If I break one address on purpose, only that card shows an error.

## 4. First tests
Install Vitest and `@vitest/ui`, add `test` and `test:ui` scripts, and write tests for the status mapping.
**Done when:** `npm test` passes at least 5 tests, and `npm run test:ui` shows them in the browser.

## 5. Search and filter
A `SearchBar` and filters by category and status, plus a filter function with tests.
**Done when:** "git" shows only GitHub, "AI" shows only OpenAI, Claude and Clari, and the new tests pass.

## 6. Details page
Components, open incidents, incident history (`incidents.json`), and a Wikipedia description and logo. Each request has its own loading and error state.
**Done when:** `/services/github` shows everything from the PRD, and a bad id shows "service not found".

## 7. Dashboard
An overall banner and counts of working, degraded and down services.
**Done when:** the counts match what the Services page shows.

## 8. Statistics
Incidents per company, the company with the most incidents, and the number of components. The calculation goes in a separate function with tests.
**Done when:** the page shows the comparison and the tests pass.

## 9. Report a problem
A form, saving to `localStorage`, a list of reports, and the count on the dashboard.
**Done when:** a new report appears in the list, the dashboard count goes up, and it's still there after a refresh.

## 10. Salesforce
An adapter that converts Salesforce's format into ours, with a test.
**Done when:** Salesforce appears in the list with a live status and the adapter test passes.

## 11. Finishing
Styling for narrow screens, `README.md` and `docs/architecture.md`.
**Done when:** the app looks good at 375px wide, `npm run build` and `npm test` pass, and the README explains how to run the app and the tests and which APIs it uses.
