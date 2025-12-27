import axios from 'axios';

export const fetchUserData = async (username, location, minRepos) => {
  // Start with the base search URL
  let query = '';

  // Build the query string based on provided inputs
  if (username) query += `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  // If query is empty, we shouldn't make the call or GitHub will return an error
  const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
  
  return response.data; // This returns an object containing an 'items' array
};