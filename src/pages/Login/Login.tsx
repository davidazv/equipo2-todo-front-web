import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../../services/auth/authService'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const registered = searchParams.get('registered')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Ingresa tu email y contraseña')
      return
    }

    try {
      setLoading(true)
      await login(email, password)
      navigate('/')
    } catch (err: unknown) {
      console.error('Login error:', err)
      const code = (err as { code?: string }).code
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found'
      ) {
        setError('Email o contraseña incorrectos')
      } else {
        setError(`Error: ${code ?? 'desconocido'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#EEEDE8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{ fontSize: 32, color: '#C5E63E' }}>✦</span>
          <h1 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 800, color: '#1C1C1A' }}>
            EduTask
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6B6B65' }}>
            Inicia sesión para continuar
          </p>
        </div>

        {registered === '1' && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 20,
              fontSize: 14,
              color: '#15803d',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            ✓ Cuenta creada exitosamente. Inicia sesión.
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 10,
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
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1C1C1A', marginBottom: 6 }}>
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
                border: '1px solid #E5E4DF',
                borderRadius: 10,
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#F5F5F1',
                color: '#1C1C1A',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1C1C1A', marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '1px solid #E5E4DF',
                borderRadius: 10,
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#F5F5F1',
                color: '#1C1C1A',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '13px',
              border: 'none',
              borderRadius: 12,
              backgroundColor: loading ? '#6B6B65' : '#1C1C1A',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4,
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#6B6B65' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: '#1C1C1A', fontWeight: 700, textDecoration: 'none' }}>
            Regístrate
          </Link>
        </p>
        <p style={{ marginTop: 8, textAlign: 'center', fontSize: 14, color: '#AEADA8' }}>
          <Link to="/welcome" style={{ color: '#AEADA8', textDecoration: 'none' }}>
            ← Volver
          </Link>
        </p>
      </div>
    </div>
  )
}
