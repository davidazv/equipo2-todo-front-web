import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/auth/authService'

export default function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!fullName || !email || !password) {
      setError('Completa todos los campos')
      return
    }

    try {
      setLoading(true)
      await register(fullName, email, password)
      navigate('/login?registered=1')
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: string }; code?: string }
      if (axiosErr.response?.status === 409 || axiosErr.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Intenta iniciar sesión.')
      } else if (axiosErr.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 8 caracteres')
      } else if (axiosErr.response?.status === 400) {
        setError(axiosErr.response.data ?? 'Datos inválidos. Revisa los campos.')
      } else if (axiosErr.response?.data) {
        setError(axiosErr.response.data)
      } else {
        setError('Error al crear la cuenta. Intenta de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 28, color: '#2563EB' }}>✦</span>
          <h1 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 800, color: '#111827' }}>
            Crear cuenta
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
            Regístrate para empezar
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 8,
              padding: '10px 16px',
              marginBottom: 16,
              fontSize: 14,
              color: '#dc2626',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Nombre completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 10,
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              autoCapitalize="none"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 10,
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mín. 8 caracteres"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 10,
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '13px',
              border: 'none',
              borderRadius: 10,
              backgroundColor: loading ? '#93c5fd' : '#2563EB',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4,
            }}
          >
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
