import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return (
    <article className="book-card">
      <h2>{book.title}</h2>
      <p>by {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Available copies: {book.totalCopies}</p>

      {book.genre && <p>Genre: {book.genre.name}</p>}

      <Link to={`/books/${book.id}`}>View details</Link>
    </article>
  )
}

export default BookCard