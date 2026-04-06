import { SearchIcon } from '../../assets/icons'
import styles from './SearchBar.module.css'

export function SearchBar({ value, onChange, placeholder = 'Search GitHub users...' }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Search GitHub users"
      />
      <div className={styles.icon}>
        <SearchIcon size={18} color="var(--text-secondary)" />
      </div>
    </div>
  )
}
