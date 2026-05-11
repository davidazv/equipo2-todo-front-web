import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { logout } from '../../services/auth/authService'
import Avatar from '../Avatar/Avatar'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'U'
  const initial = displayName.charAt(0).toUpperCase()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setDropdownOpen(false)
    await logout()
    navigate('/login')
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            fontSize: 18,
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.02em',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: '#2563EB' }}>✦</span>
          EduTask
        </Link>

        {/* Center nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
          <NavLink to="/" isActive={location.pathname === '/'}>Dashboard</NavLink>
          <NavLink to="/about" isActive={location.pathname === '/about'}>Perfil</NavLink>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div
            onClick={() => navigate('/search')}
            title="Buscar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              backgroundColor: '#f9fafb',
              color: '#9ca3af',
              fontSize: 14,
              minWidth: 180,
            }}
          >
            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Buscar tareas...
          </div>

          {/* Avatar dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <div onClick={() => setDropdownOpen((o) => !o)}>
              <Avatar initials={initial} color="#f97316" />
            </div>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  minWidth: 200,
                  overflow: 'hidden',
                  zIndex: 200,
                }}
              >
                {/* User info */}
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#111827' }}>
                    {displayName}
                  </p>
                  {user?.email && (
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280' }}>
                      {user.email}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/about') }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '11px 16px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: '#374151',
                    textAlign: 'left',
                  }}
                >
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                  </svg>
                  Mi perfil
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '11px 16px',
                    border: 'none',
                    borderTop: '1px solid #f3f4f6',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    color: '#ef4444',
                    textAlign: 'left',
                  }}
                >
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

interface NavLinkProps {
  to: string
  isActive: boolean
  children: React.ReactNode
}

function NavLink({ to, isActive, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        color: isActive ? '#2563EB' : '#374151',
        backgroundColor: isActive ? '#eff6ff' : 'transparent',
        transition: 'background-color 0.15s, color 0.15s',
      }}
    >
      {children}
    </Link>
  )
}
