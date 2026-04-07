import styles from './UserCard.module.css'

export function UserCard({ user, onSelect }) {
  return (
    <div className={styles.card} onClick={() => onSelect(user)}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <div className={styles.info}>
        <h3 className={styles.username}>{user.login}</h3>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          View Profile 
        </a>
      </div>
    </div>
  )
}
