import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Home, About, Search, Tasks, Login, Register, Welcome } from '../pages'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <LoadingScreen />
  return user ? <>{children}</> : <Navigate to="/welcome" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return <LoadingScreen />
  return !user ? <>{children}</> : <Navigate to="/" replace />
}


function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEDE8',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', color: '#AEADA8' }}>
        <span style={{ fontSize: 32, color: '#C5E63E' }}>✦</span>
        <p style={{ marginTop: 12, fontSize: 15 }}>Cargando...</p>
      </div>
    </div>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<PublicRoute><Welcome /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path="/tasks/:id" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
