import { useState } from 'react'
import Modal from './Modal'
import type { NewList } from '../../types'

interface CreateListModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (list: NewList) => void
}

const COLOR_SWATCHES = [
  { label: 'Dark', value: '#1C1C1A' },
  { label: 'Lime', value: '#C5E63E' },
  { label: 'Green', value: '#10b981' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Red', value: '#ef4444' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #E5E4DF',
  borderRadius: 10,
  fontSize: 14,
  color: '#1C1C1A',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  backgroundColor: '#F5F5F1',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#1C1C1A',
  marginBottom: 6,
}

export default function CreateListModal({ isOpen, onClose, onSubmit }: CreateListModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#1C1C1A')

  const handleSubmit = () => {
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim(), color })
    setTitle('')
    setDescription('')
    setColor('#1C1C1A')
    onClose()
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setColor('#1C1C1A')
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
                  border: color === swatch.value ? '3px solid #1C1C1A' : '2px solid #E5E4DF',
                  cursor: 'pointer',
                  outline: color === swatch.value ? '2px solid #C5E63E' : 'none',
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
              border: '1px solid #E5E4DF',
              borderRadius: 10,
              background: '#F5F5F1',
              color: '#1C1C1A',
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
              borderRadius: 10,
              background: title.trim() ? '#1C1C1A' : '#AEADA8',
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
