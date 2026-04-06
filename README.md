# GitHub Explorer

A React application to search GitHub users and explore their repositories with filtering and sorting capabilities.

## Features

### Core Requirements
- **User Search** - Search GitHub users with debounced input (400ms)
- **Display Results** - Show username and avatar for each user
- **View Repositories** - Click on a user to see their repositories
- **Repository Details** - Display name, stars, forks, and description
- **State Management** - Loading, error, and empty states
- **Sort Options** - Sort repositories by stars or forks
- **Filter by Language** - Filter repositories by programming language
- **Responsive Design** - Works on mobile, tablet, and desktop

### Bonus Features
- **Custom Hooks** - useDebounce, useGithubSearch, useUserRepos, useBookmarks, useDarkMode
- **Pagination** - Navigate through search results
- **Bookmarks** - Save favorite repositories to localStorage
- **Dark Mode** - Toggle between light and dark themes
- **Number Formatting** - Display large numbers as 1.2k, 1.5M
- **Date Formatting** - Show relative dates (e.g., "2 days ago")

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS Modules** - Component styling

## Installation

1. Clone the repository
```bash
git clone <repo-url>
cd github-explorer
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Usage

### Search for Users
1. Type a GitHub username in the search bar
2. Results appear automatically (no need to press Enter)
3. Click on a user to view their repositories

### View and Filter Repositories
- Use "Sort by" dropdown to sort by stars or forks
- Use "Language" dropdown to filter by programming language
- Click the star icon to bookmark a repository

### Manage Bookmarks
- Click "Bookmarks" tab to view saved repositories
- Bookmarks are saved in browser storage

### Toggle Dark Mode
- Click the theme toggle button in the header
- Your preference is saved automatically

## Project Structure

```
src/
├── api/
│   └── github.js              # GitHub API calls
├── hooks/
│   ├── useDebounce.js         # Debounce hook
│   ├── useGithubSearch.js     # Search state
│   ├── useUserRepos.js        # Repository state
│   ├── useBookmarks.js        # Bookmark state
│   └── useDarkMode.js         # Dark mode state
├── components/
│   ├── SearchBar/             # Search input
│   ├── UserCard/              # User result card
│   ├── RepoCard/              # Repository card
│   ├── RepoList/              # Repository list
│   ├── Loader/                # Loading spinner
│   ├── ErrorMessage/          # Error display
│   ├── EmptyState/            # Empty state
│   ├── Pagination/            # Pagination controls
│   └── Bookmarks/             # Bookmarks view
├── assets/icons/              # SVG icons
├── utils/
│   └── formatters.js          # Utility functions
├── App.jsx                    # Main component
├── App.module.css             # App styles
├── index.css                  # Global styles
└── main.jsx                   # Entry point
```

## API Used

- **Search Users** - `GET /search/users?q={query}`
- **Get Repositories** - `GET /users/{username}/repos`

Rate limit: 60 requests/hour (unauthenticated)

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Key Implementation Details

### Debouncing
Search input is debounced with 400ms delay to prevent excessive API calls.

### State Management
- Custom hooks handle all state logic
- Components are pure and receive data via props
- localStorage used for bookmarks and theme preference

### Error Handling
- Specific error messages for different scenarios
- Rate limit detection
- Network error handling

### Performance
- Memoization for filtering and sorting
- Lazy initialization of localStorage
- Pagination for large result sets

## Future Improvements

- User profile details (followers, bio)
- Advanced search filters
- Repository trending analysis
- OAuth authentication for higher rate limits

## License

MIT

## Author

Built as a React assignment demonstrating best practices in component architecture and state management.
