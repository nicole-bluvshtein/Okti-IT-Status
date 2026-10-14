import { NavLink } from 'react-router'

function NavBar() {
  return (
    <header className="navbar">
      <span className="navbar-title">Oktopost IT Status</span>
      <nav className="navbar-links">
        {/* "end" makes Dashboard active only on "/" exactly, not on every page */}
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/stats">Statistics</NavLink>
        <NavLink to="/report">Report a problem</NavLink>
      </nav>
    </header>
  )
}

export default NavBar
