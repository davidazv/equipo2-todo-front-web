interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...',
}: SearchBarProps) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
      <svg
        style={{
          position: 'absolute',
          left: 12,
          width: 18,
          height: 18,
          color: '#9ca3af',
          pointerEvents: 'none',
          flexShrink: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        style={{
          width: '100%',
          paddingLeft: 40,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          fontSize: 14,
          color: '#111827',
          backgroundColor: '#fff',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}
