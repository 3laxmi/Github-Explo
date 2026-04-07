import { useState, useEffect } from 'react'

export function useBookmarks() {
  // Initialize from localStorage to persist bookmarks across sessions
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_bookmarks')
      return saved ? JSON.parse(saved) : []
    } catch (err) {
      // localStorage might be corrupted or disabled in some browsers
      console.warn('Failed to parse bookmarks from localStorage:', err)
      return []
    }
  })

  // Sync bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('gh_bookmarks', JSON.stringify(bookmarks))
    } catch (err) {
      // localStorage quota might be exceeded or disabled
      console.error('Failed to save bookmarks to localStorage:', err)
    }
  }, [bookmarks])

  const toggle = (repo) => {
    // Prevent crashes from invalid repo objects
    if (!repo || !repo.id) {
      console.warn('Invalid repo object passed to toggle')
      return
    }

    setBookmarks(prev => {
      const isBookmarked = prev.some(r => r.id === repo.id)
      // Remove if already bookmarked, add if not
      if (isBookmarked) {
        return prev.filter(r => r.id !== repo.id)
      } else {
        return [...prev, repo]
      }
    })
  }

  const isBookmarked = (repoId) => {
    return bookmarks.some(r => r.id === repoId)
  }

  return { bookmarks, toggle, isBookmarked }
}
