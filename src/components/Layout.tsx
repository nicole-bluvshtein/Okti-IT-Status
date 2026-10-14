import { Outlet } from 'react-router'
import NavBar from './NavBar'

// The frame shared by every page: the menu on top, and the current page below it.
function Layout() {
  return (
    <>
      <NavBar />
      <main className="app">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
