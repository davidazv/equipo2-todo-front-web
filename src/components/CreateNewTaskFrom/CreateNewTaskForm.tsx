import { useState } from 'react'
import type { NewTask } from '../../types'

interface CreateNewTaskFormProps {
  onSubmit: (task: NewTask) => void
  isLoading?: boolean
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  fontSize: 14,
  color: '#111827',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  backgroundColor: '#fff',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: '#6b7280',
  marginBottom: 5,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

export default function CreateNewTaskForm({ onSubmit, isLoading }: CreateNewTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim(), dueDate, priority })
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
  }

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        border: '1px dashed #d1d5db',
        borderRadius: 12,
        padding: '20px 24px',
        marginTop: 8,
      }}
    >
      <h4
        style={{
          margin: '0 0 16px',
          fontSize: 13,
          fontWeight: 700,
          color: '#374151',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        Agregar tarea
      </h4>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Título de la tarea</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingresa el título..."
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción breve (opcional)..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Fecha límite</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim() || isLoading}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: 8,
              background: title.trim() && !isLoading ? '#2563EB' : '#93c5fd',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              cursor: title.trim() && !isLoading ? 'pointer' : 'not-allowed',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
            }}
          >
            {isLoading ? 'Agregando...' : 'Agregar a la lista'}
          </button>
        </div>
      </form>
    </div>
  )
}
