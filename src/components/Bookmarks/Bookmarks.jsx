import { RepoCard } from '../RepoCard/RepoCard'
import { EmptyState } from '../EmptyState/EmptyState'
import styles from './Bookmarks.module.css'

export function Bookmarks({ bookmarks, onRemove }) {
  if (!bookmarks.length) {
    return <EmptyState message="No bookmarked repositories yet" />
  }

  return (
    <div className={styles.container}>
      <h2>Bookmarked Repositories ({bookmarks.length})</h2>
      <div className={styles.list}>
        {bookmarks.map(repo => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isBookmarked={true}
            onBookmark={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
