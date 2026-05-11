import { useNavigate } from 'react-router-dom'
import { Navbar, Tag, Avatar } from '../../components'
import { useAuth } from '../../contexts/AuthContext'
import { logout } from '../../services/auth/authService'

export default function About() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Usuario'
  const email = user?.email ?? ''
  const initial = displayName.charAt(0).toUpperCase()

  const handleLogout = async () => {
    if (!window.confirm('¿Estás seguro de que quieres cerrar sesión?')) return
    await logout()
    navigate('/login')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e3a5f 0%, #2563EB 100%)',
            padding: '72px 24px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bfdbfe', marginBottom: 16 }}>
            Sobre EduTask
          </span>
          <h1 style={{ margin: '0 0 16px', fontSize: 42, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Gestión de tareas
            <br />
            para estudiantes.
          </h1>
          <p style={{ margin: '0 auto', maxWidth: 520, fontSize: 17, color: '#bfdbfe', lineHeight: 1.65 }}>
            Un espacio para organizar tus listas de estudio, hacer seguimiento del progreso
            y mantener el foco en lo que importa.
          </p>
        </div>

        {/* Two-column section */}
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '56px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* Left — About */}
          <div>
            <h2 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: '-0.01em' }}>
              Sobre el proyecto
            </h2>
            <p style={{ margin: '0 0 16px', fontSize: 15, color: '#374151', lineHeight: 1.7 }}>
              EduTask es una aplicación de gestión de tareas académicas construida con React, Firebase y
              un backend en Quarkus. Permite organizar listas de estudio, agregar tareas con prioridades
              y fechas límite, y hacer seguimiento visual del progreso.
            </p>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: '#374151', lineHeight: 1.7 }}>
              El proyecto fue desarrollado como ejercicio full-stack orientado a componentes,
              con énfasis en autenticación segura, buenas prácticas de API y una UI limpia y accesible.
            </p>

            <blockquote
              style={{
                margin: '0 0 28px',
                padding: '16px 20px',
                borderLeft: '4px solid #2563EB',
                backgroundColor: '#eff6ff',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                fontSize: 15,
                color: '#1e40af',
                lineHeight: 1.6,
              }}
            >
              "La mente no es un recipiente que llenar, sino un fuego que encender."
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 600, fontSize: 13, color: '#3b82f6' }}>
                — Plutarco
              </span>
            </blockquote>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag label="React 19" color="#eff6ff" textColor="#1d4ed8" />
              <Tag label="Firebase" color="#fff7ed" textColor="#c2410c" />
              <Tag label="Quarkus" color="#f0fdf4" textColor="#15803d" />
              <Tag label="TypeScript" color="#fef9c3" textColor="#a16207" />
            </div>
          </div>

          {/* Right — User card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <Avatar size={56} initials={initial} color="#f97316" />
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>
                    {displayName}
                  </h3>
                  {email && (
                    <p style={{ margin: '3px 0 0', fontSize: 13, color: '#6b7280' }}>{email}</p>
                  )}
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: 10,
                  border: '1px solid #f3f4f6',
                  marginBottom: 20,
                }}
              >
                <h4 style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Info
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <StatRow icon="◎" label="Stack" value="React Web + React Native" />
                  <StatRow icon="★" label="Backend" value="Quarkus + Firebase Auth" />
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '13px',
                  border: '1.5px solid #fecaca',
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  color: '#ef4444',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #e5e7eb', backgroundColor: '#fff', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
            <span style={{ color: '#2563EB' }}>✦</span> EduTask v1.0.0
          </span>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>
            React + Firebase + Quarkus
          </span>
        </div>
      </footer>
    </div>
  )
}

interface StatRowProps {
  icon: string
  label: string
  value: string
}

function StatRow({ icon, label, value }: StatRowProps) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 14, color: '#2563EB', flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div>
        <span style={{ fontSize: 12, color: '#9ca3af', display: 'block', marginBottom: 1 }}>{label}</span>
        <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{value}</span>
      </div>
    </div>
  )
}
