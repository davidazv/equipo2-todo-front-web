import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, StudyListCard, DueTodayCard, CreateListModal } from '../../components'
import type { StudyList, DueTodayTask, NewList, ApiTodo } from '../../types'
import { getTodos, createTodo } from '../../services/todoService'
import { loadPrefs, savePref } from '../../services/listPreferences'
import { useAuth } from '../../contexts/AuthContext'

const DEFAULT_COLOR = '#1C1C1A'

const isToday = (dateStr: string | null): boolean => {
  if (!dateStr) return false
  const d = new Date(dateStr)
  const today = new Date()
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  )
}

const calcPercentage = (todo: ApiTodo): number => {
  const tasks = todo.tasks ?? []
  if (tasks.length === 0) return 0
  const done = tasks.filter((t) => t.completed).length
  return Math.round((done / tasks.length) * 100)
}

const apiTodoToStudyList = (todo: ApiTodo, color: string): StudyList => ({
  id: todo.id,
  title: todo.title,
  subtitle: todo.description ?? '',
  taskCount: todo.tasks?.length ?? 0,
  color,
  completedPercentage: calcPercentage(todo),
})

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [todos, setTodos] = useState<ApiTodo[]>([])
  const [prefs, setPrefs] = useState<Record<string, { color: string }>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Estudiante'

  const fetchTodos = async () => {
    try {
      setError(null)
      const [data, savedPrefs] = await Promise.all([getTodos(), Promise.resolve(loadPrefs())])
      setTodos(data)
      setPrefs(savedPrefs)
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number } }
      if (axiosErr.response?.status === 401) {
        navigate('/login')
        return
      }
      setError('No se pudieron cargar las listas. Verifica tu conexión.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleCreateList = async (newList: NewList) => {
    try {
      const created = await createTodo(newList.title, newList.description)
      savePref(created.id, { color: newList.color })
      setTodos((prev) => [created, ...prev])
      setPrefs((prev) => ({ ...prev, [created.id]: { color: newList.color } }))
    } catch {
      alert('Error al crear la lista. Intenta de nuevo.')
    }
  }

  const lists = todos.map((t) => apiTodoToStudyList(t, prefs[t.id]?.color ?? DEFAULT_COLOR))

  const dueToday: DueTodayTask[] = todos
    .filter((t) => isToday(t.dueDate) && !t.completed)
    .map((t) => ({
      title: t.title,
      dueTime: new Date(t.dueDate!).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      priority: (t.priority?.toLowerCase() ?? 'low') as 'low' | 'medium' | 'high',
      listId: t.id,
    }))

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EEEDE8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 40,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                color: '#1C1C1A',
                letterSpacing: '-0.02em',
              }}
            >
              Bienvenido, {displayName}
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: '#6B6B65' }}>
              {dueToday.length > 0 ? (
                <>
                  Tienes{' '}
                  <strong style={{ color: '#1C1C1A' }}>{dueToday.length} {dueToday.length === 1 ? 'tarea' : 'tareas'}</strong>{' '}
                  para hoy.
                </>
              ) : (
                'No tienes tareas para hoy. ¡Buen trabajo!'
              )}
            </p>
          </div>

          {dueToday.length > 0 && (
            <DueTodayCard
              tasks={dueToday}
              onTaskClick={(listId) => navigate(`/tasks/${listId}`)}
            />
          )}
        </div>

        {/* Lists section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1C1C1A' }}>
              Mis listas
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#AEADA8' }}>
              {lists.length} {lists.length === 1 ? 'lista' : 'listas'} en total
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 18px',
              border: 'none',
              borderRadius: 20,
              backgroundColor: '#1C1C1A',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Crear lista
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#AEADA8' }}>
            <p style={{ fontSize: 16 }}>Cargando listas...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              backgroundColor: '#fef2f2',
              borderRadius: 16,
              border: '1px solid #fecaca',
            }}
          >
            <p style={{ fontSize: 15, color: '#dc2626', margin: '0 0 12px' }}>{error}</p>
            <button
              onClick={fetchTodos}
              style={{
                padding: '9px 20px',
                border: 'none',
                borderRadius: 20,
                backgroundColor: '#1C1C1A',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {lists.map((list) => (
                <StudyListCard key={list.id} {...list} />
              ))}
            </div>

            {lists.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: '#AEADA8' }}>
                <svg width={56} height={56} fill="none" viewBox="0 0 24 24" stroke="#D8D7D2" strokeWidth={1.5} style={{ display: 'block', margin: '0 auto 16px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                </svg>
                <p style={{ fontSize: 16, margin: 0 }}>Sin listas aún. ¡Crea tu primera!</p>
              </div>
            )}
          </>
        )}
      </main>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateList}
      />
    </div>
  )
}
