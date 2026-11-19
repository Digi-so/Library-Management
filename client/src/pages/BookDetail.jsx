import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBook() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}`,
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error('Book not found.')
        }

        const data = await response.json()
        setBook(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBook()

    return () => controller.abort()
  }, [id])

  if (loading) {
    return <p>Loading book details...</p>
  }

    if (error) {
    return (
      <main>
        <p role="alert">Error: {error}</p>
        <Link to="/">Back to catalog</Link>
      </main>
    )
  }

  if (!book) {
    return (
      <main>
        <p>Book not found.</p>
        <Link to="/">Back to catalog</Link>
      </main>
    )
  }

  
  return (
    <main>
      <Link to="/">← Back to catalog</Link>

      <article className="book-detail">
        <h1>{book.title}</h1>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Total copies:</strong> {book.totalCopies}
        </p>

        {book.genre && (
          <p>
            <strong>Genre:</strong> {book.genre.name}
          </p>
        )}

        {book.reviews && book.reviews.length > 0 && (
          <section>
            <h2>Reviews</h2>
            {book.reviews.map((review) => (
              <div key={review.id}>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}/5</p>
              </div>
            ))}
          </section>
        )}
      </article>
    </main>
  )
}

export default BookDetail