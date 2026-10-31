import { NavLink } from 'react-router'
import ThemeToggle from './ThemeToggle'

function NavBar() {
  return (
    <header className="navbar">
      <span className="navbar-title">Okti</span>
      <nav className="navbar-links">
        {/* "end" makes Dashboard active only on "/" exactly, not on every page */}
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/stats">Statistics</NavLink>
        <NavLink to="/report">Report a problem</NavLink>
      </nav>
      <ThemeToggle />
    </header>
  )
}

export default NavBar
