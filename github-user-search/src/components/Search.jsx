import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]); // Array for search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const data = await fetchUserData(username, location, minRepos);
      
      // The Search API returns an object with an 'items' array
      if (data.items && data.items.length > 0) {
        setUsers(data.items);
      } else {
        setError("Looks like we cant find the user");
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-100 p-6 rounded-lg">
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <input 
          type="number" 
          placeholder="Min Repos" 
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {/* Conditional Rendering for States */}
      {loading && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="text-center font-bold text-lg mt-3">{user.login}</h2>
            <div className="text-center mt-4">
               <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 text-white px-4 py-2 rounded text-sm"
              >
                View Full Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;