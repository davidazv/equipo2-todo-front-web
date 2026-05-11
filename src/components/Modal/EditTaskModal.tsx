import { useState, useEffect } from 'react'
import Modal from './Modal'
import type { Task } from '../../types'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSave: (updatedTask: Task) => void
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
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
}

export default function EditTaskModal({ isOpen, onClose, task, onSave }: EditTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setDueDate(task.dueDate ?? '')
      setPriority(task.priority)
    }
  }, [task])

  const handleSave = () => {
    if (!task || !title.trim()) return
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar tarea">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={labelStyle}>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            autoFocus
          />
        </div>

        <div>
          <label style={labelStyle}>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
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

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 20px',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              background: '#fff',
              color: '#374151',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            style={{
              padding: '9px 20px',
              border: 'none',
              borderRadius: 8,
              background: title.trim() ? '#2563EB' : '#93c5fd',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: title.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  )
}
