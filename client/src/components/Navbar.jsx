import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext.jsx'

function Navbar() {
  const { books } = useReadingList()
  const token = localStorage.getItem('token')

  return (
    <nav className="navbar">
      <Link to="/">Library</Link>

      <div className="navbar-links">
        <Link to="/">Books</Link>
        <Link to="/booking">Book a Space</Link>
        <Link to="/login">
          {token ? 'Account' : 'Login'}
        </Link>
        <span>Reading list: {books.length}</span>
      </div>
    </nav>
  )
}

export default Navbar