import { useState } from 'react'
import Modal from './Modal'
import type { NewList } from '../../types'

interface CreateListModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (list: NewList) => void
}

const COLOR_SWATCHES = [
  { label: 'Blue', value: '#2563EB' },
  { label: 'Green', value: '#10b981' },
  { label: 'Navy', value: '#1e3a5f' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
]

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

export default function CreateListModal({ isOpen, onClose, onSubmit }: CreateListModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#2563EB')

  const handleSubmit = () => {
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim(), color })
    setTitle('')
    setDescription('')
    setColor('#2563EB')
    onClose()
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setColor('#2563EB')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear nueva lista">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={labelStyle}>
            Título <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ej. Matemáticas"
            style={inputStyle}
            autoFocus
          />
        </div>

        <div>
          <label style={labelStyle}>Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción breve..."
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
          />
        </div>

        <div>
          <label style={labelStyle}>Color</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.value}
                title={swatch.label}
                onClick={() => setColor(swatch.value)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: swatch.value,
                  border: color === swatch.value ? '3px solid #2563EB' : '2px solid #e5e7eb',
                  cursor: 'pointer',
                  outline: color === swatch.value ? '2px solid #bfdbfe' : 'none',
                  outlineOffset: 1,
                  transition: 'border 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <button
            onClick={handleClose}
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
            onClick={handleSubmit}
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
            Crear lista
          </button>
        </div>
      </div>
    </Modal>
  )
}
