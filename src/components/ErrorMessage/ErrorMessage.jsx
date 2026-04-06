import { AlertIcon } from '../../assets/icons'
import styles from './ErrorMessage.module.css'

export function ErrorMessage({ message }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <AlertIcon size={48} color="var(--error-color)" />
      </div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  )
}
