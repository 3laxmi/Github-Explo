import { useState, useEffect } from 'react'
import { searchUsers } from '../api/github'
import { useDebounce } from './useDebounce'

export function useGithubSearch() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  
  // Debounce prevents hammering the API on every keystroke
  const debouncedQuery = useDebounce(query, 400)

  // Reset pagination when user types a new search term
  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

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
        // GitHub caps search results at 1000 total, so we limit pagination accordingly
        setTotalCount(Math.min(data.total_count || 0, 1000))
      })
      .catch(err => {
        // Different error codes need different user messages
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
