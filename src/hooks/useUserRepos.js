import { useState, useEffect, useMemo } from 'react'
import { getUserRepos } from '../api/github'

/**
 * Custom hook for fetching and managing user repositories
 * Handles sorting, filtering, and error states
 */
export function useUserRepos(username) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('stars')
  const [filterLang, setFilterLang] = useState('')

  // Fetch repos when username changes
  useEffect(() => {
    if (!username) {
      setRepos([])
      return
    }

    setLoading(true)
    setError(null)

    getUserRepos(username)
      .then(data => {
        // Ensure data is an array
        setRepos(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        if (err.response?.status === 403) {
          setError('GitHub API rate limit exceeded. Please try again in 1 hour.')
        } else if (err.response?.status === 404) {
          setError('User not found or has no public repositories.')
        } else if (!err.response) {
          setError('Network error. Please check your connection.')
        } else {
          setError(err.message || 'Failed to fetch repositories')
        }
        setRepos([])
      })
      .finally(() => setLoading(false))
  }, [username])

  // Extract unique languages from repos
  const languages = useMemo(
    () => {
      const langs = repos
        .map(r => r.language)
        .filter(Boolean) // Remove null/undefined
        .filter((lang, idx, arr) => arr.indexOf(lang) === idx) // Remove duplicates
        .sort()
      return langs
    },
    [repos]
  )

  // Apply filtering and sorting - only recompute when dependencies change
  const filtered = useMemo(() => {
    let result = repos

    // Apply language filter
    if (filterLang) {
      result = result.filter(r => r.language === filterLang)
    }

    // Apply sorting
    result.sort((a, b) => {
      const key = sortBy === 'stars' ? 'stargazers_count' : 'forks_count'
      return (b[key] || 0) - (a[key] || 0)
    })

    return result
  }, [repos, sortBy, filterLang])

  return {
    repos: filtered,
    loading,
    error,
    sortBy,
    setSortBy,
    filterLang,
    setFilterLang,
    languages
  }
}
