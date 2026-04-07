import styles from './Pagination.module.css'

export function Pagination({ page, totalCount, onPageChange, perPage = 12 }) {
  const totalPages = Math.ceil(totalCount / perPage)

  if (totalPages <= 1) return null

  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={styles.button}
      >
         Previous
      </button>

      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={styles.button}
      >
        Next 
      </button>
    </div>
  )
}
