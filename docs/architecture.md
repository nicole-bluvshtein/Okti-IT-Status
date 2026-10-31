# Architecture

How the code is organized, and how data gets from the APIs to the screen.
For what the app does, see [PRD.md](../PRD.md).

## Folders

| Folder | What's inside | Example |
|---|---|---|
| `src/data/` | The config: which services we monitor | `services.ts` |
| `src/api/` | Functions that call the APIs with `fetch` | `statuspage.ts`, `salesforce.ts`, `wikipedia.ts` |
| `src/utils/` | Pure logic: no screen and no network, so it's easy to test. Each file has a `.test.ts` next to it. | `status.ts`, `filter.ts`, `stats.ts` |
| `src/hooks/` | Custom hooks that share state and logic between pages | `useServiceStatuses.ts`, `useReports.ts` |
| `src/components/` | Reusable pieces of the screen, one per file | `ServiceCard.tsx`, `StatusBadge.tsx` |
| `src/pages/` | One component per address | `DashboardPage.tsx`, `ServiceDetailsPage.tsx` |
| `src/types.ts` | Every TypeScript type in the app | `Service`, `StatuspageIncident`, `RequestState<T>` |

## Routes

Defined in `src/App.tsx`. Every page renders inside `Layout`, which shows the `NavBar` on top and the current page below it (`<Outlet />`).

| Address | Page |
|---|---|
| `/` | `DashboardPage` |
| `/services` | `ServicesPage` |
| `/services/:id` | `ServiceDetailsPage` (reads `id` with `useParams`) |
| `/stats` | `StatsPage` |
| `/report` | `ReportPage` |
| `*` | `NotFoundPage` |

## Component tree

```
App
└── Layout
    ├── NavBar
    └── (the current page)
        ├── DashboardPage ── StatCard ×4, ServiceList → ServiceCard → ServiceLogo, StatusBadge
        ├── ServicesPage ─── SearchBar, FilterBar, ServiceList → ServiceCard
        ├── ServiceDetailsPage ── ServiceLogo, StatusBadge, ComponentList → StatusBadge, IncidentList ×2
        ├── StatsPage ────── StatsList → ServiceLogo
        ├── ReportPage ───── ReportForm, ReportList
        └── NotFoundPage
```

## How data flows

```
services.ts (config)
      │
      ▼
api/  ── fetch ──▶ Statuspage / Salesforce / Wikipedia
      │
      │  Salesforce only: utils/salesforce.ts converts its format into the Statuspage format
      ▼
utils/  pure functions turn API data into what the page shows
      │   (toServiceStatus, filterServices, getOpenIncidents, countStatuses, buildCompanyStats…)
      ▼
hooks/ and pages/  keep the result in useState, inside useEffect
      │
      ▼
components/  receive the data as props and draw it
```

**One rule throughout:** pages and components never know which API a service uses.
`fetchSummary` and `fetchIncidents` in `api/statuspage.ts` are the only place that checks `apiType`.
For Salesforce they call the adapter, which returns exactly the same types.

## Where the state lives

| State | Where | Why there |
|---|---|---|
| Live status of every service | `useServiceStatuses` hook | Both the Dashboard and the Services page need it, so the logic is shared |
| Search and filters | The address (`useSearchParams`) on `ServicesPage` | The dashboard can link to a filtered list, and filtered views can be shared |
| One service's summary, incidents and Wikipedia text | `ServiceDetailsPage`, one `RequestState` each | Three separate requests, so one failure doesn't hide the others |
| Statistics for each company | `StatsPage`, one `RequestState` per company | Only this page uses it |
| Reported problems | `useReports` hook, saved to `localStorage` | Both the Report page and the Dashboard need it, and it must survive a refresh |
| The report form's fields | `ReportForm` | Only the form needs them while the user types |

## Loading and errors

Every request has three states on screen: loading, error, and data.
`RequestState<T>` (in `types.ts`) holds exactly one of them at a time.
Each `useEffect` that fetches data has a cleanup function that sets `ignore = true`, so an answer arriving after the page has closed is ignored.

## From a click to the details page

1. `ServiceCard` is a `Link` to `/services/github`.
2. React Router matches `/services/:id` and renders `ServiceDetailsPage`.
3. `useParams` returns `{ id: 'github' }`, and the page finds GitHub in `services.ts`.
4. `useEffect` starts three requests in parallel: `fetchSummary`, `fetchIncidents` and `fetchWikipediaSummary`.
5. Each answer updates its own state from `loading` to `success` (or `error`), and React re-renders that section.
6. The page passes the data through tested functions (`getTopLevelComponents`, `getOpenIncidents`, `getRecentHistory`) into `ComponentList` and `IncidentList`.
