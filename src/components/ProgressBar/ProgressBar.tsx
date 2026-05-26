interface ProgressBarProps {
  value: number
  color?: string
}

export default function ProgressBar({ value, color = '#2563EB' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      style={{
        width: '100%',
        height: 6,
        backgroundColor: '#E5E4DF',
        borderRadius: 9999,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${clamped}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: 9999,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
