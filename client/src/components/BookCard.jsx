import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext.jsx'

function BookCard({ book }) {
  const { books, addBook, removeBook } = useReadingList()

  const isInReadingList = books.some((item) => item.id === book.id)

  function handleToggle() {
    if (isInReadingList) {
      removeBook(book.id)
    } else {
      addBook(book)
    }
  }

  return (
    <article className="book-card">
      <h2>{book.title}</h2>

      <p>Author: {book.author}</p>

      {book.genre && <p>Genre: {book.genre.name}</p>}

      <p>ISBN: {book.isbn}</p>

      <div className="book-card-actions">
        <Link to={`/books/${book.id}`}>View details</Link>

        <button type="button" onClick={handleToggle}>
          {isInReadingList
            ? 'Remove from reading list'
            : 'Add to reading list'}
        </button>
      </div>
    </article>
  )
}

export default BookCard