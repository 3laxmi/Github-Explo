import { StarIcon } from '../../assets/icons'
import { formatNumber, formatDate } from '../../utils/formatters'
import styles from './RepoCard.module.css'

export function RepoCard({ repo, isBookmarked, onBookmark }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.name}>
          {repo.name}
        </a>
        <button
          className={styles.bookmark}
          onClick={() => onBookmark(repo)}
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {/* SVG icon changes appearance based on bookmark state */}
          <StarIcon size={20} filled={isBookmarked} color="var(--accent-color)" />
        </button>
      </div>

      {/* Only show description if it exists (some repos don't have one) */}
      {repo.description && <p className={styles.description}>{repo.description}</p>}

      <div className={styles.meta}>
        <span className={styles.stat}>
          <span className={styles.icon}>★</span>
          {formatNumber(repo.stargazers_count)}
        </span>
        <span className={styles.stat}>
          <span className={styles.icon}>🍴</span>
          {formatNumber(repo.forks_count)}
        </span>
        {/* Language badge only shows if repo has a language (some don't) */}
        {repo.language && (
          <span className={styles.language}>
            <span className={styles.dot}></span>
            {repo.language}
          </span>
        )}
        <span className={styles.updated}>
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>
    </div>
  )
}
