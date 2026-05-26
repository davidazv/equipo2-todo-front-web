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
        borderRadius: 16,
        cursor: 'pointer',
        transition: 'box-shadow 0.15s, transform 0.15s',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.12)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Color dot + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: color,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1C1C1A' }}>
            {title}
          </h3>
          <p style={{ margin: '3px 0 0', fontSize: 13, color: '#6B6B65', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {subtitle || 'Sin descripción'}
          </p>
        </div>
      </div>

      <div style={{ fontSize: 13, color: '#AEADA8', display: 'flex', alignItems: 'center', gap: 4 }}>
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
        </svg>
        {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <ProgressBar value={completedPercentage} color={color} />
        <span style={{ fontSize: 12, color: '#AEADA8', fontWeight: 500 }}>
          {completedPercentage}% completado
        </span>
      </div>
    </div>
  )
}
