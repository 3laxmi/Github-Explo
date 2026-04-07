import axios from 'axios'

// Centralized axios instance so we can change API base URL in one place
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
})

export const searchUsers = async (query, page = 1) => {
  try {
    const { data } = await github.get('/search/users', {
      params: {
        q: query,
        per_page: 12,  // Balance between showing enough results and keeping UI responsive
        page
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export const getUserRepos = async (username) => {
  try {
    const { data } = await github.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,  // Fetch more repos at once to reduce API calls
        sort: 'updated'  // Show recently updated repos first (more relevant)
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

export const getUser = async (username) => {
  try {
    const { data } = await github.get(`/users/${username}`)
    return data
  } catch (error) {
    throw error
  }
}
