import axios from 'axios'

/**
 * GitHub API client
 * Centralized API calls for all GitHub endpoints
 * Using REST API v3 (unauthenticated)
 */
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
})

/**
 * Search for GitHub users
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise} Search results with items and total_count
 */
export const searchUsers = async (query, page = 1) => {
  try {
    const { data } = await github.get('/search/users', {
      params: {
        q: query,
        per_page: 12,
        page
      }
    })
    return data
  } catch (error) {
    // Re-throw with context for better error handling
    throw error
  }
}

/**
 * Get repositories for a specific user
 * @param {string} username - GitHub username
 * @returns {Promise} Array of repositories
 */
export const getUserRepos = async (username) => {
  try {
    const { data } = await github.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'updated'
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

/**
 * Get user profile information
 * @param {string} username - GitHub username
 * @returns {Promise} User profile data
 */
export const getUser = async (username) => {
  try {
    const { data } = await github.get(`/users/${username}`)
    return data
  } catch (error) {
    throw error
  }
}
