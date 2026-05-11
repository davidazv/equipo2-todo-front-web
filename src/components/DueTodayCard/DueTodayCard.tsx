import Tag from '../Tag/Tag'
import type { DueTodayTask } from '../../types'

interface DueTodayCardProps {
  tasks: DueTodayTask[]
  onTaskClick?: (listId: string) => void
}

export default function DueTodayCard({ tasks, onTaskClick }: DueTodayCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '20px 20px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        minWidth: 260,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111827' }}>
          Vence hoy
        </h3>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 12,
            fontWeight: 700,
            backgroundColor: '#2563EB',
            color: '#fff',
            borderRadius: 9999,
            padding: '1px 8px',
          }}
        >
          {tasks.length}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tasks.length === 0 && (
          <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>
            Sin tareas para hoy.
          </p>
        )}
        {tasks.map((task, i) => (
          <div
            key={i}
            onClick={() => onTaskClick?.(task.listId)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              paddingBottom: i < tasks.length - 1 ? 12 : 0,
              borderBottom: i < tasks.length - 1 ? '1px solid #f3f4f6' : 'none',
              cursor: onTaskClick ? 'pointer' : 'default',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#111827' }}>
              {task.title}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 3 }}>
                <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {task.dueTime}
              </span>
              <Tag label={task.priority} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
