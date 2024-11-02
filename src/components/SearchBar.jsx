import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('all');

  const handleSearch = () => {
    onSearch(input, year, type);
  };

  return (
    <div className="search-bar flex flex-col md:flex-row items-center justify-center gap-4">
      <input
        type="text"
        placeholder="Search by title or IMDb ID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        className="border rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Year (optional)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded px-4 py-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
      <button onClick={handleSearch} className="bg-yellow-400 px-4 py-2 rounded text-black">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
