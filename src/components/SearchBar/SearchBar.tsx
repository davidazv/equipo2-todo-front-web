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
          left: 14,
          width: 18,
          height: 18,
          color: '#AEADA8',
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
          paddingLeft: 44,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
          border: '1px solid #E5E4DF',
          borderRadius: 20,
          fontSize: 15,
          color: '#1C1C1A',
          backgroundColor: '#fff',
          outline: 'none',
          boxSizing: 'border-box',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      />
    </div>
  )
}
