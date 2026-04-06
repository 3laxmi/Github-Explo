import { RepoCard } from '../RepoCard/RepoCard'
import { Loader } from '../Loader/Loader'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { EmptyState } from '../EmptyState/EmptyState'
import styles from './RepoList.module.css'

/**
 * Repository list component with filtering and sorting controls
 * Handles all three states: loading, error, and empty
 */
export function RepoList({
  repos,
  loading,
  error,
  sortBy,
  setSortBy,
  filterLang,
  setFilterLang,
  languages,
  onBookmark,
  isBookmarked
}) {
  // Show loading state
  if (loading) {
    return <Loader message="Fetching repositories..." />
  }

  // Show error state
  if (error) {
    return <ErrorMessage message={error} />
  }

  // Show empty state
  if (!repos || repos.length === 0) {
    return <EmptyState message="No repositories found" />
  }

  return (
    <div className={styles.container}>
      {/* Filter and sort controls */}
      <div className={styles.controls}>
        <div className={styles.group}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
          </select>
        </div>

        {/* Only show language filter if languages exist */}
        {languages && languages.length > 0 && (
          <div className={styles.group}>
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={filterLang}
              onChange={e => setFilterLang(e.target.value)}
              className={styles.select}
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Repository grid */}
      <div className={styles.list}>
        {repos.map(repo => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isBookmarked={isBookmarked(repo.id)}
            onBookmark={onBookmark}
          />
        ))}
      </div>
    </div>
  )
}
