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
        borderRadius: 16,
        padding: '20px 20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        minWidth: 260,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#C5E63E" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1C1C1A' }}>
          Vence hoy
        </h3>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 12,
            fontWeight: 700,
            backgroundColor: '#1C1C1A',
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
          <p style={{ margin: 0, fontSize: 13, color: '#AEADA8' }}>
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
              borderBottom: i < tasks.length - 1 ? '1px solid #F5F5F1' : 'none',
              cursor: onTaskClick ? 'pointer' : 'default',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1C1C1A' }}>
              {task.title}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#6B6B65', display: 'flex', alignItems: 'center', gap: 3 }}>
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
