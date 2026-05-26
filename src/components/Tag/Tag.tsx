interface TagProps {
  label: string
  color?: string
  textColor?: string
}

const PRIORITY_PRESETS: Record<string, { bg: string; text: string }> = {
  high: { bg: '#fef2f2', text: '#dc2626' },
  medium: { bg: '#fffbeb', text: '#d97706' },
  low: { bg: '#f0fdf4', text: '#16a34a' },
}

export default function Tag({ label, color, textColor }: TagProps) {
  const key = label.toLowerCase()
  const preset = PRIORITY_PRESETS[key]
  const bg = color ?? preset?.bg ?? '#f3f4f6'
  const fg = textColor ?? preset?.text ?? '#374151'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: bg,
        color: fg,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
