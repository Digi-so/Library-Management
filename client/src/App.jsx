import { Routes, Route } from 'react-router-dom'
import { ReadingListProvider } from './context/ReadingListContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import BookDetail from './pages/BookDetail.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SpaceBookingPage from './pages/SpaceBookingPage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <ReadingListProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <SpaceBookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ReadingListProvider>
  )
}

export default App