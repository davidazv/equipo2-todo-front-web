import Modal from './Modal'

interface DeleteTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName?: string
}

export default function DeleteTaskModal({ isOpen, onClose, onConfirm, itemName = 'esta tarea' }: DeleteTaskModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            padding: 16,
            backgroundColor: '#fef2f2',
            borderRadius: 10,
            border: '1px solid #fecaca',
          }}
        >
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#1C1C1A' }}>
            ¿Estás seguro de que quieres eliminar <strong>{itemName}</strong>? Esta acción es
            permanente y no se puede deshacer.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
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
            onClick={handleConfirm}
            style={{
              padding: '9px 20px',
              border: 'none',
              borderRadius: 10,
              background: '#ef4444',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  )
}
