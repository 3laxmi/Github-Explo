import styles from './Loader.module.css'

/**
 * Loading spinner component with context-aware messaging
 * Shows different messages based on what's being loaded
 */
export function Loader({ message = 'Loading...' }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  )
}
