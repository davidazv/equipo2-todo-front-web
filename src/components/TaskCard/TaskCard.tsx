import Tag from '../Tag/Tag'
import type { Task } from '../../types'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  isToggling?: boolean
}

export default function TaskCard({ task, onToggle, onEdit, onDelete, isToggling }: TaskCardProps) {
  const { id, title, description, dueDate, priority, completed } = task

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '16px 18px',
        backgroundColor: '#fff',
        borderRadius: 14,
        opacity: completed ? 0.6 : 1,
        transition: 'opacity 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Circular checkbox */}
      <button
        onClick={() => onToggle(id)}
        disabled={isToggling}
        aria-label={completed ? 'Marcar incompleto' : 'Marcar completo'}
        style={{
          marginTop: 2,
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: completed ? 'none' : '2px solid #AEADA8',
          backgroundColor: completed ? '#C5E63E' : 'transparent',
          cursor: isToggling ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          padding: 0,
          transition: 'background-color 0.15s, border-color 0.15s',
        }}
      >
        {completed && (
          <svg width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="#1C1C1A" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 600,
                color: completed ? '#AEADA8' : '#1C1C1A',
                textDecoration: completed ? 'line-through' : 'none',
              }}
            >
              {title}
            </p>
            {description && (
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: 13,
                  color: '#6B6B65',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {description}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <button
              onClick={() => onEdit(task)}
              aria-label="Editar tarea"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 6px',
                color: '#6B6B65',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(id)}
              aria-label="Eliminar tarea"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 6px',
                color: '#ef4444',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {dueDate && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                color: '#6B6B65',
                backgroundColor: '#F5F5F1',
                borderRadius: 6,
                padding: '2px 8px',
                fontWeight: 600,
              }}
            >
              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {new Date(dueDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
            </span>
          )}
          <Tag label={priority} />
        </div>
      </div>
    </div>
  )
}
