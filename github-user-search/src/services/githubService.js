import axios from 'axios';

// Task 2 requires using the Search API endpoint
const GITHUB_SEARCH_URL = 'https://api.github.com/search/users?q=';

export const fetchUserData = async (username, location, minRepos) => {
    // Construct the query parameters correctly for the GitHub API
    let query = `user:${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const response = await axios.get(`${GITHUB_SEARCH_URL}${query}`);
    return response.data; // Note: Search API returns { items: [], ... }
};