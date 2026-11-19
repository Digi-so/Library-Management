import { useEffect, useState } from 'react'
import BookCard from './BookCard.jsx'

function BookGrid({ genreId, search }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBooks() {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()

        if (genreId) {
          params.set('genreId', genreId)
        }

        if (search) {
          params.set('search', search)
        }

        const query = params.toString()
        const url = `${import.meta.env.VITE_API_URL}/books${query ? `?${query}` : ''}`

        const response = await fetch(url, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load books.')
        }

        const result = await response.json()
        setBooks(result.data ?? [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()

    return () => controller.abort()
  }, [genreId, search])

  if (loading) {
    return <p>Loading books...</p>
  }

  if (error) {
    return <p role="alert">Error: {error}</p>
  }

  if (books.length === 0) {
    return <p>No books found.</p>
  }

  return (
    <section className="book-grid" aria-label="Book catalog">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  )
}

export default BookGrid