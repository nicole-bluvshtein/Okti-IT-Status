import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>There is no page at this address.</p>
      <Link to="/">Back to the dashboard</Link>
    </>
  )
}

export default NotFoundPage
