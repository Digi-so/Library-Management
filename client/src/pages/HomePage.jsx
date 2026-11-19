import { useEffect, useState } from 'react'
import BookGrid from '../components/BookGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'

function HomePage() {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState('')
  const [genres, setGenres] = useState([])
  const [genreError, setGenreError] = useState('')

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/genres`)

        if (!response.ok) {
          throw new Error('Failed to load genres.')
        }

        const data = await response.json()
        setGenres(data)
      } catch (err) {
        setGenreError(err.message)
      }
    }

    fetchGenres()
  }, [])

  return (
    <main>
      <header>
        <h1>Library Catalog</h1>
        <p>Browse our books or search by title or author.</p>
      </header>

      <div className="catalog-controls">
        <SearchBar onSearch={setSearch} />

        <label>
          Genre:
          <select
            value={genreId}
            onChange={(event) => setGenreId(event.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {genreError && <p role="alert">Error: {genreError}</p>}

      <BookGrid genreId={genreId} search={search} />
    </main>
  )
}

export default HomePage