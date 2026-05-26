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
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
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
        color: prefs[id]?.color ?? '#1C1C1A',
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

  const visibleTasks =
    filter === 'pending' ? tasks.filter((t) => !t.completed) :
    filter === 'completed' ? tasks.filter((t) => t.completed) :
    tasks
  const completedCount = tasks.filter((t) => t.completed).length
  const color = listMeta?.color ?? '#1C1C1A'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EEEDE8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 14, color: '#6B6B65' }}>
          <Link to="/" style={{ color: '#1C1C1A', textDecoration: 'none', fontWeight: 600 }}>
            Mis listas
          </Link>
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span style={{ color: '#6B6B65', fontWeight: 500 }}>
            {loading ? '...' : (listMeta?.title ?? 'Lista')}
          </span>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#AEADA8' }}>
            <p>Cargando tareas...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#dc2626' }}>
            <p>{error}</p>
            <button onClick={fetchData} style={{ marginTop: 12, padding: '9px 20px', border: 'none', borderRadius: 20, backgroundColor: '#1C1C1A', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && listMeta && (
          <>
            {/* Hero card */}
            <div
              style={{
                backgroundColor: color,
                borderRadius: 20,
                padding: '28px 28px 24px',
                marginBottom: 24,
              }}
            >
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                {listMeta.title}
              </h1>
              {listMeta.subtitle && (
                <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                  {listMeta.subtitle}
                </p>
              )}
              <p style={{ margin: '16px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                {completedCount} de {tasks.length} completadas
              </p>
            </div>

            {/* Filter toggles */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {(['all', 'pending', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '8px 18px',
                    border: 'none',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: filter === f ? '#1C1C1A' : '#fff',
                    color: filter === f ? '#fff' : '#6B6B65',
                    boxShadow: filter === f ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
                </button>
              ))}
            </div>

            {/* Task list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visibleTasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 24px', color: '#AEADA8', fontSize: 14 }}>
                  {filter === 'completed'
                    ? 'No hay tareas completadas aún.'
                    : filter === 'pending'
                    ? 'No hay tareas pendientes. ¡Todo listo!'
                    : 'Sin tareas aún. ¡Agrega una abajo!'}
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
