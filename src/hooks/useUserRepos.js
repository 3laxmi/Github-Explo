import { useState, useEffect, useMemo } from 'react'
import { getUserRepos } from '../api/github'

export function useUserRepos(username) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('stars')
  const [filterLang, setFilterLang] = useState('')

  useEffect(() => {
    if (!username) {
      setRepos([])
      return
    }

    setLoading(true)
    setError(null)

    getUserRepos(username)
      .then(data => {
        // API might return non-array in edge cases, so we normalize it
        setRepos(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        // Different error codes need different user messages
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

  // Extract unique languages - useMemo prevents recalculating on every render
  const languages = useMemo(
    () => {
      const langs = repos
        .map(r => r.language)
        .filter(Boolean)
        .filter((lang, idx, arr) => arr.indexOf(lang) === idx)
        .sort()
      return langs
    },
    [repos]
  )

  // Memoize filtered results so sorting/filtering doesn't trigger child re-renders unnecessarily
  const filtered = useMemo(() => {
    let result = repos

    if (filterLang) {
      result = result.filter(r => r.language === filterLang)
    }

    // Sort in descending order (highest stars/forks first)
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
