import Tag from '../Tag/Tag'

interface SearchResultItemProps {
  title: string
  listName: string
  dueDate?: string | null
  priority: 'low' | 'medium' | 'high'
  onClick?: () => void
}

export default function SearchResultItem({
  title,
  listName,
  dueDate,
  priority,
  onClick,
}: SearchResultItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        gap: 12,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: '#111827',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: '3px 0 0',
            fontSize: 13,
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg
            width={13}
            height={13}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9 6 9-6" />
          </svg>
          {listName}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {dueDate && (
          <span
            style={{
              fontSize: 12,
              color: '#374151',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {dueDate}
          </span>
        )}
        <Tag label={priority} />
      </div>
    </div>
  )
}
