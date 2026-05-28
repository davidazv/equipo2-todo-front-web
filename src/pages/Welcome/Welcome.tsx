import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#EEEDE8',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 40px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {/* Branding — center */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <span
          style={{
            fontSize: 'clamp(72px, 14vw, 96px)',
            fontWeight: 200,
            color: '#1C1C1A',
            letterSpacing: '-4px',
            lineHeight: 1,
          }}
        >
          Edu
        </span>
        <span
          style={{
            fontSize: 'clamp(72px, 14vw, 96px)',
            fontWeight: 800,
            color: '#1C1C1A',
            letterSpacing: '-4px',
            lineHeight: 1,
          }}
        >
          Task
        </span>

        <div style={{ height: 1, backgroundColor: '#1C1C1A', opacity: 0.1, margin: '24px 0 20px' }} />

        <p style={{ margin: 0, fontSize: 17, color: '#6B6B65', lineHeight: 1.6, maxWidth: 320 }}>
          Organiza tus listas y tareas académicas en un solo lugar.
        </p>
      </div>

      {/* Actions — bottom */}
      <div style={{ paddingBottom: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '17px',
            border: 'none',
            borderRadius: 16,
            backgroundColor: '#1C1C1A',
            color: '#F5F5F1',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Iniciar sesión
        </button>

        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '17px',
            border: '1.5px solid rgba(28,28,26,0.35)',
            borderRadius: 16,
            backgroundColor: '#E0DFD9',
            color: '#1C1C1A',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Crear cuenta
        </button>
      </div>
    </div>
  )
}
