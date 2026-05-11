import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Navbar, TaskCard, CreateNewTaskForm, EditTaskModal, DeleteTaskModal } from '../../components'
import type { Task, NewTask, ApiTodo } from '../../types'
import { getTodoById, getTasksByListId, updateTodo, createTask, deleteTodo } from '../../services/todoService'
import { loadPrefs } from '../../services/listPreferences'

const toPriority = (p: string | null): 'low' | 'medium' | 'high' => {
  if (!p) return 'low'
  return p.toLowerCase() as 'low' | 'medium' | 'high'
}

const apiToTask = (t: ApiTodo): Task => ({
  id: t.id,
  title: t.title,
  description: t.description ?? '',
  dueDate: t.dueDate,
  priority: toPriority(t.priority),
  completed: t.completed,
})

export default function Tasks() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [listMeta, setListMeta] = useState<{ title: string; subtitle: string; color: string } | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [addingTask, setAddingTask] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!id) return
    try {
      setError(null)
      const prefs = loadPrefs()
      const [todo, taskList] = await Promise.all([
        getTodoById(id),
        getTasksByListId(id),
      ])
      setListMeta({
        title: todo.title,
        subtitle: todo.description ?? '',
        color: prefs[id]?.color ?? '#2563EB',
      })
      setTasks(taskList.map(apiToTask))
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number } }
      if (axiosErr.response?.status === 401) {
        navigate('/login')
        return
      }
      setError('No se pudo cargar la lista.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleToggle = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    setTogglingId(taskId)
    try {
      await updateTodo(taskId, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, completed: !t.completed } : t))
    } catch {
      alert('Error al actualizar la tarea')
    } finally {
      setTogglingId(null)
    }
  }

  const handleSaveEdit = async (updated: Task) => {
    try {
      await updateTodo(updated.id, {
        title: updated.title,
        description: updated.description,
        dueDate: updated.dueDate,
        priority: updated.priority.toUpperCase(),
      })
      setTasks((prev) => prev.map((t) => t.id === updated.id ? updated : t))
      setEditingTask(null)
    } catch {
      alert('Error al guardar los cambios')
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingTaskId) return
    try {
      await deleteTodo(deletingTaskId)
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId))
    } catch {
      alert('Error al eliminar la tarea')
    } finally {
      setDeletingTaskId(null)
    }
  }

  const handleAddTask = async (newTask: NewTask) => {
    if (!id) return
    setAddingTask(true)
    try {
      const created = await createTask(id, {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority.toUpperCase(),
        dueDate: newTask.dueDate || null,
      })
      setTasks((prev) => [...prev, apiToTask(created)])
    } catch {
      alert('Error al agregar la tarea')
    } finally {
      setAddingTask(false)
    }
  }

  const visibleTasks = showCompleted ? tasks : tasks.filter((t) => !t.completed)
  const completedCount = tasks.filter((t) => t.completed).length
  const color = listMeta?.color ?? '#2563EB'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 14, color: '#6b7280' }}>
          <Link to="/" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>
            Mis listas
          </Link>
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span style={{ color: '#374151', fontWeight: 500 }}>
            {loading ? '...' : (listMeta?.title ?? 'Lista')}
          </span>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#9ca3af' }}>
            <p>Cargando tareas...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#dc2626' }}>
            <p>{error}</p>
            <button onClick={fetchData} style={{ marginTop: 12, padding: '9px 20px', border: 'none', borderRadius: 8, backgroundColor: '#2563EB', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && listMeta && (
          <>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                  {listMeta.title}
                </h1>
              </div>
              {listMeta.subtitle && (
                <p style={{ margin: '0 0 0 26px', fontSize: 14, color: '#6b7280' }}>
                  {listMeta.subtitle}
                </p>
              )}
            </div>

            {/* Stats + toggles */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>
                {completedCount} de {tasks.length} tareas completadas
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setShowCompleted(false)}
                  style={{
                    padding: '6px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    backgroundColor: !showCompleted ? '#2563EB' : '#fff',
                    color: !showCompleted ? '#fff' : '#374151',
                  }}
                >
                  Ocultar completadas
                </button>
                <button
                  onClick={() => setShowCompleted(true)}
                  style={{
                    padding: '6px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    backgroundColor: showCompleted ? '#2563EB' : '#fff',
                    color: showCompleted ? '#fff' : '#374151',
                  }}
                >
                  Ver completadas
                </button>
              </div>
            </div>

            {/* Task list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visibleTasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 24px', color: '#9ca3af', fontSize: 14 }}>
                  {showCompleted
                    ? 'Sin tareas aún. ¡Agrega una abajo!'
                    : 'Todas las tareas completadas. Activa "Ver completadas".'}
                </div>
              )}
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={setEditingTask}
                  onDelete={setDeletingTaskId}
                  isToggling={togglingId === task.id}
                />
              ))}
            </div>

            {/* Add task form */}
            <div style={{ marginTop: 24 }}>
              <CreateNewTaskForm onSubmit={handleAddTask} isLoading={addingTask} />
            </div>
          </>
        )}
      </main>

      <EditTaskModal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={handleSaveEdit}
      />

      <DeleteTaskModal
        isOpen={deletingTaskId !== null}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
