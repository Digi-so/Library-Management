import { createContext, useContext, useEffect, useReducer } from 'react'

const ReadingListContext = createContext(null)

const initialState = {
  books: [],
}

function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK': {
      const exists = state.books.some((book) => book.id === action.payload.id)

      if (exists) {
        return state
      }

      return {
        ...state,
        books: [...state.books, action.payload],
      }
    }

    case 'REMOVE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }

    case 'CLEAR_LIST':
      return initialState

    default:
      return state
  }
}

function ReadingListProvider({ children }) {
  const [state, dispatch] = useReducer(readingListReducer, initialState, () => {
    const savedList = localStorage.getItem('readingList')

    if (!savedList) {
      return initialState
    }

    try {
      return {
        books: JSON.parse(savedList),
      }
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(state.books))
  }, [state.books])

  const value = {
    books: state.books,
    addBook: (book) => dispatch({ type: 'ADD_BOOK', payload: book }),
    removeBook: (bookId) =>
      dispatch({ type: 'REMOVE_BOOK', payload: bookId }),
    clearList: () => dispatch({ type: 'CLEAR_LIST' }),
  }

  return (
    <ReadingListContext.Provider value={value}>
      {children}
    </ReadingListContext.Provider>
  )
}

function useReadingList() {
  const context = useContext(ReadingListContext)

  if (!context) {
    throw new Error('useReadingList must be used inside ReadingListProvider')
  }

  return context
}

export { ReadingListProvider, useReadingList }