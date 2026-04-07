export function formatNumber(num) {
  // Validate input to prevent NaN or unexpected values
  if (typeof num !== 'number' || num < 0) {
    return '0'
  }

  // Use fixed(1) to show one decimal place for readability (1.2k vs 1.23k)
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }

  return num.toString()
}

export function formatDate(dateString) {
  if (!dateString) {
    return 'Unknown'
  }

  try {
    const date = new Date(dateString)
    const now = new Date()

    // Invalid dates return NaN for getTime(), so we check for that
    if (isNaN(date.getTime())) {
      return 'Unknown'
    }

    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    // Show relative dates instead of absolute dates (more user-friendly)
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`

    return `${Math.floor(diffDays / 365)} years ago`
  } catch (err) {
    // Date parsing might fail for unexpected formats
    console.warn('Error formatting date:', err)
    return 'Unknown'
  }
}
