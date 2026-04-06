import { useState, useEffect } from 'react'
import { searchUsers } from '../api/github'
import { useDebounce } from './useDebounce'

/**
 * Custom hook for managing GitHub user search
 * Handles debouncing, pagination, and error states
 */
export function useGithubSearch() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  
  // Debounce search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, 400)

  // Reset to page 1 when search query changes
  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  // Fetch users when debounced query or page changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([])
      setTotalCount(0)
      return
    }

    setLoading(true)
    setError(null)

    searchUsers(debouncedQuery, page)
      .then(data => {
        setUsers(data.items || [])
        // Cap at 1000 to avoid excessive pagination
        setTotalCount(Math.min(data.total_count || 0, 1000))
      })
      .catch(err => {
        // Handle specific API errors
        if (err.response?.status === 403) {
          setError('GitHub API rate limit exceeded. Please try again in 1 hour.')
        } else if (err.response?.status === 422) {
          setError('Invalid search query. Please try a different search term.')
        } else if (!err.response) {
          setError('Network error. Please check your connection.')
        } else {
          setError(err.message || 'Failed to search users')
        }
        setUsers([])
      })
      .finally(() => setLoading(false))
  }, [debouncedQuery, page])

  return { query, setQuery, users, loading, error, page, setPage, totalCount }
}
