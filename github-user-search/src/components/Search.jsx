import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const data = await fetchUserData(username, location, minRepos);
      if (data.items) {
        setUsers(data.items);
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="border p-2 rounded flex-1"
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Location" 
            className="border p-2 rounded flex-1"
            onChange={(e) => setLocation(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Min Repos" 
            className="border p-2 rounded flex-1"
            onChange={(e) => setMinRepos(e.target.value)} 
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded w-full hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition">
            <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-center font-bold mt-2">{user.login}</h3>
            <p className="text-sm text-center text-gray-600">{user.location}</p>
            <div className="text-center mt-4">
              <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;