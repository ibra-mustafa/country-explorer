import Header from './ui/components/Header'
import HomePage from './ui/pages/HomePage'
import LoginPage from './ui/pages/LoginPage'
import RegisterPage from './ui/pages/RegisterPage'
import CountryDetailsPage from './ui/pages/CountryDetailsPage'
import ProtectedRoute from './ui/components/ProtectedRoute'
import PublicRoute from './ui/components/PublicRoute'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
  <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
  <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/country/:code"
          element={
            <ProtectedRoute>
              <CountryDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
        </main> 
      </div>
    </BrowserRouter>
  )
}

export default App
