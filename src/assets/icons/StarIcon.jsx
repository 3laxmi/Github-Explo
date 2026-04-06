export function StarIcon({ size = 20, filled = false, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.01 19.85 24.29 12 18.54 4.15 24.29 6.23 16.01 0 10.35 8.91 10.26 12 2"></polygon>
    </svg>
  )
}
