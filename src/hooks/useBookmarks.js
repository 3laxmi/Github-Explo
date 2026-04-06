import { useState, useEffect } from 'react'

/**
 * Custom hook for managing bookmarked repositories
 * Persists bookmarks to localStorage
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_bookmarks')
      return saved ? JSON.parse(saved) : []
    } catch (err) {
      // Handle corrupted localStorage data
      console.warn('Failed to parse bookmarks from localStorage:', err)
      return []
    }
  })

  // Persist bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('gh_bookmarks', JSON.stringify(bookmarks))
    } catch (err) {
      // Handle localStorage quota exceeded or other errors
      console.error('Failed to save bookmarks to localStorage:', err)
    }
  }, [bookmarks])

  /**
   * Toggle bookmark for a repository
   * Adds if not bookmarked, removes if already bookmarked
   */
  const toggle = (repo) => {
    if (!repo || !repo.id) {
      console.warn('Invalid repo object passed to toggle')
      return
    }

    setBookmarks(prev => {
      const isBookmarked = prev.some(r => r.id === repo.id)
      if (isBookmarked) {
        return prev.filter(r => r.id !== repo.id)
      } else {
        return [...prev, repo]
      }
    })
  }

  /**
   * Check if a repository is bookmarked
   */
  const isBookmarked = (repoId) => {
    return bookmarks.some(r => r.id === repoId)
  }

  return { bookmarks, toggle, isBookmarked }
}
