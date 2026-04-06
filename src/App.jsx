import { useState } from 'react'
import { SearchBar } from './components/SearchBar/SearchBar'
import { UserCard } from './components/UserCard/UserCard'
import { RepoList } from './components/RepoList/RepoList'
import { Bookmarks } from './components/Bookmarks/Bookmarks'
import { Pagination } from './components/Pagination/Pagination'
import { Loader } from './components/Loader/Loader'
import { EmptyState } from './components/EmptyState/EmptyState'
import { MoonIcon, SunIcon, ArrowLeftIcon } from './assets/icons'
import { useGithubSearch } from './hooks/useGithubSearch'
import { useUserRepos } from './hooks/useUserRepos'
import { useBookmarks } from './hooks/useBookmarks'
import { useDarkMode } from './hooks/useDarkMode'
import styles from './App.module.css'

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const { dark, toggle: toggleDarkMode } = useDarkMode()
  const { query, setQuery, users, loading, error, page, setPage, totalCount } = useGithubSearch()
  const { repos, loading: reposLoading, error: reposError, sortBy, setSortBy, filterLang, setFilterLang, languages } = useUserRepos(selectedUser?.login)
  const { bookmarks, toggle: toggleBookmark, isBookmarked } = useBookmarks()

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setShowBookmarks(false)
  }

  const handleBack = () => {
    setSelectedUser(null)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>GitHub Explorer</h1>
          <button 
            onClick={toggleDarkMode} 
            className={styles.themeToggle} 
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <SunIcon size={24} /> : <MoonIcon size={24} />}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {!selectedUser ? (
            <>
              <div className={styles.searchSection}>
                <SearchBar value={query} onChange={setQuery} />
              </div>

              <div className={styles.tabsContainer}>
                <button
                  className={`${styles.tab} ${!showBookmarks ? styles.active : ''}`}
                  onClick={() => setShowBookmarks(false)}
                >
                  Search Results
                </button>
                <button
                  className={`${styles.tab} ${showBookmarks ? styles.active : ''}`}
                  onClick={() => setShowBookmarks(true)}
                >
                  Bookmarks ({bookmarks.length})
                </button>
              </div>

              {showBookmarks ? (
                <Bookmarks bookmarks={bookmarks} onRemove={toggleBookmark} />
              ) : (
                <>
                  {loading && <Loader />}
                  {error && <EmptyState message={error} />}
                  {!loading && !error && users.length === 0 && query && (
                    <EmptyState message="No users found. Try a different search." />
                  )}
                  {!loading && !error && users.length === 0 && !query && (
                    <EmptyState message="Start searching for GitHub users" />
                  )}

                  {users.length > 0 && (
                    <>
                      <div className={styles.usersList}>
                        {users.map(user => (
                          <UserCard
                            key={user.id}
                            user={user}
                            onSelect={handleUserSelect}
                          />
                        ))}
                      </div>
                      <Pagination
                        page={page}
                        totalCount={totalCount}
                        onPageChange={setPage}
                      />
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <div className={styles.userHeader}>
                <button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeftIcon size={18} />
                  <span>Back to Search</span>
                </button>
                <div className={styles.userInfo}>
                  <img src={selectedUser.avatar_url} alt={selectedUser.login} className={styles.userAvatar} />
                  <div>
                    <h2>{selectedUser.login}</h2>
                    <a href={selectedUser.html_url} target="_blank" rel="noopener noreferrer">
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </div>

              <RepoList
                repos={repos}
                loading={reposLoading}
                error={reposError}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterLang={filterLang}
                setFilterLang={setFilterLang}
                languages={languages}
                onBookmark={toggleBookmark}
                isBookmarked={isBookmarked}
              />
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>GitHub Explorer © 2024 | Built with React & Vite</p>
      </footer>
    </div>
  )
}
