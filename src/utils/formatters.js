/**
 * Format large numbers to readable format
 * Examples: 1200 -> "1.2k", 1500000 -> "1.5M"
 */
export function formatNumber(num) {
  if (typeof num !== 'number' || num < 0) {
    return '0'
  }

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }

  return num.toString()
}

/**
 * Format date to relative time format
 * Examples: "2 days ago", "3 weeks ago", "1 year ago"
 */
export function formatDate(dateString) {
  if (!dateString) {
    return 'Unknown'
  }

  try {
    const date = new Date(dateString)
    const now = new Date()

    // Handle invalid dates
    if (isNaN(date.getTime())) {
      return 'Unknown'
    }

    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`

    return `${Math.floor(diffDays / 365)} years ago`
  } catch (err) {
    console.warn('Error formatting date:', err)
    return 'Unknown'
  }
}
