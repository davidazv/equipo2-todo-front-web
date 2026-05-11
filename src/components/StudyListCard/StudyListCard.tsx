import { useNavigate } from 'react-router-dom'
import ProgressBar from '../ProgressBar/ProgressBar'

interface StudyListCardProps {
  id: string
  title: string
  subtitle: string
  taskCount: number
  color: string
  completedPercentage: number
}

export default function StudyListCard({
  id,
  title,
  subtitle,
  taskCount,
  color,
  completedPercentage,
}: StudyListCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/tasks/${id}`)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: '20px',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        cursor: 'pointer',
        borderLeft: `5px solid ${color}`,
        transition: 'box-shadow 0.15s, transform 0.15s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>
          {title}
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
          {subtitle || 'Sin descripción'}
        </p>
      </div>

      <div style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
        </svg>
        {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <ProgressBar value={completedPercentage} color={color} />
        <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>
          {completedPercentage}% completado
        </span>
      </div>
    </div>
  )
}
