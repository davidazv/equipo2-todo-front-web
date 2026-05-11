interface AvatarProps {
  size?: number
  initials?: string
  color?: string
}

export default function Avatar({ size = 36, initials = 'SA', color = '#2563EB' }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.38),
        fontWeight: 700,
        cursor: 'pointer',
        flexShrink: 0,
        userSelect: 'none',
        letterSpacing: '0.03em',
      }}
    >
      {initials}
    </div>
  )
}
