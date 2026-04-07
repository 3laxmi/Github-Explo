import { RepoCard } from '../RepoCard/RepoCard'
import { Loader } from '../Loader/Loader'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { EmptyState } from '../EmptyState/EmptyState'
import styles from './RepoList.module.css'

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
  // Guard clauses prevent rendering unnecessary UI when data isn't ready
  if (loading) {
    return <Loader message="Fetching repositories..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!repos || repos.length === 0) {
    return <EmptyState message="No repositories found" />
  }

  return (
    <div className={styles.container}>
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

        {/* Only render language filter if there are languages to filter by */}
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
