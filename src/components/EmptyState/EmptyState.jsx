import { EmptyIcon } from '../../assets/icons'
import styles from './EmptyState.module.css'

export function EmptyState({ message }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <EmptyIcon size={48} color="var(--text-secondary)" />
      </div>
      <p>{message}</p>
    </div>
  )
}
