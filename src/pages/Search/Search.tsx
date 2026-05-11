import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, SearchBar, SearchResultItem } from '../../components'
import type { ApiTodo } from '../../types'
import { getTodos } from '../../services/todoService'

interface SearchItem {
  id: string
  title: string
  description: string
  listName: string
  listId: string
  dueDate: string | null
  priority: 'low' | 'medium' | 'high'
  completed: boolean
}

const toPriority = (p: string | null): 'low' | 'medium' | 'high' => {
  if (!p) return 'low'
  return p.toLowerCase() as 'low' | 'medium' | 'high'
}

const flattenTodos = (todos: ApiTodo[]): SearchItem[] => {
  const items: SearchItem[] = []
  for (const todo of todos) {
    items.push({
      id: todo.id,
      title: todo.title,
      description: todo.description ?? '',
      listName: '(Lista principal)',
      listId: todo.id,
      dueDate: todo.dueDate,
      priority: toPriority(todo.priority),
      completed: todo.completed,
    })
    for (const task of todo.tasks ?? []) {
      items.push({
        id: task.id,
        title: task.title,
        description: task.description ?? '',
        listName: todo.title,
        listId: todo.id,
        dueDate: task.dueDate,
        priority: toPriority(task.priority),
        completed: task.completed,
      })
    }
  }
  return items
}

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [allItems, setAllItems] = useState<SearchItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodos()
      .then((todos) => setAllItems(flattenTodos(todos)))
      .catch(() => setAllItems([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.listName.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            Buscar
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
            Busca en todas tus listas y tareas
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar por título, descripción o lista..."
          />
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            <p>Cargando...</p>
          </div>
        )}

        {!loading && query.trim() ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Resultados
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, backgroundColor: '#2563EB', color: '#fff', borderRadius: 9999, padding: '1px 8px' }}>
                {filtered.length}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', color: '#9ca3af' }}>
                <p style={{ margin: 0, fontSize: 15 }}>Sin resultados para &ldquo;{query}&rdquo;</p>
                <p style={{ margin: '8px 0 0', fontSize: 13 }}>Intenta con otras palabras.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map((item) => (
                  <SearchResultItem
                    key={item.id}
                    title={item.title}
                    listName={item.listName}
                    dueDate={item.dueDate}
                    priority={item.priority}
                    onClick={() => navigate(`/tasks/${item.listId}`)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          !loading && (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: '#9ca3af' }}>
              <svg width={48} height={48} fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={1.5} style={{ display: 'block', margin: '0 auto 16px' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>Empieza a escribir para buscar</p>
              <p style={{ margin: '6px 0 0', fontSize: 13 }}>
                Busca por título, descripción o nombre de lista
              </p>
            </div>
          )
        )}
      </main>
    </div>
  )
}
