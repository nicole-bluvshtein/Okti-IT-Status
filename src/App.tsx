import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailsPage from './pages/ServiceDetailsPage'
import StatsPage from './pages/StatsPage'
import ReportPage from './pages/ReportPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

// The map of the app: which page shows at which address.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
